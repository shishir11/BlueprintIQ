/**
 * Minimal Chrome DevTools Protocol client.
 *
 * Uses the WebSocket that ships with Node (global since 22, stable in 24) so the
 * harness adds no dependency to the project. Everything the suites need is on the
 * Page object returned by `attach`.
 */
import fs from 'node:fs';
import path from 'node:path';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {
      /* browser not listening yet */
    }
    await sleep(250);
  }
  throw new Error(`no DevTools endpoint at ${url} after ${tries} attempts`);
}

class Page {
  constructor(ws, opts) {
    this.ws = ws;
    this.shotsDir = opts.shotsDir || null;
    this.label = opts.label || '';
    this.width = 1440;
    this.height = 1000;
    this.logs = [];
    this.id = 0;
    this.pending = new Map();
    // Vite reloads the page for any changed file in the project root, and this repo
    // has no .gitignore, so editing anything mid-run drops the in-memory session and
    // every later check fails for a reason that has nothing to do with the app.
    // Counting loads against the ones we asked for turns that into one honest signal.
    this.loads = 0;
    this.expectedLoads = 0;

    ws.addEventListener('message', (e) => {
      const m = JSON.parse(typeof e.data === 'string' ? e.data : e.data.toString());
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id);
        this.pending.delete(m.id);
        if (m.error) reject(new Error(JSON.stringify(m.error)));
        else resolve(m.result);
      } else if (m.method === 'Page.loadEventFired') {
        this.loads++;
      } else if (m.method === 'Runtime.exceptionThrown') {
        this.logs.push('EXCEPTION: ' + m.params.exceptionDetails.text);
      } else if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
        this.logs.push('error: ' + m.params.entry.text);
      }
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const i = ++this.id;
      this.pending.set(i, { resolve, reject });
      this.ws.send(JSON.stringify({ id: i, method, params }));
    });
  }

  /** Evaluate an expression in the page and return it by value. */
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', {
      expression, returnByValue: true, awaitPromise: true,
    });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
    return r.result.value;
  }

  /** Poll an expression until it is truthy. Returns false on timeout rather than throwing. */
  async waitFor(expression, timeout = 6000, step = 100) {
    const deadline = Date.now() + timeout;
    for (;;) {
      let v = false;
      try { v = await this.eval(expression); } catch { v = false; }
      if (v) return true;
      if (Date.now() > deadline) return false;
      await sleep(step);
    }
  }

  async setViewport(width, height) {
    this.width = width;
    this.height = height;
    await this.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile: false,
    });
  }

  /** Navigate and wait for React to have painted something into #root. */
  async goto(url, settle = 500) {
    this.expectedLoads++;
    await this.send('Page.navigate', { url });
    await this.waitFor('document.readyState !== "loading"', 15000);
    await this.waitFor('!!document.querySelector("#root")?.children.length', 15000);
    await sleep(settle);
  }

  async reload(settle = 500) {
    this.expectedLoads++;
    await this.send('Page.reload', { ignoreCache: false });
    await this.waitFor('document.readyState !== "loading"', 15000);
    await this.waitFor('!!document.querySelector("#root")?.children.length', 15000);
    await sleep(settle);
  }

  /** Set a controlled React input's value the way a user typing would. */
  async type(selector, value) {
    return this.eval(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return 'NOEL';
      const proto = el instanceof window.HTMLTextAreaElement
        ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)});
      el.dispatchEvent(new Event('input', { bubbles: true }));
      return el.value;
    })()`);
  }

  /** Click the first control whose trimmed text equals `text`, optionally inside `within`. */
  async clickText(text, within = '') {
    const scope = within ? `document.querySelector(${JSON.stringify(within)})` : 'document';
    return this.eval(`(() => {
      const root = ${scope};
      if (!root) return false;
      const b = [...root.querySelectorAll('button, a[href], [role=button]')]
        .find((x) => x.textContent.trim() === ${JSON.stringify(text)});
      if (!b) return false;
      b.click();
      return true;
    })()`);
  }

  async click(selector) {
    return this.eval(`(() => { const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return false; el.click(); return true; })()`);
  }

  /** Dispatch a real key event, so :focus-visible and keydown handlers both fire. */
  async key(key, { shift = false } = {}) {
    const map = {
      Tab: { code: 'Tab', vk: 9, text: '\t' },
      Enter: { code: 'Enter', vk: 13, text: '\r' },
      Escape: { code: 'Escape', vk: 27, text: '' },
      ' ': { code: 'Space', vk: 32, text: ' ' },
      ArrowDown: { code: 'ArrowDown', vk: 40, text: '' },
      ArrowUp: { code: 'ArrowUp', vk: 38, text: '' },
      ArrowRight: { code: 'ArrowRight', vk: 39, text: '' },
      ArrowLeft: { code: 'ArrowLeft', vk: 37, text: '' },
    }[key];
    if (!map) throw new Error(`unmapped key ${key}`);
    const base = {
      key, code: map.code, windowsVirtualKeyCode: map.vk, nativeVirtualKeyCode: map.vk,
      modifiers: shift ? 8 : 0,
    };
    await this.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...base });
    if (map.text) await this.send('Input.dispatchKeyEvent', { type: 'char', ...base, text: map.text });
    await this.send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
    await sleep(60);
  }

  async emulateMedia(features) {
    await this.send('Emulation.setEmulatedMedia', { features });
  }

  /** Full-page screenshot. No-op unless --shots was passed. */
  async shot(name) {
    if (!this.shotsDir) return null;
    const m = await this.send('Page.getLayoutMetrics');
    const h = Math.min(Math.ceil(m.cssContentSize.height), 8000);
    const s = await this.send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: this.width, height: h, scale: 1 },
    });
    const file = path.join(this.shotsDir, `${name}-${this.label}${this.width}.png`);
    fs.writeFileSync(file, Buffer.from(s.data, 'base64'));
    return file;
  }

  /** Console errors, minus the noise a static site emits for a missing favicon. */
  errors() {
    return this.logs.filter((l) => !/favicon|net::ERR_FILE|status of 404/i.test(l));
  }

  clearLogs() {
    this.logs.length = 0;
    this.loads = 0;
    this.expectedLoads = 0;
  }

  /** Page loads nobody asked for — a file watcher firing, or a crash-and-restore. */
  unexpectedLoads() {
    return Math.max(0, this.loads - this.expectedLoads);
  }

  close() {
    try { this.ws.close(); } catch { /* already gone */ }
  }
}

/** Connect to a running browser's first page target. */
export async function attach({ port, host = '127.0.0.1', shotsDir = null, label = '' }) {
  const list = await fetchJson(`http://${host}:${port}/json/list`);
  const target = list.find((t) => t.type === 'page');
  if (!target) throw new Error('browser has no page target');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error('CDP socket failed to open')), { once: true });
  });
  const page = new Page(ws, { shotsDir, label });
  await page.send('Page.enable');
  await page.send('Runtime.enable');
  await page.send('Log.enable');
  await page.setViewport(1440, 1000);
  return page;
}

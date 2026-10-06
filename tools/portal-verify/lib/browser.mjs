/**
 * Launches a headless Chromium browser with the DevTools port open, so a run needs
 * no manually started browser. Chrome and Edge are both Chromium, so the same CDP
 * calls drive either one; running both is what stops this being single-engine
 * verification.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CANDIDATES = {
  chrome: [
    process.env.BIQ_CHROME,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ],
  edge: [
    process.env.BIQ_EDGE,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/microsoft-edge',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ],
};

export function findBinary(browser) {
  for (const c of CANDIDATES[browser] || []) {
    if (c && fs.existsSync(c)) return c;
  }
  return null;
}

/**
 * Start `browser` on `port` with a throwaway profile. Returns { stop }.
 * A fresh profile per run is what makes the suite repeatable: no carried-over
 * storage, no restored tabs, no extension noise.
 */
export function launch({ browser, port, logDir }) {
  const bin = findBinary(browser);
  if (!bin) throw new Error(`${browser} not found — set BIQ_${browser.toUpperCase()} to its path`);

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), `biq-${browser}-`));
  const args = [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--disable-sync',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    'about:blank',
  ];

  const log = logDir ? fs.openSync(path.join(logDir, `${browser}.log`), 'w') : 'ignore';
  const child = spawn(bin, args, { stdio: ['ignore', log, log] });

  return {
    binary: bin,
    stop() {
      try { child.kill(); } catch { /* already exited */ }
      try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* locked; harmless */ }
    },
  };
}

/** Start `vite preview` over an existing dist/ and resolve once it answers. */
export function previewServer({ port, cwd }) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const child = spawn(npx, ['vite', 'preview', '--port', String(port), '--strictPort'], {
    cwd, stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32',
  });
  const ready = (async () => {
    for (let i = 0; i < 80; i++) {
      try {
        const res = await fetch(`http://localhost:${port}/`);
        if (res.ok) return true;
      } catch { /* not up yet */ }
      await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error(`vite preview did not come up on ${port}`);
  })();
  return {
    ready,
    stop() { try { child.kill(); } catch { /* already exited */ } },
  };
}

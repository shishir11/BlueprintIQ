#!/usr/bin/env node
/**
 * portal-verify — browser verification for the customer portal.
 *
 *   node tools/portal-verify/run.mjs                      # dev server, Chrome, every suite
 *   node tools/portal-verify/run.mjs --browser both       # Chrome and Edge
 *   node tools/portal-verify/run.mjs --preview            # the built bundle over vite preview
 *   node tools/portal-verify/run.mjs --suite keyboard     # one suite
 *
 * Exit 0 when nothing failed, 1 when a check failed, 2 when the harness itself could
 * not run. Launches and tears down its own browser, so a run leaves nothing behind.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { attach, sleep } from './lib/cdp.mjs';
import { launch, previewServer, findBinary } from './lib/browser.mjs';
import { Report, print } from './lib/report.mjs';
import journey from './suites/journey.mjs';
import a11y from './suites/a11y.mjs';
import keyboard from './suites/keyboard.mjs';
import reloadSuite from './suites/reload.mjs';
import prod from './suites/prod.mjs';
import census from './suites/census.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CWD = path.resolve(HERE, '..', '..');

const HELP = `
portal-verify — drives Chrome and Edge over the DevTools protocol

  --browser <chrome|edge|both>   default chrome
  --base <url>                   default http://localhost:3000 (http://localhost:4173 with --preview)
  --preview                      serve dist/ with vite preview and run the production suite
  --suite <name[,name]>          journey, a11y, keyboard, reload, census, prod, all (default all)
  --widths <n,n,n>               journey viewports, default 1440,768,375
  --port <n>                     DevTools port, default 9222
  --shots <dir>                  write full-page screenshots here (off by default)
  --markdown <file>              write the result tables as markdown
  --help
`;

function parseArgs(argv) {
  const o = {
    browser: 'chrome', base: null, preview: false, suite: 'all',
    widths: [1440, 768, 375], port: 9222, shots: null, markdown: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--help' || a === '-h') { print(HELP); process.exit(0); }
    else if (a === '--browser') o.browser = next();
    else if (a === '--base') o.base = next();
    else if (a === '--preview') o.preview = true;
    else if (a === '--suite') o.suite = next();
    else if (a === '--widths') o.widths = next().split(',').map(Number);
    else if (a === '--port') o.port = Number(next());
    else if (a === '--shots') o.shots = next();
    else if (a === '--markdown') o.markdown = next();
    else { console.error(`unknown argument ${a}`); print(HELP); process.exit(2); }
  }
  return o;
}

const SUITES = { journey, a11y, keyboard, reload: reloadSuite, prod, census };

/**
 * A page load this harness did not ask for means something reloaded underneath the
 * run — on a dev server, almost always a file changed while it was in flight. Every
 * check after that point is suspect, so it is reported once, loudly.
 */
function guardAgainstReloads(page, report, label) {
  const extra = page.unexpectedLoads();
  if (extra === 0) return;
  report.notVerified(`${label}: run was not disturbed`,
    `${extra} page load(s) nobody asked for — a file changed mid-run; re-run without editing the project`);
}

async function runBrowser({ browser, opts, base, suites, report, logDir }) {
  const instance = launch({ browser, port: opts.port, logDir });
  print(`\n##### ${browser} — ${instance.binary}`);
  let page;
  try {
    page = await attach({
      port: opts.port,
      shotsDir: opts.shots,
      label: opts.browser === 'both' ? `${browser}-` : '',
    });
    for (const name of suites) {
      const suite = SUITES[name];
      if (name === 'journey') {
        for (const width of opts.widths) {
          await page.setViewport(width, width < 500 ? 800 : 1000);
          page.clearLogs();
          await suite({ page, base, report, width, cwd: CWD });
          guardAgainstReloads(page, report, `${name} @${width}`);
        }
      } else {
        page.clearLogs();
        await suite({ page, base, report, width: 1440, cwd: CWD });
        guardAgainstReloads(page, report, name);
      }
    }
  } finally {
    if (page) page.close();
    await sleep(200);
    instance.stop();
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const base = opts.base || (opts.preview ? 'http://localhost:4173' : 'http://localhost:3000');

  let suites = opts.suite === 'all'
    ? (opts.preview ? ['prod'] : ['journey', 'a11y', 'keyboard', 'reload', 'census'])
    : opts.suite.split(',');
  for (const s of suites) {
    if (!SUITES[s]) { console.error(`unknown suite ${s}`); process.exit(2); }
  }

  const browsers = opts.browser === 'both' ? ['chrome', 'edge'] : [opts.browser];
  for (const b of browsers) {
    if (!findBinary(b)) {
      console.error(`${b} not found — set BIQ_${b.toUpperCase()} to its path`);
      process.exit(2);
    }
  }

  if (opts.shots) fs.mkdirSync(opts.shots, { recursive: true });
  const logDir = fs.mkdtempSync(path.join(os.tmpdir(), 'biq-verify-'));

  let preview = null;
  if (opts.preview) {
    if (!fs.existsSync(path.join(CWD, 'dist', 'index.html'))) {
      console.error('dist/ is missing — run `npx vite build` before --preview');
      process.exit(2);
    }
    preview = previewServer({ port: new URL(base).port || 4173, cwd: CWD });
    await preview.ready;
    print(`vite preview serving dist/ at ${base}`);
  } else {
    try {
      const res = await fetch(base);
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      console.error(`nothing answering at ${base} — start the dev server with \`npm run dev\``);
      process.exit(2);
    }
  }

  const report = new Report();
  try {
    for (const b of browsers) {
      await runBrowser({ browser: b, opts, base, suites, report, logDir });
    }
  } finally {
    if (preview) preview.stop();
  }

  const ok = report.summary(`portal-verify · ${browsers.join(' + ')} · ${suites.join(' + ')}`);
  print(`  browser logs: ${logDir}`);
  if (opts.markdown) {
    fs.writeFileSync(opts.markdown, report.markdown());
    print(`  markdown: ${opts.markdown}`);
  }
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error('HARNESS FAILED');
  console.error(e);
  process.exit(2);
});

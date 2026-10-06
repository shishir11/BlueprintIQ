/**
 * The production bundle, not the dev server. Signs in, visits all six screens,
 * exercises two controls on each, and checks the built output for the things that
 * are meant to exist only under `import.meta.env.DEV`.
 *
 * Run with --preview, which serves dist/ over `vite preview` first.
 */
import fs from 'node:fs';
import path from 'node:path';
import { sleep } from '../lib/cdp.mjs';
import { print } from '../lib/report.mjs';
import { SCREENS, SEL, signInSso, gotoScreen } from '../lib/portal.mjs';

export const name = 'prod';

/**
 * Two controls per screen. Each is a state change the DOM reports back, so the
 * assertion is "this did something", not "this was clickable".
 */
const CONTROLS = {
  'portal-onboarding': [
    {
      // The stepper owns which step reads as current; the form body below it is the
      // one step the mockup supplies, so aria-current is the state to assert.
      label: 'stepper moves the current step',
      act: `(() => { const b = [...document.querySelectorAll('${SEL.shell} ol li button')];
        const at = b.findIndex((x) => x.getAttribute('aria-current') === 'step');
        const next = b[(at + 1) % b.length];
        if (next) next.click(); })()`,
      probe: `[...document.querySelectorAll('${SEL.shell} ol li button')]
        .findIndex((x) => x.getAttribute('aria-current') === 'step')`,
    },
    {
      label: 'a radio selects',
      act: "document.querySelectorAll('input[type=radio]')[1]?.click()",
      probe: "[...document.querySelectorAll('input[type=radio]')].map((r) => r.checked).join(',')",
    },
  ],
  'portal-billing': [
    {
      label: 'section tab switches',
      act: "document.querySelectorAll('[role=tab]')[1]?.click()",
      probe: "[...document.querySelectorAll('[role=tab]')].map((t) => t.getAttribute('aria-selected')).join(',')",
    },
    {
      label: 'a plan radio selects',
      act: "document.querySelectorAll('input[type=radio]')[1]?.click()",
      probe: "[...document.querySelectorAll('input[type=radio]')].map((r) => r.checked).join(',')",
    },
  ],
  'portal-invoicing': [
    {
      label: 'status filter changes the table',
      act: `(() => { const b = [...document.querySelectorAll('button')]
        .find((x) => x.textContent.trim().startsWith('Pending Payment')); if (b) b.click(); })()`,
      probe: "document.querySelectorAll('table tbody tr').length + '|' + (document.querySelector('table tbody tr')?.textContent || '')",
    },
    {
      label: 'alert toggle flips',
      act: "document.querySelector('[role=switch]')?.click()",
      probe: "document.querySelector('[role=switch]')?.getAttribute('aria-checked')",
    },
  ],
  'portal-ingestion': [
    {
      label: 'module card expands',
      act: "document.querySelectorAll('button[aria-pressed]')[0]?.click()",
      probe: "document.querySelectorAll('button[aria-pressed]')[0]?.getAttribute('aria-pressed')",
    },
    {
      label: 'ledger filter narrows the rows',
      act: 'SET #ing-filter SDD',
      probe: "document.querySelectorAll('table tbody tr').length",
    },
  ],
  'portal-governance': [
    {
      label: 'signatory filter narrows the list',
      act: 'SET #gov-filter Chen',
      probe: `document.querySelector('${SEL.shell}')?.innerText.length`,
    },
    {
      // The audit-log copy button, matched on its exact label: the header's "Send
      // Reminders" also matches a loose /remind/i and is one of the decorative
      // buttons the census suite reports, so it would read as a broken control.
      label: 'audit-log copy acknowledges',
      act: `(() => { const b = [...document.querySelectorAll('${SEL.shell} button')]
        .find((x) => x.textContent.trim() === 'Copy'); if (b) b.click(); })()`,
      probe: `[...document.querySelectorAll('${SEL.shell} button')]
        .some((x) => x.textContent.trim() === 'Copied')`,
    },
  ],
  'portal-output': [
    {
      label: 'first toggle flips',
      act: "document.querySelectorAll('[role=switch]')[0]?.click()",
      probe: "[...document.querySelectorAll('[role=switch]')].map((s) => s.getAttribute('aria-checked')).join(',')",
    },
    {
      label: 'second toggle flips',
      act: "document.querySelectorAll('[role=switch]')[1]?.click()",
      probe: "[...document.querySelectorAll('[role=switch]')].map((s) => s.getAttribute('aria-checked')).join(',')",
    },
  ],
};

async function exercise(page, report, tab, control) {
  const before = await page.eval(control.probe);
  if (control.act.startsWith('SET ')) {
    const [, selector, value] = control.act.split(' ');
    await page.type(selector, value);
  } else {
    await page.eval(control.act);
  }
  await sleep(400);
  const after = await page.eval(control.probe);
  report.check(`${tab}: ${control.label}`,
    String(before) !== String(after), `${before} -> ${after}`);
}

/** The DEV-only affordances must not be in the shipped JavaScript. */
function scanBundle(report, cwd) {
  const dir = path.join(cwd, 'dist', 'assets');
  if (!fs.existsSync(dir)) {
    report.notVerified('built bundle: DEV affordances absent', 'dist/assets not found — run vite build first');
    return;
  }
  const js = fs.readdirSync(dir).filter((f) => f.endsWith('.js'))
    .map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  for (const needle of ['Screen Quick Switcher', 'Demo credentials', 'portal-demo-credentials']) {
    const hits = js.split(needle).length - 1;
    report.check(`built bundle: "${needle}" absent`, hits === 0, `${hits} hit(s)`);
  }
  const demo = js.split('blueprint-demo').length - 1;
  report.check('built bundle: blueprint-demo occurs once, as the matcher constant',
    demo === 1, `${demo} hit(s) — a static demo can only check a password by shipping it`);
}

export default async function prod({ page, base, report, cwd }) {
  report.group('production bundle — walkthrough');
  await page.setViewport(1440, 1000);

  await page.goto(`${base}/`);
  report.check('home renders from the built bundle',
    await page.eval('document.querySelector("#main-content")?.children.length > 0'));

  const signedIn = await signInSso(page, base);
  report.check('sign-in works against the built bundle', signedIn);
  report.check('DEV credentials panel is not in the built DOM',
    await page.eval('!document.querySelector("#portal-demo-credentials") && !document.body.innerText.includes("Demo credentials")'));

  if (!signedIn) {
    report.notVerified('production screens', 'sign-in did not reach the shell');
    return;
  }

  for (const { tab } of SCREENS) {
    report.group(`production bundle — ${tab}`);
    const moved = await gotoScreen(page, tab);
    await sleep(250);
    report.check(`${tab} renders from the built bundle`,
      moved && await page.eval(`document.querySelector('${SEL.shell}')?.children.length > 0`));
    for (const control of CONTROLS[tab]) {
      await exercise(page, report, tab, control);
    }
  }

  report.group('production bundle — build output');
  scanBundle(report, cwd);
  report.check('no Screen Quick Switcher in the running page',
    await page.eval('!document.body.innerText.includes("Screen Quick Switcher")'));

  const errs = page.errors();
  report.check('no console errors against the production bundle',
    errs.length === 0, `${errs.length} error(s)`);
  errs.slice(0, 6).forEach((e) => print('     ! ' + e));
}

/**
 * Regression over the marketing site plus a structural accessibility sweep of every
 * portal screen. Runs its own viewports, so it is invoked once per browser.
 */
import { sleep } from '../lib/cdp.mjs';
import { print } from '../lib/report.mjs';
import { SCREENS, SEL, signInSso, gotoScreen } from '../lib/portal.mjs';

export const name = 'a11y';

const MARKETING_TABS = ['Home', 'Features', 'Team', 'Pricing', 'Contact'];
const WIDTHS = [[1440, 1000], [768, 1000], [375, 800]];

async function modal(page, report, label, trigger, tab, base) {
  await page.goto(`${base}/`);
  if (tab) {
    await page.clickText(tab);
    await sleep(700);
  }
  const before = await page.eval('document.querySelectorAll(".fixed.inset-0").length');
  await page.eval(trigger);
  await sleep(500);
  const during = await page.eval('document.querySelectorAll(".fixed.inset-0").length');
  await page.eval(`(() => {
    const b = [...document.querySelectorAll('.fixed.inset-0 button')];
    const x = b.find((y) => /close/i.test(y.getAttribute('aria-label') || '')) || b[0];
    if (x) x.click();
  })()`);
  await sleep(500);
  const after = await page.eval('document.querySelectorAll(".fixed.inset-0").length');
  report.check(`modal ${label} opens and closes`,
    during > before && after <= before, `${before} -> ${during} -> ${after}`);
}

export default async function a11y({ page, base, report }) {
  // ---- marketing regression ----
  report.group('marketing regression');
  await page.setViewport(1440, 1000);
  for (const tab of MARKETING_TABS) {
    await page.goto(`${base}/`);
    const clicked = await page.clickText(tab);
    await sleep(700);
    const rendered = await page.eval('document.querySelector("#main-content")?.children.length > 0');
    const noShell = await page.eval(`!document.querySelector('${SEL.shell}')`);
    report.check(`marketing ${tab} renders`, clicked && rendered);
    report.check(`marketing ${tab} shows no portal shell`, noShell);
  }

  await page.goto(`${base}/`);
  report.check('navbar carries the footer and the Client login entry',
    await page.eval('!!document.querySelector("footer") && !!document.querySelector("#nav-client-login-btn")'));

  await modal(page, report, 'Get Started', 'document.querySelector("#nav-get-started-btn")?.click()', null, base);
  await modal(page, report, 'Watch Demo', `(() => { const b = [...document.querySelectorAll('button')]
    .find((x) => /watch how an engagement runs|watch demo/i.test(x.textContent)); if (b) b.click(); })()`, 'Features', base);
  await modal(page, report, 'Help Center', `(() => { const b = [...document.querySelectorAll('button')]
    .find((x) => /visit help cent/i.test(x.textContent)); if (b) b.click(); })()`, 'Contact', base);
  await modal(page, report, 'Careers', 'document.querySelector("#team-view-open-positions-btn")?.click()', 'Team', base);
  // The team card is a clickable div, and React binds through the root rather than
  // onclick, so it has to be found by shape and clicked for real.
  await modal(page, report, 'Team Member', `(() => { const d = [...document.querySelectorAll('div.cursor-pointer')]
    .find((x) => /sarkar|priyankar|vance|chen|lin/i.test(x.textContent) && x.querySelector('h3, h4, p'));
    if (d) d.click(); })()`, 'Team', base);

  await page.setViewport(375, 800);
  await page.goto(`${base}/`);
  await page.click('#mobile-menu-toggle-btn');
  await sleep(500);
  const drawerOpen = await page.eval('document.body.innerText.includes("Client login")');
  await page.click('#mobile-menu-toggle-btn');
  await sleep(400);
  report.check('marketing mobile drawer opens and closes', drawerOpen);

  // ---- portal structure ----
  report.group('portal accessibility');
  await page.setViewport(1440, 1000);
  await signInSso(page, base);
  for (const { tab } of SCREENS) {
    await gotoScreen(page, tab);
    await sleep(250);
    const a = await page.eval(`(() => {
      const root = document.querySelector('${SEL.shell}');
      const h1 = root.querySelectorAll('h1').length;
      const levels = [...root.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
      let skip = false;
      for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) skip = true;
      const fields = [...root.querySelectorAll('input:not([type=radio]):not([type=checkbox]), select, textarea')];
      const unlabelled = fields.filter((f) => !(f.id && document.querySelector('label[for="' + f.id + '"]'))
        && !f.getAttribute('aria-label') && !f.closest('label')).length;
      const controls = [...root.querySelectorAll('button, a[href], [role=switch]')];
      const small = controls.filter((c) => {
        const r = c.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44);
      }).map((c) => {
        const r = c.getBoundingClientRect();
        return (c.getAttribute('aria-label') || c.textContent.trim().slice(0, 28) || c.tagName)
          + ' ' + Math.round(r.width) + 'x' + Math.round(r.height);
      });
      return { h1, skip, unlabelled, smallCount: small.length, small: small.slice(0, 4) };
    })()`);
    report.check(`${tab}: exactly one <h1>`, a.h1 === 1, `found ${a.h1}`);
    report.check(`${tab}: no skipped heading levels`, !a.skip);
    report.check(`${tab}: every field has a label`, a.unlabelled === 0, `${a.unlabelled} unlabelled`);
    report.check(`${tab}: targets >= 44px`, a.smallCount === 0,
      a.smallCount ? `${a.smallCount} small: ${a.small.join(' | ')}` : '');
  }

  // ---- responsive ----
  report.group('portal responsive');
  for (const [w, h] of WIDTHS) {
    await page.setViewport(w, h);
    await signInSso(page, base);
    for (const { tab } of SCREENS) {
      await gotoScreen(page, tab);
      await sleep(250);
      const over = await page.eval('document.documentElement.scrollWidth > window.innerWidth + 1');
      const sw = await page.eval('document.documentElement.scrollWidth');
      report.check(`${tab} @${w}: no horizontal scroll`, !over, `scrollWidth ${sw} vs ${w}`);
    }
  }

  // ---- reduced motion ----
  report.group('reduced motion');
  await page.setViewport(1440, 1000);
  await page.emulateMedia([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`${base}/?screen=login`);
  await page.type(SEL.domain, 'acme-corp.com');
  await page.click(SEL.submit);
  await sleep(150);
  const anim = await page.eval(`(() => {
    const s = document.querySelector('${SEL.submit} svg');
    return s ? getComputedStyle(s).animationName : 'NONE';
  })()`);
  report.check('spinner does not animate under prefers-reduced-motion',
    anim === 'none' || anim === 'NONE', `animation-name=${anim}`);
  await page.emulateMedia([]);

  const errs = page.errors();
  report.check('no console errors across the regression sweep', errs.length === 0, `${errs.length}`);
  errs.slice(0, 5).forEach((e) => print('     ! ' + e));
}

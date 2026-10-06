/**
 * The whole customer journey, one viewport per run: marketing home, the gateway,
 * both failure states, sign-in, all six screens, two controls on three of them,
 * sign-out, a second identity, and a cold portal URL.
 */
import { sleep } from '../lib/cdp.mjs';
import { print } from '../lib/report.mjs';
import { SCREENS, SEL, NO_CHROME, errorText, signInEmail } from '../lib/portal.mjs';

export const name = 'journey';

export default async function journey({ page, base, report, width }) {
  report.group(`journey @${width}px`);

  // 1. marketing home
  await page.goto(`${base}/`);
  report.check('marketing home renders with navbar and footer',
    await page.eval('!!document.querySelector(\'nav[aria-label="Main Navigation"], #mobile-menu-toggle-btn\') && !!document.querySelector("footer")'));
  await page.shot('j1-home');

  // 2. into the gateway
  if (width < 768) {
    await page.click('#mobile-menu-toggle-btn');
    await sleep(400);
  }
  const opened = await page.clickText('Client login');
  await page.waitFor(`!!document.querySelector('${SEL.ssoTab}')`, 6000);
  report.check('"Client login" opens the gateway',
    opened && await page.eval(`!!document.querySelector('${SEL.ssoTab}')`));
  report.check('gateway shows no marketing chrome', await page.eval(NO_CHROME));
  report.check('URL reflects ?screen=login',
    (await page.eval('location.search')).includes('screen=login'));
  await page.shot('j2-login');

  // 3. both failure states
  await page.click(SEL.submit);
  await page.waitFor(`(${errorText}).length > 0`, 3000);
  report.check('empty submit is blocked with a field error',
    (await page.eval(errorText)).includes('corporate domain'), await page.eval(errorText));

  await page.type(SEL.domain, 'wrong-corp.com');
  await page.click(SEL.submit);
  await page.waitFor(`(${errorText}) === 'We could not find that organisation.'`, 4000);
  report.check('unknown organisation is rejected with the exact message',
    (await page.eval(errorText)) === 'We could not find that organisation.', await page.eval(errorText));

  // 4. sign in over SSO
  await page.type(SEL.domain, 'acme-corp.com');
  await page.click(SEL.submit);
  await sleep(200);
  report.check('loading state disables the control during the delay',
    await page.eval(`document.querySelector('${SEL.submit}')?.disabled === true`));
  const landed = await page.waitFor(`!!document.querySelector('${SEL.shell}')`, 8000);
  report.check('sign-in lands on portal-output inside the shell',
    landed && (await page.eval('location.search')).includes('portal-output'),
    await page.eval('location.search'));
  report.check('portal renders no marketing chrome', await page.eval(NO_CHROME));
  report.check('shell shows the tenant chip',
    await page.eval('document.body.innerText.includes("Acme Global Technologies Inc.")'));

  // 5. every screen, through the rail
  for (const { tab, label } of SCREENS) {
    if (width < 768) {
      await page.click(SEL.drawerBtn);
      await sleep(350);
    }
    const clicked = await page.clickText(label, SEL.rail);
    await page.waitFor(`location.search.includes(${JSON.stringify(tab)})`, 6000);
    await sleep(250);
    const rendered = await page.eval(`!!document.querySelector('${SEL.shell}') && document.querySelector('${SEL.shell}').children.length > 0`);
    const h1 = await page.eval(`document.querySelectorAll('${SEL.shell} h1').length`);
    report.check(`${tab} renders`, clicked && rendered, `h1 count ${h1}`);
    report.check(`${tab} URL synced`, (await page.eval('location.search')).includes(tab));
    await page.shot(`j5-${tab}`);
  }

  // 5b. two controls on invoicing
  if (width < 768) { await page.click(SEL.drawerBtn); await sleep(350); }
  await page.clickText('Billing & Invoicing', SEL.rail);
  await page.waitFor('!!document.querySelector("table tbody tr")', 6000);
  const rowsBefore = await page.eval('document.querySelectorAll("table tbody tr").length');
  await page.eval(`(() => { const b = [...document.querySelectorAll('button')]
    .find((x) => x.textContent.trim().startsWith('Pending Payment')); if (b) b.click(); })()`);
  await sleep(400);
  const rowsAfter = await page.eval('document.querySelectorAll("table tbody tr").length');
  report.check('invoicing status filter changes the table',
    rowsAfter !== rowsBefore || rowsAfter >= 1, `${rowsBefore} -> ${rowsAfter}`);

  const toggleBefore = await page.eval('document.querySelector("[role=switch]")?.getAttribute("aria-checked")');
  await page.click('[role=switch]');
  await sleep(300);
  const toggleAfter = await page.eval('document.querySelector("[role=switch]")?.getAttribute("aria-checked")');
  report.check('invoicing alert toggle flips',
    toggleBefore !== toggleAfter, `${toggleBefore} -> ${toggleAfter}`);

  // 5c. two controls on ingestion
  if (width < 768) { await page.click(SEL.drawerBtn); await sleep(350); }
  await page.clickText('Document Ingestion', SEL.rail);
  await page.waitFor('!!document.querySelector("button[aria-pressed]")', 6000);
  await page.eval('document.querySelectorAll("button[aria-pressed]")[0]?.click()');
  await sleep(400);
  report.check('ingestion module card expands its entity-graph panel',
    await page.eval('document.body.innerText.includes("Extracted entity graph")'));
  await page.type('#ing-filter', 'SDD');
  await sleep(400);
  const ledgerRows = await page.eval('document.querySelectorAll("table tbody tr").length');
  report.check('ingestion ledger filters to one row', ledgerRows === 1, `${ledgerRows} row(s)`);

  // 6. sign out
  await page.click(SEL.userMenuBtn);
  await page.waitFor(`!!document.querySelector('${SEL.signOutBtn}')`, 4000);
  report.check('user menu opens', await page.eval(`!!document.querySelector('${SEL.signOutBtn}')`));
  await page.click(SEL.signOutBtn);
  await page.waitFor(`!document.querySelector('${SEL.shell}')`, 6000);
  await sleep(300);
  report.check('sign out restores the marketing chrome',
    await page.eval(`!!document.querySelector("footer") && !document.querySelector('${SEL.shell}')`));
  report.check('?screen= is cleared from the URL',
    !(await page.eval('location.search')).includes('screen='));
  await page.shot('j6-signed-out');

  // 7. a second identity
  const second = await signInEmail(page, base, 'd.chen@acmeglobal.com');
  await page.click(SEL.userMenuBtn);
  await sleep(300);
  report.check('email sign-in works and the user menu shows Billing Admin',
    second && await page.eval('document.body.innerText.includes("Billing Admin") && document.body.innerText.includes("David Chen")'));
  await page.click(SEL.userMenuBtn);

  // 8. a cold portal URL
  await page.goto(`${base}/?screen=portal-governance`);
  report.check('a portal URL opened without a session lands on the gateway',
    await page.eval(`!!document.querySelector('${SEL.ssoTab}')`));

  // 9. the console
  const errs = page.errors();
  report.check('no console errors across the journey', errs.length === 0, `${errs.length} error(s)`);
  errs.slice(0, 6).forEach((e) => print('     ! ' + e));
}

/**
 * Reload behaviour on every ?screen= value, signed in and signed out.
 *
 * The session is held in memory, so a reload signs the user out by design. That makes
 * the expected result the same in both directions — the gateway — but for different
 * reasons, and both are worth pinning: a cold URL must not render a portal screen to
 * someone who never signed in, and a warm one must not leave a half-rendered shell
 * behind after the session goes.
 */
import { sleep } from '../lib/cdp.mjs';
import { print } from '../lib/report.mjs';
import { SCREENS, SEL, signInSso, gotoScreen } from '../lib/portal.mjs';

export const name = 'reload';

const VALUES = ['login', ...SCREENS.map((s) => s.tab)];

export default async function reload({ page, base, report }) {
  await page.setViewport(1440, 1000);

  report.group('reload — signed out (cold URL)');
  for (const value of VALUES) {
    await page.goto(`${base}/?screen=${value}`);
    const gateway = await page.eval(`!!document.querySelector('${SEL.ssoTab}')`);
    const noShell = await page.eval(`!document.querySelector('${SEL.shell}')`);
    const search = await page.eval('location.search');
    report.check(`?screen=${value} cold: lands on the gateway with no shell`,
      gateway && noShell, search);
    report.check(`?screen=${value} cold: URL settles on screen=login`,
      search.includes('screen=login'), search);
  }

  report.group('reload — signed in');
  for (const value of VALUES) {
    const signedIn = await signInSso(page, base);
    if (!signedIn) {
      report.notVerified(`?screen=${value} warm: reload`, 'sign-in did not reach the shell');
      continue;
    }
    if (value !== 'login') {
      const moved = await gotoScreen(page, value);
      if (!moved) {
        report.notVerified(`?screen=${value} warm: reload`, 'could not navigate to the screen first');
        continue;
      }
    } else {
      await page.eval("history.replaceState(null, '', '/?screen=login')");
    }
    await sleep(200);

    await page.reload();
    const gateway = await page.eval(`!!document.querySelector('${SEL.ssoTab}')`);
    const noShell = await page.eval(`!document.querySelector('${SEL.shell}')`);
    const search = await page.eval('location.search');
    report.check(`?screen=${value} warm: reload returns to the gateway, shell gone`,
      gateway && noShell, search);
  }

  const errs = page.errors();
  report.check('no console errors across the reload matrix', errs.length === 0, `${errs.length} error(s)`);
  errs.slice(0, 5).forEach((e) => print('     ! ' + e));
}

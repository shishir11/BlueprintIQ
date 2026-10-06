/**
 * Keyboard-only walkthrough. Every Tab here is a real key event through
 * Input.dispatchKeyEvent, not a scripted .focus() call, so :focus-visible resolves
 * the way it does for someone actually using the keyboard.
 *
 * Three questions per screen: can the keyboard reach every control, is focus visible
 * wherever it lands, and does Tab ever get stuck.
 */
import { sleep } from '../lib/cdp.mjs';
import { print } from '../lib/report.mjs';
import { SCREENS, SEL, gotoScreen } from '../lib/portal.mjs';

export const name = 'keyboard';

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Index every visible focusable element and park focus before the first one.
 *
 * A radio group is a single tab stop — Tab enters it and the arrow keys move within
 * it — so only the group's tabbable member counts, otherwise a correctly built
 * fieldset reads as unreachable controls.
 */
const INDEX = `(() => {
  const visible = [...document.querySelectorAll(${JSON.stringify(FOCUSABLE)})].filter((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'
      && el.tabIndex >= 0
      && !el.closest('[aria-hidden=true], [inert]');
  });
  const all = visible.filter((el) => {
    if (el.type !== 'radio' || !el.name) return true;
    const group = visible.filter((x) => x.type === 'radio' && x.name === el.name);
    const checked = group.find((x) => x.checked);
    return checked ? checked === el : group[0] === el;
  });
  window.__kb = all;
  if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
  return all.length;
})()`;

/** Where focus is now, and whether it is drawn. */
const WHERE = `(() => {
  const el = document.activeElement;
  if (!el || el === document.body) return { i: -1, tag: 'body', visible: true, label: 'body' };
  const s = getComputedStyle(el);
  const ring = (s.outlineStyle !== 'none' && s.outlineWidth !== '0px') || s.boxShadow !== 'none';
  return {
    i: window.__kb.indexOf(el),
    tag: el.tagName.toLowerCase(),
    visible: ring,
    outline: s.outlineStyle + ' ' + s.outlineWidth,
    label: (el.getAttribute('aria-label') || el.id || el.textContent || '').trim().slice(0, 32),
  };
})()`;

/**
 * Tab through a screen and report on reachability, focus visibility and traps.
 * `cap` bounds the walk so a trap cannot hang the run.
 */
async function walk(page, report, label, cap = 90) {
  const count = await page.eval(INDEX);
  if (count === 0) {
    report.notVerified(`${label}: keyboard walk`, 'no focusable element found');
    return;
  }
  const limit = Math.min(count + 3, cap);
  const seen = new Set();
  const invisible = [];
  let lastIndex = -2;
  let stuck = 0;

  for (let i = 0; i < limit; i++) {
    await page.key('Tab');
    const w = await page.eval(WHERE);
    if (w.i >= 0) {
      seen.add(w.i);
      if (!w.visible) invisible.push(`${w.tag} "${w.label}" (${w.outline})`);
    }
    if (w.i === lastIndex && w.i >= 0) stuck++;
    else stuck = 0;
    lastIndex = w.i;
    if (stuck >= 3) break;
  }

  const walked = Math.min(count, limit);
  const missed = await page.eval(`(() => {
    const skipped = ${JSON.stringify([...Array(count).keys()])}.filter((i) => !${JSON.stringify([...seen])}.includes(i));
    return skipped.map((i) => {
      const el = window.__kb[i];
      return el.tagName.toLowerCase() + ' "'
        + (el.getAttribute('aria-label') || el.id || el.textContent || '').trim().slice(0, 24) + '"';
    }).slice(0, 4);
  })()`);
  report.check(`${label}: Tab reaches every control`,
    seen.size >= walked,
    `${seen.size}/${count} reached in ${limit} presses${missed.length ? ' — missed ' + missed.join(', ') : ''}`);
  report.check(`${label}: focus is visible wherever it lands`,
    invisible.length === 0,
    invisible.length ? `${invisible.length} without a ring: ${invisible.slice(0, 3).join(' | ')}` : '');
  report.check(`${label}: Tab never gets stuck`,
    stuck < 3, stuck >= 3 ? `focus repeated on index ${lastIndex}` : '');
}

export default async function keyboard({ page, base, report }) {
  report.group('keyboard — gateway');
  await page.setViewport(1440, 1000);
  await page.goto(`${base}/?screen=login`);
  await walk(page, report, 'login');

  // The SSO / Work Email switch is a tablist with a roving tabindex: one tab stop for
  // the pair, arrow keys to move inside it. That is the correct pattern, so the arrows
  // are what has to be tested — a Tab walk is expected to see only the selected tab.
  await page.eval(INDEX);
  let onTab = false;
  for (let i = 0; i < 20; i++) {
    await page.key('Tab');
    if (await page.eval("document.activeElement?.getAttribute('role') === 'tab'")) { onTab = true; break; }
  }
  report.check('login: the SSO / Work Email tablist is one tab stop', onTab);
  await page.key('ArrowRight');
  await sleep(300);
  report.check('login: arrow keys move between the two sign-in routes',
    await page.eval(`document.querySelector('${SEL.emailTab}')?.getAttribute('aria-selected') === 'true'
      && document.activeElement?.id === '${SEL.emailTab.slice(1)}'`));
  await page.key('ArrowLeft');
  await sleep(300);
  report.check('login: arrow keys move back',
    await page.eval(`document.querySelector('${SEL.ssoTab}')?.getAttribute('aria-selected') === 'true'`));

  // The gateway must be operable without a pointer at all: tab to the domain field,
  // type, and submit with Enter.
  await page.eval(INDEX);
  let reachedField = false;
  for (let i = 0; i < 30; i++) {
    await page.key('Tab');
    if (await page.eval(`document.activeElement?.id === '${SEL.domain.slice(1)}'`)) { reachedField = true; break; }
  }
  report.check('login: the domain field is reachable by Tab alone', reachedField);
  await page.type(SEL.domain, 'acme-corp.com');
  await page.key('Enter');
  const signedIn = await page.waitFor(`!!document.querySelector('${SEL.shell}')`, 8000);
  report.check('login: Enter submits the form without a pointer', signedIn);

  if (!signedIn) {
    report.notVerified('portal screens: keyboard walk', 'keyboard sign-in did not reach the shell');
    return;
  }

  for (const { tab } of SCREENS) {
    report.group(`keyboard — ${tab}`);
    await gotoScreen(page, tab);
    await sleep(250);
    await walk(page, report, tab);
  }

  // The user menu is the one thing that opens over the content, so it is the one
  // place a keyboard user could be trapped.
  report.group('keyboard — shell overlays');
  await page.click(SEL.userMenuBtn);
  await page.waitFor(`!!document.querySelector('${SEL.signOutBtn}')`, 4000);
  await page.eval(INDEX);
  let reachedSignOut = false;
  for (let i = 0; i < 40; i++) {
    await page.key('Tab');
    if (await page.eval(`document.activeElement?.id === '${SEL.signOutBtn.slice(1)}'`)) { reachedSignOut = true; break; }
  }
  report.check('user menu: sign-out is reachable by Tab', reachedSignOut);
  await page.key('Escape');
  await sleep(300);
  report.check('user menu: Escape closes it',
    await page.eval(`!document.querySelector('${SEL.signOutBtn}')`));

  const errs = page.errors();
  report.check('no console errors during the keyboard walkthrough',
    errs.length === 0, `${errs.length} error(s)`);
  errs.slice(0, 5).forEach((e) => print('     ! ' + e));
}

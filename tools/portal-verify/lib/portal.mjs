/**
 * Facts about the portal the suites share: the screen list, the selectors the
 * components expose for testing, and the two ways in.
 */
export const SCREENS = [
  { tab: 'portal-onboarding', label: 'Organisation Access' },
  { tab: 'portal-invoicing', label: 'Billing & Invoicing' },
  { tab: 'portal-ingestion', label: 'Document Ingestion' },
  { tab: 'portal-governance', label: 'Sign-off & Governance' },
  { tab: 'portal-output', label: 'Synthesis Output' },
];

export const SEL = {
  shell: '#portal-content',
  rail: 'nav[aria-label="Portal sections"]',
  drawerBtn: '#portal-drawer-btn',
  userMenuBtn: '#portal-user-menu-btn',
  signOutBtn: '#portal-sign-out-btn',
  email: '#portal-login-email',
  secret: '#portal-login-secret',
  error: '#portal-login-error',
  submit: 'form button[type=submit]',
};

/** True when no marketing navbar or footer is on the page — asserted by tag, still worth keeping. */
export const NO_MARKETING_TAGS =
  '!document.querySelector(\'header nav[aria-label="Main Navigation"]\') && !document.querySelector("footer")';

// Marketing chrome is anything pinned to the viewport that does not belong to the portal shell.
// Checked by position, not by tag — the previous nav/footer check passed while a fixed <aside>
// nav pill sat over every portal screen. Returns the offenders so a failure names them.
// Visibility is tested with getClientRects(), not offsetParent: a position:fixed element reports
// offsetParent === null in Chromium, so an offsetParent filter would silently skip the very fixed
// element this check exists to catch. Anchored on #portal-shell so the shell's own fixed/sticky
// chrome (sticky top bar, mobile drawer) is excluded; asserted on portal screens, where the shell
// is present. The login gateway keeps its pill deliberately, so this is not asserted there.
export const NO_CHROME = `(() => {
  const shell = document.getElementById('portal-shell') || document.querySelector('[data-portal-shell]');
  const pinned = [...document.body.querySelectorAll('*')].filter((el) => {
    const p = getComputedStyle(el).position;
    return (p === 'fixed' || p === 'sticky') && el.getClientRects().length > 0;
  }).filter((el) => !shell || !shell.contains(el));
  return { ok: pinned.length === 0, found: pinned.map((el) => el.tagName + '.' + String(el.className).slice(0, 60)) };
})()`;

export const errorText = `document.querySelector('${SEL.error}')?.textContent?.trim() || ''`;

/**
 * The gateway is one form: work email and password. There is no SSO route and no mode switch, so
 * the email field is also what identifies the gateway as being on screen.
 */
export const GATEWAY = `!!document.querySelector('${SEL.email}')`;

/** Sign in and wait for the shell. Returns true if the shell appeared. */
export async function signInEmail(page, base, email = 'e.vance@acmeglobal.com', secret = 'blueprint-demo') {
  await page.goto(`${base}/?screen=login`);
  await page.waitFor(`!!document.querySelector('${SEL.email}')`, 4000);
  await page.type(SEL.email, email);
  await page.type(SEL.secret, secret);
  await page.click(SEL.submit);
  return page.waitFor(`!!document.querySelector('${SEL.shell}')`, 8000);
}

/**
 * Move to a portal screen through the rail, opening the drawer first on narrow
 * viewports. Returns true when the URL has caught up.
 */
export async function gotoScreen(page, tab) {
  const { label } = SCREENS.find((s) => s.tab === tab);
  await page.eval(`(() => {
    const d = document.querySelector('${SEL.drawerBtn}');
    if (d && getComputedStyle(d).display !== 'none') d.click();
  })()`);
  await page.waitFor(`!!document.querySelector('${SEL.rail}')`, 4000);
  const clicked = await page.clickText(label, SEL.rail);
  if (!clicked) return false;
  return page.waitFor(`location.search.includes(${JSON.stringify(tab)})`, 6000);
}

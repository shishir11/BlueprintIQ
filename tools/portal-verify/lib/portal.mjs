/**
 * Facts about the portal the suites share: the screen list, the selectors the
 * components expose for testing, and the two ways in.
 */
export const SCREENS = [
  { tab: 'portal-onboarding', label: 'Organisation Access' },
  { tab: 'portal-billing', label: 'Commercial & Billing' },
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
  ssoTab: '#portal-login-tab-sso',
  emailTab: '#portal-login-tab-email',
  domain: '#portal-login-domain',
  email: '#portal-login-email',
  secret: '#portal-login-secret',
  error: '#portal-login-error',
  submit: 'form button[type=submit]',
};

/** True when no marketing navbar or footer is on the page. */
export const NO_CHROME =
  '!document.querySelector(\'header nav[aria-label="Main Navigation"]\') && !document.querySelector("footer")';

export const errorText = `document.querySelector('${SEL.error}')?.textContent?.trim() || ''`;

/** Sign in over SSO and wait for the shell. Returns true if the shell appeared. */
export async function signInSso(page, base, identifier = 'acme-corp.com') {
  await page.goto(`${base}/?screen=login`);
  await page.type(SEL.domain, identifier);
  await page.click(SEL.submit);
  return page.waitFor(`!!document.querySelector('${SEL.shell}')`, 8000);
}

/** Sign in with an email/password pair and wait for the shell. */
export async function signInEmail(page, base, email, secret = 'blueprint-demo') {
  await page.goto(`${base}/?screen=login`);
  await page.click(SEL.emailTab);
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

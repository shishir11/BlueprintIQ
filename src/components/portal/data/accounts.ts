/* Demo accounts for the static portal. No real authentication: these are the only credentials the
   gateway accepts, matched in memory by PortalSession. Replace this module with a real identity
   source without touching a component. */

export type PortalRole = 'Super Admin' | 'Billing Admin' | 'Security Auditor';

export interface PortalUser {
  id: string;
  name: string;
  role: PortalRole;
  title: string;
  email: string;
  initials: string;
}

export interface PortalOrg {
  name: string;
  tenantId: string;
  region: string;
  plan: string;
}

export const PORTAL_ORG: PortalOrg = {
  name: 'Acme Global Technologies Inc.',
  tenantId: 'strata-org-842',
  region: 'us-east-va-1',
  plan: 'Enterprise Scale (Custom)',
};

export const ELEANOR: PortalUser = {
  id: 'usr-eleanor-vance',
  name: 'Eleanor Vance',
  role: 'Super Admin',
  title: 'VP Enterprise Infrastructure',
  email: 'e.vance@acmeglobal.com',
  initials: 'EV',
};

export const PORTAL_USERS: PortalUser[] = [
  ELEANOR,
  {
    id: 'usr-david-chen',
    name: 'David Chen',
    role: 'Billing Admin',
    title: 'Head of Procurement',
    email: 'd.chen@acmeglobal.com',
    initials: 'DC',
  },
  {
    id: 'usr-sarah-lin',
    name: 'Dr Sarah Lin',
    role: 'Security Auditor',
    title: 'Principal Security Architect',
    email: 's.lin@acmeglobal.com',
    initials: 'SL',
  },
];

/** Domains and tenant ids the SSO route accepts. Both resolve to the super admin. */
export const SSO_IDENTIFIERS: string[] = ['acme-corp.com', 'strata-org-842'];

/** The single password every Work Email demo account uses. */
export const DEMO_PASSWORD = 'blueprint-demo';

export const AUTH_MESSAGES = {
  unknownOrg: 'We could not find that organisation.',
  badCredentials: 'Those details did not match.',
  emptyDomain: 'Enter your corporate domain or tenant ID.',
  emptyEmail: 'Enter your work email address.',
} as const;

/** Rows rendered by the DEV-only credentials helper under the login card. */
export const DEMO_CREDENTIALS: { route: 'sso' | 'email'; enter: string; password?: string; signsInAs: string }[] = [
  { route: 'sso', enter: 'acme-corp.com', signsInAs: 'Eleanor Vance · Super Admin' },
  { route: 'sso', enter: 'strata-org-842', signsInAs: 'Eleanor Vance · Super Admin' },
  { route: 'email', enter: 'e.vance@acmeglobal.com', password: DEMO_PASSWORD, signsInAs: 'Eleanor Vance · Super Admin' },
  { route: 'email', enter: 'd.chen@acmeglobal.com', password: DEMO_PASSWORD, signsInAs: 'David Chen · Billing Admin' },
  { route: 'email', enter: 's.lin@acmeglobal.com', password: DEMO_PASSWORD, signsInAs: 'Dr Sarah Lin · Security Auditor' },
];

export function findBySso(identifier: string): PortalUser | null {
  const value = identifier.trim().toLowerCase();
  return SSO_IDENTIFIERS.includes(value) ? ELEANOR : null;
}

export function findByEmail(email: string, password: string): PortalUser | null {
  const value = email.trim().toLowerCase();
  const match = PORTAL_USERS.find((u) => u.email.toLowerCase() === value);
  return match && password === DEMO_PASSWORD ? match : null;
}

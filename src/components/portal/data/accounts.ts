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

/** The single password every demo account uses. */
export const DEMO_PASSWORD = 'blueprint-demo';

export const AUTH_MESSAGES = {
  badCredentials: 'Those details did not match.',
  emptyEmail: 'Enter your work email address.',
} as const;

export function findByEmail(email: string, password: string): PortalUser | null {
  const value = email.trim().toLowerCase();
  const match = PORTAL_USERS.find((u) => u.email.toLowerCase() === value);
  return match && password === DEMO_PASSWORD ? match : null;
}

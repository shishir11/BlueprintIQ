/* Fixture data for the provisioning wizard, read from `Onboarding org access.png`.
   Supplied mockup content. Swap this module for a real source without touching the screen. */

export interface WizardStep {
  index: string;
  title: string;
  state: 'Completed' | 'Active' | 'In Scope' | 'Upcoming' | 'Sign-Off';
}

export const ONBOARDING_HEADER = {
  breadcrumb: ['Tenants', 'Acme Global Ent.', 'Onboarding Provisioning'],
  region: 'eu-west-2',
  stepChip: 'Enterprise Setup: Step 3 of 7',
  tenantChip: 'Acme Global Ent.',
  systemStatus: 'All Systems Operational',
};

export const WIZARD_STEPS: WizardStep[] = [
  { index: '01', title: 'Profile', state: 'Completed' },
  { index: '02', title: 'Key Contacts', state: 'Active' },
  { index: '03', title: 'Access & SCIM', state: 'In Scope' },
  { index: '04', title: 'Billing', state: 'Upcoming' },
  { index: '05', title: 'Compliance', state: 'Upcoming' },
  { index: '06', title: 'Business Rules', state: 'Upcoming' },
  { index: '07', title: 'Go-Live', state: 'Sign-Off' },
];

export const ORG_METADATA = {
  badge: 'KYB Registry Lookup',
  brandName: 'Acme Global Technologies Inc.',
  legalName: 'Acme Global Technologies Corporation Ltd.',
  industry: 'Financial Services / Fintech',
  industryOptions: [
    'Financial Services / Fintech',
    'Insurance & Actuarial',
    'Manufacturing & Industrial',
    'Retail & Commerce',
    'Energy & Utilities',
  ],
  workforce: '1,000 - 4,999 employees',
  workforceOptions: [
    '250 - 999 employees',
    '1,000 - 4,999 employees',
    '5,000 - 19,999 employees',
    '20,000+ employees',
  ],
  domain: 'acmeglobal.com',
  taxId: 'US-EIN: 12-3456789',
  taxBadge: 'ON FILE',
  headquarters:
    '100 Enterprise Way, Suite 400, Wilmington, DE 19801 / Operations: One World Trade, New York, NY',
};

export const PROVISIONING_VELOCITY = {
  badge: 'ON SCHEDULE',
  percent: 42,
  milestones: '3 of 7 Milestones Active',
  next: 'Next: billing tier validation and workspace provisioning.',
  remaining: 'Est. Time Remaining: 14 mins',
};

export const ONBOARDING_ACTIONS = {
  primary: 'Continue to Billing & Security',
  secondary: 'Previous Step',
  tertiary: 'Save as Draft',
  sessionToken: 'Session Token ID: ST-9981-83193-ACME',
};

/* Fixture data for the provisioning wizard, read from `Onboarding org access.png`.
   Supplied mockup content. Swap this module for a real source without touching the screen. */

export interface WizardStep {
  index: string;
  title: string;
  state: 'Completed' | 'Active' | 'In Scope' | 'Upcoming' | 'Sign-Off';
}

export interface ContactCard {
  role: string;
  name: string;
  title: string;
  email: string;
  phone: string;
}

export interface StagedUser {
  initials: string;
  name: string;
  email: string;
  preset: string;
  unit: string;
  status: string;
}

export interface ReadinessItem {
  done: boolean;
  title: string;
  detail: string;
}

export const ONBOARDING_HEADER = {
  breadcrumb: ['Tenants', 'Acme Global Ent.', 'Enterprise Workspace Provisioning'],
  region: 'us-east-va-1',
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
  badge: 'KYB Registry Verified',
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
  taxBadge: 'VALIDATED',
  headquarters:
    '100 Enterprise Way, Suite 400, Wilmington, DE 19801 / Operations: One World Trade, New York, NY',
};

export const GOVERNANCE_CONTACTS: ContactCard[] = [
  {
    role: 'Primary Organization Admin',
    name: 'Eleanor Vance',
    title: 'VP of Enterprise Infrastructure',
    email: 'e.vance@acmeglobal.com',
    phone: '+1 (555) 382-9104',
  },
  {
    role: 'Secondary Lead',
    name: 'Marcus Reed',
    title: 'Senior Director of DevOps',
    email: 'm.reed@acmeglobal.com',
    phone: '+1 (555) 441-2099',
  },
  {
    role: 'Technical / CISO Delegate',
    name: 'Dr. Sarah Lin',
    title: 'Principal Security Architect',
    email: 's.lin@acmeglobal.com',
    phone: '+1 (555) 890-3321',
  },
  {
    role: 'Billing & Procurement Custodian',
    name: 'David Chen',
    title: 'Head of Procurement & FP&A',
    email: 'd.chen@acmeglobal.com',
    phone: '+1 (555) 712-4011',
  },
];

export const SEAT_ENTITLEMENT = {
  title: 'Provisioned Workspace Seat Entitlement',
  subtitle: 'Scalable across global multi-region deployments',
  total: 250,
  totalLabel: 'Seats Allocated',
  pools: [
    { label: 'Active Core Seats', value: 170, step: 0 },
    { label: 'Reserved Staging', value: 35, step: 1 },
    { label: 'Buffer Float', value: 45, step: 2 },
  ],
};

export const SCIM_PROVIDERS = [
  { code: 'OK', name: 'Okta SCIM', state: 'Connected & Ready' },
  { code: 'AZ', name: 'Entra ID (Azure)', state: 'Available' },
  { code: 'WD', name: 'Workday Cloud', state: 'Available' },
];

export const BULK_INGEST = {
  title: 'Bulk Ingest User Roster (.CSV or JSON)',
  detail: 'Include headers: Full Name, Work Email, System Role, Department',
  secondaryAction: 'Download Sample Schema',
  primaryAction: 'Upload File',
};

export const STAGED_USERS: StagedUser[] = [
  {
    initials: 'EV', name: 'Eleanor Vance', email: 'e.vance@acmeglobal.com',
    preset: 'Super Admin', unit: 'Infrastructure & Eng', status: 'Ready',
  },
  {
    initials: 'SL', name: 'Dr. Sarah Lin', email: 's.lin@acmeglobal.com',
    preset: 'Security Auditor', unit: 'SecOps & Compliance', status: 'Ready',
  },
  {
    initials: 'DC', name: 'David Chen', email: 'd.chen@acmeglobal.com',
    preset: 'Billing Admin', unit: 'Finance & Treasury', status: 'Ready',
  },
  {
    initials: 'MR', name: 'Marcus Reed', email: 'm.reed@acmeglobal.com',
    preset: 'Member', unit: 'Core DevOps', status: 'Ready',
  },
];

export const RBAC_TEMPLATES = [
  {
    id: 'fintech-strict',
    name: 'Fintech Strict',
    detail: 'Requires dual-authorization on API secret creation and key rotation.',
  },
  {
    id: 'standard-enterprise',
    name: 'Standard Enterprise',
    detail: 'Single-tenant isolation with self-serve dev team provisioning.',
  },
  {
    id: 'custom-tier',
    name: 'Custom Tier Matrix',
    detail: 'Map fine-grained permissions to external LDAP attributes.',
  },
];

export const PROVISIONING_VELOCITY = {
  badge: 'ON SCHEDULE',
  percent: 42,
  milestones: '3 of 7 Milestones Active',
  next: 'Next: SAML Identity Provider assertion exchange & billing tier validation.',
  remaining: 'Est. Time Remaining: 14 mins',
};

export const CSM_POD = {
  label: 'Dedicated CSM Pod',
  availability: 'Available Now',
  name: 'Jessica Alvarez',
  title: 'Enterprise Onboarding Lead',
  org: 'StrataCloud Global Accounts',
  quote:
    'Hi Eleanor & Marcus, I am monitoring Acme’s tenant provisioning. I can assist in setting up '
    + 'SCIM custom claims directly if needed.',
  actions: ['Schedule Call', 'Live Chat'],
};

export const READINESS: ReadinessItem[] = [
  {
    done: true,
    title: 'Authorized Signatory Assigned',
    detail: 'Eleanor Vance verified with corporate delegated signing power.',
  },
  {
    done: true,
    title: 'Valid Legal Entity Classification',
    detail: 'EIN 12-3456789 verified with automated Delaware registry lookup.',
  },
  {
    done: true,
    title: 'SCIM Directory Endpoint Defined',
    detail: 'Okta Tenant connection authenticated via mutual TLS handshake.',
  },
  {
    done: false,
    title: 'Payment Method or PO Bond',
    detail: 'To be established in Stage 4 (Billing & Subscription).',
  },
  {
    done: false,
    title: 'Enterprise Data Processing Addendum',
    detail: 'Scheduled for electronic signature in Stage 5 (Compliance).',
  },
];

export const ONBOARDING_ACTIONS = {
  primary: 'Continue to Billing & Security',
  secondary: 'Previous Step',
  tertiary: 'Save as Draft',
  sessionToken: 'Session Token ID: ST-9981-83193-ACME',
};

/* Fixture data for commercial & billing setup, read from `Billing onboarding.png`.
   Supplied mockup content. */

export interface PlanTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  active: boolean;
  badge?: string;
}

export interface EscalationRow {
  role: string;
  contact: string;
  channel: string;
  sla: string;
  status: string;
}

export interface Division {
  name: string;
  detail: string;
  ledger: string;
}

export const BILLING_STEPS = [
  { index: '1', title: 'Tenant Profile', state: 'Verified' },
  { index: '2', title: 'SSO & SAML', state: 'Configured' },
  { index: '3', title: 'RBAC & SCIM', state: 'Mapped' },
  { index: '4', title: 'Commercial & Billing', state: 'In Progress' },
  { index: '5', title: 'Security Vault', state: 'Required' },
  { index: '6', title: 'Business Units', state: 'Pending' },
  { index: '7', title: 'Go-Live Signoff', state: 'Final Stage' },
];

export const BILLING_SECTIONS = [
  'Section 4: Commercial & Billing',
  'Section 5: Security & Compliance',
  'Section 6: Business Units',
  'Section 7: Go-Live & Matrix',
];

export const PLAN_TIERS: PlanTier[] = [
  {
    id: 'enterprise-scale',
    name: 'Enterprise Scale (Custom)',
    price: '$48,000',
    cadence: '/ annum billed annually',
    blurb: 'Unlimited nodes, custom retention, 99.99% uptime SLA, dedicated infrastructure pod.',
    features: ['Dedicated VPC', 'Custom BAA', '24/7 TAM', 'Unlimited SCIM'],
    active: true,
    badge: 'Active Tier',
  },
  {
    id: 'professional',
    name: 'Professional Tier',
    price: '$19,500',
    cadence: '/ annum',
    blurb: 'Shared multi-tenant clusters, standard SLA (99.9%), community & ticketed email support.',
    features: ['Multi-tenant', 'Standard Support', '500 Seats Max'],
    active: false,
    badge: 'Standard B2B',
  },
];

export const CONTRACT_DATES = {
  start: { label: 'Contract Start Date', value: 'Oct 01, 2025' },
  renewal: { label: 'Renewal / Term End', value: 'Sep 30, 2026 (1-Yr Term)' },
  po: { label: 'Purchase Order (PO) Number', value: 'PO-2025-8841-ENT' },
};

export const INVOICING_ENTITY = {
  heading: 'Billing Entity & Invoicing Dispatch',
  editLabel: 'Edit Legal Entity',
  corporate: {
    label: 'Corporate Invoicing Entity',
    name: 'Acme Global Enterprises Holdings, Inc.',
    lines: ['450 Technology Parkway, Suite 1200', 'Reston, VA 20190, United States'],
    meta: 'DUNS: 09-338-1294 • VAT/EIN: XX-XXX9281',
  },
  routing: {
    label: 'Invoice Routing & Accounts Payable',
    email: 'invoices-ap@acmeglobal.corp',
    attn: 'Attn: Procurement & Treasury (Level 4)',
    chips: ['Net 30 Terms Approved', 'W-9 / Tax Exempt Validated'],
  },
};

export const SETTLEMENT_METHODS = [
  { id: 'net30', name: 'Direct Net 30 Terms', detail: 'Invoiced via Coupa / SAP' },
  { id: 'ach', name: 'ACH / Wire Transfer', detail: 'J.P. Morgan Clearing' },
  { id: 'card', name: 'Corporate Credit Card', detail: 'Amex / P-Card Auto-debit' },
];

export const CLOUD_ZONES = [
  {
    name: 'US-East (Gov / Comm)',
    meta: 'us-east-va-1 • Northern Virginia',
    detail: 'Ultra-low latency cluster, FedRAMP & SOC2 dual compliant.',
  },
  {
    name: 'EU-Central (Frankfurt)',
    meta: 'eu-central-de-1 • Germany',
    detail: 'Strict GDPR boundary, localized cryptographic keys.',
  },
  {
    name: 'APAC (Sydney)',
    meta: 'ap-southeast-au-2 • Australia',
    detail: 'IRAP aligned, regional hot data mirror.',
  },
];

export const COMPLIANCE_FRAMEWORK = [
  { id: 'soc2', name: 'SOC 2 Type II', detail: 'Annual audit review on file. Updated Aug 2025.', status: 'Certified' },
  { id: 'iso', name: 'ISO/IEC 27001:2022', detail: 'Information Security Management System active.', status: 'Certified' },
  { id: 'gdpr', name: 'GDPR / EU DPA Addendum', detail: 'Includes Standard Contractual Clauses (SCCs).', status: 'Signed' },
  { id: 'hipaa', name: 'HIPAA BAA Agreement', detail: 'acme_executed_baa_2025.pdf (1.4 MB)', status: 'Uploaded (PDF)' },
];

export const ESCALATION_MATRIX: EscalationRow[] = [
  {
    role: 'CISO / Executive Sec Lead', contact: 'Marcus Vance, VP Sec',
    channel: 'mvance@acmeglobal.corp', sla: '< 15 min (Tier 1 PO)', status: 'Active',
  },
  {
    role: '24/7 SecOps Pager', contact: 'Acme SOC Duty Engine',
    channel: 'pager-soc@acmeglobal.pagerduty.com', sla: 'Immediate Automated', status: 'Verified',
  },
  {
    role: 'Security Hotline Phone', contact: 'Global Dispatch Desk',
    channel: '+1 (800) 555-0199 ext. 8', sla: 'Voice Bridge', status: 'Verified',
  },
];

export const DIVISIONS: Division[] = [
  { name: 'North America Operations (NA-OPS)', detail: 'Default parent unit • 1,420 provisioned users', ledger: 'CC-8840-US' },
  { name: 'EMEA Cloud Ops & Regulatory (EMEA-EU)', detail: 'Sub-tenant • 580 provisioned users', ledger: 'CC-4412-DE' },
  { name: 'APAC Growth & Technology (APAC-ENG)', detail: 'Sub-tenant • 340 provisioned users', ledger: 'CC-9100-SG' },
];

export const GATEKEEPER_POLICIES = [
  {
    name: 'Seat Licenses > 50 users',
    badge: 'Dual Sign-Off',
    detail: 'Requires Department Head and Central IT Procurement approval via automated email digest.',
  },
  {
    name: 'Production Service Accounts & Keys',
    badge: 'CISO Quorum',
    detail: 'Requires cryptographic biometric MFA prompt from 2 designated Security Team Officers.',
  },
];

export const BILLING_MISC = {
  msaBadge: 'MSA Verified (#MSA-2025-ACM)',
  kmsBadge: 'AES-256 KMS Hardware Vault',
  tam: {
    heading: 'Dedicated TAM Available',
    body: 'Need help mapping legacy Active Directory groups or finalizing your HIPAA business associate addendum?',
    action: 'Connect with Enterprise Architect',
  },
  webhook: { name: 'Email Digest', detail: 'Daily Executive' },
  actions: {
    back: 'Back to Roles & Access',
    download: 'Download Onboarding Spec (PDF)',
    draft: 'Save Draft',
    primary: 'Complete Enterprise Setup & Launch Portal',
  },
};

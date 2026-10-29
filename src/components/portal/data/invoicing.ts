/* Fixture data for the billing & invoicing dashboard, read from `billing invoicing.png`.
   Supplied mockup content. */

export interface Invoice {
  id: string;
  period: string;
  issued: string;
  due: string;
  amount: number;
  amountNote?: string;
  instrument: string;
  status: 'Under Review (AP)' | 'Paid & Settled';
}

export const INVOICING_HEADER = {
  title: 'Enterprise Billing & Invoicing',
  intro:
    'Manage multi-tenant subscriptions, contractual commitments, usage metering, and invoice '
    + 'settlement across your global cloud infrastructure.',
  actions: ['Download All Invoices (.ZIP)', 'Edit Billing Entity', 'Change Payment Method'],
};

export const KPI_TILES = [
  {
    label: 'Professional Subscription', value: '$20,000', suffix: '/ yr',
    rows: [{ label: 'Billing Cadence:', value: 'Annual Pre-paid' }, { label: 'Term Valid To:', value: 'Oct 31, 2027' }],
  },
  {
    label: 'COST PER RUN', value: '$5,000', suffix: 'Est. Nov 1 - Remaining runs 3/5',
    rows: [{ label: 'Provisioned Seats:', value: '218 / 250' }, { label: 'Burst Compute Overage:', value: '$220.50' }],
  },
];

export const ENTITLEMENT = {
  tier: 'Enterprise Scale (Custom Tier)',
  badge: 'Active Tier',
  contract: 'Contract ID: CTR-STRATA-2024-99824 • Enterprise Service Agreement Version 4.1',
  actions: ['Review MSA Agreement (.PDF)', 'Request Seat Expansion'],
  columns: [
    { label: 'Tenant Pods', value: 'Unlimited Isolated', detail: 'Dedicated VPC encapsulation' },
    { label: 'SLA Guarantee', value: '99.999% High-Avail', detail: 'Financially-backed contract' },
    { label: 'Technical Advisor', value: '24/7 TAM Pod', detail: '< 15 min Sev-1 response' },
    { label: 'Base Licensure', value: '250 Provisioned', detail: '$16/mo pooled overage' },
    { label: 'Data Sovereignty', value: 'Multi-Region Hot', detail: 'US, EU-Frankfurt, SG nodes' },
  ],
  cycle: {
    title: 'Contract Cycle: Nov 1, 2024 → Nov 1, 2026 (24 Months Committed)',
    detail: 'Co-term provisions active • Automatic renewal review triggers at 90 days before expiration.',
    elapsedLabel: 'Days Elapsed in Cycle',
    elapsed: '365 / 730 Days (50%)',
    percent: 50,
  },
};

export const COST_BREAKDOWN = {
  title: 'Cost Breakdown',
  subtitle: 'Allocated by Business Unit',
  exportLabel: 'Export CSV',
  centre: '$3,488',
  centreLabel: 'Mo. Share',
  segments: [
    { label: 'NA-OPS (CC-8840)', seats: '140 seats', value: 2240, percent: '65%', step: 0 },
    { label: 'EMEA Ops (CC-4412)', seats: '58 seats', value: 928, percent: '27%', step: 1 },
    { label: 'APAC Tech (CC-9100)', seats: '20 seats', value: 320, percent: '8%', step: 2 },
  ],
};

export const SETTLEMENT_CHANNELS = {
  title: 'Payment Mode',
  subtitle: 'Active instruments configured for monthly recurring settlements and annual commitments.',
  badge: 'Automated EDI',
  instruments: [
    {
      code: 'EDI', name: 'Direct Net 30 Invoicing (Primary)', tag: 'Primary',
      detail: 'Automated PDF & cXML dispatch to AP ERP',
      meta: 'Recipient: invoices-ap@acmeglobal.corp   Routing: ACM-CORP-SAP-99',
    },
    {
      code: 'AMEX', name: 'Corporate American Express •••• 4082', tag: 'Backup Fallback',
      detail: 'Expires 09/28 • Cardholder: David Chen (VP Procurement)',
      meta: '',
    },
  ],
  footerLinks: ['Add Secondary Payment Method'],
};

export const INVOICE_FILTERS = ['All Invoices (12)', 'Paid (11)', 'Pending Payment', 'Tax & W-9'];

export const INVOICES: Invoice[] = [
  {
    id: 'INV-2025-1001', period: 'Oct 01 - Oct 31, 2025', issued: 'Oct 01, 2025', due: 'Oct 31, 2025',
    amount: 4000, instrument: 'Net 30 (PO-2025-8841)', status: 'Under Review (AP)',
  },
  {
    id: 'INV-2025-0901', period: 'Sep 01 - Sep 30, 2025', issued: 'Sep 01, 2025', due: 'Sep 30, 2025',
    amount: 4000, instrument: 'Net 30 (PO-2025-8841)', status: 'Paid & Settled',
  },
  {
    id: 'INV-2025-0801', period: 'Aug 01 - Aug 31, 2025', issued: 'Aug 01, 2025', due: 'Aug 31, 2025',
    amount: 4250, amountNote: '+$250 storage burst', instrument: 'Corporate Amex •••• 4082', status: 'Paid & Settled',
  },
  {
    id: 'INV-2024-ANNUAL', period: 'Annual Commit (2024-2025)', issued: 'Nov 01, 2024', due: 'Dec 01, 2024',
    amount: 48000, instrument: 'FedWire Transfer (Wells Fargo)', status: 'Paid & Settled',
  },
];

export const INVOICE_FOOTER =
  'Showing 4 of 12 historical statements (1 annual commitment, 11 monthly metered cycles)';

export const BILLING_REPRESENTATIVES = [
  {
    initials: 'DC', name: 'David Chen', tag: 'PRIMARY', title: 'VP Global Procurement',
    email: 'd.chen@acmeglobal.corp', phone: '+1 (703) 555-0192',
  },
  {
    initials: 'EV', name: 'Eleanor Vance', tag: 'FINANCE AP', title: 'Senior Controller (Cloud Ledger)',
    email: 'e.vance@acmeglobal.corp', phone: '+1 (703) 555-0844',
  },
];

export const ALERT_PREFERENCES = [
  { id: 'advance', name: 'Invoice Advance Notice', detail: '7 days prior to settlement due date', on: true },
  { id: 'quota', name: 'Quota Threshold Alert', detail: 'Trigger warning when seats reach 85%', on: true },
  { id: 'renewal', name: 'Annual Term Renewal', detail: 'Dispatch co-term review 60 days prior', on: true },
];

export const INVOICING_FOOTNOTES = {
  reps: 'Changes to primary designated signers require dual-control multi-factor authorization.',
  alerts: 'Dispatch destination: Verified AP Webhook',
};

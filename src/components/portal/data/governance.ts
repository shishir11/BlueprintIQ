/* Fixture data for sign-off & governance, read from `stackholder approval givernance.png`.
   Supplied mockup content. */

export interface Signatory {
  id: string;
  initials: string;
  name: string;
  roleBadge: string;
  status: string;
  statusTone: 'success' | 'primary' | 'danger' | 'warning';
  title: string;
  email: string;
  scope: string;
  meta: string;
  action: string;
  secondaryAction?: string;
  blocking?: boolean;
  priority?: string;
}

export interface AuditEntry {
  who: string;
  when: string;
  what: string;
  ip: string;
  sha: string;
}

export const GOVERNANCE_HEADER = {
  title: 'Governance',
  intro:
    'Manage required enterprise signatory roles, compliance gatekeepers, audit verification trails, '
    + 'and real-time electronic sign-off workflows for tenant cutover.',
  actions: ['Export Audit Package (.ZIP)', 'Send Reminders', 'Invoke Cutover Lock'],
};

export interface GovernanceTile {
  label: string;
  value: string;
  suffix: string;
  note: string;
  blocker: boolean;
  percent?: number;
}

export const GOVERNANCE_TILES: GovernanceTile[] = [
  {
    label: 'Required Stakeholders', value: '6', suffix: 'Enterprise Roles',
    note: 'Quorum threshold: 100% mandatory', blocker: false,
  },
  {
    label: 'Approvals Completed', value: '4', suffix: '/ 6', note: '66.7% Signed',
    blocker: false, percent: 66.7,
  },
  {
    label: 'Pending Signatures', value: '2', suffix: 'Awaiting Gatekeepers',
    note: 'Legal Counsel & CISO Delegate', blocker: false,
  },
];

export const CUTOVER_BLOCKER = {
  label: 'Next Cutover Blocker',
  title: 'Security BAA Sign-Off',
  detail: 'Required prior to DNS Cutover on Nov 15, 2025',
  sla: 'SLA Window: 72h',
  countdown: 'T-minus 4 days',
};

export const SIGNATORY_MATRIX = {
  title: 'Active Signatory Matrix & Roster',
  subtitle: 'Validated cryptographic signing authority mapped to tenant cutover policy.',
  filterPlaceholder: 'Filter role or name...',
};

export const SIGNATORIES: Signatory[] = [
  {
    id: 'eleanor', initials: 'EV', name: 'Eleanor Vance', roleBadge: 'Primary Sponsor',
    status: 'Signed & Digitally Sealed', statusTone: 'success',
    title: 'VP Technology & Enterprise Infrastructure', email: 'e.vance@acmeglobal.com',
    scope: 'Master Contract & Tenant Provisioning', meta: 'Oct 28, 2025 • SHA-256 Validated',
    action: 'Audit Certificate',
  },
  {
    id: 'david', initials: 'DC', name: 'David Chen', roleBadge: 'Tech Gatekeeper',
    status: 'Active / Verified', statusTone: 'primary',
    title: 'Principal Solution Architect & Cloud Ops', email: 'd.chen@acmeglobal.com',
    scope: 'Architecture & Direct-Connect Sign-Off', meta: 'Oct 29, 2025 • Hardware Key Auth',
    action: 'View Specs',
  },
  {
    id: 'sarah', initials: 'SJ', name: 'Sarah Jenkins', roleBadge: 'Project PM',
    status: 'Signed & Completed', statusTone: 'success',
    title: 'Lead Implementation PM', email: 's.jenkins@acmeglobal.com',
    // portal-ui-allow: raw-hex  — DocuSign envelope id from the mockup, not a colour
    scope: 'Milestone Schedule & Acceptance Criteria', meta: 'Oct 30, 2025 • DocuSign ID #44901',
    action: 'Milestones',
  },
  {
    id: 'marcus', initials: 'MV', name: 'Marcus Vance', roleBadge: 'High Priority',
    status: 'Signature Pending (Blocker)', statusTone: 'danger',
    title: 'SecOps & CISO Delegate', email: 'm.vance@acmeglobal.com',
    scope: 'Encryption Keys, KMS Delegation & Incident Escalation BAA', meta: '',
    action: 'Resend Envelope', secondaryAction: 'Review BAA', blocking: true, priority: 'High Priority',
  },
  {
    id: 'helena', initials: 'HR', name: 'Helena Rostova', roleBadge: 'Legal Counsel',
    status: 'In Review / Redline Stage', statusTone: 'warning',
    title: 'VP Legal & General Counsel', email: 'h.rostova@acmeglobal.com',
    scope: 'MSA Addendum, Liability Caps, DPA Signature', meta: '3 Redlines Pending Response',
    action: 'View Redlines',
  },
  {
    id: 'tam', initials: 'TP', name: 'StrataCloud TAM Pod #4', roleBadge: 'Vendor Pod Lead',
    status: 'Provisionally Approved', statusTone: 'primary',
    title: 'Dedicated Enterprise Engineering Pod', email: 'pod4-tam@stratacloud.io',
    scope: 'SLA Tier 1 Guaranteed (99.99%) • Zero-downtime Cutover Orchestration', meta: '',
    action: 'Runbook SLA',
  },
];

export const DELEGATION = {
  title: 'Delegation & Authenticated Proxies',
  subtitle: 'Designate authenticated secondary signers with full tamper-evident audit logging.',
  action: 'Configure Proxies',
  proxies: [
    { initials: 'KL', name: 'Kavita Lamba (Deputy CISO)', detail: 'Proxy for Marcus Vance (SecOps)', state: 'ACTIVE' },
    { initials: 'JW', name: 'Jonathan Wright (Legal Counsel)', detail: 'Proxy for Helena Rostova', state: 'ACTIVE' },
  ],
};

export const QUORUM_POLICY = {
  title: 'Sign-Off Quorum Policy',
  badge: 'ENFORCED',
  body:
    'Production workspace creation locks until both the Technology Sponsor and Legal Counsel submit '
    + 'cryptographically sealed consent.',
  rows: [
    { name: 'VP Tech Mandate', state: 'Satisfied', tone: 'success' as const },
    { name: 'General Counsel', state: 'Redline Pending', tone: 'warning' as const },
    { name: 'SecOps / CISO Sign', state: 'Awaiting Action', tone: 'danger' as const },
  ],
};

export const FRAMEWORK_COMPLIANCE = {
  title: 'Framework Compliance',
  rows: [
    { name: 'SOC 2 Type II', detail: 'Verified by David Chen', state: 'VALIDATED', tone: 'success' as const },
    { name: 'HIPAA BAA', detail: 'Awaiting Marcus Vance', state: 'PENDING', tone: 'danger' as const },
    { name: 'FedRAMP High Moderate', detail: 'StrataCloud Pod #4 Verified', state: 'VALIDATED', tone: 'success' as const },
    { name: 'GDPR / EU SCCs', detail: 'Helena Rostova (Drafting)', state: 'IN DRAFT', tone: 'neutral' as const },
  ],
};

export const AUDIT_LOG = {
  title: 'Cryptographic Audit Log',
  subtitle: 'Real-time immutable ledger',
  masterLabel: 'MASTER LEDGER HASH',
  masterHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  copyLabel: 'Copy',
};

export const AUDIT_ENTRIES: AuditEntry[] = [
  {
    who: 'Eleanor Vance', when: 'Oct 28 • 16:42 UTC',
    what: 'Authenticated via Okta SSO (MFA enforced) and executed Schedule C cutover agreement.',
    ip: 'IP: 198.51.100.44', sha: 'SHA: 9b2d...1e84',
  },
  {
    who: 'David Chen', when: 'Oct 29 • 09:14 UTC',
    what: 'Signed off AWS Direct-Connect redundant ingress mapping (FIPS 140-3 tunnel).',
    ip: 'IP: 203.0.113.12', sha: 'SHA: c74f...aa03',
  },
  {
    who: 'Sarah Jenkins', when: 'Oct 30 • 11:30 UTC',
    // portal-ui-allow: raw-hex  — DocuSign envelope id from the mockup, not a colour
    what: 'Approved Project Go-Live Milestone 3.2 Criteria via DocuSign envelope #44901.',
    ip: 'IP: 192.0.2.78', sha: 'SHA: 551a...89bf',
  },
];

export const CUTOVER_BANNER = {
  title: 'Tenant Provisioning Cutover Blocked',
  detail:
    'Final domain routing and production cluster activation cannot trigger until all 6 signatures '
    + 'are sealed. 2 signers remaining.',
  secondary: 'View Pre-Flight Runbook',
  primary: 'Nudge Pending Approvers',
};

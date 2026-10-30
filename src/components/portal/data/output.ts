/* Fixture data for the synthesis output view, read from `Output.png`. Supplied mockup content. */

export interface MetricTileData {
  label: string;
  value: string;
  rows: { label: string; value: string }[];
}

export interface PatternCard {
  tag: string;
  adoption: string;
  title: string;
  body: string;
  stats: { label: string; value: string }[];
}

export const OUTPUT_HEADER = {
  chips: ['ENTERPRISE SYNTHESIS HUB', 'Acme Global Technologies Inc.', 'Fintech & Banking Tier'],
  meta: ['Professional Tier', 'v3.4 Production Signed', 'Curated AI Strategy based on the customer and region specific'],
  title: 'Autonomous AI Strategy',
  intro:
    'Deterministic technical evaluation, multi-tenant hybrid schema, distributed OCR-Kafka ETL '
    + 'pipelines, and cryptographic safety assurance for multi-region enclave operations '
    + '(US-East & US-Central).',
  sourcesLabel: 'Ingested Specifications (RAG Synced):',
  sources: ['BRD.pdf', 'PRD.pdf', 'SDD.pdf', 'Database Design', 'Infra Design'],
  actions: ['Export Comprehensive Static Site', 'Export Executive Blueprint (PDF)', 'Send final assessment via email'],
};

export const OUTPUT_METRICS: MetricTileData[] = [
  {
    label: 'Technical Feasibility', value: '96.2%',
    rows: [
      { label: 'Technology Stack & Architecture', value: 'High' },
      { label: 'Integration & Interoperability', value: 'high' },
      { label: 'Team Skill & Execution', value: 'Medium' },
    ],
  },
  {
    label: 'Compliance and Security', value: '9',
    rows: [
      { label: 'Tested', value: '9' },
      { label: 'PII Leaks', value: '0' },
      { label: 'Status', value: 'Enforced' },
    ],
  },
  {
    label: 'ADR', value: '12 / 8',
    rows: [
      { label: 'Tested', value: '8' },
      { label: 'Drafted', value: '4' },
      { label: 'Mode', value: 'AI Generated' },
    ],
  },
  {
    label: 'Data Governance', value: '6',
    rows: [
      { label: 'Governance Roles & Accountability', value: '4' },
      { label: 'Data Lifecycle Governance', value: '9' },
      { label: 'Data Classification & Usage Matrix', value: '8' },
      { label: 'Compliance & Regulatory', value: '4' },
      { label: 'Security & Privacy', value: '4' }
    ],
  },
];

export const VALUE_PROPOSITION = {
  title: 'AI Strategy & Executive Value Proposition',
  subtitle: 'We bridge the gap between AI experimentation and enterprise value—turning technology investments into measurable growth, expanded margins, and market dominance.',
  badge: '90-Day Time-to-Value',
};

export const PATTERN_CARDS: PatternCard[] = [
  {
    tag: 'Strategic Objectives 1', adoption: 'Adopted 85%',
    title: 'Operational Efficiency',
    body:
      'Automate manual document workflows and routine '
      + 'customer queries.',
    stats: [
      { label: 'Reduction in processing time', value: '30%' },
      { label: 'Annual cost savings.', value: '$2M' },
    ],
  },
  {
    tag: 'Strategic Objectives 2', adoption: 'Adopted 15%',
    title: 'Revenue Growth',
    body:
      'Embed predictive recommendations and '
      + 'hyper-personalised offerings into products.',
    stats: [
      { label: 'Increase in cross-sell conversion rate.', value: '15%' },
    ],
  },
  {
    tag: 'Strategic Objectives 3', adoption: 'Adopted 25%',
    title: 'Innovation & Speed',
    body:
      'Equip engineers and knowledge workers with '
      + 'generative AI assistants.',
    stats: [
      { label: 'boost in developer velocity and content drafting.', value: '25%' },
    ],
  },
];

export const EXECUTION_HORIZON = {
  label: 'STRATEGIC EXECUTION HORIZON',
  phases: [
    {
      window: 'DAYS 01 - 30', title: 'Phase 1: Retrieval Core',
      body: 'Needs to build the underlying core technical infrastructure to support multi-agent orchestration frameworks, secure RAG pipelines, model governance, and a robust data integration layer—required to drive our agentic AI transformation.',
      status: 'Pending', tone: 'primary' as const,
    },
    {
      window: 'DAYS 31 - 60', title: 'Phase 2: Agentic Validation',
      body: 'Systematically validate multi-agent orchestration based on LangChain/LangGraph multi-step reasoning paths, and compliance guardrails before deployment.',
      status: 'Scheduled', tone: 'success' as const,
    },
    {
      window: 'DAYS 61 - 90', title: 'Phase 3: Production GA',
      body: 'Promote the multi-agent AI platform to production GA, embedding zero-trust guardrails, enterprise SLAs, and full-stack observability.',
      status: 'Scheduled', tone: 'success' as const,
    },
  ],
};

export const TOPOLOGY = {
  title: 'TECHNOLOGY, DATA, INFRASTRUCTURE AND AI ARCHITECTURE',
  subtitle: 'Define the core foundational infrastructure, data readiness, and platform requirements needed to support scalable AI deployment.',
  badge: 'Throughput: 4,500 req/min',
  nodes: [
    { name: 'API Gateway & mTLS', detail: 'Envoy Proxy / gRPC', chip: '0.8ms p99' },
    { name: 'Guardrail Gate 1', detail: 'PII/PCI & Jailbreak', chip: 'Zero-Leak Check' },
    { name: 'Ingest & Kafka', detail: 'Distributed Chunking', chip: '1.8k tok/sec' },
    { name: 'Hybrid DB Core', detail: 'PosgresSql + PgVector', chip: '1536-dim Vector' },
  ],
  footers: [
    { name: 'Zero-Trust Isolation', detail: 'Tenant namespaces keys hashed with customer KMS seeds.' },
    { name: 'Active-Active Dual Enclave', detail: 'US-East-1 & EU-Central-1 real-time consensus replication.' },
    { name: 'Circuit Breaker Mesh', detail: 'Sub-50ms automated failback to opposite deterministic synthesis.' },
  ],
};

export const DELIVERABLES = {
  title: 'Assessment Deliverables',
  subtitle: 'Generated for every assessment and included in the static site and ZIP export.',
  chip: '9 documents',
  items: [
    { name: 'AI Strategy', detail: 'Whether AI is the right answer, and the opportunities ordered by cost.', icon: 'Sparkles' },
    { name: 'Cost Feasibility', detail: 'Cost ranges and payback from the declared usage figures.', icon: 'PiggyBank' },
    { name: 'Technical Feasibility', detail: 'The verdict, the stated cause tested, and the evidence behind it.', icon: 'Gauge' },
    { name: 'Guardrails', detail: 'Proposed controls for the use case and the obligations they map to.', icon: 'ShieldCheck' },
    { name: 'Architectural Decision Records', detail: 'Each design decision, the options weighed, and why.', icon: 'GitBranch' },
    { name: 'Data Governance', detail: 'Ownership, classification and lifecycle of the data involved.', icon: 'Scale' },
    { name: 'Data Architecture', detail: 'Data sources, readiness and the target data flow.', icon: 'Database' },
    { name: 'Design Documents', detail: 'Current and target architecture, drawn from the uploaded material.', icon: 'FileText' },
    { name: 'AI Transformation Roadmap', detail: 'The phased path from today to the target state.', icon: 'Map' },
  ],
};

export const GUARDRAILS = {
  title: 'Proposed AI Guardrails',
  rows: [
    { name: 'AI Governance Board', detail: '', badge: 'Armored', on: true },
    { name: 'AI Risk Assessments', detail: 'AST Fact-Check (Threshold 98.7%)', badge: 'STRICT', on: true },
    { name: 'Training & Awareness', detail: 'Heuristic + Semantic Classifier', badge: 'BLOCK', on: true },
    { name: 'AI Development Lifecycle', detail: 'AST Fact-Check (Threshold 98.7%)', badge: '98.7%', on: true },
    { name: 'Monitoring & Auditing', detail: 'Auto-fallback < 250ms threshold', badge: 'ARMED', on: true },
     { name: 'Continuous Improvement Program', detail: 'Auto-fallback < 250ms threshold', badge: 'ARMED', on: true },
  ],
};

export const RESIDENCY = {
  title: 'Data Sovereignty & Residency',
  subtitle: 'Zero Boundary Spillover',
  badge: 'Dual Enclave',
  regions: [
    { name: 'US-East Region (Virginia)', meta: 'KMS ID: arn:aws:kms:us-east-1:acme', tag: 'PRIMARY' },
    { name: 'EU-Central (Frankfurt)', meta: 'BIPR SCC Residency Enclave', tag: 'ISOLATED' },
  ],
  mapCaption: 'Encrypted In-Transit & At-Rest (FIPS 140-3)',
  fields: [
    { label: 'SCIM Directory Linkage:', value: 'Okta Enterprise IDP' },
    { label: 'Key Rotation Cycle:', value: 'Every 30 Days (Automated)' },
    { label: 'Audit Signature:', value: 'sha256:acme-f4102' },
  ],
};

/* Scope, not attestation. These are the controls the assessment was carried out against; none of
   them claims an audit result, a certificate or a signed framework agreement. */
export const ATTESTATION = {
  title: 'Regulatory scope',
  badge: 'Assessed against',
  subtitle: 'Controls covered by this assessment',
  badges: [
    { name: 'Data isolation', detail: 'Tenant boundary' },
    { name: 'Audit logging', detail: 'Source-traced recommendations' },
    { name: 'Retention control', detail: 'Customer-defined windows' },
    { name: 'In-tenant deployment', detail: 'Runs inside your boundary' },
  ],
  signer: { initials: 'EV', name: 'Eleanor Vance', title: 'VP of Infrastructure • Reviewed' },
};

export const REVIEWERS = {
  title: 'ENTERPRISE REVIEWERS',
  rows: [
    { initials: 'DC', name: 'David Chen', title: 'Technical Gatekeeper', state: 'Approved' },
  ],
};

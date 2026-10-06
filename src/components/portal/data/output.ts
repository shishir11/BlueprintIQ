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
  meta: ['$48,000 ACV Tier', 'v3.4 Production Signed'],
  title: 'Autonomous AI Strategy & Architecture Synthesis',
  intro:
    'Deterministic technical evaluation, multi-tenant hybrid schema, distributed OCR-Kafka ETL '
    + 'pipelines, and cryptographic safety assurance for multi-region enclave operations '
    + '(US-East & US-Central).',
  sourcesLabel: 'Ingested Specifications (RAG Synced):',
  sources: ['BRD_v2.4.pdf', 'PRD_2025_Q4.pdf', 'CoreEngine_SDD_RevC.pdf', 'FedRAMP_Topology.pdf', 'DB_Schema_ERD', 'Static_Audit.sha256'],
  actions: ['Export Executive Blueprint (PDF)', 'Deploy Enclave Pipeline', 'Run Guardrail Simulator'],
};

export const OUTPUT_METRICS: MetricTileData[] = [
  {
    label: 'Technical Feasibility', value: '96.2%',
    rows: [
      { label: 'Latency', value: 'p95: 142ms' },
      { label: 'Target', value: '<180ms' },
      { label: 'Status', value: 'Ready' },
    ],
  },
  {
    label: 'Sanitization & Safety', value: '99.98%',
    rows: [
      { label: 'Tested', value: '1.82M toks' },
      { label: 'PII Leaks', value: '0' },
      { label: 'Status', value: 'Enforced' },
    ],
  },
  {
    label: 'Topology Mapping', value: '42 / 18',
    rows: [
      { label: 'Services', value: '42 Micro' },
      { label: 'Pipelines', value: '18 Streaming' },
      { label: 'Mode', value: 'Dual-AZ' },
    ],
  },
  {
    label: 'Efficiency & ROI', value: '3.8x Velocity',
    rows: [
      { label: 'Cloud Savings', value: '$1.42M/yr' },
      { label: 'TTV', value: '90 Days' },
    ],
  },
];

export const VALUE_PROPOSITION = {
  title: 'AI Strategy & Executive Value Proposition',
  subtitle: 'Core generative AI capability roadmap synthesized from Acme BRD v2.4',
  badge: '90-Day Time-to-Value',
};

export const PATTERN_CARDS: PatternCard[] = [
  {
    tag: 'PRIMARY PATTERN', adoption: 'Adopted 85%',
    title: 'Hybrid Graph-RAG Architecture',
    body:
      'Contextual extraction across transactional ledger data and compliance documents using dense '
      + 'embeddings (text-embedding-3-large, 1536 dims) coupled with Neo4j semantic AST linkage. '
      + 'Eliminates catastrophic forgetting, preserves audit provenance.',
    stats: [
      { label: '$0.0018 / 1k queries', value: '' },
      { label: 'Deterministic citations', value: '' },
    ],
  },
  {
    tag: 'TARGETED PATTERN', adoption: 'Adopted 15%',
    title: 'LoRA Parameter-Efficient Fine-Tuning',
    body:
      'Targeted domain adaptation for proprietary Acme banking transactional dialect and regulatory '
      + 'reporting. Hosted on private dedicated GPU clusters with spot orchestration. Strict enclave '
      + 'data isolation.',
    stats: [
      { label: '8x H100 SXM5 Enclave', value: '' },
      { label: 'Weekly checkpoints', value: '' },
    ],
  },
];

export const EXECUTION_HORIZON = {
  label: 'STRATEGIC EXECUTION HORIZON',
  phases: [
    {
      window: 'DAYS 01 - 30', title: 'Phase 1: Retrieval Core',
      body: 'Dual-region Milvus vector clusters, Kafka real-time ingestion, and basic PII redaction layer.',
      status: 'Completed in Sandbox', tone: 'success' as const,
    },
    {
      window: 'DAYS 31 - 60', title: 'Phase 2: Agentic Validation',
      body: 'LangChain/LangGraph multi-step reasoning, AST graph synthesis, and hallucination circuit-breakers.',
      status: 'In Progress (Sprint 4)', tone: 'primary' as const,
    },
    {
      window: 'DAYS 61 - 90', title: 'Phase 3: Production GA',
      body: 'Dual-region active-active failover, SOC2 automated permission propagation, and FedRAMP continuous audit.',
      status: 'Scheduled Q4', tone: 'neutral' as const,
    },
  ],
};

export const TOPOLOGY = {
  title: 'Solution Design & Microservice Topology',
  subtitle: 'Cryptographic ingress to hybrid inference gateway',
  badge: 'Throughput: 4,500 req/min',
  nodes: [
    { name: 'API Gateway & mTLS', detail: 'Envoy Proxy / gRPC', chip: '0.8ms p99' },
    { name: 'Guardrail Gate 1', detail: 'PII/PCI & Jailbreak', chip: 'Zero-Leak Check' },
    { name: 'Ingest & Kafka', detail: 'Distributed Chunking', chip: '1.8k tok/sec' },
    { name: 'Hybrid DB Core', detail: 'Milvus + PGSQL + Neo4j', chip: '1536-dim Vector' },
  ],
  footers: [
    { name: 'Zero-Trust Isolation', detail: 'Tenant namespaces keys hashed with customer KMS seeds.' },
    { name: 'Active-Active Dual Enclave', detail: 'US-East-1 & EU-Central-1 real-time consensus replication.' },
    { name: 'Circuit Breaker Mesh', detail: 'Sub-50ms automated failback to opposite deterministic synthesis.' },
  ],
};

export const DATA_MODELS = {
  title: 'Data Models & Schema Synthesis',
  subtitle: 'Multi-modal store partitions, relational integrity, and semantic vector indexing',
  badge: 'Postgres 16 + Milvus 2.4',
  columns: [
    {
      kind: 'VECTOR ENGINE', name: 'Milvus Enterprise',
      rows: ['Dim: 1536 (Cosine Index)', 'Index: HNSW (M=16, ef=200)', 'Namespaces: 42', 'Quantization: SQ8 scalar'],
      footer: { label: 'Recall Rate:', value: '99.41%' },
    },
    {
      kind: 'RELATIONAL CORE', name: 'PostgreSQL 16 Multi-Tenant',
      rows: ['Partition: Hash (org_id)', 'Storage: Citus Sharding', 'Encryption: AES-256 rest', 'ACID: Strict Serializable'],
      footer: { label: 'Write Throughput:', value: '24k ops/sec' },
    },
    {
      kind: 'GRAPH AST RAG', name: 'Neo4j Enterprise Engine',
      rows: ['Nodes: Entities, Req, Rules', 'Edges: Governs, Implements', 'Graph Depth: 3 hops context', 'SNR: Link prediction'],
      footer: { label: 'Traverse Latency:', value: '18ms' },
    },
  ],
  snapshot: {
    label: 'DDL SYNTHESIS SNAPSHOT (ACME_AI_CORE.SQL)',
    validated: 'VALIDATED SHA-256: 4B1C...99A2',
    sql:
      'CREATE TABLE enterprise_knowledge_vectors (\n'
      + '  chunk_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n'
      + '  tenant_id VARCHAR(64) NOT NULL,\n'
      + '  document_urn VARCHAR(255) NOT NULL,\n'
      + '  embedding_vector VECTOR(1536) NOT NULL,\n'
      + '  governance_level INT GENERATED ALWAYS AS (...) STORED,\n'
      + '  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP\n'
      + ') PARTITION BY HASH (tenant_id);',
  },
};

export const PIPELINE_STEPS = {
  title: 'ETL & Document Ingestion Pipeline',
  subtitle: 'Kafka streaming, layout-aware OCR chunking, and semantic cache',
  badge: '1.85k Tokens/sec',
  steps: [
    {
      index: '01', name: 'Document Intake & Layout Parsing',
      detail: 'Distributed LayoutLM v3 + Tesseract OCR for PDF/DOCX financial audits',
      stat: 'Topic: raw.specs.inbound', value: '99.7% Conf',
    },
    {
      index: '02', name: 'Context-Aware Chunking & Tokenization',
      detail: '512 token windows with 64 token overlap, syntax header retention',
      stat: 'Avg: 480 tokens', value: 'Deduplication 94%',
    },
    {
      index: '03', name: 'Semantic Cache & Embedding Dispatch',
      detail: 'Redis Enterprise exact-hash + cosine approximate cache (>0.94 similarity hit)',
      stat: 'Cache Hit: 41.3%', value: '$0.00 Cost On Hit',
    },
  ],
  throughput: {
    title: 'ETL Throughput vs Backpressure (Last 24 Hours)',
    detail: 'Sustained zero dropped payloads across peak market open volume.',
    points: [12, 18, 15, 22, 28, 24, 35, 42, 38, 30, 26, 33, 48, 44, 36, 29],
  },
};

export const GUARDRAILS = {
  title: 'Active Guardrails',
  rows: [
    { name: 'Inline Threat Mitigation', detail: '', badge: 'Armored', on: true },
    { name: 'PII / PCI Redaction Filter', detail: 'AST Fact-Check (Threshold 98.7%)', badge: 'STRICT', on: true },
    { name: 'Prompt Injection Barrier', detail: 'Heuristic + Semantic Classifier', badge: 'BLOCK', on: true },
    { name: 'Hallucination Verification', detail: 'AST Fact-Check (Threshold 98.7%)', badge: '98.7%', on: true },
    { name: 'SLA Latency Circuit Breaker', detail: 'Auto-fallback < 250ms threshold', badge: 'ARMED', on: true },
  ],
  ledger: {
    title: 'Audit Ledger Trail (SHA-256)',
    rows: [
      { label: 'Last Block:', value: '0x9b80...fa52' },
      { label: 'Total Sanitized Chunks:', value: '5,432' },
    ],
  },
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

export const ATTESTATION = {
  title: 'Regulatory Attestation',
  badge: '100% Compliant',
  subtitle: 'Enterprise Audit Readiness',
  badges: [
    { name: 'FedRAMP High Moderate', detail: 'Bound to NIST 800-53 Rev 5' },
    { name: 'SOC 2 Type II Active', detail: 'Continuous Telemetry' },
    { name: 'HIPAA / HITRUST', detail: 'BAA Executed' },
    { name: 'GDPR EU SCC Verified', detail: 'Frankfurt Residency' },
  ],
  signer: { initials: 'EV', name: 'Eleanor Vance', title: 'VP of Infrastructure • Signed' },
};

export const REVIEWERS = {
  title: 'ENTERPRISE REVIEWERS',
  rows: [
    { initials: 'DC', name: 'David Chen', title: 'Technical Gatekeeper', state: 'Approved' },
  ],
};

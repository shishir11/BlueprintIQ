/* Fixture data for the ingestion repository, read from `input ingestion.png`.

   NOTE — the comp renders the "Core Architecture Specifications" area EMPTY while labelling it
   "6 Target Modules". The six modules below are derived from the pipeline verification graph and
   the ingestion ledger in the same image, not invented: BRD, PRD, SDD, DB Schema, Infra Cloud and
   Codebase, each carrying the state its pipeline node shows. Recorded in the change report. */

export interface PipelineNode {
  index: string;
  name: string;
  state: 'Verified' | 'Parsing 82%' | 'Missing PDF' | 'Pending';
}

export interface SpecModule {
  id: string;
  name: string;
  kind: string;
  state: PipelineNode['state'];
  detail: string;
}

export interface LedgerRow {
  type: string;
  file: string;
  mime: string;
  size: string;
  checksum: string;
  validation: string;
  validationTone: 'success' | 'warning' | 'primary';
  extraction: string;
  owner: string;
}

export const INGESTION_HEADER = {
  title: 'Document Ingestion',
  intro:
    'Upload, validate, and extract automated compliance metrics from baseline enterprise '
    + 'architecture artifacts. Strict compliance gates mandate standardized PDF format (.pdf) '
    + 'ingestion only.',
  actions: ['Batch Ingest Bundle (.zip)', 'Run Schema Audit', 'Export Verification Certificate'],
};

export const INGESTION_PROTOCOL = {
  title: 'Strict Ingestion Protocol: Encrypted PDF ',
  chip: 'MAX 100MB / FILE',
  body:
    'All design schematics, enterprise architecture blueprints, and code audits must be compiled '
    + 'into standardized text-searchable PDFs. Raw source directories, Office files, or binaries '
    + 'are automatically isolated and discarded by ingest firewall pods.',
  link: 'Download Spec Guidelines & Schema Templates',
};

export const PIPELINE_NODES: PipelineNode[] = [
  { index: '1', name: 'BRD', state: 'Verified' },
  { index: '2', name: 'PRD', state: 'Verified' },
  { index: '3', name: 'SDD', state: 'Parsing 82%' },
  { index: '4', name: 'DB Schema', state: 'Missing PDF' },
  { index: '5', name: 'Infra Cloud', state: 'Verified' },
  { index: '6', name: 'Codebase', state: 'Pending' },
];

export const SPEC_MODULES: SpecModule[] = [
  {
    id: 'brd', name: 'Business Requirements', kind: 'BRD', state: 'Verified',
    detail: 'Acme_Enterprise_BRD_v1.4_Final.pdf • entity graph extracted',
  },
  {
    id: 'prd', name: 'Product Requirements', kind: 'PRD', state: 'Verified',
    detail: 'StrataCloud_Acme_PRD_2025_Q4.pdf • entity graph extracted',
  },
  {
    id: 'sdd', name: 'Software Design Doc', kind: 'SDD', state: 'Parsing 82%',
    detail: 'Acme_Core_Engine_SDD_Revision_C.pdf • AST lexing in progress',
  },
  {
    id: 'db', name: 'Database Schema', kind: 'DB Schema', state: 'Missing PDF',
    detail: 'No conforming artifact received — ingestion gate blocked',
  },
  {
    id: 'infra', name: 'Cloud Deployment Arch', kind: 'Infra Cloud', state: 'Verified',
    detail: 'AWS_MultiRegion_FedRAMP_Infra_Topology.pdf • 1 warning',
  },
  {
    id: 'code', name: 'Codebase Audit', kind: 'Codebase', state: 'Pending',
    detail: 'Scheduled after SDD lexing completes',
  },
];

export const SPEC_GRID = {
  title: 'Core Architecture Specifications',
  chip: '6 Target Modules',
  hint: 'Click any card to inspect extracted entity graph',
};

export const PIPELINE_GRAPH = {
  title: 'Pipeline Verification Graph',
  subtitle: 'Cross-document AST entity linkage and schema synchronization status',
  legend: ['Synthesizing Link', 'Awaiting Ingestion'],
};

export const LEDGER = {
  title: 'Ingestion Ledger & Cryptographic Manifest',
  chip: 'PDF Records',
  filterPlaceholder: 'Filter by document name or checksum.',
  footerLeft: 'SHA-256 Ledger Synchronized with HashiCorp Vault Keyring',
  footerRight: 'Showing 4 of 6 active artifacts',
};

export const LEDGER_ROWS: LedgerRow[] = [
  {
    type: 'Business Requirements', file: 'Acme_Enterprise_BRD_v1.4_Final.pdf', mime: 'application/pdf',
    size: '11.2 MB', checksum: '8d9f...091a', validation: 'Validated (Pass)', validationTone: 'success',
    extraction: 'Extracted', owner: 'Eleanor Vance',
  },
  {
    type: 'Product Requirements', file: 'StrataCloud_Acme_PRD_2025_Q4.pdf', mime: 'application/pdf',
    size: '8.7 MB', checksum: '7e91...aa22', validation: 'Validated (Pass)', validationTone: 'success',
    extraction: 'Extracted', owner: 'David Chen',
  },
  {
    type: 'Software Design Doc', file: 'Acme_Core_Engine_SDD_Revision_C.pdf', mime: 'application/pdf',
    size: '22.5 MB', checksum: 'e11a...309b', validation: 'Validating (82%)', validationTone: 'primary',
    extraction: 'AST Lexing', owner: 'CI/CD Runner',
  },
  {
    type: 'Cloud Deployment Arch', file: 'AWS_MultiRegion_FedRAMP_Infra_Topology.pdf', mime: 'application/pdf',
    size: '19.1 MB', checksum: '5c81...00bc', validation: 'Validated (1 Warning)', validationTone: 'warning',
    extraction: 'Scanned & Validated', owner: 'SecOps Pod',
  },
];

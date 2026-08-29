import { TeamMember, CoreCapability, ADRRecord, JobOpening, FAQItem } from '../types';

// Two founders only. Do not invent other team members (see CLAUDE.md and docs/copy-deck.md).
export const EXECUTIVE_LEADERSHIP: TeamMember[] = [
  {
    id: 'shishir-sarkar',
    name: 'Shishir Sarkar',
    role: 'Chief Executive',
    department: 'Leadership',
    initials: 'SS',
    bio: 'Enterprise architect. Background across financial services technology, data governance, cloud transformation, application modernisation and regulatory technology, including work connected with HSBC, Experian and Santander.',
    email: 'shishir@blueprint-iq.uk',
    socialRoleIcon: 'work',
    skills: ['Enterprise architecture', 'Data governance', 'Cloud transformation', 'Regulatory technology'],
    location: 'United Kingdom'
  },
  {
    id: 'abhishek-priyankar',
    name: 'Abhishek Priyankar',
    role: 'Chief Technology Officer',
    department: 'Leadership',
    initials: 'AP',
    bio: 'Background across healthcare, retail, pharmaceuticals, insurance and financial services, on production systems with high reliability, data governance and operational control requirements. Works in MLOps, machine learning pipelines, large-scale data architecture and AI-enabled applications.',
    email: 'abhishek@blueprint-iq.uk',
    socialRoleIcon: 'code',
    skills: ['MLOps', 'Machine learning pipelines', 'Large-scale data architecture', 'AI-enabled applications'],
    location: 'United Kingdom'
  }
];

// Departments grid — placeholder structure to fill as the team grows.
// Members are intentionally empty: we do not invent team members (see CLAUDE.md).
export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: TeamMember[];
}

export const CORE_DEPARTMENTS: Department[] = [
  {
    id: 'architecture',
    name: 'Architecture and review',
    description: 'The named architects who review each blueprint and put their name to the version that ships. Today this is the two founders.',
    icon: 'Ruler',
    members: []
  },
  {
    id: 'evidence',
    name: 'Evidence and data',
    description: 'Turning your policies, requirements and schemas into traced, scored findings and maintaining the gap register. Roles to be added as we grow.',
    icon: 'FileText',
    members: []
  },
  {
    id: 'regulatory',
    name: 'Regulatory',
    description: 'Keeping the AI Act, UK GDPR, DSA and sector rules as versioned rules applied to each case. Roles to be added as we grow.',
    icon: 'ShieldCheck',
    members: []
  }
];

// What every blueprint does. No unsourced figures, no certifications we do not hold.
export const CORE_CAPABILITIES: CoreCapability[] = [
  {
    id: 'grounded',
    title: 'Grounded in your own material',
    description: 'We read your policies, requirements documents, data schemas and — at the design stage — your code. Every recommendation cites the document and section it came from.',
    icon: 'FileText',
    metric: 'Cited to source'
  },
  {
    id: 'confidence-scored',
    title: 'Scored, not asserted',
    description: 'Each recommendation carries a confidence band based on how current, complete and consistent the evidence behind it is. The band governs the language we use.',
    icon: 'Gauge',
    metric: 'Confidence band'
  },
  {
    id: 'regulatory',
    title: 'Regulatory position, maintained',
    description: 'AI Act, UK GDPR, DSA and sector rules are kept as versioned rules and applied to your specific case, derived from what the system does rather than read from your documents.',
    icon: 'ShieldCheck',
    metric: 'Versioned rules'
  },
  {
    id: 'human-signoff',
    title: 'Signed by a named architect',
    description: 'No blueprint leaves without a human expert reviewing it and putting their name to a specific version. We publish the proportion senior architects accept unchanged.',
    icon: 'BadgeCheck',
    metric: 'Human sign-off'
  },
  {
    id: 'gap-register',
    title: 'A gap register, not filler',
    description: 'A claim that cannot be traced to your material is not written. It goes into a gap register instead — a list of what could not be verified, which is a deliverable in its own right.',
    icon: 'ClipboardList',
    metric: 'What we could not verify'
  },
  {
    id: 'measurement',
    title: 'Measurement design',
    description: 'We design how the benefit will be measured, so it can be proved or disproved after the build — including the honest recommendation not to build where a baseline already wins.',
    icon: 'Ruler',
    metric: 'Proof or disproof'
  }
];

// Synthetic example decision records (see docs/TASKS.md — a synthetic example is explicitly allowed).
// Not real customer work. Figures cited are from docs/evidence-library.md.
export const ADR_RECORDS: ADRRecord[] = [
  {
    id: 'DR-01',
    title: 'DR-01: Retrieval over the policy, not fine-tuning',
    status: 'Approved',
    authors: [
      { initials: 'SS', name: 'Shishir Sarkar' },
      { initials: 'AP', name: 'Abhishek Priyankar' }
    ],
    context: 'The draft use case proposed fine-tuning a model on the lending policy. The supplied revision history shows the policy changes several times a year, and each change would require retraining.',
    decision: 'Recommend retrieval over the current policy documents with citations rather than fine-tuning. Confidence: high — grounded in the revision history in the supplied material.',
    consequences: 'Answers stay current as the policy changes, and each answer cites the clause it came from. Revisited if the revision frequency drops below annual.',
    date: '2026-08-12'
  },
  {
    id: 'DR-02',
    title: 'DR-02: Keep a human in the affordability decision',
    status: 'Approved',
    authors: [
      { initials: 'SS', name: 'Shishir Sarkar' }
    ],
    context: 'The objective asked for automated affordability decisions. FCA CONC 5.2A requires a reasonable creditworthiness assessment with records sufficient to demonstrate it.',
    decision: 'Recommend a human-in-the-loop design. Full automation raises the evidentiary burden without a measured accuracy gain over the current process; automate retrieval and evidence assembly instead.',
    consequences: 'Keeps the process demonstrably within CONC 5.2A while removing manual document-gathering effort.',
    date: '2026-08-19'
  },
  {
    id: 'DR-03',
    title: 'DR-03: Establish the baseline before building a forecast',
    status: 'In Review',
    authors: [
      { initials: 'AP', name: 'Abhishek Priyankar' }
    ],
    context: 'The promotions team asked for a machine-learning demand forecast to replace the current statistical process.',
    decision: 'Recommend measuring a well-implemented statistical baseline first. In the M5 competition only 7.5% of 5,507 teams beat such a baseline; establish it before committing to a model.',
    consequences: 'A low-cost check that frequently changes the build-versus-do-not-build decision before money is spent.',
    date: '2026-08-26'
  }
];

// How we work. Grounded in the product, not generic marketing values.
export const CORE_VALUES = [
  {
    title: 'Evidence over assertion',
    icon: 'Eye',
    description: 'Every recommendation cites the document and section it came from. A claim we cannot trace to your material goes into a gap register instead of onto the page.'
  },
  {
    title: 'Traceable and reproducible',
    icon: 'Lightbulb',
    description: 'The same finding can be reproduced from its evidence trail when a risk committee asks about it eighteen months later.'
  },
  {
    title: 'Willing to say no',
    icon: 'Zap',
    description: 'Where the honest answer is that a problem needs better data or a fixed process rather than a model, we say so. We are not paid to build it afterwards.'
  }
];

// Pre-incorporation. No offices, no customer count. See CLAUDE.md.
export const OFFICE_LOCATIONS: { type: string; city: string; address: string; postal: string }[] = [];

// Pre-incorporation, two founders. No open roles yet.
export const JOB_OPENINGS: JobOpening[] = [];

export const FAQS: FAQItem[] = [
  {
    category: 'Product',
    question: 'What does BlueprintIQ produce?',
    answer: 'An implementation-grade AI plan grounded in your own artifacts: a decision map, an opportunity assessment, target architecture, decision records, a regulatory control map, an evidence and confidence appendix, and an executive summary. Every recommendation is traced to a line in your own material.'
  },
  {
    category: 'Engagement',
    question: 'How does an engagement work, and how long does it take?',
    answer: 'It is an expert-reviewed engagement, not self-serve software. Simple feasibility questions come back in hours. The hardest case we scope — several departments, several regulations, interacting systems — is seven days. Start with a scoping call.'
  },
  {
    category: 'Security',
    question: 'What is your security and compliance posture?',
    answer: 'We design for data isolation, audit logging, retention control and in-tenant deployment. We do not hold SOC 2 or ISO 27001 certification and do not claim to; where a control matters to your case we describe the designed-for posture, not a certificate.'
  },
  {
    category: 'Evidence',
    question: 'How do you avoid recommending something that will not work?',
    answer: 'We measure against the process you already run and we cite our sources. The controlled evidence shows most AI programmes fail to beat the baseline they replace, so recommending against building is a legitimate output — one no vendor paid by the implementation will give you.'
  }
];

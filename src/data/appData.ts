import { TeamMember, CoreCapability, ADRRecord, JobOpening, FAQItem } from '../types';

export const EXECUTIVE_LEADERSHIP: TeamMember[] = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Chief Executive Officer',
    department: 'Leadership',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5jda8tleSVS0dO6fwe5jUF_hwhMAtKCAvXA7tceWbQf0uclM6mK92Wn4yRRRHDlthu9LH4YdbBsuFgUkN4NhVFNw-DZJRQz9_sDks6QG35DeffWgxMTSYdCzFWQdwQLv0hqHg3PIJZXkZs8_yY_VxQFAtwIaKc5KJ-kkRUy5qGZU8hC0h-8SqNCVDJ6f1_Wf6A6DgVbnulNJByhije1rYr6bkM0cE_uga3UfL4BEhS_YgWuBrYL7asA',
    bio: 'Driving the vision for accessible AI tooling. Over 15 years leading engineering teams at top-tier cloud providers.',
    email: 'sarah.jenkins@blueprintiq.com',
    socialRoleIcon: 'work',
    skills: ['Enterprise Strategy', 'AI Governance', 'Cloud Infrastructure', 'Executive Leadership'],
    location: 'San Francisco, CA'
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Chief Technology Officer',
    department: 'Leadership',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrn2kmrMxb_YDclMpzJEVs6Q-VQCGk9yjleZQQ6_ajziX9hS2J3Kod4c3OABIvMKU0j3HI4K3zwYAbrHtC1et5Rv-VDS578lW4KfNCs_d_5Ki0P4XbbYClxHbvBeQu4q6CxDYc1M89GHUORr4mKbo9W8TU7K4oI9bXOPtQZxnd0KRkvi14_cbuBAPlbujw3VsGG2Ezp-QZrlhxF2TR4IOTvQMac0NGd1ZGw0KZFLX_yzDTZoCYi4Bhvw',
    bio: 'Architect of our core infrastructure. Passionate about scalable microservices and robust machine learning pipelines.',
    email: 'david.chen@blueprintiq.com',
    socialRoleIcon: 'code',
    skills: ['Distributed Systems', 'MLOps', 'High-throughput APIs', 'Kubernetes'],
    location: 'San Francisco, CA'
  },
  {
    id: 'alex-mercer',
    name: 'Alex Mercer',
    role: 'Head of Product',
    department: 'Leadership',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGR3K1iP7aJ8Fa590fO0lxsFKj33Le2EN-jwvgquSKFb0uw5Oun_WbDUFvIKogUMCpg5w8v_w4BMk096EQkTV_J8XFoIW9UlQ7dTc5IwOHPZiH1I-rdhSmvoJ4UXy9zAl4eiRgcL1P1JW6gSIfTtAQCmXPACEH4G2_irRbuz1-zCbM7bchv63aDVilnVMtrQUQ_v_yhMsJ0kbS73R8wDALjFVauo36R9j_ySAH-LCzI6TtuoOhlxJPhg',
    bio: 'Bridging the gap between complex algorithms and intuitive user experiences. Champion for user-centric design principles.',
    email: 'alex.mercer@blueprintiq.com',
    socialRoleIcon: 'design',
    skills: ['Product Discovery', 'Design Systems', 'AI Workflow UX', 'User Research'],
    location: 'London, UK'
  }
];

export const CORE_DEPARTMENTS = {
  engineering: {
    name: 'Engineering',
    description: 'Building the robust, scalable backend systems that power BlueprintIQ.',
    members: [
      {
        id: 'marcus-johnson',
        name: 'Marcus Johnson',
        role: 'Lead Backend Engineer',
        initials: 'MJ',
        department: 'Engineering' as const,
        bio: 'Oversees core distributed messaging pipelines and real-time synchronization engines.',
        email: 'marcus.j@blueprintiq.com'
      },
      {
        id: 'elena-rodriguez',
        name: 'Elena Rodriguez',
        role: 'Data Scientist',
        initials: 'EL',
        department: 'Engineering' as const,
        bio: 'Develops predictive forecasting algorithms and state-of-the-art anomaly detection models.',
        email: 'elena.r@blueprintiq.com'
      }
    ]
  },
  design: {
    name: 'Design',
    description: 'Crafting intuitive and beautiful experiences for our users.',
    members: [
      {
        id: 'sam-kim',
        name: 'Sam Kim',
        role: 'Senior UX Designer',
        initials: 'SK',
        department: 'Design' as const,
        bio: 'Designs unified design tokens, multi-platform interaction patterns, and accessible UI kits.',
        email: 'sam.kim@blueprintiq.com'
      }
    ]
  },
  strategy: {
    name: 'Strategy',
    description: 'Aligning technical capabilities with market needs.',
    members: [
      {
        id: 'aisha-tyler',
        name: 'Aisha Tyler',
        role: 'Product Strategist',
        initials: 'AT',
        department: 'Strategy' as const,
        bio: 'Focuses on enterprise compliance frameworks, partner ecosystems, and ROI metrics.',
        email: 'aisha.t@blueprintiq.com'
      }
    ]
  }
};

export const CORE_CAPABILITIES: CoreCapability[] = [
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    description: 'Anticipate market shifts and customer behavior with machine learning models that analyze historical data to forecast future trends with high accuracy.',
    icon: 'TrendingUp',
    metric: '99.4% Accuracy'
  },
  {
    id: 'automated-workflows',
    title: 'Automated Workflows',
    description: 'Build complex, multi-step automated processes with custom logic. Integrate seamlessly with your existing tech stack to eliminate manual tasks.',
    icon: 'GitFork',
    metric: '10x Speedup'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise Security',
    description: 'Bank-grade protection. Fully SOC2 compliant, featuring end-to-end encryption and strict data sovereignty controls to keep your assets safe.',
    icon: 'ShieldCheck',
    metric: 'SOC2 Type II'
  },
  {
    id: 'real-time-collaboration',
    title: 'Real-time Collaboration',
    description: 'Enable your global team to work together seamlessly. Features simultaneous document editing, presence indicators, and instant global synchronization.',
    icon: 'Users',
    metric: '<15ms Latency'
  },
  {
    id: 'custom-ai-agents',
    title: 'Custom AI Agents',
    description: 'Train and deploy specialized AI agents tailored to your specific business processes, from customer support triage to complex data extraction.',
    icon: 'Bot',
    metric: 'Multi-Modal'
  },
  {
    id: 'api-integrations',
    title: 'API & Integrations',
    description: 'Connect your entire ecosystem. SaaSPro offers over 100 native connectors and a robust RESTful API for custom, enterprise-scale integrations.',
    icon: 'Network',
    metric: '100+ Connectors'
  }
];

export const ADR_RECORDS: ADRRecord[] = [
  {
    id: 'ADR-042',
    title: 'ADR-042: Migrate to Micro-frontends',
    status: 'Approved',
    authors: [
      { initials: 'JD', name: 'John Doe' },
      { initials: 'AS', name: 'Alice Smith' }
    ],
    context: 'The monolithic frontend build time has grown exponentially. Cross-team deployments are experiencing blocking merge queues.',
    decision: 'Adopt Module Federation with Vite and isolated container bundles to allow autonomous domain releases across Core, Analytics, and Admin surfaces.',
    consequences: 'Build times reduced by 74%. Independent team velocity restored with strict shared design tokens enforcement.',
    date: '2024-06-12'
  },
  {
    id: 'ADR-043',
    title: 'ADR-043: Vector Indexing for RAG Workflows',
    status: 'Approved',
    authors: [
      { initials: 'DC', name: 'David Chen' },
      { initials: 'ER', name: 'Elena Rodriguez' }
    ],
    context: 'Customer document retrieval requires sub-50ms hybrid lexical and semantic search across millions of compliance records.',
    decision: 'Deploy HNSW index partitions on Postgres pgvector with asynchronous embedding generation via background workers.',
    consequences: 'Semantic accuracy improved to 96.8% with zero cold-start penalty for enterprise search pipelines.',
    date: '2024-07-04'
  },
  {
    id: 'ADR-044',
    title: 'ADR-044: Multi-Region Active-Active Failover',
    status: 'In Review',
    authors: [
      { initials: 'MJ', name: 'Marcus Johnson' },
      { initials: 'DC', name: 'David Chen' }
    ],
    context: 'Tier 1 enterprise SLAs mandate 99.999% uptime with zero RPO across US-East, US-West, and EU-Central zones.',
    decision: 'Implement CRDT-backed metadata replication with global Anycast routing and automatic circuit breaker isolation.',
    consequences: 'Zero noticeable client-side disruptions during simulated availability zone drop tests.',
    date: '2024-08-15'
  }
];

export const CORE_VALUES = [
  {
    title: 'Innovation',
    icon: 'Lightbulb',
    description: 'We constantly push the boundaries of what AI can achieve in enterprise operations.'
  },
  {
    title: 'Transparency',
    icon: 'Eye',
    description: 'Open communication internally and clear, explainable AI solutions externally.'
  },
  {
    title: 'Velocity',
    icon: 'Zap',
    description: 'We move fast, iterate quickly, and deliver robust solutions without compromising quality.'
  }
];

export const OFFICE_LOCATIONS = [
  {
    type: 'Headquarters',
    city: 'San Francisco, CA',
    address: '100 Market Street, Suite 400',
    postal: 'San Francisco, CA 94105',
    phone: '+1 (415) 890-2100',
    email: 'sf-hq@blueprintiq.com'
  },
  {
    type: 'EMEA Office',
    city: 'London, UK',
    address: '15 Canary Wharf, Level 32',
    postal: 'London, E14 5AB',
    phone: '+44 20 7946 0912',
    email: 'emea@blueprintiq.com'
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Staff Distributed Systems Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Hybrid',
    type: 'Full-time',
    description: 'Lead the architecture of our low-latency synchronization engine handling millions of real-time events per second.',
    requirements: ['8+ years building distributed backends in Go/Rust/TypeScript', 'Deep experience with consensus algorithms and Raft/CRDTs', 'Experience with high-scale stream processing']
  },
  {
    id: 'job-2',
    title: 'Senior Product Designer (AI UX)',
    department: 'Design',
    location: 'London, UK / Remote',
    type: 'Full-time',
    description: 'Define the next generation of human-in-the-loop AI interaction models and multi-agent workflow visualizers.',
    requirements: ['5+ years in product design for developer or enterprise tooling', 'Strong portfolio showcasing complex state management UI', 'Proficiency in design systems and prototyping']
  },
  {
    id: 'job-3',
    title: 'Enterprise AI Solutions Architect',
    department: 'Strategy',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    description: 'Partner with Fortune 500 engineering leaders to design custom AI workflows and enterprise data connectors.',
    requirements: ['5+ years in technical sales engineering or solutions architecture', 'Hands-on experience with LLM orchestration and security protocols', 'Superb communication skills']
  },
  {
    id: 'job-4',
    title: 'MLOps & Inference Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    description: 'Optimize high-throughput model inference pipelines, quantization strategies, and automated model evaluations.',
    requirements: ['Expertise with vLLM, TensorRT, Triton Inference Server', 'Proven track record scaling GPU clusters on Kubernetes', 'BS/MS in Computer Science or equivalent']
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'Platform',
    question: 'How does BlueprintIQ integrate with our existing codebase and CI/CD?',
    answer: 'BlueprintIQ connects seamlessly through standard Git webhooks, CLI tools, and over 100 pre-built connectors (GitHub, GitLab, Jira, Slack, Datadog). You can start syncing ADRs and telemetry in under 5 minutes.'
  },
  {
    category: 'Security',
    question: 'What security certifications and compliance standards does BlueprintIQ meet?',
    answer: 'We are SOC 2 Type II certified, GDPR compliant, and ISO 27001 accredited. All customer data is encrypted in transit (TLS 1.3) and at rest (AES-256) with strict data sovereignty options.'
  },
  {
    category: 'Billing',
    question: 'Can we pilot BlueprintIQ with a single engineering pod before enterprise rollout?',
    answer: 'Yes! We offer a 14-day full-featured enterprise pilot with dedicated onboarding engineers and zero commitment required.'
  },
  {
    category: 'API',
    question: 'Is there a REST and GraphQL API for programmatic ADR creation?',
    answer: 'Yes, our developer API provides full CRUD capabilities, webhook subscriptions, and granular scoped API keys for complete CI/CD automation.'
  }
];

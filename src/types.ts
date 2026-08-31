export type TabType = 'home' | 'features' | 'team' | 'contact' | 'pricing' | 'about';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Engineering' | 'Design' | 'Strategy';
  initials?: string;
  image?: string;
  bio: string;
  email: string;
  socialRoleIcon?: 'work' | 'code' | 'design' | 'analytics';
  skills?: string[];
  location?: string;
}

export interface CoreCapability {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
  category?: string;
}

export interface ADRRecord {
  id: string;
  title: string;
  status: 'Approved' | 'In Review' | 'Draft' | 'Superseded';
  authors: { initials: string; name: string }[];
  context: string;
  decision: string;
  consequences: string;
  date: string;
}

export interface ContactInquiry {
  firstName: string;
  lastName: string;
  workEmail: string;
  companyName: string;
  message: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Product' | 'Engagement' | 'Security' | 'Evidence';
}

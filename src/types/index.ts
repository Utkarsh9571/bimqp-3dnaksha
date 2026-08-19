export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  isFeatured?: boolean;
  deliverables: string[];
  specs: { label: string; value: string }[];
  icon: string;
  badge?: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'interior' | 'vr-bim';
  categoryLabel: string;
  deliverableType: string;
  image: string;
  description: string;
  features: string[];
  capabilities: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'deliverables' | 'vr' | 'bimqp' | 'process';
}

export interface AudienceItem {
  id: string;
  role: string;
  tagline: string;
  description: string;
  painPoint: string;
  solution: string;
  icon: string;
  deliverables: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  keyAction: string;
}

export interface LifecyclePhase {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  valueAdd: string;
  accentColor: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  services: string[];
  scopeDetails: string;
  hasDrawings: string;
}

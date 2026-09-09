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
  slug?: string;
}

export interface DetailedDeliverable {
  title: string;
  description: string;
  outputFormat?: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceWorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  keyAction: string;
  deliverable: string;
}

export interface DetailedServiceData extends ServiceItem {
  slug: string;
  categoryTagline?: string;
  heroHeadline: string;
  heroDescription: string;
  heroImage?: string;
  overview: {
    definition: string;
    problemSolved: string;
    nakshaApproach: string;
    aecWorkflowValue: string;
  };
  benefits: ServiceBenefit[];
  detailedDeliverables: DetailedDeliverable[];
  workflow: ServiceWorkflowStep[];
  visualShowcase: {
    title: string;
    subtitle: string;
    image: string;
    caption: string;
    tags: string[];
  }[];
  audienceIds: string[];
  faqs: FAQItem[];
  relatedServiceIds: string[];
  seo: {
    title: string;
    description: string;
  };
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
  eyebrow: string;
  headline: string;
  tagline: string;
  description: string;
  traditionalWorkflow: string[];
  with3DNaksha: string[];
  benefits: string[];
  ctaText: string;
  icon: string;
  image?: string;
  painPoint?: string;
  solution?: string;
  deliverables?: string[];
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

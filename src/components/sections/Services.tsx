import React, { useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SERVICES } from '../../data/content';
import {
  Home,
  Armchair,
  Layers,
  Glasses,
  HardHat,
  ArrowRight
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface ServicesProps {
  onOpenConsultation: (defaultService?: string) => void;
}

interface UnifiedWorkflowStep {
  step: string;
  phase: string;
  title: string;
  description: string;
}

const UNIFIED_WORKFLOW_STEPS: UnifiedWorkflowStep[] = [
  {
    step: '01',
    phase: 'Phase 01',
    title: 'Design Ingestion & Scope Review',
    description: 'Review 2D drawings, 3D BIM models, and schedules to define modeling standards and delivery milestones.'
  },
  {
    step: '02',
    phase: 'Phase 02',
    title: 'Parametric Geometry & Engine Setup',
    description: 'Construct accurate parametric elements and optimize polygon density for real-time visual performance.'
  },
  {
    step: '03',
    phase: 'Phase 03',
    title: 'Interdisciplinary Spatial Audit',
    description: 'Conduct spatial interference checks, evaluate clearance tolerances, and verify navigation sightlines.'
  },
  {
    step: '04',
    phase: 'Phase 04',
    title: 'Material Shading & Phasing Calibration',
    description: 'Apply high-fidelity physical materials, calibrate photometric lighting, and generate visual milestone phasing.'
  },
  {
    step: '05',
    phase: 'Phase 05',
    title: 'Final Handover & Interactive Deployment',
    description: 'Deliver coordinated 3D BIM packages, standalone interactive VR environments, and milestone coordination assets.'
  }
];

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-5 h-5" />,
    Armchair: <Armchair className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Glasses: <Glasses className="w-5 h-5" />,
    HardHat: <HardHat className="w-5 h-5" />
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-brand-canvas relative overflow-hidden border-t border-gray-200"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <SectionHeading
          number="02"
          badgeText="Our Services"
          badgeVariant="amber"
          title="Architectural & BIM"
          highlightText="Services."
          subtitle="Confirmed visualization, BIM modeling, and spatial services tailored for architects, interior designers, developers, contractors, and property owners."
          align="left"
        />

        {/* 1. TOP PRESENTATION CARDS (3 Core Services Grid with High-Fidelity Visuals) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {SERVICES.map((service, idx) => {
            const delay = idx * 80;

            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="rounded-xl border text-left transition-all duration-300 relative group cursor-default flex flex-col justify-between bg-white border-gray-200/90 hover:border-accent-bronze/50 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden shadow-sm"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                  transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`
                }}
              >
                {/* Visual Image Header */}
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge & Number */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="font-mono-tech text-[10px] text-amber-300 font-bold tracking-wider uppercase bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-amber-300/30">
                      {service.badge}
                    </span>
                    <span className="font-mono-tech text-xs text-white/90 font-bold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/20">
                      {service.number}
                    </span>
                  </div>

                  {/* Icon & Title Overlay on Image Bottom */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white/95 text-accent-bronze shadow-xs shrink-0">
                      {iconMap[service.icon]}
                    </div>
                    <h4 className="font-display font-bold text-base text-white leading-tight drop-shadow-xs">
                      {service.title}
                    </h4>
                  </div>
                </div>

                {/* Card Body & Deliverables */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-3 border-t border-gray-100 space-y-1.5">
                    <div className="text-[10px] font-mono-tech text-accent-bronze uppercase font-bold tracking-wider">
                      Core Deliverables:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.deliverables.slice(0, 2).map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-[11px] font-mono-tech text-gray-700 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-xs"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. UNIFIED WORKFLOW & DELIVERY SECTION (Permanent & Service-Agnostic) */}
        <div className="architectural-panel bg-white rounded-xl border border-gray-200/90 shadow-xl overflow-hidden animate-fadeIn space-y-0">
          {/* Top Panel Header */}
          <div className="p-5 sm:p-6 border-b border-gray-200 bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-bronze animate-pulse" />
                <h3 className="font-mono-tech text-xs text-gray-600 font-bold uppercase tracking-wider">
                  Workflow & Delivery
                </h3>
              </div>
              <h4 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                End-to-End Execution Protocol
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[10px] text-accent-bronze font-bold uppercase bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-sm">
                5-Step Process
              </span>
              <span className="font-mono-tech text-[10px] text-gray-500 font-medium">
                Unified Lifecycle Delivery
              </span>
            </div>
          </div>

          {/* Workflow Cards Grid */}
          <div className="p-5 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 items-stretch">
              {UNIFIED_WORKFLOW_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-lg bg-gray-50/80 border border-gray-200/90 hover:border-accent-bronze/60 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[11px] text-accent-bronze font-bold tracking-wider">
                        STEP {step.step}
                      </span>
                      <span className="font-mono-tech text-[9px] text-gray-400 font-medium uppercase bg-white px-1.5 py-0.5 rounded border border-gray-200/60">
                        {step.phase}
                      </span>
                    </div>

                    <h5 className="font-display font-bold text-xs sm:text-sm text-brand-primary leading-snug">
                      {step.title}
                    </h5>
                  </div>

                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-gray-900 to-brand-primary text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="font-mono-tech text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  READY TO ELEVATE YOUR PROJECT?
                </span>
                <p className="text-xs text-gray-300">
                  Contact our AEC visualization team for custom scope estimates & fast turnarounds.
                </p>
              </div>
              <button
                onClick={() => onOpenConsultation()}
                className="btn-cta-premium px-5 py-2.5 text-xs shrink-0 flex items-center gap-2 cursor-pointer group"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;


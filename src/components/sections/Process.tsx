import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { PROCESS_STEPS } from '../../data/content';
import { Badge } from '../ui/Badge';
import { Check, Sparkles, MessageSquare } from 'lucide-react';

interface ProcessProps {
  onOpenConsultation: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenConsultation }) => {
  return (
    <section id="process" className="py-24 bg-[#0E1013] relative overflow-hidden border-t border-white/5">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="06"
          badgeText="Execution Protocol"
          badgeVariant="blue"
          title="From Concept to"
          highlightText="Handover."
          subtitle="A structured, collaborative process to guide projects from initial design inputs through refined 3D visualization deliverables."
          align="left"
        />

        {/* 5-Step Process Timeline Grid */}
        <div className="space-y-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="architectural-panel p-6 sm:p-8 rounded-lg border-hairline hover:border-[#D4A373]/40 transition-all group relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Step Indicator */}
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#E5A93B]">
                      {step.step}
                    </span>
                    <span className="w-1.5 h-6 bg-[#D4A373]/40 rounded-full hidden sm:block"></span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono-tech text-xs text-[#38BDF8] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{step.subtitle}</span>
                    </div>
                    <Badge variant="neutral" size="sm" className="text-[10px]">
                      {step.keyAction}
                    </Badge>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="lg:col-span-5 space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4A373] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8A92A0] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist for this step */}
                <div className="lg:col-span-4 bg-[#08090B] p-4 rounded-sm border border-white/10 space-y-2">
                  <div className="text-[11px] font-mono-tech text-[#D4A373] uppercase tracking-wider">
                    Milestone Focus
                  </div>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((deliv, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2 text-xs text-[#F3F4F6]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Strip */}
        <div className="mt-12 p-6 rounded-md bg-[#14171D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                Have an upcoming project review or presentation?
              </div>
              <div className="text-xs text-[#8A92A0]">
                Connect with our visualization team to discuss your project scope and objectives.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono-tech text-xs tracking-wider uppercase whitespace-nowrap cursor-pointer transition-colors"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

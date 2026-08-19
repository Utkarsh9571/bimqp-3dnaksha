import React, { useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { PROCESS_STEPS } from '../../data/content';
import { Badge } from '../ui/Badge';
import { Check, Sparkles, MessageSquare } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useScrollProgress } from '../../hooks/useScrollProgress';

interface ProcessProps {
  onOpenConsultation: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });
  const { progress } = useScrollProgress(sectionRef, { offsetStart: 0.15, offsetEnd: 0.85 });

  const progressHeight = Math.max(0, Math.min(100, progress * 125));
  // Active step index (0 to 4) based on scroll
  const activeStepIdx = Math.min(4, Math.floor(progress * 5.2));

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200"
    >
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="07"
          badgeText="Execution Protocol"
          badgeVariant="amber"
          title="From Concept to"
          highlightText="Handover."
          subtitle="A structured, collaborative process to guide projects from initial design inputs through refined 3D visualization deliverables."
          align="left"
        />

        {/* 5-Step Process Timeline Grid */}
        <div className="relative space-y-6">
          {/* Vertical progression guideline (Desktop) */}
          <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-1 bg-gray-200 rounded-full overflow-hidden pointer-events-none">
            <div
              className="w-full bg-gradient-to-b from-[#0284C7] via-[#D97706] to-[#B45309] shadow-xs transition-all duration-200"
              style={{ height: `${progressHeight}%` }}
            ></div>
          </div>

          {PROCESS_STEPS.map((step, idx) => {
            const delay = idx * 110;
            const isStepActive = activeStepIdx === idx;
            return (
              <div
                key={step.step}
                className={`architectural-panel bg-white p-6 sm:p-8 rounded-lg transition-all duration-500 group relative ${
                  isStepActive
                    ? 'border-[#9A6A38] shadow-[0_10px_30px_rgba(154,106,56,0.12)]'
                    : 'border-gray-200 hover:border-gray-300 shadow-xs'
                }`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                  transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Step Indicator */}
                  <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-2 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono-tech text-3xl sm:text-4xl font-bold transition-transform duration-300 ${
                          isStepActive
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A38] to-[#D97706] scale-110'
                            : 'text-gray-300 group-hover:text-gray-500'
                        }`}
                      >
                        {step.step}
                      </span>
                      <span
                        className={`w-1.5 h-6 rounded-full hidden sm:block ${
                          isStepActive ? 'bg-[#9A6A38]' : 'bg-gray-300'
                        }`}
                      ></span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-mono-tech text-xs text-[#0284C7] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>{step.subtitle}</span>
                      </div>
                      <Badge variant={isStepActive ? 'amber' : 'neutral'} size="sm" className="text-[10px]">
                        {step.keyAction}
                      </Badge>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="lg:col-span-5 space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A0A0A] group-hover:text-[#9A6A38] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables Checklist for this step */}
                  <div className="lg:col-span-4 bg-gray-50 p-4 rounded-sm border border-gray-200 space-y-2">
                    <div className="text-[11px] font-mono-tech text-[#9A6A38] uppercase font-bold tracking-wider">
                      Milestone Focus
                    </div>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((deliv, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-gray-800"
                        >
                          <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Strip */}
        <div
          className="mt-12 p-6 rounded-md bg-gray-100 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0284C7] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[#0A0A0A] text-sm font-semibold">
                Have an upcoming project review or presentation?
              </div>
              <div className="text-xs text-gray-600">
                Connect with our visualization team to discuss your project scope and objectives.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-sm bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 font-mono-tech text-xs font-semibold tracking-wider uppercase whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;

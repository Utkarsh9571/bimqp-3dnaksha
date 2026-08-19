import React, { useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { LIFECYCLE_PHASES } from '../../data/content';
import { PenTool, Box, Glasses, HardHat, CheckCircle2 } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useInView } from '../../hooks/useInView';

export const LifecycleJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.15, triggerOnce: true });
  const { progress } = useScrollProgress(sectionRef, { offsetStart: 0.15, offsetEnd: 0.85 });

  const iconMap: Record<string, React.ReactNode> = {
    PenTool: <PenTool className="w-5 h-5" />,
    Box: <Box className="w-5 h-5" />,
    Glasses: <Glasses className="w-5 h-5" />,
    HardHat: <HardHat className="w-5 h-5" />
  };

  // Progress line fill percentage (0% to 100%)
  const lineProgress = Math.max(0, Math.min(100, progress * 125));
  // Current active phase index (0 to 3) based on scroll
  const activePhaseIndex = progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3;

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-dense opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="03"
          badgeText="AEC Lifecycle"
          badgeVariant="blue"
          title="The Connected AEC"
          highlightText="Journey."
          subtitle="How 3D Naksha connects design concepts to 3D BIM models, immersive experiences, and informed construction decisions."
          align="left"
        />

        {/* Connecting Progress Timeline Line with Active Milestone Dots (Desktop) */}
        <div className="hidden lg:block relative mb-12 mt-4 px-8">
          <div className="h-1 w-full bg-gray-200 relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#0284C7] via-[#D97706] to-[#B45309] shadow-xs transition-all duration-200"
              style={{ width: `${lineProgress}%` }}
            ></div>
          </div>

          {/* Milestone Dots */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8 right-8 flex justify-between pointer-events-none">
            {[0, 1, 2, 3].map((idx) => {
              const isDotActive = activePhaseIndex >= idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isDotActive
                      ? 'bg-[#D97706] border-white scale-125 shadow-sm'
                      : 'bg-white border-gray-300'
                  }`}
                ></div>
              );
            })}
          </div>
        </div>

        {/* 4-Step Progression Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {LIFECYCLE_PHASES.map((phase, idx) => {
            const delay = idx * 120;
            const isCurrentCard = activePhaseIndex === idx;
            return (
              <div
                key={phase.phase}
                className={`architectural-panel bg-white p-6 sm:p-7 rounded-lg relative group flex flex-col justify-between transition-all duration-500 hover-lift ${
                  isCurrentCard
                    ? 'border-[#9A6A38] shadow-[0_10px_30px_rgba(154,106,56,0.12)]'
                    : 'border-gray-200 shadow-xs'
                }`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
                  transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`
                }}
              >
                {/* Corner crosshairs on hover */}
                <div className="corner-crosshairs pointer-events-none absolute inset-0"></div>

                <div>
                  {/* Phase Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-sm flex items-center justify-center border transition-all duration-300 ${
                        isCurrentCard ? 'scale-110 shadow-sm' : 'group-hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: `${phase.accentColor}12`,
                        borderColor: isCurrentCard ? phase.accentColor : `${phase.accentColor}35`,
                        color: phase.accentColor
                      }}
                    >
                      {iconMap[phase.icon]}
                    </div>
                    <span
                      className={`font-mono-tech text-xl font-bold transition-colors ${
                        isCurrentCard ? 'text-gray-400' : 'text-gray-300 group-hover:text-gray-500'
                      }`}
                    >
                      {phase.phase}
                    </span>
                  </div>

                  <div className="text-xs font-mono-tech uppercase font-bold tracking-widest text-[#9A6A38] mb-1">
                    PHASE {phase.phase}
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0A0A0A] mb-2 group-hover:text-[#9A6A38] transition-colors">
                    {phase.title}
                  </h3>

                  <h4 className="text-xs font-semibold text-gray-700 mb-3 leading-snug">
                    {phase.subtitle}
                  </h4>

                  <p className="text-xs text-[#4B5563] leading-relaxed mb-6">
                    {phase.description}
                  </p>
                </div>

                {/* Value Add Tag */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: phase.accentColor }}
                    />
                    <span className="text-[11px] font-mono-tech text-gray-800 font-medium leading-tight">
                      {phase.valueAdd}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner on BIMQP Synergy */}
        <div
          className="mt-12 p-6 rounded-lg bg-gray-100 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
          }}
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono-tech text-xs text-[#0284C7] font-semibold">
              <span>BIMQP Ecosystem Pipeline Integration</span>
            </div>
            <p className="text-sm text-gray-900 font-medium">
              Connecting 3D BIM modeling, spatial visualization, and pre-construction review to support clear stakeholder communication across the project lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono-tech text-xs text-gray-600 font-semibold">BIM-Informed Coordination</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifecycleJourney;

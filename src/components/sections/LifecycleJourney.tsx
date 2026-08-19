import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { LIFECYCLE_PHASES } from '../../data/content';
import { PenTool, Box, Glasses, HardHat, CheckCircle2 } from 'lucide-react';

export const LifecycleJourney: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    PenTool: <PenTool className="w-5 h-5" />,
    Box: <Box className="w-5 h-5" />,
    Glasses: <Glasses className="w-5 h-5" />,
    HardHat: <HardHat className="w-5 h-5" />
  };

  return (
    <section id="lifecycle" className="py-24 bg-[#0E1013] relative overflow-hidden border-t border-white/5">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-dense opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="02"
          badgeText="AEC Lifecycle"
          badgeVariant="blue"
          title="The Connected AEC"
          highlightText="Journey."
          subtitle="How 3D Naksha connects design concepts to 3D BIM models, immersive experiences, and informed construction decisions."
          align="left"
        />

        {/* 4-Step Interactive Progression Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {LIFECYCLE_PHASES.map((phase) => (
            <div
              key={phase.phase}
              className="architectural-panel p-6 sm:p-7 rounded-lg border-hairline hover-lift relative group flex flex-col justify-between"
            >
              {/* Corner crosshairs on hover */}
              <div className="corner-crosshairs pointer-events-none absolute inset-0"></div>

              <div>
                {/* Phase Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center border transition-all"
                    style={{
                      backgroundColor: `${phase.accentColor}15`,
                      borderColor: `${phase.accentColor}40`,
                      color: phase.accentColor
                    }}
                  >
                    {iconMap[phase.icon]}
                  </div>
                  <span className="font-mono-tech text-xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                    {phase.phase}
                  </span>
                </div>

                <div className="text-xs font-mono-tech uppercase tracking-widest text-[#D4A373] mb-1">
                  PHASE {phase.phase}
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {phase.title}
                </h3>

                <h4 className="text-xs font-medium text-[#8A92A0] mb-3 leading-snug">
                  {phase.subtitle}
                </h4>

                <p className="text-xs text-[#8A92A0] leading-relaxed mb-6">
                  {phase.description}
                </p>
              </div>

              {/* Value Add Tag */}
              <div className="pt-4 border-t border-white/10 mt-auto">
                <div className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: phase.accentColor }}
                  />
                  <span className="text-[11px] font-mono-tech text-[#F3F4F6] leading-tight">
                    {phase.valueAdd}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner on BIMQP Synergy */}
        <div className="mt-12 p-6 rounded-lg bg-[#14171D] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono-tech text-xs text-[#38BDF8]">
              <span>BIMQP Ecosystem Pipeline Integration</span>
            </div>
            <p className="text-sm text-white font-medium">
              Connecting 3D BIM modeling, spatial visualization, and pre-construction review to support clear stakeholder communication across the project lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono-tech text-xs text-[#8A92A0]">BIM-Informed Coordination</span>
          </div>
        </div>
      </div>
    </section>
  );
};

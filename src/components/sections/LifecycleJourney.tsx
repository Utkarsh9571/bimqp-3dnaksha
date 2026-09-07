import React, { useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { LIFECYCLE_PHASES } from '../../data/content';
import { PenTool, Box, Glasses, HardHat, CheckCircle2, Target, ShieldCheck, Zap, Sparkles, Award } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useInView } from '../../hooks/useInView';
import { Badge } from '../ui/Badge';

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

  const missionPillars = [
    {
      icon: ShieldCheck,
      title: 'Zero Visual Guesswork',
      desc: 'Replacing static 2D drawings with 1:1 scale VR environments where clients feel true depth, scale, and lighting before ground breaking.'
    },
    {
      icon: Zap,
      title: 'Prevent Costly Rework',
      desc: 'Identifying spatial conflicts, room clearance issues, and material flaws in virtual space — saving lakhs in site demolition and delays.'
    },
    {
      icon: Award,
      title: 'Global BIM Precision',
      desc: 'Leveraging 15–20 years of Singapore BIMQP engineering mastery to deliver high-precision 3D coordination across India.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="py-24 bg-brand-canvas relative overflow-hidden border-t border-gray-200"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-accent-bronze/10 via-accent-amber-gold/5 to-accent-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <SectionHeading
          number="04"
          badgeText="Our Purpose & Mission"
          badgeVariant="amber"
          title="Empowering Architecture Through"
          highlightText="Spatial Certainty."
          subtitle="We are on a mission to eliminate spatial guesswork, communication gaps, and expensive on-site rework across India's AEC ecosystem through 1:1 Virtual Reality and intelligent 3D BIM modeling."
          align="left"
        />

        {/* Hero Mission Statement Spotlight Panel */}
        <div 
          className="architectural-panel bg-white p-8 sm:p-10 rounded-2xl border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative overflow-hidden corner-crosshairs space-y-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}
        >
          {/* Top Mission Core Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-gray-150">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 font-mono-tech text-xs text-accent-bronze font-bold tracking-widest uppercase">
                <Target className="w-4 h-4 text-accent-bronze shrink-0" />
                <span>Our Core Directive</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary leading-snug">
                "To step into unbuilt spaces before a single brick is laid, enabling every homeowner, architect, and developer to build with 100% spatial confidence."
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed font-sans max-w-3xl">
                By bridging Singapore's world-class BIM QP engineering standards with cutting-edge Virtual Reality visualization, 3D Naksha transforms complex blueprints into intuitive, interactive physical realities.
              </p>
            </div>

            {/* Quick Metrics / Accolades Badge Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-brand-canvas to-amber-50/40 p-6 rounded-xl border border-accent-amber/20 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-accent-amber uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-accent-amber" />
                <span>BIMQP Ecosystem Heritage</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-xs text-gray-600 font-medium">BIM Leadership</span>
                  <span className="font-display font-bold text-lg text-brand-primary">15–20 Years</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-xs text-gray-600 font-medium">Walkthrough Scale</span>
                  <span className="font-display font-bold text-lg text-accent-bronze">1:1 Human Scale</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-600 font-medium">Design Ambiguity</span>
                  <span className="font-display font-bold text-lg text-emerald-600">Zero Rework</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Mission Anchors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="p-5 rounded-xl bg-brand-canvas/60 border border-gray-200/70 hover:border-accent-bronze/40 transition-all space-y-3 group">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-accent-bronze group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-brand-primary group-hover:text-accent-bronze transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Divider Subtitle: How We Fulfill Our Mission */}
        <div className="pt-8 space-y-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-accent-blue font-bold tracking-widest uppercase justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            <span>HOW WE FULFILL OUR MISSION</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary tracking-tight">
            The Connected AEC Lifecycle Journey
          </h3>
          <p className="text-sm text-brand-muted max-w-2xl">
            Our step-by-step digital process turns conceptual sketches into error-free digital BIM models and immersive VR walkthroughs.
          </p>
        </div>

        {/* Connecting Progress Timeline Line with Active Milestone Dots (Desktop) */}
        <div className="hidden lg:block relative mb-8 mt-2 px-8">
          <div className="h-1 w-full bg-gray-200 relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-accent-blue via-accent-amber to-accent-bronze-dark shadow-xs transition-all duration-200"
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
                      ? 'bg-accent-amber border-white scale-125 shadow-sm'
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
                className={`architectural-panel bg-white p-6 sm:p-7 rounded-xl relative group flex flex-col justify-between transition-all duration-500 hover-lift ${
                  isCurrentCard
                    ? 'border-accent-bronze shadow-[0_10px_30px_rgba(154,106,56,0.12)]'
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
                      className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300 ${
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

                  <div className="text-xs font-mono-tech uppercase font-bold tracking-widest text-accent-bronze mb-1">
                    PHASE {phase.phase}
                  </div>

                  <h3 className="font-display text-xl font-bold text-brand-primary mb-2 group-hover:text-accent-bronze transition-colors">
                    {phase.title}
                  </h3>

                  <h4 className="text-xs font-semibold text-gray-700 mb-3 leading-snug">
                    {phase.subtitle}
                  </h4>

                  <p className="text-xs text-brand-muted leading-relaxed mb-6">
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
          className="p-6 rounded-xl bg-gradient-to-r from-gray-900 via-brand-primary to-gray-900 text-white border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
          }}
        >
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono-tech text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>BIMQP Ecosystem Pipeline Integration</span>
            </div>
            <p className="text-sm text-gray-200 font-medium max-w-3xl">
              Connecting 3D BIM modeling, spatial visualization, and pre-construction review to ensure zero rework and clear stakeholder alignment across every project.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Badge variant="amber" size="sm">BIM-Informed Coordination</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifecycleJourney;

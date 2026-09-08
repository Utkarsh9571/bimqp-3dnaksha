import React, { useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
//import { LIFECYCLE_PHASES } from '../../data/content';
import { Target, ShieldCheck, Zap, Sparkles, Award } from 'lucide-react';

import { useInView } from '../../hooks/useInView';
import { Badge } from '../ui/Badge';

export const LifecycleJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.15, triggerOnce: true });
 
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
          number="03"
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

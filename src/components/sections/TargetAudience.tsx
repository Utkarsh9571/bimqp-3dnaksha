import React, { useState, useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { AUDIENCE_LIST } from '../../data/content';
import { Badge } from '../ui/Badge';
import {
  Compass,
  Building2,
  Palette,
  Wrench,
  Key,
  Users2,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface TargetAudienceProps {
  onOpenConsultation: (role?: string) => void;
}

export const TargetAudience: React.FC<TargetAudienceProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });
  const [selectedId, setSelectedId] = useState<string>('architects');

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-5 h-5" />,
    Building2: <Building2 className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    Wrench: <Wrench className="w-5 h-5" />,
    Key: <Key className="w-5 h-5" />,
    Users2: <Users2 className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />
  };

  const activeAudience = AUDIENCE_LIST.find((aud) => aud.id === selectedId) || AUDIENCE_LIST[0];

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="py-24 bg-brand-canvas relative overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="04"
          badgeText="AEC Stakeholders"
          badgeVariant="amber"
          title="Built for the AEC"
          highlightText="Ecosystem."
          subtitle="Providing clear spatial visualization, 3D BIM models, and immersive walkthroughs for decision-makers across design and construction."
          align="left"
        />

        {/* Stakeholder Segment Tabs (Reflows evenly on mobile & tablet) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
          }}
          role="tablist"
          aria-label="Stakeholder Audiences"
        >
          {AUDIENCE_LIST.map((aud) => {
            const isSelected = selectedId === aud.id;
            return (
              <button
                key={aud.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`audience-panel-${aud.id}`}
                id={`audience-tab-${aud.id}`}
                onClick={() => setSelectedId(aud.id)}
                className={`p-3.5 min-h-[52px] rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-white border-accent-bronze shadow-md ring-1 ring-[#9A6A38]/40 scale-[1.02]'
                    : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xs flex items-center justify-center border transition-colors ${
                    isSelected
                      ? 'bg-amber-50 border-accent-bronze text-accent-bronze'
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                >
                  {iconMap[aud.icon] || <Users2 className="w-5 h-5" />}
                </div>
                <div className="font-display font-bold text-xs text-gray-900 leading-tight">
                  {aud.role.split('&')[0].trim()}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stakeholder Deep-Dive Card */}
        <div
          id={`audience-panel-${activeAudience.id}`}
          role="tabpanel"
          aria-labelledby={`audience-tab-${activeAudience.id}`}
          className="architectural-panel bg-white p-6 sm:p-10 rounded-lg border border-gray-200/90 corner-crosshairs shadow-xl transition-all duration-500"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s'
          }}
        >
          {/* Header & Eyebrow with Stakeholder Visual Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="amber" size="sm">
                  {activeAudience.eyebrow}
                </Badge>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-primary leading-tight">
                {activeAudience.headline}
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {activeAudience.description}
              </p>
            </div>

            {/* Dynamic Audience Stakeholder Visual Preview */}
            {activeAudience.image && (
              <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-gray-200/90 shadow-md group">
                <img
                  key={activeAudience.id}
                  src={activeAudience.image}
                  alt={`${activeAudience.role} - 3D Naksha Architectural Workflow`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 animate-fadeIn"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tech text-white z-10">
                  <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/20">
                    {activeAudience.role.split('&')[0]} Workflow Preview
                  </span>
                  <span className="text-amber-300 font-bold">1:1 Precision</span>
                </div>
              </div>
            )}
          </div>

          {/* Workflow Comparison Grid: Traditional vs With 3D Naksha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Traditional Workflow */}
            <div className="bg-slate-50/80 p-5 sm:p-6 rounded-md border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-700 font-mono-tech text-xs uppercase font-bold tracking-wider mb-4 pb-2.5 border-b border-slate-200">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Traditional Workflow</span>
                </div>
                <ul className="space-y-3">
                  {activeAudience.traditionalWorkflow.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-mono-tech text-slate-500 uppercase">
                Ambiguity &amp; friction in conventional review
              </div>
            </div>

            {/* With 3D Naksha */}
            <div className="bg-amber-50/50 p-5 sm:p-6 rounded-md border border-amber-200/90 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-2 text-accent-bronze-dark font-mono-tech text-xs uppercase font-bold tracking-wider mb-4 pb-2.5 border-b border-amber-200/70">
                  <Sparkles className="w-4 h-4 text-accent-bronze" />
                  <span>With 3D Naksha</span>
                </div>
                <ul className="space-y-3">
                  {activeAudience.with3DNaksha.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-primary font-medium leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-accent-bronze shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-200/70 text-[11px] font-mono-tech text-accent-bronze uppercase font-semibold">
                Visual validation &amp; early certainty
              </div>
            </div>
          </div>

          {/* Benefits Row & Audience-Specific CTA Footer */}
          <div className="pt-6 border-t border-gray-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* 3 Outcome-focused Benefits */}
            <div className="space-y-2 w-full lg:w-auto">
              <div className="text-[11px] font-mono-tech text-gray-500 uppercase tracking-wider font-semibold">
                Key Workflow Outcomes
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {activeAudience.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100/90 border border-gray-200 text-xs font-semibold text-gray-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience-Specific Action CTA */}
            <button
              onClick={() => onOpenConsultation(activeAudience.role)}
              className="btn-cta-premium flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3 text-xs sm:text-sm cursor-pointer group shrink-0"
            >
              <span>{activeAudience.ctaText.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

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
  AlertCircle,
  CheckCircle2,
  ArrowRight
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

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="06"
          badgeText="AEC Stakeholders"
          badgeVariant="amber"
          title="Built for the AEC"
          highlightText="Ecosystem."
          subtitle="Providing clear spatial visualization, 3D BIM models, and immersive walkthroughs for decision-makers across design and construction."
          align="left"
        />

        {/* Stakeholder Segment Tabs (Reflows evenly on mobile & tablet) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
          }}
        >
          {AUDIENCE_LIST.map((aud) => {
            const isSelected = selectedId === aud.id;
            return (
              <button
                key={aud.id}
                onClick={() => setSelectedId(aud.id)}
                className={`p-3.5 min-h-[44px] rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-white border-[#9A6A38] shadow-md ring-1 ring-[#9A6A38]/40 scale-102'
                    : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xs flex items-center justify-center border transition-colors ${
                    isSelected
                      ? 'bg-amber-50 border-[#9A6A38] text-[#9A6A38]'
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                >
                  {iconMap[aud.icon] || <Users2 className="w-5 h-5" />}
                </div>
                <div className="font-display font-bold text-xs text-gray-900 leading-tight">
                  {aud.role.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stakeholder Deep-Dive Card */}
        {AUDIENCE_LIST.map((aud) => {
          if (aud.id !== selectedId) return null;
          return (
            <div
              key={aud.id}
              className="architectural-panel bg-white p-6 sm:p-10 rounded-lg border border-gray-200/90 corner-crosshairs shadow-xl transition-all duration-500"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
                transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s'
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left info */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber" size="sm">
                      STAKEHOLDER FOCUS // {aud.role.toUpperCase()}
                    </Badge>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A] leading-tight">
                    {aud.tagline}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {aud.description}
                  </p>

                  {/* Pain vs Solution Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-amber-50/60 p-4 rounded-sm border border-amber-200">
                      <div className="flex items-center gap-2 text-[#B45309] font-mono-tech text-xs uppercase font-bold mb-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Common Challenge</span>
                      </div>
                      <p className="text-xs text-[#4B5563] leading-relaxed">
                        {aud.painPoint}
                      </p>
                    </div>

                    <div className="bg-emerald-50/60 p-4 rounded-sm border border-emerald-200">
                      <div className="flex items-center gap-2 text-[#059669] font-mono-tech text-xs uppercase font-bold mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>3D Naksha Approach</span>
                      </div>
                      <p className="text-xs text-[#4B5563] leading-relaxed">
                        {aud.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right deliverables and CTA */}
                <div className="lg:col-span-5 bg-gray-50 p-6 rounded-md border border-gray-200 space-y-6">
                  <div>
                    <div className="text-xs font-mono-tech text-[#9A6A38] uppercase font-bold tracking-wider mb-3">
                      Deliverable Highlights
                    </div>
                    <div className="space-y-2">
                      {aud.deliverables.map((deliv, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 rounded-xs bg-white border border-gray-200 text-xs text-gray-800 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation(aud.role)}
                    className="w-full py-3 px-4 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-sm"
                  >
                    <span>Discuss Requirements for {aud.role.split('&')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TargetAudience;

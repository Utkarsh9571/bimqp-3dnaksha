import React, { useState } from 'react';
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

interface TargetAudienceProps {
  onOpenConsultation: (role?: string) => void;
}

export const TargetAudience: React.FC<TargetAudienceProps> = ({ onOpenConsultation }) => {
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
    <section id="audience" className="py-24 bg-[#08090B] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="05"
          badgeText="AEC Stakeholders"
          badgeVariant="bronze"
          title="Built for the AEC"
          highlightText="Ecosystem."
          subtitle="Providing clear spatial visualization, 3D BIM models, and immersive walkthroughs for decision-makers across design and construction."
          align="left"
        />

        {/* Stakeholder Segment Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
          {AUDIENCE_LIST.map((aud) => {
            const isSelected = selectedId === aud.id;
            return (
              <button
                key={aud.id}
                onClick={() => setSelectedId(aud.id)}
                className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#14171D] border-[#D4A373] shadow-lg ring-1 ring-[#D4A373]/50'
                    : 'bg-[#0E1013] border-white/10 hover:border-white/20 hover:bg-[#12151B]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xs flex items-center justify-center border ${
                    isSelected
                      ? 'bg-[#D4A373]/20 border-[#D4A373] text-[#D4A373]'
                      : 'bg-white/5 border-white/10 text-[#8A92A0]'
                  }`}
                >
                  {iconMap[aud.icon] || <Users2 className="w-5 h-5" />}
                </div>
                <div className="font-display font-semibold text-xs text-white leading-tight">
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
              className="architectural-panel p-6 sm:p-10 rounded-lg border-[#D4A373]/30 corner-crosshairs shadow-2xl animate-fadeIn"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left info */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2">
                    <Badge variant="bronze" size="sm">
                      STAKEHOLDER FOCUS // {aud.role.toUpperCase()}
                    </Badge>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {aud.tagline}
                  </h3>

                  <p className="text-sm text-[#8A92A0] leading-relaxed">
                    {aud.description}
                  </p>

                  {/* Pain vs Solution Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#08090B] p-4 rounded-sm border border-white/10">
                      <div className="flex items-center gap-2 text-[#E5A93B] font-mono-tech text-xs uppercase mb-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Common Challenge</span>
                      </div>
                      <p className="text-xs text-[#8A92A0] leading-relaxed">
                        {aud.painPoint}
                      </p>
                    </div>

                    <div className="bg-[#08090B] p-4 rounded-sm border border-[#10B981]/30">
                      <div className="flex items-center gap-2 text-[#10B981] font-mono-tech text-xs uppercase mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>3D Naksha Approach</span>
                      </div>
                      <p className="text-xs text-[#8A92A0] leading-relaxed">
                        {aud.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right deliverables and CTA */}
                <div className="lg:col-span-5 bg-[#14171D] p-6 rounded-md border border-white/10 space-y-6">
                  <div>
                    <div className="text-xs font-mono-tech text-[#D4A373] uppercase tracking-wider mb-3">
                      Deliverable Highlights
                    </div>
                    <div className="space-y-2">
                      {aud.deliverables.map((deliv, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 rounded-xs bg-[#0E1013] border border-white/5 text-xs text-[#F3F4F6]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation(aud.role)}
                    className="w-full py-3 px-4 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-md"
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

import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SERVICES } from '../../data/content';
import { Badge } from '../ui/Badge';
import {
  Home,
  Armchair,
  Layers,
  Glasses,
  HardHat,
  ArrowRight,
  Check,
  MessageSquare,
  FileCheck
} from 'lucide-react';

interface ServicesProps {
  onOpenConsultation: (defaultService?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('immersive-vr');

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-5 h-5" />,
    Armchair: <Armchair className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Glasses: <Glasses className="w-5 h-5" />,
    HardHat: <HardHat className="w-5 h-5" />
  };

  return (
    <section id="services" className="py-24 bg-[#08090B] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="03"
          badgeText="Capabilities Spectrum"
          badgeVariant="bronze"
          title="Architectural & BIM"
          highlightText="Services."
          subtitle="Confirmed visualization, BIM, and spatial services tailored for architectural practices, developers, interior designers, contractors, and property owners."
          align="left"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Service Selection Cards */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((service) => {
              const isSelected = activeServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`p-4 sm:p-5 rounded-md border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#14171D] border-[#D4A373] shadow-lg'
                      : 'bg-[#0E1013] border-white/10 hover:border-white/20 hover:bg-[#12151B]'
                  } ${service.isFeatured ? 'ring-1 ring-[#E5A93B]/30' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-sm flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-[#D4A373]/20 border-[#D4A373] text-[#D4A373]'
                            : 'bg-white/5 border-white/10 text-[#8A92A0]'
                        }`}
                      >
                        {iconMap[service.icon]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tech text-xs text-[#5A6270]">
                            {service.number} //
                          </span>
                          <h4 className="font-display font-bold text-white text-base">
                            {service.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#8A92A0] line-clamp-1 mt-0.5">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {service.badge && (
                      <Badge
                        variant={service.isFeatured ? 'amber' : 'neutral'}
                        size="sm"
                        className="shrink-0 text-[10px]"
                      >
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: In-Depth Editorial Showcase of Active Service */}
          <div className="lg:col-span-7">
            {SERVICES.map((service) => {
              if (service.id !== activeServiceId) return null;
              return (
                <div
                  key={service.id}
                  className="architectural-panel rounded-lg border-[#D4A373]/30 overflow-hidden shadow-2xl corner-crosshairs flex flex-col h-full animate-fadeIn"
                >
                  {/* Service Visual Header */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-[#0E1013]/40 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4">
                      <Badge variant="bronze" size="sm">
                        SERVICE SPECIFICATION // {service.number}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D4A373] font-mono-tech">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-[#8A92A0] leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="mb-6">
                        <div className="text-xs font-mono-tech text-[#D4A373] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Key Deliverables</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.deliverables.map((deliv, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 bg-[#14171D] p-2.5 rounded-sm border border-white/5 text-xs text-[#F3F4F6]"
                            >
                              <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Capabilities Strip */}
                      <div className="grid grid-cols-3 gap-2 p-3.5 rounded-sm bg-[#08090B] border border-white/10 text-xs font-mono-tech">
                        {service.specs.map((spec, idx) => (
                          <div key={idx}>
                            <div className="text-[10px] text-[#5A6270] uppercase">
                              {spec.label}
                            </div>
                            <div className="text-white font-medium text-[11px] mt-0.5 truncate">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-6">
                      <div className="text-xs font-mono-tech text-[#8A92A0] flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#E5A93B]" />
                        <span>Inquire about this service for your project</span>
                      </div>

                      <button
                        onClick={() => onOpenConsultation(service.title)}
                        className="px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-md"
                      >
                        <span>Discuss {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

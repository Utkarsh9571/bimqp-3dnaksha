import React, { useState, useRef } from 'react';
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
import { useInView } from '../../hooks/useInView';

interface ServicesProps {
  onOpenConsultation: (defaultService?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });
  const [activeServiceId, setActiveServiceId] = useState<string>('immersive-vr');
  const [animatingKey, setAnimatingKey] = useState<number>(0);

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-5 h-5" />,
    Armchair: <Armchair className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Glasses: <Glasses className="w-5 h-5" />,
    HardHat: <HardHat className="w-5 h-5" />
  };

  const handleSelectService = (id: string) => {
    if (id === activeServiceId) return;
    setActiveServiceId(id);
    setAnimatingKey((prev) => prev + 1);
  };

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[3];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="04"
          badgeText="Capabilities Spectrum"
          badgeVariant="amber"
          title="Architectural & BIM"
          highlightText="Services."
          subtitle="Confirmed visualization, BIM, and spatial services tailored for architectural practices, developers, interior designers, contractors, and property owners."
          align="left"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Service Selection Cards */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((service, idx) => {
              const isSelected = activeServiceId === service.id;
              const delay = idx * 90;
              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className={`p-4 sm:p-5 rounded-md border cursor-pointer relative transition-all duration-300 ${
                    isSelected
                      ? 'bg-white border-[#9A6A38] shadow-md translate-x-1.5 ring-1 ring-[#9A6A38]/40'
                      : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white'
                  } ${service.isFeatured ? 'ring-1 ring-amber-300' : ''}`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView
                      ? isSelected
                        ? 'translate3d(6px, 0, 0)'
                        : 'translate3d(0, 0, 0)'
                      : 'translate3d(0, 20px, 0)',
                    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, background-color 0.3s ease, border-color 0.3s ease`
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-sm flex items-center justify-center border transition-all duration-300 ${
                          isSelected
                            ? 'bg-amber-50 border-[#9A6A38] text-[#9A6A38] scale-105 shadow-2xs'
                            : 'bg-gray-100 border-gray-200 text-gray-600'
                        }`}
                      >
                        {iconMap[service.icon]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tech text-xs text-gray-500 font-bold">
                            {service.number} //
                          </span>
                          <h4 className="font-display font-bold text-[#0A0A0A] text-base">
                            {service.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#4B5563] line-clamp-1 mt-0.5">
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
          <div
            className="lg:col-span-7 transition-all duration-700"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            }}
          >
            <div className="architectural-panel bg-white rounded-lg border border-gray-200/90 overflow-hidden shadow-xl corner-crosshairs flex flex-col h-full">
              {/* Service Visual Header with Keyframe Transition */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-900">
                <img
                  key={`img-${activeService.id}-${animatingKey}`}
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover animate-image-reveal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

                <div className="absolute top-4 left-4">
                  <Badge variant="amber" size="sm">
                    SERVICE SPECIFICATION // {activeService.number}
                  </Badge>
                </div>

                <div
                  key={`meta-${activeService.id}-${animatingKey}`}
                  className="absolute bottom-4 left-4 right-4 animate-fadeIn"
                >
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                    {activeService.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7D488] font-mono-tech font-semibold">
                    {activeService.tagline}
                  </p>
                </div>
              </div>

              {/* Body Content */}
              <div
                key={`body-${activeService.id}-${animatingKey}`}
                className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between animate-fadeIn"
              >
                <div>
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                    {activeService.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mb-6">
                    <div className="text-xs font-mono-tech text-[#9A6A38] uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Key Deliverables</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((deliv, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-sm border border-gray-200 text-xs text-gray-800"
                        >
                          <Check className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-sm bg-gray-100 border border-gray-200 text-xs font-mono-tech">
                    {activeService.specs.map((spec, idx) => (
                      <div key={idx}>
                        <div className="text-[10px] text-gray-500 uppercase font-semibold">
                          {spec.label}
                        </div>
                        <div className="text-gray-900 font-bold text-[11px] mt-0.5 truncate">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div className="text-xs font-mono-tech text-gray-600 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Inquire about this service for your project</span>
                  </div>

                  <button
                    onClick={() => onOpenConsultation(activeService.title)}
                    className="px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-sm"
                  >
                    <span>Discuss {activeService.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

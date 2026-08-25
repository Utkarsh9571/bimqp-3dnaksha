import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowUpRight,
  Check,
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

  // Sync hash/search query to active service selection on mount or URL change
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      const search = new URLSearchParams(window.location.search);
      const serviceParam = search.get('service');

      let targetId: string | null = null;

      if (hash && hash.startsWith('#service-')) {
        targetId = hash.replace('#service-', '');
      } else if (serviceParam) {
        targetId = serviceParam;
      }

      if (targetId) {
        const found = SERVICES.find(
          (s) => s.id === targetId || s.slug === targetId || targetId === 'construction-project-management' && s.id === 'construction-pm'
        );
        if (found) {
          setActiveServiceId(found.id);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[3];
  const activeSlug = activeService.slug || activeService.id;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-brand-canvas relative overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="08"
          badgeText="Capabilities Spectrum"
          badgeVariant="amber"
          title="Architectural & BIM"
          highlightText="Services."
          subtitle="Confirmed visualization, BIM, and spatial services tailored for architectural practices, developers, interior designers, contractors, and property owners."
          align="left"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Service Selection Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3 h-full">
            {SERVICES.map((service, idx) => {
              const isSelected = activeServiceId === service.id;
              const delay = idx * 90;
              const serviceSlug = service.slug || service.id;
              const anchorId = `service-${service.id}`;

              return (
                <div
                  key={service.id}
                  id={anchorId}
                  onClick={() => handleSelectService(service.id)}
                  className={`flex-1 flex flex-col justify-center p-3.5 sm:p-4 rounded-md border cursor-pointer relative transition-all duration-300 group/card ${
                    isSelected
                      ? 'bg-white border-accent-bronze shadow-md translate-x-1.5 ring-1 ring-[#9A6A38]/40'
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
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-sm flex items-center justify-center border transition-all duration-300 shrink-0 ${
                          isSelected
                            ? 'bg-amber-50 border-accent-bronze text-accent-bronze scale-105 shadow-2xs'
                            : 'bg-gray-100 border-gray-200 text-gray-600'
                        }`}
                      >
                        {iconMap[service.icon]}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tech text-xs text-gray-500 font-bold shrink-0">
                            {service.number} //
                          </span>
                          <h4 className="font-display font-bold text-brand-primary text-sm sm:text-base truncate">
                            {service.title}
                          </h4>
                        </div>
                        <p className="text-xs text-brand-muted line-clamp-1 mt-0.5">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {service.badge && (
                        <Badge
                          variant={service.isFeatured ? 'amber' : 'neutral'}
                          size="sm"
                          className="text-[10px]"
                        >
                          {service.badge}
                        </Badge>
                      )}

                      {/* Detail Page Route Affordance */}
                      <Link
                        to={`/services/${serviceSlug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-mono-tech font-bold text-amber-700 hover:text-amber-900 bg-amber-50/80 hover:bg-amber-100 px-2 py-0.5 rounded-sm border border-amber-200/80 transition-colors mt-0.5"
                        title={`View ${service.title} detail page`}
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: In-Depth Editorial Showcase of Active Service */}
          <div
            className="lg:col-span-7 h-full flex flex-col transition-all duration-700"
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

                <div className="absolute top-4 right-4">
                  <Link
                    to={`/services/${activeSlug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-mono-tech font-bold transition-all shadow-md group"
                  >
                    <span>Full Service Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
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
                  <p className="text-sm text-brand-muted leading-relaxed mb-6">
                    {activeService.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mb-6">
                    <div className="text-xs font-mono-tech text-accent-bronze uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Key Deliverables</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((deliv, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-sm border border-gray-200 text-xs text-gray-800"
                        >
                          <Check className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
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
                  <Link
                    to={`/services/${activeSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-amber-800 hover:text-amber-950 font-bold group"
                  >
                    <span>Explore Complete {activeService.title} Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-600" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenConsultation(activeService.title)}
                      className="px-5 py-2.5 rounded-sm bg-gradient-to-r from-accent-bronze-light to-accent-amber-gold text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-sm"
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
      </div>
    </section>
  );
};

export default Services;

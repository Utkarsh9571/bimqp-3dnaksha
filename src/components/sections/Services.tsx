import React, { useState, useRef, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SERVICES } from '../../data/content';
import { DETAILED_SERVICES } from '../../data/servicesData';
import { Badge } from '../ui/Badge';
import {
  Home,
  Armchair,
  Layers,
  Glasses,
  HardHat,
  ArrowRight,
  Check,
  LayoutGrid,
  Maximize,
  Eye,
  Palette,
  Sun,
  ShieldCheck,
  Box,
  Zap,
  Sparkles,
  Clock,
  Users,
  Compass,
  Wrench,
  ChevronRight,
  Target,
  Award
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface ServicesProps {
  onOpenConsultation: (defaultService?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const detailShowcaseRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });
  const [activeServiceId, setActiveServiceId] = useState<string>('bim-modelling');
  const [animatingKey, setAnimatingKey] = useState<number>(0);

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-5 h-5" />,
    Armchair: <Armchair className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Glasses: <Glasses className="w-5 h-5" />,
    HardHat: <HardHat className="w-5 h-5" />
  };

  const getBenefitIcon = (iconName?: string) => {
    if (!iconName) return <Sparkles className="w-5 h-5 text-accent-bronze" />;
    const map: Record<string, React.ReactNode> = {
      LayoutGrid: <LayoutGrid className="w-5 h-5 text-accent-bronze" />,
      Maximize: <Maximize className="w-5 h-5 text-accent-blue" />,
      CheckCircle2: <Check className="w-5 h-5 text-emerald-600" />,
      Eye: <Eye className="w-5 h-5 text-sky-600" />,
      Palette: <Palette className="w-5 h-5 text-purple-600" />,
      Sun: <Sun className="w-5 h-5 text-amber-500" />,
      ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      Box: <Box className="w-5 h-5 text-sky-600" />,
      Zap: <Zap className="w-5 h-5 text-amber-500" />,
      Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
      Clock: <Clock className="w-5 h-5 text-blue-600" />,
      Users: <Users className="w-5 h-5 text-emerald-600" />,
      Compass: <Compass className="w-5 h-5 text-purple-600" />,
      Wrench: <Wrench className="w-5 h-5 text-amber-600" />
    };
    return map[iconName] || <Sparkles className="w-5 h-5 text-accent-bronze" />;
  };

  const handleSelectService = (id: string) => {
    if (id === activeServiceId) return;
    setActiveServiceId(id);
    setAnimatingKey((prev) => prev + 1);

    // Update URL hash for clean deep linking
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState(null, '', `#service-${id}`);
    }
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
          (s) => s.id === targetId || s.slug === targetId || (targetId === 'construction-project-management' && s.id === 'construction-pm')
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

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const activeDetailedData = DETAILED_SERVICES.find(
    (d) => d.id === activeServiceId || d.slug === activeServiceId || (activeServiceId === 'construction-pm' && d.id === 'construction-pm')
  ) || DETAILED_SERVICES[0];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-brand-canvas relative overflow-hidden border-t border-gray-200"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Heading */}
        <SectionHeading
          number="02"
          badgeText="Capabilities Spectrum"
          badgeVariant="amber"
          title="Architectural & BIM"
          highlightText="Services."
          subtitle="Confirmed visualization, BIM modeling, and spatial services tailored for architects, interior designers, developers, contractors, and property owners. Click any service below to explore its complete specifications."
          align="left"
        />

        {/* 1. TOP SELECTOR CARDS (5 Core Services Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {SERVICES.map((service, idx) => {
            const isSelected = activeServiceId === service.id;
            const delay = idx * 80;

            return (
              <button
                key={service.id}
                id={`service-${service.id}`}
                onClick={() => handleSelectService(service.id)}
                className={`p-4 rounded-lg border text-left transition-all duration-300 relative group cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-accent-bronze shadow-lg ring-2 ring-accent-bronze/40 translate-y-[-4px]'
                    : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-sm'
                }`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView
                    ? isSelected
                      ? 'translate3d(0, -4px, 0)'
                      : 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 20px, 0)',
                  transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`
                }}
              >
                {/* Active Indicator Top Pill */}
                {isSelected && (
                  <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-accent-bronze-light to-accent-amber-gold text-[#08090B] font-mono-tech text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                    ACTIVE SELECTION
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center border transition-all duration-300 ${
                        isSelected
                          ? 'bg-amber-50 border-accent-bronze text-accent-bronze scale-105 shadow-2xs'
                          : 'bg-gray-100 border-gray-200 text-gray-600 group-hover:text-brand-primary'
                      }`}
                    >
                      {iconMap[service.icon]}
                    </div>
                    <span className="font-mono-tech text-xs text-gray-400 font-bold">
                      {service.number}
                    </span>
                  </div>

                  <div>
                    <h4 className={`font-display font-bold text-base transition-colors ${
                      isSelected ? 'text-brand-primary' : 'text-gray-800 group-hover:text-brand-primary'
                    }`}>
                      {service.title}
                    </h4>
                    <p className="text-xs text-brand-muted line-clamp-2 mt-1 leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-between text-xs font-mono-tech font-bold text-accent-bronze">
                  <span>View Details</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. CONNECTED DETAILED SERVICE SHOWCASE SECTION (COMPACT & BRIEF) */}
        <div
          ref={detailShowcaseRef}
          key={`detail-showcase-${activeService.id}-${animatingKey}`}
          className="architectural-panel bg-white rounded-xl border border-gray-200/90 shadow-xl overflow-hidden animate-fadeIn space-y-0"
        >
          {/* Top Service Compact Hero Banner */}
          <div className="relative bg-gradient-to-r from-gray-950 via-brand-primary to-gray-900 text-white p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeDetailedData.heroImage || activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-transparent" />
            </div>

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="amber" size="sm">
                  {activeDetailedData.categoryTagline || `SERVICE SPECIFICATION // ${activeService.number}`}
                </Badge>
                <span className="text-[11px] font-mono-tech text-amber-400 font-bold uppercase tracking-wider">
                  BIMQP Certified
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activeDetailedData.heroHeadline || activeService.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed font-sans line-clamp-2">
                {activeDetailedData.heroDescription || activeService.description}
              </p>
            </div>
          </div>

          {/* Main Content Body - Compact Grid Layout */}
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Challenge */}
              <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200/70 space-y-1.5">
                <div className="flex items-center gap-2 font-mono-tech text-[11px] text-rose-700 font-bold uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5 text-rose-600" />
                  <span>Spatial & Technical Challenge</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed font-sans">
                  {activeDetailedData.overview.problemSolved}
                </p>
              </div>

              {/* Right Column: Naksha Solution */}
              <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200/70 space-y-1.5">
                <div className="flex items-center gap-2 font-mono-tech text-[11px] text-emerald-700 font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3D Naksha Solution & AEC Value</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed font-sans">
                  {activeDetailedData.overview.nakshaApproach}
                </p>
              </div>
            </div>

            {/* Key Deliverables (Inline Compact Pills) */}
            <div className="space-y-2">
              <h4 className="font-mono-tech text-xs text-gray-500 font-bold uppercase tracking-wider">
                Key Deliverables & Outputs
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {activeDetailedData.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-gray-50 border border-gray-200 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-mono-tech font-medium text-gray-800 truncate">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Benefits & 4-Step Workflow (Compact Split Row) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-gray-200">
              
              {/* Core Benefits List */}
              <div className="lg:col-span-6 space-y-3">
                <h4 className="font-mono-tech text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Core Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeDetailedData.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-md bg-brand-canvas border border-gray-200 space-y-1 hover:border-accent-bronze transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0">
                          {getBenefitIcon(benefit.icon)}
                        </div>
                        <h5 className="font-display font-bold text-xs text-brand-primary truncate">
                          {benefit.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-brand-muted leading-tight font-sans line-clamp-2">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Streamlined Workflow */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono-tech text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Workflow & Delivery
                  </h4>
                  <span className="font-mono-tech text-[10px] text-accent-bronze font-bold uppercase">
                    4-Step Process
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeDetailedData.workflow.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-md bg-gray-50 border border-gray-200 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[10px] text-accent-bronze font-bold">
                          STEP {step.step}
                        </span>
                        <span className="font-mono-tech text-[9px] text-gray-400">
                          Phase 0{idx + 1}
                        </span>
                      </div>
                      <h5 className="font-display font-bold text-xs text-brand-primary truncate">
                        {step.title}
                      </h5>
                      <p className="text-[11px] text-gray-600 leading-tight font-sans line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Compact Action Bar */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-gray-900 to-brand-primary text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="font-mono-tech text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  READY TO ELEVATE YOUR PROJECT?
                </span>
                <p className="text-xs text-gray-300">
                  Contact our AEC visualization team for custom scope estimates & fast turnarounds.
                </p>
              </div>
              <button
                onClick={() => onOpenConsultation(activeService.title)}
                className="px-4 py-2 rounded bg-gradient-to-r from-accent-amber-gold to-accent-bronze-light text-[#08090B] font-mono-tech text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

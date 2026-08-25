import React from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import type { DetailedServiceData } from '../../types';

interface ServiceHeroProps {
  service: DetailedServiceData;
  onOpenConsultation: (serviceName?: string) => void;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service, onOpenConsultation }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#08090B] border-b border-gray-800/80 overflow-hidden text-white">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      
      {/* Radial Gradient Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-bronze/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono-tech text-gray-400 hover:text-white transition-colors py-1.5 px-3 rounded-sm bg-white/5 border border-white/10 hover:border-white/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm">
              3D NAKSHA // SERVICE SPECIFICATION
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="font-mono-tech text-xs sm:text-sm text-accent-bronze-light font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-bronze-light" />
                {service.categoryTagline}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                {service.title}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              {service.heroDescription}
            </p>

            {/* Quick Spec Strip */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono-tech">
              {service.specs.map((spec, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">
                    {spec.label}
                  </div>
                  <div className="text-white font-bold text-[11px] sm:text-xs truncate">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenConsultation(service.title)}
                className="px-6 py-3.5 rounded-sm bg-gradient-to-r from-accent-bronze-light via-accent-amber-gold to-accent-amber-bright text-[#08090B] font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-amber-900/20"
              >
                <span>Discuss {service.title} Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono-tech text-gray-400 px-2 py-1">
                <ShieldCheck className="w-4 h-4 text-accent-emerald shrink-0" />
                <span>BIMQP Ecosystem Workflow</span>
              </div>
            </div>
          </div>

          {/* Right Hero Cinematic Media Frame */}
          <div className="lg:col-span-5">
            <div className="architectural-panel bg-gray-900/90 rounded-lg border border-gray-800 overflow-hidden shadow-2xl relative group">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img
                  src={service.heroImage || service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="font-mono-tech text-xs bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 font-bold px-3 py-1 rounded-sm">
                    {service.number} // SPECIFICATION
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-sm">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-gray-300">{service.tagline}</span>
                    <CheckCircle className="w-4 h-4 text-accent-blue shrink-0 ml-2" />
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

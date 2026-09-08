import React from 'react';
import { ArrowRight, Layers, Home, Armchair, Glasses, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DETAILED_SERVICES } from '../../data/servicesData';
import type { DetailedServiceData } from '../../types';

interface ServiceRelatedProps {
  currentService: DetailedServiceData;
}

export const ServiceRelated: React.FC<ServiceRelatedProps> = ({ currentService }) => {
  const relatedServices = DETAILED_SERVICES.filter((s) =>
    currentService.relatedServiceIds.includes(s.id) && s.id !== currentService.id
  ).slice(0, 3);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Armchair': return <Armchair className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Glasses': return <Glasses className="w-5 h-5" />;
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-20 bg-[#08090B] text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-gray-800 pb-6">
          <div>
            <div className="font-mono-tech text-xs text-accent-bronze-light uppercase font-bold tracking-widest mb-1">
              09 // EXPLORE ECOSYSTEM CAPABILITIES
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Related Services
            </h2>
          </div>
          <Link
            to="/"
            className="text-xs font-mono-tech text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
          >
            <span>View All 5 Core Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((rel) => (
            <Link
              key={rel.id}
              to={`/services/${rel.slug}`}
              className="p-6 rounded-md bg-white/5 border border-white/10 hover:border-amber-400/60 hover:bg-white/10 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-white/10 border border-white/15 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(rel.icon)}
                  </div>
                  <span className="font-mono-tech text-xs text-gray-500 font-bold">
                    {rel.number} //
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {rel.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
                  {rel.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Explore Service Details</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

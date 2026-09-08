import React from 'react';
import { Users2, Compass, Palette, Building2, Wrench, Layers, Key, Check } from 'lucide-react';
import { AUDIENCE_LIST } from '../../data/content';
import type { DetailedServiceData } from '../../types';

interface ServiceAudienceProps {
  service: DetailedServiceData;
}

export const ServiceAudience: React.FC<ServiceAudienceProps> = ({ service }) => {
  const relevantAudiences = AUDIENCE_LIST.filter((aud) =>
    service.audienceIds.includes(aud.id)
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Key': return <Key className="w-5 h-5" />;
      default: return <Users2 className="w-5 h-5" />;
    }
  };

  if (relevantAudiences.length === 0) return null;

  return (
    <section className="py-20 bg-brand-canvas border-b border-gray-200 text-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="font-mono-tech text-xs text-accent-bronze uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
            <Users2 className="w-4 h-4" />
            <span>07 // PRIMARY STAKEHOLDERS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-primary">
            Who {service.title} Is Built For
          </h2>
          <p className="text-sm text-brand-muted mt-2 leading-relaxed">
            Tailored visual deliverables and coordination models designed specifically for key AEC stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relevantAudiences.map((audience) => (
            <div
              key={audience.id}
              className="p-6 rounded-md bg-white border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-amber-50 border border-amber-200 text-accent-bronze flex items-center justify-center shrink-0">
                    {getIcon(audience.icon)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gray-900">
                      {audience.role}
                    </h3>
                    <p className="text-xs text-gray-500 font-mono-tech">
                      AEC Stakeholder
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-normal mb-4">
                  {audience.description}
                </p>

                <div className="p-3 rounded-sm bg-gray-50 border border-gray-200 space-y-1 mb-4 text-xs">
                  <div className="text-[10px] font-mono-tech font-bold text-red-600 uppercase">
                    Challenge Solved:
                  </div>
                  <div className="text-gray-700 text-[11px] leading-snug">
                    {audience.solution}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="text-[10px] font-mono-tech text-gray-500 font-bold uppercase mb-2">
                  Key Deliverables Included:
                </div>
                <div className="space-y-1">
                  {audience.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-xs text-gray-800">
                      <Check className="w-3 h-3 text-accent-blue shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

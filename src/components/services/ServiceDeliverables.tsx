import React from 'react';
import { FileCheck, Check } from 'lucide-react';
import type { DetailedServiceData } from '../../types';

interface ServiceDeliverablesProps {
  service: DetailedServiceData;
}

export const ServiceDeliverables: React.FC<ServiceDeliverablesProps> = ({ service }) => {
  return (
    <section className="py-20 bg-gray-50/80 border-b border-gray-200 text-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-6">
          <div>
            <div className="font-mono-tech text-xs text-accent-blue uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              <span>04 // SPECIFICATION DELIVERABLES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
              What We Deliver
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-gray-500 max-w-md">
            Concrete visual models, high-resolution rendering packages, and parametric datasets provided for {service.title}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.detailedDeliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent-blue/10 text-accent-blue font-mono-tech font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-base text-gray-900">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono-tech text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200/60 font-semibold">
                    OFFICIAL SPEC
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-normal mb-4 pl-8">
                  {item.description}
                </p>
              </div>

              {item.outputFormat && (
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono-tech text-gray-500">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-accent-emerald" />
                    <span>Format Standard:</span>
                  </span>
                  <span className="font-bold text-gray-800">{item.outputFormat}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

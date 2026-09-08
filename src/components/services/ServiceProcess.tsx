import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { DetailedServiceData } from '../../types';

interface ServiceProcessProps {
  service: DetailedServiceData;
}

export const ServiceProcess: React.FC<ServiceProcessProps> = ({ service }) => {
  return (
    <section className="py-20 bg-[#08090B] text-white border-b border-gray-800 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="font-mono-tech text-xs text-accent-bronze-light uppercase font-bold tracking-widest mb-1">
            05 // EXECUTION WORKFLOW
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            The {service.title} Workflow
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            A structured, 5-stage collaborative process ensuring technical precision, design alignment, and seamless asset handover.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {service.workflow.map((stepItem, idx) => (
            <div
              key={idx}
              className="p-5 rounded-md bg-white/5 border border-white/10 flex flex-col justify-between relative group hover:border-amber-400/50 transition-all"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-xs text-amber-400 font-bold tracking-wider">
                    STAGE {stepItem.step} //
                  </span>
                  <span className="text-[10px] font-mono-tech text-gray-400 bg-white/5 px-2 py-0.5 rounded-sm">
                    {stepItem.keyAction}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white mb-1">
                  {stepItem.title}
                </h3>
                <div className="text-[11px] font-mono-tech text-accent-bronze-light mb-3">
                  {stepItem.subtitle}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                  {stepItem.description}
                </p>
              </div>

              {/* Deliverable Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono-tech text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{stepItem.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

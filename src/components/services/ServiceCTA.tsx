import React from 'react';
import { ArrowUpRight, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { DetailedServiceData } from '../../types';

interface ServiceCTAProps {
  service: DetailedServiceData;
  onOpenConsultation: (serviceName?: string) => void;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({ service, onOpenConsultation }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#08090B] to-[#0D0E12] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
          <span>BIMQP Ecosystem // Confirmed Visualization Workflows</span>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to Begin Your <span className="text-amber-400">{service.title}</span> Scope?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Collaborate directly with our architectural visualization specialists to define your spatial goals, ingesting CAD blueprints or BIM geometry.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono-tech text-gray-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-blue" />
            <span>Structured Design Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
            <span>Human-Scale Spatial Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-amber" />
            <span>Multi-Platform Deliverables</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => onOpenConsultation(service.title)}
            className="px-8 py-4 rounded-sm bg-gradient-to-r from-accent-bronze-light via-accent-amber-gold to-accent-amber-bright text-[#08090B] font-display font-bold text-sm sm:text-base tracking-wider uppercase flex items-center gap-3 hover:opacity-95 transition-all cursor-pointer shadow-xl shadow-amber-950/40 group"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss {service.title} Project Scope</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

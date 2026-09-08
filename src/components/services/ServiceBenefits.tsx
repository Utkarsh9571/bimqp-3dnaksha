import React from 'react';
import { LayoutGrid, Maximize, CheckCircle2, Eye, Palette, Sun, Compass, CheckSquare, Layers, AlertTriangle, Database, MessageSquare, User, Users, Sliders, Calendar, Flag, ShieldCheck, Users2 } from 'lucide-react';
import type { DetailedServiceData } from '../../types';

interface ServiceBenefitsProps {
  service: DetailedServiceData;
}

export const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({ service }) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5" />;
      case 'Maximize': return <Maximize className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'User': return <User className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Sliders': return <Sliders className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'Flag': return <Flag className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Users2': return <Users2 className="w-5 h-5" />;
      default: return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 bg-brand-canvas text-brand-primary border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="font-mono-tech text-xs text-accent-bronze uppercase font-bold tracking-widest mb-1">
            03 // CORE VALUE PROPOSITIONS
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-primary">
            Key Advantages of {service.title}
          </h2>
          <p className="text-sm text-brand-muted mt-2 leading-relaxed">
            Quantifiable visual clarity and strategic benefits introduced into your spatial design and planning workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <div className="w-10 h-10 rounded-sm bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {getIcon(benefit.icon)}
              </div>
              <div className="font-mono-tech text-[10px] text-gray-400 font-bold uppercase mb-1">
                BENEFIT 0{idx + 1}
              </div>
              <h3 className="font-display font-bold text-base text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

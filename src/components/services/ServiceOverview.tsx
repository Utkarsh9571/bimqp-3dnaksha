import React from 'react';
import { Target, HelpCircle, Layers, Workflow } from 'lucide-react';
import type { DetailedServiceData } from '../../types';

interface ServiceOverviewProps {
  service: DetailedServiceData;
}

export const ServiceOverview: React.FC<ServiceOverviewProps> = ({ service }) => {
  return (
    <section className="py-20 bg-[#0C0D10] border-b border-gray-800/80 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-800 pb-6">
          <div>
            <div className="font-mono-tech text-xs text-accent-amber-gold uppercase font-bold tracking-widest mb-1">
              02 // EXECUTIVE SUMMARY
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Service Overview & AEC Context
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-gray-400 max-w-md">
            Understanding the spatial purpose, workflow challenges, and project value of {service.title}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: What is this Service */}
          <div className="p-6 rounded-md bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="w-9 h-9 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Scope & Definition
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {service.overview.definition}
            </p>
          </div>

          {/* Card 2: The Challenge Solved */}
          <div className="p-6 rounded-md bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="w-9 h-9 rounded-sm bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              The AEC Design Challenge
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {service.overview.problemSolved}
            </p>
          </div>

          {/* Card 3: 3D Naksha Methodology */}
          <div className="p-6 rounded-md bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="w-9 h-9 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              The 3D Naksha Approach
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {service.overview.nakshaApproach}
            </p>
          </div>

          {/* Card 4: AEC Lifecycle Value */}
          <div className="p-6 rounded-md bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="w-9 h-9 rounded-sm bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Lifecycle Value
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {service.overview.aecWorkflowValue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

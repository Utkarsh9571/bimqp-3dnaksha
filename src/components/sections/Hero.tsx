import React from 'react';
import { ArrowRight, Glasses, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/content';
import { Badge } from '../ui/Badge';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreVR: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreVR }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-radial-vignette">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

      {/* Decorative Technical Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#D4A373]/10 to-[#38BDF8]/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Eyebrow Tagline */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant="bronze" size="md">
            Architectural Visualization & Immersive VR
          </Badge>
          <div className="hidden sm:flex items-center gap-2 font-mono-tech text-xs text-[#8A92A0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>BIMQP Ecosystem</span>
          </div>
        </div>

        {/* Hero Title & Primary Value Hook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Step Inside <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] via-[#E5A93B] to-[#F7D488]">
                Before You Build.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#8A92A0] font-normal leading-relaxed max-w-2xl">
              Experience unbuilt architecture, interior spaces, and 3D BIM models before construction begins. Evaluate designs from a true human perspective and make confident, well-coordinated construction decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] hover:from-[#E2B689] hover:to-[#F4D06F] text-[#08090B] font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(212,163,115,0.3)] hover:shadow-[0_0_35px_rgba(212,163,115,0.5)] flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreVR}
                className="px-6 py-3.5 rounded-sm bg-[#14171D] hover:bg-[#1C212B] text-white font-mono-tech text-xs tracking-wider uppercase border border-white/15 hover:border-[#D4A373]/50 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Glasses className="w-4 h-4 text-[#E5A93B]" />
                <span>Explore Immersive Services</span>
              </button>
            </div>

            {/* Benefit Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono-tech text-[#8A92A0]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Human-Scale Spatial Review</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Coordinated 3D BIM Models</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>Pre-Construction Clarity</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-white/20 bg-[#0E1013] corner-crosshairs shadow-2xl group">
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Architectural Visualization Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-black/30"></div>

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 text-[11px] font-mono-tech text-[#38BDF8] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
                  <span>SPATIAL PERSPECTIVE</span>
                </div>

                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 text-[11px] font-mono-tech text-[#D4A373]">
                  3D VISUALIZATION
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#08090B]/90 backdrop-blur-md p-3.5 rounded-sm border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                    <span className="text-white font-semibold">Architectural Visualization Model</span>
                    <span className="text-[#D4A373]">RESIDENTIAL DESIGN</span>
                  </div>
                  <div className="text-[11px] text-[#8A92A0] flex items-center justify-between">
                    <span>Design Concept → 3D Model Review</span>
                    <span className="text-[#10B981]">Pre-Construction Planning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Pillars Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BRAND_CONFIG.metrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4A373]">
                {metric.value}
              </div>
              <div className="font-display font-semibold text-sm text-[#F3F4F6]">
                {metric.label}
              </div>
              <div className="font-mono-tech text-xs text-[#5A6270]">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

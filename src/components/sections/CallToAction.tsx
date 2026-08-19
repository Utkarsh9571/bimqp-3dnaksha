import React from 'react';
import { ArrowRight, CheckCircle2, MessageSquare, Layers } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface CallToActionProps {
  onOpenConsultation: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-24 bg-[#08090B] relative overflow-hidden">
      {/* Glow gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#D4A373]/15 via-[#E5A93B]/10 to-[#38BDF8]/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="architectural-panel-glow p-8 sm:p-12 md:p-16 rounded-xl border-[#D4A373]/50 text-center corner-crosshairs shadow-2xl relative overflow-hidden">
          {/* Background CAD grid */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="amber" size="md">
                ARCHITECTURAL VISUALIZATION INQUIRY
              </Badge>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Ready to Step Inside <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] via-[#E5A93B] to-[#F7D488]">
                Before You Build?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#8A92A0] leading-relaxed max-w-2xl mx-auto">
              Share your project drawings, floor plans, or concept sketches to discuss your architectural visualization, 3D BIM modeling, or immersive walkthrough requirements.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="px-8 py-4 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] hover:from-[#E2B689] hover:to-[#F4D06F] text-[#08090B] font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(212,163,115,0.35)] hover:shadow-[0_0_45px_rgba(212,163,115,0.55)] flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Discuss Your Project Scope</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Benefit Indicators */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono-tech text-[#8A92A0]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#10B981]" />
                <span>Direct Project Discussion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>Pre-Construction Spatial Review</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D4A373]" />
                <span>BIMQP Ecosystem Brand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

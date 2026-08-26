import React from 'react';
import { CheckCircle2, MessageSquare, Layers, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { BookingFormWidget } from '../ui/BookingFormWidget';

interface CallToActionProps {
  onOpenConsultation: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="booking-cta" className="py-24 bg-brand-canvas relative overflow-hidden border-t border-gray-200">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-accent-bronze-light/12 via-accent-amber-gold/10 to-accent-blue/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Intro Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="amber" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              DIRECT ARCHITECTURAL BOOKING
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-primary leading-[1.1]">
            Ready to Step Inside <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-bronze via-accent-amber to-accent-bronze-dark">
              Before You Build?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto">
            Schedule an online review session with our visualization engineers to discuss your floor plans, 3D BIM coordination, or virtual reality walkthrough requirements.
          </p>
        </div>

        {/* Project Consultation Form Widget */}
        <BookingFormWidget
          onBookingComplete={(details) => {
            console.log('Consultation Booked:', details);
          }}
        />

        {/* Alternative Consultation Trigger / Direct Inquiries */}
        <div className="mt-8 text-center">
          <button
            onClick={onOpenConsultation}
            className="text-xs font-mono-tech text-gray-600 hover:text-accent-bronze underline underline-offset-4 transition-colors cursor-pointer"
          >
            Have a custom RFP or bulk commercial tender? Click here for direct scope inquiry →
          </button>
        </div>

        {/* Benefit Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono-tech text-gray-600">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent-emerald" />
            <span>Direct Project Discussion</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-blue" />
            <span>Pre-Construction Spatial Review</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-amber" />
            <span>BIMQP Ecosystem Brand</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

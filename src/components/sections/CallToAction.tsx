import React from 'react';
import { CheckCircle2, MessageSquare, Layers, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { BookingFormWidget } from '../ui/BookingFormWidget';

interface CallToActionProps {
  onOpenConsultation: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="booking-cta" className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-[#D4A373]/12 via-[#E5A93B]/10 to-[#0284C7]/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#0284C7]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Intro Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="amber" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              DIRECT ARCHITECTURAL BOOKING
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] leading-[1.1]">
            Ready to Step Inside <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A38] via-[#D97706] to-[#B45309]">
              Before You Build?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
            Schedule an online review session with our visualization engineers to discuss your floor plans, 3D BIM coordination, or virtual reality walkthrough requirements.
          </p>
        </div>

        {/* 2-Column Booking Form Widget (Step 1 Details + Step 2 Calendar) */}
        <BookingFormWidget
          onBookingComplete={(details) => {
            console.log('Consultation Booked:', details);
          }}
        />

        {/* Alternative Consultation Trigger / Direct Inquiries */}
        <div className="mt-8 text-center">
          <button
            onClick={onOpenConsultation}
            className="text-xs font-mono-tech text-gray-600 hover:text-[#9A6A38] underline underline-offset-4 transition-colors cursor-pointer"
          >
            Have a custom RFP or bulk commercial tender? Click here for direct scope inquiry →
          </button>
        </div>

        {/* Benefit Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono-tech text-gray-600">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#059669]" />
            <span>Direct Project Discussion</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
            <span>Pre-Construction Spatial Review</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D97706]" />
            <span>BIMQP Ecosystem Brand</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

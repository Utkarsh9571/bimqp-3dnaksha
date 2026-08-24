import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Building2,
  Mail,
  Phone,
  User,
  Loader2,
  AlertCircle,
  CalendarCheck
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/animations';
import { submitToGoogleAppsScript } from '../../config/forms';
import { HUBSPOT_MEETINGS_URL } from '../../config/scheduling';

interface BookingFormWidgetProps {
  onBookingComplete?: (details: {
    fullName: string;
    workEmail: string;
    mobileNumber: string;
    projectName: string;
  }) => void;
  className?: string;
}

export const BookingFormWidget: React.FC<BookingFormWidgetProps> = ({
  onBookingComplete,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);

  // Step 1: User Details State
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [projectName, setProjectName] = useState('');

  // Submission State
  const [isStep1Submitted, setIsStep1Submitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  // Validation for Step 1
  const isStep1Valid =
    fullName.trim().length >= 2 &&
    workEmail.includes('@') &&
    mobileNumber.trim().length >= 7 &&
    projectName.trim().length >= 2;

  // Entrance Animation
  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const card = cardRef.current;
    if (!card) return;

    if (isReduced) {
      gsap.set(card, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(card, { opacity: 0, scale: 0.96 });

    const tween = gsap.to(card, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Embed HubSpot Meetings Script Loader
  useEffect(() => {
    const scriptId = 'hs-meetings-embed-script';

    const embedMeetingWidget = () => {
      const container = document.querySelector('.meetings-iframe-container');
      if (!container) return;

      // If container exists and does not have an iframe loaded yet
      if (!container.querySelector('iframe')) {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.remove();
        }
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    embedMeetingWidget();
  }, []);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || fullName.trim();
    const lastName = nameParts.slice(1).join(' ') || '';

    const formattedPhone = mobileNumber.trim().startsWith('+') ? `'${mobileNumber.trim()}` : mobileNumber.trim();

    const res = await submitToGoogleAppsScript({
      formType: 'homepage_booking',
      firstName: firstName,
      lastName: lastName,
      name: fullName.trim(),
      email: workEmail.trim(),
      phone: formattedPhone,
      projectName: projectName.trim(),
      projectDetails: `Project Lead: ${projectName.trim()} | Submitted via Step 1 Lead Capture`,
      website: honeypot
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsStep1Submitted(true);
      onBookingComplete?.({
        fullName,
        workEmail,
        mobileNumber,
        projectName
      });

      // Smooth scroll to Step 2 on mobile devices
      if (window.innerWidth < 1024 && step2Ref.current) {
        step2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setErrorMessage(res.message || 'Failed to save details. Please try again.');
    }
  };

  const isPlaceholderUrl = HUBSPOT_MEETINGS_URL.includes('your-hubspot-handle');

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl bg-white border border-gray-200/90 p-5 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative overflow-hidden corner-crosshairs ${className}`}
    >
      {/* Blueprint Ambient Grid Accent */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* Decorative Warm Corner Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-bl from-[#D4A373]/15 to-transparent blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#0284C7]/10 to-transparent blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* =========================================================
            LEFT COLUMN: STEP 1 - Your Details Form
           ========================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <form onSubmit={handleStep1Submit} className="space-y-6">
            {/* Honeypot field for spam protection */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div>
              {/* Step Tag */}
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-[#9A6A38] tracking-[0.2em] uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A6A38]" />
                <span>STEP 1 OF 2</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight mb-2">
                Your Details
              </h3>

              <p className="text-xs text-[#4B5563] font-mono-tech mb-6 leading-relaxed">
                Provide your contact details so our visualization team can prepare for your project discussion.
              </p>

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono-tech rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Input Fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#9A6A38]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Vikram Malhotra"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isStep1Submitted}
                    className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#9A6A38] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors disabled:opacity-70 disabled:bg-gray-100"
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Work Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@firm.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    disabled={isStep1Submitted}
                    className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#0284C7] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors disabled:opacity-70 disabled:bg-gray-100"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    disabled={isStep1Submitted}
                    className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#059669] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors disabled:opacity-70 disabled:bg-gray-100"
                  />
                </div>

                {/* Project Name */}
                <div>
                  <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Project Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skyline Residence & BIM Review"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    disabled={isStep1Submitted}
                    className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#D97706] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors disabled:opacity-70 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Step 1 Submit / Status Section */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {isStep1Submitted ? (
                <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-mono-tech text-[#059669]">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
                    <span>Step 1 Lead Saved to Sheet</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsStep1Submitted(false)}
                    className="text-[11px] underline text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    Edit Details
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!isStep1Valid || isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-sm font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    isStep1Valid && !isSubmitting
                      ? 'opacity-100 bg-gradient-to-r from-[#D4A373] via-[#E5A93B] to-[#F4D06F] text-[#08090B] shadow-[0_4px_20px_rgba(212,163,115,0.35)] hover:scale-[1.01] cursor-pointer'
                      : 'opacity-40 bg-gray-100 border border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SAVING DETAILS...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>SAVE DETAILS & PROCEED TO CALENDAR →</span>
                    </>
                  )}
                </button>
              )}

              <div className="font-mono-tech text-[11px] flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isStep1Submitted
                      ? 'bg-[#059669]'
                      : isStep1Valid
                      ? 'bg-[#9A6A38]'
                      : 'bg-gray-400'
                  }`}
                />
                <span className={isStep1Submitted ? 'text-[#059669] font-bold' : isStep1Valid ? 'text-[#9A6A38] font-bold' : 'text-gray-500'}>
                  {isStep1Submitted
                    ? 'Step 1 Lead Saved — Select time slot on right'
                    : isStep1Valid
                    ? 'Ready to save lead details'
                    : 'Fill all required fields above'}
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* =========================================================
            RIGHT COLUMN: STEP 2 - Embedded HubSpot Meetings Widget
           ========================================================= */}
        <div ref={step2Ref} className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Step Tag */}
            <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-[#0284C7] tracking-[0.2em] uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>STEP 2 OF 2</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight mb-2">
              Select Date & Time
            </h3>

            <p className="text-xs text-[#4B5563] font-mono-tech mb-4 leading-relaxed">
              Choose your preferred consultation date and live virtual walkthrough session slot via HubSpot.
            </p>

            {/* Developer Notice if default placeholder link is active */}
            {isPlaceholderUrl && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono-tech rounded-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <span className="font-bold">HubSpot Embed Placeholder:</span> Update{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">
                    src/config/scheduling.ts
                  </code>{' '}
                  with your real HubSpot Meetings URL to connect your live booking calendar.
                </div>
              </div>
            )}

            {/* HubSpot Meetings Official Embed Container */}
            <div className="rounded-xl border border-gray-200 bg-[#F9FAFB] p-2 sm:p-4 overflow-hidden shadow-2xs">
              <div
                className="meetings-iframe-container w-full min-h-[580px] sm:min-h-[620px]"
                data-src={
                  HUBSPOT_MEETINGS_URL.includes('embed=true')
                    ? HUBSPOT_MEETINGS_URL
                    : HUBSPOT_MEETINGS_URL.includes('?')
                    ? `${HUBSPOT_MEETINGS_URL}&embed=true`
                    : `${HUBSPOT_MEETINGS_URL}?embed=true`
                }
              />
            </div>
          </div>

          {/* Status Footer for Step 2 */}
          <div className="pt-4 mt-4 border-t border-gray-200 font-mono-tech text-xs flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#0284C7]" />
              <span>Powered by HubSpot Meetings Scheduler</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFormWidget;

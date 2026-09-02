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
  HelpCircle
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/animations';
import { submitToHubSpot } from '../../config/forms';

interface BookingFormWidgetProps {
  onBookingComplete?: (details: {
    firstName: string;
    lastName: string;
    fullName?: string;
    workEmail: string;
    mobileNumber: string;
    projectName: string;
  }) => void;
  className?: string;
}

const REFERRAL_OPTIONS = [
  'Google Search',
  'Referral / Recommendation',
  'Social Media (Instagram, LinkedIn, etc.)',
  'Industry Event / Publication',
  'Other'
];

const COUNTRY_CODES = [
  { code: '+91', country: 'IN (+91)' },
  { code: '+1', country: 'US/CA (+1)' },
  { code: '+44', country: 'UK (+44)' },
  { code: '+971', country: 'UAE (+971)' },
  { code: '+61', country: 'AU (+61)' },
  { code: '+60', country: 'MY (+60)' },
  { code: '+49', country: 'DE (+49)' },
  { code: '+33', country: 'FR (+33)' },
  { code: '+65', country: 'SG (+65)' },
  { code: '+86', country: 'CN (+86)' }
];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sanitizeName = (val: string): string => {
  // Strip all numeric digits (0-9)
  return val.replace(/[0-9]/g, '');
};

const sanitizePhone = (val: string): string => {
  // Remove all non-digits (spaces, letters, symbols) and cap at 10 digits
  return val.replace(/\D/g, '').slice(0, 10);
};

export const BookingFormWidget: React.FC<BookingFormWidgetProps> = ({
  onBookingComplete,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Form Field State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validation
  const isFormValid =
    firstName.trim().length >= 1 &&
    lastName.trim().length >= 1 &&
    EMAIL_REGEX.test(workEmail.trim()) &&
    mobileNumber.trim().length === 10 &&
    projectName.trim().length >= 2 &&
    referralSource.trim().length > 0;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = workEmail.trim();
    const cleanPhone = mobileNumber.trim();

    if (!cleanFirstName || !cleanLastName) {
      setErrorMessage('Please enter your first and last name.');
      return;
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage('Please enter a valid work email address (e.g. name@firm.com).');
      return;
    }

    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    const fullPhone = `${countryCode} ${cleanPhone}`;

    const res = await submitToHubSpot({
      formType: 'homepage_booking',
      firstName: cleanFirstName,
      lastName: cleanLastName,
      name: `${cleanFirstName} ${cleanLastName}`,
      email: cleanEmail,
      phone: fullPhone,
      countryCode: countryCode,
      projectName: projectName.trim(),
      projectDetails: `Project Lead: ${projectName.trim()} | Submitted via Homepage Consultation Form`,
      referralSource: referralSource,
      howHeard: referralSource,
      website: honeypot
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      onBookingComplete?.({
        firstName: cleanFirstName,
        lastName: cleanLastName,
        fullName: `${cleanFirstName} ${cleanLastName}`,
        workEmail: cleanEmail,
        mobileNumber: fullPhone,
        projectName
      });
    } else {
      setErrorMessage(res.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFirstName('');
    setLastName('');
    setWorkEmail('');
    setCountryCode('+91');
    setMobileNumber('');
    setProjectName('');
    setReferralSource('');
    setHoneypot('');
  };

  return (
    <div
      ref={cardRef}
      className={`max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative overflow-hidden corner-crosshairs ${className}`}
    >
      {/* Blueprint Ambient Grid Accent */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* Decorative Warm Corner Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-bl from-accent-bronze-light/15 to-transparent blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-accent-blue/10 to-transparent blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {isSubmitted ? (
          <div className="py-8 px-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-accent-emerald shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary tracking-tight">
              Inquiry Submitted Successfully
            </h3>

            <p className="text-xs sm:text-sm text-brand-muted font-mono-tech max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-brand-primary font-semibold">{firstName} {lastName}</strong>! Your project details have been received. We've sent a confirmation email to{' '}
              <strong className="text-brand-primary font-semibold">{workEmail}</strong>. You can use the scheduling link in that email to book a consultation with our team.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 text-brand-primary text-xs font-mono-tech font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Another Project Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              {/* Tag */}
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-accent-bronze tracking-[0.2em] uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                <span>PROJECT CONSULTATION</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary tracking-tight mb-2">
                Your Details
              </h3>

              <p className="text-xs text-brand-muted font-mono-tech mb-6 leading-relaxed">
                Provide your contact details so our visualization team can prepare for your project discussion.
              </p>

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono-tech rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Input Fields Grid */}
              <div className="space-y-4">
                {/* First Name & Last Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-accent-bronze" />
                      <span>First Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram"
                      value={firstName}
                      onChange={(e) => setFirstName(sanitizeName(e.target.value))}
                      className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-accent-bronze text-brand-primary text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-accent-bronze" />
                      <span>Last Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Malhotra"
                      value={lastName}
                      onChange={(e) => setLastName(sanitizeName(e.target.value))}
                      className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-accent-bronze text-brand-primary text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Work Email */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-accent-blue" />
                      <span>Work Email *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@firm.com"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-accent-blue text-brand-primary text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Mobile Number with Country Code Dropdown */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-accent-emerald" />
                      <span>Mobile Number * <span className="text-gray-400 font-normal lowercase">(10 digits)</span></span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-300 rounded-sm px-2.5 py-3 text-xs font-mono-tech text-brand-primary focus:outline-none focus:border-accent-emerald transition-colors shrink-0 cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.country}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        inputMode="numeric"
                        placeholder="9876543210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(sanitizePhone(e.target.value))}
                        className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-accent-emerald text-brand-primary text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Name */}
                <div>
                  <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-accent-amber" />
                    <span>Project Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skyline Residence & BIM Review"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-accent-amber text-brand-primary text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* How Did You Hear About Us? */}
                <div>
                  <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-accent-purple" />
                    <span>How did you hear about us? *</span>
                  </label>
                  <select
                    required
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-accent-bronze text-brand-primary text-sm font-sans focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="">Select option...</option>
                    {REFERRAL_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3.5 px-6 rounded-sm font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  isFormValid && !isSubmitting
                    ? 'opacity-100 bg-gradient-to-r from-accent-bronze-light via-accent-amber-gold to-accent-amber-bright text-[#08090B] shadow-[0_4px_20px_rgba(212,163,115,0.35)] hover:scale-[1.01] cursor-pointer'
                    : 'opacity-40 bg-gray-100 border border-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SUBMITTING INQUIRY...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>SUBMIT PROJECT DETAILS →</span>
                  </>
                )}
              </button>

              <div className="font-mono-tech text-[11px] flex items-center justify-center gap-2 text-gray-500">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isFormValid ? 'bg-accent-emerald' : 'bg-gray-400'
                  }`}
                />
                <span>
                  {isFormValid
                    ? 'Ready to submit inquiry'
                    : 'Fill all required fields above'}
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingFormWidget;

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, MessageSquare, Layers, Loader2, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { submitToHubSpot } from '../../config/forms';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

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

const REFERRAL_OPTIONS = [
  'Google Search',
  'Referral / Recommendation',
  'Social Media (Instagram, LinkedIn, etc.)',
  'Industry Event / Publication',
  'Other'
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

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    projectDetails: '',
    referralSource: '',
    website: '' // Honeypot field for spam protection
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanFirstName = formData.firstName.trim();
    const cleanLastName = formData.lastName.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();

    if (!cleanFirstName || !cleanLastName) {
      setErrorMessage('Please enter your first and last name.');
      return;
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);

    const fullPhone = `${formData.countryCode} ${cleanPhone}`;

    const res = await submitToHubSpot({
      formType: 'modal_consultation',
      firstName: cleanFirstName,
      lastName: cleanLastName,
      name: `${cleanFirstName} ${cleanLastName}`,
      email: cleanEmail,
      phone: fullPhone,
      countryCode: formData.countryCode,
      projectDetails: formData.projectDetails.trim(),
      referralSource: formData.referralSource,
      howHeard: formData.referralSource,
      website: formData.website // Honeypot
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(res.message || 'Submission failed. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+91',
      phone: '',
      projectDetails: '',
      referralSource: '',
      website: ''
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn"
      data-lenis-prevent="true"
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-2xl p-6 sm:p-8 text-gray-900 corner-crosshairs my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Close Button (Min 44x44px touch target) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-sm bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6 pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-tech text-xs text-accent-bronze uppercase font-bold tracking-wider">
                  Project Inquiry //
                </span>
                <Badge variant="amber" size="sm">
                  Direct Review
                </Badge>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-primary">
                Step Inside Your Project
              </h3>
              <p className="text-sm text-brand-muted mt-1">
                Share your architectural visualization and BIM requirements with our team.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono-tech rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field - hidden from real users */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: sanitizeName(e.target.value) })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-bronze transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mehta"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: sanitizeName(e.target.value) })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-bronze transition-colors"
                  />
                </div>
              </div>

              {/* Business / Work Email */}
              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Business / Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rajesh@designstudio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-bronze transition-colors"
                />
              </div>

              {/* Phone Number with Country Code Selector */}
              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Phone Number * <span className="text-gray-400 font-normal lowercase">(10 digits)</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="bg-[#F9FAFB] border border-gray-300 rounded-sm px-2.5 py-2.5 text-xs font-mono-tech text-brand-primary focus:outline-none focus:border-accent-bronze transition-colors shrink-0 cursor-pointer"
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: sanitizePhone(e.target.value) })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-bronze transition-colors"
                  />
                </div>
              </div>

              {/* Tell us about your project and goals (textarea, optional) */}
              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Tell us about your project and goals <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding your building type, timeline, spatial goals, or visualization deliverables."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-bronze transition-colors resize-none"
                ></textarea>
              </div>

              {/* How did you hear about us? (dropdown, optional) */}
              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  How did you hear about us? <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-brand-primary focus:outline-none focus:border-accent-bronze transition-colors"
                >
                  <option value="">Select an option...</option>
                  {REFERRAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 px-6 rounded-sm bg-gradient-to-r from-accent-bronze-light to-accent-amber-gold hover:from-[#E2B689] hover:to-accent-amber-bright text-[#08090B] font-display font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#08090B]" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] font-mono-tech text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-accent-emerald" />
                  Direct Review Pipeline
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-accent-blue" />
                  BIMQP Ecosystem
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-8 px-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto mb-6 text-accent-emerald">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <Badge variant="amber" size="sm" className="mb-3">
              INQUIRY RECEIVED
            </Badge>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-primary mb-3">
              Project Inquiry Submitted!
            </h3>

            <p className="text-sm text-brand-muted max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-brand-primary">{formData.firstName} {formData.lastName}</strong>. Our architectural visualization team will review your requirements and connect with you at <strong className="text-brand-primary">{formData.email}</strong>.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 text-left max-w-md mx-auto mb-6 text-xs space-y-1.5 font-mono-tech text-gray-600">
              <div className="flex justify-between">
                <span>Client Name:</span>
                <span className="text-brand-primary font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="text-accent-bronze font-bold">{formData.countryCode} {formData.phone}</span>
              </div>
              {formData.referralSource && (
                <div className="flex justify-between">
                  <span>Source:</span>
                  <span className="text-accent-blue font-medium">{formData.referralSource}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-mono-tech text-xs font-semibold tracking-wider border border-gray-300 transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, MessageSquare, Layers, Loader2, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { submitToGoogleAppsScript } from '../../config/forms';

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
    setIsSubmitting(true);

    const rawPhone = `${formData.countryCode} ${formData.phone.trim()}`;
    const fullPhone = rawPhone.startsWith('+') ? `'${rawPhone}` : rawPhone;

    const res = await submitToGoogleAppsScript({
      formType: 'modal_consultation',
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
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
                <span className="font-mono-tech text-xs text-[#9A6A38] uppercase font-bold tracking-wider">
                  Project Inquiry //
                </span>
                <Badge variant="amber" size="sm">
                  Direct Review
                </Badge>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A]">
                Step Inside Your Project
              </h3>
              <p className="text-sm text-[#4B5563] mt-1">
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
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors"
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
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors"
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
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors"
                />
              </div>

              {/* Phone Number with Country Code Selector */}
              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="bg-[#F9FAFB] border border-gray-300 rounded-sm px-2.5 py-2.5 text-xs font-mono-tech text-[#0A0A0A] focus:outline-none focus:border-[#9A6A38] transition-colors shrink-0"
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
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors"
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
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors resize-none"
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
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#9A6A38] transition-colors"
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
                className="w-full mt-2 py-3.5 px-6 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] hover:from-[#E2B689] hover:to-[#F4D06F] text-[#08090B] font-display font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                  <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
                  Direct Review Pipeline
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
                  BIMQP Ecosystem
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-8 px-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto mb-6 text-[#059669]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <Badge variant="amber" size="sm" className="mb-3">
              INQUIRY RECEIVED
            </Badge>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">
              Project Inquiry Submitted!
            </h3>

            <p className="text-sm text-[#4B5563] max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-[#0A0A0A]">{formData.firstName} {formData.lastName}</strong>. Our architectural visualization team will review your requirements and connect with you at <strong className="text-[#0A0A0A]">{formData.email}</strong>.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 text-left max-w-md mx-auto mb-6 text-xs space-y-1.5 font-mono-tech text-gray-600">
              <div className="flex justify-between">
                <span>Client Name:</span>
                <span className="text-[#0A0A0A] font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="text-[#9A6A38] font-bold">{formData.countryCode} {formData.phone}</span>
              </div>
              {formData.referralSource && (
                <div className="flex justify-between">
                  <span>Source:</span>
                  <span className="text-[#0284C7] font-medium">{formData.referralSource}</span>
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

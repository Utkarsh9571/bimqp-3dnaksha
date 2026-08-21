import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, MessageSquare, Layers } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Immersive VR Services'
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Residential Architecture',
    selectedServices: [defaultService],
    scopeDetails: '',
    hasDrawings: 'Yes, 2D/3D Drawings'
  });

  if (!isOpen) return null;

  const projectTypes = [
    'Residential Architecture',
    'Commercial Office & Retail',
    'Residential Development',
    'Interior Space & Styling',
    'Masterplan & Campus',
    'Other Architectural Project'
  ];

  const serviceOptions = [
    'Home Design',
    'Interior Design',
    'BIM Modelling',
    'Immersive VR Services',
    'Construction Project Management'
  ];

  const toggleService = (srv: string) => {
    if (formData.selectedServices.includes(srv)) {
      if (formData.selectedServices.length > 1) {
        setFormData({
          ...formData,
          selectedServices: formData.selectedServices.filter((s) => s !== srv)
        });
      }
    } else {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, srv]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
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
            <div className="mb-6">
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
                Share your architectural, interior, or BIM visualization requirements with our team.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Rajesh Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                    Email Address *
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                    Phone / Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                    Organization / Studio (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Design Practice / Self"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#9A6A38] transition-colors"
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Services of Interest (Select All That Apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceOptions.map((srv) => {
                    const isChecked = formData.selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`text-left text-xs px-3 py-2 rounded-sm border transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-amber-50 border-[#9A6A38] text-[#9A6A38] font-semibold'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span>{srv}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Current Drawing & Documentation Status
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['2D/3D Drawings', 'PDF / Concept Sketches', 'Concept Stage'].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, hasDrawings: opt })}
                      className={`p-2 rounded-sm border text-center font-mono-tech transition-all cursor-pointer ${
                        formData.hasDrawings === opt
                          ? 'bg-blue-50 border-[#0284C7] text-[#0284C7] font-semibold'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-700 font-semibold mb-1.5 uppercase">
                  Project Details & Scope Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding the building type, spatial goals, areas of focus, or intended presentation format."
                  value={formData.scopeDetails}
                  onChange={(e) => setFormData({ ...formData, scopeDetails: e.target.value })}
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-sm px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#9A6A38] transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] hover:from-[#E2B689] hover:to-[#F4D06F] text-[#08090B] font-display font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Submit Project Inquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] font-mono-tech text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
                  Direct Project Discussion
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
                  BIMQP Ecosystem Pipeline
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
              Thank you, <strong className="text-[#0A0A0A]">{formData.name}</strong>. Our architectural visualization team will review your project parameters and connect with you at <strong className="text-[#0A0A0A]">{formData.email}</strong>.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 text-left max-w-md mx-auto mb-6 text-xs space-y-1.5 font-mono-tech text-gray-600">
              <div className="flex justify-between">
                <span>Project Type:</span>
                <span className="text-[#0A0A0A] font-medium">{formData.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span>Services:</span>
                <span className="text-[#9A6A38] font-bold">{formData.selectedServices.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Ecosystem Support:</span>
                <span className="text-[#0284C7] font-medium">BIMQP Ecosystem Integration</span>
              </div>
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

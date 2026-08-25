import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import type { DetailedServiceData } from '../../types';

interface ServiceFAQProps {
  service: DetailedServiceData;
}

export const ServiceFAQ: React.FC<ServiceFAQProps> = ({ service }) => {
  const [openId, setOpenId] = useState<string | null>(
    service.faqs.length > 0 ? service.faqs[0].id : null
  );

  if (!service.faqs || service.faqs.length === 0) return null;

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50/70 border-b border-gray-200 text-brand-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="font-mono-tech text-xs text-accent-bronze uppercase font-bold tracking-widest mb-1 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-accent-amber" />
            <span>08 // FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            {service.title} Inquiries
          </h2>
          <p className="text-sm text-gray-600 mt-2 font-normal">
            Direct answers regarding project inputs, technical workflows, and deliverable standards.
          </p>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-md border border-gray-200 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

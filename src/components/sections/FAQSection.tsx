import React, { useState, useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { FAQ_ITEMS } from '../../data/content';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface FAQSectionProps {
  onOpenConsultation: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);
  const [activeTab, setActiveTab] = useState<string>('all');

  const toggleFAQ = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs =
    activeTab === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="09"
          badgeText="Information & Clarifications"
          badgeVariant="amber"
          title="Frequently Answered"
          highlightText="Questions."
          subtitle="Clear answers on deliverables, viewing formats, review workflows, and our BIMQP ecosystem partnership."
          align="center"
        />

        {/* Category Pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-10 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
          }}
        >
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'vr', label: 'Virtual Reality (VR)' },
            { id: 'deliverables', label: 'Deliverables & Formats' },
            { id: 'bimqp', label: 'BIMQP Ecosystem' },
            { id: 'process', label: 'Process & Workflow' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-mono-tech transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#D4A373] text-[#08090B] font-bold shadow-xs'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div
          className="space-y-3 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}
        >
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-md border transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-[#9A6A38] shadow-sm'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-[#0A0A0A] text-base sm:text-lg leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-xs bg-gray-100 border border-gray-200 flex items-center justify-center text-[#9A6A38] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-amber-50' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#4B5563] leading-relaxed border-t border-gray-100 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Contact Strip */}
        <div className="mt-12 text-center p-6 rounded-md bg-gray-100 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-[#0A0A0A] text-sm font-semibold">
              Have a specific question about your upcoming project?
            </div>
            <div className="text-xs text-gray-600">
              Our team is available to discuss your visualization requirements.
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-sm bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 font-mono-tech text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-2xs"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { FAQ_ITEMS } from '../../data/content';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  onOpenConsultation: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
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
    <section id="faq" className="py-24 bg-[#0E1013] relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="08"
          badgeText="Information & Clarifications"
          badgeVariant="blue"
          title="Frequently Answered"
          highlightText="Questions."
          subtitle="Clear answers on deliverables, viewing formats, review workflows, and our BIMQP ecosystem partnership."
          align="center"
        />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
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
                  ? 'bg-[#D4A373] text-[#08090B] font-bold shadow-sm'
                  : 'bg-[#14171D] text-[#8A92A0] hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-md border transition-all ${
                  isOpen
                    ? 'bg-[#14171D] border-[#D4A373]/50 shadow-md'
                    : 'bg-[#08090B] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-white text-base sm:text-lg leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-[#D4A373] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#D4A373]/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#8A92A0] leading-relaxed border-t border-white/5 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Contact Strip */}
        <div className="mt-12 text-center p-6 rounded-md bg-[#08090B] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-white text-sm font-semibold">
              Have a specific question about your upcoming project?
            </div>
            <div className="text-xs text-[#8A92A0]">
              Our team is available to discuss your visualization requirements.
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono-tech text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

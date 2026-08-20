import React from 'react';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/content';
import { smoothScrollTo } from '../../lib/animations';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <footer className="bg-[#F0EFEA] border-t border-gray-300 text-[#4B5563] pt-16 pb-12 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-300">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(0);
              }}
              className="inline-block group cursor-pointer focus:outline-hidden"
              aria-label="3D Naksha Homepage"
            >
              <img
                src="/logo-up.jpeg"
                alt="3D Naksha Logo"
                className="h-12 sm:h-14 md:h-16 w-auto max-w-[260px] object-contain rounded-lg transition-transform group-hover:scale-[1.03] duration-300 shadow-2xs"
              />
            </a>

            <p className="text-sm text-[#4B5563] leading-relaxed max-w-sm">
              Architectural visualization, 3D BIM modeling, and immersive VR services. Helping stakeholders experience spaces, evaluate designs, and make confident construction decisions before breaking ground.
            </p>

            {/* BIMQP Tag */}
            <div className="p-3 rounded-sm bg-white border border-gray-200 shadow-2xs max-w-sm">
              <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                <span className="text-[#0A0A0A] font-bold">BIMQP Ecosystem</span>
                <span className="text-[#059669] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
                  Ecosystem Brand
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Connected with the BIMQP ecosystem for integrated BIM modeling and architectural visualization workflows.
              </p>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display text-[#0A0A0A] font-bold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); smoothScrollTo('#about', { offset: -70 }); }} className="hover:text-black transition-colors">
                  About Us (Experience Unbuilt)
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); smoothScrollTo('#services', { offset: -70 }); }} className="hover:text-black transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#clients" onClick={(e) => { e.preventDefault(); smoothScrollTo('#clients', { offset: -70 }); }} className="hover:text-black transition-colors">
                  Our Clients
                </a>
              </li>
              <li>
                <a href="#mission" onClick={(e) => { e.preventDefault(); smoothScrollTo('#mission', { offset: -70 }); }} className="hover:text-black transition-colors">
                  Our Mission (AEC Lifecycle)
                </a>
              </li>
              <li>
                <a href="#vr-centerpiece" onClick={(e) => { e.preventDefault(); smoothScrollTo('#vr-centerpiece', { offset: -70 }); }} className="hover:text-[#9A6A38] text-[#9A6A38] font-semibold transition-colors">
                  Immersive VR Services
                </a>
              </li>
              <li>
                <a href="#showcase" onClick={(e) => { e.preventDefault(); smoothScrollTo('#showcase', { offset: -70 }); }} className="hover:text-black transition-colors">
                  Selected Visualizations
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); smoothScrollTo('#faq', { offset: -70 }); }} className="hover:text-black transition-colors">
                  Technical FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-display text-[#0A0A0A] font-bold text-sm tracking-wider uppercase mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li>Home Design</li>
              <li>Interior Design</li>
              <li>BIM Modelling</li>
              <li>Immersive VR Services</li>
              <li>Construction Project Management</li>
              <li>3D Spatial Walkthroughs</li>
              <li>Material & Lighting Studies</li>
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div>
            <h4 className="font-display text-[#0A0A0A] font-bold text-sm tracking-wider uppercase mb-4">
              Inquiry
            </h4>
            <div className="space-y-3 text-xs font-mono-tech">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9A6A38] shrink-0 mt-0.5" />
                <span className="text-[#0A0A0A] font-medium">{BRAND_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                <span className="leading-snug">IT- 9(A), EPIP, IT Park Rd<br/>Sitapura, Jaipur, RJ 302022</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 px-3 rounded-sm bg-white hover:bg-gray-100 border border-gray-300 text-[#0A0A0A] font-mono-tech text-xs font-semibold tracking-wider text-center transition-all cursor-pointer shadow-2xs"
                >
                  Discuss Project Scope
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-4 text-gray-500">
            <span>© {new Date().getFullYear()} 3D Naksha. All rights reserved.</span>
            <span>•</span>
            <span>A BIMQP Ecosystem Brand</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-gray-500">3dnaksha.com</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-gray-600 hover:text-black font-semibold transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

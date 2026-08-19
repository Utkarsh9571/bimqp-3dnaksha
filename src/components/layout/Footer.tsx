import React from 'react';
import { ArrowUp, Mail, MapPin, Box } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/content';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050607] border-t border-white/10 text-[#8A92A0] pt-16 pb-12 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#14171D] border border-[#D4A373]/50 flex items-center justify-center text-[#D4A373]">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl text-white">3D Naksha</span>
            </div>

            <p className="text-sm text-[#8A92A0] leading-relaxed max-w-sm">
              Architectural visualization, 3D BIM modeling, and immersive VR services. Helping stakeholders experience spaces, evaluate designs, and make confident construction decisions before breaking ground.
            </p>

            {/* BIMQP Tag */}
            <div className="p-3 rounded-sm bg-[#0E1013] border border-white/10 max-w-sm">
              <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                <span className="text-white font-semibold">BIMQP Ecosystem</span>
                <span className="text-[#10B981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  Ecosystem Brand
                </span>
              </div>
              <p className="text-[11px] text-[#5A6270]">
                Connected with the BIMQP ecosystem for integrated BIM modeling and architectural visualization workflows.
              </p>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Experience The Unbuilt
                </a>
              </li>
              <li>
                <a href="#lifecycle" className="hover:text-white transition-colors">
                  Design → Model → Build
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services Spectrum
                </a>
              </li>
              <li>
                <a href="#vr-centerpiece" className="hover:text-[#E5A93B] text-[#D4A373] transition-colors">
                  Immersive VR Services
                </a>
              </li>
              <li>
                <a href="#audience" className="hover:text-white transition-colors">
                  Who We Work With
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  Selected Visualizations
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Technical FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-display text-white font-semibold text-sm tracking-wider uppercase mb-4">
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
            <h4 className="font-display text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Inquiry
            </h4>
            <div className="space-y-3 text-xs font-mono-tech">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4A373] shrink-0 mt-0.5" />
                <span className="text-white">{BRAND_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>3dnaksha.com</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 px-3 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono-tech text-xs tracking-wider text-center transition-all cursor-pointer"
                >
                  Discuss Project Scope
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-4 text-[#5A6270]">
            <span>© {new Date().getFullYear()} 3D Naksha. All rights reserved.</span>
            <span>•</span>
            <span>A BIMQP Ecosystem Brand</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#5A6270]">3dnaksha.com</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#8A92A0] hover:text-white transition-colors"
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

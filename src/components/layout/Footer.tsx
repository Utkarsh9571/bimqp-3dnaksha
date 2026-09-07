import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, MapPin, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/content';
import { smoothScrollTo } from '../../lib/animations';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const location = useLocation();
  const [activeLocation, setActiveLocation] = React.useState<'singapore' | 'jaipur'>('singapore');

  const locations = {
    singapore: {
      name: 'Headquarters (Singapore)',
      city: 'Singapore',
      address: '390 Victoria Street, Singapore - 188061',
      mapUrl: 'https://maps.google.com/maps?q=390%20Victoria%20Street,%20Singapore%20188061&t=&z=15&ie=UTF8&iwloc=&output=embed',
      googleMapsLink: 'https://maps.google.com/?q=390+Victoria+Street,+Singapore+188061'
    },
    jaipur: {
      name: 'Regional Office (Jaipur)',
      city: 'Jaipur, India',
      address: 'IT- 9(A), EPIP, IT Park Rd, Sitapura, Jaipur, RJ 302022',
      mapUrl: 'https://maps.google.com/maps?q=IT-9(A),%20EPIP,%20IT%20Park%20Rd,%20Sitapura,%20Jaipur,%20Rajasthan%20302022&t=&z=14&ie=UTF8&iwloc=&output=embed',
      googleMapsLink: 'https://maps.google.com/?q=IT-9(A),+EPIP,+IT+Park+Rd,+Sitapura,+Jaipur,+Rajasthan+302022'
    }
  };

  const footerLinkClass = "text-gray-600 hover:text-brand-primary hover:underline underline-offset-4 transition-colors cursor-pointer";

  return (
    <footer className="bg-brand-subtle border-t border-gray-300 text-brand-muted pt-16 pb-12 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-bronze/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-300">
          
          {/* =========================================================
              COL 1: Brand Info & Capabilities (lg:col-span-3)
             ========================================================= */}
          <div className="lg:col-span-3 space-y-6">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  smoothScrollTo(0);
                }
              }}
              className="inline-block group cursor-pointer focus:outline-hidden"
              aria-label="3D Naksha Homepage"
            >
              <img
                src="/logo-side.jpeg"
                alt="3D Naksha Logo"
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain transition-transform group-hover:scale-[1.02] duration-300 rounded-xl"
              />
            </Link>

            <p className="text-xs text-brand-muted leading-relaxed">
              Architectural visualization, 3D BIM modeling, and 1:1 scale immersive VR walkthroughs from the Singapore BIMQP ecosystem.
            </p>

            {/* Core Capabilities */}
            <div className="space-y-3 pt-2">
              <h4 className="font-display text-brand-primary font-bold text-xs tracking-wider uppercase">
                Core Capabilities
              </h4>
              <ul className="space-y-1.5 text-xs font-mono-tech">
                <li>
                  <Link to="/services/home-design" className={footerLinkClass}>
                    • Residential Home Design
                  </Link>
                </li>
                <li>
                  <Link to="/services/interior-design" className={footerLinkClass}>
                    • Interior Spatial Planning
                  </Link>
                </li>
                <li>
                  <Link to="/services/bim-modelling" className={footerLinkClass}>
                    • 3D BIM Engineering
                  </Link>
                </li>
                <li>
                  <Link to="/services/immersive-vr" className={footerLinkClass}>
                    • 1:1 Immersive VR Walkthroughs
                  </Link>
                </li>
                <li>
                  <Link to="/services/construction-project-management" className={footerLinkClass}>
                    • Pre-Construction Field Alignment
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* =========================================================
              COL 2: Inquiry, Working Hours & Offices (lg:col-span-4)
             ========================================================= */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase">
              Inquiry & Offices
            </h4>

            {/* Email & Contact Row */}
            <div className="p-3 rounded-lg bg-white border border-gray-200/90 shadow-2xs space-y-1.5 font-mono-tech text-xs">
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider block">Direct Project Contact</span>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-bronze shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.email}`} className="text-brand-primary font-bold hover:text-accent-bronze transition-colors">
                  {BRAND_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Working Hours Banner */}
            <div className="p-3.5 rounded-lg bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 border border-amber-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-amber shrink-0" />
                <span className="font-display font-bold text-xs text-brand-primary uppercase tracking-wider">Working Hours</span>
              </div>
              <div className="flex items-baseline justify-between pt-1 font-mono-tech text-xs">
                <span className="text-gray-700 font-medium">Monday – Saturday</span>
                <span className="text-accent-bronze font-bold">7:00 AM – 5:00 PM</span>
              </div>
            </div>

            {/* Office Locations Toggle List */}
            <div className="space-y-2 font-mono-tech text-xs">
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider block">Select Office Location</span>
              
              {/* Headquarters Link */}
              <button
                type="button"
                onClick={() => setActiveLocation('singapore')}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  activeLocation === 'singapore'
                    ? 'border-accent-blue bg-white shadow-xs ring-1 ring-accent-blue/30'
                    : 'border-gray-200/80 bg-white/50 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${activeLocation === 'singapore' ? 'text-accent-blue' : 'text-gray-400'}`} />
                  <div className="leading-snug">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-primary text-xs">Headquarters (Singapore)</span>
                      {activeLocation === 'singapore' && (
                        <span className="text-[10px] bg-blue-50 text-accent-blue font-bold px-1.5 py-0.5 rounded-xs">Active</span>
                      )}
                    </div>
                    <span className="text-gray-600 block text-[11px] mt-0.5">390 Victoria Street, Singapore - 188061</span>
                  </div>
                </div>
              </button>

              {/* Regional Office Link */}
              <button
                type="button"
                onClick={() => setActiveLocation('jaipur')}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  activeLocation === 'jaipur'
                    ? 'border-accent-blue bg-white shadow-xs ring-1 ring-accent-blue/30'
                    : 'border-gray-200/80 bg-white/50 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${activeLocation === 'jaipur' ? 'text-accent-blue' : 'text-gray-400'}`} />
                  <div className="leading-snug">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-primary text-xs">Regional Office (Jaipur)</span>
                      {activeLocation === 'jaipur' && (
                        <span className="text-[10px] bg-blue-50 text-accent-blue font-bold px-1.5 py-0.5 rounded-xs">Active</span>
                      )}
                    </div>
                    <span className="text-gray-600 block text-[11px] mt-0.5">IT- 9(A), EPIP, IT Park Rd, Sitapura, Jaipur, RJ 302022</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* =========================================================
              COL 3: Expanded Interactive Location Map (lg:col-span-5)
             ========================================================= */}
          <div className="lg:col-span-5 space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase">
                  Global Location Map
                </h4>
                <p className="text-[11px] font-mono-tech text-gray-500">
                  {locations[activeLocation].name}
                </p>
              </div>

              {/* Location Switcher Tabs */}
              <div className="flex items-center gap-1 bg-gray-200/70 p-1 rounded-md">
                <button
                  onClick={() => setActiveLocation('singapore')}
                  className={`px-2.5 py-1 text-[11px] font-mono-tech font-bold rounded-sm transition-all cursor-pointer ${
                    activeLocation === 'singapore'
                      ? 'bg-white text-accent-blue shadow-xs'
                      : 'text-gray-600 hover:text-brand-primary'
                  }`}
                >
                  Singapore
                </button>
                <button
                  onClick={() => setActiveLocation('jaipur')}
                  className={`px-2.5 py-1 text-[11px] font-mono-tech font-bold rounded-sm transition-all cursor-pointer ${
                    activeLocation === 'jaipur'
                      ? 'bg-white text-accent-blue shadow-xs'
                      : 'text-gray-600 hover:text-brand-primary'
                  }`}
                >
                  Jaipur
                </button>
              </div>
            </div>

            {/* EXPANDED MAP FRAME (h-72 = 288px tall) */}
            <div className="relative w-full h-72 rounded-xl border border-gray-300 overflow-hidden group shadow-sm hover:border-accent-blue transition-all bg-gray-100 flex-grow">
              <iframe
                key={activeLocation}
                title={`${locations[activeLocation].name} Location Map`}
                src={locations[activeLocation].mapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                aria-hidden="false"
              />

              {/* Top Gradient Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md border border-gray-200 shadow-2xs flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-mono-tech text-brand-primary font-bold">
                  {locations[activeLocation].city}
                </span>
              </div>

              {/* Bottom Direct Map Link Action */}
              <a
                href={locations[activeLocation].googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-brand-primary/95 text-white backdrop-blur-md border border-white/20 text-[11px] font-mono-tech font-medium hover:bg-accent-bronze flex items-center gap-1.5 shadow-md transition-all cursor-pointer group/btn"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Address bar under map */}
            <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs flex items-center gap-2 text-xs font-mono-tech text-gray-700">
              <MapPin className="w-4 h-4 text-accent-bronze shrink-0" />
              <span className="truncate">{locations[activeLocation].address}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Ecosystem Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-gray-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-amber shrink-0" />
            <span>© {new Date().getFullYear()} 3D Naksha. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>A Brand of Singapore BIMQP Ecosystem</span>
            <span>•</span>
            <Link to="/services/immersive-vr" className="hover:text-brand-primary transition-colors">
              Virtual Reality Review
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

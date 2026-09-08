import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, MapPin } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/content';
import { smoothScrollTo } from '../../lib/animations';
import { submitNewsletterToHubSpot } from '../../config/forms';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const location = useLocation();
  const [activeLocation, setActiveLocation] = useState<'singapore' | 'jaipur'>('jaipur');

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus(null);

    const cleanEmail = newsletterEmail.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setNewsletterStatus({ success: false, message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmittingNewsletter(true);
    const res = await submitNewsletterToHubSpot(cleanEmail);
    setIsSubmittingNewsletter(false);

    if (res.success) {
      setNewsletterStatus({ success: true, message: 'Subscribed successfully!' });
      setNewsletterEmail('');
    } else {
      setNewsletterStatus({ success: false, message: res.message || 'Failed to subscribe. Please try again.' });
    }
  };

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
    <footer className="bg-brand-subtle border-t border-gray-300 text-brand-muted pt-14 pb-10 relative overflow-hidden">
      {/* Subtle Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* MAIN FOOTER — 4 COLUMN STRUCTURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-gray-300">
          
          {/* COLUMN 1 — 3D NAKSHA / BRAND & NEWSLETTER (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <Link
                to="/"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    smoothScrollTo(0);
                  }
                }}
                className="inline-block group cursor-pointer"
                aria-label="3D Naksha Homepage"
              >
                <img
                  src="/logo-side.jpeg"
                  alt="3D Naksha Logo"
                  className="h-15 sm:h-16 w-auto max-w-[220px] object-contain transition-transform group-hover:scale-[1.02] duration-300 rounded-xl"
                />
              </Link>

              <p className="text-xs text-brand-muted leading-relaxed font-sans">
                Architectural visualization, 3D BIM modeling, and immersive VR solutions, powered by the Singapore BIMQP ecosystem.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="pt-4 border-t border-gray-200/80 space-y-2.5">
              <div className="space-y-1">
                <h5 className="font-display font-bold text-xs tracking-wider uppercase text-brand-primary">
                  STAY UPDATED
                </h5>
                <p className="text-[11px] text-brand-muted leading-relaxed font-sans">
                  Subscribe to receive the latest updates and insights from 3D Naksha.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono-tech bg-white border border-gray-300 rounded-sm text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-bronze transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNewsletter}
                    className="px-4 py-2 bg-gradient-to-r from-accent-bronze-light to-accent-amber-gold hover:from-[#E2B689] hover:to-accent-amber-bright text-[#08090B] font-display font-bold text-xs tracking-wider uppercase rounded-sm transition-all shadow-2xs shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingNewsletter ? 'Subscribing...' : 'SUBSCRIBE'}
                  </button>
                </div>
                {newsletterStatus && (
                  <p className={`text-[11px] font-mono-tech ${newsletterStatus.success ? 'text-emerald-600 font-semibold' : 'text-rose-600'}`}>
                    {newsletterStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* COLUMN 2 — SERVICES (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech">
              <li>
                <Link to="/services/bim-modelling" className={footerLinkClass}>
                  3D BIM Modeling
                </Link>
              </li>
              <li>
                <Link to="/services/home-design" className={footerLinkClass}>
                  Architectural Visualization
                </Link>
              </li>
              <li>
                <Link to="/services/interior-design" className={footerLinkClass}>
                  3D Rendering
                </Link>
              </li>
              <li>
                <Link to="/services/immersive-vr" className={footerLinkClass}>
                  VR Walkthroughs
                </Link>
              </li>
              <li>
                <Link to="/services/interior-design" className={footerLinkClass}>
                  Interior Spatial Planning
                </Link>
              </li>
              <li>
                <Link to="/services/bim-modelling" className={footerLinkClass}>
                  BIM Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — CONTACT (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase">
              CONTACT
            </h4>
            <div className="space-y-3 text-xs font-mono-tech">
              <div>
                <span className="font-bold text-brand-primary block text-[11px] uppercase tracking-wider">HEADQUARTERS (SINGAPORE)</span>
                <span className="text-gray-600 block leading-snug mt-0.5">
                  390 Victoria Street,<br />Singapore - 188061
                </span>
              </div>
              <div>
                <span className="font-bold text-brand-primary block text-[11px] uppercase tracking-wider">REGIONAL OFFICE (JAIPUR)</span>
                <span className="text-gray-600 block leading-snug mt-0.5">
                  IT- 9(A), EPIP, IT Park Rd,<br />Sitapura, Jaipur, RJ 302022
                </span>
              </div>
              <div>
                <span className="font-bold text-brand-primary block text-[11px] uppercase tracking-wider">EMAIL</span>
                <a href={`mailto:${BRAND_CONFIG.email}`} className="text-accent-bronze hover:underline font-medium transition-colors block mt-0.5">
                  {BRAND_CONFIG.email}
                </a>
              </div>
              <div>
                <span className="font-bold text-brand-primary block text-[11px] uppercase tracking-wider">WORKING HOURS</span>
                <span className="text-gray-600 block leading-snug mt-0.5">
                  Monday – Saturday: 7:00 AM – 5:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN 4 — OUR LOCATION (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase">
                OUR LOCATION
              </h4>

              {/* Location Switcher Tabs */}
              <div className="flex items-center gap-1 bg-gray-200/70 p-0.5 rounded-sm">
                <button
                  type="button"
                  onClick={() => setActiveLocation('singapore')}
                  className={`px-2 py-0.5 text-[10px] font-mono-tech font-bold rounded-xs transition-all cursor-pointer ${
                    activeLocation === 'singapore'
                      ? 'bg-white text-accent-blue shadow-2xs'
                      : 'text-gray-600 hover:text-brand-primary'
                  }`}
                >
                  Singapore
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocation('jaipur')}
                  className={`px-2 py-0.5 text-[10px] font-mono-tech font-bold rounded-xs transition-all cursor-pointer ${
                    activeLocation === 'jaipur'
                      ? 'bg-white text-accent-blue shadow-2xs'
                      : 'text-gray-600 hover:text-brand-primary'
                  }`}
                >
                  Jaipur
                </button>
              </div>
            </div>

            {/* Compact Map Frame */}
            <div className="relative w-full h-40 rounded-md border border-gray-300 overflow-hidden group shadow-2xs hover:border-accent-blue transition-colors bg-gray-100">
              <iframe
                key={activeLocation}
                title={`${locations[activeLocation].name} Location Map`}
                src={locations[activeLocation].mapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                aria-hidden="false"
              />

              <a
                href={locations[activeLocation].googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 px-2 py-1 rounded-xs bg-white/95 backdrop-blur-xs border border-gray-200 text-[10px] font-mono-tech text-gray-700 hover:text-accent-blue flex items-center gap-1 shadow-2xs transition-colors"
              >
                <span>Open Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-gray-600 truncate">
              <MapPin className="w-3 h-3 text-accent-bronze shrink-0" />
              <span className="truncate">{locations[activeLocation].address}</span>
            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-gray-500">
          <div className="flex items-center gap-2">
            <span>© 2026 3D Naksha. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span>A Brand of Singapore BIMQP Ecosystem</span>
            <span>•</span>
            <Link to="/services/immersive-vr" className="text-gray-500 hover:text-brand-primary transition-colors text-[11px]">
              Virtual Reality Review
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

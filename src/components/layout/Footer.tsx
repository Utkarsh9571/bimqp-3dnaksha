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
          
          {/* COLUMN 1 — 3D NAKSHA / BRAND (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
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

            <p className="text-xs text-brand-muted leading-relaxed font-sans max-w-sm">
              Architectural visualization, 3D BIM modeling, and immersive VR solutions, powered by the Singapore BIMQP ecosystem.
            </p>

            {/* Official Social Media Buttons */}
            <div className="pt-1 flex items-center gap-2.5">
              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-md bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-md bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all duration-300 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-md bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-md bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300 shadow-2xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2 — QUICK LINKS (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech">
              <li>
                <a
                  href="/#about"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      smoothScrollTo('#about', { offset: -70 });
                    }
                  }}
                  className={footerLinkClass}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      smoothScrollTo('#services', { offset: -70 });
                    }
                  }}
                  className={footerLinkClass}
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/#mission"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      smoothScrollTo('#mission', { offset: -70 });
                    }
                  }}
                  className={footerLinkClass}
                >
                  Our Mission
                </a>
              </li>
              <li>
                <a
                  href="/#clients"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      smoothScrollTo('#clients', { offset: -70 });
                    }
                  }}
                  className={footerLinkClass}
                >
                  Our Clients
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      smoothScrollTo('#faq', { offset: -70 });
                    }
                  }}
                  className={footerLinkClass}
                >
                  FAQ
                </a>
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

          {/* COLUMN 4 — STAY UPDATED / NEWSLETTER (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase">
              STAY UPDATED
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed font-sans">
              Subscribe to receive the latest updates and insights from 3D Naksha.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
              <div className="flex flex-col gap-2">
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
                  className="w-full px-4 py-2 bg-gradient-to-r from-accent-bronze-light to-accent-amber-gold hover:from-[#E2B689] hover:to-accent-amber-bright text-[#08090B] font-display font-bold text-xs tracking-wider uppercase rounded-sm transition-all shadow-2xs cursor-pointer disabled:opacity-50"
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

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono-tech text-gray-500">
          <div className="flex items-center gap-2">
            <span>© 2026 3D Naksha. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

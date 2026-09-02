import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/content';
import { smoothScrollTo } from '../../lib/animations';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleExploreClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    smoothScrollTo(href, { offset: -70 });
  };

  const footerLinkClass = "text-gray-600 hover:text-brand-primary hover:underline underline-offset-4 transition-colors cursor-pointer";

  return (
    <footer className="bg-brand-subtle border-t border-gray-300 text-brand-muted pt-16 pb-12 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-300">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
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
                className="h-11 sm:h-13 w-auto max-w-[260px] object-contain transition-transform group-hover:scale-[1.02] duration-300 rounded-xl"
              />
            </Link>

            <p className="text-sm text-brand-muted leading-relaxed max-w-sm">
              Architectural visualization, 3D BIM modeling, and immersive VR services. Helping stakeholders experience spaces, evaluate designs, and make confident construction decisions before breaking ground.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li>
                <a href="#about" onClick={(e) => handleExploreClick(e, '#about')} className={footerLinkClass}>
                  About Us (Experience Unbuilt)
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleExploreClick(e, '#services')} className={footerLinkClass}>
                  Our Services
                </a>
              </li>
              <li>
                <a href="#clients" onClick={(e) => handleExploreClick(e, '#clients')} className={footerLinkClass}>
                  Our Clients
                </a>
              </li>
              <li>
                <a href="#mission" onClick={(e) => handleExploreClick(e, '#mission')} className={footerLinkClass}>
                  Our Mission (AEC Lifecycle)
                </a>
              </li>
              <li>
                <a href="#vr-centerpiece" onClick={(e) => handleExploreClick(e, '#vr-centerpiece')} className={footerLinkClass}>
                  Immersive VR Services
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={(e) => handleExploreClick(e, '#portfolio')} className={footerLinkClass}>
                  Selected Visualizations
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleExploreClick(e, '#faq')} className={footerLinkClass}>
                  Technical FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li>
                <Link to="/services/home-design" className={footerLinkClass}>
                  Home Design
                </Link>
              </li>
              <li>
                <Link to="/services/interior-design" className={footerLinkClass}>
                  Interior Design
                </Link>
              </li>
              <li>
                <Link to="/services/bim-modelling" className={footerLinkClass}>
                  BIM Modelling
                </Link>
              </li>
              <li>
                <Link to="/services/immersive-vr" className={footerLinkClass}>
                  Immersive VR Services
                </Link>
              </li>
              <li>
                <Link to="/services/construction-project-management" className={footerLinkClass}>
                  Construction Project Management
                </Link>
              </li>
              <li>
                <Link to="/services/immersive-vr" className={footerLinkClass}>
                  3D Spatial Walkthroughs
                </Link>
              </li>
              <li>
                <Link to="/services/interior-design" className={footerLinkClass}>
                  Material & Lighting Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div>
            <h4 className="font-display text-brand-primary font-bold text-sm tracking-wider uppercase mb-4">
              Inquiry
            </h4>
            <div className="space-y-3 text-xs font-mono-tech">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-bronze shrink-0 mt-0.5" />
                <span className="text-brand-primary font-medium">{BRAND_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                <span className="leading-snug">IT- 9(A), EPIP, IT Park Rd<br/>Sitapura, Jaipur, RJ 302022</span>
              </div>
              
              {/* Compact Website-Themed Google Map Embed */}
              <div className="pt-2">
                <div className="relative w-full h-32 rounded-sm border border-gray-300 overflow-hidden group shadow-2xs hover:border-accent-blue transition-colors">
                  <iframe
                    title="3D Naksha Jaipur Office Location Map"
                    src="https://maps.google.com/maps?q=IT-9(A),%20EPIP,%20IT%20Park%20Rd,%20Sitapura,%20Jaipur,%20Rajasthan%20302022&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    aria-hidden="false"
                  />
                  <a
                    href="https://maps.google.com/?q=IT-9(A),+EPIP,+IT+Park+Rd,+Sitapura,+Jaipur,+Rajasthan+302022"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-xs bg-white/90 backdrop-blur-xs border border-gray-200 text-[10px] font-mono-tech text-gray-700 hover:text-accent-blue flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-4 text-gray-500">
            <span>© {new Date().getFullYear()} 3D Naksha. All rights reserved.</span>
            <span>•</span>
            <span>A BIMQP Ecosystem Brand</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

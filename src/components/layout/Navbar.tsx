import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Lifecycle', href: '#lifecycle' },
    { label: 'Services', href: '#services' },
    { label: 'Immersive VR', href: '#vr-centerpiece', isSpecial: true },
    { label: 'Who We Work With', href: '#audience' },
    { label: 'Process', href: '#process' },
    { label: 'Visualizations', href: '#showcase' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
            : 'bg-transparent border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & BIMQP Endorsement */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="#"
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label="3D Naksha Homepage"
            >
              {/* Architectural Vector Cube Logo */}
              <div className="w-9 h-9 rounded-sm bg-[#14171D] border border-[#D4A373]/40 flex items-center justify-center text-[#D4A373] group-hover:border-[#D4A373] transition-colors relative overflow-hidden">
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110 duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#D4A373"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#E5A93B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#38BDF8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-[#D4A373] transition-colors">
                    3D Naksha
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[#8A92A0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span>BIMQP Ecosystem</span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3 py-1.5 text-xs font-mono-tech transition-colors rounded-sm ${
                  link.isSpecial
                    ? 'text-[#E5A93B] bg-[#E5A93B]/10 hover:bg-[#E5A93B]/20 border border-[#E5A93B]/30'
                    : 'text-[#8A92A0] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Consultation CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase hover:from-[#E2B689] hover:to-[#F4D06F] transition-all shadow-md cursor-pointer group"
            >
              <span>Discuss Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#8A92A0] hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-[#08090B]/98 backdrop-blur-xl border-t border-white/10 lg:hidden overflow-y-auto p-6 animate-fadeIn">
          <div className="flex flex-col gap-2 max-w-md mx-auto">
            <div className="p-3 mb-2 rounded-sm bg-[#14171D] border border-white/10 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#8A92A0]">Focus</span>
              <span className="flex items-center gap-1.5 text-xs text-[#10B981] font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                Architectural Visualization & VR
              </span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`flex items-center justify-between p-3 rounded-sm border transition-all text-sm font-mono-tech ${
                  link.isSpecial
                    ? 'bg-[#E5A93B]/10 border-[#E5A93B]/40 text-[#E5A93B]'
                    : 'bg-[#0E1013] border-white/5 text-[#F3F4F6] hover:border-[#D4A373]/40'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 px-4 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-sm tracking-wider uppercase text-center shadow-lg cursor-pointer"
              >
                Discuss Your Project Scope
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

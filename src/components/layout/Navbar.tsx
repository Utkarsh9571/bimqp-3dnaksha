import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion, smoothScrollTo } from '../../lib/animations';

interface NavbarProps {
  onOpenConsultation: () => void;
}

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Our Services', href: '#services', id: 'services' },
  { label: 'Our Clients', href: '#clients', id: 'clients' },
  { label: 'Our Mission', href: '#mission', id: 'mission' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');

  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const isNavigatingRef = useRef<boolean>(false);

  // Function to smoothly animate the underline to the active link position
  const updateUnderlinePosition = useCallback((targetId: string, immediate = false) => {
    const nav = navRef.current;
    const underline = underlineRef.current;
    const targetLink = linkRefs.current.get(targetId);

    if (!nav || !underline || !targetLink) {
      if (underline) {
        gsap.to(underline, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      }
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();
    const targetX = linkRect.left - navRect.left;
    const targetWidth = linkRect.width;

    if (immediate || prefersReducedMotion()) {
      gsap.set(underline, {
        x: targetX,
        width: targetWidth,
        opacity: 1
      });
    } else {
      gsap.to(underline, {
        x: targetX,
        width: targetWidth,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }, []);

  // Update underline when active link changes
  useEffect(() => {
    updateUnderlinePosition(activeId);
  }, [activeId, updateUnderlinePosition]);

  // Re-adjust underline on window resize
  useEffect(() => {
    const handleResize = () => {
      updateUnderlinePosition(activeId, true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeId, updateUnderlinePosition]);

  // Header background scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollTrigger section in-view detection (set up once on mount)
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const setupTriggers = () => {
      NAV_ITEMS.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            if (!isNavigatingRef.current) setActiveId(item.id);
          },
          onEnterBack: () => {
            if (!isNavigatingRef.current) setActiveId(item.id);
          }
        });

        triggers.push(st);
      });

      // Initial position update after ScrollTrigger refresh
      ScrollTrigger.refresh();
      updateUnderlinePosition('about', true);
    };

    // Delay slightly to ensure lazy-loaded sections mount into DOM
    const timer = setTimeout(setupTriggers, 300);

    return () => {
      clearTimeout(timer);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [updateUnderlinePosition]);

  const handleNavClick = (href: string, id: string) => {
    setIsMobileMenuOpen(false);
    setActiveId(id);
    updateUnderlinePosition(id);

    // Lock scroll trigger updates while smooth scroll is traveling to target
    isNavigatingRef.current = true;

    smoothScrollTo(href, {
      offset: -70,
      onComplete: () => {
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);
      }
    });

    // Fallback release in case onComplete is delayed
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1200);
  };

  const registerLinkRef = (id: string, el: HTMLAnchorElement | null) => {
    if (el) {
      linkRefs.current.set(id, el);
    } else {
      linkRefs.current.delete(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-white/92 backdrop-blur-md border-b border-gray-200/90 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'bg-[#F8F7F5]/80 backdrop-blur-sm border-b border-gray-200/60 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Home Action */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  smoothScrollTo(0);
                  setActiveId('about');
                  window.history.pushState('', document.title, window.location.pathname + window.location.search);
                }
              }}
              className="flex items-center group cursor-pointer focus:outline-hidden"
              aria-label="3D Naksha Homepage"
            >
              <img
                src="/logo-up.jpeg"
                alt="3D Naksha Logo"
                className="h-11 sm:h-13 md:h-14 lg:h-16 w-auto max-w-[220px] sm:max-w-[270px] md:max-w-[320px] object-contain rounded-lg transition-transform group-hover:scale-[1.03] duration-300 shadow-2xs"
              />
            </a>
          </div>

          {/* Desktop Navigation Links with GSAP Animated Underline */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center relative py-1"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  ref={(el) => registerLinkRef(link.id, el)}
                  href={link.href}
                  data-nav-id={link.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.id);
                  }}
                  className={`px-4 py-2 text-xs font-mono-tech transition-colors relative z-10 ${isActive
                      ? 'text-[#0A0A0A] font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 rounded-sm'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* GSAP Animated Elastic Underline Indicator */}
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-[2px] rounded-full pointer-events-none opacity-0 left-0"
              style={{
                background: 'linear-gradient(90deg, #9A6A38 0%, #D97706 50%, #0284C7 100%)',
                boxShadow: '0 0 8px rgba(217, 119, 6, 0.4)'
              }}
              aria-hidden="true"
            />
          </nav>

          {/* Right Action: Consultation CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase hover:from-[#E2B689] hover:to-[#F4D06F] transition-all shadow-sm cursor-pointer group"
            >
              <span>Discuss Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-white/98 backdrop-blur-xl border-t border-gray-200 lg:hidden overflow-y-auto p-6 animate-fadeIn">
          <div className="flex flex-col gap-2 max-w-md mx-auto">
            <div className="p-3 mb-2 rounded-sm bg-gray-50 border border-gray-200 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-gray-600">Focus</span>
              <span className="flex items-center gap-1.5 text-xs text-[#059669] font-mono-tech font-medium">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                Architectural Visualization & VR
              </span>
            </div>

            {NAV_ITEMS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.id);
                  }}
                  className={`flex items-center justify-between p-3 rounded-sm border transition-all text-sm font-mono-tech ${isActive
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-amber-400'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                    )}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 px-4 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-sm tracking-wider uppercase text-center shadow-md cursor-pointer"
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

export default Navbar;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronRight, ChevronDown, Home, Armchair, Layers, Glasses, HardHat } from 'lucide-react';
import { gsap, prefersReducedMotion, smoothScrollTo, getLenis } from '../../lib/animations';
import { SERVICES } from '../../data/content';

interface NavbarProps {
  onOpenConsultation: () => void;
}

interface NavItem {
  label: string;
  href: string;
  id: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Our Services', href: '#services', id: 'services', hasDropdown: true },
  { label: 'Our Mission', href: '#mission', id: 'mission' },
  { label: 'Our Clients', href: '#clients', id: 'clients' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isServicesDropdownPinned, setIsServicesDropdownPinned] = useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');

  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const isNavigatingRef = useRef<boolean>(false);

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-4 h-4 text-amber-600" />,
    Armchair: <Armchair className="w-4 h-4 text-amber-600" />,
    Layers: <Layers className="w-4 h-4 text-amber-600" />,
    Glasses: <Glasses className="w-4 h-4 text-amber-600" />,
    HardHat: <HardHat className="w-4 h-4 text-amber-600" />
  };

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
        setIsServicesDropdownPinned(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServicesDropdownOpen(false);
        setIsServicesDropdownPinned(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Function to smoothly animate the underline to the active link position
  const updateUnderlinePosition = useCallback((targetId: string, immediate = false) => {
    if (location.pathname !== '/') {
      if (underlineRef.current) {
        gsap.to(underlineRef.current, { opacity: 0, duration: 0.2 });
      }
      return;
    }

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
  }, [location.pathname]);

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

  // Active section in-view detection on scroll (only on homepage)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScrollUpdate = () => {
      if (isNavigatingRef.current) return;

      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // At bottom of page -> set FAQ active
      if (window.scrollY + viewportHeight >= pageHeight - 80) {
        setActiveId('faq');
        return;
      }

      let foundActiveId: string | null = null;
      const triggerThreshold = Math.min(250, viewportHeight * 0.35);

      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerThreshold && rect.bottom > 100) {
            foundActiveId = item.id;
          }
        }
      }

      if (foundActiveId) {
        setActiveId(foundActiveId);
      } else if (window.scrollY < 200) {
        setActiveId('about');
      }
    };

    // Initial check on mount
    const timer = setTimeout(handleScrollUpdate, 150);

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', handleScrollUpdate);
    }
    window.addEventListener('scroll', handleScrollUpdate, { passive: true });

    return () => {
      clearTimeout(timer);
      if (lenis) {
        lenis.off('scroll', handleScrollUpdate);
      }
      window.removeEventListener('scroll', handleScrollUpdate);
    };
  }, [location.pathname]);

  const handleNavClick = (href: string, id: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsServicesDropdownPinned(false);

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    setActiveId(id);
    updateUnderlinePosition(id);

    isNavigatingRef.current = true;

    smoothScrollTo(href, {
      offset: -70,
      onComplete: () => {
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);
      }
    });

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1200);
  };

  // Hover handlers for Scenario 1
  const handleDropdownMouseEnter = () => {
    if (!isServicesDropdownPinned) {
      setIsServicesDropdownOpen(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isServicesDropdownPinned) {
      setIsServicesDropdownOpen(false);
    }
  };

  // Click handler for "Our Services" Navbar link (Scenario 2)
  const handleOurServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isServicesDropdownOpen) {
      // Scenario 2 step A: Click opens & pins the dropdown open
      setIsServicesDropdownOpen(true);
      setIsServicesDropdownPinned(true);
    } else if (!isServicesDropdownPinned) {
      // Dropdown was open via hover, now user clicks -> pin it
      setIsServicesDropdownPinned(true);
    } else {
      // Scenario 2 step B: Clicked "Our Services" link again while ALREADY pinned -> redirect/scroll to #services section & close dropdown
      setIsServicesDropdownOpen(false);
      setIsServicesDropdownPinned(false);
      handleNavClick('#services', 'services');
    }
  };

  // Navigates to specific service card on homepage per user requirement
  const handleServiceItemClick = (serviceId: string) => {
    setIsServicesDropdownOpen(false);
    setIsServicesDropdownPinned(false);
    setIsMobileMenuOpen(false);
    setIsMobileServicesExpanded(false);

    const targetHash = `#service-${serviceId}`;

    if (location.pathname !== '/') {
      navigate(`/${targetHash}`);
      setTimeout(() => {
        smoothScrollTo(targetHash, { offset: -90 });
      }, 200);
    } else {
      window.history.pushState(null, '', targetHash);
      window.dispatchEvent(new Event('hashchange'));
      smoothScrollTo(targetHash, { offset: -90 });
    }
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/90 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'bg-brand-canvas/80 backdrop-blur-sm border-b border-gray-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Home Action */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  smoothScrollTo(0);
                  setActiveId('about');
                  window.history.pushState('', document.title, window.location.pathname);
                }
              }}
              className="flex items-center group cursor-pointer focus:outline-hidden"
              aria-label="3D Naksha Homepage"
            >
              <img
                src="/logo-side.jpeg"
                alt="3D Naksha Logo"
                className="h-10 sm:h-12 md:h-13 w-auto rounded-xl max-w-[240px] sm:max-w-[280px] object-contain transition-transform group-hover:scale-[1.02] duration-300"
                width={280}
                height={52}
                fetchPriority="high"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links with GSAP Animated Underline */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center relative py-1 gap-1"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((link) => {
              const isActive = location.pathname === '/' && activeId === link.id;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    ref={dropdownRef}
                    className="relative py-1"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <a
                      ref={(el) => registerLinkRef(link.id, el)}
                      href={link.href}
                      data-nav-id={link.id}
                      onClick={handleOurServicesClick}
                      className={`px-4 py-2 text-xs font-mono-tech transition-colors relative z-10 inline-flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'text-brand-primary font-bold'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 rounded-sm'
                      }`}
                      aria-expanded={isServicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isServicesDropdownOpen ? 'rotate-180 text-amber-700' : 'text-gray-400'
                        }`}
                      />
                    </a>

                    {/* Accessible Desktop Dropdown Menu with zero hover gap */}
                    {isServicesDropdownOpen && (
                      <div className="absolute top-full left-0 pt-1 w-72 z-50">
                        <div className="rounded-md bg-white border border-gray-200/90 shadow-xl py-2 z-50 animate-fadeIn border-t-2 border-t-amber-600">
                          <div className="px-3 py-1.5 mb-1 text-[10px] font-mono-tech text-gray-400 uppercase font-bold border-b border-gray-100 flex items-center justify-between">
                            <span>Our Services</span>
                            <span className="text-amber-600">{SERVICES.length} Services</span>
                          </div>

                          {SERVICES.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => handleServiceItemClick(service.id)}
                              className="w-full px-3 py-2 text-left hover:bg-amber-50/70 transition-colors flex items-start gap-2.5 group cursor-pointer"
                            >
                              <div className="w-7 h-7 rounded-sm bg-gray-100 group-hover:bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                {iconMap[service.icon]}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-display font-bold text-gray-900 group-hover:text-amber-900 flex items-center gap-1">
                                  <span>{service.title}</span>
                                  <span className="font-mono-tech text-[10px] text-gray-400 font-normal">
                                    // {service.number}
                                  </span>
                                </div>
                                <div className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                                  {service.tagline}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

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
                  className={`px-4 py-2 text-xs font-mono-tech transition-colors relative z-10 ${
                    isActive
                      ? 'text-brand-primary font-bold'
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
              className="btn-cta-premium hidden sm:flex items-center gap-2 px-5 py-2 text-xs cursor-pointer group"
            >
              <span>Discuss Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
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
              <span className="flex items-center gap-1.5 text-xs text-accent-emerald font-mono-tech font-medium">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
                Architectural Visualization & VR
              </span>
            </div>

            {NAV_ITEMS.map((link) => {
              const isActive = location.pathname === '/' && activeId === link.id;

              if (link.hasDropdown) {
                return (
                  <div key={link.id} className="space-y-1">
                    <button
                      onClick={() => setIsMobileServicesExpanded(!isMobileServicesExpanded)}
                      className={`w-full flex items-center justify-between p-3 rounded-sm border transition-all text-sm font-mono-tech ${
                        isActive
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
                      <ChevronDown
                        className={`w-4 h-4 opacity-70 transition-transform ${
                          isMobileServicesExpanded ? 'rotate-180 text-amber-700' : ''
                        }`}
                      />
                    </button>

                    {/* Mobile Expandable Services Submenu */}
                    {isMobileServicesExpanded && (
                      <div className="pl-3 pr-1 py-1 space-y-1 bg-gray-50 rounded-sm border border-gray-200 animate-fadeIn">
                        {SERVICES.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => handleServiceItemClick(service.id)}
                            className="w-full text-left p-2.5 rounded-sm hover:bg-amber-100/70 text-xs font-mono-tech text-gray-800 flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <span className="font-bold flex items-center gap-2">
                              <span className="text-amber-700">{service.number} //</span>
                              <span>{service.title}</span>
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.id);
                  }}
                  className={`flex items-center justify-between p-3 rounded-sm border transition-all text-sm font-mono-tech ${
                    isActive
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
                className="w-full py-3.5 px-4 rounded-sm bg-gradient-to-r from-accent-bronze-light to-accent-amber-gold text-[#08090B] font-display font-semibold text-sm tracking-wider uppercase text-center shadow-md cursor-pointer"
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

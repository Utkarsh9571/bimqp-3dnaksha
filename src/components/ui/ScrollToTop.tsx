import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollTo, getLenis } from '../../lib/animations';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 300);
    };

    // Initial check
    toggleVisibility();

    // Attach to Lenis scroll event if active, as well as native scroll
    const lenis = getLenis();
    const handleLenisScroll = () => {
      toggleVisibility();
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    smoothScrollTo(0, { duration: 1 });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-22 sm:bottom-24 right-6.5 z-40 p-3 sm:p-3.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-300 shadow-lg text-brand-primary hover:text-white hover:bg-gradient-to-r hover:from-accent-bronze hover:to-accent-blue hover:border-transparent transition-all duration-300 cursor-pointer group flex items-center justify-center ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="sr-only">Scroll to top</span>
    </button>
  );
};

export default ScrollToTop;

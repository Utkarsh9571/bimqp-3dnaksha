import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { FullBleedShowcase } from './components/sections/FullBleedShowcase';
//import { OperatingRegions } from './components/sections/OperatingRegions';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { initSmoothScroll, destroySmoothScroll, onReducedMotionChange, smoothScrollTo } from './lib/animations';
import type { PortfolioItem } from './types';

import { JsonLd } from './components/seo/JsonLd';
import { getHomepageGraph } from './utils/schema';

// Lazy-load below-the-fold sections, service detail pages, and heavy interactive widgets
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
//const ExperienceUnbuilt = lazy(() => import('./components/sections/ExperienceUnbuilt'));
//const FeatureCardsGrid = lazy(() => import('./components/sections/FeatureCardsGrid'));
const LifecycleJourney = lazy(() => import('./components/sections/LifecycleJourney'));
//const ScrollWalkthroughViewer = lazy(() => import('./components/sections/ScrollWalkthroughViewer'));
const Services = lazy(() => import('./components/sections/Services'));
const TargetAudience = lazy(() => import('./components/sections/TargetAudience'));
const Process = lazy(() => import('./components/sections/Process'));
//const PortfolioGallery = lazy(() => import('./components/sections/PortfolioGallery'));
const FAQSection = lazy(() => import('./components/sections/FAQSection'));
const CallToAction = lazy(() => import('./components/sections/CallToAction'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ConsultationModal = lazy(() => import('./components/modals/ConsultationModal'));
const LightboxModal = lazy(() => import('./components/modals/LightboxModal'));

// Lightweight placeholder for smooth suspense hydration
const SectionFallback = () => (
  <div className="w-full py-16 flex items-center justify-center opacity-30">
    <div className="w-6 h-6 rounded-full border-2 border-accent-blue/20 border-t-[#0284C7] animate-spin" />
  </div>
);

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationService, setConsultationService] = useState<string>('Immersive VR Services');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PortfolioItem | null>(null);

  // Initialize Lenis smooth scroll and wire into GSAP ticker
  useEffect(() => {
    initSmoothScroll();

    // Ensure initial root canonical link is established
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    if (window.location.pathname === '/') {
      canonicalLink.setAttribute('href', 'https://3dnaksha.com/');
    }

    // Handle initial hash scrolling on page load
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        smoothScrollTo(hash, { offset: -70 });
      }, 300);
    }

    const unsubscribeReduced = onReducedMotionChange((isReduced) => {
      if (isReduced) {
        destroySmoothScroll();
      } else {
        initSmoothScroll();
      }
    });

    return () => {
      unsubscribeReduced();
      destroySmoothScroll();
    };
  }, []);

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setConsultationService(serviceName);
    }
    setIsConsultationOpen(true);
  };

  const handleScrollToVR = () => {
    smoothScrollTo('#vr-centerpiece', { offset: -30 });
  };

  const handleSelectProjectForQuote = (item: PortfolioItem) => {
    setSelectedLightboxItem(null);
    handleOpenConsultation(`Inquiry for ${item.title}`);
  };

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-primary selection:bg-accent-bronze-light/30 selection:text-brand-primary flex flex-col">
      {/* Fixed 3px Scroll Progress Bar */}
      <ScrollProgressBar height={3} />

      {/* Top Fixed Glass Navigation Bar */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <Routes>
        {/* HOMEPAGE ROUTE */}
        <Route
          path="/"
          element={
            <main className="flex-grow">
              <JsonLd data={getHomepageGraph()} />

              {/* Section 1: Critical Above-The-Fold Hero & Pinned VR 3D Model Showcase */}
              <FullBleedShowcase
                onOpenConsultation={handleOpenConsultation}
                onExploreVR={handleScrollToVR}
              />

              {/* Below-the-fold sections wrapped in Suspense for ultra-fast initial mobile paint */}
              <Suspense fallback={<SectionFallback />}>
                {/* 1. About Us (#about) */}
                <AboutSection onOpenConsultation={handleOpenConsultation} />

                {/* 2. Connected Single-Page Services Spectrum (#services) */}
                <Services onOpenConsultation={handleOpenConsultation} />

                {/* 3. Our Mission / AEC Lifecycle Journey (#mission) */}
                <LifecycleJourney />

                {/* 4. Our Clients / Stakeholders (#clients) & 5-Step Process */}
                <TargetAudience onOpenConsultation={handleOpenConsultation} />
                <Process onOpenConsultation={() => handleOpenConsultation()} />

                {/* 5. FAQ (#faq) */}
                <FAQSection onOpenConsultation={() => handleOpenConsultation()} />

                {/* Closing High-Conversion CTA Banner */}
                <CallToAction onOpenConsultation={() => handleOpenConsultation()} />

                {/* Footer & Ecosystem Endorsements */}
                <Footer onOpenConsultation={() => handleOpenConsultation()} />
              </Suspense>
            </main>
          }
        />

        {/* CATCH-ALL SINGLE PAGE REDIRECT ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modals lazy-loaded on demand */}
      <Suspense fallback={null}>
        {isConsultationOpen && (
          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
            defaultService={consultationService}
          />
        )}

        {selectedLightboxItem && (
          <LightboxModal
            item={selectedLightboxItem}
            onClose={() => setSelectedLightboxItem(null)}
            onSelectProjectForQuote={handleSelectProjectForQuote}
          />
        )}
      </Suspense>

      {/* Floating Action Controls: WhatsApp & Scroll to Top */}
      <ScrollToTop />
      <WhatsAppButton phoneNumber="918233520124" />
    </div>
  );
}

export default App;

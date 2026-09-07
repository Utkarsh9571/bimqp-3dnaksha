import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
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
const FullBleedShowcase = lazy(() => import('./components/sections/FullBleedShowcase'));
const ImmersiveVR = lazy(() => import('./components/sections/ImmersiveVR'));
const TargetAudience = lazy(() => import('./components/sections/TargetAudience'));
const Process = lazy(() => import('./components/sections/Process'));
//const PortfolioGallery = lazy(() => import('./components/sections/PortfolioGallery'));
const FAQSection = lazy(() => import('./components/sections/FAQSection'));
const CallToAction = lazy(() => import('./components/sections/CallToAction'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ConsultationModal = lazy(() => import('./components/modals/ConsultationModal'));
const LightboxModal = lazy(() => import('./components/modals/LightboxModal'));

// Dedicated Service Detail Page component
const ServiceDetailPage = lazy(() => import('./components/services/ServiceDetailPage'));

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

              {/* Section 1: Critical Above-The-Fold Hero Section */}
              <Hero
                onOpenConsultation={() => handleOpenConsultation()}
                onExploreVR={handleScrollToVR}
              />

              {/* Below-the-fold sections wrapped in Suspense for ultra-fast initial mobile paint */}
              <Suspense fallback={<SectionFallback />}>
                {/* Section 1.5: Pinned Full-Bleed Cinematic Interior Showcase */}
                <FullBleedShowcase />

                {/* Section 2: About 3D Naksha */}
                <AboutSection onOpenConsultation={handleOpenConsultation} />

                {/* Section 2.5: Experience the Unbuilt 
                <ExperienceUnbuilt />*/}

                {/* Section 2.5: 3-Column Core Features Grid 
                <FeatureCardsGrid />*/}

                {/* Section 3: AEC Lifecycle Journey */}
                <LifecycleJourney />

                {/* Section 3.5: Apple-Style Scroll-Scrubbed Walkthrough Sequence Viewer 
                <ScrollWalkthroughViewer totalFrames={81} />*/}

                {/* Section 4: 5 Core Services */}
                <Services onOpenConsultation={handleOpenConsultation} />

                {/* Section 5: Immersive VR Flagship Centerpiece */}
                <ImmersiveVR onOpenConsultation={() => handleOpenConsultation('Immersive VR Services')} />

                {/* Section 6: Who We Work With (AEC Stakeholders) */}
                <TargetAudience onOpenConsultation={handleOpenConsultation} />

                {/* Section 7: How It Works (5-Step Collaborative Process) */}
                <Process onOpenConsultation={() => handleOpenConsultation()} />

                {/* Section 8: Selected Visualizations Showcase 
                <PortfolioGallery onSelectProject={(item) => setSelectedLightboxItem(item)} />*/}

                {/* Section 9: Frequently Answered Questions Accordion */}
                <FAQSection onOpenConsultation={() => handleOpenConsultation()} />

                {/* Section 10: Closing High-Conversion CTA Banner */}
                <CallToAction onOpenConsultation={() => handleOpenConsultation()} />

                {/* Footer & Ecosystem Endorsements */}
                <Footer onOpenConsultation={() => handleOpenConsultation()} />
              </Suspense>
            </main>
          }
        />

        {/* SERVICE DETAIL PAGES ROUTE */}
        <Route
          path="/services/:slug"
          element={
            <Suspense fallback={<SectionFallback />}>
              <ServiceDetailPage onOpenConsultation={handleOpenConsultation} />
            </Suspense>
          }
        />

        {/* FALLBACK REDIRECT ROUTE */}
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

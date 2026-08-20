import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { OperatingRegions } from './components/sections/OperatingRegions';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { initSmoothScroll, destroySmoothScroll, onReducedMotionChange, smoothScrollTo } from './lib/animations';
import type { PortfolioItem } from './types';

// Lazy-load below-the-fold sections and heavy interactive widgets
const ExperienceUnbuilt = lazy(() => import('./components/sections/ExperienceUnbuilt'));
const FeatureCardsGrid = lazy(() => import('./components/sections/FeatureCardsGrid'));
const LifecycleJourney = lazy(() => import('./components/sections/LifecycleJourney'));
const ScrollWalkthroughViewer = lazy(() => import('./components/sections/ScrollWalkthroughViewer'));
const Services = lazy(() => import('./components/sections/Services'));
const FullBleedShowcase = lazy(() => import('./components/sections/FullBleedShowcase'));
const ImmersiveVR = lazy(() => import('./components/sections/ImmersiveVR'));
const TargetAudience = lazy(() => import('./components/sections/TargetAudience'));
const Process = lazy(() => import('./components/sections/Process'));
const PortfolioGallery = lazy(() => import('./components/sections/PortfolioGallery'));
const FAQSection = lazy(() => import('./components/sections/FAQSection'));
const CallToAction = lazy(() => import('./components/sections/CallToAction'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ConsultationModal = lazy(() => import('./components/modals/ConsultationModal'));
const LightboxModal = lazy(() => import('./components/modals/LightboxModal'));

// Lightweight placeholder for smooth suspense hydration
const SectionFallback = () => (
  <div className="w-full py-16 flex items-center justify-center opacity-30">
    <div className="w-6 h-6 rounded-full border-2 border-[#0284C7]/20 border-t-[#0284C7] animate-spin" />
  </div>
);

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationService, setConsultationService] = useState<string>('Immersive VR Services');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PortfolioItem | null>(null);

  // Initialize Lenis smooth scroll and wire into GSAP ticker
  useEffect(() => {
    initSmoothScroll();

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
    <div className="min-h-screen bg-[#F8F7F5] text-[#0A0A0A] selection:bg-[#D4A373]/30 selection:text-[#0A0A0A] flex flex-col">
      {/* Fixed 3px Red-to-Blue-to-Purple Scroll Progress Bar */}
      <ScrollProgressBar height={3} />

      {/* Top Fixed Glass Navigation Bar */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Section 1: Critical Above-The-Fold Hero Section */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onExploreVR={handleScrollToVR}
        />

        {/* Section 1.5: Critical Regional Hubs */}
        <OperatingRegions />

        {/* Below-the-fold sections wrapped in Suspense for ultra-fast initial mobile paint */}
        <Suspense fallback={<SectionFallback />}>
          {/* Section 2: Experience the Unbuilt */}
          <ExperienceUnbuilt />

          {/* Section 2.5: 3-Column Core Features Grid */}
          <FeatureCardsGrid />

          {/* Section 3: AEC Lifecycle Journey */}
          <LifecycleJourney />

          {/* Section 3.5: Apple-Style Scroll-Scrubbed Walkthrough Sequence Viewer */}
          <ScrollWalkthroughViewer totalFrames={81} />

          {/* Section 4: 5 Core Services */}
          <Services onOpenConsultation={handleOpenConsultation} />

          {/* Section 4.5: Pinned Full-Bleed Cinematic Interior Showcase */}
          <FullBleedShowcase />

          {/* Section 5: Immersive VR Flagship Centerpiece */}
          <ImmersiveVR onOpenConsultation={() => handleOpenConsultation('Immersive VR Services')} />

          {/* Section 6: Who We Work With (AEC Stakeholders) */}
          <TargetAudience onOpenConsultation={handleOpenConsultation} />

          {/* Section 7: How It Works (5-Step Collaborative Process) */}
          <Process onOpenConsultation={() => handleOpenConsultation()} />

          {/* Section 8: Selected Visualizations Showcase */}
          <PortfolioGallery onSelectProject={(item) => setSelectedLightboxItem(item)} />

          {/* Section 9: Frequently Answered Questions Accordion */}
          <FAQSection onOpenConsultation={() => handleOpenConsultation()} />

          {/* Section 10: Closing High-Conversion CTA Banner */}
          <CallToAction onOpenConsultation={() => handleOpenConsultation()} />

          {/* Footer & Ecosystem Endorsements */}
          <Footer onOpenConsultation={() => handleOpenConsultation()} />
        </Suspense>
      </main>

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
    </div>
  );
}

export default App;

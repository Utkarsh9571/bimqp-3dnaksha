import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { OperatingRegions } from './components/sections/OperatingRegions';
import { ExperienceUnbuilt } from './components/sections/ExperienceUnbuilt';
import { FeatureCardsGrid } from './components/sections/FeatureCardsGrid';
import { LifecycleJourney } from './components/sections/LifecycleJourney';
import { ScrollWalkthroughViewer } from './components/sections/ScrollWalkthroughViewer';
import { Services } from './components/sections/Services';
import { FullBleedShowcase } from './components/sections/FullBleedShowcase';
import { ImmersiveVR } from './components/sections/ImmersiveVR';
import { TargetAudience } from './components/sections/TargetAudience';
import { Process } from './components/sections/Process';
import { PortfolioGallery } from './components/sections/PortfolioGallery';
import { FAQSection } from './components/sections/FAQSection';
import { CallToAction } from './components/sections/CallToAction';
import { ConsultationModal } from './components/modals/ConsultationModal';
import { LightboxModal } from './components/modals/LightboxModal';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { initSmoothScroll, destroySmoothScroll, onReducedMotionChange, smoothScrollTo } from './lib/animations';
import type { PortfolioItem } from './types';

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
        {/* Section 1: Hero Section */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onExploreVR={handleScrollToVR}
        />

        {/* Section 1.5: Currently Operating In (4-Column Regional Hubs) */}
        <OperatingRegions />

        {/* Section 2: Experience the Unbuilt (2D vs 3D vs VR Comparison) */}
        <ExperienceUnbuilt />

        {/* Section 2.5: 3-Column Core Features Grid */}
        <FeatureCardsGrid />

        {/* Section 3: AEC Lifecycle Journey (Design → BIM / 3D Model → Immersive Experience → Better Construction Decisions) */}
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
      </main>

      {/* Footer & Ecosystem Endorsements */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* Interactive Consultation / Scope Inquiry Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService={consultationService}
      />

      {/* Portfolio Lightbox Modal */}
      <LightboxModal
        item={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
        onSelectProjectForQuote={handleSelectProjectForQuote}
      />
    </div>
  );
}

export default App;

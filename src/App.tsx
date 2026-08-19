import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { ExperienceUnbuilt } from './components/sections/ExperienceUnbuilt';
import { LifecycleJourney } from './components/sections/LifecycleJourney';
import { Services } from './components/sections/Services';
import { ImmersiveVR } from './components/sections/ImmersiveVR';
import { TargetAudience } from './components/sections/TargetAudience';
import { Process } from './components/sections/Process';
import { PortfolioGallery } from './components/sections/PortfolioGallery';
import { FAQSection } from './components/sections/FAQSection';
import { CallToAction } from './components/sections/CallToAction';
import { ConsultationModal } from './components/modals/ConsultationModal';
import { LightboxModal } from './components/modals/LightboxModal';
import type { PortfolioItem } from './types';

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationService, setConsultationService] = useState<string>('Immersive VR Services');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PortfolioItem | null>(null);

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setConsultationService(serviceName);
    }
    setIsConsultationOpen(true);
  };

  const handleScrollToVR = () => {
    const vrElem = document.getElementById('vr-centerpiece');
    if (vrElem) {
      vrElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectForQuote = (item: PortfolioItem) => {
    setSelectedLightboxItem(null);
    handleOpenConsultation(`Inquiry for ${item.title}`);
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F3F4F6] selection:bg-[#D4A373]/30 selection:text-[#FFFFFF] flex flex-col">
      {/* Top Fixed Glass Navigation Bar */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onExploreVR={handleScrollToVR}
        />

        {/* Section 2: Experience the Unbuilt (2D vs 3D vs VR Comparison) */}
        <ExperienceUnbuilt />

        {/* Section 3: AEC Lifecycle Journey (Design → BIM / 3D Model → Immersive Experience → Better Construction Decisions) */}
        <LifecycleJourney />

        {/* Section 4: 5 Core Services */}
        <Services onOpenConsultation={handleOpenConsultation} />

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

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../../data/servicesData';
import { ServiceHero } from './ServiceHero';
import { ServiceOverview } from './ServiceOverview';
import { ServiceBenefits } from './ServiceBenefits';
import { ServiceDeliverables } from './ServiceDeliverables';
import { ServiceProcess } from './ServiceProcess';
import { ServiceVisualShowcase } from './ServiceVisualShowcase';
import { ServiceAudience } from './ServiceAudience';
import { ServiceFAQ } from './ServiceFAQ';
import { ServiceRelated } from './ServiceRelated';
import { ServiceCTA } from './ServiceCTA';
import Footer from '../layout/Footer';

interface ServiceDetailPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenConsultation }) => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  // Scroll to top on route mount/slug change & set document title / meta description
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (service) {
      document.title = service.seo.title;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', service.seo.description);
    }

    return () => {
      document.title = '3D Naksha - Step Inside Before You Build';
    };
  }, [slug, service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#08090B] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="font-mono-tech text-xs text-amber-400 font-bold mb-2">404 // ROUTE NOT FOUND</div>
        <h1 className="font-display text-3xl font-bold mb-4">Service Page Not Found</h1>
        <p className="text-sm text-gray-400 max-w-md mb-6 font-light">
          The requested service detail route does not exist or has moved. Explore our core architectural services.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-amber-500 text-black font-display font-bold text-xs uppercase rounded-sm hover:bg-amber-400 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-primary flex flex-col selection:bg-accent-bronze-light/30">
      <main className="flex-grow">
        {/* 01 // HERO */}
        <ServiceHero service={service} onOpenConsultation={onOpenConsultation} />

        {/* 02 // OVERVIEW */}
        <ServiceOverview service={service} />

        {/* 03 // WHAT WE DELIVER (DELIVERABLES) */}
        <ServiceDeliverables service={service} />

        {/* 04 // BENEFITS */}
        <ServiceBenefits service={service} />

        {/* 05 // WORKFLOW / PROCESS */}
        <ServiceProcess service={service} />

        {/* 06 // VISUAL EXPERIENCE / SHOWCASE */}
        <ServiceVisualShowcase service={service} />

        {/* 07 // WHO IT'S FOR (AUDIENCE) */}
        <ServiceAudience service={service} />

        {/* 08 // FAQ */}
        <ServiceFAQ service={service} />

        {/* 09 // RELATED SERVICES */}
        <ServiceRelated currentService={service} />

        {/* 10 // FINAL CTA */}
        <ServiceCTA service={service} onOpenConsultation={onOpenConsultation} />
      </main>

      {/* FOOTER */}
      <Footer onOpenConsultation={() => onOpenConsultation(service.title)} />
    </div>
  );
};

export default ServiceDetailPage;

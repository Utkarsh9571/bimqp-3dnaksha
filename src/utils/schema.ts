import { BRAND_CONFIG, FAQ_ITEMS } from '../data/content';
import type { DetailedServiceData } from '../types';

export const STABLE_ORG_ID = 'https://3dnaksha.com/#organization';
export const STABLE_WEBSITE_ID = 'https://3dnaksha.com/#website';

export const getOrganizationEntity = () => ({
  '@type': 'Organization',
  '@id': STABLE_ORG_ID,
  'name': BRAND_CONFIG.name,
  'url': 'https://3dnaksha.com',
  'logo': 'https://3dnaksha.com/logo-side.jpeg',
  'email': BRAND_CONFIG.email,
  'parentOrganization': {
    '@type': 'Organization',
    'name': 'BIMQP Ecosystem'
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'IT- 9(A), EPIP, IT Park Rd, Sitapura',
    'addressLocality': 'Jaipur',
    'addressRegion': 'Rajasthan',
    'postalCode': '302022',
    'addressCountry': 'IN'
  }
});

export const getWebSiteEntity = () => ({
  '@type': 'WebSite',
  '@id': STABLE_WEBSITE_ID,
  'name': BRAND_CONFIG.name,
  'url': 'https://3dnaksha.com',
  'publisher': { '@id': STABLE_ORG_ID }
});

export const getHomepageGraph = () => {
  const faqEntity = {
    '@type': 'FAQPage',
    '@id': 'https://3dnaksha.com/#faq',
    'mainEntity': FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  const webPageEntity = {
    '@type': 'WebPage',
    '@id': 'https://3dnaksha.com/#webpage',
    'url': 'https://3dnaksha.com/',
    'name': '3D Naksha | Step Inside Before You Build — Architectural Visualization & Immersive VR',
    'description': 'Experience architecture, interiors, and construction projects before they become physical spaces through BIM, 3D visualization, and immersive VR services. A brand of the BIMQP ecosystem.',
    'isPartOf': { '@id': STABLE_WEBSITE_ID },
    'publisher': { '@id': STABLE_ORG_ID }
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationEntity(),
      getWebSiteEntity(),
      webPageEntity,
      faqEntity
    ]
  };
};

export const getServicePageGraph = (service: DetailedServiceData) => {
  const pageUrl = `https://3dnaksha.com/services/${service.slug}`;

  const webPageEntity = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    'url': pageUrl,
    'name': service.seo.title,
    'description': service.seo.description,
    'isPartOf': { '@id': STABLE_WEBSITE_ID },
    'publisher': { '@id': STABLE_ORG_ID }
  };

  const serviceEntity = {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    'name': service.title,
    'url': pageUrl,
    'description': service.description,
    'provider': { '@id': STABLE_ORG_ID },
    'areaServed': 'IN'
  };

  const breadcrumbEntity = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://3dnaksha.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Our Services',
        'item': 'https://3dnaksha.com/#services'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': service.title,
        'item': pageUrl
      }
    ]
  };

  const graphNodes: any[] = [
    getOrganizationEntity(),
    getWebSiteEntity(),
    webPageEntity,
    serviceEntity,
    breadcrumbEntity
  ];

  // Include FAQPage entity if service has visible FAQs
  if (service.faqs && service.faqs.length > 0) {
    graphNodes.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      'mainEntity': service.faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes
  };
};

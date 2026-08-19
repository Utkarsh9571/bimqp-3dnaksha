import React, { useEffect, useRef } from 'react';
import { Layers, Sparkles, Glasses, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { gsap, prefersReducedMotion } from '../../lib/animations';

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  tag: string;
  colorTheme: 'blue' | 'red' | 'green';
  title: string;
  description: string;
  benefit: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'bim-precision',
    icon: <Layers className="w-5 h-5" />,
    tag: 'BIM PRECISION',
    colorTheme: 'blue',
    title: 'Coordinated 3D BIM & Digital Twins',
    description:
      'Transform 2D CAD architectural drawings into multi-disciplinary, clash-detected 3D BIM models with millimeter precision before site execution.',
    benefit: 'Eliminates on-site design conflicts & rework'
  },
  {
    id: 'lighting-materials',
    icon: <Sparkles className="w-5 h-5" />,
    tag: 'RAY-TRACED FINISHES',
    colorTheme: 'red',
    title: 'Photorealistic Diurnal Lighting Studies',
    description:
      'Simulate real geographic sun angles, natural daylight ingress, and physically accurate material textures across morning, golden hour, and dusk.',
    benefit: 'Zero uncertainty in material & lighting selection'
  },
  {
    id: 'spatial-vr',
    icon: <Glasses className="w-5 h-5" />,
    tag: 'HUMAN SCALE VR',
    colorTheme: 'green',
    title: '1:1 True-Perspective VR Immersion',
    description:
      'Step inside unbuilt floor plans in full stereoscopic virtual reality to experience room volumes, ceiling heights, and circulation flow at true human scale.',
    benefit: 'Enables decisive stakeholder alignment in minutes'
  }
];

export const FeatureCardsGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const section = sectionRef.current;
    if (!section) return;

    if (isReduced) {
      gsap.set('.feature-grid-card', { opacity: 1, y: 0 });
      gsap.set('.card-accent-bar', { scaleX: 1 });
      return;
    }

    // Set initial animation properties
    gsap.set('.feature-grid-card', { opacity: 0, y: 30 });
    gsap.set('.card-accent-bar', { scaleX: 0, transformOrigin: 'left center' });

    // Single unified GSAP Timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // 1. Cards fade in and slide up (staggered left-to-right ~0.15s)
    tl.to('.feature-grid-card', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out'
    })
      // 2. Bottom accent bars draw in from left to right (scaleX: 0 -> 1) with slight delay
      .to(
        '.card-accent-bar',
        {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        },
        '-=0.45'
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features-grid"
      className="py-20 md:py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="mb-14">
          <SectionHeading
            number="02"
            badgeText="Core Visualization Pillars"
            badgeVariant="amber"
            title="Engineered for Spatial"
            highlightText="Clarity & Precision."
            subtitle="Three foundational capabilities powering pre-construction confidence for architects, builders, and property owners."
            align="left"
          />
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature) => {
            // Light-theme accent-specific design tokens
            const themeConfig = {
              blue: {
                badgeBg: 'bg-blue-50 text-[#0284C7] border-blue-200',
                iconBg: 'bg-blue-50 text-[#0284C7] border-blue-200 shadow-2xs',
                dotBg: 'bg-[#0284C7]',
                barGradient: 'linear-gradient(90deg, #0284C7 0%, #2563EB 100%)',
                barGlow: '0 0 10px rgba(2, 132, 199, 0.4)'
              },
              red: {
                badgeBg: 'bg-rose-50 text-[#E11D48] border-rose-200',
                iconBg: 'bg-rose-50 text-[#E11D48] border-rose-200 shadow-2xs',
                dotBg: 'bg-[#E11D48]',
                barGradient: 'linear-gradient(90deg, #E11D48 0%, #F43F5E 100%)',
                barGlow: '0 0 10px rgba(225, 29, 72, 0.4)'
              },
              green: {
                badgeBg: 'bg-emerald-50 text-[#059669] border-emerald-200',
                iconBg: 'bg-emerald-50 text-[#059669] border-emerald-200 shadow-2xs',
                dotBg: 'bg-[#059669]',
                barGradient: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
                barGlow: '0 0 10px rgba(5, 150, 105, 0.4)'
              }
            }[feature.colorTheme];

            return (
              <div
                key={feature.id}
                className="feature-grid-card relative bg-white border border-gray-200/90 hover:border-gray-300 rounded-sm p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)] group corner-crosshairs overflow-hidden"
              >
                <div>
                  {/* Top Row: Icon Badge (Left) & Tag Pill (Right) */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    {/* Rounded Square Icon Badge */}
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${themeConfig.iconBg}`}
                    >
                      {feature.icon}
                    </div>

                    {/* Pill-Shaped Tag Label with Color Accent */}
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-mono-tech tracking-wider uppercase font-bold border flex items-center gap-1.5 ${themeConfig.badgeBg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${themeConfig.dotBg} animate-pulse`} />
                      <span>{feature.tag}</span>
                    </div>
                  </div>

                  {/* Bold Heading */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0A0A0A] tracking-tight mb-3 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Benefit Callout */}
                <div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono-tech text-gray-500 group-hover:text-gray-800 transition-colors">
                    <span>{feature.benefit}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 text-[#9A6A38]" />
                  </div>
                </div>

                {/* Animated Bottom Accent Color Bar (scaleX: 0 -> 1 on scroll) */}
                <div
                  className="card-accent-bar absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{
                    background: themeConfig.barGradient,
                    boxShadow: themeConfig.barGlow
                  }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsGrid;

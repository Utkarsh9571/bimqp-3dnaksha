import React, { useEffect, useRef } from 'react';
import { Navigation, MapPin } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/animations';

interface OperationalRegion {
  id: string;
  state: string;
  city: string;
  coordinates: string;
  statusDotColor: string;
  statusLabel: string;
  coverageDetail: string;
  hubCode: string;
}

const REGIONS: OperationalRegion[] = [
  {
    id: 'rj',
    state: 'RAJASTHAN',
    city: 'JAIPUR',
    coordinates: '26.7978° N, 75.8456° E',
    statusDotColor: '#059669',
    statusLabel: 'HEADQUARTERS',
    coverageDetail: 'IT- 9(A), EPIP, IT Park Rd, near Hotel Marigold, Sitapura Industrial Area, Sitapura, Jaipur 302022',
    hubCode: 'HQ-JPR-01'
  }
];

export const OperatingRegions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const section = sectionRef.current;
    if (!section) return;

    if (isReduced) {
      gsap.set('.operating-header', { opacity: 1, y: 0 });
      gsap.set('.operating-column', { opacity: 1, y: 0 });
      gsap.set('.operating-divider', { scaleY: 1 });
      return;
    }

    // Set initial animated properties
    gsap.set('.operating-header', { opacity: 0, y: 20 });
    gsap.set('.operating-column', { opacity: 0, y: 30 });
    gsap.set('.operating-divider', { scaleY: 0, transformOrigin: 'top center' });

    // Single unified GSAP Timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    tl.to('.operating-header', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
      .to(
        '.operating-divider',
        {
          scaleY: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power2.out'
        },
        '-=0.25'
      )
      .to(
        '.operating-column',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out'
        },
        '<0.05'
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="operating-regions"
      className="py-16 md:py-20 bg-[#F8F7F5] border-t border-b border-gray-200 relative overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-dense opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header Strip */}
        <div className="operating-header flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#0284C7] font-semibold tracking-widest uppercase mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>REGIONAL PRESENCE & COVERAGE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">
              Our Headquarters
            </h2>
          </div>

          <div className="font-mono-tech text-xs text-gray-600 max-w-md">
            Providing on-ground architectural visualization, BIM coordination, and VR deployment across premier AEC markets.
          </div>
        </div>

        {/* Single Location Layout */}
        <div className="relative">
          {REGIONS.map((region, index) => {
            const isLast = index === REGIONS.length - 1;

            return (
              <React.Fragment key={region.id}>
                {/* Column Card Content */}
                <div className="operating-column flex flex-col justify-between group max-w-lg">
                  <div>
                    {/* Top: Status Dot + State Label */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full relative flex items-center justify-center shrink-0"
                          style={{ backgroundColor: region.statusDotColor }}
                        >
                          <span
                            className="absolute inset-0 rounded-full animate-ping opacity-60"
                            style={{ backgroundColor: region.statusDotColor }}
                          />
                        </span>
                        <span className="font-mono-tech text-xs tracking-wider text-gray-700 uppercase font-bold">
                          {region.state}
                        </span>
                      </div>

                      <span className="font-mono-tech text-[10px] text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-xs shadow-2xs">
                        {region.hubCode}
                      </span>
                    </div>

                    {/* Large City Name */}
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-3 group-hover:text-[#9A6A38] transition-colors">
                      {region.city}
                    </h3>

                    {/* Coverage Scope */}
                    <p className="text-xs text-[#4B5563] font-mono-tech mb-4 leading-relaxed">
                      {region.coverageDetail}
                    </p>
                  </div>

                  {/* Bottom: Coordinates */}
                  <div className="pt-4 border-t border-gray-200 font-mono-tech text-[11px] text-gray-500 flex items-center gap-2">
                    <Navigation className="w-3 h-3 text-[#0284C7] shrink-0" />
                    <span>{region.coordinates}</span>
                  </div>
                </div>

                {/* Vertical Divider Line (Rendered between columns on desktop) */}
                {!isLast && (
                  <div
                    className="operating-divider hidden lg:block absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-gray-300 via-gray-200 to-transparent pointer-events-none"
                    style={{ left: `${(index + 1) * 25}%` }}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OperatingRegions;

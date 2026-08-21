import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Glasses, CheckCircle2 } from 'lucide-react';
import { WireframeBuildingInterior } from '../ui/WireframeBuildingInterior';
import { Badge } from '../ui/Badge';
import { BRAND_CONFIG } from '../../data/content';
import { gsap, prefersReducedMotion } from '../../lib/animations';
import { useIsTabletOrDesktop } from '../../hooks/useMediaQuery';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreVR: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreVR }) => {
  const containerRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const isTabletOrDesktop = useIsTabletOrDesktop();
  const [assemblyProgress, setAssemblyProgress] = useState<number>(() => (isTabletOrDesktop ? 0 : 1));

  // GSAP ScrollTrigger Pinning and Scrub Timeline (Active on >=768px, skipped on mobile)
  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const container = containerRef.current;
    const content = contentWrapperRef.current;
    if (!container) return;

    // On mobile (<768px) or reduced-motion, wireframe is fully visible without pinned scroll trapping
    if (!isTabletOrDesktop || isReduced) {
      setAssemblyProgress(1);

      // Simple one-time entrance animation on mobile
      const mobileEntranceCtx = gsap.context(() => {
        gsap.from(headlineRef.current, {
          y: 20,
          duration: 0.8,
          ease: 'power3.out'
        });

        gsap.from('.hero-stagger-item', {
          y: 15,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out'
        });
      }, container);

      return () => {
        mobileEntranceCtx.revert();
      };
    }

    // --- Tablet / Desktop (>=768px) Full Animated Pinned Experience ---
    // 1. Entrance animation on page load for the headline and hero elements
    const entranceCtx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.hero-stagger-item', {
        y: 15,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out'
      });

      // Subtle bouncing loop for the scroll down indicator
      gsap.to('.hero-bounce-chevron', {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 0.75,
        ease: 'power1.inOut'
      });
    }, container);

    // 2. Scroll-driven Pinning & Wireframe Assembly Timeline
    let pinTimeline: gsap.core.Timeline | null = null;
    const animFrame = requestAnimationFrame(() => {
      pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=100%', // Pin for exactly 1 viewport height of scroll distance
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            setAssemblyProgress(self.progress);
          }
        }
      });

      if (content && pinTimeline) {
        pinTimeline
          .to(
            content,
            {
              opacity: 0,
              y: -45,
              scale: 0.96,
              ease: 'power2.in',
              duration: 0.35
            },
            0.65
          )
          .to(
            scrollIndicatorRef.current,
            {
              opacity: 0,
              y: 20,
              duration: 0.2
            },
            0.5
          );
      }
    });

    return () => {
      cancelAnimationFrame(animFrame);
      entranceCtx.revert();
      if (pinTimeline) {
        pinTimeline.scrollTrigger?.kill();
        pinTimeline.kill();
      }
    };
  }, [isTabletOrDesktop]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#F8F7F5] pt-24 pb-8"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      {/* 3D Wireframe Interior Illustration (Assembly driven by Scroll Progress) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <WireframeBuildingInterior
          progress={assemblyProgress}
          className="w-full h-full opacity-90"
        />
      </div>

      {/* Radial Vignette Mask for crystal legibility */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-1" />

      {/* Main Foreground Hero Content Container */}
      <div
        ref={contentWrapperRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center py-12"
      >
        {/* Top Eyebrow Tagline */}
        <div className="flex flex-wrap items-center gap-3 mb-6 hero-stagger-item">
          <Badge variant="amber" size="md">
            Architectural Visualization & Immersive VR
          </Badge>
          <div className="flex items-center gap-2 font-mono-tech text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
            <span>BIMQP Ecosystem</span>
          </div>
        </div>

        {/* Primary Headline: "EXPERIENCE TOMORROW TODAY." */}
        <div className="max-w-4xl space-y-6">
          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#0A0A0A] leading-[1.04]"
          >
            <span className="block">EXPERIENCE</span>
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#4F46E5] to-[#DB2777]">
                TOMORROW
              </span>{' '}
              TODAY.
            </span>
          </h1>

          {/* Subtitle & Value Proposition */}
          <p className="text-base sm:text-lg md:text-xl text-[#4B5563] font-normal leading-relaxed max-w-2xl hero-stagger-item">
            Step inside unbuilt architecture, interior designs, and 3D BIM models before construction begins. Evaluate spatial design from a true human perspective and make confident, coordinated decisions.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 hero-stagger-item">
            <button
              onClick={onOpenConsultation}
              className="px-7 py-3.5 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] hover:from-[#E2B689] hover:to-[#F4D06F] text-[#08090B] font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(212,163,115,0.3)] hover:shadow-[0_6px_25px_rgba(212,163,115,0.45)] flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreVR}
              className="px-6 py-3.5 rounded-sm bg-white hover:bg-gray-50 text-gray-900 font-mono-tech text-xs font-semibold tracking-wider uppercase border border-gray-300 hover:border-[#0284C7] transition-all flex items-center gap-2.5 cursor-pointer shadow-sm"
            >
              <Glasses className="w-4 h-4 text-[#0284C7]" />
              <span>Explore Immersive Services</span>
            </button>
          </div>

          {/* Benefit Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 text-xs font-mono-tech text-gray-600 hero-stagger-item">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Human-Scale Spatial Review</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
              <span>Coordinated 3D BIM Models</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>Pre-Construction Clarity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pinned Scroll Assembly CTA Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200"
      >
        {/* Tracked Scroll Instruction & Bouncing Chevron */}
        <div className="flex items-center gap-3 font-mono-tech text-xs text-gray-600 tracking-[0.25em] uppercase font-semibold">
          <div className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center shadow-xs">
            <ChevronDown className="w-4 h-4 text-[#0284C7] hero-bounce-chevron" />
          </div>
          <span>KEEP SCROLLING TO ASSEMBLE</span>
        </div>

        {/* Dynamic Architectural Metrics Strip */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-gray-500">
          {BRAND_CONFIG.metrics.slice(0, 3).map((metric, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#0284C7] font-bold">{metric.value}</span>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

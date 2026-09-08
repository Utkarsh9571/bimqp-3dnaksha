import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Sparkles, Activity, Box, Glasses, Radio, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion, smoothScrollTo } from '../../lib/animations';
import { useIsTabletOrDesktop } from '../../hooks/useMediaQuery';
import { Badge } from '../ui/Badge';

// Lazy-load the Three.js BIM Model Viewer
const BIMModelViewer3D = lazy(() => import('../ui/BIMModelViewer3D'));

interface FullBleedShowcaseProps {
  onOpenConsultation?: (serviceName?: string) => void;
  onExploreVR?: () => void;
}

export const FullBleedShowcase: React.FC<FullBleedShowcaseProps> = ({ onOpenConsultation, onExploreVR }) => {
  const containerRef = useRef<HTMLElement>(null);
  const bimContainerRef = useRef<HTMLDivElement>(null);
  const headsetContainerRef = useRef<HTMLDivElement>(null);
  const headsetImgRef = useRef<HTMLImageElement>(null);
  const blackoutRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const isTabletOrDesktop = useIsTabletOrDesktop();
  const [isNearViewport, setIsNearViewport] = useState<boolean>(false);
  const [cameraTelemetry, setCameraTelemetry] = useState<{ azimuth: number; elevation: number; distance: number }>({
    azimuth: 42,
    elevation: 15,
    distance: 120
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection Observer to prepare the 3D canvas early
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '1200px 0px 1200px 0px', threshold: 0.01 }
    );
    observer.observe(container);

    // On mobile (<768px) or reduced motion, skip the pinned timeline completely
    if (!isTabletOrDesktop || prefersReducedMotion()) {
      setIsNearViewport(true);
      return () => {
        observer.disconnect();
      };
    }

    // --- Tablet / Desktop (>=768px): Full GSAP Pinned Scrub Timeline ---
    const headsetImg = headsetImgRef.current;
    const headsetContainer = headsetContainerRef.current;
    const blackout = blackoutRef.current;
    const hud = hudRef.current;
    const heroText = heroTextRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8
      }
    });

    if (headsetImg && headsetContainer && blackout) {
      const bimContainer = bimContainerRef.current;

      // 1. Initial states
      if (bimContainer) gsap.set(bimContainer, { zIndex: 10, pointerEvents: 'none' });
      gsap.set(headsetContainer, { opacity: 1, pointerEvents: 'none' });
      gsap.set(headsetImg, { scale: 1, rotateX: 0, rotateY: 0, transformOrigin: '50% 50%' });
      gsap.set(blackout, { opacity: 0, pointerEvents: 'none' });
      if (hud) gsap.set(hud, { opacity: 0, y: 30 });
      if (heroText) gsap.set(heroText, { opacity: 1, y: 0 });

      // 0. Hero Text Fades Out & Shifts Up as user starts scrolling (Progress 0.0 -> 0.18)
      if (heroText) {
        tl.to(heroText, {
          opacity: 0,
          y: -40,
          duration: 0.18,
          ease: 'power1.in'
        }, 0);
      }

      // 2. Headset Zoom & Camera Dolly into Lens (Progress 0.0 -> 0.38)
      tl.to(headsetImg, {
        scale: 14,
        rotateX: 3,
        rotateY: -2,
        duration: 0.38,
        ease: 'power2.in'
      }, 0);

      // 3. Blackout Fades in to 100% as lens fills the screen (Progress 0.22 -> 0.36)
      tl.to(blackout, {
        opacity: 1,
        duration: 0.14,
        ease: 'power1.in'
      }, 0.22);

      // 4. Fade out Headset container during blackout (Progress 0.34 -> 0.40)
      tl.to(headsetContainer, {
        opacity: 0,
        duration: 0.06,
        ease: 'none'
      }, 0.34);

      // 5. Elevate 3D Model container to top & make interactive (Progress 0.42)
      if (bimContainer) {
        tl.set(bimContainer, { zIndex: 35, pointerEvents: 'auto' }, 0.42);
      }

      // 6. Blackout fades out to reveal interactive BIM model (Progress 0.38 -> 0.50)
      tl.to(blackout, {
        opacity: 0,
        duration: 0.12,
        ease: 'power1.out'
      }, 0.38);

      // 7. HUD elements fade in smoothly (Progress 0.44 -> 0.58)
      if (hud) {
        tl.to(hud, {
          opacity: 1,
          y: 0,
          duration: 0.14,
          ease: 'power2.out'
        }, 0.44);
      }
    }

    ScrollTrigger.refresh();

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      observer.disconnect();
    };
  }, [isTabletOrDesktop]);

  const handleCameraChange = (azimuth: number, elevation: number, distance: number) => {
    setCameraTelemetry({ azimuth, elevation, distance });
  };

  const handleExploreServicesClick = () => {
    if (onExploreVR) {
      onExploreVR();
    } else {
      smoothScrollTo('#services', { offset: -70 });
    }
  };

  // --- MOBILE VIEW (<768px): Normal Unpinned Sequential Block ---
  if (!isTabletOrDesktop) {
    return (
      <section 
        ref={containerRef}
        id="hero"
        className="w-full bg-[#08090B] pt-24 pb-14 px-4 border-b border-white/10 relative overflow-hidden"
      >
        {/* Architectural grid overlay */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-8 relative z-10">
          {/* Header & Hero Intro */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="amber" size="md">
                Architectural Visualization & Immersive VR
              </Badge>
              <div className="flex items-center gap-2 font-mono-tech text-xs text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>BIMQP Ecosystem</span>
              </div>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-[1.08]">
              EXPERIENCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-amber-500">
                TOMORROW
              </span>{' '}
              TODAY.
            </h1>

            <p className="text-white/80 text-sm leading-relaxed font-sans">
              Step inside unbuilt architecture, interior designs, and 3D BIM models before construction begins. Evaluate spatial design from a true human perspective and make confident, coordinated decisions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenConsultation && onOpenConsultation()}
                className="btn-cta-premium w-full sm:w-auto px-7 py-3.5 text-xs flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExploreServicesClick}
                className="btn-cta-secondary w-full sm:w-auto px-6 py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Glasses className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Explore VR Services</span>
              </button>
            </div>

            {/* Benefit Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/10 text-xs font-mono-tech text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Human-Scale Review</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Coordinated 3D BIM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pre-Build Clarity</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D BIM Viewer Card (Non-interactive on mobile to preserve touch scroll) */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-white/15 bg-[#08090B] shadow-2xl pointer-events-none">
            {isNearViewport && (
              <Suspense
                fallback={
                  <div className="w-full h-full bg-[#08090B] flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-sky-400/20 border-t-sky-400 animate-spin mb-3" />
                    <span className="font-mono-tech text-[10px] text-gray-400 tracking-widest uppercase">
                      LOADING 3D ENGINE
                    </span>
                  </div>
                }
              >
                <BIMModelViewer3D interactive={false} onCameraChange={handleCameraChange} />
              </Suspense>
            )}

            {/* Mobile Top HUD Overlay */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono-tech text-white">
                <Box className="w-3 h-3 text-sky-400" />
                <span>WEBGL 3D</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-sky-400/30 text-[10px] font-mono-tech text-sky-400">
                <Activity className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>AZM: {cameraTelemetry.azimuth.toFixed(0)}°</span>
                <span className="text-white/30">|</span>
                <span>DST: {cameraTelemetry.distance.toFixed(0)}m</span>
              </div>
            </div>

            {/* Mobile Bottom Badge */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono-tech text-white/80">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>1:1 SCALE EXPLORER</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono-tech text-amber-400">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>LIVE MODEL</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- TABLET / DESKTOP VIEW (>=768px): Hero + Pinned VR Lens Sequence ---
  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative w-full h-[300vh] bg-[#08090B]"
    >
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#08090B]">
        
        {/* Layer 1 (z-10 at rest, z-35 on scroll): 3D BIM Architectural Model Viewport */}
        <div ref={bimContainerRef} className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none">
          {isNearViewport && (
            <Suspense
              fallback={
                <div className="w-full h-full bg-[#08090B] flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-2 border-sky-400/20 border-t-sky-400 animate-spin mb-3" />
                  <span className="font-mono-tech text-[10px] text-gray-400 tracking-widest uppercase">
                    INITIALIZING 3D ENGINE
                  </span>
                </div>
              }
            >
              <BIMModelViewer3D
                interactive={true}
                onCameraChange={handleCameraChange}
              />
            </Suspense>
          )}

          {/* Top & Bottom Gradient Vignettes */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#08090B] via-[#08090B]/60 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* Layer 2 (z-20): Solid Blackout Overlay (#000000) */}
        <div 
          ref={blackoutRef}
          className="absolute inset-0 bg-[#000000] z-20 pointer-events-none opacity-0 will-change-[opacity]"
        />

        {/* Layer 3 (z-25): Photorealistic VR Headset Mask & Push-Through Lens Layer */}
        <div
          ref={headsetContainerRef}
          className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none overflow-hidden bg-[#08090B]"
          style={{ perspective: '1200px' }}
        >
          <div className="relative flex flex-col items-center justify-center">
            <img
              ref={headsetImgRef}
              src="/assets/images/vr-headset-mask.webp"
              alt="Virtual Reality Headset Lens Transition"
              className="w-[85vw] max-w-[720px] sm:max-w-[840px] object-contain select-none will-change-transform opacity-90 sm:opacity-95"
              style={{ transformStyle: 'preserve-3d' }}
              loading="lazy"
              width={840}
              height={420}
            />
          </div>
        </div>

        {/* Layer 3.5 (z-40): Hero Text Content Overlay (Visible on initial load, fades out on scroll) */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 z-40 flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 pointer-events-none max-w-7xl mx-auto w-full left-0 right-0"
        >
          {/* Top Hero Headline Content */}
          <div className="max-w-4xl space-y-6 my-auto pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="amber" size="md">
                Architectural Visualization & Immersive VR
              </Badge>
              <div className="flex items-center gap-2 font-mono-tech text-xs text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>BIMQP Ecosystem</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              <span className="block">EXPERIENCE</span>
              <span className="block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-amber-500">
                  TOMORROW
                </span>{' '}
                TODAY.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/85 font-normal leading-relaxed max-w-2xl font-sans drop-shadow-md">
              Step inside unbuilt architecture, interior designs, and 3D BIM models before construction begins. Evaluate spatial design from a true human perspective and make confident, coordinated decisions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenConsultation && onOpenConsultation()}
                className="px-7 py-3.5 rounded-sm bg-gradient-to-r from-accent-bronze-light to-accent-amber-gold hover:from-[#E2B689] hover:to-accent-amber-bright text-[#08090B] font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(212,163,115,0.4)] flex items-center gap-2.5 cursor-pointer group pointer-events-auto"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExploreServicesClick}
                className="px-6 py-3.5 rounded-sm bg-black/60 hover:bg-black/80 text-white font-mono-tech text-xs font-semibold tracking-wider uppercase border border-white/25 hover:border-sky-400 transition-all flex items-center gap-2.5 cursor-pointer shadow-lg backdrop-blur-md pointer-events-auto"
              >
                <Glasses className="w-4 h-4 text-sky-400" />
                <span>Explore Immersive Services</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 text-xs font-mono-tech text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Human-Scale Spatial Review</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Coordinated 3D BIM Models</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pre-Construction Clarity</span>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15 w-full">
            <div className="flex items-center gap-3 font-mono-tech text-xs text-white/80 tracking-[0.25em] uppercase font-semibold">
              <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center shadow-xs">
                <ChevronDown className="w-4 h-4 text-sky-400 animate-bounce" />
              </div>
              <span>SCROLL TO DIVE THROUGH VR LENS</span>
            </div>
            <div className="font-mono-tech text-xs text-white/50">
              [ 1:1 VIRTUAL SPATIAL ENGINE ]
            </div>
          </div>
        </div>

        {/* Layer 4 (z-30): HUD Elements Overlay (Fades in after diving through lens) */}
        <div 
          ref={hudRef}
          className="absolute inset-0 pointer-events-none z-30 p-6 md:p-12 flex flex-col justify-between"
        >
          {/* Top Header */}
          <div className="flex justify-between items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="font-mono-tech text-[10px] text-white/90 tracking-widest font-medium uppercase">
                Interactive BIM Explorer
              </span>
            </div>
            
            {/* Telemetry HUD */}
            <div className="hidden md:flex flex-col items-end gap-1 font-mono-tech text-[10px] text-sky-400 tracking-widest bg-black/50 backdrop-blur-md border border-sky-400/20 px-3 py-2 rounded-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-sky-400" />
                <span>TELEMETRY ACTIVE</span>
              </div>
              <div className="text-white/60 mt-1">AZM: {cameraTelemetry.azimuth.toFixed(1)}°</div>
              <div className="text-white/60">ELV: {cameraTelemetry.elevation.toFixed(1)}°</div>
              <div className="text-white/60">DST: {cameraTelemetry.distance.toFixed(1)}m</div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="max-w-xl bg-black/50 backdrop-blur-md border-l-2 border-sky-400 pl-6 py-4 rounded-r-lg shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-3">
              Explore the <span className="text-sky-400 font-medium">Digital Twin</span>
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-lg mb-5 leading-relaxed font-sans">
              Drag to orbit, scroll to zoom, and pan across the architectural model. Experience true 1:1 scale before a single brick is laid.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono-tech text-white/60 tracking-wider">
              <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-md border border-white/10">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span>WEBGL 3D</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-md border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>INTERACTIVE ORBIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullBleedShowcase;

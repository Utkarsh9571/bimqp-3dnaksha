import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Sparkles, Activity, Box, Glasses, Radio } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/animations';
import { useIsTabletOrDesktop } from '../../hooks/useMediaQuery';

// Lazy-load the Three.js BIM Model Viewer
const BIMModelViewer3D = lazy(() => import('../ui/BIMModelViewer3D'));

export const FullBleedShowcase: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bimContainerRef = useRef<HTMLDivElement>(null);
  const headsetContainerRef = useRef<HTMLDivElement>(null);
  const headsetImgRef = useRef<HTMLImageElement>(null);
  const blackoutRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8
      }
    });

    if (headsetImg && headsetContainer && blackout) {
      // 1. Initial states
      gsap.set(headsetContainer, { opacity: 1, visibility: 'visible', pointerEvents: 'none' });
      gsap.set(headsetImg, { scale: 1, rotateX: 0, rotateY: 0, transformOrigin: '50% 50%' });
      gsap.set(blackout, { opacity: 0, visibility: 'visible', pointerEvents: 'none' });
      if (hud) gsap.set(hud, { opacity: 0, y: 30 });

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

      // 4. Hide Headset completely during blackout
      tl.set(headsetContainer, {
        opacity: 0,
        visibility: 'hidden'
      }, 0.38);

      // 5. Blackout fades out to reveal interactive BIM model (Progress 0.38 -> 0.50)
      tl.to(blackout, {
        opacity: 0,
        duration: 0.12,
        ease: 'power1.out',
        onComplete: () => {
          gsap.set(blackout, { visibility: 'hidden', pointerEvents: 'none' });
        },
        onReverseComplete: () => {
          gsap.set(blackout, { visibility: 'visible', pointerEvents: 'none' });
        }
      }, 0.38);

      // 6. HUD elements fade in smoothly
      if (hud) {
        tl.to(hud, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power2.out'
        }, 0.44);
      }
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      observer.disconnect();
    };
  }, [isTabletOrDesktop]);

  const handleCameraChange = (azimuth: number, elevation: number, distance: number) => {
    setCameraTelemetry({ azimuth, elevation, distance });
  };

  // --- MOBILE VIEW (<768px): Normal Unpinned Sequential Block with Rich VR & Telemetry Styling ---
  if (!isTabletOrDesktop) {
    return (
      <section 
        ref={containerRef}
        id="showcase"
        className="w-full bg-[#08090B] py-14 px-4 border-t border-b border-white/10"
      >
        <div className="max-w-xl mx-auto space-y-6">
          {/* Header & Intro */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono-tech text-[#38BDF8]">
              <Glasses className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>IMMERSIVE VR & 3D BIM TWIN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Explore the <span className="text-[#38BDF8] font-medium">Digital Twin</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Step inside unbuilt spaces at true 1:1 scale before breaking ground.
            </p>
          </div>

          {/* Inline Interactive 3D BIM Viewer (Normal height, no pinning) */}
          <div className="relative w-full h-[430px] rounded-lg overflow-hidden border border-white/15 bg-[#08090B] shadow-2xl">
            {isNearViewport && (
              <Suspense
                fallback={
                  <div className="w-full h-full bg-[#08090B] flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#38BDF8]/20 border-t-[#38BDF8] animate-spin mb-3" />
                    <span className="font-mono-tech text-[10px] text-gray-400 tracking-widest uppercase">
                      LOADING 3D ENGINE
                    </span>
                  </div>
                }
              >
                <BIMModelViewer3D onCameraChange={handleCameraChange} />
              </Suspense>
            )}

            {/* Mobile Top HUD Telemetry Overlay */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono-tech text-white">
                <Box className="w-3 h-3 text-[#38BDF8]" />
                <span>WEBGL 3D</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-[#38BDF8]/30 text-[10px] font-mono-tech text-[#38BDF8]">
                <Activity className="w-3 h-3 text-[#38BDF8] animate-pulse" />
                <span>AZM: {cameraTelemetry.azimuth.toFixed(0)}°</span>
                <span className="text-white/30">|</span>
                <span>DST: {cameraTelemetry.distance.toFixed(0)}m</span>
              </div>
            </div>

            {/* Mobile Bottom Badge */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono-tech text-white/80">
                <Radio className="w-3 h-3 text-[#10B981] animate-pulse" />
                <span>1:1 SCALE EXPLORER</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono-tech text-[#E5A93B]">
                <Sparkles className="w-3 h-3 text-[#E5A93B]" />
                <span>LIVE MODEL</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- TABLET / DESKTOP VIEW (>=768px): Full 300vh Pinned VR Lens Sequence ---
  return (
    <section 
      ref={containerRef}
      id="showcase"
      className="relative w-full h-[300vh] bg-[#08090B]"
    >
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#08090B]">
        
        {/* Layer 1 (z-10): 3D BIM Architectural Model Viewport */}
        <div ref={bimContainerRef} className="absolute inset-0 w-full h-full overflow-hidden z-10">
          {isNearViewport && (
            <Suspense
              fallback={
                <div className="w-full h-full bg-[#08090B] flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#38BDF8]/20 border-t-[#38BDF8] animate-spin mb-3" />
                  <span className="font-mono-tech text-[10px] text-gray-400 tracking-widest uppercase">
                    INITIALIZING 3D ENGINE
                  </span>
                </div>
              }
            >
              <BIMModelViewer3D
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
              src="/assets/images/vr-headset-mask.jpg"
              alt="Virtual Reality Headset Lens Transition"
              className="w-[85vw] max-w-[720px] sm:max-w-[840px] object-contain select-none will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            />
            
            {/* Ambient Headset Title Prompt */}
            <div className="absolute bottom-[-15%] flex flex-col items-center gap-2 font-mono-tech text-center pointer-events-none">
              <span className="text-[10px] sm:text-xs text-[#38BDF8] tracking-[0.3em] uppercase bg-[#08090B]/80 px-4 py-1.5 rounded-full border border-[#38BDF8]/30 shadow-lg animate-pulse">
                SCROLL TO DIVE THROUGH LENS
              </span>
            </div>
          </div>
        </div>

        {/* Layer 4 (z-30): HUD Elements Overlay */}
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
            <div className="hidden md:flex flex-col items-end gap-1 font-mono-tech text-[10px] text-[#38BDF8] tracking-widest bg-black/50 backdrop-blur-md border border-[#38BDF8]/20 px-3 py-2 rounded-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#38BDF8]" />
                <span>TELEMETRY ACTIVE</span>
              </div>
              <div className="text-white/60 mt-1">AZM: {cameraTelemetry.azimuth.toFixed(1)}°</div>
              <div className="text-white/60">ELV: {cameraTelemetry.elevation.toFixed(1)}°</div>
              <div className="text-white/60">DST: {cameraTelemetry.distance.toFixed(1)}m</div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="max-w-2xl bg-black/40 backdrop-blur-md border-l-2 border-[#38BDF8] pl-6 py-4 rounded-r-lg shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-3">
              Explore the <span className="text-[#38BDF8] font-medium">Digital Twin</span>
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-lg mb-5 leading-relaxed font-sans">
              Drag to orbit, scroll to zoom, and pan across the architectural model. Experience true 1:1 scale before a single brick is laid.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono-tech text-white/60 tracking-wider">
              <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-md border border-white/10">
                <Box className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>WEBGL 3D</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-md border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A93B]" />
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

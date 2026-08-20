import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Sparkles, Activity, Box } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/animations';

// Lazy-load the Three.js BIM Model Viewer
const BIMModelViewer3D = lazy(() => import('../ui/BIMModelViewer3D'));

export const FullBleedShowcase: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bimContainerRef = useRef<HTMLDivElement>(null);
  const blackoutRef = useRef<HTMLDivElement>(null);
  
  const [isNearViewport, setIsNearViewport] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [cameraTelemetry, setCameraTelemetry] = useState<{ azimuth: number; elevation: number; distance: number }>({
    azimuth: 42,
    elevation: 15,
    distance: 120
  });

  const modelUrl = '/assets/models/residential-building-wireframe.glb';

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const container = containerRef.current;
    
    if (isReduced || !container) {
      setIsNearViewport(true); // Load immediately if reduced motion
      return;
    }

    // Intersection Observer to lazy-load the Three.js chunk only when near
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0.01 }
    );
    observer.observe(container);

    // ScrollTrigger to track progress through the pinned section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      }
    });

    const blackout = blackoutRef.current;

    if (blackout) {
      // Init states
      gsap.set(blackout, { opacity: 0, visibility: 'visible', pointerEvents: 'none' });

      // Step 3: Fade to solid #000000 blackout to hide the 3D geometry swap
      tl.to(blackout, {
        opacity: 1,
        duration: 0.1,
        ease: 'none'
      }, 0.3);

      // Step 4: Short hold, then fade out Blackout to reveal BIM geometry
      tl.to(blackout, {
        opacity: 0,
        duration: 0.1,
        ease: 'power1.out',
        // CRITICAL: Explicitly remove pointer-events and visibility once faded out
        onComplete: () => {
          gsap.set(blackout, { visibility: 'hidden', pointerEvents: 'none' });
        },
        onReverseComplete: () => {
          gsap.set(blackout, { visibility: 'visible', pointerEvents: 'none' });
        }
      }, 0.45);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      observer.disconnect();
    };
  }, []);

  const handleCameraChange = (azimuth: number, elevation: number, distance: number) => {
    setCameraTelemetry({ azimuth, elevation, distance });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#08090B]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#08090B]">
        
        {/* Blackout Transition Overlay (solid #000000) */}
        <div 
          ref={blackoutRef}
          className="absolute inset-0 bg-[#000000] z-20 pointer-events-none opacity-0 will-change-[opacity]"
        />

        {/* Shared Single 3D Canvas Viewport */}
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
                scrollProgress={scrollProgress}
                onCameraChange={handleCameraChange}
              />
            </Suspense>
          )}

          {/* Top Gradient Vignette for smooth transition from previous section */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#08090B] via-[#08090B]/60 to-transparent pointer-events-none z-10" />
          
          {/* Bottom Gradient Vignette for smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* HUD Elements Overlay (pointer-events-none so canvas gets all interactions) */}
        <div className="absolute inset-0 pointer-events-none z-20 p-6 md:p-12 flex flex-col justify-between">
          
          {/* Top Header */}
          <div className="flex justify-between items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="font-mono-tech text-[10px] text-white/90 tracking-widest font-medium uppercase">
                Interactive BIM Explorer
              </span>
            </div>
            
            {/* Telemetry HUD */}
            <div className="hidden md:flex flex-col items-end gap-1 font-mono-tech text-[10px] text-[#38BDF8] tracking-widest bg-black/40 backdrop-blur-md border border-[#38BDF8]/20 px-3 py-2 rounded-sm">
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
          <div className="max-w-2xl bg-black/20 backdrop-blur-sm border-l-2 border-[#38BDF8] pl-6 py-2 rounded-r-lg">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">
              Explore the <span className="text-[#38BDF8] font-medium">Digital Twin</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-lg mb-6 leading-relaxed">
              Drag to orbit, scroll to zoom, and pan across the architectural model. Experience true 1:1 scale before a single brick is laid.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono-tech text-white/50 tracking-wider">
              <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-md border border-white/5">
                <Box className="w-3.5 h-3.5" />
                <span>WEBGL RENDER</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-md border border-white/5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>RTX ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullBleedShowcase;

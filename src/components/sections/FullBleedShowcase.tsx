import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { Sparkles, Glasses, Radio, Activity, Box } from 'lucide-react';
import { VRLensEffect } from '../ui/VRLensEffect';
import { gsap, prefersReducedMotion } from '../../lib/animations';

// Lazy-load the Three.js BIM Model Viewer
const BIMModelViewer3D = lazy(() => import('../ui/BIMModelViewer3D'));

interface FullBleedShowcaseProps {
  modelUrl?: string;
  captionTitle?: string;
  captionSubtitle?: string;
}

export const FullBleedShowcase: React.FC<FullBleedShowcaseProps> = ({
  modelUrl,
  captionTitle = 'INTERACTIVE BIM & 3D ARCHITECTURAL MODEL',
  captionSubtitle = 'Click and drag to orbit around the structure. Evaluate spatial volumes, structural steel, and material daylighting in real time.'
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const liveVrBadgeRef = useRef<HTMLDivElement>(null);
  const redDotRef = useRef<HTMLSpanElement>(null);
  const vrHeadsetPreviewRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [cameraTelemetry, setCameraTelemetry] = useState<{ azimuth: number; elevation: number; distance: number }>({
    azimuth: 42,
    elevation: 25,
    distance: 18.2
  });

  const handleCameraChange = useCallback((azimuth: number, elevation: number, distance: number) => {
    setCameraTelemetry({ azimuth, elevation, distance });
  }, []);

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const container = containerRef.current;
    const caption = captionRef.current;
    const liveVrBadge = liveVrBadgeRef.current;
    const redDot = redDotRef.current;
    const vrHeadsetPreview = vrHeadsetPreviewRef.current;

    if (!container || !caption) return;

    if (isReduced) {
      gsap.set([caption, liveVrBadge, vrHeadsetPreview], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Set initial element states
    gsap.set(caption, { opacity: 0, y: 35 });
    gsap.set('.caption-accent-line', { scaleX: 0, transformOrigin: 'center' });
    gsap.set(liveVrBadge, { opacity: 0, scale: 0.85, y: 15 });
    gsap.set(vrHeadsetPreview, { opacity: 0, scale: 0.85, y: -15 });

    // 1. Infinite Red Dot Pulse Animation (~1.5s total cycle)
    const redDotTween = gsap.to(redDot, {
      scale: 1.35,
      opacity: 0.6,
      repeat: -1,
      yoyo: true,
      duration: 0.75,
      ease: 'power1.inOut'
    });

    // 2. Infinite Subtle Idle Float Animation for Top-Right Mini VR UI Preview
    const floatTween = gsap.to(vrHeadsetPreview, {
      y: '+=8',
      repeat: -1,
      yoyo: true,
      duration: 2.2,
      ease: 'sine.inOut',
      delay: 0.4
    });

    // 3. GSAP ScrollTrigger Pinned Timeline (Ties camera arc to scroll)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=100%', // Pinned for 100% viewport height
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      }
    });

    // Stagger 1: LIVE VR Badge reveals shortly after entering viewport
    tl.to(
      liveVrBadge,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'back.out(1.4)',
        duration: 0.25
      },
      0.06
    );

    // Stagger 2: Floating Mini VR Headset Preview reveals next
    tl.to(
      vrHeadsetPreview,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'back.out(1.4)',
        duration: 0.28
      },
      0.14
    );

    // Stagger 3: Caption bar fades in & slides up
    tl.to(
      caption,
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.35
      },
      0.22
    );

    // Caption accent line expands
    tl.to(
      '.caption-accent-line',
      {
        scaleX: 1,
        ease: 'power2.out',
        duration: 0.3
      },
      0.3
    );

    return () => {
      redDotTween.kill();
      floatTween.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-showcase"
      className="relative h-screen w-full overflow-hidden bg-[#08090B] select-none flex items-center justify-center border-t border-b border-gray-200"
      aria-label="Interactive 3D Architectural BIM Showcase"
    >
      {/* Interactive 3D Model Viewer Viewport */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
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
            modelUrl={modelUrl}
            scrollProgress={scrollProgress}
            onCameraChange={handleCameraChange}
          />
        </Suspense>

        {/* Top Gradient Vignette for smooth transition */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F8F7F5] via-[#F8F7F5]/40 to-transparent pointer-events-none z-10" />

        {/* Bottom Gradient Vignette for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8F7F5] via-[#F8F7F5]/50 to-transparent pointer-events-none z-10" />

        {/* VR Optical Lens Effect Overlay (Curvature, Chromatic Aberration, Glint) */}
        <VRLensEffect
          triggerElement={containerRef.current}
          fovLabel="FOV 110° // 3D BIM GEOMETRY // DUAL-4K VR"
        />
      </div>

      {/* 1. Bottom-Left Pinned "LIVE VR" Badge with Pulsing Red Dot */}
      <div
        ref={liveVrBadgeRef}
        className="absolute bottom-8 sm:bottom-10 left-6 sm:left-10 z-30 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#08090B]/88 backdrop-blur-xl border border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.3)]">
          {/* Pulsing Red Dot */}
          <div className="relative flex items-center justify-center w-3 h-3">
            <span
              ref={redDotRef}
              className="absolute w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_10px_#EF4444]"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-white relative z-10" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs font-bold text-white tracking-widest uppercase">
              LIVE 3D BIM
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="font-mono-tech text-[10px] text-[#EF4444] font-semibold">
              INTERACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top-Right Floating Mini VR Headset UI Preview with Live Camera Telemetry */}
      <div
        ref={vrHeadsetPreviewRef}
        className="absolute top-8 sm:top-10 right-6 sm:right-10 z-30 pointer-events-auto"
      >
        <div className="rounded-lg bg-[#08090B]/90 backdrop-blur-xl border border-white/20 p-3.5 shadow-2xl w-60 sm:w-64 corner-crosshairs">
          {/* Mini VR UI Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono-tech">
            <div className="flex items-center gap-1.5 text-[#38BDF8]">
              <Glasses className="w-4 h-4" />
              <span className="font-bold tracking-wider">BIM TELEMETRY</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#10B981]">
              <Activity className="w-3 h-3" />
              <span>60 FPS</span>
            </div>
          </div>

          {/* Mini Stereoscopic Viewport Preview Box */}
          <div className="relative h-16 rounded bg-[#0E1013] border border-white/10 overflow-hidden flex flex-col justify-between p-2 mb-2 bg-grid-dense font-mono-tech text-[9px]">
            <div className="flex items-center justify-between text-[#8A92A0]">
              <span>AZIMUTH: <strong className="text-white">{cameraTelemetry.azimuth}°</strong></span>
              <span>ELEV: <strong className="text-white">{cameraTelemetry.elevation}°</strong></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#38BDF8]">DIST: {cameraTelemetry.distance}M</span>
              <span className="text-[#10B981] font-semibold">AUTOCAD / REVIT</span>
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#8A92A0]">
            <div className="flex items-center gap-1">
              <Radio className="w-3 h-3 text-[#E5A93B] animate-pulse" />
              <span>WEBGL 2.0</span>
            </div>
            <span className="text-[#38BDF8]">HARDWARE ACCEL</span>
          </div>
        </div>
      </div>

      {/* Top-Left Spatial HUD Marker */}
      <div
        ref={hudRef}
        className="absolute inset-0 p-6 md:p-10 pointer-events-none z-20 flex flex-col justify-between"
      >
        <div className="flex items-center justify-start font-mono-tech text-[11px]">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-[#08090B]/80 backdrop-blur-md border border-white/15 text-[#38BDF8]">
            <Box className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="tracking-widest uppercase">SPATIAL BIM VIEWER // GLTF 2.0</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Center Floating Caption Bar */}
      <div
        ref={captionRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-3xl pointer-events-auto"
      >
        <div className="relative rounded-sm bg-white/94 backdrop-blur-xl border border-gray-200/90 px-6 sm:px-10 py-5 sm:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-center overflow-hidden corner-crosshairs group">
          {/* Top Accent Glow Line */}
          <div
            className="caption-accent-line absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #D97706 30%, #0284C7 70%, transparent 100%)'
            }}
          />

          {/* Micro Tagline */}
          <div className="inline-flex items-center gap-2 mb-2 font-mono-tech text-[10px] sm:text-xs text-[#9A6A38] tracking-[0.2em] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>ARCHITECTURAL 3D DELIVERABLES</span>
          </div>

          {/* Main Caption Title */}
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0A0A0A] tracking-tight leading-tight uppercase mb-2">
            <span>{captionTitle}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#4B5563] font-mono-tech max-w-xl mx-auto leading-relaxed">
            {captionSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FullBleedShowcase;

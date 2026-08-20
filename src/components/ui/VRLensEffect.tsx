import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/animations';

interface VRLensEffectProps {
  className?: string;
  enableGlint?: boolean;
  enableChromaticAberration?: boolean;
  enableCurvatureVignette?: boolean;
  enableFovOverlay?: boolean;
  fovLabel?: string;
  triggerElement?: HTMLElement | null;
}

/**
 * VRLensEffect
 * 
 * Reusable optical overlay mimicking the optics of a high-end VR headset:
 * 1. Aspheric Fresnel lens radial barrel falloff & dark peripheral vignette.
 * 2. Subtle RGB chromatic aberration edge fringing (cyan/red split at corners).
 * 3. Optical corner alignment brackets & telemetry markings.
 * 4. Single-pass diagonal lens glint sweep upon section entry (off-thread IntersectionObserver, respects prefers-reduced-motion).
 */
export const VRLensEffect: React.FC<VRLensEffectProps> = ({
  className = '',
  enableGlint = true,
  enableChromaticAberration = true,
  enableCurvatureVignette = true,
  enableFovOverlay = true,
  fovLabel = 'FOV 110° // OPTICAL PASSTHROUGH // DUAL-4K',
  triggerElement
}) => {
  const glintRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const glint = glintRef.current;
    const targetTrigger = triggerElement || containerRef.current;

    if (!enableGlint || isReduced || !glint || !targetTrigger) return;

    // Reset glint off-screen
    gsap.set(glint, {
      xPercent: -150,
      yPercent: -150,
      opacity: 0
    });

    // Use native IntersectionObserver (zero main-thread blocking)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(glint, {
              xPercent: 180,
              yPercent: 180,
              opacity: 1,
              duration: 1.3,
              ease: 'power2.out',
              onComplete: () => {
                gsap.to(glint, { opacity: 0, duration: 0.3 });
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(targetTrigger);

    return () => {
      observer.disconnect();
    };
  }, [enableGlint, triggerElement]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-20 select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Curvature & Radial Barrel Vignette */}
      {enableCurvatureVignette && (
        <>
          {/* Deep Peripheral Vignette (Curved FOV lens cutoff) */}
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(6, 8, 12, 0.28) 68%, rgba(4, 5, 8, 0.68) 85%, rgba(2, 3, 5, 0.88) 100%)'
            }}
          />

          {/* Fresnel Optical Edge Ring (Inner Lens Rim Reflection) */}
          <div className="absolute inset-2 sm:inset-4 rounded-[36px] sm:rounded-[56px] border border-white/10 shadow-[inset_0_0_60px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(56,189,248,0.06)]" />
        </>
      )}

      {/* 2. Chromatic Aberration Edge Fringing (Subtle Cyan & Red Edge Shift) */}
      {enableChromaticAberration && (
        <>
          {/* Red/Amber Fringe Layer (Shifted Right/Down) */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-70 transform translate-x-[1px] translate-y-[0.5px]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 65%, rgba(239, 68, 68, 0.08) 84%, rgba(217, 119, 6, 0.18) 100%)'
            }}
          />

          {/* Cyan/Blue Fringe Layer (Shifted Left/Up) */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-70 transform -translate-x-[1px] -translate-y-[0.5px]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 65%, rgba(56, 189, 248, 0.1) 84%, rgba(37, 99, 235, 0.2) 100%)'
            }}
          />
        </>
      )}

      {/* 3. Sweeping Lens Glint Reflection */}
      {enableGlint && (
        <div
          ref={glintRef}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rotate-[35deg] pointer-events-none opacity-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 42%, rgba(56, 189, 248, 0.08) 48%, rgba(255, 255, 255, 0.22) 50%, rgba(212, 163, 115, 0.12) 52%, transparent 58%)',
            filter: 'blur(3px)'
          }}
        />
      )}

      {/* 4. VR Headset Optical HUD Reticle & Corner Brackets */}
      {enableFovOverlay && (
        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between pointer-events-none">
          {/* Top Optical Telemetry */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 font-mono-tech text-[9px] sm:text-[10px] text-white/60 tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>{fovLabel}</span>
            </div>
          </div>

          {/* Center Precision Optical Crosshairs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-30 flex items-center justify-center">
            <div className="w-full h-[1px] bg-white/40 absolute" />
            <div className="h-full w-[1px] bg-white/40 absolute" />
            <div className="w-4 h-4 rounded-full border border-white/50" />
          </div>

          {/* Corner Optical Alignment Brackets */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-xs" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white/20 rounded-tr-xs" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-white/20 rounded-bl-xs" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-xs" />
        </div>
      )}
    </div>
  );
};

export default VRLensEffect;

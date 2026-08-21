import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Compass, Navigation, Radio, Layers } from 'lucide-react';
import { VRLensEffect } from '../ui/VRLensEffect';
import { ScrollTrigger, prefersReducedMotion } from '../../lib/animations';

interface ScrollWalkthroughViewerProps {
  totalFrames?: number;
  /** Optional custom URL pattern for real frames, e.g. "/frames/frame_%03d.jpg" */
  frameUrlPattern?: string;
  /** Optional explicit array of image URLs */
  frameUrls?: string[];
  className?: string;
}

/**
 * ScrollWalkthroughViewer
 * 
 * Apple-style canvas scroll-scrubbed image-sequence viewer.
 * Ties scroll progress linearly to frame rendering with ultra-fast real-time RAF canvas drawing.
 * Features live HUD overlays: Frame Counter, Dynamic Rotating Compass, and Interactive 2D Floor Plan mini-map.
 */
export const ScrollWalkthroughViewer: React.FC<ScrollWalkthroughViewerProps> = ({
  totalFrames = 81,
  frameUrlPattern,
  frameUrls,
  className = ''
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preloading & Loading state
  const [loadProgress, setLoadProgress] = useState<number>(100);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  // References for performant rendering
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentDrawnFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  /**
   * Directly render procedural 3D architectural perspective walkthrough onto canvas in real-time
   */
  const renderProceduralFrame = useCallback((ctx: CanvasRenderingContext2D, frameIdx: number, total: number, width: number, height: number) => {
    const p = frameIdx / (total - 1 || 1); // 0 to 1 progress

    // Dark Architectural Room Background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width * 0.7);
    bgGrad.addColorStop(0, '#11141A');
    bgGrad.addColorStop(0.6, '#0B0D11');
    bgGrad.addColorStop(1, '#050608');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Perspective Camera Coordinates based on progress
    const camZ = p * 600;
    const vanishingX = width / 2 + Math.sin(p * Math.PI * 1.5) * (width * 0.12);
    const vanishingY = height * 0.46 + Math.cos(p * Math.PI) * (height * 0.04);

    // Floor Grid (Perspective Lines)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
    ctx.lineWidth = 1.5;
    for (let x = -width * 0.3; x <= width * 1.3; x += width * 0.08) {
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(vanishingX + (x - width / 2) * 0.05, vanishingY);
      ctx.stroke();
    }

    // Horizontal Floor Beams
    for (let y = height; y >= vanishingY; y -= Math.max(6, (y - vanishingY) * 0.22)) {
      ctx.strokeStyle = 'rgba(212, 163, 115, 0.18)';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Ceiling Trusses & Beams
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    for (let x = 0; x <= width; x += width * 0.12) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(vanishingX + (x - width / 2) * 0.08, vanishingY);
      ctx.stroke();
    }

    // Architectural Structural Pillars (Left & Right)
    const pillars = [
      { baseX: width * 0.15 + (1 - p) * 120, topY: height * 0.2, h: height * 0.8, color: '#38BDF8' },
      { baseX: width * 0.32 + (1 - p) * 80, topY: height * 0.3, h: height * 0.7, color: '#D4A373' },
      { baseX: width * 0.68 - (1 - p) * 80, topY: height * 0.3, h: height * 0.7, color: '#D4A373' },
      { baseX: width * 0.85 - (1 - p) * 120, topY: height * 0.2, h: height * 0.8, color: '#38BDF8' }
    ];

    pillars.forEach((pil) => {
      ctx.fillStyle = `${pil.color}15`;
      ctx.strokeStyle = `${pil.color}50`;
      ctx.lineWidth = 1.5;
      ctx.fillRect(pil.baseX - 16, pil.topY, 32, pil.h);
      ctx.strokeRect(pil.baseX - 16, pil.topY, 32, pil.h);

      // Connect pillar top to perspective vanishing point
      ctx.beginPath();
      ctx.moveTo(pil.baseX, pil.topY);
      ctx.lineTo(vanishingX, vanishingY);
      ctx.stroke();
    });

    // Spatial Room Zone Label
    const zones = [
      'ENTRY FOYER & VESTIBULE',
      'MAIN RESIDENTIAL ATRIUM',
      'CENTRAL LIVING & MEZZANINE',
      'KITCHEN & DINING SUITE',
      'PANORAMIC TERRACE VISTA'
    ];
    const currentZone = zones[Math.min(zones.length - 1, Math.floor(p * zones.length))];

    // Central Walkthrough Reticle & HUD overlay rendered into frame
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(vanishingX, vanishingY, 35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(vanishingX, vanishingY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw Big Tech Frame Stamp
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'bold 28px "Space Grotesk", sans-serif';
    ctx.fillText(`FRAME_${String(frameIdx).padStart(3, '0')}.RAW`, 60, 80);

    ctx.fillStyle = '#D4A373';
    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.fillText(`SPATIAL VECTOR: [X: ${(p * 24.5).toFixed(2)}M, Y: 3.20M, Z: ${(camZ * 0.05).toFixed(2)}M]`, 60, 115);
    ctx.fillText(`ZONE: ${currentZone}`, 60, 145);

    // Watermark Stamp
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.font = 'bold 64px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('3D NAKSHA BIM WALKTHROUGH', width / 2, height * 0.52);
    ctx.textAlign = 'left';
  }, []);

  // Preload real images if URLs are provided
  useEffect(() => {
    if (!frameUrls && !frameUrlPattern) {
      setIsLoaded(true);
      setLoadProgress(100);
      return;
    }

    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];

    const preloadRealImages = async () => {
      let loadedCount = 0;
      for (let i = 0; i < totalFrames; i++) {
        if (isCancelled) return;
        const img = new Image();
        const url = frameUrls ? frameUrls[i] : frameUrlPattern?.replace('%03d', String(i).padStart(3, '0')) || '';
        img.src = url;
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        });
        loadedImages.push(img);
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      }
      if (!isCancelled) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    preloadRealImages();
    return () => {
      isCancelled = true;
    };
  }, [totalFrames, frameUrls, frameUrlPattern]);

  /**
   * Efficient RAF draw loop for smooth 60fps scrubbing
   */
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const safeIdx = Math.max(0, Math.min(totalFrames - 1, Math.floor(frameIndex)));
      if (currentDrawnFrameRef.current === safeIdx) return;
      currentDrawnFrameRef.current = safeIdx;

      // Handle resize / hi-dpi scaling
      const width = canvas.width;
      const height = canvas.height;

      const img = imagesRef.current[safeIdx];
      if (img && img.complete && img.naturalWidth > 0) {
        // Draw real preloaded image frame
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
      } else {
        // Render procedural frame directly
        renderProceduralFrame(ctx, safeIdx, totalFrames, width, height);
      }
    },
    [totalFrames, renderProceduralFrame]
  );

  // RAF Scheduler
  const scheduleFrameDraw = useCallback(
    (frameIdx: number) => {
      targetFrameRef.current = frameIdx;
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetFrameRef.current);
          setCurrentFrame(Math.round(targetFrameRef.current));
          rafIdRef.current = null;
        });
      }
    },
    [drawFrame]
  );

  // Initial draw and Canvas resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      currentDrawnFrameRef.current = -1; // force redraw
      drawFrame(targetFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawFrame]);

  // ScrollTrigger Setup
  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const container = containerRef.current;
    if (!container) return;

    if (isReduced) {
      drawFrame(0);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frameIdx = self.progress * (totalFrames - 1);
        scheduleFrameDraw(frameIdx);
      }
    });

    return () => {
      st.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [totalFrames, scheduleFrameDraw, drawFrame]);

  // Derived telemetry metrics for HUD
  const progressRatio = currentFrame / (totalFrames - 1 || 1);
  const compassAngle = Math.round(progressRatio * 180 - 90);
  const mapPointX = 15 + progressRatio * 70;
  const mapPointY = 30 + Math.sin(progressRatio * Math.PI) * 45;

  return (
    <section
      ref={containerRef}
      id="walkthrough-viewer"
      className={`relative h-screen h-[100dvh] w-full overflow-hidden bg-[#08090B] select-none flex items-center justify-center border-t border-b border-gray-200 ${className}`}
      aria-label="Scroll Scrubbed 3D Walkthrough Viewer"
    >
      {/* 1. Main Canvas Scrubbing Viewport */}
      <div className="absolute inset-0 w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block will-change-transform"
        />
        {/* VR Optical Lens Overlay (Curvature, Chromatic Aberration, Lens Glint) */}
        <VRLensEffect
          triggerElement={containerRef.current}
          fovLabel="FOV 110° // SPATIAL BIM WALKTHROUGH // 60FPS"
        />
      </div>

      {/* Preloading Overlay if using external network assets */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#08090B] z-40 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#38BDF8]/20 border-t-[#38BDF8] animate-spin mb-4" />
          <div className="font-mono-tech text-xs text-white tracking-widest uppercase mb-2">
            PRELOADING HIGH-RES FRAMES // {loadProgress}%
          </div>
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#38BDF8] via-[#D4A373] to-[#E5A93B] transition-all duration-150"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* =========================================================
          2. HUD OVERLAYS (Kept Dark Frosted Glass on Canvas)
         ========================================================= */}

      {/* Top Left: Frame Index Counter */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-30 pointer-events-auto">
        <div className="rounded-sm bg-[#08090B]/85 backdrop-blur-md border border-white/15 px-3 py-1.5 sm:px-4 sm:py-2.5 shadow-2xl corner-crosshairs flex items-center gap-2 sm:gap-3">
          <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          <div className="font-mono-tech text-[11px] sm:text-xs text-white tracking-wider">
            FRAME{' '}
            <span className="text-[#38BDF8] font-bold">
              {String(currentFrame).padStart(3, '0')}
            </span>{' '}
            / {String(totalFrames - 1).padStart(3, '0')}
          </div>
          <span className="text-white/20">|</span>
          <div className="font-mono-tech text-[10px] text-[#D4A373]">
            {Math.round(progressRatio * 100)}% SCRUB
          </div>
        </div>
      </div>

      {/* Top Center: Bearing Compass Widget */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto hidden md:block">
        <div className="rounded-sm bg-[#08090B]/85 backdrop-blur-md border border-white/15 px-5 py-2 shadow-2xl flex items-center gap-3 font-mono-tech text-xs text-white">
          <Compass className="w-4 h-4 text-[#D4A373]" />
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#8A92A0]">BEARING</span>
            <div className="flex items-center gap-1">
              <Navigation
                className="w-3.5 h-3.5 text-[#38BDF8] transition-transform duration-75"
                style={{ transform: `rotate(${compassAngle}deg)` }}
              />
              <span className="text-[#38BDF8] font-bold">
                {String((compassAngle + 360) % 360).padStart(3, '0')}°
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/40">
            <span>[N</span>
            <span className="text-white/70">·</span>
            <span>E</span>
            <span className="text-white/70">·</span>
            <span>S</span>
            <span className="text-white/70">·</span>
            <span>W]</span>
          </div>
        </div>
      </div>

      {/* Top Right: 2D Floor Plan Tracker Mini-Map (Hidden on mobile <sm to prevent collision) */}
      <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-30 pointer-events-auto hidden sm:block">
        <div className="rounded-sm bg-[#08090B]/90 backdrop-blur-md border border-white/20 p-3 shadow-2xl corner-crosshairs w-44 sm:w-52">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10 font-mono-tech text-[11px]">
            <div className="flex items-center gap-1.5 text-white">
              <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="font-bold tracking-wider">FLOORPLAN</span>
            </div>
            <span className="text-[10px] text-[#10B981] font-semibold">LEVEL 01</span>
          </div>

          {/* Mini-map Graphic Canvas */}
          <div className="relative h-20 sm:h-24 w-full bg-[#0E1013] border border-white/10 rounded-xs overflow-hidden bg-blueprint-grid">
            {/* SVG Simplified Floorplan Blueprint */}
            <svg
              className="w-full h-full opacity-60"
              viewBox="0 0 100 80"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="0.8"
            >
              {/* Outer Walls */}
              <rect x="5" y="5" width="90" height="70" />
              {/* Rooms */}
              <line x1="35" y1="5" x2="35" y2="75" />
              <line x1="35" y1="40" x2="95" y2="40" />
              <line x1="65" y1="40" x2="65" y2="75" />
              <rect x="12" y="15" width="15" height="15" strokeDasharray="1,1" stroke="#D4A373" />
              <rect x="42" y="48" width="16" height="20" strokeDasharray="1,1" stroke="#D4A373" />
              {/* Door openings */}
              <circle cx="35" cy="22" r="3" stroke="#10B981" strokeDasharray="1,1" />
              <circle cx="50" cy="40" r="3" stroke="#10B981" strokeDasharray="1,1" />
            </svg>

            {/* Live Observer Position with Dynamic Rotating FOV Vision Cone */}
            <div
              className="absolute pointer-events-none transition-all duration-75"
              style={{
                left: `${mapPointX}%`,
                top: `${mapPointY}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Rotating FOV Vision Radar Cone */}
              <div
                className="absolute w-24 h-24 -top-12 -left-12 pointer-events-none transition-transform duration-75"
                style={{
                  transform: `rotate(${compassAngle}deg)`
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="fovConeGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
                      <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <polygon points="50,50 15,5 85,5" fill="url(#fovConeGrad)" />
                  <line x1="50" y1="50" x2="15" y2="5" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.8" />
                  <line x1="50" y1="50" x2="85" y2="5" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.8" />
                  <path d="M 25,12 A 40,40 0 0,1 75,12" stroke="#38BDF8" strokeWidth="0.6" fill="none" opacity="0.4" />
                </svg>
              </div>

              {/* Observer Center Dot */}
              <div className="relative flex items-center justify-center w-3.5 h-3.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] animate-ping opacity-60 absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] border-2 border-white relative z-10 shadow-[0_0_8px_#EF4444]" />
              </div>
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="flex items-center justify-between font-mono-tech text-[9px] text-[#8A92A0] mt-2">
            <div className="flex items-center gap-1 text-[#38BDF8]">
              <Radio className="w-2.5 h-2.5 text-[#38BDF8] animate-pulse" />
              <span>LIVE TRACKING</span>
            </div>
            <span>ZONE A-3</span>
          </div>
        </div>
      </div>

      {/* Bottom Center: Scroll Hint Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="rounded-full bg-[#08090B]/80 backdrop-blur-md border border-white/15 px-5 py-2 shadow-2xl flex items-center gap-2.5 font-mono-tech text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-[#E5A93B] animate-pulse" />
          <span className="tracking-widest uppercase text-[11px]">
            SCROLL DOWN TO SCRUB WALKTHROUGH
          </span>
        </div>
      </div>
    </section>
  );
};

export default ScrollWalkthroughViewer;

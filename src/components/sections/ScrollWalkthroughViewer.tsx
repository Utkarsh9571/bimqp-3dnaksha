import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Compass, Navigation, Radio, Layers } from 'lucide-react';
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
 * Preloads a sequence of frames and ties scroll progress linearly to frame rendering.
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
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  // References for performant rendering
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentDrawnFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  /**
   * Generates or retrieves placeholder frames when real asset URLs are not yet supplied.
   * Generates a procedural 3D architectural perspective walkthrough across 81 frames.
   */
  const generatePlaceholderFrame = useCallback((frameIdx: number, total: number): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 1920;
      offscreen.height = 1080;
      const ctx = offscreen.getContext('2d');

      if (!ctx) {
        const img = new Image();
        resolve(img);
        return;
      }

      const p = frameIdx / (total - 1 || 1); // 0 to 1 progress

      // Dark Architectural Room Background
      const bgGrad = ctx.createRadialGradient(960, 540, 100, 960, 540, 1100);
      bgGrad.addColorStop(0, '#11141A');
      bgGrad.addColorStop(0.6, '#0B0D11');
      bgGrad.addColorStop(1, '#050608');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1920, 1080);

      // Perspective Camera Coordinates based on progress
      const camZ = p * 600;
      const vanishingX = 960 + Math.sin(p * Math.PI * 1.5) * 220;
      const vanishingY = 500 + Math.cos(p * Math.PI) * 40;

      // Floor Grid (Perspective Lines)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 2;
      for (let x = -600; x <= 2520; x += 160) {
        ctx.beginPath();
        ctx.moveTo(x, 1080);
        ctx.lineTo(vanishingX + (x - 960) * 0.05, vanishingY);
        ctx.stroke();
      }

      // Horizontal Floor Beams
      for (let y = 1080; y >= vanishingY; y -= Math.max(8, (y - vanishingY) * 0.22)) {
        ctx.strokeStyle = 'rgba(212, 163, 115, 0.15)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1920, y);
        ctx.stroke();
      }

      // Ceiling Trusses & Beams
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
      for (let x = 0; x <= 1920; x += 240) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(vanishingX + (x - 960) * 0.08, vanishingY);
        ctx.stroke();
      }

      // Architectural Room Pillars (Moving closer with camZ)
      const pillars = [
        { baseX: 400 - camZ * 0.4, baseY: 1080, topY: 100 },
        { baseX: 1520 + camZ * 0.4, baseY: 1080, topY: 100 },
        { baseX: 700 - camZ * 0.2, baseY: 900, topY: 250 },
        { baseX: 1220 + camZ * 0.2, baseY: 900, topY: 250 }
      ];

      pillars.forEach((pil, idx) => {
        ctx.strokeStyle = idx % 2 === 0 ? '#38BDF8' : '#D4A373';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pil.baseX, pil.baseY);
        ctx.lineTo(pil.baseX, pil.topY);
        ctx.stroke();

        // Cross truss
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
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
      ctx.arc(vanishingX, vanishingY, 40, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(vanishingX, vanishingY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Big Tech Frame Stamp
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText(
        `FRAME_${String(frameIdx).padStart(3, '0')}.RAW`,
        120,
        140
      );

      ctx.fillStyle = '#D4A373';
      ctx.font = '20px "JetBrains Mono", monospace';
      ctx.fillText(`SPATIAL VECTOR: [X: ${(p * 24.5).toFixed(2)}M, Y: 3.20M, Z: ${(camZ * 0.05).toFixed(2)}M]`, 120, 180);
      ctx.fillText(`ZONE: ${currentZone}`, 120, 215);

      // Watermark Stamp
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.font = 'bold 120px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('3D NAKSHA BIM WALKTHROUGH', 960, 560);
      ctx.textAlign = 'left';

      // Convert to image object
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = offscreen.toDataURL('image/jpeg', 0.85);
    });
  }, []);

  // Preload all frames sequentially or in parallel batches
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];

    const preloadAll = async () => {
      let loadedCount = 0;

      for (let i = 0; i < totalFrames; i++) {
        if (isCancelled) return;

        let img: HTMLImageElement;
        if (frameUrls && frameUrls[i]) {
          img = new Image();
          img.src = frameUrls[i];
          await new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          });
        } else if (frameUrlPattern) {
          const url = frameUrlPattern.replace('%03d', String(i).padStart(3, '0'));
          img = new Image();
          img.src = url;
          await new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          });
        } else {
          img = await generatePlaceholderFrame(i, totalFrames);
        }

        loadedImages.push(img);
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      }

      if (!isCancelled) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, frameUrls, frameUrlPattern, generatePlaceholderFrame]);

  /**
   * High-Performance Canvas Drawer
   * Draws frame to canvas preserving aspect ratio (Cover mode)
   */
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images || !images[frameIdx]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIdx];
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width || 1920;
    const ih = img.height || 1080;

    // Calculate aspect ratio cover fit
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (cw - iw * ratio) / 2;
    const centerShiftY = (ch - ih * ratio) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(
      img,
      0,
      0,
      iw,
      ih,
      centerShiftX,
      centerShiftY,
      iw * ratio,
      ih * ratio
    );

    currentDrawnFrameRef.current = frameIdx;
  }, []);

  /**
   * RequestAnimationFrame-throttled draw trigger
   */
  const scheduleDraw = useCallback((frameIndex: number) => {
    targetFrameRef.current = frameIndex;
    setCurrentFrame(frameIndex);

    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      if (currentDrawnFrameRef.current !== targetFrameRef.current) {
        drawFrame(targetFrameRef.current);
      }
    });
  }, [drawFrame]);

  // Resize listener to maintain retina canvas buffer resolution
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      if (currentDrawnFrameRef.current >= 0) {
        drawFrame(currentDrawnFrameRef.current);
      } else {
        drawFrame(0);
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded, drawFrame]);

  // GSAP ScrollTrigger Pinning & Scrub Setup
  useEffect(() => {
    if (!isLoaded) return;
    const container = containerRef.current;
    if (!container) return;

    const isReduced = prefersReducedMotion();

    // Initial first frame render
    scheduleDraw(0);

    if (isReduced) return;

    // Pin the container for 250% viewport height scroll distance
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(self.progress * totalFrames))
        );
        scheduleDraw(frameIndex);
      }
    });

    return () => {
      st.kill();
    };
  }, [isLoaded, totalFrames, scheduleDraw]);

  // Calculated Progress (0 to 1)
  const progressRatio = totalFrames > 1 ? currentFrame / (totalFrames - 1) : 0;
  // Dynamic Compass Bearing Angle (e.g. 45° to 135° rotation during walkthrough)
  const bearingAngle = Math.round(45 + progressRatio * 90);

  return (
    <section
      ref={containerRef}
      id="scroll-walkthrough"
      className={`relative h-screen w-full overflow-hidden bg-[#08090B] select-none border-t border-b border-white/10 ${className}`}
    >
      {/* Loading Overlay (Preload all frames before enabling scrub) */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-[#08090B] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-6">
            <div className="w-12 h-12 rounded-lg bg-[#14171D] border border-[#D4A373]/40 mx-auto flex items-center justify-center text-[#D4A373]">
              <Layers className="w-6 h-6 animate-pulse" />
            </div>

            <div>
              <div className="font-mono-tech text-xs text-[#D4A373] tracking-[0.25em] uppercase mb-2 font-semibold">
                INITIALIZING SPATIAL WALKTHROUGH STREAM
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Preloading {totalFrames} HD Sequence Frames
              </h3>
            </div>

            {/* Linear Progress Bar */}
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4A373] via-[#38BDF8] to-[#8B5CF6] transition-all duration-150"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono-tech text-xs text-[#8A92A0]">
                <span>BUFFERING CANVASES</span>
                <span className="text-[#38BDF8] font-bold">{loadProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Canvas Viewport */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block will-change-transform"
      />

      {/* Top & Bottom Vignettes for smooth edge contrast */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#08090B] via-[#08090B]/50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08090B] via-[#08090B]/50 to-transparent pointer-events-none z-10" />

      {/* =========================================================
          HUD OVERLAY 1: Top-Left "FRAME 000 / 081" Counter
         ========================================================= */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30 pointer-events-auto">
        <div className="rounded-md bg-[#08090B]/90 backdrop-blur-xl border border-white/15 px-4 py-3 shadow-2xl font-mono-tech corner-crosshairs">
          <div className="flex items-center gap-2 text-[10px] text-[#8A92A0] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>INTERACTIVE SCROLL-SCRUB</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-white text-lg font-bold">
              FRAME {String(currentFrame).padStart(3, '0')}
            </span>
            <span className="text-[#5A6270] text-xs">/ {String(totalFrames).padStart(3, '0')}</span>
          </div>

          <div className="text-[10px] text-[#38BDF8] mt-1 pt-1 border-t border-white/10 flex items-center justify-between gap-4">
            <span>SCRUB: {Math.round(progressRatio * 100)}%</span>
            <span>TIMECODE 00:00:0{Math.floor(currentFrame / 30)}:{(currentFrame % 30).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          HUD OVERLAY 2: Top-Center "BEARING" Compass Widget
         ========================================================= */}
      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto hidden sm:block">
        <div className="rounded-md bg-[#08090B]/90 backdrop-blur-xl border border-white/15 px-6 py-2.5 shadow-2xl font-mono-tech flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-[10px] text-[#D4A373] tracking-widest uppercase font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>BEARING // {bearingAngle}° {bearingAngle < 90 ? 'ENE' : bearingAngle === 90 ? 'E' : 'ESE'}</span>
          </div>

          {/* Compass Ribbon with Tick Marks */}
          <div className="relative w-48 h-5 overflow-hidden flex items-center justify-center border-t border-b border-white/10">
            {/* Center Reticle Notch */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-[#38BDF8] z-10" />

            {/* Sliding Degree Scale */}
            <div
              className="flex items-center gap-4 text-[10px] text-[#8A92A0] whitespace-nowrap transition-transform duration-75"
              style={{ transform: `translateX(${-bearingAngle * 1.5 + 130}px)` }}
            >
              <span>N 0°</span>
              <span>•</span>
              <span>NE 45°</span>
              <span>•</span>
              <span className="text-[#38BDF8] font-bold">E 90°</span>
              <span>•</span>
              <span>SE 135°</span>
              <span>•</span>
              <span>S 180°</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          HUD OVERLAY 3: Top-Right "FLOORPLAN" Mini-Map Box
         ========================================================= */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 pointer-events-auto">
        <div className="rounded-md bg-[#08090B]/90 backdrop-blur-xl border border-white/15 p-3.5 shadow-2xl w-48 sm:w-56 font-mono-tech corner-crosshairs">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10 text-[10px]">
            <div className="flex items-center gap-1 text-[#38BDF8] font-bold">
              <Navigation className="w-3 h-3" />
              <span>FLOORPLAN</span>
            </div>
            <span className="text-[#5A6270]">LVL 01</span>
          </div>

          {/* 2D Vector Architectural Floor Plan Graphic */}
          <div className="relative h-24 rounded bg-[#0E1013] border border-white/10 p-1.5 bg-grid-dense overflow-hidden">
            <svg viewBox="0 0 160 80" className="w-full h-full text-[#4B5563]" stroke="currentColor" fill="none">
              {/* Outer Room Walls */}
              <polygon points="10,10 150,10 150,70 10,70" strokeWidth="1.5" />
              {/* Room Partitions */}
              <line x1="60" y1="10" x2="60" y2="70" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="110" y1="10" x2="110" y2="70" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="60" y1="40" x2="110" y2="40" strokeWidth="1" />

              {/* Room Labels */}
              <text x="18" y="24" fontSize="6" fill="#8A92A0">FOYER</text>
              <text x="68" y="24" fontSize="6" fill="#8A92A0">ATRIUM</text>
              <text x="68" y="58" fontSize="6" fill="#8A92A0">LIVING</text>
              <text x="116" y="24" fontSize="6" fill="#8A92A0">TERRACE</text>

              {/* Walkthrough Path Line */}
              <path
                d="M 25,45 Q 60,25 85,50 T 135,35"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

              {/* Dynamic Animated Position Marker Dot */}
              {(() => {
                // Approximate parametric coordinates along walkthrough path
                const markerX = 25 + progressRatio * 110;
                const markerY = 45 - Math.sin(progressRatio * Math.PI) * 15;
                return (
                  <g transform={`translate(${markerX}, ${markerY})`}>
                    {/* View Cone (Field of View radiating forward) */}
                    <path
                      d="M 0,0 L 14,-8 L 14,8 Z"
                      fill="rgba(56, 189, 248, 0.25)"
                      stroke="rgba(56, 189, 248, 0.6)"
                      strokeWidth="0.5"
                      transform={`rotate(${bearingAngle - 90})`}
                    />
                    {/* Pulsing Position Dot */}
                    <circle cx="0" cy="0" r="3.5" fill="#38BDF8" />
                    <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[9px] text-[#8A92A0] pt-1.5 mt-1.5 border-t border-white/5">
            <span>POS: [{(progressRatio * 18.2).toFixed(1)}M]</span>
            <span className="text-[#10B981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              TRACKING
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Center Scroll Hint Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-white/10 text-xs font-mono-tech text-[#8A92A0]">
          <Radio className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
          <span>SCROLL TO SCRUB 3D WALKTHROUGH SEQUENCE</span>
        </div>
      </div>
    </section>
  );
};

export default ScrollWalkthroughViewer;

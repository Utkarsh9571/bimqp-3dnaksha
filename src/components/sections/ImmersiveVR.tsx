import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import {
  Glasses,
  Sun,
  Eye,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Compass,
  MoveHorizontal
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { prefersReducedMotion } from '../../lib/animations';

interface ImmersiveVRProps {
  onOpenConsultation: () => void;
}

export const ImmersiveVR: React.FC<ImmersiveVRProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Panorama direct DOM references for 60fps drag-to-pan
  const viewportRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const panOffsetRef = useRef<number>(0); // Current pan in pixels (-maxPan to +maxPan)
  const lastXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isReduced = prefersReducedMotion();

  const hotspots = [
    {
      id: 0,
      title: 'Human-Scale Spatial View',
      tag: 'Scale & Proportion',
      x: 28, // base percentage along wide panorama
      y: '45%',
      icon: <Eye className="w-4 h-4" />,
      description: 'Experience rooms at natural eye level to evaluate door positions, ceiling heights, and corridor clearances before construction begins.'
    },
    {
      id: 1,
      title: 'Lighting & Daylight Exploration',
      tag: 'Lighting Simulation',
      x: 78,
      y: '28%',
      icon: <Sun className="w-4 h-4" />,
      description: 'Observe simulated daylight transitions to understand natural light exposure across different living, working, and outdoor zones.'
    },
    {
      id: 2,
      title: 'Material & Finish Visualization',
      tag: 'Material Finishes',
      x: 48,
      y: '70%',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Compare material options, stone textures, wood grains, and architectural finishes in realistic ambient lighting conditions.'
    },
    {
      id: 3,
      title: 'Sightline & Volume Review',
      tag: 'Spatial Connection',
      x: 64,
      y: '54%',
      icon: <Compass className="w-4 h-4" />,
      description: 'Evaluate double-height volumes, mezzanine sightlines, and room-to-room visual connections from multiple viewing angles.'
    }
  ];

  const devices = [
    {
      name: 'Virtual Reality Headsets',
      type: 'Immersive Viewing',
      note: 'True 1:1 Scale Spatial Exploration',
      badge: 'Immersive'
    },
    {
      name: 'Desktop & Laptop Displays',
      type: 'Interactive Viewing',
      note: '3D Walkthrough & Model Review',
      badge: 'Screen-Based'
    },
    {
      name: 'Mobile & Tablet Devices',
      type: 'Portable Review',
      note: 'Flexible On-The-Go Presentations',
      badge: 'Portable'
    }
  ];

  // Apply smooth pan transform directly to DOM
  const updatePanTransform = useCallback(() => {
    if (!panoramaRef.current || !viewportRef.current) return;
    const maxPan = (panoramaRef.current.clientWidth - viewportRef.current.clientWidth) / 2;
    // Clamp pan offset
    if (panOffsetRef.current < -maxPan) panOffsetRef.current = -maxPan;
    if (panOffsetRef.current > maxPan) panOffsetRef.current = maxPan;

    panoramaRef.current.style.transform = `translate3d(${panOffsetRef.current}px, 0, 0)`;
  }, []);

  // Momentum decay loop after release
  const runMomentumDecay = useCallback(() => {
    if (Math.abs(velocityRef.current) < 0.2) {
      velocityRef.current = 0;
      return;
    }
    panOffsetRef.current += velocityRef.current;
    velocityRef.current *= 0.92; // Friction damping
    updatePanTransform();
    rafIdRef.current = requestAnimationFrame(runMomentumDecay);
  }, [updatePanTransform]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReduced) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isReduced) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = deltaX * 0.8;
    panOffsetRef.current += deltaX;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(updatePanTransform);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (!isReduced && Math.abs(velocityRef.current) > 0.5) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(runMomentumDecay);
    }
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) handlePointerUp();
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handlePointerUp]);

  return (
    <section
      ref={sectionRef}
      id="vr-centerpiece"
      className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-b border-gray-200 select-none"
    >
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="05"
          badgeText="Flagship VR Services"
          badgeVariant="amber"
          title="Don't imagine the space."
          highlightText="Walk through it."
          subtitle="Experience unbuilt architecture from a true human perspective through interactive walkthroughs and spatial visualization."
          align="left"
        />

        {/* Main Interactive VR Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Interactive Spatial Hotspot Canvas with Drag-to-Pan */}
          <div
            className="lg:col-span-8 relative transition-all duration-700"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
            }}
          >
            <div
              ref={viewportRef}
              className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-900 shadow-xl corner-crosshairs group aspect-[16/10] sm:aspect-[16/9] cursor-grab active:cursor-grabbing touch-pan-y"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Wide Panorama Container (Wider than viewport for natural 360° pan) */}
              <div
                ref={panoramaRef}
                className="absolute inset-0 w-[140%] sm:w-[150%] -left-[20%] sm:-left-[25%] h-full will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
                  alt="Immersive Spatial Walkthrough 360 View"
                  className="w-full h-full object-cover brightness-95 contrast-105 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

                {/* Interactive Hotspot Buttons on Wide Panorama */}
                {hotspots.map((spot) => {
                  const isActive = activeHotspot === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(spot.id);
                      }}
                      style={{ top: spot.y, left: `${spot.x}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/spot flex items-center justify-center transition-all cursor-pointer ${
                        isActive ? 'scale-125' : 'scale-100 hover:scale-115'
                      }`}
                      aria-label={spot.title}
                    >
                      {/* Pulsing ring */}
                      <span
                        className={`absolute w-10 h-10 rounded-full opacity-75 ${
                          isActive ? 'animate-ping bg-[#D97706]' : 'bg-[#0284C7]/40'
                        }`}
                      ></span>
                      
                      {/* Core Button */}
                      <span
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors ${
                          isActive
                            ? 'bg-[#D4A373] text-[#08090B] border-white'
                            : 'bg-black/90 text-[#38BDF8] border-[#38BDF8]'
                        }`}
                      >
                        {spot.icon}
                      </span>

                      {/* Tooltip on Hover */}
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-white text-[11px] font-mono-tech px-2.5 py-1 rounded-sm border border-white/20 opacity-0 group-hover/spot:opacity-100 pointer-events-none transition-opacity">
                        {spot.tag}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* HUD Badge on Canvas */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 text-[11px] font-mono-tech text-[#E5A93B] flex items-center gap-2 pointer-events-none z-30">
                <Glasses className="w-3.5 h-3.5" />
                <span>IMMERSIVE SPATIAL WALKTHROUGH</span>
              </div>

              {/* Drag to Look Around Hint */}
              <div
                className={`absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 text-[10px] sm:text-[11px] font-mono-tech text-white/80 flex items-center gap-1.5 pointer-events-none z-30 transition-opacity duration-500 ${
                  hasInteracted ? 'opacity-40 hover:opacity-100' : 'opacity-90 animate-pulse'
                }`}
              >
                <MoveHorizontal className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>DRAG TO PAN 360° VIEW</span>
              </div>

              {/* Active Hotspot Summary Drawer (Light Theme Card) */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-sm border border-gray-200 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-300 z-30 pointer-events-auto">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                    <span className="font-mono-tech text-[10px] text-[#9A6A38] uppercase font-bold tracking-wider">
                      Point 0{activeHotspot + 1} // {hotspots[activeHotspot].tag}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-[#0A0A0A] text-sm sm:text-base mt-0.5">
                    {hotspots[activeHotspot].title}
                  </h4>
                  <p className="text-xs text-[#4B5563] mt-1 max-w-xl">
                    {hotspots[activeHotspot].description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono-tech text-[#0284C7] font-semibold">
                    Click markers &amp; drag to explore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits & Viewing Formats (Light Theme) */}
          <div
            className="lg:col-span-4 space-y-6 transition-all duration-700"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            }}
          >
            <div className="architectural-panel-glow bg-white p-6 rounded-lg border border-gray-200/90 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="amber" size="sm">
                  Spatial Understanding
                </Badge>
              </div>

              <h3 className="font-display text-xl font-bold text-[#0A0A0A]">
                Experience Spaces Before Building
              </h3>

              <p className="text-xs text-[#4B5563] leading-relaxed">
                Walking through a simulated 3D environment helps clients, architects, and builders align on design decisions and evaluate layouts before committing to on-site work.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Understand spatial proportions and room scale intuitively</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span>Review material palettes and lighting options visually</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <span>Facilitate clear communication between project stakeholders</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 px-4 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] hover:from-[#E2B689] hover:to-[#F4D06F] text-[#08090B] font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Discuss Immersive VR Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Viewing Formats */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-3">
              <div className="text-xs font-mono-tech text-gray-700 uppercase font-bold tracking-wider">
                Flexible Viewing Formats
              </div>

              <div className="space-y-2">
                {devices.map((d, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-sm bg-gray-50 border border-gray-200 text-xs"
                  >
                    <div>
                      <div className="text-[#0A0A0A] font-semibold">{d.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono-tech">{d.note}</div>
                    </div>
                    <Badge variant="neutral" size="sm" className="text-[10px]">
                      {d.badge}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveVR;

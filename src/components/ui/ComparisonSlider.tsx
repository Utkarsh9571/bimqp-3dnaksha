import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Layers, Sparkles, Sliders, Eye } from 'lucide-react';
import { prefersReducedMotion } from '../../lib/animations';

interface ComparisonSliderProps {
  blueprintImage: string;
  renderImage: string;
  blueprintLabel?: string;
  renderLabel?: string;
  projectTitle?: string;
  projectMeta?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  blueprintImage,
  renderImage,
  blueprintLabel = '2D Architectural Plan',
  renderLabel = '3D Visualization View',
  projectTitle = 'Architectural Visualization Example',
  projectMeta = 'Spatial Proportions & Lighting Study'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activePreset, setActivePreset] = useState<'split' | 'blueprint' | 'render'>('split');

  const containerRef = useRef<HTMLDivElement>(null);
  const renderLayerRef = useRef<HTMLDivElement>(null);
  const blueprintLayerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const isReduced = prefersReducedMotion();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
    setActivePreset('split');
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // RAF-throttled direct DOM mutation for depth parallax (Bypassed on touch/mobile)
  const handlePointerMoveParallax = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReduced || !containerRef.current || typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return; // Ignore on touch screens

    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to +0.5

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      if (renderLayerRef.current) {
        renderLayerRef.current.style.transform = `scale(1.05) translate3d(${nx * -10}px, ${ny * -7}px, 0)`;
      }
      if (blueprintLayerRef.current) {
        blueprintLayerRef.current.style.transform = `scale(1.05) translate3d(${nx * -18}px, ${ny * -13}px, 0)`;
      }
    });
  };

  const handlePointerLeave = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (renderLayerRef.current) {
      renderLayerRef.current.style.transform = 'scale(1.05) translate3d(0, 0, 0)';
    }
    if (blueprintLayerRef.current) {
      blueprintLayerRef.current.style.transform = 'scale(1.05) translate3d(0, 0, 0)';
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const setPreset = (preset: 'split' | 'blueprint' | 'render') => {
    setActivePreset(preset);
    if (preset === 'blueprint') setSliderPosition(100);
    else if (preset === 'render') setSliderPosition(0);
    else setSliderPosition(50);
  };

  return (
    <div className="w-full">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
            <h4 className="font-display font-bold text-[#0A0A0A] text-base md:text-lg">
              {projectTitle}
            </h4>
          </div>
          <p className="font-mono-tech text-xs text-[#4B5563] mt-0.5">{projectMeta}</p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-sm border border-gray-200 text-xs font-mono-tech">
          <button
            onClick={() => setPreset('blueprint')}
            className={`px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreset === 'blueprint'
                ? 'bg-blue-50 text-[#0284C7] font-bold border border-blue-200 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2D Plan</span>
          </button>
          <button
            onClick={() => setPreset('split')}
            className={`px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreset === 'split'
                ? 'bg-amber-50 text-[#9A6A38] font-bold border border-amber-200 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Split</span>
          </button>
          <button
            onClick={() => setPreset('render')}
            className={`px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreset === 'render'
                ? 'bg-amber-50 text-[#B45309] font-bold border border-amber-200 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Render</span>
          </button>
        </div>
      </div>

      {/* Main Slider Canvas with 3D Depth Perspective */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-md border border-gray-200 bg-white select-none cursor-ew-resize corner-crosshairs group shadow-xl transition-shadow duration-300 hover:shadow-2xl"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onPointerMove={handlePointerMoveParallax}
        onPointerLeave={handlePointerLeave}
        style={{
          perspective: '1200px'
        }}
      >
        {/* Render Layer (Right Side / Background) */}
        <div
          ref={renderLayerRef}
          className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: 'scale(1.05) translate3d(0, 0, 0)'
          }}
        >
          <img
            src={renderImage}
            alt="3D Architectural Visualization Render"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Label Badge */}
          <div className="absolute bottom-4 right-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20 text-xs font-mono-tech text-[#E5A93B] flex items-center gap-2 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93B]" />
            <span>{renderLabel}</span>
          </div>
        </div>

        {/* Blueprint Layer (Left Side / Clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden bg-[#0A1628]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            ref={blueprintLayerRef}
            className="relative h-full transition-transform duration-100 ease-out will-change-transform"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              transform: 'scale(1.05) translate3d(0, 0, 0)'
            }}
          >
            {/* Blueprint image with stylized plan overlay */}
            <div className="relative w-full h-full">
              <img
                src={blueprintImage}
                alt="2D Architectural Plan"
                className="w-full h-full object-cover filter contrast-125 saturate-50 hue-rotate-180 brightness-90"
                loading="lazy"
              />
              {/* Technical CAD Grid & Watermark */}
              <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none"></div>
              <div className="absolute inset-0 bg-cyan-950/20 mix-blend-multiply pointer-events-none"></div>
            </div>

            {/* Blueprint Label Badge */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20 text-xs font-mono-tech text-[#38BDF8] flex items-center gap-2 pointer-events-none">
              <Layers className="w-3.5 h-3.5" />
              <span>{blueprintLabel}</span>
            </div>
          </div>
        </div>

        {/* Draggable Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-[#0284C7] via-white to-[#D97706] shadow-sm pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#9A6A38] shadow-md flex items-center justify-center text-[#9A6A38] group-hover:scale-110 transition-transform pointer-events-auto cursor-grab active:cursor-grabbing">
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-[#0284C7] rounded-full"></span>
              <span className="w-1 h-3 bg-[#D97706] rounded-full"></span>
            </div>
          </div>

          {/* Top Indicator */}
          <div className="absolute top-2 -translate-x-1/2 bg-black/90 text-[10px] font-mono-tech px-2 py-0.5 rounded-xs border border-white/20 text-white whitespace-nowrap">
            {Math.round(sliderPosition)}% SPLIT
          </div>
        </div>

        {/* Drag Hint Overlay for new visitors */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-mono-tech text-gray-700 border border-gray-300 shadow-xs opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-[#D97706]" />
          <span>Drag slider left / right to compare</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;

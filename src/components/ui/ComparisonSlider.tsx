import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Layers, Sparkles, Sliders, Eye } from 'lucide-react';

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
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
            <h4 className="font-display font-semibold text-white text-base md:text-lg">
              {projectTitle}
            </h4>
          </div>
          <p className="font-mono-tech text-xs text-[#8A92A0] mt-0.5">{projectMeta}</p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1 bg-[#14171D] p-1 rounded-sm border border-white/10 text-xs font-mono-tech">
          <button
            onClick={() => setPreset('blueprint')}
            className={`px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreset === 'blueprint'
                ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm'
                : 'text-[#8A92A0] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2D Plan</span>
          </button>
          <button
            onClick={() => setPreset('split')}
            className={`px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreset === 'split'
                ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/40 shadow-sm'
                : 'text-[#8A92A0] hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Split</span>
          </button>
          <button
            onClick={() => setPreset('render')}
            className={`px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activePreset === 'render'
                ? 'bg-[#E5A93B]/20 text-[#E5A93B] border border-[#E5A93B]/40 shadow-sm'
                : 'text-[#8A92A0] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Render</span>
          </button>
        </div>
      </div>

      {/* Main Slider Canvas */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-md border border-white/15 bg-[#0E1013] select-none cursor-ew-resize corner-crosshairs group shadow-2xl"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Render Layer (Right Side / Background) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={renderImage}
            alt="3D Architectural Visualization Render"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Label Badge */}
          <div className="absolute bottom-4 right-4 z-10 bg-[#08090B]/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#D4A373]/30 text-xs font-mono-tech text-[#D4A373] flex items-center gap-2 pointer-events-none">
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
            className="relative h-full"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
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
            <div className="absolute bottom-4 left-4 z-10 bg-[#08090B]/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#38BDF8]/30 text-xs font-mono-tech text-[#38BDF8] flex items-center gap-2 pointer-events-none">
              <Layers className="w-3.5 h-3.5" />
              <span>{blueprintLabel}</span>
            </div>
          </div>
        </div>

        {/* Draggable Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-[#38BDF8] via-white to-[#D4A373] shadow-[0_0_12px_rgba(212,163,115,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0E1013] border-2 border-[#D4A373] shadow-lg flex items-center justify-center text-[#D4A373] group-hover:scale-110 transition-transform">
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-[#38BDF8] rounded-full"></span>
              <span className="w-1 h-3 bg-[#D4A373] rounded-full"></span>
            </div>
          </div>

          {/* Top Indicator */}
          <div className="absolute top-2 -translate-x-1/2 bg-[#08090B]/90 text-[10px] font-mono-tech px-2 py-0.5 rounded-xs border border-white/20 text-white whitespace-nowrap">
            {Math.round(sliderPosition)}% SPLIT
          </div>
        </div>

        {/* Drag Hint Overlay for new visitors */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-mono-tech text-[#8A92A0] border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-[#D4A373]" />
          <span>Drag slider left / right to compare</span>
        </div>
      </div>
    </div>
  );
};

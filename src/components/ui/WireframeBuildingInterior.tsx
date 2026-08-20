import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/animations';

interface WireframeBuildingInteriorProps {
  progress?: number; // 0 to 1 scroll assembly progress
  className?: string;
}

/**
 * Safely computes or approximates the length of any SVG element
 */
const getElementStrokeLength = (el: Element): number => {
  if (typeof (el as SVGGeometryElement).getTotalLength === 'function') {
    try {
      const len = (el as SVGGeometryElement).getTotalLength();
      if (len && !isNaN(len) && len > 0) return len;
    } catch {
      // Fallback below
    }
  }

  if (el instanceof SVGLineElement) {
    const x1 = el.x1.baseVal.value || 0;
    const y1 = el.y1.baseVal.value || 0;
    const x2 = el.x2.baseVal.value || 0;
    const y2 = el.y2.baseVal.value || 0;
    return Math.hypot(x2 - x1, y2 - y1) || 500;
  }

  if (el instanceof SVGCircleElement) {
    return 2 * Math.PI * (el.r.baseVal.value || 10);
  }

  if (el instanceof SVGRectElement) {
    return 2 * ((el.width.baseVal.value || 100) + (el.height.baseVal.value || 100));
  }

  return 600;
};

/**
 * Architectural 3D Wireframe Interior Component (Light Theme Optimized)
 * 
 * Renders a high-contrast perspective CAD line-drawing of a multi-level architectural interior.
 * Rendered with dark architectural charcoal, blueprint cyan, and rich bronze lines for maximum crispness on light surfaces.
 */
export const WireframeBuildingInterior: React.FC<WireframeBuildingInteriorProps> = ({
  progress = 0,
  className = ''
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const isReduced = prefersReducedMotion();

  // If progress is provided via prop, we update path strokeDashoffsets
  useEffect(() => {
    if (!svgRef.current) return;
    const elements = svgRef.current.querySelectorAll<SVGElement>('.draw-path');

    elements.forEach((el, index) => {
      // Skip group or non-geometry container elements
      if (el instanceof SVGGElement) return;

      const length = getElementStrokeLength(el);
      // Stagger the reveal of different layers based on index & scroll progress
      const factor = (index % 5) * 0.1;
      const effectiveProgress = isReduced
        ? 1
        : Math.max(0, Math.min(1, (progress - factor) / (1 - factor || 1)));

      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length * (1 - effectiveProgress)}`;
    });
  }, [progress, isReduced]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${className}`}>
      {/* Ambient Architectural Blueprint Glow behind Wireframe */}
      <div
        className="absolute w-[80%] h-[75%] rounded-full bg-gradient-to-tr from-[#0284C7]/12 via-[#818CF8]/10 to-[#F59E0B]/10 blur-[130px] pointer-events-none transition-opacity duration-700"
        style={{ opacity: 0.4 + progress * 0.6 }}
      />

      {/* SVG Architectural Wireframe Illustration */}
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[1300px] object-contain text-gray-800 transition-transform duration-300 ease-out"
        style={{
          transform: isReduced
            ? 'none'
            : `scale(${0.92 + progress * 0.12}) rotateX(${12 - progress * 10}deg) translateY(${20 - progress * 30}px)`,
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
        aria-label="3D Architectural Wireframe Interior"
      >
        <defs>
          <linearGradient id="wireframeAccentLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0.85" />
          </linearGradient>

          <radialGradient id="floorOcclusionGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#4F46E5" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="vertexGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="40%" stopColor="#0284C7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          <pattern id="grid-dots-light" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#9CA3AF" fillOpacity="0.4" />
          </pattern>
        </defs>

        {/* Ambient Floor Depth Fog & Occlusion */}
        <ellipse cx="600" cy="690" rx="480" ry="110" fill="url(#floorOcclusionGrad)" opacity="0.85" />

        {/* Phase 0: Perspective Ground Floor Plane & Floor Tiles Grid */}
        <g className="phase-ground opacity-60">
          <rect width="1200" height="800" fill="url(#grid-dots-light)" />
          {/* Main Perspective Floor Outline */}
          <polygon
            points="150,680 600,770 1050,680 600,560"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            vectorEffect="non-scaling-stroke"
            className="draw-path"
          />
          {/* Internal Ground Grid Lines */}
          <line x1="260" y1="650" x2="710" y2="740" stroke="#9CA3AF" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-path" />
          <line x1="375" y1="620" x2="825" y2="710" stroke="#9CA3AF" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-path" />
          <line x1="490" y1="590" x2="940" y2="680" stroke="#9CA3AF" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-path" />
          
          <line x1="375" y1="725" x2="825" y2="600" stroke="#9CA3AF" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-path" />
          <line x1="490" y1="748" x2="940" y2="625" stroke="#9CA3AF" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-path" />
          <line x1="260" y1="702" x2="710" y2="575" stroke="#9CA3AF" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-path" />
        </g>

        {/* Phase 1: Structural Columns & Core Pillars (High Contrast Dark Charcoal) */}
        <g className="phase-columns" stroke="#1F2937" strokeWidth="1.8" vectorEffect="non-scaling-stroke">
          {/* Center Main Pillar */}
          <line x1="600" y1="770" x2="600" y2="180" className="draw-path" stroke="#111827" strokeWidth="2.2" />
          <line x1="592" y1="768" x2="592" y2="185" className="draw-path" stroke="#4B5563" strokeWidth="1" />
          <line x1="608" y1="768" x2="608" y2="185" className="draw-path" stroke="#4B5563" strokeWidth="1" />

          {/* Left Front Column */}
          <line x1="150" y1="680" x2="150" y2="240" className="draw-path" stroke="#1F2937" />
          <line x1="160" y1="682" x2="160" y2="244" className="draw-path" stroke="#4B5563" strokeWidth="1" />

          {/* Right Front Column */}
          <line x1="1050" y1="680" x2="1050" y2="240" className="draw-path" stroke="#1F2937" />
          <line x1="1040" y1="682" x2="1040" y2="244" className="draw-path" stroke="#4B5563" strokeWidth="1" />

          {/* Back Left Column */}
          <line x1="375" y1="620" x2="375" y2="140" className="draw-path" stroke="#6B7280" strokeDasharray="4 4" />
          {/* Back Right Column */}
          <line x1="825" y1="620" x2="825" y2="140" className="draw-path" stroke="#6B7280" strokeDasharray="4 4" />
          {/* Far Apex Column */}
          <line x1="600" y1="560" x2="600" y2="100" className="draw-path" stroke="#9CA3AF" strokeDasharray="3 3" />
        </g>

        {/* Phase 2: Ceiling Beams & Rafter Structure */}
        <g className="phase-roof" stroke="#1F2937" strokeWidth="1.6" vectorEffect="non-scaling-stroke">
          {/* Upper Perimeter Rafters */}
          <polygon
            points="150,240 600,180 1050,240 600,100"
            stroke="url(#wireframeAccentLight)"
            strokeWidth="2.4"
            className="draw-path"
          />
          {/* Cross Support Trusses */}
          <line x1="150" y1="240" x2="600" y2="100" stroke="#6B7280" strokeWidth="1.2" className="draw-path" />
          <line x1="1050" y1="240" x2="600" y2="100" stroke="#6B7280" strokeWidth="1.2" className="draw-path" />
          <line x1="375" y1="140" x2="600" y2="180" stroke="#4B5563" className="draw-path" />
          <line x1="825" y1="140" x2="600" y2="180" stroke="#4B5563" className="draw-path" />

          {/* Ceiling Skylight Wireframe Box */}
          <polygon
            points="500,150 600,130 700,150 600,170"
            stroke="#0284C7"
            strokeWidth="1.8"
            className="draw-path"
          />
          <line x1="500" y1="150" x2="700" y2="150" stroke="#0284C7" strokeDasharray="2 2" className="draw-path" />
          <line x1="600" y1="130" x2="600" y2="170" stroke="#0284C7" strokeDasharray="2 2" className="draw-path" />
        </g>

        {/* Phase 3: Mezzanine / 2nd Floor Gallery & Cantilever Balcony */}
        <g className="phase-mezzanine" stroke="#1F2937" strokeWidth="1.8" vectorEffect="non-scaling-stroke">
          {/* Mezzanine Slab */}
          <polygon
            points="260,460 600,520 850,465 600,380"
            stroke="url(#wireframeAccentLight)"
            strokeWidth="2.2"
            className="draw-path"
          />
          {/* Mezzanine Slab Thickness */}
          <polygon
            points="260,472 600,532 850,477 600,392"
            stroke="#4B5563"
            strokeWidth="1.2"
            className="draw-path"
          />
          <line x1="260" y1="460" x2="260" y2="472" className="draw-path" />
          <line x1="600" y1="520" x2="600" y2="532" className="draw-path" />
          <line x1="850" y1="465" x2="850" y2="477" className="draw-path" />

          {/* Glass Railing Wireframe on Mezzanine */}
          <polyline
            points="260,420 600,475 850,425"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            className="draw-path"
          />
          {/* Vertical Balusters */}
          <line x1="330" y1="433" x2="330" y2="473" stroke="#6B7280" strokeWidth="1" className="draw-path" />
          <line x1="400" y1="445" x2="400" y2="487" stroke="#6B7280" strokeWidth="1" className="draw-path" />
          <line x1="470" y1="456" x2="470" y2="500" stroke="#6B7280" strokeWidth="1" className="draw-path" />
          <line x1="540" y1="467" x2="540" y2="511" stroke="#6B7280" strokeWidth="1" className="draw-path" />
          <line x1="670" y1="460" x2="670" y2="504" stroke="#6B7280" strokeWidth="1" className="draw-path" />
          <line x1="740" y1="448" x2="740" y2="490" stroke="#6B7280" strokeWidth="1" className="draw-path" />
          <line x1="800" y1="435" x2="800" y2="476" stroke="#6B7280" strokeWidth="1" className="draw-path" />
        </g>

        {/* Phase 4: Floating Architectural Staircase */}
        <g className="phase-stairs" stroke="#1F2937" strokeWidth="1.4" vectorEffect="non-scaling-stroke">
          {/* Stair Stringers & Treads descending from Mezzanine */}
          <path
            d="M 600,520 L 570,540 L 570,555 L 540,575 L 540,590 L 510,610 L 510,625 L 480,645 L 480,660 L 450,680 L 450,695 L 420,715"
            stroke="#DB2777"
            strokeWidth="2.2"
            className="draw-path"
          />
          {/* Treads depth lines */}
          <line x1="570" y1="540" x2="630" y2="528" stroke="#4B5563" className="draw-path" />
          <line x1="540" y1="575" x2="600" y2="563" stroke="#4B5563" className="draw-path" />
          <line x1="510" y1="610" x2="570" y2="598" stroke="#4B5563" className="draw-path" />
          <line x1="480" y1="645" x2="540" y2="633" stroke="#4B5563" className="draw-path" />
          <line x1="450" y1="680" x2="510" y2="668" stroke="#4B5563" className="draw-path" />
          <line x1="420" y1="715" x2="480" y2="703" stroke="#4B5563" className="draw-path" />
        </g>

        {/* Phase 5: Large Curtain Wall Windows & Partition Louvers */}
        <g className="phase-curtain-wall" stroke="#4B5563" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
          {/* Left Wall Window Mullions */}
          <line x1="200" y1="630" x2="200" y2="280" className="draw-path" stroke="#0284C7" strokeWidth="1.6" />
          <line x1="260" y1="590" x2="260" y2="310" className="draw-path" />
          <line x1="320" y1="550" x2="320" y2="340" className="draw-path" />

          {/* Right Wall Window Mullions */}
          <line x1="1000" y1="630" x2="1000" y2="280" className="draw-path" stroke="#DB2777" strokeWidth="1.6" />
          <line x1="940" y1="590" x2="940" y2="310" className="draw-path" />
          <line x1="880" y1="550" x2="880" y2="340" className="draw-path" />

          {/* Horizontal Transom Bars */}
          <line x1="150" y1="360" x2="375" y2="280" className="draw-path" />
          <line x1="150" y1="480" x2="375" y2="400" className="draw-path" />
          <line x1="1050" y1="360" x2="825" y2="280" className="draw-path" />
          <line x1="1050" y1="480" x2="825" y2="400" className="draw-path" />
        </g>

        {/* Phase 6: Spatial Furniture & Scale Elements */}
        <g className="phase-furniture" stroke="#4F46E5" strokeWidth="1.4" vectorEffect="non-scaling-stroke">
          {/* Spatial Lounge Seating Wireframe Box */}
          <polygon
            points="700,680 840,640 920,680 780,725"
            stroke="#4F46E5"
            strokeWidth="1.6"
            className="draw-path"
          />
          <line x1="700" y1="680" x2="700" y2="650" className="draw-path" />
          <line x1="840" y1="640" x2="840" y2="610" className="draw-path" />
          <line x1="920" y1="680" x2="920" y2="650" className="draw-path" />
          <line x1="780" y1="725" x2="780" y2="695" className="draw-path" />
          <polygon
            points="700,650 840,610 920,650 780,695"
            stroke="#4F46E5"
            strokeWidth="1.2"
            className="draw-path"
          />

          {/* Coffee Table Prism */}
          <polygon points="660,715 720,695 760,715 700,735" stroke="#0284C7" className="draw-path" />
          <line x1="660" y1="715" x2="660" y2="700" stroke="#0284C7" className="draw-path" />
          <line x1="720" y1="695" x2="720" y2="680" stroke="#0284C7" className="draw-path" />
          <line x1="760" y1="715" x2="760" y2="700" stroke="#0284C7" className="draw-path" />
          <line x1="700" y1="735" x2="700" y2="720" stroke="#0284C7" className="draw-path" />
          <polygon points="660,700 720,680 760,700 700,720" stroke="#0284C7" className="draw-path" />
        </g>

        {/* Phase 7: Technical Dimension Callouts & Coordinate HUD Markers */}
        <g className="phase-annotations font-mono-tech text-[10px] fill-[#4B5563] pointer-events-none">
          {/* Target Elevation Marker */}
          <g transform="translate(600, 180)">
            <circle cx="0" cy="0" r="14" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
            <line x1="-18" y1="0" x2="18" y2="0" stroke="#0284C7" strokeWidth="1.2" />
            <line x1="0" y1="-18" x2="0" y2="18" stroke="#0284C7" strokeWidth="1.2" />
            <text x="24" y="4" fill="#0284C7" fontSize="11" fontWeight="bold" letterSpacing="1">APEX LVL +8.450M</text>
          </g>

          {/* Mezzanine Level Marker */}
          <g transform="translate(260, 460)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#DB2777" strokeWidth="1.2" />
            <text x="-120" y="4" fill="#DB2777" fontSize="10" fontWeight="bold" letterSpacing="1">FLR +3.600M</text>
          </g>

          {/* Grid Axis Labels */}
          <text x="140" y="710" fill="#4B5563" fontSize="10" fontWeight="bold">AXIS X1</text>
          <text x="600" y="795" fill="#4B5563" fontSize="10" fontWeight="bold">ORIGIN [0, 0, 0]</text>
          <text x="1040" y="710" fill="#4B5563" fontSize="10" fontWeight="bold">AXIS Y1</text>

          {/* Technical Dimension Bracket */}
          <path d="M 120,680 L 100,680 L 100,240 L 120,240" stroke="#4B5563" strokeWidth="1.2" fill="none" className="draw-path" />
          <text x="40" y="465" fill="#4B5563" fontSize="10" fontWeight="bold" transform="rotate(-90 40 465)">CLEAR HT 6.20M</text>
        </g>

        {/* Phase 8: Luminous Blueprint Vertex Point Cloud Nodes */}
        <g className="phase-vertex-nodes pointer-events-none" style={{ opacity: Math.min(1, progress * 1.5) }}>
          {[
            { cx: 150, cy: 680 }, { cx: 600, cy: 770 }, { cx: 1050, cy: 680 }, { cx: 600, cy: 560 },
            { cx: 600, cy: 180 }, { cx: 150, cy: 310 }, { cx: 1050, cy: 310 }, { cx: 375, cy: 435 },
            { cx: 825, cy: 435 }, { cx: 600, cy: 120 }, { cx: 350, cy: 210 }, { cx: 850, cy: 210 },
            { cx: 260, cy: 460 }, { cx: 940, cy: 460 }, { cx: 480, cy: 620 }, { cx: 720, cy: 620 }
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.cx} cy={pt.cy} r="6" fill="url(#vertexGlow)" opacity="0.6" className="animate-pulse" />
              <circle cx={pt.cx} cy={pt.cy} r="2" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>
          ))}
        </g>
      </svg>

      {/* Real-time Assembly HUD Progress Overlay Badge */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 px-3.5 py-1.5 rounded-sm bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm font-mono-tech text-[11px] text-gray-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
          <span className="text-[#0A0A0A] font-bold">BIM STRUCTURE</span>
        </div>
        <span className="text-gray-300">|</span>
        <span className="text-[#0284C7] font-bold">{Math.round(progress * 100)}%</span>
        <span>ASSEMBLED</span>
      </div>
    </div>
  );
};

export default WireframeBuildingInterior;

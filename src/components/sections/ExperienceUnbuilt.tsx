import React, { useState, useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ComparisonSlider } from '../ui/ComparisonSlider';
import { Layers, Box, Glasses, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useStickyScrollProgress } from '../../hooks/useStickyScrollProgress';

export const ExperienceUnbuilt: React.FC = () => {
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  // Sticky scroll progress (0.0 to 1.0) while pinned in viewport
  const { progress } = useStickyScrollProgress(stickyContainerRef, 0);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Discrete active stage based on scroll progress:
  // 0.00 - 0.33 -> Stage 1 (2D Blueprint)
  // 0.33 - 0.66 -> Stage 2 (3D BIM Model)
  // 0.66 - 1.00 -> Stage 3 (Immersive Finished Space)
  const activeStage = progress < 0.33 ? 1 : progress < 0.66 ? 2 : 3;

  // Continuous visual transition factors for clip-paths
  // Stage 1 -> 2 reveal wipe happens between 0.18 and 0.48
  const stage2RevealPercent = Math.max(0, Math.min(100, ((progress - 0.18) / 0.28) * 100));
  // Stage 2 -> 3 reveal wipe happens between 0.52 and 0.82
  const stage3RevealPercent = Math.max(0, Math.min(100, ((progress - 0.52) / 0.28) * 100));

  const comparisonProjects = [
    {
      id: 'residential-study',
      name: 'Residential Architecture Study',
      subtitle: 'Exterior Proportions & Natural Light',
      specs: 'Contemporary Form • Material & Light Study',
      blueprintImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
      renderImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      blueprintLabel: '2D Architectural Plan & Grid',
      renderLabel: '3D Photorealistic Lighting & Material View'
    },
    {
      id: 'interior-study',
      name: 'Interior Living Space Study',
      subtitle: 'Double-Height Living & Joinery Layout',
      specs: 'Material Harmony • Daylight Visualization',
      blueprintImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      renderImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      blueprintLabel: 'Interior Layout & Coordination Drawing',
      renderLabel: 'Interior Material & Ambiance Rendering'
    },
    {
      id: 'commercial-study',
      name: 'Commercial Atrium & Facade Study',
      subtitle: 'Multi-Level Space & Glass Envelope',
      specs: 'Volumetric Study • Spatial Circulation',
      blueprintImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb18fe0f6?auto=format&fit=crop&w=1200&q=85',
      renderImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      blueprintLabel: '3D Structural & Architectural Coordination',
      renderLabel: 'Finished Architectural Visualization'
    }
  ];

  const currentProject = comparisonProjects[activeProjectIndex];

  return (
    <section id="about" className="bg-[#F8F7F5] relative border-t border-gray-200">
      {/* Intro Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 relative z-10">
        <SectionHeading
          number="01"
          badgeText="Visual Evolution"
          badgeVariant="amber"
          title="Experience the"
          highlightText="Unbuilt."
          subtitle="How 3D Naksha transforms flat lines and abstract drawings into intuitive 3D spatial experiences. Scroll through the evolution below."
          align="left"
        />
      </div>

      {/* Main Sticky Storytelling Container (300vh scroll height for smooth pacing) */}
      <div ref={stickyContainerRef} className="relative h-[280vh]">
        {/* Sticky Viewport Anchor */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center z-20 overflow-hidden">
          {/* Ambient Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Stage Selector & Narrative Story */}
              <div className="lg:col-span-5 space-y-6">
                {/* Visual Stage Navigation Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-sm bg-gray-100 border border-gray-200 text-xs font-mono-tech">
                  {[
                    { stg: 1, label: '01 2D Plan', icon: <Layers className="w-3.5 h-3.5" /> },
                    { stg: 2, label: '02 3D BIM', icon: <Box className="w-3.5 h-3.5" /> },
                    { stg: 3, label: '03 Immersive', icon: <Glasses className="w-3.5 h-3.5" /> }
                  ].map((item) => {
                    const isActive = activeStage === item.stg;
                    return (
                      <div
                        key={item.stg}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xs transition-all duration-300 ${
                          isActive
                            ? item.stg === 1
                              ? 'bg-white text-gray-900 font-bold border border-gray-300 shadow-xs'
                              : item.stg === 2
                              ? 'bg-blue-50 text-[#0284C7] font-bold border border-blue-200 shadow-xs'
                              : 'bg-amber-50 text-[#9A6A38] font-bold border border-amber-200 shadow-xs'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {item.icon}
                        <span className="truncate">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Dynamic Narrative Card (Light Theme) */}
                <div className="architectural-panel bg-white/95 p-6 sm:p-8 rounded-lg border border-gray-200 relative overflow-hidden transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                  {/* Stage 1 Narrative */}
                  <div
                    className={`transition-all duration-500 ${
                      activeStage === 1
                        ? 'opacity-100 translate-y-0 block'
                        : 'opacity-0 translate-y-4 hidden'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-tech text-xs text-gray-500 font-bold">
                        STAGE 01 // FOUNDATION
                      </span>
                      <span className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center text-gray-700">
                        <Layers className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">
                      2D Plans & Blueprints
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed mb-5">
                      2D drawings establish dimensional boundaries and room layouts, but flat schematics leave spatial volume, ceiling clearances, and natural daylighting to imagination.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-gray-700 bg-gray-50 p-2.5 rounded-sm border border-gray-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <span>Dimensional Grid & Schematic Baseline</span>
                    </div>
                  </div>

                  {/* Stage 2 Narrative */}
                  <div
                    className={`transition-all duration-500 ${
                      activeStage === 2
                        ? 'opacity-100 translate-y-0 block'
                        : 'opacity-0 translate-y-4 hidden'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-tech text-xs text-[#0284C7] font-bold">
                        STAGE 02 // COORDINATION
                      </span>
                      <span className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center text-[#0284C7]">
                        <Box className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">
                      Coordinated 3D BIM Model
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed mb-5">
                      Parametric 3D geometry coordinates structural spans, wall assemblies, and MEP pathways into a synchronized digital twin for multidisciplinary review.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-[#0284C7] bg-blue-50 p-2.5 rounded-sm border border-blue-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                      <span>Structured Geometric Alignment</span>
                    </div>
                  </div>

                  {/* Stage 3 Narrative */}
                  <div
                    className={`transition-all duration-500 ${
                      activeStage === 3
                        ? 'opacity-100 translate-y-0 block'
                        : 'opacity-0 translate-y-4 hidden'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-tech text-xs text-[#9A6A38] font-bold">
                        STAGE 03 // IMMERSIVE SPACE
                      </span>
                      <span className="w-8 h-8 rounded-sm bg-amber-50 flex items-center justify-center text-[#9A6A38]">
                        <Glasses className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">
                      Immersive Photoreal Space
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed mb-5">
                      Step inside the space at true 1:1 scale to experience room volumes, ambient daylight, and material textures before committing to physical construction.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-[#9A6A38] bg-amber-50 p-2.5 rounded-sm border border-amber-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span>Intuitive Spatial Decision Making</span>
                    </div>
                  </div>
                </div>

                {/* Continuous Scroll Transformation Progress Meter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-gray-600">Scroll to evolve architecture</span>
                    <span className="text-[#9A6A38] font-bold">
                      {Math.round(progress * 100)}% EVOLUTION
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gray-400 via-[#0284C7] to-[#D97706] transition-all duration-150"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Right Column: Layered Multi-Stage Visual Canvas */}
              <div className="lg:col-span-7">
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white corner-crosshairs shadow-xl aspect-[16/10] sm:aspect-[16/10]">
                  {/* Layer 1: 2D Blueprint */}
                  <div className="absolute inset-0 w-full h-full bg-[#0A1628]">
                    <img
                      src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85"
                      alt="Stage 1: 2D Architectural Blueprint"
                      className="w-full h-full object-cover filter contrast-125 saturate-50 hue-rotate-180 brightness-90"
                    />
                    <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none"></div>
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20 text-xs font-mono-tech text-white flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#8A92A0]" />
                      <span>01 // 2D ARCHITECTURAL BLUEPRINT</span>
                    </div>
                  </div>

                  {/* Layer 2: 3D BIM Model (Wipe revealed via clip-path) */}
                  <div
                    className="absolute inset-0 w-full h-full transition-all duration-100"
                    style={{
                      clipPath: `polygon(0 0, ${stage2RevealPercent}% 0, ${stage2RevealPercent}% 100%, 0 100%)`,
                      opacity: stage2RevealPercent > 0 ? 1 : 0
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                      alt="Stage 2: 3D BIM Coordinated Model"
                      className="w-full h-full object-cover brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0284C7]/15 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#0284C7]/40 text-xs font-mono-tech text-[#38BDF8] flex items-center gap-2">
                      <Box className="w-3.5 h-3.5" />
                      <span>02 // COORDINATED 3D BIM GEOMETRY</span>
                    </div>
                  </div>

                  {/* Layer 3: Finished Photorealistic Immersive Space (Wipe revealed via clip-path) */}
                  <div
                    className="absolute inset-0 w-full h-full transition-all duration-100"
                    style={{
                      clipPath: `polygon(0 0, ${stage3RevealPercent}% 0, ${stage3RevealPercent}% 100%, 0 100%)`,
                      opacity: stage3RevealPercent > 0 ? 1 : 0
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"
                      alt="Stage 3: Finished Immersive Visualization"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#D4A373]/40 text-xs font-mono-tech text-[#D4A373] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A93B]" />
                      <span>03 // IMMERSIVE PHOTOREALISTIC WALKTHROUGH</span>
                    </div>
                  </div>

                  {/* Bottom Stage Overlay Status */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/94 backdrop-blur-md p-3.5 rounded-sm border border-gray-200 flex items-center justify-between text-xs font-mono-tech shadow-md">
                    <span className="text-gray-600">
                      Evolution //{' '}
                      <strong className="text-[#0A0A0A]">
                        {activeStage === 1
                          ? '2D Architectural Schematic'
                          : activeStage === 2
                          ? 'Parametric 3D BIM Model'
                          : 'Immersive Spatial Environment'}
                      </strong>
                    </span>
                    <span
                      className={`flex items-center gap-1 font-bold ${
                        activeStage === 1
                          ? 'text-gray-900'
                          : activeStage === 2
                          ? 'text-[#0284C7]'
                          : 'text-[#9A6A38]'
                      }`}
                    >
                      <span>Stage 0{activeStage}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Interactive Exploration Split Slider (Separate tool below the sticky scroll story) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 border-t border-gray-200">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono-tech text-xs text-[#9A6A38] uppercase font-bold tracking-wider">
              Interactive Comparison Tool //
            </span>
            <h3 className="font-display text-2xl font-bold text-[#0A0A0A] mt-1">
              Explore 2D vs 3D Deliverables
            </h3>
          </div>

          {/* Project Selector for Comparison */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {comparisonProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveProjectIndex(idx)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono-tech transition-all shrink-0 cursor-pointer ${
                  activeProjectIndex === idx
                    ? 'bg-[#D4A373] text-[#08090B] font-bold shadow-xs'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-300'
                }`}
              >
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Component */}
        <ComparisonSlider
          blueprintImage={currentProject.blueprintImg}
          renderImage={currentProject.renderImg}
          blueprintLabel={currentProject.blueprintLabel}
          renderLabel={currentProject.renderLabel}
          projectTitle={currentProject.name}
          projectMeta={currentProject.specs}
        />
      </div>
    </section>
  );
};

export default ExperienceUnbuilt;

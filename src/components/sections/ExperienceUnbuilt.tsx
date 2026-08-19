import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ComparisonSlider } from '../ui/ComparisonSlider';
import { Layers, Box, Glasses } from 'lucide-react';

export const ExperienceUnbuilt: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

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
    <section id="experience" className="py-24 bg-[#08090B] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="01"
          badgeText="Visual Evolution"
          badgeVariant="bronze"
          title="Experience the"
          highlightText="Unbuilt."
          subtitle="How 3D Naksha transforms flat lines and abstract drawings into intuitive 3D spatial experiences. Drag the slider to compare stages."
          align="left"
        />

        {/* 3-Stage Evolution Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stage 1: 2D Blueprint */}
          <div className="architectural-panel p-6 rounded-md border-hairline relative group">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-tech text-xs text-[#5A6270]">STAGE 01</span>
              <span className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center text-[#8A92A0]">
                <Layers className="w-4 h-4" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              2D Plans & Drawings
            </h3>
            <p className="text-xs text-[#8A92A0] leading-relaxed mb-4">
              2D drawings establish dimensional layout and basic floor plans, but can be difficult for non-technical stakeholders to visualize in true three-dimensional space.
            </p>
            <div className="text-[11px] font-mono-tech text-[#8A92A0] bg-white/5 px-2.5 py-1 rounded-xs border border-white/10">
              Dimensional & Layout Foundation
            </div>
          </div>

          {/* Stage 2: 3D BIM Model */}
          <div className="architectural-panel p-6 rounded-md border-hairline relative group">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-tech text-xs text-[#38BDF8]">STAGE 02</span>
              <span className="w-8 h-8 rounded-sm bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8]">
                <Box className="w-4 h-4" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Coordinated 3D BIM Model
            </h3>
            <p className="text-xs text-[#8A92A0] leading-relaxed mb-4">
              Structured 3D geometry coordinates architectural, structural, and spatial elements into a cohesive digital representation for multidisciplinary review.
            </p>
            <div className="text-[11px] font-mono-tech text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-1 rounded-xs border border-[#38BDF8]/30">
              Coordinated 3D Representation
            </div>
          </div>

          {/* Stage 3: Immersive VR */}
          <div className="architectural-panel-glow p-6 rounded-md border-[#D4A373]/40 relative group">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-tech text-xs text-[#D4A373]">STAGE 03</span>
              <span className="w-8 h-8 rounded-sm bg-[#D4A373]/15 flex items-center justify-center text-[#D4A373]">
                <Glasses className="w-4 h-4" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Immersive 3D Experience
            </h3>
            <p className="text-xs text-[#8A92A0] leading-relaxed mb-4">
              Step inside the space at true scale to evaluate room volumes, daylight distribution, and material textures before finalizing construction plans.
            </p>
            <div className="text-[11px] font-mono-tech text-[#D4A373] bg-[#D4A373]/10 px-2.5 py-1 rounded-xs border border-[#D4A373]/30">
              Intuitive Spatial Understanding
            </div>
          </div>
        </div>

        {/* Project Selector for Comparison */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <span className="font-mono-tech text-xs text-[#8A92A0] mr-2 shrink-0">
            Select Showcase Example:
          </span>
          {comparisonProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveProjectIndex(idx)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-mono-tech transition-all shrink-0 cursor-pointer ${
                activeProjectIndex === idx
                  ? 'bg-[#D4A373] text-[#08090B] font-bold shadow-md'
                  : 'bg-[#14171D] text-[#8A92A0] hover:text-white border border-white/10'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Component */}
        <div className="mt-4">
          <ComparisonSlider
            blueprintImage={currentProject.blueprintImg}
            renderImage={currentProject.renderImg}
            blueprintLabel={currentProject.blueprintLabel}
            renderLabel={currentProject.renderLabel}
            projectTitle={currentProject.name}
            projectMeta={currentProject.specs}
          />
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import {
  Glasses,
  Sun,
  Eye,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Compass
} from 'lucide-react';

interface ImmersiveVRProps {
  onOpenConsultation: () => void;
}

export const ImmersiveVR: React.FC<ImmersiveVRProps> = ({ onOpenConsultation }) => {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const hotspots = [
    {
      id: 0,
      title: 'Human-Scale Spatial View',
      tag: 'Scale & Proportion',
      x: '30%',
      y: '45%',
      icon: <Eye className="w-4 h-4" />,
      description: 'Experience rooms at natural eye level to evaluate door positions, ceiling heights, and corridor clearances before construction begins.'
    },
    {
      id: 1,
      title: 'Lighting & Daylight Exploration',
      tag: 'Lighting Simulation',
      x: '75%',
      y: '25%',
      icon: <Sun className="w-4 h-4" />,
      description: 'Observe simulated daylight transitions to understand natural light exposure across different living, working, and outdoor zones.'
    },
    {
      id: 2,
      title: 'Material & Finish Visualization',
      tag: 'Material Finishes',
      x: '48%',
      y: '70%',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Compare material options, stone textures, wood grains, and architectural finishes in realistic ambient lighting conditions.'
    },
    {
      id: 3,
      title: 'Sightline & Volume Review',
      tag: 'Spatial Connection',
      x: '65%',
      y: '55%',
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

  return (
    <section
      id="vr-centerpiece"
      className="py-24 bg-[#0B0D11] relative overflow-hidden border-t border-b border-[#D4A373]/25 bg-radial-vr"
    >
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="04"
          badgeText="Flagship VR Services"
          badgeVariant="amber"
          title="Don't imagine the space."
          highlightText="Walk through it."
          subtitle="Experience unbuilt architecture from a true human perspective through interactive walkthroughs and spatial visualization."
          align="left"
        />

        {/* Main Interactive VR Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Interactive Spatial Hotspot Canvas */}
          <div className="lg:col-span-8 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#D4A373]/40 bg-[#0E1013] shadow-2xl corner-crosshairs group aspect-[16/10] sm:aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                alt="Immersive Spatial Walkthrough View"
                className="w-full h-full object-cover brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

              {/* HUD Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 text-[11px] font-mono-tech text-[#E5A93B] flex items-center gap-2">
                <Glasses className="w-3.5 h-3.5" />
                <span>IMMERSIVE SPATIAL WALKTHROUGH</span>
              </div>

              {/* Interactive Hotspot Buttons on Canvas */}
              {hotspots.map((spot) => {
                const isActive = activeHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot.id)}
                    style={{ top: spot.y, left: spot.x }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/spot flex items-center justify-center transition-all cursor-pointer ${
                      isActive ? 'scale-125' : 'scale-100 hover:scale-115'
                    }`}
                    aria-label={spot.title}
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`absolute w-10 h-10 rounded-full animate-ping opacity-75 ${
                        isActive ? 'bg-[#E5A93B]' : 'bg-[#38BDF8]'
                      }`}
                    ></span>
                    
                    {/* Core Button */}
                    <span
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors ${
                        isActive
                          ? 'bg-[#E5A93B] text-[#08090B] border-white'
                          : 'bg-[#0E1013] text-[#38BDF8] border-[#38BDF8]'
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

              {/* Active Hotspot Summary Drawer */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#08090B]/95 backdrop-blur-md p-4 rounded-sm border border-[#D4A373]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E5A93B] animate-pulse"></span>
                    <span className="font-mono-tech text-[10px] text-[#D4A373] uppercase tracking-wider">
                      Point 0{activeHotspot + 1} // {hotspots[activeHotspot].tag}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-white text-sm sm:text-base mt-0.5">
                    {hotspots[activeHotspot].title}
                  </h4>
                  <p className="text-xs text-[#8A92A0] mt-1 max-w-xl">
                    {hotspots[activeHotspot].description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono-tech text-[#38BDF8]">
                    Click markers to explore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits & Viewing Formats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="architectural-panel-glow p-6 rounded-lg border-[#D4A373]/40 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="amber" size="sm">
                  Spatial Understanding
                </Badge>
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                Experience Spaces Before Building
              </h3>

              <p className="text-xs text-[#8A92A0] leading-relaxed">
                Walking through a simulated 3D environment helps clients, architects, and builders align on design decisions and evaluate layouts before committing to on-site work.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2 text-xs text-[#F3F4F6]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Understand spatial proportions and room scale intuitively</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#F3F4F6]">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Review material palettes and lighting options visually</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#F3F4F6]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                  <span>Facilitate clear communication between project stakeholders</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
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
            <div className="bg-[#0E1013] p-5 rounded-lg border border-white/10 space-y-3">
              <div className="text-xs font-mono-tech text-[#8A92A0] uppercase tracking-wider">
                Flexible Viewing Formats
              </div>

              <div className="space-y-2">
                {devices.map((d, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-sm bg-[#14171D] border border-white/5 text-xs"
                  >
                    <div>
                      <div className="text-white font-medium">{d.name}</div>
                      <div className="text-[10px] text-[#8A92A0] font-mono-tech">{d.note}</div>
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

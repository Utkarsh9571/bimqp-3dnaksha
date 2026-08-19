import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { PORTFOLIO_ITEMS } from '../../data/content';
import type { PortfolioItem } from '../../types';
import { Badge } from '../ui/Badge';
import { Maximize2, Sparkles } from 'lucide-react';

interface PortfolioGalleryProps {
  onSelectProject: (item: PortfolioItem) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Showcases' },
    { id: 'residential', label: 'Residential Architecture' },
    { id: 'commercial', label: 'Commercial & Mixed-Use' },
    { id: 'interior', label: 'Interior Visualization' },
    { id: 'vr-bim', label: 'BIM & Simulation' }
  ];

  const filteredItems =
    activeCategory === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="showcase" className="py-24 bg-[#08090B] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            number="07"
            badgeText="Visualization Showcase"
            badgeVariant="bronze"
            title="Selected Architectural"
            highlightText="Visualizations."
            subtitle="Explore representative visualization examples across residential architecture, interior spaces, commercial buildings, and 3D BIM models."
            align="left"
            className="mb-0 md:mb-0"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0E1013] p-1.5 rounded-sm border border-white/10 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xs text-xs font-mono-tech transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#D4A373] text-[#08090B] font-bold shadow-sm'
                    : 'text-[#8A92A0] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProject(item)}
              className="group relative rounded-md overflow-hidden border border-white/10 bg-[#0E1013] hover:border-[#D4A373]/50 transition-all duration-300 cursor-pointer shadow-lg hover-lift flex flex-col"
            >
              {/* Image Canvas with Hover Scale */}
              <div className="aspect-[16/11] relative overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-black/20 group-hover:from-[#08090B]/90 transition-opacity"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge variant="bronze" size="sm" className="bg-[#08090B]/80 backdrop-blur-md">
                    {item.categoryLabel}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-8 h-8 rounded-sm bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Tags on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tech text-[#8A92A0]">
                  <span className="flex items-center gap-1 text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-xs">
                    <Sparkles className="w-3 h-3 text-[#D4A373]" />
                    {item.deliverableType}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#D4A373] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8A92A0] mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#5A6270] truncate max-w-[200px]">
                    {item.capabilities.join(' • ')}
                  </span>
                  <span className="text-[#D4A373] font-semibold group-hover:translate-x-0.5 transition-transform">
                    Inspect View →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

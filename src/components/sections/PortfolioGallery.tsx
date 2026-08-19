import React, { useState, useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { PORTFOLIO_ITEMS } from '../../data/content';
import type { PortfolioItem } from '../../types';
import { Badge } from '../ui/Badge';
import { Maximize2, Sparkles } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface PortfolioGalleryProps {
  onSelectProject: (item: PortfolioItem) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, triggerOnce: true });
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
    <section
      ref={sectionRef}
      id="showcase"
      className="py-24 bg-[#F8F7F5] relative overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            number="08"
            badgeText="Visualization Showcase"
            badgeVariant="amber"
            title="Selected Architectural"
            highlightText="Visualizations."
            subtitle="Explore representative visualization examples across residential architecture, interior spaces, commercial buildings, and 3D BIM models."
            align="left"
            className="mb-0 md:mb-0"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-sm border border-gray-200 shrink-0 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xs text-xs font-mono-tech transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#D4A373] text-[#08090B] font-bold shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const delay = (idx % 6) * 90;
            return (
              <div
                key={item.id}
                onClick={() => onSelectProject(item)}
                className="group relative rounded-md overflow-hidden border border-gray-200 bg-white hover:border-gray-300 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-md hover-lift flex flex-col"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`
                }}
              >
                {/* Image Canvas with Hover Scale */}
                <div className="aspect-[16/11] relative overflow-hidden bg-gray-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/80 transition-opacity"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="amber" size="sm" className="bg-black/75 text-amber-300 border-white/20 backdrop-blur-md">
                      {item.categoryLabel}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-8 h-8 rounded-sm bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Tags on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tech text-white">
                    <span className="flex items-center gap-1 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A93B]" />
                      {item.deliverableType}
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0A0A0A] group-hover:text-[#9A6A38] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-gray-500 truncate max-w-[200px]">
                      {item.capabilities.join(' • ')}
                    </span>
                    <span className="text-[#9A6A38] font-bold group-hover:translate-x-1 transition-transform">
                      Inspect View →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;

import React from 'react';
import { Camera, Tag } from 'lucide-react';
import type { DetailedServiceData } from '../../types';

interface ServiceVisualShowcaseProps {
  service: DetailedServiceData;
}

export const ServiceVisualShowcase: React.FC<ServiceVisualShowcaseProps> = ({ service }) => {
  return (
    <section className="py-20 bg-[#0C0D10] text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-800 pb-6">
          <div>
            <div className="font-mono-tech text-xs text-accent-amber-gold uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              <span>06 // VISUAL STORYTELLING SHOWCASE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Visual Capabilities Spectrum
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-gray-400 max-w-md">
            Selected visual studies demonstrating technical massing, interior finish fidelity, and spatial coordination for {service.title}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {service.visualShowcase.map((item, idx) => (
            <div
              key={idx}
              className="architectural-panel bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-80 overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="font-mono-tech text-[11px] bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 font-bold px-2.5 py-1 rounded-sm">
                    STUDY 0{idx + 1}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-mono-tech text-xs text-amber-400 font-semibold mb-0.5">
                    {item.subtitle}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  {item.caption}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-800">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-[10px] font-mono-tech text-gray-300"
                    >
                      <Tag className="w-3 h-3 text-accent-bronze" />
                      <span className='text-gray-400'>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

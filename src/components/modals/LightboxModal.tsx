import React, { useEffect } from 'react';
import { X, Maximize2, Check, Sparkles } from 'lucide-react';
import type { PortfolioItem } from '../../types';
import { Badge } from '../ui/Badge';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onSelectProjectForQuote?: (item: PortfolioItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onSelectProjectForQuote
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      data-lenis-prevent="true"
    >
      <div
        className="relative w-full max-w-5xl bg-white border border-gray-300 rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Close Button (Min 44x44px touch target) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 min-w-[44px] min-h-[44px] rounded-sm bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High-Res Image Area */}
        <div className="lg:w-3/5 bg-black relative flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover max-h-[60vh] lg:max-h-[85vh]"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 text-xs font-mono-tech text-[#E5A93B] flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>High-Resolution Visualization</span>
          </div>
        </div>

        {/* Info & Metadata Panel (Light Theme) */}
        <div 
          className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white border-t lg:border-t-0 lg:border-l border-gray-200"
          data-lenis-prevent="true"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="amber" size="sm">
                {item.categoryLabel}
              </Badge>
            </div>

            <h3 className="font-display text-2xl font-bold text-[#0A0A0A] mb-2 leading-tight">
              {item.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-[#9A6A38] font-mono-tech font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{item.deliverableType}</span>
            </div>

            <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Architectural Highlights */}
            <div className="mb-5">
              <div className="text-xs font-mono-tech text-gray-700 uppercase font-semibold mb-2">
                Visualization Focus
              </div>
              <ul className="space-y-1.5">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-800">
                    <Check className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capabilities */}
            <div className="mb-6">
              <div className="text-xs font-mono-tech text-gray-700 uppercase font-semibold mb-2">
                Applied Capabilities
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.capabilities.map((cap, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono-tech px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-xs text-gray-700 font-medium"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          {onSelectProjectForQuote && (
            <button
              onClick={() => {
                onClose();
                onSelectProjectForQuote(item);
              }}
              className="w-full py-3 px-4 rounded-sm bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-display font-semibold text-xs tracking-wider uppercase transition-all hover:opacity-90 cursor-pointer text-center shadow-sm"
            >
              Inquire About Similar Visualization
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;

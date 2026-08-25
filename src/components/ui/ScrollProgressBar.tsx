import React, { useEffect, useRef } from 'react';
import { getLenis, onReducedMotionChange, prefersReducedMotion } from '../../lib/animations';

interface ScrollProgressBarProps {
  className?: string;
  height?: number; // in pixels, defaults to 3
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className = '',
  height = 3
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isReduced = prefersReducedMotion();

    const updateProgress = (progressRatio: number) => {
      const clamped = Math.max(0, Math.min(1, progressRatio));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = clamped > 0.005 ? '1' : '0';
        glowRef.current.style.transform = `scaleX(${clamped})`;
      }
    };

    const calculateNativeProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      updateProgress(progress);
    };

    // 1. Initial calculation
    calculateNativeProgress();

    // 2. Lenis integration listener
    const lenis = getLenis();
    const handleLenisScroll = (e: { progress?: number }) => {
      if (typeof e.progress === 'number') {
        updateProgress(e.progress);
      } else {
        calculateNativeProgress();
      }
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    }

    // 3. Fallback/Native window scroll listener
    window.addEventListener('scroll', calculateNativeProgress, { passive: true });
    window.addEventListener('resize', calculateNativeProgress, { passive: true });

    // 4. Listen for reduced motion changes
    const unsubscribeReduced = onReducedMotionChange((reduced) => {
      isReduced = reduced;
      if (isReduced) {
        calculateNativeProgress();
      }
    });

    return () => {
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
      window.removeEventListener('scroll', calculateNativeProgress);
      window.removeEventListener('resize', calculateNativeProgress);
      unsubscribeReduced();
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-label="Page scroll progress"
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

      {/* Main Red-to-Blue-to-Purple Gradient Progress Fill */}
      <div
        ref={barRef}
        className="h-full w-full origin-left will-change-transform"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #EF4444 0%, #3B82F6 50%, #8B5CF6 100%)',
          transition: 'transform 0.05s linear'
        }}
      />

      {/* Ambient Neon Glow layer */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 right-0 h-full origin-left pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #EF4444 0%, #3B82F6 50%, #8B5CF6 100%)',
          boxShadow: '0 0 12px 1px rgba(139, 92, 246, 0.7), 0 0 6px 1px rgba(239, 68, 68, 0.6)',
          filter: 'blur(1px)'
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;

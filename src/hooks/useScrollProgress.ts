import { useState, useEffect, type RefObject } from 'react';

interface ScrollProgressOptions {
  /** Offset at top where progress starts (0 = bottom of viewport, 0.5 = middle, 1 = top) */
  offsetStart?: number;
  /** Offset at bottom where progress completes */
  offsetEnd?: number;
  /** Whether to clamp output between 0 and 1 (default: true) */
  clamp?: boolean;
}

export function useScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  options: ScrollProgressOptions = {}
) {
  const { offsetStart = 0.1, offsetEnd = 0.9, clamp = true } = options;
  const [progress, setProgress] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(1);
      setIsInView(true);
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const el = targetRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress calculation based on viewport entry to exit
        const startY = windowHeight * (1 - offsetStart);
        const endY = -rect.height * offsetEnd;
        const totalDistance = startY - endY;
        const currentDistance = startY - rect.top;

        let currentProgress = totalDistance > 0 ? currentDistance / totalDistance : 0;

        if (clamp) {
          currentProgress = Math.max(0, Math.min(1, currentProgress));
        }

        const visible = rect.bottom > 0 && rect.top < windowHeight;

        setProgress(currentProgress);
        setIsInView(visible);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [targetRef, offsetStart, offsetEnd, clamp]);

  return { progress, isInView };
}

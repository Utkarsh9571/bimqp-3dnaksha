import { useState, useEffect, type RefObject } from 'react';

/**
 * Custom hook to calculate the precise scroll progress (0.0 to 1.0) of a sticky container.
 * Progress = 0 when the sticky child first hits its pinned top position.
 * Progress = 1 when the user reaches the end of the container height (just before unpinning).
 */
export function useStickyScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
  stickyTopOffset: number = 0
) {
  const [progress, setProgress] = useState<number>(0);
  const [isPinned, setIsPinned] = useState<boolean>(false);

  useEffect(() => {
    // Accessibility check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(1);
      setIsPinned(false);
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollableDistance = rect.height - windowHeight;

        if (totalScrollableDistance <= 0) {
          setProgress(0);
          setIsPinned(false);
          return;
        }

        // Distance scrolled from when container top hits stickyTopOffset
        const scrolledDistance = stickyTopOffset - rect.top;
        const rawProgress = scrolledDistance / totalScrollableDistance;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));

        const currentlyPinned = rect.top <= stickyTopOffset && rect.bottom >= stickyTopOffset + windowHeight;

        setProgress(clampedProgress);
        setIsPinned(currentlyPinned);
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
  }, [containerRef, stickyTopOffset]);

  return { progress, isPinned };
}

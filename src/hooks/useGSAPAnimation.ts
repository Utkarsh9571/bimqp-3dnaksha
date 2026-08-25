import { useEffect, useRef, type DependencyList, type RefObject } from 'react';
import { gsap, prefersReducedMotion } from '../lib/animations';

type GSAPAnimationCallback = (context: gsap.Context, isReducedMotion: boolean) => void | (() => void);

/**
 * Custom React hook for managing GSAP animations with automatic context scoping
 * and ScrollTrigger cleanup upon component unmount.
 *
 * @param callback - Function where GSAP animations/timelines are initialized
 * @param scopeRef - Optional RefObject to scope selector queries to
 * @param deps - Dependency array that triggers re-animation when changed
 */
export function useGSAPAnimation(
  callback: GSAPAnimationCallback,
  scopeRef?: RefObject<HTMLElement | null>,
  deps: DependencyList = []
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const scopeElement = scopeRef?.current ?? undefined;

    // Use gsap.context for scoped selector queries and clean unmount
    const ctx = gsap.context(() => {
      callbackRef.current(ctx, isReduced);
    }, scopeElement);

    return () => {
      ctx.revert(); // Reverts all GSAP animations and kills associated ScrollTriggers
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useGSAPAnimation;

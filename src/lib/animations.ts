import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins in browser environments
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Singleton state
let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export interface LenisConfigOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
}

/**
 * Checks if the user has requested reduced motion in their OS or browser settings.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Subscribes to changes in the prefers-reduced-motion media query.
 */
export const onReducedMotionChange = (
  callback: (isReduced: boolean) => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listener = (event: MediaQueryListEvent) => {
    callback(event.matches);
  };

  mediaQuery.addEventListener('change', listener);
  return () => mediaQuery.removeEventListener('change', listener);
};

/**
 * Initializes Lenis smooth scrolling and wires it directly into GSAP's ticker
 * and ScrollTrigger to maintain perfect frame synchronization.
 * 
 * If prefers-reduced-motion is detected, smooth inertia scrolling is skipped.
 */
export const initSmoothScroll = (
  options: LenisConfigOptions = {}
): Lenis | null => {
  if (typeof window === 'undefined') return null;

  // If user prefers reduced motion, do not activate smooth scroll inertia
  if (prefersReducedMotion()) {
    if (lenisInstance) {
      destroySmoothScroll();
    }
    return null;
  }

  // If already initialized, return the existing instance
  if (lenisInstance) {
    return lenisInstance;
  }

  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation = 'vertical',
    gestureOrientation = 'vertical',
    smoothWheel = true,
    wheelMultiplier = 1,
    touchMultiplier = 1.5,
    autoResize = true,
    ...rest
  } = options;

  const lenis = new Lenis({
    duration,
    easing,
    orientation,
    gestureOrientation,
    smoothWheel,
    wheelMultiplier,
    touchMultiplier,
    autoResize,
    ...rest
  });

  lenisInstance = lenis;

  // 1. Sync Lenis scroll events directly with GSAP ScrollTrigger updates
  lenis.on('scroll', ScrollTrigger.update);

  // 2. Add Lenis's raf call into GSAP's ticker loop
  tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  // 3. Disable GSAP's lag smoothing to avoid jumps during momentum scrolling
  gsap.ticker.lagSmoothing(0);

  return lenis;
};

/**
 * Returns the currently active Lenis instance, if any.
 */
export const getLenis = (): Lenis | null => {
  return lenisInstance;
};

/**
 * Tears down Lenis smooth scroll and cleans up GSAP ticker integration.
 */
export const destroySmoothScroll = (): void => {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};

/**
 * Smoothly scrolls to a target element or coordinate using Lenis when available,
 * falling back to native window.scrollTo.
 */
export const smoothScrollTo = (
  target: string | HTMLElement | number,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    onComplete?: () => void;
  }
): void => {
  const isReduced = prefersReducedMotion();

  if (isReduced) {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      }
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'auto' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'auto' });
    }
    options?.onComplete?.();
    return;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
      immediate: options?.immediate ?? false,
      onComplete: options?.onComplete
    });
  } else {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    if (options?.onComplete) {
      setTimeout(options.onComplete, (options.duration ?? 0.8) * 1000);
    }
  }
};

/* ==========================================================================
   Reusable Section Animation Helpers
   ========================================================================== */

export interface FadeUpOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | gsap.StaggerVars;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
}

/**
 * Creates an entrance fade-up animation for a single element or node collection.
 * Automatically respects `prefers-reduced-motion`.
 */
export const animateFadeUp = (
  targets: gsap.DOMTarget,
  options: FadeUpOptions = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  const {
    trigger = targets,
    start = 'top 85%',
    distance = 32,
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    once = true,
    toggleActions = once ? 'play none none none' : 'play reverse play reverse',
    ...rest
  } = options;

  gsap.set(targets, { opacity: 0, y: distance });

  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      toggleActions,
      ...rest
    }
  });
};

export interface StaggerFadeUpOptions extends FadeUpOptions {
  stagger?: number | gsap.StaggerVars;
}

/**
 * Staggers a list of child elements into view as they enter the viewport.
 */
export const animateStaggerFadeUp = (
  targets: gsap.DOMTarget,
  options: StaggerFadeUpOptions = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  const {
    trigger = targets,
    start = 'top 85%',
    distance = 28,
    duration = 0.7,
    stagger = 0.12,
    ease = 'power3.out',
    once = true,
    toggleActions = once ? 'play none none none' : 'play reverse play reverse',
    ...rest
  } = options;

  gsap.set(targets, { opacity: 0, y: distance });

  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      toggleActions,
      ...rest
    }
  });
};

export interface ParallaxOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  speed?: number; // e.g. -50 to +50 for percentage or pixel movement
  ease?: string;
}

/**
 * Creates a smooth scroll-linked parallax effect on an element.
 */
export const animateParallax = (
  target: gsap.DOMTarget,
  options: ParallaxOptions = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(target, { y: 0 });
    return null;
  }

  const {
    trigger = target,
    start = 'top bottom',
    end = 'bottom top',
    speed = -40,
    ease = 'none'
  } = options;

  return gsap.fromTo(
    target,
    { y: -speed },
    {
      y: speed,
      ease,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        end,
        scrub: true
      }
    }
  );
};

export interface ScaleRevealOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  fromScale?: number;
  duration?: number;
  ease?: string;
}

/**
 * Smooth scale & opacity reveal for cards or media previews.
 */
export const animateScaleReveal = (
  target: gsap.DOMTarget,
  options: ScaleRevealOptions = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, scale: 1 });
    return null;
  }

  const {
    trigger = target,
    start = 'top 85%',
    fromScale = 0.95,
    duration = 0.8,
    ease = 'power2.out'
  } = options;

  gsap.set(target, { opacity: 0, scale: fromScale });

  return gsap.to(target, {
    opacity: 1,
    scale: 1,
    duration,
    ease,
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      toggleActions: 'play none none none'
    }
  });
};

// Re-export GSAP and ScrollTrigger for direct advanced usage
export { gsap, ScrollTrigger, Lenis };
export default gsap;

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media query matches with SSR/hydration safety and resize/orientation listeners.
 * @param query CSS media query string (e.g. '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(query);

    const updateMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    setMatches(mediaQueryList.matches);

    // Modern and legacy event listener fallback
    try {
      mediaQueryList.addEventListener('change', updateMatch);
    } catch {
      mediaQueryList.addListener(updateMatch);
    }

    return () => {
      try {
        mediaQueryList.removeEventListener('change', updateMatch);
      } catch {
        mediaQueryList.removeListener(updateMatch);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Returns true if viewport is >= 768px (Tablets, Laptops, Desktops)
 * Returns false for mobile phones (< 768px)
 */
export function useIsTabletOrDesktop(): boolean {
  return useMediaQuery('(min-width: 768px)');
}

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Lenis from 'lenis';
import { getLenis, smoothScrollTo } from '../lib/animations';

const subscribeToLenis = (callback: () => void) => {
  const instance = getLenis();
  if (instance) {
    instance.on('scroll', callback);
    return () => instance.off('scroll', callback);
  }
  return () => {};
};

export function useLenis(onScroll?: (lenis: Lenis) => void) {
  const lenis = useSyncExternalStore(
    subscribeToLenis,
    () => getLenis(),
    () => null
  );

  const onScrollRef = useRef(onScroll);

  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    const instance = getLenis();
    if (!instance || !onScroll) return;

    const handleScroll = (l: Lenis) => {
      onScrollRef.current?.(l);
    };

    instance.on('scroll', handleScroll);
    return () => {
      instance.off('scroll', handleScroll);
    };
  }, [lenis, onScroll]);

  return {
    lenis,
    scrollTo: smoothScrollTo
  };
}

export default useLenis;

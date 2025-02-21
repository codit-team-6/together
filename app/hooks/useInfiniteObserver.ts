import {useRef, useEffect, useCallback} from 'react';

export const useInfiniteObserver = (callback: () => void) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px',
      threshold: 0.2,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleIntersection]);

  return observerRef;
};

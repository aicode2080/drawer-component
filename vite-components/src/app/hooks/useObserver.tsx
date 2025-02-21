import { useEffect, useState } from 'react';

export default function useResizeObserver(ref: React.RefObject<HTMLElement | null>, callBack: (entry: ResizeObserverEntry) => void) {
  const [resizeObserver, setResizeObserver] = useState<ResizeObserver | null>(null);
  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      entries.forEach((entry) => callBack(entry));
    });
    setResizeObserver(obs);
    const dom = ref.current;
    if (dom) {
      obs.observe(dom);
    }
    return () => {
      if (dom) {
        obs.unobserve(dom);
      }
      obs.disconnect();
    };
  }, [ref]);
  return resizeObserver;
}

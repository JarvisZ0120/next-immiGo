'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Tracks container size for charts. Height scales with width (clamp) so charts
 * adapt across phone / laptop / large desktop without fixed px heights.
 */
export function useObservedChartSize(options = {}) {
  const {
    minHeight = 240,
    maxHeight = 560,
    heightRatio = 0.42,
    minWidth = 1,
  } = options;

  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const cr = entry.contentRect;
        const width = Math.max(minWidth, Math.floor(cr.width));
        let height = Math.round(width * heightRatio);
        height = Math.max(minHeight, Math.min(maxHeight, height));

        setSize((prev) => {
          if (prev.width === width && prev.height === height) return prev;
          return { width, height };
        });
      });
    });

    ro.observe(el);
    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [minHeight, maxHeight, heightRatio, minWidth]);

  return [ref, size];
}

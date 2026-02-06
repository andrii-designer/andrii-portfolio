"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const SOLID_SELECTOR = "[data-header-solid], [data-header-theme=\"light\"]";

/**
 * Observes [data-header-solid] and [data-header-theme="light"] elements.
 * When any overlap the header area, toggles header--solid on the header (disables blend).
 * Lightweight IntersectionObserver only — no scroll listeners, no image analysis.
 */
export default function useHeaderSolidObserver(
  headerRef: RefObject<HTMLElement | null>
): boolean {
  const [isSolid, setIsSolid] = useState(false);
  const intersectingRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined" || !headerRef?.current) return;

    const elements = document.querySelectorAll(SOLID_SELECTOR);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const set = intersectingRef.current;
        for (const entry of entries) {
          if (entry.isIntersecting) set.add(entry.target);
          else set.delete(entry.target);
        }
        setIsSolid(set.size > 0);
      },
      {
        root: null,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headerRef]);

  return isSolid;
}

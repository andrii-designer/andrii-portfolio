"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const DEFAULT_SELECTOR = ".dark-section, [data-header-theme=\"dark\"]";
const DEBOUNCE_MS = 20;

export type UseHeaderDarkObserverOptions = {
  selector?: string;
  rootMargin?: string;
};

/**
 * Observes .dark-section and [data-header-theme="dark"] elements.
 * When any overlap the header area (top of viewport), returns true (header--dark).
 * Client-only; uses IntersectionObserver with optional scroll fallback.
 */
export default function useHeaderDarkObserver(
  headerRef: RefObject<HTMLElement | null>,
  options?: UseHeaderDarkObserverOptions
): boolean {
  const { selector = DEFAULT_SELECTOR, rootMargin: optionsRootMargin } = options ?? {};
  const [isDark, setIsDark] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intersectingRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const header = headerRef?.current;
    const headerHeight = header ? header.getBoundingClientRect().height : 80;
    const rootMargin =
      optionsRootMargin ?? `0px 0px calc(-100vh + ${Math.round(headerHeight)}px) 0px`;

    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const apply = (value: boolean) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        setIsDark(value);
      }, DEBOUNCE_MS);
    };

    if (typeof IntersectionObserver === "undefined") {
      const check = () => {
        const first = document.querySelector(selector);
        if (!first) {
          apply(false);
          return;
        }
        const rect = first.getBoundingClientRect();
        const overlapping = rect.top < headerHeight && rect.bottom > 0;
        apply(overlapping);
      };
      window.addEventListener("scroll", check, { passive: true });
      check();
      return () => {
        window.removeEventListener("scroll", check);
        if (debounceRef.current) clearTimeout(debounceRef.current);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const set = intersectingRef.current;
        for (const entry of entries) {
          if (entry.isIntersecting) set.add(entry.target);
          else set.delete(entry.target);
        }
        apply(set.size > 0);
      },
      { root: null, rootMargin, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [headerRef, selector, optionsRootMargin]);

  return isDark;
}

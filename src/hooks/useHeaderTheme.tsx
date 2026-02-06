"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const SECTION_SELECTOR = "section, [data-header-theme-watch], .section-wrap";
const DEBOUNCE_MS = 80;
const LUMINANCE_DARK_THRESHOLD = 0.5;
const SAMPLE_SIZE = 32;

/** Relative luminance from 0–1 (dark to light). Uses sRGB coefficients. */
function getLuminanceFromRgb(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0872 * bs;
}

/** Parse computed backgroundColor (e.g. "rgb(0,0,0)" or "rgba(0,0,0,0)") to R,G,B or null if transparent. */
function parseBackgroundColor(computed: string): { r: number; g: number; b: number } | null {
  if (!computed || computed === "transparent") return null;
  const rgb = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgb) {
    const alpha = rgb[4] != null ? parseFloat(rgb[4]) : 1;
    if (alpha === 0) return null;
    return { r: parseInt(rgb[1], 10), g: parseInt(rgb[2], 10), b: parseInt(rgb[3], 10) };
  }
  return null;
}

/** Compute theme from element: data-header-theme first, then backgroundColor, then image sampling, else light. */
const imageLuminanceCache = new Map<string, boolean>(); // src -> isDark

function getThemeFromBackgroundColor(el: Element): "light" | "dark" | null {
  const style = window.getComputedStyle(el);
  const bg = style.backgroundColor;
  const parsed = parseBackgroundColor(bg);
  if (parsed === null) return null;
  const lum = getLuminanceFromRgb(parsed.r, parsed.g, parsed.b);
  return lum < LUMINANCE_DARK_THRESHOLD ? "dark" : "light";
}

/** Sample image via canvas; returns true if dark (average luminance < 0.5). Cached by src. CORS failures fallback to null. */
function getThemeFromImage(img: HTMLImageElement): Promise<"light" | "dark" | null> {
  const src = img.currentSrc || img.src;
  if (!src) return Promise.resolve(null);
  const cached = imageLuminanceCache.get(src);
  if (cached !== undefined) return Promise.resolve(cached ? "dark" : "light");

  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = SAMPLE_SIZE;
    canvas.height = SAMPLE_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve(null);
      return;
    }
    const sampleImg = new window.Image();
    sampleImg.crossOrigin = "anonymous";
    sampleImg.onload = () => {
      try {
        ctx.drawImage(sampleImg, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const data = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
        let r = 0,
          g = 0,
          b = 0,
          n = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          n += 1;
        }
        if (n === 0) {
          resolve(null);
          return;
        }
        const lum = getLuminanceFromRgb(r / n, g / n, b / n);
        const isDark = lum < LUMINANCE_DARK_THRESHOLD;
        imageLuminanceCache.set(src, isDark);
        resolve(isDark ? "dark" : "light");
      } catch {
        imageLuminanceCache.delete(src);
        resolve(null);
      }
    };
    sampleImg.onerror = () => {
      imageLuminanceCache.delete(src);
      resolve(null);
    };
    sampleImg.src = src;
  });
}

/** Find a visible img in element or its descendants; prefer first img. */
function findVisibleImage(el: Element): HTMLImageElement | null {
  const img = el.querySelector("img");
  if (img && img.complete && img.naturalWidth > 0) return img;
  return null;
}

/** Resolve theme for one section: attribute > backgroundColor > image sampling > light. */
async function resolveSectionTheme(el: Element): Promise<"light" | "dark"> {
  const attr = el.getAttribute("data-header-theme");
  if (attr === "dark" || attr === "light") return attr;

  const fromBg = getThemeFromBackgroundColor(el);
  if (fromBg !== null) return fromBg;

  const img = findVisibleImage(el);
  if (img) {
    const fromImg = await getThemeFromImage(img);
    if (fromImg !== null) return fromImg;
  }

  return "light";
}

export type HeaderTheme = "light" | "dark";

export default function useHeaderTheme(
  headerRef?: RefObject<HTMLElement | null>
): { theme: HeaderTheme; setTheme: (t: HeaderTheme | null) => void } {
  const [autoTheme, setAutoTheme] = useState<HeaderTheme>("light");
  const [manualOverride, setManualOverride] = useState<HeaderTheme | null>(null);
  const manualRef = useRef<HeaderTheme | null>(null);
  useEffect(() => {
    manualRef.current = manualOverride;
  }, [manualOverride]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setTheme = useCallback((t: HeaderTheme | null) => {
    setManualOverride(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const main = document.querySelector("main");
    const getSections = (): Element[] => {
      const raw = document.querySelectorAll(SECTION_SELECTOR);
      const headerEl = headerRef?.current ?? null;
      return Array.from(raw).filter((el) => el !== headerEl && (main ? main.contains(el) : true));
    };

    let sections = getSections();
    if (sections.length === 0) return;

    const updateThemeForSection = (el: Element) => {
      if (manualRef.current !== null) {
        setAutoTheme(manualRef.current);
        return;
      }
      resolveSectionTheme(el).then((resolved) => {
        setAutoTheme(resolved);
      });
    };

    const debouncedUpdate = (el: Element) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        updateThemeForSection(el);
      }, DEBOUNCE_MS);
    };

    const pickActiveSection = (entries: IntersectionObserverEntry[]): Element | null => {
      const withRatio = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0);
      if (withRatio.length === 0) return null;
      withRatio.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      return withRatio[0].target;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const active = pickActiveSection(entries);
        if (active) debouncedUpdate(active);
      },
      {
        root: null,
        rootMargin: "0px 0px -80% 0px",
        threshold: [0, 0.1, 0.2, 0.5, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (manualRef.current !== null) return;
      sections = getSections();
      const headerBottom = 70;
      let best: Element | null = null;
      let bestTop = Infinity;
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= headerBottom) {
          if (rect.top < bestTop) {
            bestTop = rect.top;
            best = el;
          }
        }
      }
      if (best) debouncedUpdate(best);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headerRef]);

  return {
    theme: manualOverride ?? autoTheme,
    setTheme,
  };
}

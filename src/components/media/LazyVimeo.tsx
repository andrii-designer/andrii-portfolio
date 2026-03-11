"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type LazyVimeoProps = {
  /** Vimeo numeric id — informational only */
  id?: string;
  /** Public path to the poster image shown before the video loads */
  poster: string;
  /**
   * CSS padding-top percentage that sets the intrinsic aspect ratio, e.g. "56.25%".
   * Required when fill is false (the default). Ignored when fill is true.
   */
  aspectPadding?: string;
  /**
   * Fill mode — the wrapper stretches to fill its positioned ancestor (position:
   * absolute; inset: 0). Use this when the parent element already defines the
   * desired height (e.g. an aspect-ratio container like .video-section-inner).
   * Default: false.
   */
  fill?: boolean;
  /** Full Vimeo player iframe src URL */
  iframeSrc: string;
  className?: string;
  ariaLabel?: string;
  /**
   * When true, insert the iframe automatically once the wrapper enters the
   * viewport (useful for background/ambient videos). Default: false.
   */
  playOnVisible?: boolean;
  /** IntersectionObserver rootMargin — default "200px" */
  rootMargin?: string;
};

/**
 * LazyVimeo — deferred Vimeo embed.
 *
 * Shows a poster until the iframe is inserted. When playOnVisible=true, the
 * iframe is inserted automatically when the wrapper enters the viewport (no
 * play button or controls). When playOnVisible=false, the iframe is never
 * inserted (poster only).
 *
 * Critical positioning is applied via inline styles so layout is correct
 * regardless of global CSS parse order (avoids FOUC-driven height jumps).
 *
 * Token used: --token-color-primary (#d2d2d6) via .lazy-vimeo background.
 */
export default function LazyVimeo({
  poster,
  aspectPadding = "56.25%",
  fill = false,
  iframeSrc,
  className,
  ariaLabel,
  playOnVisible = false,
  rootMargin = "200px",
}: LazyVimeoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInserted, setIsInserted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const insertedRef = useRef(false);

  const insertIframe = () => {
    if (insertedRef.current) return;
    insertedRef.current = true;
    setIsInserted(true);
  };

  // Auto-insert on viewport entry — all observer/window usage inside useEffect.
  useEffect(() => {
    if (!playOnVisible) return;
    const el = wrapperRef.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      insertIframe();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          insertIframe();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playOnVisible, rootMargin]);

  // Wrapper sizing: fill mode = stretch to parent; normal mode = padding-top ratio.
  const wrapperStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : { paddingTop: aspectPadding, position: "relative" };

  // Inline styles for all absolutely-positioned children so layout is correct
  // even if global CSS hasn't parsed yet (prevents FOUC height expansion).
  const absoluteFill: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  const wrapperClassName = [
    "lazy-vimeo",
    isLoaded ? "is-loaded" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassName}
      style={{ overflow: "hidden", ...wrapperStyle }}
    >
      {poster && !isLoaded && (
        <img
          className="lazy-vimeo-poster"
          src={poster}
          alt=""
          aria-hidden="true"
          style={{ ...absoluteFill, objectFit: "cover", display: "block" }}
        />
      )}

      {isInserted && (
        <iframe
          src={iframeSrc}
          title={ariaLabel ?? "Vimeo video player"}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            ...absoluteFill,
            border: 0,
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 240ms ease",
          }}
        />
      )}
    </div>
  );
}

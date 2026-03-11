"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

export type LazyVimeoProps = {
  /** Vimeo numeric id — informational, not used directly (use iframeSrc instead) */
  id?: string;
  /** Public path to the poster image shown before the video loads */
  poster: string;
  /** CSS padding-top percentage preserving the video aspect ratio, e.g. "56.25%" */
  aspectPadding: string;
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
 * Shows a poster image and a play button overlay; the <iframe> is NOT
 * inserted into the DOM until the user clicks play (or, if `playOnVisible`
 * is true, until the wrapper enters the viewport).
 *
 * When the iframe fires 'load', the wrapper receives `.is-loaded` which
 * triggers a CSS opacity fade-in (see `.lazy-vimeo` in globals.css).
 *
 * Token used: --token-color-primary (#d2d2d6) via .lazy-vimeo background.
 */
export default function LazyVimeo({
  poster,
  aspectPadding,
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

  // Auto-insert when element enters viewport (only when playOnVisible is true).
  // All window/observer usage is inside useEffect — safe for SSR.
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
    // insertIframe is stable (ref-guarded); rootMargin/playOnVisible are primitives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playOnVisible, rootMargin]);

  const handleClick = () => insertIframe();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      insertIframe();
    }
  };

  const wrapperClassName = [
    "lazy-vimeo",
    isLoaded ? "is-loaded" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // paddingTop sets the aspect-ratio height; position:relative comes from CSS.
  const wrapperStyle: CSSProperties = {
    paddingTop: aspectPadding,
    position: "relative",
  };

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={wrapperStyle}>
      {poster && !isLoaded && (
        <img
          className="lazy-vimeo-poster"
          src={poster}
          alt=""
          aria-hidden="true"
        />
      )}

      {!isInserted && (
        <button
          type="button"
          className="play-overlay"
          aria-label={ariaLabel ?? "Play video"}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.45)" />
            <polygon points="26,20 50,32 26,44" fill="white" />
          </svg>
        </button>
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
        />
      )}
    </div>
  );
}

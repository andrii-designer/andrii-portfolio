"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { usePreloader } from "@/contexts/PreloaderContext";
import { useFirstScroll } from "@/contexts/FirstScrollContext";

const VIMEO_PLAYER_SCRIPT = "https://player.vimeo.com/api/player.js";

type VimeoPlayer = new (el: HTMLIFrameElement) => { on: (event: string, cb: () => void) => void };

function loadVimeoPlayer(): Promise<VimeoPlayer> {
  return new Promise((resolve, reject) => {
    const win = typeof window !== "undefined" ? window : null;
    const Vimeo = win ? (win as unknown as { Vimeo?: { Player: VimeoPlayer } }).Vimeo : null;
    if (Vimeo?.Player) {
      resolve(Vimeo.Player);
      return;
    }
    const script = document.createElement("script");
    script.src = VIMEO_PLAYER_SCRIPT;
    script.async = true;
    script.onload = () => {
      const P = (window as unknown as { Vimeo: { Player: VimeoPlayer } }).Vimeo?.Player;
      if (P) resolve(P);
      else reject(new Error("Vimeo Player not found"));
    };
    script.onerror = () => reject(new Error("Failed to load Vimeo Player"));
    document.head.appendChild(script);
  });
}

export type LazyVimeoProps = {
  /** Vimeo numeric id — informational only */
  id?: string;
  /** Public path to the poster image shown before the video loads */
  poster: string;
  /**
   * When true, use fetchpriority="high" and loading="eager" for instant poster display
   * (above-the-fold). Use with preload link in document head for best results.
   */
  posterPriority?: boolean;
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
  /**
   * When true, insert the iframe immediately on mount (no IntersectionObserver).
   * Use for above-the-fold video that should load right away.
   */
  insertImmediately?: boolean;
  /**
   * When true, show the iframe as soon as it's inserted (opacity: 1).
   * When false, keep iframe hidden until video plays (poster visible until then).
   */
  showImmediately?: boolean;
  /** IntersectionObserver rootMargin — default "200px" */
  rootMargin?: string;
  /** Iframe loading: "eager" for above-the-fold (Hero), "lazy" otherwise. Default: "lazy" */
  iframeLoading?: "lazy" | "eager";
  /**
   * When true, blocks the preloader until this video fires "playing".
   * Use only for the primary Hero video so preloader hides exactly when it starts.
   */
  blockPreloader?: boolean;
  /**
   * When true, defer insert until user scrolls for the first time.
   * Use for below-fold videos so they start loading on first scroll (before user reaches them).
   */
  loadOnFirstScroll?: boolean;
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
  posterPriority = false,
  aspectPadding = "56.25%",
  fill = false,
  iframeSrc,
  className,
  ariaLabel,
  playOnVisible = false,
  insertImmediately = false,
  showImmediately = false,
  rootMargin = "200px",
  iframeLoading = "lazy",
  blockPreloader = false,
  loadOnFirstScroll = false,
}: LazyVimeoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isInserted, setIsInserted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const insertedRef = useRef(false);
  const instanceId = useId();
  const preloader = usePreloader();
  const preloaderRef = useRef(preloader);
  preloaderRef.current = preloader;
  const hasScrolled = useFirstScroll();
  const preloaderHidden = preloader?.preloaderHidden ?? false;
  const shouldInsertNow =
    insertImmediately ||
    (loadOnFirstScroll && (hasScrolled || preloaderHidden));

  const handleIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    const markDisplayReady = () => setIsLoaded(true);
    const markPreloaderReady = () => preloaderRef.current?.markVideoLoaded(instanceId);
    if (!iframe || !playOnVisible) {
      markDisplayReady();
      markPreloaderReady();
      return;
    }
    if (showImmediately) {
      markDisplayReady();
      markPreloaderReady();
      return;
    }
    const fallback = setTimeout(() => {
      markDisplayReady();
      if (blockPreloader) markPreloaderReady();
    }, 5000);
    loadVimeoPlayer()
      .then((Player) => {
        const player = new Player(iframe);
        player.on("playing", () => {
          clearTimeout(fallback);
          markDisplayReady();
          if (blockPreloader) markPreloaderReady();
        });
      })
      .catch(() => {
        clearTimeout(fallback);
        markDisplayReady();
        if (blockPreloader) markPreloaderReady();
      });
  }, [playOnVisible, showImmediately, instanceId, blockPreloader]);

  const insertIframe = () => {
    if (insertedRef.current) return;
    insertedRef.current = true;
    setIsInserted(true);
  };

  // Register with preloader only when blockPreloader is set (Hero video).
  // Use ref to avoid effect re-running when context updates (prevents infinite loop).
  useEffect(() => {
    const p = preloaderRef.current;
    if (!p || !blockPreloader) return;
    return p.registerVideo(instanceId);
  }, [blockPreloader, instanceId]);

  // Auto-insert: immediately if shouldInsertNow, else on viewport entry.
  useEffect(() => {
    if (!playOnVisible) return;
    const el = wrapperRef.current;
    if (!el) return;

    if (shouldInsertNow) {
      insertIframe();
      return;
    }

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
  }, [playOnVisible, shouldInsertNow, rootMargin]);

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
      {poster && !(showImmediately && isInserted) && (
        <img
          className="lazy-vimeo-poster"
          src={poster}
          alt=""
          aria-hidden="true"
          fetchPriority={posterPriority ? "high" : undefined}
          loading={posterPriority ? "eager" : "lazy"}
          style={{
            ...absoluteFill,
            objectFit: "cover",
            display: "block",
            opacity: isLoaded ? 0 : 1,
            transition: "opacity 200ms ease-out",
            pointerEvents: isLoaded ? "none" : "auto",
          }}
        />
      )}

      {isInserted && (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title={ariaLabel ?? "Vimeo video player"}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading={iframeLoading}
          onLoad={handleIframeLoad}
          style={{
            ...absoluteFill,
            border: 0,
            opacity: isLoaded || showImmediately ? 1 : 0,
            transition: "opacity 200ms ease-in",
          }}
        />
      )}
    </div>
  );
}

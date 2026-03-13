"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { usePreloader } from "@/contexts/PreloaderContext";
import { useFirstScroll } from "@/contexts/FirstScrollContext";
import { useFirstInteraction } from "@/contexts/FirstInteractionContext";

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
  id?: string;
  poster: string;
  posterPriority?: boolean;
  aspectPadding?: string;
  fill?: boolean;
  iframeSrc: string;
  className?: string;
  ariaLabel?: string;
  playOnVisible?: boolean;
  insertImmediately?: boolean;
  showImmediately?: boolean;
  /** IntersectionObserver rootMargin — use "100%" for below-fold to load when approaching viewport */
  rootMargin?: string;
  iframeLoading?: "lazy" | "eager";
  blockPreloader?: boolean;
  loadOnFirstScroll?: boolean;
};

/**
 * LazyVimeo — deferred Vimeo embed with mobile-reliable loading.
 *
 * - IntersectionObserver with configurable rootMargin (load when approaching viewport)
 * - User-gesture fallback: pointerdown/touchstart/click (reliable on iOS/Android)
 * - Scroll/resize fallback when IntersectionObserver not supported
 * - Poster + aspect-ratio to prevent layout shift
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
  const hasInteracted = useFirstInteraction();
  const preloaderHidden = preloader?.preloaderHidden ?? false;

  // Timer fallback: load after 3s if nothing else triggered (iOS edge cases)
  const [timerReady, setTimerReady] = useState(false);
  useEffect(() => {
    if (!loadOnFirstScroll) return;
    const t = setTimeout(() => setTimerReady(true), 3000);
    return () => clearTimeout(t);
  }, [loadOnFirstScroll]);

  const shouldInsertNow =
    insertImmediately ||
    (loadOnFirstScroll &&
      (hasScrolled || hasInteracted || preloaderHidden || timerReady));

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

  const insertIframe = useCallback(() => {
    if (insertedRef.current) return;
    insertedRef.current = true;
    setIsInserted(true);
  }, []);

  useEffect(() => {
    const p = preloaderRef.current;
    if (!p || !blockPreloader) return;
    return p.registerVideo(instanceId);
  }, [blockPreloader, instanceId]);

  // Auto-insert: immediately if shouldInsertNow, else IntersectionObserver (or scroll fallback)
  useEffect(() => {
    if (!playOnVisible) return;
    const el = wrapperRef.current;
    if (!el) return;

    if (shouldInsertNow) {
      insertIframe();
      return;
    }

    if (typeof window === "undefined") return;

    // IntersectionObserver: load when element approaches viewport (rootMargin expands detection zone)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          insertIframe();
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playOnVisible, shouldInsertNow, rootMargin, insertIframe]);

  const wrapperStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : { paddingTop: aspectPadding, position: "relative" };

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

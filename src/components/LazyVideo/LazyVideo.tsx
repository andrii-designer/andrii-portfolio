"use client";

import { useEffect, useRef, CSSProperties } from "react";

export type VideoSource = {
  src: string;
  type?: string;
  media?: string;
};

export type LazyVideoProps = {
  /** One or more source descriptors. Use multiple for format fallback (e.g. webm + mp4). */
  sources: VideoSource[];
  /** Poster image shown before video loads — falls back to primary colour placeholder. */
  poster?: string;
  width?: number | string;
  height?: number | string;
  controls?: boolean;
  /** Preload hint forwarded to the <video> element once it enters the viewport. */
  preload?: "none" | "metadata" | "auto";
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  className?: string;
  style?: CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
};

/**
 * LazyVideo — renders a placeholder until the element enters the viewport,
 * then injects <source> tags and calls video.load() to start buffering.
 *
 * This prevents the browser from prefetching large video files until they
 * are actually visible, which can save several MB of bandwidth on pages that
 * have multiple videos or that users never scroll to.
 *
 * Usage:
 *   <LazyVideo
 *     sources={[{ src: "/assets/showreel.mp4", type: "video/mp4" }]}
 *     poster="/assets/showreel-poster.jpg"
 *     muted autoPlay loop playsInline
 *     className="h-full w-full object-cover"
 *   />
 */
export default function LazyVideo({
  sources,
  poster,
  width,
  height,
  controls = false,
  preload = "metadata",
  muted = true,
  autoPlay = false,
  loop = false,
  playsInline = true,
  className,
  style,
  wrapperClassName,
  wrapperStyle,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      sources.forEach(({ src, type, media }) => {
        const source = document.createElement("source");
        source.src = src;
        if (type) source.type = type;
        if (media) source.media = media;
        video.appendChild(source);
      });

      video.load();

      if (autoPlay) {
        void video.play().catch(() => {
          // Autoplay may be blocked on some browsers — ignore silently.
        });
      }
    };

    if (!("IntersectionObserver" in window)) {
      // Fallback for browsers that don't support IO — load immediately.
      loadVideo();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadVideo();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [sources, autoPlay]);

  const wrapperBase: CSSProperties = {
    background: "var(--token-color-primary, #D2D2D6)",
    position: "relative",
    overflow: "hidden",
    ...wrapperStyle,
  };

  return (
    <div
      className={`lazy-video-wrapper${wrapperClassName ? ` ${wrapperClassName}` : ""}`}
      style={wrapperBase}
    >
      <video
        ref={videoRef}
        width={width}
        height={height}
        controls={controls}
        preload={preload}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
        className={className}
        style={style}
      />
    </div>
  );
}

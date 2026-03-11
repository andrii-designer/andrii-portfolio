import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type LazyVideoSource = {
  src: string;
  type?: string;
};

export type LazyVideoProps = {
  poster?: string;
  sources: LazyVideoSource[];
  width?: number;
  height?: number;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  playsInline?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * LazyVideo — renders a primary-color placeholder (and optional poster)
 * and only attaches <source> tags once the video is visible or the user
 * explicitly clicks play.
 */
const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  (
    {
      poster,
      sources,
      width,
      height,
      controls = true,
      preload = "metadata",
      playsInline = true,
      className,
      ariaLabel,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasRequestedPlay, setHasRequestedPlay] = useState(false);
    const [hasAttachedSources, setHasAttachedSources] = useState(false);

    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement, []);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const attachSources = () => {
        if (hasAttachedSources) return;
        sources.forEach(({ src, type }) => {
          const source = document.createElement("source");
          source.src = src;
          if (type) source.type = type;
          video.appendChild(source);
        });
        video.load();
        setHasAttachedSources(true);
      };

      const maybeLoadAndPlay = () => {
        attachSources();
        if (hasRequestedPlay || !controls) {
          void video.play().catch(() => {
            // Ignore autoplay blocking; user can press play again.
          });
        }
      };

      const handleLoadedData = () => {
        setIsLoaded(true);
      };

      video.addEventListener("loadeddata", handleLoadedData);

      let observer: IntersectionObserver | null = null;

      if (typeof window !== "undefined" && "IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              maybeLoadAndPlay();
              observer?.disconnect();
            }
          },
          { rootMargin: "200px" }
        );
        observer.observe(video);
      } else {
        // Fallback: load as soon as possible.
        maybeLoadAndPlay();
      }

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        if (observer) observer.disconnect();
      };
    }, [sources, controls, hasRequestedPlay, hasAttachedSources]);

    const handleUserPlay = () => {
      setHasRequestedPlay(true);
      const video = videoRef.current;
      if (!video) return;
      if (!hasAttachedSources) {
        sources.forEach(({ src, type }) => {
          const source = document.createElement("source");
          source.src = src;
          if (type) source.type = type;
          video.appendChild(source);
        });
        video.load();
        setHasAttachedSources(true);
      }
      void video.play().catch(() => {
        // Ignore — browser may block until user interacts again.
      });
    };

    return (
      <div className={`lazy-video${isLoaded ? " is-loaded" : ""}`}>
        {poster && !isLoaded && (
          <img src={poster} alt="" className="poster" aria-hidden="true" />
        )}
        <video
          ref={videoRef}
          width={width}
          height={height}
          controls={controls}
          preload={preload}
          playsInline={playsInline}
          className={className}
        />
        <button
          type="button"
          className="play-overlay"
          onClick={handleUserPlay}
          aria-label={ariaLabel || "Play video"}
        />
      </div>
    );
  }
);

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;


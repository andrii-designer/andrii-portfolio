"use client";

import { useState, CSSProperties } from "react";
import Image, { ImageProps } from "next/image";

/**
 * OptimizedImage — Next/Image wrapper with a primary-color placeholder that
 * fades out as the image loads.
 *
 * Usage (fill mode — container must have explicit dimensions or aspect-ratio):
 *   <OptimizedImage src="/foo.jpg" alt="…" fill sizes="100vw" />
 *
 * Usage (fixed mode):
 *   <OptimizedImage src="/foo.jpg" alt="…" width={684} height={455} sizes="50vw" />
 *
 * The wrapper always sets background: var(--token-color-primary, #D2D2D6) so the
 * placeholder colour matches the design system. Once the image has loaded the
 * .is-loaded class is added and the image opacity transitions 0 → 1.
 */

export type OptimizedImageProps = Omit<ImageProps, "onLoad" | "onLoadingComplete"> & {
  /** Extra className forwarded to the outer wrapper div */
  wrapperClassName?: string;
  /** Extra inline styles forwarded to the outer wrapper div */
  wrapperStyle?: CSSProperties;
};

export default function OptimizedImage({
  wrapperClassName,
  wrapperStyle,
  className,
  style,
  fill,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  const hasAspectRatio = Boolean(wrapperStyle?.aspectRatio);
  const useFill = fill || hasAspectRatio;

  const wrapperBase: CSSProperties = {
    background: hasAspectRatio ? "transparent" : "var(--token-color-primary, #D2D2D6)",
    position: "relative",
    overflow: "hidden",
    ...wrapperStyle,
  };

  return (
    <div
      className={`optimized-image${loaded ? " is-loaded" : ""}${hasAspectRatio ? " fill-container" : ""}${wrapperClassName ? ` ${wrapperClassName}` : ""}`}
      style={wrapperBase}
    >
      <Image
        {...props}
        fill={useFill}
        width={useFill ? undefined : width}
        height={useFill ? undefined : height}
        className={`next-image${className ? ` ${className}` : ""}`}
        style={useFill ? { objectFit: "cover" } : style}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

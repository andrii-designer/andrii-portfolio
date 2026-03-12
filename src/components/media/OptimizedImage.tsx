import { useState, CSSProperties } from "react";
import Image, { ImageProps } from "next/image";

export type OptimizedImageProps = ImageProps & {
  /**
   * Optional CSS aspect-ratio string, e.g. "16 / 9" or "684 / 455".
   * Only applied to the wrapper; it never overrides width/height behavior of Next/Image.
   */
  aspectRatio?: string;
};

/**
 * OptimizedImage — thin wrapper around next/image that:
 * - Shows a solid primary-color placeholder immediately via the .optimized-media wrapper
 * - Fades the underlying image in once it has loaded (opacity 0 → 1)
 *
 * This component is SSR-safe: it does not gate render on client-only state;
 * it only toggles an .is-loaded class once the image reports completion.
 */
export default function OptimizedImage(props: OptimizedImageProps) {
  const {
    aspectRatio,
    className,
    style,
    fill,
    width,
    height,
    onLoadingComplete,
    ...imageProps
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const useFill = fill || Boolean(aspectRatio);

  const wrapperStyle: CSSProperties = {
    ...(fill ? { width: "100%", height: "100%" } : {}),
    ...(aspectRatio ? { aspectRatio, width: "100%" } : {}),
    ...(aspectRatio ? {} : style ?? {}),
  };

  const handleLoadingComplete: NonNullable<ImageProps["onLoadingComplete"]> = (
    img
  ) => {
    setIsLoaded(true);
    if (typeof onLoadingComplete === "function") {
      onLoadingComplete(img);
    }
  };

  const wrapperClassName = [
    "optimized-media",
    fill ? "fill" : "",
    aspectRatio ? "fill-container" : "",
    isLoaded ? "is-loaded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <Image
        {...imageProps}
        fill={useFill}
        width={useFill ? undefined : width}
        height={useFill ? undefined : height}
        className={["next-image", className].filter(Boolean).join(" ")}
        style={useFill ? { objectFit: "cover" } : style}
        onLoadingComplete={handleLoadingComplete}
      />
    </div>
  );
}


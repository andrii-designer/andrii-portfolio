import { useState } from "react";
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
    onLoadingComplete,
    ...imageProps
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  const wrapperStyle = {
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  };

  const handleLoadingComplete: NonNullable<ImageProps["onLoadingComplete"]> = (
    img
  ) => {
    setIsLoaded(true);
    if (typeof onLoadingComplete === "function") {
      onLoadingComplete(img);
    }
  };

  const imageClassName = ["next-image", className].filter(Boolean).join(" ");

  const wrapperClassName = [
    "optimized-media",
    fill ? "fill" : "",
    isLoaded ? "is-loaded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <Image
        {...imageProps}
        fill={fill}
        className={imageClassName}
        onLoadingComplete={handleLoadingComplete}
      />
    </div>
  );
}


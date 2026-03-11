/**
 * imageHelpers — small utilities for working with next/image props.
 */

/**
 * Returns the provided sizes string if non-empty, otherwise returns fallbackSizes.
 * Use when consuming a component that may or may not pass sizes.
 *
 * Example:
 *   <Image sizes={ensureSizes(props.sizes, imageSizes.fullBleed)} />
 */
export function ensureSizes(
  sizes: string | undefined | null,
  fallbackSizes: string
): string {
  return sizes && sizes.trim().length > 0 ? sizes : fallbackSizes;
}

/**
 * Returns a CSS aspect-ratio string (e.g. "16 / 9") from explicit dimensions.
 * Useful for fill-mode wrappers that need an intrinsic aspect ratio so the
 * browser can reserve space before the image loads.
 *
 * Example:
 *   style={{ aspectRatio: getAspectRatio(1600, 900) }}
 */
export function getAspectRatio(width: number, height: number): string {
  if (!width || !height) return "auto";
  return `${width} / ${height}`;
}

/**
 * Rounds a float to the given number of decimal places.
 * Handy when computing aspect ratios for inline styles.
 */
export function round(value: number, decimals = 4): number {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

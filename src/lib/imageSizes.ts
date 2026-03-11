/**
 * imageSizes — pre-defined `sizes` attribute strings for common layout patterns.
 *
 * These tell the browser exactly how wide the image will be rendered at each
 * viewport breakpoint so it can pick the most appropriate srcset candidate.
 * The values mirror the Tailwind/token breakpoints used in the project:
 *   - mobile  : < 601px  (single column, full width)
 *   - tablet  : 601–1023px
 *   - desktop : ≥ 1024px
 *
 * Usage:
 *   import { imageSizes } from "@/lib/imageSizes";
 *   <Image sizes={imageSizes.fullBleed} ... />
 */
export const imageSizes = {
  /** Full-width / full-bleed sections (case-study hero, section images) */
  fullBleed: "100vw",

  /**
   * Work cards — 1 column on mobile/tablet, 2 columns at ≥ 1024px.
   * At 1440px desktop with 24px side-padding the column is ~696px wide.
   */
  workCard: "(max-width: 1023px) 100vw, 50vw",

  /**
   * About photo — full width mobile, ~40% of viewport up to 600px wide
   * at tablet+, capped at 600px on large screens.
   */
  aboutPhoto: "(max-width: 600px) 100vw, (max-width: 1440px) 40vw, 600px",

  /**
   * Service item image — full width mobile, fixed 533px at desktop.
   */
  serviceImage: "(max-width: 768px) 100vw, 533px",

  /**
   * Hero media preview — full width mobile, fixed 330px at md+.
   */
  heroMedia: "(max-width: 768px) 100vw, 330px",

  /**
   * Grid images (2-up) — full width on mobile, half viewport at desktop.
   */
  gridHalf: "(max-width: 1023px) 100vw, 50vw",
} as const;

export type ImageSizesKey = keyof typeof imageSizes;

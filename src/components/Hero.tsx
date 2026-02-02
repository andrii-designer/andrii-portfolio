"use client";

/**
 * Hero — use tokens:
 * - Background: var(--token-color-base)
 * - Heading: var(--token-size-display-1) or var(--token-size-h1), var(--token-leading-110), var(--token-weight-semibold)
 * - Text: var(--token-size-body-lg), var(--token-leading-160)
 * - Spacing: var(--token-space-*)
 */
export type HeroProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function Hero({ title, subtitle, className }: HeroProps) {
  return (
    <section className={className} aria-label="Hero">
      {/* Hero skeleton — use --token-* for typography and spacing */}
    </section>
  );
}

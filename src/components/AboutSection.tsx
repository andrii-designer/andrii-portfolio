"use client";

/**
 * AboutSection — use tokens:
 * - Heading: var(--token-size-h2), var(--token-leading-120), var(--token-weight-semibold)
 * - Body: var(--token-size-body-lg), var(--token-leading-160)
 * - Spacing: var(--token-space-64), var(--token-space-96)
 */
export type AboutSectionProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function AboutSection({
  title,
  children,
  className,
}: AboutSectionProps) {
  return (
    <section className={className} aria-labelledby="about-heading">
      {/* AboutSection skeleton — --token-* for typography and spacing */}
    </section>
  );
}

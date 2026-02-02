"use client";

/**
 * CTA — use tokens:
 * - Bg: var(--token-color-accent)
 * - Text: var(--token-color-base)
 * - Font: var(--token-size-label-md), var(--token-weight-semibold)
 * - Spacing: var(--token-space-16), var(--token-space-24)
 */
export type CTAProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function CTA({
  href,
  children,
  variant = "primary",
  className,
}: CTAProps) {
  return (
    <a href={href} className={className}>
      {/* CTA skeleton — --token-* for colors/spacing/fonts */}
      {children}
    </a>
  );
}

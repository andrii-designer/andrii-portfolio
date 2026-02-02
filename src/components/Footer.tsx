"use client";

/**
 * Footer — use tokens:
 * - Background: var(--token-color-primary) or var(--token-color-base)
 * - Text: var(--token-color-accent)
 * - Spacing: var(--token-space-*)
 * - Font: var(--token-font-family-base), var(--token-size-body-sm), var(--token-weight-regular)
 */
export type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={className} role="contentinfo">
      {/* Footer skeleton — wire --token-* for colors/spacing/fonts */}
    </footer>
  );
}

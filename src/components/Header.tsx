"use client";

/**
 * Header — use tokens:
 * - Background: var(--token-color-base) or var(--token-color-primary)
 * - Text: var(--token-color-accent)
 * - Spacing: var(--token-space-*)
 * - Font: var(--token-font-family-base), var(--token-size-h5), var(--token-weight-medium)
 */
export type HeaderProps = {
  /** Optional class name */
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <header className={className} role="banner">
      {/* Header skeleton — wire colors/spacing/fonts via --token-* */}
    </header>
  );
}

"use client";

/**
 * ContactForm — use tokens:
 * - Input border/bg: var(--token-color-primary), var(--token-color-accent)
 * - Label: var(--token-size-label-sm), var(--token-weight-semibold)
 * - Spacing: var(--token-space-16), var(--token-space-24)
 */
export type ContactFormProps = {
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
};

export default function ContactForm({
  onSubmit,
  className,
}: ContactFormProps) {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      {/* ContactForm skeleton — --token-* for colors/spacing/fonts */}
    </form>
  );
}

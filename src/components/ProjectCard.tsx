"use client";

/**
 * ProjectCard — use tokens:
 * - Card bg: var(--token-color-primary)
 * - Text: var(--token-color-accent), var(--token-size-h5), var(--token-size-body-md)
 * - Spacing: var(--token-space-16), var(--token-space-24)
 */
export type ProjectCardProps = {
  title: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  className?: string;
};

export default function ProjectCard({
  title,
  description,
  slug,
  imageUrl,
  className,
}: ProjectCardProps) {
  return (
    <article className={className}>
      {/* ProjectCard skeleton — --token-* for colors/spacing/fonts */}
    </article>
  );
}

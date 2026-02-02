"use client";

/**
 * SkillsList — use tokens:
 * - Label: var(--token-size-label-md), var(--token-weight-semibold)
 * - Spacing: var(--token-space-8), var(--token-space-16)
 */
export type SkillsListProps = {
  items: string[];
  title?: string;
  className?: string;
};

export default function SkillsList({
  items,
  title,
  className,
}: SkillsListProps) {
  return (
    <div className={className}>
      {/* SkillsList skeleton — --token-* for fonts and spacing */}
    </div>
  );
}

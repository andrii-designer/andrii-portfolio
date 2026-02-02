"use client";

import type { ReactNode } from "react";

/**
 * ProjectGrid — use tokens:
 * - Gap: var(--token-space-24) or var(--token-space-32)
 * - Padding: var(--token-space-*)
 */
export type ProjectGridProps = {
  children: ReactNode;
  className?: string;
};

export default function ProjectGrid({ children, className }: ProjectGridProps) {
  return (
    <div className={className} role="list">
      {/* Grid wrapper — use --token-space-* for gap/padding */}
      {children}
    </div>
  );
}

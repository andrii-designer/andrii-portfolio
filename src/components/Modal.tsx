"use client";

import type { ReactNode } from "react";

/**
 * Modal — use tokens:
 * - Overlay: var(--token-color-accent) with opacity
 * - Panel bg: var(--token-color-base)
 * - Spacing: var(--token-space-24), var(--token-space-32)
 */
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={className} role="dialog" aria-modal="true">
      {/* Modal skeleton — --token-* for overlay/panel/spacing */}
    </div>
  );
}

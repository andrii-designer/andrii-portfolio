"use client";

/**
 * ImageGallery — use tokens:
 * - Gap: var(--token-space-16), var(--token-space-24)
 * - Spacing: var(--token-space-*)
 */
export type ImageGalleryProps = {
  images: { src: string; alt: string }[];
  className?: string;
};

export default function ImageGallery({
  images,
  className,
}: ImageGalleryProps) {
  return (
    <div className={className} role="list">
      {/* ImageGallery skeleton — --token-space-* for gap */}
    </div>
  );
}

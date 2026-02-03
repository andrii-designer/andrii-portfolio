import Hero from "@/components/Hero";

/**
 * Home page — Hero section from Figma
 * Figma node-id: 2224:4166 (hero-section frame)
 * Frame dimensions: 1440 × 782
 *
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-24 (px), --token-space-48 (gap), --token-space-128 (content gap)
 */
export default function HomePage() {
  return (
    <div
      className="flex w-full flex-col gap-48 px-24 pb-24"
      data-node-id="2228:4742"
    >
      <Hero
        title="Digital designer helping founders and product owners"
        cta={{ text: "Book a call", href: "/contact" }}
        media={{ type: "image", src: "/hero-assets/video-preview.png" }}
      />
    </div>
  );
}

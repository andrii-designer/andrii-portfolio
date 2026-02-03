import Hero from "@/components/Hero";

/**
 * Home page — Hero section from Figma
 * Figma node-id: 2224:4166 (hero-section frame)
 * Frame dimensions: 1440 × 782
 *
 * Layout pattern:
 * - Uses .section-wrap + .section-inner from global layout (24px padding via --token-space-24)
 * - Hero section is centered within 1440px container
 *
 * Figma verification (node 2224:4166):
 * - Horizontal padding: 24px (handled by layout's .section-inner)
 * - Gap header → content: 48px
 * - Gap title → bottom-row: 128px
 *
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-48 (gap header→content), --token-space-128 (gap title→bottom-row)
 */
export default function HomePage() {
  return (
    <section
      className="section-wrap"
      style={{
        paddingTop: "var(--token-space-48)", /* Gap between header and content: 48px */
        paddingBottom: "var(--token-space-24)",
      }}
      data-node-id="2228:4742"
    >
      <div className="section-inner">
        <Hero
          title="Digital designer helping founders and product owners"
          cta={{ text: "Book a call", href: "/contact" }}
          media={{ type: "image", src: "/hero-assets/video-preview.png" }}
        />
      </div>
    </section>
  );
}

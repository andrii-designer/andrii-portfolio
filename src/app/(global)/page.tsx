import Hero from "@/components/Hero";
import Works from "@/components/Works";

/**
 * Home page — Hero + Works sections from Figma
 *
 * Hero section:
 * - Figma node-id: 2224:4166 (hero-section frame)
 * - Frame dimensions: 1440 × 782
 *
 * Works section:
 * - Figma node-id: 2231:5841 (works-section frame)
 * - Placed directly below Hero with no vertical gap beyond Works' own 24px top padding
 *
 * Layout pattern:
 * - Uses .section-wrap + .section-inner from global layout (24px padding via --token-space-24)
 * - Both sections are full-bleed (100% viewport width) with 24px inner padding
 *
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-24, --token-space-48, --token-space-64, --token-space-192, --token-space-256
 */

/** Sample project data — placeholder images for Works section (matches Figma screenshot) */
const worksProjects = [
  {
    title: "Find Your Perfect Clinical Rotation",
    client: "RotationsPlus",
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Clinical Rotation platform project preview",
    href: "/projects/rotations-plus",
  },
  {
    title: "Find Your Perfect Clinical Rotation",
    client: "RotationsPlus",
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Clinical Rotation platform project preview",
    href: "/projects/rotations-plus-2",
  },
  {
    title: "Find Your Perfect Clinical Rotation",
    client: "RotationsPlus",
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Clinical Rotation platform project preview",
    href: "/projects/rotations-plus-3",
  },
  {
    title: "Find Your Perfect Clinical Rotation",
    client: "RotationsPlus",
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Clinical Rotation platform project preview",
    href: "/projects/rotations-plus-4",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section — Figma node-id: 2224:4166 */}
      <section
        className="section-wrap"
        style={{
          paddingTop: "var(--token-space-48)", /* Gap between header and content: 48px */
          paddingBottom: "var(--token-space-0)", /* No bottom padding — Works follows directly */
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

      {/* Works Section — Figma node-id: 2231:5841 */}
      {/* Section handles its own padding: 24px top, 192px bottom */}
      <section
        className="section-wrap"
        data-node-id="2231:5841"
      >
        <div className="section-inner">
          <Works
            title="Works"
            index="001"
            projects={worksProjects}
          />
        </div>
      </section>
    </>
  );
}

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
 * - Placed directly below Hero with no vertical gap
 *
 * Layout pattern:
 * - Uses .section-wrap + .section-inner from global layout (24px padding via --token-space-24)
 * - Both sections are full-bleed (100% viewport width) with 24px inner padding
 *
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-48, --token-space-64, --token-space-96, --token-space-128
 */

/** Sample project data — placeholder images for Works section */
const worksProjects = [
  {
    title: "Portfolio Dashboard",
    description: "A comprehensive portfolio management dashboard for tracking investments and analyzing performance metrics.",
    tags: ["Web App", "Dashboard", "Finance"],
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Portfolio Dashboard project preview",
    href: "/projects/portfolio-dashboard",
  },
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with seamless checkout experience and inventory management.",
    tags: ["Web App", "E-Commerce", "Retail"],
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "E-Commerce Platform project preview",
    href: "/projects/ecommerce-platform",
  },
  {
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking application with real-time transaction tracking.",
    tags: ["Mobile App", "Finance", "iOS/Android"],
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Mobile Banking App project preview",
    href: "/projects/mobile-banking",
  },
  {
    title: "Healthcare Portal",
    description: "Patient-centric healthcare portal for appointment scheduling and medical records access.",
    tags: ["Web App", "Healthcare", "Portal"],
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Healthcare Portal project preview",
    href: "/projects/healthcare-portal",
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
      <section
        className="section-wrap"
        style={{
          paddingTop: "var(--token-space-0)", /* No top padding — directly below Hero */
        }}
        data-node-id="2231:5841"
      >
        <div className="section-inner">
          <Works
            title="Works"
            projects={worksProjects}
          />
        </div>
      </section>
    </>
  );
}

import Hero from "@/components/Hero";

/**
 * ResponsiveHeroSection — Home page hero composed as a feature module.
 *
 * This wraps the `Hero` component with the correct section layout
 * (`section-wrap` + `section-inner`) and spacing tokens so the hero
 * remains fully responsive across breakpoints.
 *
 * Figma reference: hero-section frame 2224:4166.
 */
export default function ResponsiveHeroSection() {
  return (
    <section
      className="section-wrap"
      style={{
        paddingTop: "var(--token-space-48)", // Gap between header and content: 48px
        paddingBottom: "var(--token-space-24)", // Hero bottom padding: 24px
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


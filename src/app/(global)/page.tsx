import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";
import { featuredProjects } from "@/data/featuredProjects";
import LazyVimeo from "@/components/media/LazyVimeo";

/**
 * Home page — Hero + Works sections from Figma
 *
 * Hero section:
 * - Figma node-id: 2224:4166 (hero-section frame)
 * - Frame dimensions: 1440 × 782
 *
 * Works section:
 * - Figma node-id: 2231:5841 (works-section frame)
 * - Placed directly below Hero (Hero has 24px bottom padding; Works has 24px top padding)
 *
 * Layout pattern:
 * - Uses .section-wrap + .section-inner from global layout (24px padding via --token-space-24)
 * - Both sections are full-bleed (100% viewport width) with 24px inner padding
 *
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-24, --token-space-48, --token-space-64, --token-space-192, --token-space-256
 */

const SHOWREEL_URL =
  "https://player.vimeo.com/video/1173027362?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0&quality=360p&preload=auto&playsinline=1&prefer_mms=0";

export default function HomePage() {
  return (
    <>
      {/* Hero Section — Figma node-id: 2224:4166 */}
      <section
        className="section-wrap"
        style={{
          // Extend the hero background up behind the fixed header by pulling
          // the section up, then add the same amount back into paddingTop so
          // the visible gap between header and hero text stays identical.
          marginTop: "calc(-1 * (var(--token-size-64) + var(--token-space-24)))",
          paddingTop: "calc(var(--token-space-48) + var(--token-size-64) + var(--token-space-24))",
          paddingBottom: "var(--token-space-24)", /* Hero bottom padding: 24px */
          backgroundColor: "var(--token-color-primary)", /* Hero background: primary color */
        }}
        data-node-id="2228:4742"
      >
        <div className="section-inner">
          <Hero
            title="Digital designer focused on visual design and motion for products"
            cta={{ text: "Book a call", href: "/contact" }}
            media={{
              type: "vimeo",
              iframeSrc: SHOWREEL_URL,
              poster: "/assets/images/thumbs/showreel2026-thumb.webp",
            }}
          />
        </div>
      </section>

      {/* Works Section — Figma node-id: 2231:5841 */}
      {/* Section handles its own padding: 24px top, 192px bottom */}
      <section
        id="works"
        className="section-wrap"
        style={{
          backgroundColor: "var(--token-color-base)", // Works section uses base background (not primary)
        }}
        data-node-id="2231:5841"
      >
        <div className="section-inner">
          <Works
            title="Works"
            index="001"
            projects={featuredProjects}
          />
        </div>
      </section>

      {/* Services Section — directly below Works */}
      {/* Section handles its own padding: 24px top/left/right, 192px bottom */}
      <section
        id="services"
        className="section-wrap"
        style={{
          backgroundColor: "var(--token-color-primary)", // Services section uses primary background
        }}
        data-node-id="services-section"
      >
        <div className="section-inner">
          <Services />
        </div>
      </section>

      {/* Video Section — Full width, no side padding */}
      {/* .video-section-inner owns the 16:9 aspect-ratio; LazyVimeo fills it. */}
      <section
        className="video-section-fullbleed"
        style={{
          backgroundColor: "var(--token-color-primary)",
        }}
        data-node-id="video-section"
      >
        <div className="video-section-inner">
          <LazyVimeo
            fill
            poster="/assets/images/thumbs/showreel2026-thumb.webp"
            iframeSrc={SHOWREEL_URL}
            ariaLabel="Showreel 2026"
            playOnVisible
            insertImmediately
            deferInsert
            iframeLoading="eager"
          />
        </div>
      </section>

      {/* Process Section — below Video */}
      {/* Section handles its own padding: 24px top/left/right, 192px bottom */}
      <section
        className="section-wrap"
        style={{
          backgroundColor: "var(--token-color-base)", // Process section uses base background
        }}
        data-node-id="process-section"
      >
        <div className="section-inner">
          <Process />
        </div>
      </section>

      {/* Testimonials Section — below Process */}
      {/* Section handles its own padding: 24px top/left/right, 192px bottom */}
      <section
        className="section-wrap"
        style={{
          backgroundColor: "var(--token-color-base)",
        }}
        data-node-id="testimonials-section"
      >
        <div className="section-inner">
          <Testimonials />
        </div>
      </section>

      {/* Book a call Section — directly below Testimonials */}
      <BookCall id="book-a-call" />

      {/* Footer Section — last section on page */}
      {/* Top padding: 128px, side paddings: 24px, bottom padding: 24px */}
      <Footer />
    </>
  );
}

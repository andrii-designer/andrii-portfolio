import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";
import Image from "next/image";

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
          paddingBottom: "var(--token-space-24)", /* Hero bottom padding: 24px */
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
        style={{
          backgroundColor: "var(--token-color-base)", // Works section uses base background (not primary)
        }}
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

      {/* Services Section — directly below Works */}
      {/* Section handles its own padding: 24px top/left/right, 192px bottom */}
      <section
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
      {/* Separate from Services to allow full-bleed video with 16:9 aspect ratio */}
      <section
        className="w-full"
        style={{
          backgroundColor: "var(--token-color-primary)",
        }}
        data-node-id="video-section"
      >
        <div
          className="relative w-full"
          style={{
            aspectRatio: "16 / 9",
          }}
        >
          {/* Placeholder image — replace with video when ready */}
          <Image
            src="/assets/images/works/placeholder.svg"
            alt="Video preview"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Process Section — below Video */}
      {/* Section handles its own padding: 24px top/left/right, 192px bottom */}
      <section
        className="section-wrap"
        style={{
          backgroundColor: "var(--token-color-primary)", // Process section uses primary background
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
          backgroundColor: "var(--token-color-base)", // Testimonials section uses base background
        }}
        data-node-id="testimonials-section"
      >
        <div
          className="section-inner"
          style={{
            paddingLeft: "var(--token-space-24)",
            paddingRight: "var(--token-space-24)",
          }}
        >
          <Testimonials />
        </div>
      </section>

      {/* Book a call Section — directly below Testimonials */}
      <BookCall />

      {/* Footer Section — last section on page */}
      {/* Top padding: 128px, side paddings: 24px, bottom padding: 24px */}
      <Footer />
    </>
  );
}

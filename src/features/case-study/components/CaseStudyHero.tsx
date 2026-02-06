"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Props for the CaseStudyHero component.
 */
export type CaseStudyHeroProps = {
  /** Case study project title — rendered as <h1> */
  title: string;
  /** Client name (optional) */
  client?: string;
  /** List of services provided, e.g. ["Product design", "3D motion"] */
  services?: string[];
  /** Path to hero image — full-bleed, no side padding */
  heroImage?: string;
};

/**
 * CaseStudyHero — Hero section for individual case study pages
 *
 * Layout pattern:
 * - Uses .section-wrap for full-bleed sections (100% width)
 * - Uses .section-inner for horizontal padding (24px via --token-space-24)
 * - Full-bleed hero image sits outside .section-inner (zero side padding)
 *
 * Animation: Same scroll-reveal system as Home/About (whileInView, useReducedMotion).
 */
export default function CaseStudyHero({
  title,
  client,
  services,
  heroImage,
}: CaseStudyHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const titleMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const metaMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.1,
        },
      };

  const imageMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.15,
        },
      };

  return (
    <motion.section
      {...containerMotion}
      className="case-study-hero section-wrap"
      aria-label="Case study hero"
    >
      <div
        className="section-inner"
        style={{
          paddingTop: "var(--token-space-48)",
          paddingBottom: "var(--token-space-48)",
        }}
      >
        <header className="hero-header">
          <motion.h1 className="hero-title" {...titleMotion}>
            {title}
          </motion.h1>
        </header>

        <motion.div
          className="hero-meta"
          style={{ marginTop: "var(--token-space-128)" }}
          {...metaMotion}
        >
          {client && (
            <div className="hero-meta-item">
              <strong className="hero-meta-label">Client</strong>
              <span className="hero-meta-value">{client}</span>
            </div>
          )}
          {services && services.length > 0 && (
            <div className="hero-meta-item">
              <strong className="hero-meta-label">Services</strong>
              <span className="hero-meta-value">
                {services.join(",\u00A0\u00A0\u00A0")}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div className="hero-visual" {...imageMotion}>
        <Image
          src={heroImage || "/assets/case-studies/placeholder-hero.png"}
          alt={`${title} hero image`}
          width={1600}
          height={900}
          priority
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </motion.div>
    </motion.section>
  );
}

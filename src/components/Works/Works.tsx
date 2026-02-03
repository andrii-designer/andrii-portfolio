"use client";

import { motion, useReducedMotion } from "framer-motion";
import WorkCard, { WorkCardProps } from "./WorkCard";

/**
 * Works — Portfolio projects section
 * Figma node-id: 2231:5841 (Works section frame)
 *
 * Layout specs (based on Figma design patterns):
 * - Section container: full-bleed (100% viewport width)
 * - Inner container: 24px left/right padding (via --token-space-24)
 * - Frame width: 1440px (Figma canvas)
 * - Section vertical padding: 0px top (connects directly to Hero), 96px bottom
 * - Content gap: 64px between section title and grid
 * - Grid: 2 columns on desktop, 1 column on mobile
 * - Grid gap: 48px horizontal, 64px vertical
 *
 * Auto-layout (inferred):
 * - Direction: vertical
 * - Gap title → grid: 64px
 * - Grid layout: horizontal wrap, 2 columns
 * - Grid gap: 48px (horizontal), 64px (vertical)
 * - Card internal gap: 24px (image → text)
 *
 * Tokens used:
 * - Spacing: --token-space-24, --token-space-48, --token-space-64, --token-space-96
 * - Typography: --token-size-h2, --token-weight-semibold, --token-leading-100
 * - Colors: --token-color-accent
 */

export type WorksProps = {
  /** Section title (default: "Works") */
  title?: string;
  /** Array of project cards */
  projects: WorkCardProps[];
};

const Works = ({ title = "Works", projects }: WorksProps) => {
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

  const cardMotion = (index: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: index * 0.1,
          },
        };

  return (
    <motion.section
      {...containerMotion}
      className="flex flex-col w-full"
      style={{
        gap: "var(--token-space-64)", /* 64px gap between title and grid */
        paddingBottom: "var(--token-space-96)", /* 96px bottom padding */
      }}
      aria-label="Works"
      data-node-id="2231:5841"
    >
      {/* Section Title */}
      <motion.h2
        {...titleMotion}
        className="text-accent"
        style={{
          fontFamily: "var(--token-font-family-base)",
          fontSize: "var(--token-size-h2)", /* 64px */
          fontWeight: "var(--token-weight-semibold)", /* 600 */
          lineHeight: "var(--token-leading-100)", /* 1.0 */
          letterSpacing: "-3px",
        }}
      >
        {title}
      </motion.h2>

      {/* Projects Grid — 2 columns on desktop, 1 on mobile */}
      <div
        className="grid w-full
          grid-cols-1
          md:grid-cols-2"
        style={{
          columnGap: "var(--token-space-48)", /* 48px horizontal gap */
          rowGap: "var(--token-space-64)", /* 64px vertical gap */
        }}
      >
        {projects.map((project, index) => (
          <motion.div key={index} {...cardMotion(index)}>
            <WorkCard {...project} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Works;

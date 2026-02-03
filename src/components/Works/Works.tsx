"use client";

import { motion, useReducedMotion } from "framer-motion";
import WorkCard, { WorkCardProps } from "./WorkCard";

/**
 * Works — Portfolio projects section
 * Figma node-id: 2231:5841 (Works section frame)
 *
 * Layout specs (from Figma screenshot):
 * - Section padding: 24px top, 192px bottom, 24px left/right (via section-inner)
 * - Title container: vertical stack, gap 0 between label and heading
 * - Label: "( 001 )  MY WORKS" - 16px, medium, uppercase, 6px vertical padding
 * - Heading: "Works" - 150px display-1, semibold
 * - Gap title container → grid: 256px
 * - Grid: 2 columns desktop, 1 mobile
 * - Grid column gap: 24px
 * - Grid row gap: 64px
 *
 * Tokens used:
 * - Spacing: --token-space-6, --token-space-8, --token-space-24, --token-space-64, --token-space-192, --token-space-256
 * - Typography: --token-size-display-1, --token-size-label-md, --token-weight-semibold, --token-weight-medium
 * - Colors: --token-color-accent
 */

export type WorksProps = {
  /** Section title (default: "Works") */
  title?: string;
  /** Section index label (default: "001") */
  index?: string;
  /** Array of project cards */
  projects: WorkCardProps[];
};

const Works = ({ title = "Works", index = "001", projects }: WorksProps) => {
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

  const cardMotion = (cardIndex: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: cardIndex * 0.1,
          },
        };

  return (
    <motion.section
      {...containerMotion}
      className="flex flex-col w-full"
      style={{
        paddingTop: "var(--token-space-24)", /* 24px top padding */
        paddingBottom: "var(--token-space-192)", /* 192px bottom padding */
      }}
      aria-label="Works"
      data-node-id="2231:5841"
    >
      {/* Title Container — vertical stack, gap 0 */}
      <motion.div
        {...titleMotion}
        className="works-title flex flex-col w-full"
        style={{
          gap: 0, /* No gap between label and heading */
          alignItems: "flex-start", /* Left-aligned */
        }}
      >
        {/* Label Container — "( 001 )  MY WORKS" */}
        <div
          className="works-label inline-flex items-center"
          style={{
            gap: "var(--token-space-8)", /* 8px gap between label elements */
            paddingTop: "var(--token-space-6)", /* 6px top padding */
            paddingBottom: "var(--token-space-6)", /* 6px bottom padding */
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <span
            className="label-index text-accent"
            style={{
              fontFamily: "var(--token-font-family-base)",
              fontSize: "var(--token-size-label-md)", /* 16px */
              fontWeight: "var(--token-weight-medium)", /* 500 */
              lineHeight: "var(--token-leading-140)", /* 1.4 */
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            ( {index} )
          </span>
          <span
            className="label-text text-accent"
            style={{
              fontFamily: "var(--token-font-family-base)",
              fontSize: "var(--token-size-label-md)", /* 16px */
              fontWeight: "var(--token-weight-medium)", /* 500 */
              lineHeight: "var(--token-leading-140)", /* 1.4 */
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            MY WORKS
          </span>
        </div>

        {/* Section Heading — "Works" using display-1 (150px) */}
        <h2
          className="works-heading text-accent"
          style={{
            fontFamily: "var(--token-font-family-base)",
            fontSize: "var(--token-size-display-1)", /* 150px */
            fontWeight: "var(--token-weight-semibold)", /* 600 */
            lineHeight: "var(--token-leading-100)", /* 1.0 */
            letterSpacing: "-6px",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </motion.div>

      {/* Projects Grid — 2 columns on desktop, 1 on mobile */}
      {/* Gap between title and grid: 256px */}
      <div
        className="grid w-full grid-cols-1 md:grid-cols-2"
        style={{
          marginTop: "var(--token-space-256)", /* 256px gap between title and grid */
          columnGap: "var(--token-space-24)", /* 24px horizontal gap */
          rowGap: "var(--token-space-64)", /* 64px vertical gap */
        }}
      >
        {projects.map((project, cardIndex) => (
          <motion.div key={cardIndex} {...cardMotion(cardIndex)}>
            <WorkCard {...project} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Works;

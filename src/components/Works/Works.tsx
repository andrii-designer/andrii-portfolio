"use client";

import { motion, useReducedMotion } from "framer-motion";
import Title from "@/components/Title";
import WorkCard, { WorkCardProps } from "./WorkCard";

/**
 * Works — Portfolio projects section
 * Figma node-id: 2231:5841 (Works section frame)
 *
 * Layout specs (from Figma screenshot):
 * - Section padding: 24px top, 192px bottom, 24px left/right (via section-inner)
 * - Title container: uses reusable Title component
 * - Label: "( 001 )  MY WORKS" - 16px, semibold, uppercase, 6px vertical padding
 * - Heading: "Works" - 150px display-1, semibold
 * - Gap title container → grid: 256px
 * - Grid: 2 columns desktop, 1 mobile
 * - Grid column gap: 24px
 * - Grid row gap: 64px
 *
 * Tokens used:
 * - Spacing: --token-space-6, --token-space-8, --token-space-24, --token-space-64, --token-space-192, --token-space-256
 * - Typography: --token-size-display-1, --token-size-label-md, --token-weight-semibold
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
      {/* Title Component — reusable */}
      <Title
        index={`( ${index} )`}
        label="my works"
        heading={title}
      />

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

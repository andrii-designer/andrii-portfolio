"use client";

import { motion, useReducedMotion } from "framer-motion";
import Title from "@/components/Title";
import WorkCard, { WorkCardProps } from "@/components/Works/WorkCard";

/**
 * RecentWorks — About page "Recent Works" section (1 row, 2 projects)
 *
 * Design parity:
 * - Reuses the same Title + WorkCard styling as Home → Works
 * - Grid: 2 columns desktop, 1 column mobile
 * - Gaps: 24px column, 64px row (kept for parity even though only 1 row renders)
 * - Title → grid gap: 256px
 * - Section uses .section-wrap + .section-inner with 24px side paddings
 */

const recentWorksProjects: WorkCardProps[] = [
  {
    title: "Find Your Perfect Clinical Rotation",
    client: "RotationsPlus",
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Portfolio Overview dashboard project preview",
    href: "/projects/rotations-plus",
  },
  {
    title: "Find Your Perfect Clinical Rotation",
    client: "RotationsPlus",
    imageSrc: "/assets/images/works/placeholder.svg",
    imageAlt: "Portfolio Overview dashboard project preview (variant)",
    href: "/projects/rotations-plus-2",
  },
];

export default function RecentWorks() {
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
      className="section-wrap"
      aria-label="Recent works"
    >
      <div
        className="section-inner"
        style={{
          paddingTop: "var(--token-space-24)", // section top padding only
          paddingBottom: "var(--token-space-192)", // 192px bottom padding (matches Works)
        }}
      >
        <div className="flex flex-col w-full">
          <Title
            label="see my recent projects"
            heading="Recent Works"
          />

          <div
            className="grid w-full grid-cols-1 md:grid-cols-2"
            style={{
              marginTop: "var(--token-space-256)", /* 256px gap between title and grid */
              columnGap: "var(--token-space-24)", /* 24px horizontal gap */
              rowGap: "var(--token-space-64)", /* 64px vertical gap */
            }}
          >
            {recentWorksProjects.slice(0, 2).map((project, cardIndex) => (
              <motion.div key={project.href ?? cardIndex} {...cardMotion(cardIndex)}>
                <WorkCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}


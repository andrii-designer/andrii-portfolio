"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * SkillsTitle — Title component for Skills section using H1 token
 * 
 * Layout specs:
 * - Uses H1 token (84px) instead of display-1 (150px)
 * - Title takes full available parent container width (display:block / width:100%)
 * - NO label container (different from other sections)
 * 
 * Tokens used:
 * - Typography: --token-size-h1 (84px)
 * - Colors: --token-color-accent
 */

export type SkillsTitleProps = {
  /** Main heading text */
  heading: string;
};

const SkillsTitle = ({ heading }: SkillsTitleProps) => {
  const prefersReducedMotion = useReducedMotion();

  const titleMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  return (
    <motion.h1
      {...titleMotion}
      className="skills-title text-accent"
      style={{
        fontFamily: "var(--token-font-family-base)",
        fontSize: "var(--token-size-h1)",
        fontWeight: "var(--token-weight-semibold)",
        lineHeight: "var(--token-leading-100)",
        letterSpacing: "-3px",
        margin: 0,
        width: "100%",
        display: "block",
      }}
    >
      {heading}
    </motion.h1>
  );
};

export default SkillsTitle;

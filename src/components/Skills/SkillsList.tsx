"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * SkillsList — Skills list with dot indicators matching Services section
 * 
 * Layout specs:
 * - List items use H4 token (36px) for skill text
 * - Each item has a left dot (24px size, same as Services section)
 * - Distance between dot and text: 48px (--token-space-48)
 * - Bottom border on each item (1px solid accent, same as Services)
 * - Padding top/bottom: 24px per item
 * - Last item has no border
 * 
 * Tokens used:
 * - Typography: --token-size-h4 (36px)
 * - Spacing: --token-space-24 (dot size, padding), --token-space-48 (dot → text gap)
 * - Colors: --token-color-accent
 */

export type SkillsListProps = {
  /** Array of skill names to display */
  skills: string[];
};

const SkillsList = ({ skills }: SkillsListProps) => {
  const prefersReducedMotion = useReducedMotion();

  const listMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  return (
    <motion.ul
      {...listMotion}
      className="skills-list"
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {skills.map((skill, index) => {
        const isLast = index === skills.length - 1;

        return (
          <li
            key={index}
            className="skill-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--token-space-48)",
              paddingTop: "var(--token-space-24)",
              paddingBottom: "var(--token-space-24)",
              borderBottom: isLast ? "none" : "1px solid var(--token-color-accent)",
            }}
          >
            {/* Dot indicator — 24px (same as Services) */}
            <span
              className="skill-dot"
              aria-hidden="true"
              style={{
                width: "var(--token-space-24)",
                height: "var(--token-space-24)",
                borderRadius: "9999px",
                background: "var(--token-color-accent)",
                flexShrink: 0,
              }}
            />

            {/* Skill text — H4 token (36px) */}
            <span
              className="skill-text text-accent"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-h4)",
                fontWeight: "var(--token-weight-semibold)",
                lineHeight: "var(--token-leading-110)",
                letterSpacing: "-1px",
              }}
            >
              {skill}
            </span>
          </li>
        );
      })}
    </motion.ul>
  );
};

export default SkillsList;

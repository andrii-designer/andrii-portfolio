"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Title — Reusable section title component
 * Used by Works, Services, and other sections
 *
 * Layout specs (from Figma):
 * - Title container: vertical stack, left-aligned, gap 0
 * - Label: inline-flex, padding-top/bottom: 6px, gap: 8px between index and text
 * - Label text: 16px, semibold, uppercase (Label - Medium - CAPS)
 * - Heading: display-1 (150px), semibold
 *
 * Tokens used:
 * - Typography: --token-size-display-1, --token-size-label-md, --token-weight-semibold
 * - Spacing: --token-space-6, --token-space-8
 * - Colors: --token-color-accent
 *
 * @example
 * // Works section usage
 * <Title index="( 001 )" label="my works" heading="Works" />
 *
 * @example
 * // Services section usage
 * <Title index="( 002 )" label="what can i provide you with" heading="Services" />
 */

export type TitleProps = {
  /** Section index (e.g., "( 001 )" or "( 002 )") */
  index?: string;
  /** Label text below index (e.g., "my works", "what can i provide you with") */
  label?: string;
  /** Main heading (e.g., "Works", "Services") */
  heading?: string;
  /** Optional className for additional styling */
  className?: string;
};

const Title = ({
  index,
  label,
  heading,
  className = "",
}: TitleProps) => {
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
    <motion.div
      {...titleMotion}
      className={`title flex flex-col w-full ${className}`}
      style={{
        gap: 0, /* No gap between label and heading */
        alignItems: "flex-start", /* Left-aligned */
      }}
    >
      {/* Label Container — "( 001 )  MY WORKS" or "( 002 )  WHAT CAN I PROVIDE YOU WITH" */}
      {(index || label) && (
        <div
          className="label inline-flex items-center"
          style={{
            gap: "var(--token-space-8)", /* 8px gap between label elements */
            paddingTop: "var(--token-space-6)", /* 6px top padding */
            paddingBottom: "var(--token-space-6)", /* 6px bottom padding */
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          {index && (
            <span
              className="label-index text-accent"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-label-md)", /* 16px */
                fontWeight: "var(--token-weight-semibold)", /* 600 */
                lineHeight: "var(--token-leading-140)", /* 1.4 */
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {index}
            </span>
          )}
          {label && (
            <span
              className="label-text text-accent"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-label-md)", /* 16px */
                fontWeight: "var(--token-weight-semibold)", /* 600 */
                lineHeight: "var(--token-leading-140)", /* 1.4 */
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {label}
            </span>
          )}
        </div>
      )}

      {/* Section Heading — using display-1 (150px) */}
      {heading && (
        <h2
          className="heading text-accent"
          style={{
            fontFamily: "var(--token-font-family-base)",
            fontSize: "var(--token-size-display-1)", /* 150px */
            fontWeight: "var(--token-weight-semibold)", /* 600 */
            lineHeight: "var(--token-leading-100)", /* 1.0 */
            letterSpacing: "-6px",
            margin: 0,
          }}
        >
          {heading}
        </h2>
      )}
    </motion.div>
  );
};

export default Title;

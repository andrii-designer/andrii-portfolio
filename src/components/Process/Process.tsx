"use client";

import { motion, useReducedMotion } from "framer-motion";
import Title from "@/components/Title";

/**
 * Process — Process section component
 * Displays a 3-step process workflow
 *
 * Layout specs (from Figma reference):
 * - Section background: --token-color-primary (#d2d2d6)
 * - Section uses .section-wrap + .section-inner pattern
 * - Title component with index "( 003 )", label "CLEAR AND SIMPLE PROCESS", heading "Process"
 * - Gap title → process list: 256px (matches Works/Services)
 * - 3 items in vertical list, full width
 *
 * Border & spacing rules:
 * - First item: padding-top 24px, padding-bottom 48px, bottom border 1px
 * - Middle items: padding-top 48px, padding-bottom 48px, bottom border 1px
 * - Last item: padding-top 48px, padding-bottom 0, no bottom border
 * - Border color: --token-color-accent
 *
 * Typography:
 * - Numbers and titles: h4 token (36px, semibold)
 * - Descriptions: body-lg (18px) with semibold weight
 *
 * Content container:
 * - Max width: 566px for title + description container
 *
 * Tokens used:
 * - Spacing: --token-space-24, --token-space-48, --token-space-192, --token-space-256
 * - Typography: --token-size-h4, --token-size-body-lg, --token-weight-semibold
 * - Colors: --token-color-primary (background), --token-color-accent (text, borders)
 */

/** Process item data type */
export type ProcessItem = {
  /** Item number (e.g., "01", "02", "03") */
  number: string;
  /** Item title */
  title: string;
  /** Item description */
  description: string;
};

export type ProcessProps = {
  /** Array of process items */
  items?: ProcessItem[];
  /** Section title (default: "Process") */
  title?: string;
  /** Section index (default: "003") */
  index?: string;
  /** Section label (default: "clear and simple process") */
  label?: string;
};

/** Default process items matching Figma design */
const defaultItems: ProcessItem[] = [
  {
    number: "01",
    title: "Intro call & proposal",
    description:
      "We'll discuss your goals, define the scope, and outline a clear plan so you know exactly what to expect.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Work directly with a senior designer as we create high-quality, dev-ready designs with structured iterations and clear communication.",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "Receive polished, production-ready assets and documentation, ensuring a seamless handoff to development or your team.",
  },
];

const Process = ({
  items = defaultItems,
  title = "Process",
  index = "003",
  label = "clear and simple process",
}: ProcessProps) => {
  const prefersReducedMotion = useReducedMotion();

  const containerMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const itemMotion = (itemIndex: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: itemIndex * 0.1,
          },
        };

  /**
   * Get padding styles for each item based on position
   * - First item: padding-top 24px, padding-bottom 48px
   * - Middle items: padding-top 48px, padding-bottom 48px
   * - Last item: padding-top 48px, padding-bottom 0
   */
  const getItemPadding = (itemIndex: number, totalItems: number) => {
    const isFirst = itemIndex === 0;
    const isLast = itemIndex === totalItems - 1;

    return {
      paddingTop: isFirst ? "var(--token-space-24)" : "var(--token-space-48)",
      paddingBottom: isLast ? 0 : "var(--token-space-48)",
    };
  };

  /**
   * Check if item should have bottom border
   * All items except the last one have a 1px bottom border
   */
  const shouldHaveBorder = (itemIndex: number, totalItems: number) => {
    return itemIndex !== totalItems - 1;
  };

  return (
    <motion.div
      {...containerMotion}
      className="flex flex-col w-full"
      style={{
        paddingTop: "var(--token-space-24)" /* 24px top padding */,
        paddingBottom: "var(--token-space-192)" /* 192px bottom padding */,
        height: "fit-content",
      }}
      aria-label="Process"
      data-node-id="process-section"
    >
      {/* Title Component — reusable */}
      <Title index={`( ${index} )`} label={label} heading={title} />

      {/* Process List Container */}
      <ul
        className="process-list flex flex-col w-full"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginBlockStart: "var(--token-space-256)" /* 256px gap between title and list */,
          width: "100%",
        }}
      >
        {items.map((item, itemIndex) => (
          <motion.li
            key={itemIndex}
            {...itemMotion(itemIndex)}
            className="process-item flex w-full"
            style={{
              ...getItemPadding(itemIndex, items.length),
              borderBottom: shouldHaveBorder(itemIndex, items.length)
                ? "1px solid var(--token-color-accent)"
                : "none",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* Number — left side on desktop */}
            <div
              className="process-number"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-h4)" /* 36px */,
                fontWeight: "var(--token-weight-semibold)" /* 600 */,
                lineHeight: "var(--token-leading-110)" /* 110% */,
                color: "var(--token-color-accent)",
              }}
            >
              {item.number}
            </div>

            {/* Content — right side on desktop */}
            <div
              className="process-content flex flex-col"
              style={{
                gap: "var(--token-space-16)" /* 16px gap between title and description */,
                maxWidth: "566px" /* Max width for content container */,
                flexShrink: 0,
              }}
            >
              {/* Title */}
              <h4
                className="process-title"
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-h4)" /* 36px */,
                  fontWeight: "var(--token-weight-semibold)" /* 600 */,
                  lineHeight: "var(--token-leading-110)" /* 110% */,
                  color: "var(--token-color-accent)",
                  margin: 0,
                }}
              >
                {item.title}
              </h4>

              {/* Description — paragraph large semibold (18px) */}
              <p
                className="process-desc"
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-body-lg)" /* 18px */,
                  fontWeight: "var(--token-weight-semibold)" /* 600 - semibold */,
                  lineHeight: "var(--token-leading-150)" /* 150% */,
                  color: "var(--token-color-accent)",
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Process;

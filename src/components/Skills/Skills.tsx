"use client";

import Image from "next/image";
import SkillsTitle from "./SkillsTitle";
import SkillsList from "./SkillsList";

/**
 * Skills — Skills section for About page
 * 
 * Layout specs (from Figma screenshot):
 * - Section padding: 24px top/left/right, 192px bottom
 * - Title to content gap: 256px
 * - Content layout: horizontal flex, bottom-aligned (alignItems: flex-end)
 * - Left: skills list (flex: 1)
 * - Right: square photo (1:1 aspect ratio, max 566px)
 * 
 * Photo requirements:
 * - Square (1:1 aspect ratio) at all sizes
 * - Max width = 566px
 * - No border-radius (rounded-none)
 * - Bottom-aligned with list content
 * 
 * Skills list:
 * - List items use H4 token (36px) for text
 * - Dot size: 24px (--token-space-24, same as Services section)
 * - Dot → text gap: 48px (--token-space-48)
 * - Bottom border on each item (same as Services section)
 * 
 * Tokens used:
 * - Spacing: --token-space-24, --token-space-256, --token-space-192, --token-space-48
 * - Typography: --token-size-h1 (title), --token-size-h4 (list items)
 * - Colors: --token-color-base (section background)
 */

export type SkillsProps = {
  /** Section title text */
  title?: string;
  /** Array of skills to display */
  skills?: string[];
  /** Photo source path */
  photoSrc?: string;
  /** Photo alt text */
  photoAlt?: string;
  /**
   * Optional section bottom padding.
   * Useful when another section follows immediately (e.g., About → Recent Works).
   */
  paddingBottom?: number | string;
};

/** Default skills data */
const defaultSkills = [
  "Web & Mobile Apps",
  "3D & Motion design",
  "Branding",
  "3D, 2D",
];

const Skills = ({
  title = "With over 7 years of hands-on experience in SaaS and digital products, I bring a rare blend of code fluency and creative thinking.",
  skills = defaultSkills,
  photoSrc = "/assets/images/about/placeholder-square.svg",
  photoAlt = "Portrait placeholder",
  paddingBottom = "var(--token-space-192)",
}: SkillsProps) => {
  return (
    <section className="section-wrap" aria-label="Skills">
      <div
        className="section-inner skills-wrapper"
        style={{
          paddingLeft: "var(--token-space-24)",
          paddingRight: "var(--token-space-24)",
          paddingTop: "var(--token-space-24)",
          paddingBottom,
        }}
      >
        {/* Title Component — uses H1 token, no label */}
        <SkillsTitle heading={title} />

        {/* Content — horizontal flex, bottom-aligned */}
        <div
          className="skills-content"
          style={{
            marginTop: "var(--token-space-256)",
            display: "flex",
            alignItems: "flex-end",
            gap: "var(--token-space-24)",
            flexWrap: "wrap",
          }}
        >
          {/* Skills List — left side, flex: 1 */}
          <div
            className="skills-list-container"
            style={{
              flex: "1 1 0",
              minWidth: "300px",
            }}
          >
            <SkillsList skills={skills} />
          </div>

          {/* Photo — right side, square, max 566px */}
          <div
            className="skills-photo relative overflow-hidden rounded-none"
            style={{
              aspectRatio: "1 / 1",
              width: "min(566px, 40%)",
              maxWidth: "566px",
              borderRadius: 0,
              flex: "0 0 auto",
            }}
          >
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1440px) 40vw, 566px"
              className="object-cover"
              style={{ borderRadius: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

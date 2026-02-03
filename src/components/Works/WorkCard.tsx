"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * WorkCard — Individual project card for Works section
 * Figma node-id: 2231:5841 (part of Works section)
 *
 * Layout specs (inferred from Figma design system):
 * - Card container: vertical flex, gap 24px between image and text content
 * - Image container: full width, aspect ratio ~696:480 (~1.45:1), 0px border-radius
 * - Text content: vertical flex, gap 16px
 * - Title: h4 size (36px), semibold (600), line-height 1.1
 * - Description: body-md (16px), regular (400), line-height 1.5
 *
 * Tokens used:
 * - Typography: --token-size-h4, --token-size-body-md
 * - Spacing: --token-space-16, --token-space-24
 * - Colors: --token-color-accent
 */

export type WorkCardProps = {
  /** Project title */
  title: string;
  /** Short project description */
  description?: string;
  /** Project category/type tags */
  tags?: string[];
  /** Image source path (use placeholder if not available) */
  imageSrc: string;
  /** Image alt text */
  imageAlt: string;
  /** Link to project detail page */
  href?: string;
};

const WorkCard = ({
  title,
  description,
  tags,
  imageSrc,
  imageAlt,
  href = "#",
}: WorkCardProps) => {
  const CardContent = (
    <article
      className="group flex flex-col"
      style={{
        gap: "var(--token-space-24)", /* 24px gap between image and text */
      }}
    >
      {/* Project Image — 0px border-radius per Figma spec */}
      <figure
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "696 / 480", /* ~1.45:1 aspect ratio */
          borderRadius: 0,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 696px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ borderRadius: 0 }}
          loading="lazy"
        />
      </figure>

      {/* Text Content */}
      <div
        className="flex flex-col"
        style={{
          gap: "var(--token-space-16)", /* 16px gap between title and description */
        }}
      >
        {/* Tags Row */}
        {tags && tags.length > 0 && (
          <div
            className="flex flex-wrap"
            style={{
              gap: "var(--token-space-8)", /* 8px gap between tags */
            }}
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-accent"
                style={{
                  fontSize: "var(--token-size-body-sm)", /* 12px */
                  fontWeight: "var(--token-weight-medium)", /* 500 */
                  lineHeight: "var(--token-leading-140)", /* 1.4 */
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {tag}
                {index < tags.length - 1 && (
                  <span className="ml-2 opacity-40">/</span>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Project Title */}
        <h3
          className="text-accent"
          style={{
            fontFamily: "var(--token-font-family-base)",
            fontSize: "var(--token-size-h4)", /* 36px */
            fontWeight: "var(--token-weight-semibold)", /* 600 */
            lineHeight: "var(--token-leading-110)", /* 1.1 */
            letterSpacing: "-1px",
          }}
        >
          {title}
        </h3>

        {/* Project Description */}
        {description && (
          <p
            className="text-accent max-w-[540px]"
            style={{
              fontSize: "var(--token-size-body-md)", /* 16px */
              fontWeight: "var(--token-weight-regular)", /* 400 */
              lineHeight: "var(--token-leading-150)", /* 1.5 */
              opacity: 0.7,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </article>
  );

  // Wrap with Link if href is provided
  if (href && href !== "#") {
    return (
      <Link href={href} className="block no-underline">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default WorkCard;

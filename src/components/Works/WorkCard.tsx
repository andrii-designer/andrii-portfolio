"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * WorkCard — Individual project card for Works section
 * Figma node-id: 2231:5841 (part of Works section)
 *
 * Layout specs (from Figma screenshot):
 * - Card container: vertical flex, gap 24px between image and text content
 * - Image container: full width, aspect ratio 684:455 (~1.502:1), 0px border-radius
 * - Text content: vertical flex, gap 12px between title and client
 * - Title: h5 size (24px), semibold (600), line-height 1.2
 * - Client: label-md (16px), regular (400), line-height 1.4
 *
 * Tokens used:
 * - Typography: --token-size-h5 (24px), --token-size-label-md (16px)
 * - Spacing: --token-space-12, --token-space-24
 * - Colors: --token-color-accent
 */

export type WorkCardProps = {
  /** Project title */
  title: string;
  /** Client/company name */
  client?: string;
  /** Image source path (use placeholder if not available) */
  imageSrc: string;
  /** Image alt text */
  imageAlt: string;
  /** Link to project detail page */
  href?: string;
};

const WorkCard = ({
  title,
  client,
  imageSrc,
  imageAlt,
  href = "#",
}: WorkCardProps) => {
  const CardContent = (
    <article
      className="group flex flex-col w-full"
      style={{
        gap: "var(--token-space-24)", /* 24px gap between image and text */
      }}
    >
      {/* Project Image — aspect ratio 684:455, 0px border-radius */}
      <figure
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "684 / 455", /* ~1.502:1 aspect ratio from Figma */
          borderRadius: 0,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 684px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ borderRadius: 0 }}
          loading="lazy"
        />
      </figure>

      {/* Text Content — title + client */}
      <div
        className="flex flex-col"
        style={{
          gap: "var(--token-space-12)", /* 12px gap between title and client */
        }}
      >
        {/* Project Title — h5 (24px), semibold */}
        <h5
          className="text-accent"
          style={{
            fontFamily: "var(--token-font-family-base)",
            fontSize: "var(--token-size-h5)", /* 24px */
            fontWeight: "var(--token-weight-semibold)", /* 600 */
            lineHeight: "var(--token-leading-120)", /* 1.2 */
            letterSpacing: "-0.5px",
            margin: 0,
          }}
        >
          {title}
        </h5>

        {/* Client Name — label-md (16px), regular */}
        {client && (
          <p
            className="text-accent"
            style={{
              fontFamily: "var(--token-font-family-base)",
              fontSize: "var(--token-size-label-md)", /* 16px */
              fontWeight: "var(--token-weight-regular)", /* 400 */
              lineHeight: "var(--token-leading-140)", /* 1.4 */
              margin: 0,
            }}
          >
            {client}
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

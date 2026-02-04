"use client";

import Image from "next/image";

/**
 * TestimonialCard — Individual testimonial slide content
 *
 * Layout specs (from Figma reference):
 * - Testimonial text: h4 token (36px, semibold), max-width 1038px
 * - Quote SVG decorative element above/left of text
 * - Client info: avatar (70x70 square), name, role, optional LinkedIn link
 *
 * Tokens used:
 * - Typography: --token-size-h4, --token-weight-semibold
 * - Colors: --token-color-accent
 */

export type TestimonialData = {
  /** Unique identifier for the testimonial */
  id: string;
  /** Testimonial text content */
  text: string;
  /** Client name */
  clientName: string;
  /** Client role/title */
  clientRole: string;
  /** Path to client avatar image */
  avatarSrc: string;
  /** Optional LinkedIn URL */
  linkedInUrl?: string;
};

export type TestimonialCardProps = {
  /** Testimonial data */
  testimonial: TestimonialData;
  /** Whether this slide is currently active */
  isActive: boolean;
  /** Slide index (1-based for display) */
  slideIndex: number;
  /** Total number of slides */
  totalSlides: number;
};

const TestimonialCard = ({
  testimonial,
  isActive,
  slideIndex,
  totalSlides,
}: TestimonialCardProps) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${slideIndex} of ${totalSlides}`}
      aria-hidden={!isActive}
      className="testimonial-card"
      style={{
        display: isActive ? "flex" : "none",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* Decorative quotation mark SVG */}
      <div
        aria-hidden="true"
        className="testimonial-quote"
        style={{
          marginBottom: "var(--token-space-24)",
          userSelect: "none",
        }}
      >
        <Image
          src="/assets/images/testimonials/quote.svg"
          alt=""
          width={31}
          height={24}
          aria-hidden="true"
        />
      </div>

      {/* Testimonial text — h4 token (36px) */}
      <blockquote
        className="testimonial-text"
        style={{
          fontFamily: "var(--token-font-family-base)",
          fontSize: "var(--token-size-h4)" /* 36px */,
          fontWeight: "var(--token-weight-semibold)" /* 600 */,
          lineHeight: "var(--token-leading-120)" /* 120% */,
          color: "var(--token-color-accent)",
          margin: 0,
          padding: 0,
          maxWidth: "1038px",
        }}
      >
        {testimonial.text}
      </blockquote>
    </div>
  );
};

export default TestimonialCard;

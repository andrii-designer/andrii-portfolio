"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type CaseStudyTextImageGridProps = {
  title: string;
  paragraph?: string;
  images?: string[]; // expected length >= 2; use placeholders if missing
};

/**
 * CaseStudyTextImageGrid — text + 2-image grid variant of CaseStudyTextImage.
 * Animation: Same scroll-reveal system as Home/About (whileInView, useReducedMotion).
 */
export default function CaseStudyTextImageGrid({
  title,
  paragraph,
  images,
}: CaseStudyTextImageGridProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const titleMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const paragraphMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.1,
        },
      };

  const gridMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.15,
        },
      };

  const bodyText =
    paragraph ??
    "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.";

  const firstImage =
    images?.[0] || "/assets/case-studies/placeholder-grid-1.svg";
  const secondImage =
    images?.[1] || "/assets/case-studies/placeholder-grid-2.svg";

  return (
    <motion.section
      {...containerMotion}
      className="case-study-text-image case-study-text-image-grid section-wrap"
      aria-label="Case study images grid"
    >
      <div
        className="section-inner"
        style={{
          paddingTop: "var(--token-space-128)",
          paddingBottom: "var(--token-space-128)",
        }}
      >
        <div className="text-image-row" style={{ width: "100%" }}>
          <div
            className="title-wrap"
            style={{
              maxWidth: "684px",
              width: "100%",
              textAlign: "left",
            }}
          >
            <motion.h2 className="section-title" {...titleMotion}>
              {title}
            </motion.h2>
          </div>

          <motion.div
            className="paragraph-wrap"
            style={{
              maxWidth: "566px",
              width: "100%",
              marginLeft: "auto",
              textAlign: "left",
              marginTop: "var(--token-space-80)",
            }}
            {...paragraphMotion}
          >
            <p className="section-paragraph">{bodyText}</p>
          </motion.div>
        </div>

        <motion.div
          className="images-grid"
          style={{
            marginTop: "var(--token-space-80)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--token-space-24)",
          }}
          {...gridMotion}
        >
          <Image
            src={firstImage}
            alt="Project image 1"
            width={684}
            height={455}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
          <Image
            src={secondImage}
            alt="Project image 2"
            width={684}
            height={455}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

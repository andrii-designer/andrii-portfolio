"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type CaseStudyIntroProps = {
  title: string;
  text?: string;
  image?: string;
};

/**
 * CaseStudyIntro — introductory section for a case study.
 * Animation: Same scroll-reveal system as Home/About (whileInView, useReducedMotion).
 */
export default function CaseStudyIntro({
  title,
  text,
  image,
}: CaseStudyIntroProps) {
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

  const textMotion = prefersReducedMotion
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

  const imageMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.15,
        },
      };

  const introText =
    text ??
    "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.";

  const src = image || "/assets/case-studies/placeholder-intro.jpg";
  const alt = image
    ? `${title} intro image`
    : "Intro illustration placeholder";

  return (
    <motion.section
      {...containerMotion}
      className="case-study-intro section-wrap"
      aria-label="Case study intro"
    >
      <div className="section-inner">
        <div className="intro-title" style={{ width: "100%" }}>
          <motion.h2 className="intro-heading" {...titleMotion}>
            {title}
          </motion.h2>
        </div>

        <motion.div
          className="intro-text"
          style={{ marginTop: "var(--token-space-256)" }}
          {...textMotion}
        >
          <p className="intro-paragraph">{introText}</p>
        </motion.div>
      </div>

      <motion.div
        className="intro-visual"
        role="img"
        aria-hidden={image ? "false" : "true"}
        {...imageMotion}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </motion.div>
    </motion.section>
  );
}

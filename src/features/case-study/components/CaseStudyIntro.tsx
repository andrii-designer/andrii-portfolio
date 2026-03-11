"use client";

import { motion, useReducedMotion } from "framer-motion";
import OptimizedImage from "@/components/media/OptimizedImage";

export type CaseStudyIntroProps = {
  title: string;
  text?: string;
  image?: string;
  introVideo?: string;
};

/**
 * CaseStudyIntro — introductory section for a case study.
 * Animation: Same scroll-reveal system as Home/About (whileInView, useReducedMotion).
 */
export default function CaseStudyIntro({
  title,
  text,
  image,
  introVideo,
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

        <motion.div
          className="intro-visual"
          role="img"
          aria-hidden={introVideo ? "false" : image ? "false" : "true"}
          style={{ marginTop: "var(--token-space-48)" }}
          {...imageMotion}
        >
          {introVideo ? (
            introVideo.includes("player.vimeo.com") ? (
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                <iframe
                  src={introVideo}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${title} intro video`}
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
            ) : (
              <video
                src={introVideo}
                poster={image}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <OptimizedImage
              src={src}
              alt={alt}
              width={1600}
              height={900}
              quality={100}
              sizes="100vw"
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

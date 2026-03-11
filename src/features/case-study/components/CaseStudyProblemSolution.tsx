"use client";

import { motion, useReducedMotion } from "framer-motion";
import OptimizedImage from "@/components/media/OptimizedImage";

export type CaseStudyProblemSolutionProps = {
  problemTitle?: string;
  problemText: string;
  solutionTitle?: string;
  solutionText: string;
  image?: string;
  /** Optional second full-bleed image rendered below the first */
  secondImage?: string;
  video?: string;
  /** Optional: disables extra bottom padding on the section wrapper */
  noSectionBottomPadding?: boolean;
};

/**
 * CaseStudyProblemSolution — Problem + Solution side-by-side above an image/video.
 *
 * Layout:
 * - Problem column and Solution column sit in a horizontal row with 48px gap.
 * - Both columns are always above the image/video visual.
 * - Titles use h4 token; paragraphs use body-md semibold token (via CSS classes).
 */
export default function CaseStudyProblemSolution({
  problemTitle = "Problem",
  solutionTitle = "Solution",
  problemText,
  solutionText,
  image,
  secondImage,
  video,
  noSectionBottomPadding,
}: CaseStudyProblemSolutionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const textMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
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

  return (
    <motion.section
      {...containerMotion}
      className="case-study-text-image section-wrap"
      aria-label="Case study problem and solution"
      style={
        !noSectionBottomPadding
          ? { paddingBottom: "var(--token-space-128)" }
          : undefined
      }
    >
      <div
        className="section-inner"
        style={{
          paddingTop: "var(--token-space-24)",
          paddingBottom: "var(--token-space-48)",
        }}
      >
        <div
          className="problem-solution-row"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "var(--token-space-48)",
            width: "100%",
          }}
        >
          {/* Problem column */}
          <motion.div
            style={{ flex: 1 }}
            {...textMotion}
          >
            <h2 className="section-title problem-solution-title">
              {problemTitle}
            </h2>
            <p
              className="section-paragraph problem-solution-paragraph"
              style={{ marginTop: "var(--token-space-24)" }}
            >
              {problemText}
            </p>
          </motion.div>

          {/* Solution column */}
          <motion.div
            style={{ flex: 1 }}
            {...{ ...textMotion, transition: { ...((textMotion as { transition?: object }).transition), delay: 0.1 } }}
          >
            <h2 className="section-title problem-solution-title">
              {solutionTitle}
            </h2>
            <p
              className="section-paragraph problem-solution-paragraph"
              style={{ marginTop: "var(--token-space-24)" }}
            >
              {solutionText}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Visual — image or video, always below the text row */}
      {(image || video) && (
        <motion.div
          className="text-image-visual full-bleed"
          style={{ marginTop: "0px" }}
          {...imageMotion}
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <OptimizedImage
              src={image!}
              alt="Case study visual"
              width={1600}
              height={900}
              quality={100}
              sizes="100vw"
              style={{ width: "100%", height: "auto", display: "block" }}
              priority={false}
            />
          )}
        </motion.div>
      )}

      {/* Second image — stacked below the first visual */}
      {secondImage && (
        <motion.div
          className="text-image-visual full-bleed"
          style={{ marginTop: "var(--token-space-48)" }}
          {...{
            ...imageMotion,
            transition: {
              ...(imageMotion as { transition?: object }).transition,
              delay: 0.3,
            },
          }}
        >
          <OptimizedImage
            src={secondImage}
            alt="Case study visual"
            width={1600}
            height={900}
            quality={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto", display: "block" }}
            priority={false}
          />
        </motion.div>
      )}
    </motion.section>
  );
}

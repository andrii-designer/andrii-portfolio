"use client";

import { motion, useReducedMotion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";
import LazyVideo from "@/components/LazyVideo";
import LazyVimeo from "@/components/media/LazyVimeo";

export type CaseStudyTextImageProps = {
  title: string;
  paragraph?: string;
  image?: string;
  secondImage?: string;
  duplicateTextBelow?: boolean;
  /** Optional: disables extra bottom padding on the section wrapper */
  noSectionBottomPadding?: boolean;
  /** Optional variant for special typography/layout cases */
  variant?: "default" | "problemSolution";
  video?: string;
  /** Poster image shown in LazyVimeo before iframe is inserted (Vimeo video only) */
  videoPoster?: string;
  /** CSS padding-top % for Vimeo video aspect ratio (e.g. "56.25%") */
  videoAspectPadding?: string;
  bottomTitle?: string;
  bottomParagraph?: string;
};

/**
 * CaseStudyTextImage — reusable text + full-width image section.
 * Animation: Same scroll-reveal system as Home/About (whileInView, useReducedMotion).
 */
export default function CaseStudyTextImage({
  title,
  paragraph,
  image,
  secondImage,
  duplicateTextBelow,
  noSectionBottomPadding,
  variant = "default",
  video,
  videoPoster = "",
  videoAspectPadding = "56.25%",
  bottomTitle,
  bottomParagraph,
}: CaseStudyTextImageProps) {
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

  const bodyText =
    paragraph ??
    "Your content changes context as users move across surfaces. This section explains the strategic outcome, not just the visuals.";

  const src = image || "/assets/case-studies/placeholder-body.jpg";
  const alt = image ? `${title} image` : "Case study visual placeholder";

  const titleClassName =
    variant === "problemSolution"
      ? "section-title problem-solution-title"
      : "section-title";

  const paragraphClassName =
    variant === "problemSolution"
      ? "section-paragraph problem-solution-paragraph"
      : "section-paragraph";

  return (
    <motion.section
      {...containerMotion}
      className="case-study-text-image section-wrap"
      aria-label="Case study text and image"
      style={
        !duplicateTextBelow && !noSectionBottomPadding
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
        <div className="text-image-row" style={{ width: "100%" }}>
          <div
            className="title-wrap"
            style={{
              maxWidth: "684px",
              width: "100%",
              textAlign: "left",
            }}
          >
            <motion.h2 className={titleClassName} {...titleMotion}>
              {title}
            </motion.h2>
          </div>

          <motion.div
            className="paragraph-wrap"
            style={{
              maxWidth: "566px",
              width: "100%",
              marginLeft: 0,
              textAlign: "left",
              marginTop: "var(--token-space-48)",
            }}
            {...paragraphMotion}
          >
            <p className={paragraphClassName}>{bodyText}</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="text-image-visual full-bleed"
        style={{
          marginTop: "0px",
        }}
        {...imageMotion}
      >
        {video ? (
          video.includes("player.vimeo.com") ? (
            <LazyVimeo
              poster={videoPoster}
              iframeSrc={video}
              aspectPadding={videoAspectPadding}
              ariaLabel={`${title} video`}
              playOnVisible={true}
            />
          ) : (
            <LazyVideo
              sources={[{ src: video, type: "video/mp4" }]}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              style={{ width: "100%", height: "auto", display: "block" }}
              wrapperStyle={{ width: "100%", aspectRatio: "16 / 9" }}
            />
          )
        ) : (
          <OptimizedImage
            src={src}
            alt={alt}
            width={1600}
            height={900}
            quality={85}
            sizes="100vw"
            loading="lazy"
            style={{ width: "100%", height: "auto", display: "block" }}
            wrapperStyle={{ width: "100%", aspectRatio: "16 / 9" }}
          />
        )}
      </motion.div>

      {secondImage && (
        <motion.div
          className="text-image-visual full-bleed"
          style={{ marginTop: "var(--token-space-24)" }}
          {...imageMotion}
        >
          <OptimizedImage
            src={secondImage}
            alt={`${title} second image`}
            width={1600}
            height={900}
            quality={85}
            sizes="100vw"
            loading="lazy"
            style={{ width: "100%", height: "auto", display: "block" }}
            wrapperStyle={{ width: "100%", aspectRatio: "16 / 9" }}
          />
        </motion.div>
      )}

      {duplicateTextBelow && (
        <div
          className="section-inner"
          style={{
            paddingTop: "var(--token-space-48)",
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
              <motion.h2 className={titleClassName} {...titleMotion}>
                {bottomTitle ?? title}
              </motion.h2>
            </div>

            <motion.div
              className="paragraph-wrap"
              style={{
                maxWidth: "566px",
                width: "100%",
                marginLeft: 0,
                textAlign: "left",
                marginTop: "var(--token-space-48)",
              }}
              {...paragraphMotion}
            >
            <p className={paragraphClassName}>
              {bottomParagraph ?? bodyText}
            </p>
            </motion.div>
          </div>
        </div>
      )}
    </motion.section>
  );
}

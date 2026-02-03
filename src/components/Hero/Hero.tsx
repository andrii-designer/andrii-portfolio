"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero — Figma node-id: 2224:4198 (Content frame)
 * Part of hero-section frame (2224:4166)
 *
 * Figma verification (node 2224:4166):
 * - Frame dimensions: 1440 × 782
 * - Gap title → bottom-row: 128px (--token-space-128)
 * - Title: 84px, semibold (600), line-height 1.1, letter-spacing -6px
 * - CTA: 24px, semibold (600), line-height 1.4, letter-spacing -0.5px
 *
 * Tokens used:
 * - Colors: --token-color-accent (#060606), --token-color-primary (#d2d2d6)
 * - Typography: --token-font-family-base (Manrope), --token-size-h1 (84px), --token-size-h5 (24px)
 * - Typography: --token-weight-semibold (600), --token-leading-110, --token-leading-140
 * - Spacing: --token-space-24, --token-space-32, --token-space-128
 *
 * Assets from public/hero-assets/:
 * - arrow-icon.svg (CTA arrow)
 * - video-preview.png (media preview)
 */

export type HeroProps = {
  title: string;
  cta?: { text: string; href: string };
  media?: { type: "image" | "video"; src: string };
};

const Hero = ({ title, cta, media }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();

  const containerMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const titleMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.1 },
      };

  const bottomRowMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.3 },
      };

  return (
    <motion.section
      {...containerMotion}
      className="flex w-full flex-col"
      style={{
        gap: "var(--token-space-128)", /* Gap title → bottom-row: 128px (exact from Figma) */
        fontFamily: "var(--token-font-family-base)", /* Manrope font */
      }}
      aria-label="Hero"
      data-node-id="2224:4198"
    >
      {/* Hero Title — Figma node-id: 2224:4199 */}
      {/* Typography: 84px, semibold (600), line-height 1.1, letter-spacing -6px */}
      <motion.h1
        {...titleMotion}
        className="max-w-[920px] text-accent
          max-lg:max-w-[700px]
          max-md:max-w-full"
        style={{
          fontFamily: "var(--token-font-family-base)",
          fontSize: "var(--token-size-h1)", /* 84px */
          fontWeight: "var(--token-weight-semibold)", /* 600 */
          lineHeight: "var(--token-leading-110)", /* 1.1 / 110% */
          letterSpacing: "-6px", /* Exact letter-spacing from Figma */
        }}
        data-node-id="2224:4199"
      >
        {title}
      </motion.h1>

      {/* Bottom Row — Figma node-id: 2224:4200 */}
      <motion.div
        {...bottomRowMotion}
        className="flex w-full items-end justify-between
          max-md:flex-col max-md:items-start"
        style={{
          gap: "var(--token-space-24)", /* 24px gap between CTA and media */
        }}
        data-node-id="2224:4200"
      >
        {/* CTA Button — Figma node-id: 2231:5208 */}
        {cta && (
          <Link
            href={cta.href}
            className="group flex items-center py-[12px] transition-opacity hover:opacity-70"
            style={{
              gap: "var(--token-space-32)", /* 32px gap between content and arrow */
            }}
            aria-label={cta.text}
            data-node-id="2231:5208"
          >
            <span
              className="flex items-center"
              style={{ gap: "var(--token-space-24)" }} /* 24px gap */
            >
              <span
                className="size-24 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span
                className="text-accent"
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-h5)", /* 24px */
                  fontWeight: "var(--token-weight-semibold)", /* 600 */
                  lineHeight: "var(--token-leading-140)", /* 1.4 / 140% */
                  letterSpacing: "-0.5px", /* Exact letter-spacing from Figma */
                }}
              >
                {cta.text}
              </span>
            </span>
            <span className="flex size-[16px] shrink-0 -rotate-90 items-center justify-center">
              <Image
                src="/hero-assets/arrow-icon.svg"
                alt=""
                width={16}
                height={19}
                aria-hidden="true"
              />
            </span>
          </Link>
        )}

        {/* Video Preview — Figma node-id: 2224:4206 */}
        {media && (
          <figure
            className="relative h-[220px] w-[330px] shrink-0 overflow-hidden rounded-[20px]
              max-md:w-full max-md:h-auto max-md:aspect-[330/220]"
            data-node-id="2224:4206"
          >
            {media.type === "image" ? (
              <Image
                src={media.src}
                alt="Portfolio preview"
                fill
                sizes="(max-width: 768px) 100vw, 330px"
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <video
                src={media.src}
                className="h-full w-full object-cover"
                muted
                autoPlay
                loop
                playsInline
              />
            )}
          </figure>
        )}
      </motion.div>
    </motion.section>
  );
};

/**
 * Example usage (matches Figma frame 2224:4166):
 *
 * <Hero
 *   title="Digital designer helping founders and product owners"
 *   cta={{ text: "Book a call", href: "/contact" }}
 *   media={{ type: "image", src: "/hero-assets/video-preview.png" }}
 * />
 */
export default Hero;

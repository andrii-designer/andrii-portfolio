"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type HeroMedia = {
  type: "image" | "video";
  src: string;
};

export type HeroProps = {
  title: string;
  subtitle?: string;
  cta?: { text: string; href: string };
  media?: HeroMedia;
};

const Hero = ({ title, subtitle, cta, media }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {
        initial: false,
        animate: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
      };

  return (
    <motion.section
      {...motionProps}
      role="banner"
      className="bg-base text-accent font-base mx-auto flex max-w-[1200px] flex-col gap-24 px-16 py-80 md:flex-row md:items-center md:gap-40 md:py-96 lg:py-128"
      aria-label="Home hero"
    >
      <div className="flex-1 space-y-24">
        <h1 className="text-display-2 leading-[var(--token-leading-110)] md:text-display-1">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-[40rem] text-body-lg leading-[var(--token-leading-160)]">
            {subtitle}
          </p>
        ) : null}
        {cta ? (
          <a
            href={cta.href}
            className="inline-flex items-center justify-center rounded-full bg-accent px-24 py-16 text-label-md font-semibold text-base hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            aria-label={cta.text}
          >
            {cta.text}
          </a>
        ) : null}
      </div>

      {media ? (
        <div className="mt-32 flex-1 md:mt-0">
          {media.type === "image" ? (
            <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-primary">
              <Image
                src={media.src}
                alt=""
                fill
                sizes="(min-width: 1440px) 560px, (min-width: 1024px) 50vw, (min-width: 768px) 45vw, 100vw"
                loading="lazy"
              />
            </figure>
          ) : (
            <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-primary">
              <video
                src={media.src}
                className="h-full w-full object-cover"
                muted
                autoPlay
                loop
                playsInline
              />
            </figure>
          )}
        </div>
      ) : null}
    </motion.section>
  );
};

/**
 * Example usage:
 *
 * <Hero
 *   title="Product Designer & Frontend Engineer"
 *   subtitle="Building delightful web experiences that balance aesthetics, accessibility, and performance."
 *   cta={{ text: "View projects", href: "/projects" }}
 *   media={{ type: "image", src: "/globe.svg" }}
 * />
 */
export default Hero;


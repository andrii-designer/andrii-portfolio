"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type CaseStudyFullImageProps = {
  image: string;
  alt?: string;
};

export default function CaseStudyFullImage({
  image,
  alt = "Case study visual",
}: CaseStudyFullImageProps) {
  const prefersReducedMotion = useReducedMotion();

  const imageMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as const,
        },
      };

  return (
    <section
      className="case-study-full-image section-wrap"
      aria-label={alt}
    >
      <div className="case-study-full-image__inner">
        <motion.div {...imageMotion}>
          <Image
            src={image}
            alt={alt}
            width={1600}
            height={900}
            quality={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

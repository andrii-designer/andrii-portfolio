"use client";

import Title from "@/components/Title";
import { imageSizes } from "@/lib/imageSizes";
import OptimizedImage from "@/components/OptimizedImage";

export default function AboutDescription() {
  return (
    <section className="section-wrap" aria-label="About description">
      <div
        className="section-inner about-description-wrapper"
        style={{
          paddingLeft: "var(--token-space-24)",
          paddingRight: "var(--token-space-24)",
          paddingTop: "var(--token-space-24)",
          paddingBottom: "var(--token-space-192)",
        }}
      >
        <Title heading="About me" />

        {/* content container placed below with exact gap 256px */}
        <div
          className="about-content flex flex-col justify-start min-[601px]:flex-row min-[601px]:justify-between"
          style={{
            marginTop: "var(--token-space-256)",
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--token-space-24)",
          }}
        >
          <div
            className="about-text"
            style={{
              flex: "1 1 auto",
              minWidth: 0,
              width: "566px",
              maxWidth: "566px",
              display: "flex",
              flexDirection: "column",
              gap: "var(--token-space-24)",
              fontFamily: "var(--token-font-family-base)",
              fontSize: "var(--token-size-h5)",
              fontWeight: 600,
              lineHeight: "var(--token-leading-150)",
              color: "var(--token-color-accent)",
            }}
          >
            <p style={{ margin: 0 }}>
              Hey, I’m Andrii, a designer focused on visual design and motion
              for products. I started out exploring HTML, CSS and JavaScript,
              but soon realised that design is where I found my voice. That
              technical background still shapes how I work today and helps me
              create visuals and interactions that are expressive while
              remaining practical to build.
            </p>
            <p style={{ margin: 0 }}>
              8 years designing for digital products, combining technical
              fluency with motion-first visual strategy.
            </p>
          </div>

          <OptimizedImage
            src="/assets/images/about/my-photo.png"
            alt="Andrii's portrait"
            fill
            quality={85}
            sizes={imageSizes.aboutPhoto}
            className="object-cover"
            style={{ borderRadius: 0 }}
            loading="lazy"
            wrapperClassName="about-photo rounded-none"
            wrapperStyle={{
              aspectRatio: "3 / 4",
              width: "min(600px, 40%)",
              maxWidth: "600px",
              borderRadius: 0,
              flex: "0 0 auto",
            }}
          />
        </div>
      </div>
    </section>
  );
}


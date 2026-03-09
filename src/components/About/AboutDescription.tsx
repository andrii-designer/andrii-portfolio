"use client";

import Image from "next/image";
import Title from "@/components/Title";

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
        <Title index="( 006 )" label="about" heading="About me" />

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
              Hey there, I’m Andrii, a UX/UI designer from Ukraine. I started my
              journey messing around with code (HTML, CSS, JS), but I quickly
              figured out that my real passion is design.
            </p>
            <p style={{ margin: 0 }}>
              My heart belongs to crafting interfaces that feel clean, neat,
              stylish, and just work for the user, while absolutely crushing it
              for the business goals.
            </p>
          </div>

          <div
            className="about-photo relative overflow-hidden rounded-none"
            style={{
              aspectRatio: "3 / 4",
              width: "min(600px, 40%)",
              maxWidth: "600px",
              borderRadius: 0,
              flex: "0 0 auto",
            }}
          >
            <Image
              src="/assets/images/about/my-photo.png"
              alt="Andrii's portrait"
              fill
              quality={100}
              sizes="(max-width: 767px) 100vw, (max-width: 1440px) 40vw, 684px"
              className="object-cover"
              style={{ borderRadius: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


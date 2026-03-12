"use client";

import Title from "@/components/Title";
import { BookCallButton } from "@/components/Button";
import LazyVimeo from "@/components/media/LazyVimeo";

const FALLBACK_MESSAGE = "Get your project moving and start seeing results!";
const SHOWREEL_URL =
  "https://player.vimeo.com/video/1173027362?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0&quality=360p&preload=auto";

export type BookCallProps = {
  id?: string;
};

export default function BookCall({ id }: BookCallProps) {
  return (
    <section
      id={id}
      className="section-wrap book-call-section"
      aria-labelledby="book-call-title"
      style={{ backgroundColor: "var(--token-color-primary)" }}
    >
      <div
        className="section-inner bookcall-wrapper"
        style={{
          paddingTop: "var(--token-space-24)",
          paddingBottom: "var(--token-space-24)",
        }}
      >
        {/* Desktop layout — hidden on mobile/tablet via CSS */}
        <div
          className="bookcall-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            width: "100%",
            gap: "var(--token-space-128)",
          }}
        >
          {/* Text + CTA column (top) */}
          <div
            className="bookcall-text"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "var(--token-space-80)",
            }}
          >
            <Title
              index="( 005 )"
              label="book a call"
              heading="Book a call"
              headingId="book-call-title"
            />

            <h4
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-body-lg)", // Paragraph - Large token
                fontWeight: "var(--token-weight-semibold)",
                lineHeight: "var(--token-leading-150)",
                color: "var(--token-color-accent)",
                margin: 0,
              }}
            >
              {FALLBACK_MESSAGE}
            </h4>

            <div>
              <BookCallButton href="/contact" />
            </div>
          </div>

          {/* Illustration column (bottom, right-aligned) — uses same video sizing/scaling as Hero media */}
          <div
            className="bookcall-illustration-col"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              alignSelf: "flex-end",
              margin: 0,
              padding: 0,
              flexShrink: 1,
              minWidth: 0,
            }}
          >
            <div className="w-full shrink-0 rounded-none aspect-[330/220] md:w-[330px] md:h-[220px] md:aspect-auto">
              <LazyVimeo
                poster="/assets/images/thumbs/showreel2026-thumb.webp"
                iframeSrc={SHOWREEL_URL}
                aspectPadding="56.25%"
                ariaLabel="Showreel"
                playOnVisible
                insertImmediately
                iframeLoading="eager"
              />
            </div>
          </div>
        </div>

        {/* Mobile & tablet layout — shown at max-width: 1023px via CSS */}
        <div className="bookcall-mobile-layout" aria-hidden="false">
          {/* Title above paragraph on mobile/tablet */}
          <Title
            index="( 005 )"
            label="book a call"
            heading="Book a call"
          />
          {/* Paragraph below Title on mobile/tablet */}
          <p className="book-call-subhead">{FALLBACK_MESSAGE}</p>

          <div className="book-call-illustration">
            <LazyVimeo
              poster="/assets/images/thumbs/showreel2026-thumb.webp"
              iframeSrc={SHOWREEL_URL}
              aspectPadding="56.25%"
              ariaLabel="Showreel"
              playOnVisible
              insertImmediately
              iframeLoading="eager"
            />
          </div>

          <div className="book-call-cta">
            <BookCallButton />
          </div>
        </div>
      </div>
    </section>
  );
}

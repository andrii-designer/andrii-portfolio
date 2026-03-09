"use client";

import Title from "@/components/Title";
import { BookCallButton } from "@/components/Button";

const ILLUSTRATION_SRC = "/assets/images/book%20a%20call/illustration.svg";
const FALLBACK_MESSAGE = "Get your project moving and start seeing results!";

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
          paddingBottom: "var(--token-space-192)",
        }}
      >
        {/* Desktop layout — hidden on mobile/tablet via CSS */}
        <div
          className="bookcall-content"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            gap: "128px",
          }}
        >
          {/* Illustration column */}
          <div
            className="bookcall-illustration-col"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              margin: 0,
              padding: 0,
              flexShrink: 1,
              minWidth: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="bookcall-illustration"
              src={ILLUSTRATION_SRC}
              alt="Book a call illustration"
              style={{
                height: "420px",
                width: "auto",
                maxWidth: "550px",
                objectFit: "contain",
                objectPosition: "left top",
                borderRadius: 0,
                display: "block",
                margin: 0,
                padding: 0,
              }}
            />
          </div>

          {/* Text + CTA column */}
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
                fontSize: "var(--token-size-h4)",
                fontWeight: "var(--token-weight-semibold)",
                lineHeight: "var(--token-leading-120)",
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ILLUSTRATION_SRC}
              alt="Book a call illustration"
              style={{
                width: "100%",
                maxWidth: "550px",
                height: "auto",
                display: "block",
              }}
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

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
    <section id={id} className="section-wrap">
      <div
        className="section-inner bookcall-wrapper"
        style={{
          paddingLeft: "var(--token-space-24)",
          paddingRight: "var(--token-space-24)",
          paddingTop: "var(--token-space-24)",
          paddingBottom: "var(--token-space-192)",
        }}
      >
        <Title index="( 005 )" label="book a call" heading="Book a call" />

        <div
          className="bookcall-content"
          style={{
            marginTop: "var(--token-space-256)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
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
                maxWidth: "100%",
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
              width: "566px",
              maxWidth: "566px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              minHeight: "420px",
              flexShrink: 0,
            }}
          >
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

        <style jsx>{`
          @media (max-width: 768px) {
            .bookcall-content {
              flex-direction: column !important;
              gap: var(--token-space-48) !important;
            }
            .bookcall-illustration {
              height: min(420px, 60vh) !important;
              width: 100% !important;
            }
            .bookcall-text {
              width: 100% !important;
              max-width: 100% !important;
              min-height: auto !important;
              gap: var(--token-space-24);
            }
          }
        `}</style>
      </div>
    </section>
  );
}

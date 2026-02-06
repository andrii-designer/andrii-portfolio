"use client";

import type React from "react";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export type BookCallButtonVariant = "primary" | "secondary";

export type BookCallButtonProps = {
  label?: string;
  href?: string;
  onClick?: () => void;
  variant?: BookCallButtonVariant;
  ariaLabel?: string;
  className?: string;
};

const ArrowIcon = () => {
  return (
    <svg
      width="21"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{
        width: "var(--token-space-16)",
        height: "var(--token-space-16)",
        color: "var(--token-color-accent)",
      }}
    >
      <path
        d="M1.22425e-07 7.73365L16.275 7.73365L10.4826 1.7907L12.228 9.0275e-07L21 9L12.228 18L10.4826 16.2093L16.275 10.2664L9.22228e-08 10.2664L1.22425e-07 7.73365Z"
        fill="currentColor"
      />
    </svg>
  );
};

/**
 * BookCallButton
 *
 * Opens Cal.com embed popup on click. Uses @calcom/embed-react;
 * Cal.com attaches to the button via data-cal-link attributes.
 *
 * Usage:
 *  - <BookCallButton />
 *  - <BookCallButton variant="secondary" label="Let's talk" />
 */
export default function BookCallButton({
  label = "Book a call",
  variant = "primary",
  ariaLabel,
  className,
  href: _href,
  onClick: _onClick,
}: BookCallButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#D2D2D6" },
          dark: { "cal-brand": "#D2D2D6" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "fit-content",
    gap: "var(--token-space-32)",
    paddingTop: "var(--token-space-12)",
    paddingBottom: "var(--token-space-12)",
    fontFamily: "var(--token-font-family-base)",
    fontSize: "var(--token-size-h5)",
    fontWeight: "var(--token-weight-semibold)",
    lineHeight: "var(--token-leading-140)",
    letterSpacing: "-0.5px",
    color: "var(--token-color-accent)",
  };

  const variantStyle: React.CSSProperties =
    variant === "primary"
      ? {}
      : {
          opacity: 0.85,
        };

  const content = (
    <>
      <span className="flex items-center" style={{ gap: "var(--token-space-24)" }}>
        {variant === "primary" && (
          <span
            aria-hidden="true"
            style={{
              width: "var(--token-space-24)",
              height: "var(--token-space-24)",
              borderRadius: 9999,
              background: "var(--token-color-accent)",
              flexShrink: 0,
            }}
          />
        )}
        <span>{label}</span>
      </span>
      <span className="flex items-center justify-center">
        <ArrowIcon />
      </span>
    </>
  );

  const resolvedAriaLabel =
    ariaLabel ?? "Book a call (opens Cal.com)";

  return (
    <a
      href="javascript:void(0)"
      data-cal-namespace="15min"
      data-cal-link="andrii-vynarchyk/15min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      aria-label={resolvedAriaLabel}
      className={
        `group transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 ` +
        `focus-visible:ring-accent focus-visible:ring-offset-2 ${className ?? ""}`
      }
      style={{ ...baseStyle, ...variantStyle }}
    >
      {content}
    </a>
  );
}

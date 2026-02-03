import type React from "react";
import Link from "next/link";

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
 * Usage:
 *  - <BookCallButton href="/contact" />
 *  - <BookCallButton onClick={() => {}} variant="secondary" label="Let’s talk" />
 */
export default function BookCallButton({
  label = "Book a call",
  href,
  onClick,
  variant = "primary",
  ariaLabel,
  className,
}: BookCallButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "fit-content",
    gap: "var(--token-space-32)", // gap between left block and arrow
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

  const commonProps = {
    "aria-label": ariaLabel || label,
    className:
      `group transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 ` +
      `focus-visible:ring-accent focus-visible:ring-offset-2 ${className || ""}`,
    style: { ...baseStyle, ...variantStyle },
  };

  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
}

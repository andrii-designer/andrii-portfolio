"use client";

import type React from "react";
import { useCallback, useEffect, useRef } from "react";

const CALENDLY_URL =
  "https://calendly.com/andriyvynar/30min?primary_color=000000";
const CALENDLY_CSS_HREF =
  "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

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

function ensureCalendlyLoaded(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();

  const existingCss = document.querySelector(
    `link[href="${CALENDLY_CSS_HREF}"]`
  );
  if (!existingCss) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_CSS_HREF;
    document.head.appendChild(link);
  }

  const existingScript = document.querySelector(
    `script[src="${CALENDLY_SCRIPT_SRC}"]`
  );
  if (existingScript) {
    if (typeof (window as unknown as { Calendly?: unknown }).Calendly !== "undefined") {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const onLoad = (): void => {
        if (typeof (window as unknown as { Calendly?: unknown }).Calendly !== "undefined") {
          resolve();
        } else {
          const check = (): void => {
            if (typeof (window as unknown as { Calendly?: unknown }).Calendly !== "undefined") {
              resolve();
            } else {
              requestAnimationFrame(check);
            }
          };
          requestAnimationFrame(check);
        }
      };
      existingScript.addEventListener("load", onLoad, { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = (): void => {
      const check = (): void => {
        if (typeof (window as unknown as { Calendly?: unknown }).Calendly !== "undefined") {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    };
    script.onerror = (): void => reject(new Error("Calendly script failed to load"));
    document.body.appendChild(script);
  });
}

function openCalendlyPopup(): void {
  const Calendly = (window as unknown as { Calendly?: { initPopupWidget: (opts: { url: string }) => void } }).Calendly;
  if (Calendly?.initPopupWidget) {
    Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, "_blank", "noopener noreferrer");
  }
}

/**
 * BookCallButton
 *
 * Opens Calendly popup on click. Injects Calendly CSS/JS once on mount.
 * Fallback: opens Calendly page in new tab if widget fails.
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
  const loadPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (loadPromiseRef.current == null) {
      loadPromiseRef.current = ensureCalendlyLoaded();
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (typeof window === "undefined") return;
      ensureCalendlyLoaded()
        .then(() => {
          openCalendlyPopup();
        })
        .catch(() => {
          window.open(CALENDLY_URL, "_blank", "noopener noreferrer");
        });
    },
    []
  );

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
    ariaLabel ?? "Book a call (opens Calendly)";

  return (
    <a
      href={CALENDLY_URL}
      onClick={handleClick}
      aria-label={resolvedAriaLabel}
      className={
        `group transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 ` +
        `focus-visible:ring-accent focus-visible:ring-offset-2 ${className ?? ""}`
      }
      style={{ ...baseStyle, ...variantStyle }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}

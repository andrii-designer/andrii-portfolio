"use client";

import { useState, useCallback, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import OptimizedImage from "@/components/media/OptimizedImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookCallButton from "@/components/Button/BookCallButton";

/**
 * Footer — Site footer with email, copy icon, navigation links, logo, and copyright
 *
 * Layout specs (from Figma):
 * - Section wrapper: .section-wrap + .section-inner pattern
 * - Top padding: 128px (--token-space-128)
 * - Side paddings: 24px (--token-space-24)
 * - Bottom padding: 24px (--token-space-24)
 *
 * Content structure:
 * - Top left: Email (h4) + copy icon (32px gap), Book a call button (48px below email)
 * - Top right: Two link columns (128px gap between columns)
 * - Bottom left: Copyright (paragraphs-xs-semibold)
 * - Bottom right: Logo (150px height)
 *
 * Tokens used:
 * - Typography: --token-size-h4 (email), --token-size-h5 (links), --token-size-body-sm (copyright)
 * - Spacing: --token-space-24, --token-space-32, --token-space-48, --token-space-128
 * - Colors: --token-color-accent, --token-color-base
 *
 * @example
 * <Footer />
 */

export type FooterProps = {
  className?: string;
};

/** Navigation link columns data */
const internalLinks = [
  { label: "Work", href: "/#works" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/andrew-vynarchyk/" },
  { label: "Instagram", href: "https://www.instagram.com/vynar.design/" },
  { label: "Behance", href: "https://www.behance.net/andriyvynarchyk" },
  { label: "Dribbble", href: "https://dribbble.com/vynarchyck" },
];

/** Copy icon SVG component matching the project asset */
const CopyIcon = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M3 3H27V27H3V3Z" fill="var(--token-color-primary)" />
    <path
      d="M27 3H3V27H27V3ZM30 30H0V0H30V30Z"
      fill="var(--token-color-accent)"
    />
    <path d="M11 11H35V35H11V11Z" fill="var(--token-color-primary)" />
    <path
      d="M35 11H11V35H35V11ZM38 38H8V8H38V38Z"
      fill="var(--token-color-accent)"
    />
  </svg>
);

const TOOLTIP_GAP = 8;

export default function Footer({ className = "" }: FooterProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties | null>(null);
  const emailRowRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const email = "andriyvynar@gmail.com";

  // Position tooltip when shown: mobile = centered above email; desktop = right of copy icon
  useLayoutEffect(() => {
    if (copyStatus !== "copied") {
      setTooltipStyle(null);
      return;
    }
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth <= 767;
    if (isMobile && emailRowRef.current) {
      const rect = emailRowRef.current.getBoundingClientRect();
      setTooltipStyle({
        position: "fixed",
        left: rect.left + rect.width / 2,
        top: rect.top - TOOLTIP_GAP,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
      });
    } else if (!isMobile && copyBtnRef.current) {
      const rect = copyBtnRef.current.getBoundingClientRect();
      setTooltipStyle({
        position: "fixed",
        left: rect.right + 16,
        top: rect.top + rect.height / 2,
        transform: "translateY(-50%)",
        zIndex: 9999,
      });
    } else {
      setTooltipStyle(null);
    }
  }, [copyStatus]);

  /**
   * Copy email to clipboard with progressive enhancement
   * - Uses Clipboard API when available
   * - Falls back to execCommand for older browsers
   * - Provides accessible status feedback via aria-live
   */
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split("#")[1];
      if (!hash || !isHomePage) return;
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${hash}`);
      }
    },
    [isHomePage]
  );

  const handleCopyEmail = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopyStatus("copied");
      // Reset status after 0.8 seconds
      setTimeout(() => setCopyStatus("idle"), 800);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }, [email]);

  return (
    <footer className={`section-wrap ${className}`} role="contentinfo">
      <div
        className="section-inner footer-wrapper"
        style={{
          paddingTop: "var(--token-space-128)",
          paddingBottom: "var(--token-space-24)",
          backgroundColor: "var(--token-color-primary)",
        }}
      >
        {/* Main footer content area */}
        <div
          className="footer-content"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--token-space-48)",
          }}
        >
          {/* Top row: Email/Button on left, Links on right */}
          <div
            className="footer-top"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "var(--token-space-48)",
            }}
          >
            {/* Left column: Email + Copy icon + Button */}
            <div
              className="footer-contact"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--token-space-48)",
              }}
            >
              {/* Email row with copy icon */}
              <div
                ref={emailRowRef}
                className="footer-email-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--token-space-32)",
                }}
              >
                <span
                  className="footer-email text-accent"
                  style={{
                    fontFamily: "var(--token-font-family-base)",
                    fontSize: "var(--token-size-h4)",
                    fontWeight: "var(--token-weight-semibold)",
                    lineHeight: "var(--token-leading-110)",
                    letterSpacing: "-1px",
                  }}
                >
                  {email}
                </span>
                <button
                  ref={copyBtnRef}
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email"
                  className="footer-copy-btn focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "opacity 0.16s ease",
                  }}
                >
                  <CopyIcon />
                </button>

                {/* Tooltip rendered via portal when positioned (avoids overflow clipping on mobile) */}
              </div>
              {tooltipStyle &&
                typeof document !== "undefined" &&
                createPortal(
                  <span
                    className="footer-copy-tooltip"
                    style={{
                      ...tooltipStyle,
                      fontFamily: "var(--token-font-family-base)",
                      fontSize: "var(--token-size-body-xs)",
                      fontWeight: "var(--token-weight-semibold)",
                      lineHeight: "var(--token-leading-140)",
                      color: "var(--token-color-base)",
                      backgroundColor: "var(--token-color-accent)",
                      paddingLeft: "var(--token-space-16)",
                      paddingRight: "var(--token-space-16)",
                      paddingTop: "var(--token-space-8)",
                      paddingBottom: "var(--token-space-8)",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                    }}
                  >
                    Email copied
                  </span>,
                  document.body
                )}

              {/* Accessible status announcement */}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                {copyStatus === "copied" ? "Email copied to clipboard" : ""}
              </div>

              {/* Book a call button */}
              <BookCallButton href="/contact" />
            </div>

            {/* Right column: Navigation link columns */}
            <nav
              className="footer-nav"
              aria-label="Footer navigation"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "var(--token-space-128)",
              }}
            >
              {/* Internal links column */}
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--token-space-16)",
                }}
              >
                {internalLinks.map((link) => {
                  const isAnchor = link.href.includes("#");
                  return (
                    <li key={link.href}>
                      {isAnchor ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="text-link-h5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-link-h5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Social links column */}
              <ul
                className="footer-social-col"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--token-space-16)",
                }}
              >
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link-h5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom row: Copyright on left, Logo on right */}
          <div
            className="footer-bottom"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "var(--token-space-24)",
              marginTop: "var(--token-space-256)",
            }}
          >
            {/* Copyright text */}
            <p
              className="footer-copyright text-accent"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-body-sm)",
                fontWeight: "var(--token-weight-semibold)",
                lineHeight: "var(--token-leading-140)",
                margin: 0,
              }}
            >
              Copyright © 2025 Andrii Vynarchyk. All Rights Reserved.
            </p>

            {/* Logo */}
            <Link
              href="/"
              aria-label="Go to home page"
              className="footer-logo focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <OptimizedImage
                src="/hero-assets/logo.svg"
                alt="Andrii Vynarchyk logo"
                width={160}
                height={160}
                priority={false}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for hover states */}
      <style jsx>{`
        .footer-copy-btn:hover {
          opacity: 0.7;
        }
      `}</style>
    </footer>
  );
}

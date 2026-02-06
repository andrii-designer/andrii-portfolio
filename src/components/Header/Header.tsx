"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Fragment, useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import useHeaderSolidObserver from "@/hooks/useHeaderSolidObserver";

/**
 * Header — Figma node-id: 2228:4741
 * 
 * Layout specs:
 * - Height: 70px
 * - Uses .section-wrap (full-bleed) + .section-inner (24px side padding)
 * - Flex layout: justify-content: space-between, align-items: flex-start
 * - Logo aligned to top
 * - Nav items top-aligned with logo
 * 
 * Nav item padding:
 * - Base: 12px left/right (--token-space-12)
 * - First item: no left padding
 * - Last item: no right padding
 * 
 * Navigation behavior:
 * - Work → scrolls to #works section (on home page) or navigates to /#works
 * - Services → scrolls to #services section (on home page) or navigates to /#services
 * - About → navigates to /about page
 * - Book a call → opens Cal.com booking popup (same as Book a call button)
 * 
 * Tokens used:
 * - Colors: --token-color-accent (#060606)
 * - Typography: --token-font-family-base, --token-size-label-md, --token-size-label-sm
 * - Typography: --token-weight-semibold, --token-leading-115
 * - Spacing: --token-space-8, --token-space-12, --token-space-16, --token-space-24
 */

export type NavLink = {
  label: string;
  href: string;
  /** If true, this is an anchor link that should smooth scroll on the home page */
  isAnchor?: boolean;
  /** If true, clicking opens the Cal.com booking popup instead of navigating */
  openCalPopup?: boolean;
};

export type HeaderProps = {
  links?: NavLink[];
  className?: string;
};

const defaultNavLinks: NavLink[] = [
  { label: "Work", href: "/#works", isAnchor: true },
  { label: "Services", href: "/#services", isAnchor: true },
  { label: "About", href: "/about", isAnchor: false },
  { label: "Book a call", href: "/#book-a-call", isAnchor: true, openCalPopup: true },
];

export default function Header({ links = defaultNavLinks, className }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isSolid = useHeaderSolidObserver(headerRef);

  const DOT_SIZE = "var(--token-space-12)"; // 12px
  const DOT_TOTAL_SPACE = "var(--token-space-8)"; // 8px gap after dot
  const SHIFT_LEFT = "calc(-1 * (var(--token-space-12) + var(--token-space-8)))"; // Shift left by 20px (dot + gap)

  /**
   * Handle smooth scroll for anchor links when on home page.
   * If not on home page, navigation to /#section will be handled by Next.js router.
   */
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean, openCalPopup?: boolean) => {
      if (openCalPopup) {
        e.preventDefault();
        return;
      }
      if (!isAnchor) return; // Let normal links navigate

      const hash = href.split("#")[1];
      if (!hash) return;

      if (isHomePage) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update URL hash without scrolling (already handled)
          window.history.pushState(null, "", `#${hash}`);
        }
      }
      // If not on home page, let Next.js handle navigation to /#hash
    },
    [isHomePage]
  );

  return (
    <header
      ref={headerRef}
      className={`section-wrap site-header ${isSolid ? "header--solid" : ""} ${className || ""}`}
      style={{
        height: "70px",
        paddingTop: "var(--token-space-16)",
      }}
    >
      <div
        className="section-inner header-inner flex justify-between items-start"
        style={{ height: "100%" }}
      >
        {/* Left: Logo — aligned to top */}
        <Link href="/" aria-label="Home" tabIndex={0}>
          <Image
            src="/hero-assets/logo.svg"
            alt="Andrii Vynarchyk logo"
            width={69}
            height={70}
            priority
            style={{ borderRadius: 0 }}
          />
        </Link>

        {/* Right: Nav + Avatar block */}
        <div className="flex items-center" style={{ gap: "var(--token-space-24)" }}>
          <nav aria-label="Primary">
            <ul className="flex items-center" style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {links.map((item, index) => (
                <Fragment key={item.label}>
                  <li
                    className="header-nav-link flex items-center"
                    style={{
                      paddingLeft: index === 0 ? 0 : "var(--token-space-8)",
                      paddingRight: index === links.length - 1 ? 0 : "var(--token-space-8)",
                      transform:
                        activeNavIndex !== null && index < activeNavIndex
                          ? `translateX(${SHIFT_LEFT})`
                          : "translateX(0)",
                      transition: "transform 0.16s ease",
                      willChange: "transform",
                    }}
                  >
                    <Link
                      href={item.openCalPopup ? "javascript:void(0)" : item.href}
                      onClick={(e) => handleAnchorClick(e, item.href, item.isAnchor, item.openCalPopup)}
                      onMouseEnter={() => setActiveNavIndex(index)}
                      onMouseLeave={() => setActiveNavIndex(null)}
                      onFocus={() => setActiveNavIndex(index)}
                      onBlur={() => setActiveNavIndex(null)}
                      {...(item.openCalPopup && {
                        "data-cal-namespace": "15min",
                        "data-cal-link": "andrii-vynarchyk/15min",
                        "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
                      })}
                      className="text-accent uppercase transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 inline-flex items-center"
                      style={{
                        fontFamily: "var(--token-font-family-base)",
                        fontSize: "var(--token-size-label-md)",
                        fontWeight: "var(--token-weight-semibold)",
                        lineHeight: "var(--token-leading-115)",
                        transition: "opacity 0.16s ease",
                      }}
                      tabIndex={0}
                    >
                      {/* Dot — positioned with negative margin to stay within padding */}
                      <span
                        aria-hidden="true"
                        style={{
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                          display: "inline-block",
                          flexShrink: 0,
                          marginLeft: activeNavIndex === index ? "calc(-1 * var(--token-space-12))" : 0,
                          marginRight: activeNavIndex === index ? DOT_TOTAL_SPACE : 0,
                          transition: "margin-left 0.16s ease, margin-right 0.16s ease",
                          willChange: "margin-left, margin-right",
                        }}
                      >
                        {/* Dot that scales from 0 to 1 (grows from center) */}
                        <span
                          aria-hidden="true"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: 9999,
                            background: "currentColor",
                            transform: activeNavIndex === index ? "scale(1)" : "scale(0)",
                            transition: "transform 0.16s ease",
                            willChange: "transform",
                          }}
                        />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>

                  {index !== links.length - 1 && (
                    <li
                      className="header-nav-divider flex items-center text-accent"
                      aria-hidden="true"
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        fontFamily: "var(--token-font-family-base)",
                        fontSize: "var(--token-size-label-md)",
                        fontWeight: "var(--token-weight-semibold)",
                        lineHeight: "var(--token-leading-115)",
                        transform:
                          activeNavIndex !== null && index < activeNavIndex
                            ? `translateX(${SHIFT_LEFT})`
                            : "translateX(0)",
                        transition: "transform 0.16s ease",
                        willChange: "transform",
                      }}
                    >
                      /
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </nav>

          <div
            className="header-avatar flex"
            style={{
              height: "24px",
              alignItems: "center",
              gap: "var(--token-space-16)",
            }}
          >
            <Image
              src="/hero-assets/avatar.png"
              alt="Avatar of Andrii Vynarchyk"
              width={24}
              height={24}
              priority
              style={{
                borderRadius: "9999px",
                width: "24px",
                height: "24px",
                objectFit: "cover",
              }}
            />
            <span
              className="text-accent uppercase"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-label-md)",
                fontWeight: "var(--token-weight-semibold)",
                lineHeight: "var(--token-leading-115)",
              }}
            >
              Hi, I’m Andrii Vynarchyk
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

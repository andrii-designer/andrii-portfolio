"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Header — Figma node-id: 2228:4741
 * 
 * Layout specs:
 * - Height: 70px
 * - Uses .section-wrap (max-width: 1440px, centered) + .section-inner (24px padding)
 * - Flex layout: justify-content: space-between, align-items: flex-start
 * - Logo aligned to top
 * - Nav items top-aligned with logo
 * 
 * Nav item padding:
 * - Base: 12px left/right (--token-space-12)
 * - First item: no left padding
 * - Last item: no right padding
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
};

export type HeaderProps = {
  links?: NavLink[];
  className?: string;
};

const defaultNavLinks: NavLink[] = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Book a call", href: "/contact" },
];

export default function Header({ links = defaultNavLinks, className }: HeaderProps) {
  return (
    <header
      className={`section-wrap ${className || ""}`}
      role="banner"
      style={{
        height: "70px",
        paddingTop: "var(--token-space-16)",
      }}
    >
      <div
        className="section-inner flex items-start justify-between"
        style={{ height: "100%" }}
      >
        {/* Logo — aligned to top (flex-start) */}
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

        {/* Navigation — Primary */}
        <nav aria-label="Primary">
          <ul className="flex items-start" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {links.map((item, index) => (
              <li
                key={item.label}
                className="nav-item flex items-center"
                style={{
                  paddingLeft: index === 0 ? 0 : "var(--token-space-12)",
                  paddingRight: index === links.length - 1 ? 0 : "var(--token-space-12)",
                }}
              >
                {index > 0 && (
                  <span
                    className="text-accent"
                    style={{
                      fontFamily: "var(--token-font-family-base)",
                      fontSize: "var(--token-size-label-md)",
                      fontWeight: "var(--token-weight-semibold)",
                      lineHeight: "var(--token-leading-115)",
                      paddingRight: "var(--token-space-12)",
                    }}
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
                <Link
                  href={item.href}
                  className="text-accent uppercase transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  style={{
                    fontFamily: "var(--token-font-family-base)",
                    fontSize: "var(--token-size-label-md)",
                    fontWeight: "var(--token-weight-semibold)",
                    lineHeight: "var(--token-leading-115)",
                  }}
                  tabIndex={0}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

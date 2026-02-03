"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Header — Figma node-id: 2228:4741
 * Tokens used:
 * - Colors: --token-color-accent (#060606)
 * - Typography: --token-font-family-base, --token-size-label-md, --token-size-label-sm, --token-weight-semibold, --token-leading-115
 * - Spacing: --token-space-8, --token-space-12, --token-space-16, --token-space-24
 */

export type HeaderProps = {
  className?: string;
};

const navItems = [
  { label: "Work", href: "/projects", active: true },
  { label: "Services", href: "/services", active: false },
  { label: "About", href: "/about", active: false },
  { label: "Book a call", href: "/contact", active: false },
];

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={`flex w-full items-start justify-between ${className || ""}`}
      role="banner"
    >
      {/* Logo */}
      <Link href="/" aria-label="Home">
        <Image
          src="/hero-assets/logo.svg"
          alt="Andrii Vynarchyk logo"
          width={69}
          height={70}
          priority
        />
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-24" aria-label="Main navigation">
        {/* Main nav items */}
        <ul className="flex items-center">
          {navItems.map((item, index) => (
            <li key={item.label} className="flex items-center">
              {index > 0 && (
                <span
                  className="px-0 text-accent text-label-md font-semibold leading-115"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              <Link
                href={item.href}
                className={`flex items-center gap-8 px-[12px] text-accent text-label-md font-semibold leading-115 uppercase hover:opacity-70 transition-opacity ${
                  index === 0 ? "pl-0 pr-[12px]" : ""
                } ${index === navItems.length - 1 ? "pr-0 pl-[12px]" : ""}`}
              >
                {item.active && (
                  <span className="size-[12px] rounded-full bg-accent" aria-hidden="true" />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar section */}
        <div className="flex items-center gap-16">
          <div className="relative size-[24px] overflow-hidden rounded-full">
            <Image
              src="/hero-assets/avatar.png"
              alt="Andrii Vynarchyk"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
          <span className="text-accent text-label-sm font-semibold leading-115 tracking-[-0.5px]">
            Hi, I&apos;m Andrii Vynarchyk
          </span>
        </div>
      </nav>
    </header>
  );
}

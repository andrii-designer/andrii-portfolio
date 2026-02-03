# Generation Report — Home Hero

## Branch

- `feature/figma-home-hero`

## Tokens used

Referenced via Tailwind classes and CSS variables:

- Colors: `--token-color-base`, `--token-color-primary`, `--token-color-accent`
- Typography: `--token-font-family-base`, `--token-size-display-1`, `--token-size-display-2`, `--token-size-body-lg`, `--token-leading-110`, `--token-leading-160`, `--token-weight-semibold`
- Spacing: `--token-space-16`, `--token-space-24`, `--token-space-32`, `--token-space-40`, `--token-space-80`, `--token-space-96`, `--token-space-128`

## Components created/modified

- **Created** `src/components/Hero/Hero.tsx`
  - Props: `title: string`, `subtitle?: string`, `cta?: { text: string; href: string }`, `media?: { type: 'image' | 'video'; src: string }`
  - Uses `framer-motion` for a subtle entry animation, disabled when `prefers-reduced-motion` is enabled.
  - Uses Tailwind classes mapped to design tokens for typography, spacing, and colors.
- **Modified** `src/app/(global)/page.tsx`
  - Wires the `Hero` component into the `/` route as the main hero section.

## Media assets

- Uses existing asset from Next.js app `public/globe.svg` as the hero media placeholder.

## Parsing warnings / fallbacks

- No additional parsing was required beyond previously extracted tokens in `src/styles/variables.css`.
- No new tokens were added; only existing `--token-*` variables are referenced.

## Pixel-perfect checklist

- Layout:
  - Two-column layout on desktop (text + media), stacked column layout on mobile.
  - Max width constrained to `1200px` with horizontal padding using spacing tokens.
- Typography:
  - Hero title uses `text-display-2` on tablet/desktop and upgrades to `text-display-1` on larger viewports.
  - Body copy uses `text-body-lg` with `--token-leading-160`.
- Spacing:
  - Vertical rhythm implemented using spacing token-based utilities (e.g. `gap-24`, `py-80`, `md:py-96`, `lg:py-128`).
- Responsiveness:
  - Layout adapts at ~`768px`, `1024px`, and `1440px` breakpoints using Tailwind’s responsive variants.
- Accessibility:
  - Hero rendered as a `section` with `role="banner"` and an `h1` for the main title.
  - CTA rendered as an accessible link/button with clear `aria-label` and focus styles.
- Motion:
  - Entry animation uses `framer-motion` and is disabled when `prefers-reduced-motion` is set.


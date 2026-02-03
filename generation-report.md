# Generation Report — Home Hero v2

## Figma Verification (Latest: 2026-02-03)

| Field | Value |
|-------|-------|
| **Figma file key** | `vAXt1S2lkI3m5GoQbJ2Fnr` |
| **Page name** | 🌎 My space |
| **Frame name** | `hero-section` |
| **Verified node-id** | `2224:4166` |
| **Frame dimensions** | **1440 × 782** |
| **Frame position** | x: 776, y: -723 |
| **Horizontal container padding** | **24px** (left and right) |
| **Vertical gaps** | header → content: **48px**, title → bottom-row: **128px** |

### Re-verification (feature/figma-home-hero-fixes branch)

| Measurement | Figma Value | Token Used | Implementation |
|-------------|-------------|------------|----------------|
| Horizontal padding | 24px | `--token-space-24` | `style={{ paddingLeft/Right: "var(--token-space-24)" }}` |
| Gap header → content | 48px | `--token-space-48` | `style={{ gap: "var(--token-space-48)" }}` |
| Gap title → bottom-row | 128px | `--token-space-128` | `style={{ gap: "var(--token-space-128)" }}` |
| Title letter-spacing | -6px | inline style | `style={{ letterSpacing: "-6px" }}` |
| CTA letter-spacing | -0.5px | inline style | `style={{ letterSpacing: "-0.5px" }}` |

### Manrope Font Loading

| Property | Value |
|----------|-------|
| **Font loader** | `next/font/google` (Manrope) |
| **Weights loaded** | 400 (regular), 600 (semibold) |
| **CSS variable** | `--font-manrope` |
| **Token variable** | `--token-font-family-base: var(--font-manrope), 'Manrope', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |

## Branch

- `feature/figma-home-hero-v2` (original)
- `feature/figma-home-hero-fixes` (current fixes branch)

## Tokens Used (exact mapping from Figma)

### Colors
| Figma Value | CSS Token | Usage |
|-------------|-----------|-------|
| `#d2d2d6` | `--token-color-primary` | Hero section background |
| `#060606` | `--token-color-accent` | All text, icons, decorative elements |

### Typography
| Figma Style | CSS Token(s) | Usage |
|-------------|--------------|-------|
| 84px / SemiBold / 1.1 / -6px | `--token-size-h1`, `--token-weight-semibold`, `--token-leading-110` | Hero title |
| 24px / SemiBold / 1.4 / -0.5px | `--token-size-h5`, `--token-weight-semibold`, `--token-leading-140` | CTA button text |
| 16px / SemiBold / 1.15 / uppercase | `--token-size-label-md`, `--token-weight-semibold`, `--token-leading-115` | Navigation items |
| 14px / SemiBold / 1.15 / -0.5px | `--token-size-label-sm`, `--token-weight-semibold`, `--token-leading-115` | Avatar caption |

### Spacing
| Figma Value | CSS Token | Usage |
|-------------|-----------|-------|
| 24px | `--token-space-24` | Container horizontal padding, gaps |
| 16px | `--token-space-16` | Container top padding, avatar gap |
| 48px | `--token-space-48` | Gap between header and content |
| 128px | `--token-space-128` | Gap between title and bottom row |
| 32px | `--token-space-32` | CTA button internal gap |
| 8px | `--token-space-8` | Nav item internal gap |
| 12px | Custom `px-[12px]` | Nav item horizontal padding |

## Components Created/Modified

### Created
- `src/components/Hero/Hero.tsx` — Main hero content component
  - Props: `title: string`, `cta?: { text: string; href: string }`, `media?: { type: 'image' | 'video'; src: string }`
  - Uses Framer Motion for entry animations (respects `prefers-reduced-motion`)
  - Responsive breakpoints: mobile (<640px), tablet (768px), desktop (1024px+)

- `src/components/Hero/index.ts` — Barrel export

### Modified
- `src/components/Header.tsx` — Updated to match Figma header design (node-id: 2228:4741)
  - Logo, navigation with active state indicator, avatar with caption
  - Typography: label-md for nav, label-sm for avatar text

- `src/app/(global)/layout.tsx` — Updated to apply:
  - `bg-primary` background color
  - Max width constraint (1440px)
  - Container padding matching Figma

- `src/app/(global)/page.tsx` — Wired Hero component with Figma content

- `src/styles/variables.css` — Added missing tokens:
  - `--token-size-label-md: 16px`
  - `--token-size-label-sm: 14px`
  - `--token-size-overline: 12px`

## Assets Exported from Figma

| Asset | Path | Figma node-id | Dimensions |
|-------|------|---------------|------------|
| Logo | `public/hero-assets/logo.svg` | 2228:4717 | 69 × 70 |
| Arrow icon | `public/hero-assets/arrow-icon.svg` | 2224:4205 | 16 × 19 |
| Avatar photo | `public/hero-assets/avatar.png` | 2228:4738 | 24 × 24 (display) |
| Video preview | `public/hero-assets/video-preview.png` | 2224:4206 | 330 × 220 |
| Avatar mask | `public/hero-assets/avatar-mask.svg` | — | — |
| Video mask | `public/hero-assets/video-mask.svg` | — | — |

## Pixel-Perfect Checklist

### Layout (Desktop 1440px)
- [x] Container max-width: 1440px
- [x] Horizontal padding: 24px
- [x] Top padding: 16px
- [x] Gap between header and content: 48px
- [x] Gap between title and bottom row: 128px
- [x] Title max-width: 920px
- [x] Video preview: 330 × 220 with rounded corners

### Typography
- [x] Hero title: 84px, semibold, line-height 1.1, letter-spacing -6px
- [x] CTA text: 24px, semibold, line-height 1.4, letter-spacing -0.5px
- [x] Nav items: 16px, semibold, line-height 1.15, uppercase
- [x] Avatar caption: 14px, semibold, line-height 1.15, letter-spacing -0.5px

### Colors
- [x] Background: #d2d2d6 (--token-color-primary)
- [x] All text: #060606 (--token-color-accent)
- [x] Decorative dots: #060606 (--token-color-accent)

### Responsive Behavior
- [x] Desktop (1440px): Two-column bottom row, 920px title width
- [x] Tablet (1024px): Title scales to h2 (64px), adjusted letter-spacing
- [x] Mobile (768px): Title scales to h3 (48px), stacked bottom row
- [x] Small (375px): Title scales to h4 (36px), full-width elements

### Accessibility
- [x] Header uses `role="banner"`
- [x] Navigation has `aria-label="Main navigation"`
- [x] Hero section has `aria-label="Hero"`
- [x] CTA has descriptive `aria-label`
- [x] Logo link has `aria-label="Home"`
- [x] Decorative elements use `aria-hidden="true"`

### Motion
- [x] Entry animations using Framer Motion
- [x] Respects `prefers-reduced-motion` media query
- [x] Staggered animation delays for visual hierarchy

## Warnings/Notes

- Avatar mask and video mask SVGs were exported but not used in the implementation due to complexity; using simple `overflow-hidden` and `border-radius` instead
- ~~Font family "Manrope" must be loaded via `next/font/google` or external stylesheet for production~~ **RESOLVED**: Manrope is now loaded via `next/font/google` with weights 400 and 600
- Video preview is currently an image; replace with actual video source when available

---

## Fixes Applied (feature/figma-home-hero-fixes)

### 1. Font Family — Manrope ✅
- Added Manrope via `next/font/google` in `src/app/layout.tsx`
- Weights: 400 (regular), 600 (semibold)
- CSS variable `--font-manrope` applied to `<html>` element
- Updated `--token-font-family-base` in `variables.css` to use the CSS variable
- Added `font-manrope` to Tailwind config `fontFamily`

### 2. Container Horizontal Padding (24px) ✅
- Updated `src/app/(global)/layout.tsx` to use exact 24px padding via `--token-space-24`
- Applied via inline style: `paddingLeft: "var(--token-space-24)"`, `paddingRight: "var(--token-space-24)"`
- Removed duplicate padding from page.tsx

### 3. Section Centering ✅
- Container wrapper uses `mx-auto` with `max-width: 1440px`
- Content is block-level centered within viewport

### 4. Vertical Gaps ✅
- Header → Content: 48px (`--token-space-48`) — in page.tsx container
- Title → Bottom-row: 128px (`--token-space-128`) — in Hero.tsx section

### 5. Typography Specifics ✅
- Title: 84px (`--token-size-h1`), semibold (`--token-weight-semibold`), line-height 1.1 (`--token-leading-110`), letter-spacing -6px (inline)
- CTA: 24px (`--token-size-h5`), semibold, line-height 1.4 (`--token-leading-140`), letter-spacing -0.5px (inline)

### 6. Assets Used ✅
| Asset | Path | Usage |
|-------|------|-------|
| Logo | `public/hero-assets/logo.svg` | Header logo |
| Arrow icon | `public/hero-assets/arrow-icon.svg` | CTA button arrow |
| Avatar | `public/hero-assets/avatar.png` | Header avatar |
| Video preview | `public/hero-assets/video-preview.png` | Hero media |

### 7. Accessibility & Motion ✅
- `role="banner"` on Header (unchanged)
- `aria-label="Hero"` on section
- `aria-label` on CTA link
- `prefers-reduced-motion` respected via `useReducedMotion()` hook

### Pixel-Perfect Checklist (Updated)

| Item | Status |
|------|--------|
| Container max-width 1440px | ✅ Pass |
| Horizontal padding 24px (via token) | ✅ Pass |
| Top padding 16px (via token) | ✅ Pass |
| Gap header → content 48px (via token) | ✅ Pass |
| Gap title → bottom-row 128px (via token) | ✅ Pass |
| Manrope font loaded (weights 400, 600) | ✅ Pass |
| Title letter-spacing -6px | ✅ Pass |
| CTA letter-spacing -0.5px | ✅ Pass |
| Section horizontally centered | ✅ Pass |
| Assets from public/hero-assets/ | ✅ Pass |

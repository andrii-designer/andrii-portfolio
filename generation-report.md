# Generation Report — Home Hero v2

## Figma Verification

| Field | Value |
|-------|-------|
| **Figma file key** | `vAXt1S2lkI3m5GoQbJ2Fnr` |
| **Page name** | 🌎 My space |
| **Frame name** | `hero-section` |
| **Verified node-id** | `2224:4166` |
| **Frame dimensions** | **1440 × 782** |
| **Frame position** | x: 776, y: -723 |

## Branch

- `feature/figma-home-hero-v2`

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
- Font family "Manrope" must be loaded via `next/font/google` or external stylesheet for production
- Video preview is currently an image; replace with actual video source when available

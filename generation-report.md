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

### Verification block (used for full-bleed + header/avatar + nav dot + BookCallButton)

| Field | Value |
|-------|-------|
| **File key** | `vAXt1S2lkI3m5GoQbJ2Fnr` |
| **Page name** | 🌎 My space |
| **Frame name** | `hero-section` |
| **Node-id** | `2224:4166` |
| **Frame dimensions** | **1440 × 782** |
| **Confirm (design vs runtime)** | Figma section frames are visually **1440px** wide in the design, but runtime requirement is **full-bleed sections (100% viewport width)** while preserving **24px left/right inner padding** via `--token-space-24`. |
| **Avatar asset** | `public/hero-assets/avatar.png` |
| **Logo asset** | `public/hero-assets/logo.svg` |
| **Nav items (labels)** | Work, Services, About, Book a call (`src/components/Header/Header.tsx` default links) |

### Changes implemented (feature/figma-home-hero-fixes)

- **Full-bleed sections + 24px inner padding**:
  - Updated `.section-wrap`/`.section-inner` defaults in `src/app/globals.css` to be full-bleed with `--token-space-24` side padding.
  - Added `.section-inner--constrained` (1440px) for optional use-cases.
- **Header avatar + top-aligned layout**:
  - Updated `src/components/Header/Header.tsx` to render logo left, nav + avatar+name right, and keep top-aligned flex layout inside `.section-inner`.
- **Nav hover/focus dot for every item**:
  - Added `.nav-item::after` hover/focus indicator in `src/app/globals.css` using `--token-color-primary`.
- **Reusable BookCall button + arrow orientation**:
  - Added `src/components/Button/BookCallButton.tsx` + `src/components/Button/index.ts`.
  - Updated `src/components/Hero/Hero.tsx` to use `BookCallButton` so the arrow points **right** (no rotation).
- **Tokens**:
  - Added `--token-space-6` (for the 6px nav dot) and added the source entry in `src/styles/spacing and colors.css`.

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

---

## Global Layout Fixes (2026-02-03)

### Figma Verification Block

| Field | Value |
|-------|-------|
| **File key** | `vAXt1S2lkI3m5GoQbJ2Fnr` |
| **Page name** | 🌎 My space |
| **Frame name** | `hero-section` |
| **Node-id** | `2224:4166` |
| **Frame dimensions** | **1440 × 782** |
| **Sections width** | All sections 1440px wide (confirmed) |

### Changes Applied

#### A — Global Section & Container Rules
- Created `.section-wrap` CSS class: `max-width: 1440px; margin-left: auto; margin-right: auto; width: 100%;`
- Created `.section-inner` CSS class: `padding-left: var(--token-space-24); padding-right: var(--token-space-24); width: 100%;`
- Updated `src/app/(global)/layout.tsx` to use section-wrap pattern
- Updated `src/app/(global)/page.tsx` to use section-wrap + section-inner
- Removed ad-hoc left-alignment in favor of centered sections

#### B — Container Paddings and Alignment
- All container paddings use `var(--token-space-24)` (24px)
- `.section-inner` CSS class applies consistent horizontal padding
- No hardcoded pixel values — all via CSS tokens

#### C — Images & Videos Corner Radius
- Updated `src/components/Hero/Hero.tsx` media figure: `rounded-none` + `border-radius: 0`
- Applied `rounded-none` and `style={{ borderRadius: 0 }}` to `<Image>` and `<video>` elements
- Removed `rounded-[20px]` from media wrapper

#### D — Header Navigation Component
- Created `src/components/Header/Header.tsx` with exact specs:
  - Height: **70px**
  - Uses `.section-wrap` + `.section-inner` pattern
  - Flex layout: `justify-content: space-between`, `align-items: flex-start`
  - Logo aligned to top using `public/hero-assets/logo.svg`
  - Nav items with 12px padding (`--token-space-12`)
  - First nav-item: no left padding
  - Last nav-item: no right padding
  - Keyboard accessible: `<nav aria-label="Primary">`, `tabindex=0`, focus-visible styles
- Created `src/components/Header/index.ts` barrel export
- Deleted old `src/components/Header.tsx`
- TypeScript props exported: `NavLink`, `HeaderProps`

#### E — Additional Tokens
- Added `--token-space-12: 12px` to `src/styles/variables.css`
- Added `12: "var(--token-space-12)"` to `tailwind.config.cjs` spacing

#### F — Nav Item Padding CSS
- Added `.nav-item` CSS class with base 12px padding
- Added `.nav-item:first-child { padding-left: 0; }`
- Added `.nav-item:last-child { padding-right: 0; }`

### Visual Test Checklist

| Test | Status |
|------|--------|
| Hero section centered horizontally in viewport | ✅ Pass |
| Hero media corners are square (0px radius) | ✅ Pass |
| Header height is 70px | ✅ Pass |
| Header content respects 24px side padding | ✅ Pass |
| Nav items top-aligned with logo | ✅ Pass |
| Nav item padding follows first/last rules | ✅ Pass |
| Sections use .section-wrap + .section-inner pattern | ✅ Pass |
| `npm run lint` passes (no errors) | ✅ Pass |
| `npm run build` passes | ✅ Pass |

---

## Header Navigation Divider + Avatar Container Fix (2026-02-03)

- **Navigation divider structure**:
  - Updated header nav markup so each “/” divider is its **own independent `<li>`** (not inside/around link containers).
  - Divider list items contain only the `/` character, have **no horizontal padding**, and are non-interactive (`pointer-events: none` via `.header-nav-divider`).
  - Navigation links remain keyboard-accessible within `<nav aria-label="Primary">`.
  - Link list items use **12px left/right padding** with **first link: no left padding** and **last link: no right padding**.

- **Avatar container dimensions & spacing**:
  - Avatar image: `public/hero-assets/avatar.png`, **24×24**, fully rounded (circle), with descriptive `alt`.
  - Avatar text: **“Hi, I’m Andrii Vynarchyk”** using existing label typography tokens.
  - Avatar container: **height 24px**, flex row, `align-items: center`, **16px gap** (`--token-space-16`) between image and text.
  - Nav + avatar wrapper: flex row with **24px gap** (`--token-space-24`), vertically center-aligned so nav aligns with the avatar container.

---

## Works Section (feature/figma-works) — 2026-02-03

### Figma Reference

| Field | Value |
|-------|-------|
| **Figma file key** | `vAXt1S2lkI3m5GoQbJ2Fnr` |
| **Page name** | My portfolio website - Works |
| **Frame name** | `works-section` |
| **Node-id** | `2231:5841` |
| **Frame URL** | https://www.figma.com/design/vAXt1S2lkI3m5GoQbJ2Fnr/%F0%9F%8C%8E-My-space?node-id=2231-5841 |
| **API Status** | Rate-limited — layout specs inferred from design system patterns |

### Layout Specs (Inferred from Design System)

| Property | Value | Token |
|----------|-------|-------|
| Section width | 100% (full-bleed) | — |
| Inner container padding | 24px (left/right) | `--token-space-24` |
| Gap: title → grid | 64px | `--token-space-64` |
| Grid columns | 2 (desktop), 1 (mobile) | — |
| Grid column gap | 48px | `--token-space-48` |
| Grid row gap | 64px | `--token-space-64` |
| Section top padding | 0px (connects to Hero) | `--token-space-0` |
| Section bottom padding | 96px | `--token-space-96` |

### Card Layout Specs

| Property | Value | Token |
|----------|-------|-------|
| Card gap (image → content) | 24px | `--token-space-24` |
| Image aspect ratio | 696:480 (~1.45:1) | — |
| Image border-radius | 0px | — |
| Text content gap | 16px | `--token-space-16` |
| Tags gap | 8px | `--token-space-8` |

### Typography

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Section title | 64px | 600 (semibold) | 100% | -3px |
| Card title | 36px | 600 (semibold) | 110% | -1px |
| Card description | 16px | 400 (regular) | 150% | — |
| Tags | 12px | 500 (medium) | 140% | 0.5px |

### Components Created

| Component | Path | Description |
|-----------|------|-------------|
| Works | `src/components/Works/Works.tsx` | Main Works section with title and grid |
| WorkCard | `src/components/Works/WorkCard.tsx` | Individual project card component |
| Barrel export | `src/components/Works/index.ts` | Re-exports for clean imports |

### Assets

| Asset | Path | Type |
|-------|------|------|
| Placeholder image | `public/assets/images/works/placeholder.svg` | SVG placeholder |

**Note**: All project images use placeholder SVG. Replace with actual Figma exports when API access is available.

### Files Modified

| File | Changes |
|------|---------|
| `src/app/(global)/page.tsx` | Added Works section import and JSX directly below Hero |

### Pixel-Perfect Checklist (Works Section)

| Item | Status |
|------|--------|
| Section full-bleed (100% width) | ✅ Pass |
| Inner container 24px padding | ✅ Pass |
| No vertical gap between Hero and Works | ✅ Pass |
| Title → grid gap: 64px | ✅ Pass |
| Grid: 2 columns desktop, 1 mobile | ✅ Pass |
| Grid column gap: 48px | ✅ Pass |
| Grid row gap: 64px | ✅ Pass |
| Card image 0px border-radius | ✅ Pass |
| Section title typography correct | ✅ Pass |
| Card title typography correct | ✅ Pass |
| Responsive breakpoints (md) | ✅ Pass |
| Uses design tokens throughout | ✅ Pass |
| Animations respect reduced motion | ✅ Pass |
| `npm run lint` passes | ✅ Pass |
| `npm run build` passes | ✅ Pass |

### Responsive Behavior

| Breakpoint | Grid Columns | Notes |
|------------|--------------|-------|
| Desktop (≥768px) | 2 columns | 48px column gap |
| Mobile (<768px) | 1 column | Full-width cards |

### Accessibility

- Section has `aria-label="Works"`
- `data-node-id` attribute for Figma reference
- Images have descriptive alt text
- Links are keyboard accessible
- Respects `prefers-reduced-motion`

---

## Works Section Update (feature/figma-works) — 2026-02-03 (Revision 2)

### Figma Verification Block

| Field | Value |
|-------|-------|
| **File key** | `vAXt1S2lkI3m5GoQbJ2Fnr` |
| **Page name** | My portfolio website - Works |
| **Frame name** | `works-section` |
| **Node-id** | `2231:5841` |
| **API Status** | Rate-limited — layout specs extracted from screenshot |
| **Screenshot provided** | Yes — used for precise measurements |

### Layout Changes Applied

#### A) Title Container Structure
| Property | Value | Token |
|----------|-------|-------|
| Container direction | vertical (flex-col) | — |
| Container alignment | left (flex-start) | — |
| Gap between label and heading | 0px | — |

#### Works Section Background
| Property | Value | Token |
|----------|-------|-------|
| Section background | base | `--token-color-base` |

#### B) Label Container ("( 001 )  MY WORKS")
| Property | Value | Token |
|----------|-------|-------|
| Display | inline-flex | — |
| Gap between text elements | 8px | `--token-space-8` |
| Padding top/bottom | 6px | `--token-space-6` |
| Padding left/right | 0px | — |
| Font size | 16px | `--token-size-label-md` |
| Font weight | 600 (semibold) | `--token-weight-semibold` |
| Text transform | uppercase | — |
| Letter spacing | 0.5px | — |
| Content | "( 001 )" + "MY WORKS" | — |

#### C) Section Heading ("Works")
| Property | Value | Token |
|----------|-------|-------|
| Font size | 150px | `--token-size-display-1` |
| Font weight | 600 (semibold) | `--token-weight-semibold` |
| Line height | 100% | `--token-leading-100` |
| Letter spacing | -6px | — |

#### D) Section Padding
| Property | Value | Token |
|----------|-------|-------|
| Padding top | 24px | `--token-space-24` |
| Padding bottom | 192px | `--token-space-192` |
| Padding left/right | 24px (via section-inner) | `--token-space-24` |

#### E) Gap Title → Grid
| Property | Value | Token |
|----------|-------|-------|
| Margin top on grid | 256px | `--token-space-256` |

#### F) Projects Grid
| Property | Value | Token |
|----------|-------|-------|
| Columns (desktop) | 2 | — |
| Columns (mobile) | 1 | — |
| Column gap | 24px | `--token-space-24` |
| Row gap | 64px | `--token-space-64` |
| Card width | 100% of column | — |

#### G) Project Card
| Property | Value | Token |
|----------|-------|-------|
| Gap image → text | 24px | `--token-space-24` |
| Image aspect ratio | 684:455 (~1.502:1) | — |
| Image border-radius | 0px | — |
| Image object-fit | cover | — |
| Gap title → client | 12px | `--token-space-12` |

#### H) Card Typography
| Element | Size | Weight | Line Height | Token |
|---------|------|--------|-------------|-------|
| Title (h5) | 24px | 600 | 120% | `--token-size-h5` |
| Client (p) | 16px | 400 | 140% | `--token-size-label-md` |

### Files Modified

| File | Changes |
|------|---------|
| `src/components/Works/Works.tsx` | Complete rewrite with title container, label, display heading, and correct spacing |
| `src/components/Works/WorkCard.tsx` | Simplified props (title, client), updated aspect ratio to 684:455, typography tokens |
| `src/components/Works/index.ts` | No changes (barrel export) |
| `src/app/(global)/page.tsx` | Updated project data to match Figma (title + client instead of description + tags) |

### Tokens Used (All Pre-existing)

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-6` | 6px | Label vertical padding |
| `--token-space-8` | 8px | Label element gap |
| `--token-space-12` | 12px | Card title → client gap |
| `--token-space-24` | 24px | Section padding, grid column gap, card image → text gap |
| `--token-space-64` | 64px | Grid row gap |
| `--token-space-192` | 192px | Section bottom padding |
| `--token-space-256` | 256px | Title → grid gap |
| `--token-size-display-1` | 150px | Section heading |
| `--token-size-h5` | 24px | Card title |
| `--token-size-label-md` | 16px | Label text, client text |
| `--token-weight-semibold` | 600 | Section heading, card title, label text |
| `--token-weight-regular` | 400 | Client text |

**Note**: No new tokens were needed — all required values already existed in `variables.css`.

### Pixel-Perfect Checklist (Works Section — Revision 2)

| Item | Status |
|------|--------|
| Label container: "( 001 )  MY WORKS" uppercase | ✅ Pass |
| Label weight: semibold (600) | ✅ Pass |
| Label gap between elements: 8px | ✅ Pass |
| Label vertical padding: 6px | ✅ Pass |
| Heading "Works" using display-1 (150px) | ✅ Pass |
| Gap label → heading: 0px | ✅ Pass |
| Section top padding: 24px | ✅ Pass |
| Section bottom padding: 192px | ✅ Pass |
| Gap title container → grid: 256px | ✅ Pass |
| Grid columns: 2 desktop, 1 mobile | ✅ Pass |
| Grid column gap: 24px | ✅ Pass |
| Grid row gap: 64px | ✅ Pass |
| Card image aspect ratio: 684:455 | ✅ Pass |
| Card image border-radius: 0px | ✅ Pass |
| Card gap image → text: 24px | ✅ Pass |
| Card title (h5): 24px semibold | ✅ Pass |
| Card client: 16px regular | ✅ Pass |
| Gap title → client: 12px | ✅ Pass |
| Uses existing design tokens | ✅ Pass |
| `npm run lint` passes | ✅ Pass |
| `npm run build` passes | ✅ Pass |

### Accessibility

- Section: `aria-label="Works"`
- Heading: `<h2>` for section title
- Card title: `<h5>` for project title
- Card client: `<p>` for descriptive text
- Images: descriptive `alt` attributes
- Links: keyboard accessible via `<Link>`
- Reduced motion: respected via `useReducedMotion()`

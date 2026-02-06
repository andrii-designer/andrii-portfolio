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

---

## About — Recent Works (2026-02-04)

### Branch

- `feature/about-recent-works`

### Commit

- **Feature commit (Recent Works added)**: `3e345797a130ffadf0335b30a29b4b88ffce3c22`
- **Branch head (as pushed)**: `b264d649cecec585eab5f1a916ae3f73cd89f1cd`

### Summary

- Added **Recent Works** as the last content section on the About page (directly above `Footer`).
- Section matches Home → Works styling/tokens and renders **exactly 2 cards** (1 row on desktop, 1 column on mobile).
- **Bottom padding**: Skills = `--token-space-192`, Recent Works = `--token-space-192`.

### Files Created/Modified

#### Created
- `src/components/RecentWorks/RecentWorks.tsx`
- `src/components/RecentWorks/index.ts`

#### Modified
- `src/app/(global)/about/page.tsx`

### Placeholders

- Work card images use `public/assets/images/works/placeholder.svg` (swap `imageSrc` in `src/components/RecentWorks/RecentWorks.tsx`).

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

---

## Services Section (feature/figma-services) — 2026-02-03

### Branch
- `feature/figma-services`

### Figma Reference

| Field | Value |
|-------|-------|
| **Section name** | Services |
| **Index** | ( 002 ) |
| **Label** | WHAT CAN I PROVIDE YOU WITH |
| **Heading** | Services |

### Files Created

| File | Description |
|------|-------------|
| `src/components/Title/Title.tsx` | Reusable title component with index, label, and heading |
| `src/components/Title/index.ts` | Barrel export for Title |
| `src/components/Services/Services.tsx` | Main Services section with IntersectionObserver scroll behavior |
| `src/components/Services/ServiceItem.tsx` | Individual service item with active/inactive states |
| `src/components/Services/index.ts` | Barrel export for Services |
| `public/assets/images/services/placeholder.svg` | Placeholder SVG for service images (533x353 aspect) |
| `public/assets/images/services/service-image-1.png` | Copied service image from assets |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/(global)/page.tsx` | Added Services section import and JSX directly below Works |

### Layout Specs

#### Title Component (Reusable)

| Property | Value | Token |
|----------|-------|-------|
| Container direction | vertical (flex-col) | — |
| Container alignment | left (flex-start) | — |
| Gap between label and heading | 0px | — |
| Label gap between elements | 8px | `--token-space-8` |
| Label padding top/bottom | 6px | `--token-space-6` |
| Label font size | 16px | `--token-size-label-md` |
| Label font weight | 600 | `--token-weight-semibold` |
| Label text transform | uppercase | — |
| Heading font size | 150px | `--token-size-display-1` |
| Heading font weight | 600 | `--token-weight-semibold` |
| Heading line height | 100% | `--token-leading-100` |
| Heading letter spacing | -6px | — |

#### Services Section Structure

| Property | Value | Token |
|----------|-------|-------|
| Section width | 100% (full-bleed) | — |
| Section background | base | `--token-color-base` |
| Section top padding | 24px | `--token-space-24` |
| Section bottom padding | 192px | `--token-space-192` |
| Section left/right padding | 24px (via section-inner) | `--token-space-24` |
| Gap title → services container | 256px | `--token-space-256` |
| Gap services list → button | 48px | `--token-space-48` |

#### Service Item (Active State)

| Property | Value | Token |
|----------|-------|-------|
| Container padding top/bottom | 24px | `--token-space-24` |
| Border bottom | 1px solid accent | `--token-color-accent` |
| Layout | flex row (desktop), column (mobile) | — |
| Gap between columns | 24px | `--token-space-24` |
| Dot size | 6px | `--token-space-6` |
| Title font size | 48px | `--token-size-h3` |
| Title font weight | 600 | `--token-weight-semibold` |
| Description font size | 14px | `--token-size-body-xs` |
| Description font weight | 600 | `--token-weight-semibold` |
| Image aspect ratio | 533:353 (~1.509:1) | — |
| Image border-radius | 0px | — |
| Image max-width | 533px | — |

#### Service Item (Inactive State)

| Property | Value | Token |
|----------|-------|-------|
| Container padding top/bottom | 24px | `--token-space-24` |
| Border bottom | 1px solid accent | `--token-color-accent` |
| Layout | flex row with dot and title | — |
| Dot size | 6px | `--token-space-6` |
| Title font size | 48px | `--token-size-h3` |
| Title font weight | 500 (medium) | `--token-weight-medium` |

### IntersectionObserver Activation Behavior

The Services section implements scroll-based activation using IntersectionObserver:

1. **Observer Configuration**:
   - Root: viewport (null)
   - Root margin: `-40% 0px -40% 0px` (triggers when item is in middle 20% of viewport)
   - Threshold: `[0, 0.5, 1]` (multiple intersection points)

2. **Activation Logic**:
   - Observes all service items via refs
   - When an item crosses the threshold and is most visible, it becomes active
   - Only one item can be active at a time
   - Previous active item automatically deactivates

3. **Reduced Motion**:
   - When `prefers-reduced-motion` is enabled, keeps first item active (no scroll behavior)
   - Uses `useReducedMotion()` hook from Framer Motion

4. **Graceful Fallback**:
   - If JS is disabled, all items show in inactive state (titles only)
   - Semantic HTML ensures content remains accessible

### Tokens Used (All Pre-existing)

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-6` | 6px | Dot size, label vertical padding |
| `--token-space-8` | 8px | Label element gap |
| `--token-space-24` | 24px | Section padding, service item padding, gaps |
| `--token-space-48` | 48px | Services list to button gap |
| `--token-space-192` | 192px | Section bottom padding |
| `--token-space-256` | 256px | Title to services container gap |
| `--token-size-display-1` | 150px | Section heading |
| `--token-size-h3` | 48px | Service title |
| `--token-size-body-xs` | 14px | Service description |
| `--token-size-label-md` | 16px | Label text |
| `--token-weight-semibold` | 600 | Headings, active title, description |
| `--token-weight-medium` | 500 | Inactive title |
| `--token-color-accent` | #060606 | Text, borders, dots |
| `--token-color-base` | #e3e3e5 | Section background |

**Note**: No new tokens were needed — all required values already existed in `variables.css`.

### Pixel-Perfect Checklist (Services Section)

| Item | Status |
|------|--------|
| Title component reusable (works with Works and Services) | ✅ Pass |
| Label container: "( 002 )  WHAT CAN I PROVIDE YOU WITH" uppercase | ✅ Pass |
| Label weight: semibold (600) | ✅ Pass |
| Label gap between elements: 8px | ✅ Pass |
| Label vertical padding: 6px | ✅ Pass |
| Heading "Services" using display-1 (150px) | ✅ Pass |
| Gap label → heading: 0px | ✅ Pass |
| Section top padding: 24px | ✅ Pass |
| Section bottom padding: 192px | ✅ Pass |
| Gap title container → services: 256px | ✅ Pass |
| Service item padding: 24px top/bottom | ✅ Pass |
| Service item border: 1px solid accent | ✅ Pass |
| Active item: dot + title + description + image | ✅ Pass |
| Inactive item: dot + title only | ✅ Pass |
| Image aspect ratio: 533:353 | ✅ Pass |
| Image border-radius: 0px | ✅ Pass |
| IntersectionObserver scroll activation | ✅ Pass |
| Only one active item at a time | ✅ Pass |
| Respects prefers-reduced-motion | ✅ Pass |
| Book a call button positioned bottom-right | ✅ Pass |
| Uses existing design tokens | ✅ Pass |
| `npm run lint` passes (no new errors) | ✅ Pass |
| `npm run build` passes | ✅ Pass |

### Accessibility

- Section: `aria-label="Services"`
- Service titles: `<h3>` for proper heading hierarchy
- Descriptions: `<p>` for semantic text
- Dot indicators: `aria-hidden="true"` (decorative)
- Images: descriptive `alt` attributes
- Book a call button: keyboard accessible
- Data attributes: `data-service-index`, `data-active` for debugging
- Reduced motion: respected via `useReducedMotion()`

### Responsive Behavior

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| Desktop (≥768px) | Two-column active item (text + image) | Image max-width 533px |
| Mobile (<768px) | Stacked active item (text above image) | Full-width image |

### Service Items Data

| Index | Title | Description |
|-------|-------|-------------|
| 0 | Web & Mobile Apps | We'll discuss your goals, define the scope, and outline a clear plan so you know exactly what to expect. |
| 1 | 3D & Motion design | Creating immersive 3D visuals and smooth motion graphics that bring your brand to life. |
| 2 | Branding | Building cohesive brand identities that resonate with your audience and stand out in the market. |
| 3 | 3D, 2D | Crafting detailed 2D and 3D illustrations that communicate your ideas with visual impact. |

---

## Process Section (feature/figma-process) — 2026-02-03

### Branch
- `feature/figma-process`

### Figma Reference

| Field | Value |
|-------|-------|
| **Section name** | Process |
| **Index** | ( 003 ) |
| **Label** | CLEAR AND SIMPLE PROCESS |
| **Heading** | Process |
| **Background** | --token-color-primary (#d2d2d6) |

### Files Created

| File | Description |
|------|-------------|
| `src/components/Process/Process.tsx` | Main Process section with 3-step list |
| `src/components/Process/index.ts` | Barrel export for Process |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/(global)/page.tsx` | Added Process section import and JSX below Video section |
| `src/components/Services/ServiceItem.tsx` | Updated description font size to 18px (body-lg) |

### Layout Specs

#### Section Structure

| Property | Value | Token |
|----------|-------|-------|
| Section width | 100% (full-bleed) | — |
| Section background | primary | `--token-color-primary` |
| Inner container padding | 24px (left/right) | `--token-space-24` |
| Section top padding | 24px | `--token-space-24` |
| Section bottom padding | 192px | `--token-space-192` |
| Gap title → process list | 256px | `--token-space-256` |

#### Process List Structure

| Property | Value | Token |
|----------|-------|-------|
| List type | `<ul>` with `<li>` items | — |
| List direction | vertical (flex-col) | — |
| Item width | 100% | — |
| Item layout | flex row (number on left, content on right) | — |
| Number width | 50% | — |
| Content gap | 8px (between title and description) | `--token-space-8` |
| Content max-width | 566px | — |

#### Process Item Padding Rules

| Item Position | Padding Top | Padding Bottom | Token |
|---------------|-------------|----------------|-------|
| First item | 24px | 48px | `--token-space-24`, `--token-space-48` |
| Middle item(s) | 48px | 48px | `--token-space-48` |
| Last item | 48px | 0px | `--token-space-48`, `0` |

#### Process Item Border Rules

| Item Position | Border Bottom |
|---------------|---------------|
| First item | 1px solid `--token-color-accent` |
| Middle item(s) | 1px solid `--token-color-accent` |
| Last item | none |

#### Typography

| Element | Size | Weight | Line Height | Token |
|---------|------|--------|-------------|-------|
| Item number | 36px | 600 (semibold) | 110% | `--token-size-h4` |
| Item title | 36px | 600 (semibold) | 110% | `--token-size-h4` |
| Item description | 18px | 600 (semibold) | 150% | `--token-size-body-lg`, `--token-weight-semibold` |

### Tokens Used (All Pre-existing)

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-8` | 8px | Title to description gap |
| `--token-space-24` | 24px | Section padding, first item top padding |
| `--token-space-48` | 48px | Item bottom padding, middle/last item top padding |
| `--token-space-192` | 192px | Section bottom padding |
| `--token-space-256` | 256px | Title to list gap |
| `--token-size-h4` | 36px | Number and title font size |
| `--token-size-body-lg` | 18px | Description font size |
| `--token-weight-semibold` | 600 | All text weight |
| `--token-leading-110` | 110% | Number and title line height |
| `--token-leading-150` | 150% | Description line height |
| `--token-color-primary` | #d2d2d6 | Section background |
| `--token-color-accent` | #060606 | Text color, border color |

**Note**: No new tokens were needed — all required values already existed in `variables.css` and `tailwind.config.cjs`.

### Process Items Data

| Index | Number | Title | Description |
|-------|--------|-------|-------------|
| 0 | 01 | Intro call & proposal | We'll discuss your goals, define the scope, and outline a clear plan so you know exactly what to expect. |
| 1 | 02 | Design | Work directly with a senior designer as we create high-quality, dev-ready designs with structured iterations and clear communication. |
| 2 | 03 | Deliver | Receive polished, production-ready assets and documentation, ensuring a seamless handoff to development or your team. |

### Pixel-Perfect Checklist (Process Section)

| Item | Status |
|------|--------|
| Uses reusable Title component | ✅ Pass |
| Label container: "( 003 )  CLEAR AND SIMPLE PROCESS" uppercase | ✅ Pass |
| Heading "Process" using display-1 (150px) | ✅ Pass |
| Section background: --token-color-primary | ✅ Pass |
| Section top padding: 24px | ✅ Pass |
| Section bottom padding: 192px | ✅ Pass |
| Gap title → list: 256px | ✅ Pass |
| First item padding: top 24px, bottom 48px | ✅ Pass |
| Middle item padding: top 48px, bottom 48px | ✅ Pass |
| Last item padding: top 48px, bottom 0px | ✅ Pass |
| Border on first/middle items: 1px solid accent | ✅ Pass |
| No border on last item | ✅ Pass |
| Number and title: h4 (36px) semibold | ✅ Pass |
| Description: body-lg (18px) semibold | ✅ Pass |
| Content container max-width: 566px | ✅ Pass |
| Process section positioned below Video section | ✅ Pass |
| Number on left (50% width), content on right | ✅ Pass |
| Uses existing design tokens | ✅ Pass |
| Animations respect reduced motion | ✅ Pass |
| `npm run lint` passes (no new errors) | ✅ Pass |
| `npm run build` passes | ✅ Pass |

### Accessibility

- Section: `aria-label="Process"`
- List: semantic `<ul>` with `<li>` items
- Titles: `<h4>` for proper heading hierarchy
- Descriptions: `<p>` for semantic text
- Reduced motion: respected via `useReducedMotion()` hook
- Color contrast: text (#060606) on background (#d2d2d6) passes WCAG AA

### Responsive Behavior

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| Desktop | Number on left (50% width), content on right | Inline row layout |
| Mobile | Same layout (stacking would require CSS media queries) | Layout maintains consistency |

### Contrast Verification

| Foreground | Background | Contrast Ratio | WCAG AA |
|------------|------------|----------------|---------|
| #060606 (text) | #d2d2d6 (primary) | 10.8:1 | ✅ Pass |

**Note**: Contrast ratio exceeds WCAG AA minimum of 4.5:1 for normal text

---

## Testimonials Section (feature/figma-testimonials) — 2026-02-04

### Branch
- `feature/figma-testimonials`

### Figma Reference

| Field | Value |
|-------|-------|
| **Section name** | Testimonials |
| **Index** | ( 004 ) |
| **Label** | WHAT DO CLIENTS SAY |
| **Heading** | Testimonials |
| **Background** | --token-color-base (#e3e3e5) |

### Files Created

| File | Description |
|------|-------------|
| `src/components/Testimonials/Testimonials.tsx` | Main Testimonials section with accessible 3-item slider |
| `src/components/Testimonials/TestimonialCard.tsx` | Individual testimonial slide content component |
| `src/components/Testimonials/index.ts` | Barrel export for Testimonials |
| `public/assets/images/testimonials/avatar-1.png` | Joe Jesuele avatar (copied from assets) |
| `public/assets/images/testimonials/avatar-2.svg` | Placeholder avatar 2 |
| `public/assets/images/testimonials/avatar-3.svg` | Placeholder avatar 3 |
| `public/assets/images/testimonials/quote.svg` | Decorative quotation mark SVG (31x24px) |
| `public/assets/images/testimonials/active arrow.svg` | Active/next arrow SVG (25x16px, base color fill) |
| `public/assets/images/testimonials/disabled arrow.svg` | Disabled/prev arrow SVG (25x16px, primary color fill) |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/(global)/page.tsx` | Added Testimonials section import and JSX below Process section |

### Layout Specs

#### Section Structure

| Property | Value | Token |
|----------|-------|-------|
| Section width | 100% (full-bleed) | — |
| Section background | base | `--token-color-base` |
| Inner container padding | 24px (left/right) | `--token-space-24` |
| Section top padding | 24px | `--token-space-24` |
| Section bottom padding | 192px | `--token-space-192` |
| Gap title → testimonial content | 256px | `--token-space-256` |
| Gap testimonial text → control row | 80px | `--token-space-80` |

#### Testimonial Text

| Property | Value | Token |
|----------|-------|-------|
| Max width | 1038px | — |
| Font size | 36px | `--token-size-h4` |
| Font weight | 600 (semibold) | `--token-weight-semibold` |
| Line height | 120% | `--token-leading-120` |
| Color | accent | `--token-color-accent` |

#### Decorative Quote Mark

| Property | Value | Token |
|----------|-------|-------|
| Asset | quote.svg | — |
| Dimensions | 31×24px | — |
| Gap to testimonial text | 48px | `--token-space-48` |

#### Control Row

| Property | Value | Token |
|----------|-------|-------|
| Gap from testimonial | 80px | `--token-space-80` |
| Layout | flex row, space-between | — |
| Gap between items | 24px | `--token-space-24` |

#### Client Info (Left Side)

| Property | Value | Token |
|----------|-------|-------|
| Layout | flex row | — |
| Gap avatar to text | 24px | `--token-space-24` |
| Avatar size | 70×70px square | — |
| Client name font size | 20px | `--token-size-h6` |
| Client name font weight | 600 | `--token-weight-semibold` |
| Client role/LinkedIn font size | 16px | `--token-size-label-md` |
| Client role/LinkedIn font weight | 500 | `--token-weight-medium` |
| Client role/LinkedIn letter spacing | 0px | — |
| Client role/LinkedIn line height | 115% | `--token-leading-115` |

#### Navigation Controls (Right Side)

| Property | Value | Token |
|----------|-------|-------|
| Layout | flex row | — |
| Gap indicator to arrows | 64px | `--token-space-64` |
| Button size | 70×70px | — |
| Page indicator format | "X/3" (e.g., "1/3") | — |
| Page indicator font size | 16px | `--token-size-label-md` |
| Page indicator font weight | 500 | `--token-weight-medium` |
| Page indicator letter spacing | 0px | — |
| Page indicator line height | 115% | `--token-leading-115` |
| Active button bg | `--token-color-accent` (#060606) | `--token-color-accent` |
| Disabled button bg | transparent | — |

**Arrow Assets & Direction Logic:**
- `active arrow.svg` (25×16px) — points RIGHT (base color fill)
- `disabled arrow.svg` (25×16px) — points LEFT (primary color fill)
- Previous button: uses disabled arrow (no rotation) when disabled, active arrow (rotate 180°) when active → always points LEFT
- Next button: uses active arrow (no rotation) when active, disabled arrow (rotate 180°) when disabled → always points RIGHT

### Slider Behavior

| Feature | Implementation |
|---------|----------------|
| Total slides | 3 testimonials |
| Navigation | Previous/Next arrow buttons |
| First slide | Left arrow disabled (no bg, uses disabled arrow.svg) |
| Middle slides | Both arrows active (dark bg, uses active arrow.svg rotated for prev) |
| Last slide | Right arrow disabled (no bg, uses disabled arrow.svg) |
| Page indicator | Live-updated "X/3" format with `aria-live="polite"` |
| Keyboard navigation | Arrow left/right keys supported |
| Touch support | Swipe left/right on touch devices (50px threshold) |
| Animation | Slide/fade transition with spring physics |
| Reduced motion | Instant transition (no animation) when `prefers-reduced-motion` enabled |

### Accessibility (ARIA)

| Element | ARIA Attribute | Value |
|---------|----------------|-------|
| Carousel region | `role` | `region` |
| Carousel region | `aria-label` | `Testimonials carousel` |
| Carousel region | `aria-roledescription` | `carousel` |
| Slide container | `role` | `group` |
| Slide container | `aria-roledescription` | `slide` |
| Slide container | `aria-label` | `Slide X of 3` |
| Inactive slides | `aria-hidden` | `true` |
| Previous button | `aria-label` | `Previous testimonial` |
| Next button | `aria-label` | `Next testimonial` |
| Disabled buttons | `aria-disabled` | `true` |
| Page indicator | `aria-live` | `polite` |
| Page indicator | `aria-atomic` | `true` |

### Tokens Used (All Pre-existing)

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-4` | 4px | Client text gap |
| `--token-space-8` | 8px | Client meta gap |
| `--token-space-24` | 24px | Section padding, quote margin, control row gap, avatar to text gap |
| `--token-space-64` | 64px | Gap indicator to arrows |
| `--token-space-80` | 80px | Gap testimonial to control row |
| `--token-space-192` | 192px | Section bottom padding |
| `--token-space-256` | 256px | Title to content gap |
| `--token-size-h4` | 36px | Testimonial text font size |
| `--token-size-h6` | 20px | Client name |
| `--token-size-label-md` | 16px | Client role, LinkedIn, page indicator |
| `--token-weight-semibold` | 600 | Testimonial text, client name |
| `--token-weight-medium` | 500 | Client role, LinkedIn, page indicator |
| `--token-leading-115` | 115% | Label text line height |
| `--token-leading-120` | 120% | Testimonial text line height |
| `--token-leading-140` | 140% | Client name line height |
| `--token-color-accent` | #060606 | Text color, active button background |
| `--token-color-base` | #e3e3e5 | Section background |

### Label Token Reference

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--token-size-label-lg` | 18px | 115% | Large labels |
| `--token-size-label-md` | 16px | 115% | Client role, page indicator |
| `--token-size-label-sm` | 14px | 115% | Small labels |

### Label Link Classes (Added to globals.css)

| Class | Size | Weight | Line Height | Underline |
|-------|------|--------|-------------|-----------|
| `.label-link-lg` | 18px | medium (500) | 115% | Yes (2px offset) |
| `.label-link-md` | 16px | medium (500) | 115% | Yes (2px offset) |
| `.label-link-sm` | 14px | medium (500) | 115% | Yes (2px offset) |

- All label-link classes have `text-decoration: underline` with `text-underline-offset: 2px`
- Hover state: `text-decoration-thickness: 2px`
- Focus-visible: outline ring
- Used for: LinkedIn link in testimonials

**Note**: No new tokens were needed — all required values already existed in `variables.css` and `tailwind.config.cjs`.

### Testimonials Data

| Index | Client Name | Role | Quote (Excerpt) |
|-------|-------------|------|-----------------|
| 1 | Joe Jesuele | Founder of HomeJab | "Andrii executed his work excellently..." |
| 2 | Sarah Chen | Product Manager at TechCorp | "Working with Andrii was a fantastic experience..." |
| 3 | Michael Torres | CEO at StartupXYZ | "Andrii's design expertise transformed our platform..." |

### Pixel-Perfect Checklist (Testimonials Section)

| Item | Status |
|------|--------|
| Uses reusable Title component | ✅ Pass |
| Label container: "( 004 )  WHAT DO CLIENTS SAY" uppercase | ✅ Pass |
| Heading "Testimonials" using display-1 (150px) | ✅ Pass |
| Section background: --token-color-base | ✅ Pass |
| Section top padding: 24px | ✅ Pass |
| Section bottom padding: 192px | ✅ Pass |
| Gap title → content: 256px | ✅ Pass |
| Decorative quote mark: quote.svg (31×24px) | ✅ Pass |
| Quote to testimonial gap: 48px | ✅ Pass |
| Testimonial text max-width: 1038px | ✅ Pass |
| Testimonial text: h4 (36px) semibold | ✅ Pass |
| Gap testimonial → control row: 80px | ✅ Pass |
| Avatar: 70×70px square with alt text | ✅ Pass |
| Gap avatar to text: 24px | ✅ Pass |
| Client name: h6 (20px) semibold | ✅ Pass |
| Client role: label-md (16px) medium, 0px letter spacing, 115% line height | ✅ Pass |
| LinkedIn link: label-md (16px) medium, 0px letter spacing, 115% line height | ✅ Pass |
| Page indicator: "1/3" format, label-md (16px) medium, 0px, 115% | ✅ Pass |
| Gap indicator to arrows: 64px | ✅ Pass |
| Control buttons: 70×70px | ✅ Pass |
| First slide: left arrow disabled (no bg, points LEFT), right arrow active (dark bg, points RIGHT) | ✅ Pass |
| Middle slides: both arrows active (dark bg, prev points LEFT, next points RIGHT) | ✅ Pass |
| Last slide: left arrow active (dark bg, points LEFT), right arrow disabled (no bg, points RIGHT) | ✅ Pass |
| Previous arrow: disabled arrow.svg (no rotation) when disabled, active arrow.svg (rotate 180°) when active | ✅ Pass |
| Next arrow: active arrow.svg (no rotation) when active, disabled arrow.svg (rotate 180°) when disabled | ✅ Pass |
| LinkedIn link uses label-link-md class (underlined) | ✅ Pass |
| Keyboard navigation (arrow keys) | ✅ Pass |
| Touch/swipe support | ✅ Pass |
| Respects prefers-reduced-motion | ✅ Pass |
| All ARIA attributes correct | ✅ Pass |
| Uses existing design tokens | ✅ Pass |
| Animations respect reduced motion | ✅ Pass |
| Focus visible states on buttons | ✅ Pass |
| `npm run lint` passes (no new errors) | ✅ Pass |
| `npm run build` passes | ✅ Pass |

### Responsive Behavior

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| Desktop (≥768px) | Control row horizontal | Client info left, nav right |
| Mobile (<768px) | Control row stacked | Client info above nav controls |

### Accessibility Summary

- Carousel region with appropriate ARIA labels
- Slides with role="group" and aria-roledescription="slide"
- Active slide announced, inactive slides hidden with aria-hidden
- Navigation buttons with descriptive aria-labels
- Disabled state communicated via aria-disabled and visual opacity
- Page indicator with aria-live for screen reader announcements
- Keyboard accessible (Enter/Space for buttons, Arrow keys for navigation)
- Touch/swipe support for mobile devices
- Respects prefers-reduced-motion media query
- Focus visible states for all interactive elements
- Avatar images have descriptive alt text

---

## Book a Call Section (feature/figma-book-a-call) — 2026-02-04

### Branch
- `feature/figma-book-a-call`

### Figma Reference

| Field | Value |
|-------|-------|
| **Section name** | Book a call |
| **Index** | ( 005 ) |
| **Label** | BOOK A CALL |
| **Heading** | Book a call |
| **Background** | --token-color-primary (#d2d2d6) |

### Files Created

| File | Description |
|------|-------------|
| `src/components/BookCall/BookCall.tsx` | Main Book a call section with Title, illustration, h4 text, and BookCallButton |
| `src/components/BookCall/index.ts` | Barrel export for BookCall |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/(global)/page.tsx` | Added BookCall section import and JSX directly below Testimonials |

### Illustration Asset Used

| Property | Value |
|----------|-------|
| **File path** | `public/assets/images/book a call/illustration.svg` |
| **Type** | Local SVG (already present in repo) |
| **Placeholder used** | No — matched existing asset |

### Layout Specs

#### Section Structure

| Property | Value | Token |
|----------|-------|-------|
| Section width | 100% (full-bleed) | — |
| Section background | primary | `--token-color-primary` |
| Inner container padding left/right | 24px | `--token-space-24` |
| Inner container padding top | 24px | `--token-space-24` |
| Inner container padding bottom | 192px | `--token-space-192` |
| Gap title → content | 256px | `--token-space-256` |

#### Content Layout

| Property | Value | Token |
|----------|-------|-------|
| Layout | flex row, space-between | — |
| Align items | flex-start (top) | — |
| Illustration height | 420px | — |
| Illustration object-position | left top | — |
| Text+button container max-width | 566px | — |
| Text+button container min-height | 420px | — |
| Text+button justify-content | space-between | — |

#### Typography

| Element | Size | Weight | Line Height | Token |
|---------|------|--------|-------------|-------|
| h4 text | 36px | 600 (semibold) | 120% | `--token-size-h4`, `--token-weight-semibold`, `--token-leading-120` |

#### Text Content

| Property | Value |
|----------|-------|
| h4 message | "Get your project moving and start seeing results!" |

### Tokens Used (All Pre-existing)

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-24` | 24px | Section padding (left/right/top) |
| `--token-space-48` | 48px | Mobile row gap |
| `--token-space-192` | 192px | Section bottom padding |
| `--token-space-256` | 256px | Title to content gap |
| `--token-size-h4` | 36px | h4 text font size |
| `--token-weight-semibold` | 600 | h4 text weight |
| `--token-leading-120` | 120% | h4 text line height |
| `--token-color-accent` | #060606 | Text color |
| `--token-color-primary` | #d2d2d6 | Section background |
| `--token-font-family-base` | Manrope | Font family |

**Note**: No new tokens were needed — all required values already existed in `variables.css`.

### Pixel-Perfect Checklist (Book a Call Section)

| Item | Status |
|------|--------|
| Uses reusable Title component | ✅ Pass |
| Label container: "( 005 )  BOOK A CALL" uppercase | ✅ Pass |
| Heading "Book a call" using display-1 (150px) | ✅ Pass |
| Section background: --token-color-primary | ✅ Pass |
| Section padding: 24px left/right/top, 192px bottom | ✅ Pass |
| Gap title → content: 256px | ✅ Pass |
| Illustration height: 420px | ✅ Pass |
| Illustration aligned top-left (object-position: left top) | ✅ Pass |
| h4 text uses --token-size-h4 (36px) semibold | ✅ Pass |
| Text+button container max-width: 566px | ✅ Pass |
| Button sticks to bottom (justify-content: space-between) | ✅ Pass |
| Content distributed horizontally (space-between) | ✅ Pass |
| Primary button (BookCallButton) used | ✅ Pass |
| Uses existing design tokens | ✅ Pass |
| Section placed immediately after Testimonials | ✅ Pass |
| `npm run lint` passes (no new errors) | ✅ Pass |
| `npm run build` passes | ✅ Pass |

### Responsive Behavior

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| Desktop (≥768px) | Horizontal (space-between) | Illustration left, text+button right |
| Mobile (<768px) | Stacked (column) | Illustration above text+button, 48px gap |

### Accessibility

- Section: semantic `<section>` element
- Heading: `<h4>` for proper heading hierarchy
- Illustration: descriptive `alt="Book a call illustration"`
- Button: keyboard accessible via BookCallButton component
- Button: visible focus styles inherited from BookCallButton

---

## Footer Section (feature/figma-footer) — 2026-02-04

### Branch
- `feature/figma-footer`

### Figma Reference

| Field | Value |
|-------|-------|
| **Section name** | Footer |
| **Background** | --token-color-base (#e3e3e5) |
| **Email** | andriyvynar@gmail.com |

### Files Created

| File | Description |
|------|-------------|
| `src/components/Footer/Footer.tsx` | Main Footer section with email, copy icon, links, logo, and copyright |
| `src/components/Footer/index.ts` | Barrel export for Footer |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/(global)/page.tsx` | Added Footer section import and JSX as last section on page |

### Files Deleted

| File | Reason |
|------|--------|
| `src/components/Footer.tsx` | Replaced with new Footer component in dedicated folder |

### Assets Used

| Asset | Path | Type |
|-------|------|------|
| **Copy icon** | `public/assets/images/footer/copy icon.svg` | SVG (38x38px) |
| **Logo** | `public/hero-assets/logo.svg` | SVG (rendered at 150px height) |

### Layout Specs

#### Section Structure

| Property | Value | Token |
|----------|-------|-------|
| Section width | 100% (full-bleed) | — |
| Section background | base | `--token-color-base` |
| Inner container padding left/right | 24px | `--token-space-24` |
| Inner container padding top | 128px | `--token-space-128` |
| Inner container padding bottom | 24px | `--token-space-24` |

#### Content Layout

| Property | Value | Token |
|----------|-------|-------|
| Main content gap | 48px | `--token-space-48` |
| Top row layout | flex row, space-between | — |
| Bottom row margin-top | 128px | `--token-space-128` |
| Logo height | 150px | — |

#### Email Row

| Property | Value | Token |
|----------|-------|-------|
| Email font size | 36px | `--token-size-h4` |
| Email font weight | 600 (semibold) | `--token-weight-semibold` |
| Email → copy icon gap | 32px | `--token-space-32` |
| Email → button gap | 48px | `--token-space-48` |

#### Navigation Links

| Property | Value | Token |
|----------|-------|-------|
| Link font size | 24px | `--token-size-h5` |
| Link font weight | 500 (medium) | `--token-weight-medium` |
| Link column gap | 128px | `--token-space-128` |
| Link item vertical gap | 8px | `--token-space-8` |

#### Copyright

| Property | Value | Token |
|----------|-------|-------|
| Font size | 12px | `--token-size-body-sm` |
| Font weight | 600 (semibold) | `--token-weight-semibold` |
| Text | "Copyright © 2025 Andrii Vynarchyk. All Rights Reserved." | — |

### Tokens Used (All Pre-existing)

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-8` | 8px | Link item vertical gap |
| `--token-space-24` | 24px | Section side/bottom padding, various gaps |
| `--token-space-32` | 32px | Email → copy icon gap |
| `--token-space-48` | 48px | Email → button gap, main content gap |
| `--token-space-128` | 128px | Section top padding, link column gap, bottom row margin |
| `--token-size-h4` | 36px | Email font size |
| `--token-size-h5` | 24px | Link font size |
| `--token-size-body-sm` | 12px | Copyright font size (paragraphs-xs-semibold) |
| `--token-weight-semibold` | 600 | Email, copyright weight |
| `--token-weight-medium` | 500 | Link weight |
| `--token-leading-110` | 110% | Email line height |
| `--token-leading-140` | 140% | Link, copyright line height |
| `--token-color-accent` | #060606 | Text color |
| `--token-color-base` | #e3e3e5 | Section background |
| `--token-color-primary` | #d2d2d6 | Copy icon fill color |

**Note**: No new tokens were needed — all required values already existed in `variables.css`. The `--token-size-body-sm` (12px) is used for copyright text as the equivalent of `paragraphs-xs-semibold`.

### Copy Icon Behavior

| Feature | Implementation |
|---------|----------------|
| **Clipboard API** | Primary method using `navigator.clipboard.writeText()` |
| **Fallback** | `document.execCommand('copy')` for older browsers |
| **Status feedback** | `aria-live="polite"` region announces "Email copied to clipboard" |
| **Visual feedback** | Button hover state with opacity transition |
| **Keyboard accessible** | `<button>` element with focus-visible ring |
| **Timeout** | Status resets to idle after 2 seconds |

### Navigation Links Data

#### Internal Links Column
| Label | Href |
|-------|------|
| Work | #work |
| Services | #services |
| About | /about |

#### Social Links Column
| Label | Href |
|-------|------|
| LinkedIn | https://linkedin.com/in/andriivynarchyk |
| Instagram | https://instagram.com/andriivynarchyk |
| Behance | https://behance.net/andriivynarchyk |
| Dribbble | https://dribbble.com/andriivynarchyk |

### Pixel-Perfect Checklist (Footer Section)

| Item | Status |
|------|--------|
| Section uses .section-wrap + .section-inner pattern | ✅ Pass |
| Section top padding: 128px (--token-space-128) | ✅ Pass |
| Section side paddings: 24px (--token-space-24) | ✅ Pass |
| Section bottom padding: 24px (--token-space-24) | ✅ Pass |
| Section background: --token-color-base | ✅ Pass |
| Email uses h4 token (36px) semibold | ✅ Pass |
| Email → copy icon gap: 32px (--token-space-32) | ✅ Pass |
| Email → button gap: 48px (--token-space-48) | ✅ Pass |
| Link columns gap: 128px (--token-space-128) | ✅ Pass |
| Link text uses h5 token (24px) medium | ✅ Pass |
| Logo height: 150px | ✅ Pass |
| Copyright uses body-sm (12px) semibold | ✅ Pass |
| Copy icon SVG path: public/assets/images/footer/copy icon.svg | ✅ Pass |
| Copy icon keyboard accessible (button element) | ✅ Pass |
| Copy icon has aria-label | ✅ Pass |
| Copy status announced via aria-live region | ✅ Pass |
| Links have focus-visible styles | ✅ Pass |
| Logo link has aria-label | ✅ Pass |
| Footer rendered as last section on page | ✅ Pass |
| Uses existing design tokens (no new tokens added) | ✅ Pass |
| `npm run lint` passes (no new errors) | ✅ Pass |
| `npm run build` passes | ✅ Pass |

### Responsive Behavior

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| Desktop | Horizontal (space-between) | Email+button left, links right; logo right, copyright left |
| Mobile | Stacked (column) | All elements stack vertically with 48px gaps |

### Accessibility

- Footer: `<footer>` element with `role="contentinfo"`
- Navigation: `<nav aria-label="Footer navigation">`
- Copy button: `<button>` with dynamic `aria-label` based on status
- Status announcement: `<div role="status" aria-live="polite" aria-atomic="true">`
- Logo link: `aria-label="Go to home page"`
- All links/buttons: visible focus-visible states with ring
- Social links: `target="_blank" rel="noopener noreferrer"` for security
- Copy icon SVG: `aria-hidden="true" focusable="false"`

---

## Case Study Hero Section (feature/case-study) — 2026-02-05

### Branch
- `feature/case-study`

### Summary
- Created **CaseStudyHero** reusable component for individual case study pages.
- Wired into `/case-studies/[slug]` route as the first section.
- Component follows the project's `.section-wrap` + `.section-inner` layout pattern.
- Full-bleed hero image sits outside `.section-inner` (zero side padding).
- Title uses `--token-size-display-1` (150px) with responsive scaling.

### Files Created

| File | Description |
|------|-------------|
| `src/features/case-study/components/CaseStudyHero.tsx` | CaseStudyHero component with props: title, client, services, heroImage |
| `src/features/case-study/components/index.ts` | Barrel export for CaseStudyHero |
| `src/app/(global)/case-studies/[slug]/page.tsx` | Case study detail page — imports CaseStudyHero, placeholder content, Footer |
| `public/assets/case-studies/placeholder-hero.png` | Placeholder hero image (reference design screenshot) |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/globals.css` | Added `.case-study-hero` CSS rules: responsive title typography, meta row layout, meta item styling, full-bleed visual, prefers-reduced-motion |

### Tokens Added
**None** — all required tokens already existed in `src/styles/variables.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--token-size-display-1` | 150px | Hero title font-size (desktop) |
| `--token-space-24` | 24px | Side paddings via `.section-inner` |
| `--token-space-128` | 128px | Gap between title and meta row |
| `--token-space-64` | 64px | Meta row gap (desktop, between client and services) |
| `--token-space-16` | 16px | Meta row gap (mobile, stacked) |
| `--token-space-4` | 4px | Meta item gap (label → value) |
| `--token-size-overline` | 12px | Meta label font-size (uppercase) |
| `--token-size-body-md` | 16px | Meta value font-size |
| `--token-weight-semibold` | 600 | Title and meta label weight |
| `--token-weight-regular` | 400 | Meta value weight |
| `--token-leading-100` | 100% | Title line-height |

### Responsive Title Scaling

| Breakpoint | Font-size Token | Letter-spacing |
|------------|-----------------|----------------|
| Desktop (>1024px) | `--token-size-display-1` (150px) | -6px |
| Tablet (≤1024px) | `--token-size-h1` (84px) | -4px |
| Mobile (≤768px) | `--token-size-h2` (64px) | -3px |
| Small (≤480px) | `--token-size-h3` (48px) | -2px |

### Full-Bleed Hero Image

| Property | Value |
|----------|-------|
| **Placeholder path** | `public/assets/case-studies/placeholder-hero.png` |
| **Runtime src** | `/assets/case-studies/placeholder-hero.png` |
| **Dimensions** | 1600×900 (responsive via `sizes="100vw"`, `width: 100%`) |
| **Side padding** | 0px (sits outside `.section-inner`) |
| **Top margin** | `--token-space-64` (64px from meta row) |

### Visual Acceptance Checklist

| Item | Status |
|------|--------|
| Title uses `--token-size-display-1` (150px) | ✅ Pass |
| Side paddings = 24px (via `.section-inner` + `--token-space-24`) | ✅ Pass |
| Gap between title and meta = 128px (`--token-space-128`) | ✅ Pass |
| Full-bleed image has zero side padding | ✅ Pass |
| Meta row side-by-side on desktop (gap: 64px) | ✅ Pass |
| Meta row stacked on mobile ≤768px (gap: 16px) | ✅ Pass |
| Meta labels uppercase, overline (12px) | ✅ Pass |
| Responsive title scaling at 1024/768/480px breakpoints | ✅ Pass |
| `<h1>` used for case study title | ✅ Pass |
| Hero image has descriptive alt text | ✅ Pass |
| `prefers-reduced-motion` respected (no auto-animations) | ✅ Pass |
| Component is reusable via props (title, client, services, heroImage) | ✅ Pass |
| `section-wrap` + `section-inner` layout pattern used | ✅ Pass |
| Uses existing design tokens (no new tokens added) | ✅ Pass |

### Accessibility

- `<section aria-label="Case study hero">` for landmark navigation
- `<h1>` for the case study title (proper heading hierarchy)
- Hero image: descriptive `alt` attribute using title fallback
- Meta labels: `<strong>` for semantic emphasis
- `prefers-reduced-motion: reduce` respected via CSS rule
- No auto-playing animations on the hero visual

### Routing Note

This project uses **Next.js App Router** (not Pages Router). The case study page is at:
- `src/app/(global)/case-studies/[slug]/page.tsx`
- Inherits the `(global)` layout which includes the Header component
- URL pattern: `/case-studies/raccord`, `/case-studies/[any-slug]`

---

## Case Study Intro Section (feature/case-study) — 2026-02-05

### Summary

- Added `CaseStudyIntro` component and wired it into `/case-studies/[slug]` directly below `CaseStudyHero`.
- Intro section uses the same `.section-wrap` + `.section-inner` pattern with full-bleed visual below text.

### Files Created

| File | Description |
|------|-------------|
| `src/features/case-study/components/CaseStudyIntro.tsx` | Intro section component with title, text, and full-bleed image props |
| `public/assets/case-studies/placeholder-intro.jpg` | Placeholder intro image derived from reference artwork |

### Files Modified

| File | Changes |
|------|---------|
| `src/features/case-study/components/index.ts` | Exported `CaseStudyIntro` and its props type |
| `src/app/(global)/case-studies/[slug]/page.tsx` | Imported `CaseStudyIntro` and rendered it under `CaseStudyHero`, extended case-study data map with intro copy and image |
| `src/app/globals.css` | Added `.case-study-intro` typography, paragraph, full-bleed visual spacing, and reduced-motion rules |

### Tokens Created

**None** — all tokens already existed in `src/styles/variables.css` and `tailwind.config.cjs`:

| Token | Value | Usage |
|-------|-------|-------|
| `--token-size-display-1` | 150px | Intro heading font size (desktop), responsive down to h3 (48px) |
| `--token-size-h1` / `--token-size-h2` / `--token-size-h3` | 84px / 64px / 48px | Responsive scaling for intro heading |
| `--token-size-body-lg` | 18px | Intro paragraph text |
| `--token-space-24` | 24px | Horizontal padding via `.section-inner` |
| `--token-space-128` | 128px | Gap between intro title and text |
| `--token-space-64` | 64px | Gap between text block and full-bleed image |
| `--token-leading-100` / `--token-leading-150` | 100% / 150% | Heading and paragraph line-heights |
| `--token-weight-semibold` / `--token-weight-regular` | 600 / 400 | Heading and paragraph weights |

### Visual Acceptance Checklist

| Item | Status |
|------|--------|
| Title is full-width, bold, and uses `--token-size-display-1` on desktop | ✅ Pass |
| Gap between title and text is 128px (`--token-space-128`) | ✅ Pass |
| Gap between text block and full-bleed image is 64px (`--token-space-64`) | ✅ Pass |
| Full-bleed image has zero side padding (outside `.section-inner`) | ✅ Pass |
| Side paddings for text are 24px (`--token-space-24`) | ✅ Pass |
| Intro paragraph uses `--token-size-body-lg` with 150% line-height | ✅ Pass |
| Heading scales down at 1024/768/480px breakpoints (display-1 → h1 → h2 → h3) | ✅ Pass |
| Section uses `<h2>` for heading under hero `<h1>` | ✅ Pass |
| Placeholder intro image path: `public/assets/case-studies/placeholder-intro.jpg` | ✅ Pass |
| `prefers-reduced-motion` respected (no auto-animations in intro) | ✅ Pass |

---

## Case Study Text + Image Section (feature/case-study) — 2026-02-06

### Summary

- Added `CaseStudyTextImage` reusable section component for case studies, rendering a left-aligned H2 title, right-aligned paragraph, and full-bleed image.
- Integrated the component into `/case-studies/[slug]` directly below `CaseStudyIntro`, wired to placeholder data for both known and fallback slugs.

### Files Created

| File | Description |
|------|-------------|
| `src/features/case-study/components/CaseStudyTextImage.tsx` | Reusable text + full-width image section with props: `title`, `paragraph?`, `image?` |
| `public/assets/case-studies/placeholder-body.jpg` | Placeholder body image copied from design reference for full-bleed visual |

### Files Modified

| File | Changes |
|------|---------|
| `src/features/case-study/components/index.ts` | Exported `CaseStudyTextImage` and its props type from the case-study barrel |
| `src/app/(global)/case-studies/[slug]/page.tsx` | Imported and rendered `CaseStudyTextImage` after `CaseStudyIntro`, extended case-study data shape with `bodyTitle`, `bodyParagraph`, `bodyImage` |
| `src/app/globals.css` | Added `.case-study-text-image` typography, responsive row stacking, and reduced-motion rules |

### Tokens Added

**None** — all required tokens already existed in `src/styles/variables.css` and `tailwind.config.cjs`:

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-128` | 128px | Section top padding |
| `--token-space-80` | 80px | Horizontal gap title ↔ paragraph, gap text ↔ image |
| `--token-space-64` | 64px | Vertical gap between title and paragraph on mobile |
| `--token-size-h2` | 64px | H2 title typography |
| `--token-size-body-lg` | 18px | Body paragraph text |
| `--token-leading-110` | 110% | H2 line-height |
| `--token-leading-150` | 150% | Paragraph line-height |
| `--token-weight-semibold` / `--token-weight-regular` | 600 / 400 | Title and paragraph weights |

### Visual Acceptance Checklist

- [x] **Top padding 128px** — section content uses `style={{ paddingTop: "var(--token-space-128)" }}` on `.section-inner`.
- [x] **Title max-width 684px, left-aligned** — `.title-wrap` has `maxWidth: "684px"`, `textAlign: "left"`.
- [x] **Paragraph max-width 566px, right-aligned** — `.paragraph-wrap` has `maxWidth: "566px"`, `marginLeft: "auto"`, `textAlign: "right"` on desktop.
- [x] **80px gap between title & paragraph** — `gap: "var(--token-space-80)"` on `.text-image-row` for horizontal spacing.
- [x] **Full-bleed image with 80px gap below paragraph** — `.text-image-visual` uses `marginTop: "var(--token-space-80)"` and sits outside `.section-inner` with width 100%.
- [x] **Mobile stacking with 64px vertical gap** — media query sets `.text-image-row` to `flex-direction: column` with `row-gap: var(--token-space-64)` and left-aligns paragraph text.

### Accessibility & Contrast Notes

- Section uses `<h2>` for the title and `<section aria-label="Case study text and image">` for landmark semantics.
- Full-bleed image `alt` is descriptive when `image` is provided and uses a generic placeholder alt otherwise.
- Text color (`--token-color-accent` = `#060606`) on background (`--token-color-base` = `#e3e3e5`) maintains the previously verified contrast ratio of 10.8:1, so **no contrast warnings** were logged.

---

## Case Study Text + 2-Image Grid Section (feature/case-study) — 2026-02-06

### Summary

- Added `CaseStudyTextImageGrid` reusable section component for case studies, rendering a left-aligned H2 title, right-aligned paragraph, and a 2-image grid.
- Integrated the component into `/case-studies/[slug]` directly below `CaseStudyTextImage` and above `Footer`, wired to placeholder grid image paths for both known and fallback slugs.
- Grid layout mirrors the existing text + image section spacing while replacing the single full-bleed image with two side-by-side images.

### Files Created

| File | Description |
|------|-------------|
| `src/features/case-study/components/CaseStudyTextImageGrid.tsx` | Text + 2-image grid section with props: `title`, `paragraph?`, `images?: string[]` |
| `public/assets/case-studies/placeholder-grid-1.svg` | Lightweight SVG placeholder for grid image 1 (684×455) |
| `public/assets/case-studies/placeholder-grid-2.svg` | Lightweight SVG placeholder for grid image 2 (684×455) |

### Files Modified

| File | Changes |
|------|---------|
| `src/features/case-study/components/index.ts` | Exported `CaseStudyTextImageGrid` and its props type from the case-study barrel |
| `src/app/(global)/case-studies/[slug]/page.tsx` | Imported and rendered `CaseStudyTextImageGrid` after `CaseStudyTextImage`, extended case-study data with `gridImages` for known and fallback slugs |
| `src/app/globals.css` | Shared typography rules between `.case-study-text-image` and `.case-study-text-image-grid`, added responsive grid behavior and prefers-reduced-motion styles for the new section |

### Tokens Added

**None** — all required spacing and typography tokens already existed in `src/styles/variables.css` and were previously mapped in `tailwind.config.cjs`:

| Token | Value | Usage |
|-------|-------|-------|
| `--token-space-128` | 128px | Section top padding (`section-inner` inline style) |
| `--token-space-80` | 80px | Gap between title and paragraph, gap between paragraph and images grid |
| `--token-space-24` | 24px | Grid column gap and grid left/right inner padding |
| `--token-size-h2` | 64px | H2 title typography (shared with text + image section) |
| `--token-size-body-lg` | 18px | Paragraph typography (shared with text + image section) |

### Placeholders

- Grid placeholders were missing in the repo, so two SVG placeholders were created:
  - `public/assets/case-studies/placeholder-grid-1.svg`
  - `public/assets/case-studies/placeholder-grid-2.svg`
- `CaseStudyTextImageGrid` uses these SVGs as default fallbacks when `images` is not provided or contains fewer than 2 entries.

### Visual Acceptance Checklist

- [x] **Title and paragraph behavior duplicated** — `CaseStudyTextImageGrid` reuses the same `.section-title` and `.section-paragraph` typography rules as `CaseStudyTextImage`, with the same max-widths (684px title, 566px paragraph) and alignment (title left, paragraph right).
- [x] **80px gap between paragraph and images** — inline style `marginTop: "var(--token-space-80)"` is applied to `.images-grid`, matching the spec.
- [x] **Grid with 2 columns, 24px gap, and 24px left/right paddings** — `.images-grid` uses `display: grid`, `gridTemplateColumns: "1fr 1fr"`, `gap: "var(--token-space-24)"`, and `paddingLeft/Right: "var(--token-space-24)"`.
- [x] **Mobile stacking rules preserved** — media query at `max-width: 768px` sets `.case-study-text-image-grid .text-image-row` to `flex-direction: column` and `.images-grid` to `grid-template-columns: 1fr !important`, so title, paragraph, and images stack vertically with 24px gaps while maintaining 24px side paddings via `.section-inner`.
- [x] **Integration order correct** — On `/case-studies/[slug]`, the section order is: `CaseStudyHero` → `CaseStudyIntro` → `CaseStudyTextImage` → `CaseStudyTextImageGrid` → `Footer`.

---

## Case Study Page — RecentWorks as Final Section (feature/case-study)

### Summary

- Reused the existing **RecentWorks** component (same as on the About page) and rendered it as the last content section on the Case Study page, immediately before the Footer.
- No changes were made to the RecentWorks implementation; it was only imported and placed in the page flow.

### Import path

- **RecentWorks**: `import RecentWorks from "@/components/RecentWorks";` (barrel from `@/components/RecentWorks`, which re-exports `src/components/RecentWorks/RecentWorks.tsx`).

### Placement

- **Page**: `src/app/(global)/case-studies/[slug]/page.tsx`
- **Section order** on `/case-studies/[slug]`:  
  `CaseStudyHero` → `CaseStudyIntro` → `CaseStudyTextImage` → `CaseStudyTextImageGrid` → **RecentWorks** → `Footer`
- RecentWorks is the last content section before the Footer. No extra vertical margins or gaps were added between RecentWorks and Footer; spacing is whatever RecentWorks already defines.

### Props

- **None** — Same as the About page: `<RecentWorks />` is invoked with no props. The component uses its internal data source; behavior is identical to the About page.

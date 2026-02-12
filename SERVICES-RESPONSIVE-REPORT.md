# Services Section — Responsive Preparation Report

**Branch:** `feature/responsive-services`  
**Base branch:** `feature/responsive-works`  
**HEAD commit:** `3b1ffcf22c8b9edb89c4f7961eed3b0223451786`  
**Date:** 2025-02-12  

---

## 1. Branch & safety checks

| Check | Result |
|-------|--------|
| Working tree before branch | Clean |
| New branch | `feature/responsive-services` (created from `feature/responsive-works`) |
| `npm run lint` | Pass (0 errors; 17 existing warnings in other files, none in Services) |
| `npm run build` | Pass |

---

## 2. Files involved (Services section only)

| File | Role |
|------|------|
| `src/components/Services/Services.tsx` | Section container: Title, list, Book a call CTA. Owns vertical padding and title→container gap. |
| `src/components/Services/ServiceItem.tsx` | Single service row: dot, title, description, image. Active/inactive states; uses `md:flex-row` for active layout. |
| `src/components/Services/index.ts` | Re-exports default and types. |
| `src/app/(global)/page.tsx` | Renders Services inside `#services` with `.section-wrap` / `.section-inner` and `--token-color-primary` background. |

**Not modified (out of scope):** Hero, Works, Header, Footer, typography tokens, spacing/size token definitions, `globals.css` (except any future Services-only rules if needed).

---

## 3. Layout structure

- **Page level:**  
  `<section id="services" className="section-wrap">` → `<div className="section-inner">` → `<Services />`.

- **Services.tsx:**
  - `motion.section`: flex column, full width.  
  - **Padding:** `paddingTop: var(--token-space-24)`, `paddingBottom: var(--token-space-192)` (no horizontal padding; that comes from `.section-inner`).
  - **Title:** Reusable `<Title>` (index, label, heading).
  - **Gap title → content:** `marginTop: var(--token-space-256)` on `.services-container`.
  - **List:** `.services-list` — vertical stack of `ServiceItem`s, full width.
  - **Actions:** `.services-actions` — `marginTop: var(--token-space-48)`, flex justify-end, `<BookCallButton>`.

- **ServiceItem.tsx:**
  - **Inactive:** Row with dot (24px) + title only; `paddingTop/Bottom: var(--token-space-24)`, `borderBottom: 1px solid var(--token-color-accent)` (except last).
  - **Active:**  
    - Container: `flex flex-col md:flex-row`, gap `var(--token-space-24)`.  
    - Left: text block (dot, title, description) with gap 24px; description `maxWidth: 320px`.  
    - Right: image figure `maxWidth: 533px`, `aspectRatio: 533/353`.  
  - **Image:** Next.js `Image`, `sizes="(max-width: 768px) 100vw, 533px"`.

Horizontal padding for the section comes from **global** `.section-inner` (see below).

---

## 4. Current breakpoint behavior

- **variables.css**
  - **Tablet:** `@media (min-width: 768px)` — typography tokens step up.
  - **Desktop:** `@media (min-width: 1024px)` — typography tokens step up again.
  - **Tablet down:** `@media (max-width: 1023px)` — spacing tokens reduced (e.g. `--token-space-256` → 192px, `--token-space-192` → 160px).
  - **Mobile:** `@media (max-width: 767px)` — spacing tokens reduced further (e.g. `--token-space-256` → 160px, `--token-space-192` → 128px).

- **globals.css**
  - **Mobile only:** `@media (max-width: 767px)` — `.section-inner` gets `padding-left/right: var(--token-space-8)`. So Services section already gets 8px side padding on mobile from the wrapper; no Services-specific override.

- **ServiceItem**
  - **Tailwind:** Active state uses `md:flex-row` (≥768px row, <768px column). No other breakpoint-specific classes in Services components.

- **Result:**  
  - **Desktop (≥1024px):** Full spacing (e.g. 256px title gap, 192px bottom), active row = text left + image right.  
  - **768–1023px:** Same layout; spacing tokens use tablet values.  
  - **≤767px:** Smaller spacing tokens; `.section-inner` 8px sides; active state stacks (column). Image uses 100vw in `sizes`.

---

## 5. Token usage (Services only)

- **Spacing (existing tokens only):**  
  `--token-space-24`, `--token-space-48`, `--token-space-192`, `--token-space-256`.
- **Colors:**  
  `--token-color-primary` (section background, set on page), `--token-color-accent` (borders, dot).
- **Typography (no changes):**  
  `--token-font-family-base`, `--token-size-h3`, `--token-size-body-lg`, `--token-weight-semibold`, `--token-leading-110`, `--token-leading-150`.
- **Sizes:**  
  Dot and layout use `--token-space-24`; no font token changes.

All of these already respond via `variables.css` at ≤767px and ≤1023px; no new token definitions needed for responsive work.

---

## 6. Rules for implementation (reminder)

- Mobile: ≤767px  
- Tablet: 768–1023px  
- Desktop: ≥1024px  
- Use only existing spacing/size tokens; do not change font tokens.  
- Keep desktop layout exactly as is.  
- Scope limited to Services section only (no Hero, Works, Header, Footer, or global token edits).

---

## 7. Deliverable summary

| Item | Value |
|------|--------|
| **Branch name** | `feature/responsive-services` |
| **Base branch** | `feature/responsive-works` |
| **HEAD commit SHA** | `3b1ffcf22c8b9edb89c4f7961eed3b0223451786` |
| **Services-related files** | `src/components/Services/Services.tsx`, `src/components/Services/ServiceItem.tsx`, `src/components/Services/index.ts`; integration in `src/app/(global)/page.tsx` (section wrapper only) |
| **Ready for responsive implementation** | Yes — branch created, safety checks passed, structure and tokens documented. |

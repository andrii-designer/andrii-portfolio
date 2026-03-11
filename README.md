# Andrii Portfolio

Next.js portfolio with design tokens extracted from existing style files.

## Token sources

- **Colors & typography:** `src/styles/colors and fonts.scss`  
  Defines `--token-color-*`, `--token-font-family-base`, `--token-size-*`, `--token-leading-*`, `--token-weight-*`.
- **Spacing:** `src/styles/spacing and colors.css`  
  Defines `--token-space-*` only (colors/fonts in this file are ignored).

See `extraction-report.md` for the full list of tokens and any warnings.

## Re-run token extraction

From the project root:

```bash
npm run extract-tokens
```

This reads `src/styles/colors and fonts.scss` and `src/styles/spacing and colors.css`, then overwrites `src/styles/variables.css` and prints a short report.  
Parsing rules and file path order are documented in `scripts/extract-tokens.js`.

## Dev server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

**If the dev server fails:** `npm run build` has been verified. If you see a system error such as `uv_interface_addresses` or "Unknown system error 1", it is likely an environment/sandbox restriction. Run `npm run dev` in your normal terminal outside restricted environments. If you see other errors, check that Node and npm are up to date and that no other process is using port 3000.

## Other scripts

- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Asset optimization

### Current strategy — Next.js + Vercel Edge (zero config)

All images use `next/image` which works together with Vercel's Edge Image
Optimizer. No pre-generation or extra build steps are required:

| Feature | Config |
|---|---|
| Modern formats | AVIF → WebP → JPEG/PNG (set in `next.config.ts`) |
| Responsive srcsets | `deviceSizes` + `imageSizes` in `next.config.ts` |
| Quality | `85` (down from 100 — imperceptible difference, ~40–60% smaller) |
| CDN cache TTL | 1 year (`minimumCacheTTL: 31536000`) |
| LCP images | `priority` prop on hero images (prefetched) |
| Below-fold images | `loading="lazy"` (deferred decode + fetch) |
| `sizes` strings | Centralized in `src/lib/imageSizes.ts` |

### Video preload strategy

| Location | `preload` | Reason |
|---|---|---|
| Hero showreel (autoplay) | `auto` | LCP — load immediately |
| Case-study hero video | `metadata` | Autoplay, but below-fold |
| Case-study inline videos | `metadata` | Scroll-triggered sections |
| Book-a-call copies | `none` | Synced via `SyncShowreelVideos`; master already loaded |
| Full-bleed video section | `none` | Already set; synced slave |

### How to regenerate optimized assets (future upgrade)

If you need fully pre-generated AVIF/WebP/video transcodes instead of relying
on Vercel's on-demand optimizer, run:

```bash
# Opt in by setting the env var
ASSETS_OPTIMIZE=true npm run optimize

# Or individually:
npm run optimize:images
npm run optimize:videos
```

See `scripts/optimize-images.js` and `scripts/optimize-videos.js` for the
full upgrade path using `sharp` (images) and `fluent-ffmpeg` (videos).

**Recommended quality settings** (conservative, imperceptible loss):
- AVIF: quality `80`
- WebP: quality `85`
- JPEG: quality `85`
- PNG/SVG: lossless (keep as-is)

**Recommended video bitrates:**
- 1080p H.264: 4–8 Mbps
- 720p H.264: 1.5–3 Mbps
- 360p H.264: 0.4–0.8 Mbps

### Rollback steps

If quality regression is observed after changing quality settings:

1. Revert `qualities` in `next.config.ts` back to `[100, 75]` — Vercel Edge
   will serve uncompressed originals again within one CDN TTL cycle.
2. To force-expire the Vercel image cache: **Vercel Dashboard → Project →
   Settings → Image Optimization → Purge Cache**.
3. Revert `quality` props in individual components from `85` back to `100`
   if spot-checking reveals specific images with artifacts.

## Figma workflow (later)

Do not parse the full Figma file. When you have a single Figma page URL or exact page name, create a feature branch `feature/figma-<page-name-kebab>`, parse only that page, and generate the section using the existing tokens.

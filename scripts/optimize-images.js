#!/usr/bin/env node
/**
 * optimize-images.js
 *
 * CURRENT STRATEGY: Next.js + Vercel Edge on-demand optimization
 * ---------------------------------------------------------------
 * This project relies on Next.js Image Optimization (next/image) combined
 * with Vercel's Edge Image Optimizer. No pre-generation is needed:
 *  - Vercel automatically serves AVIF/WebP based on the Accept header.
 *  - Optimized variants are cached at the CDN edge with a 1-year TTL
 *    (configured via `minimumCacheTTL` in next.config.ts).
 *  - Responsive `srcset` candidates are generated from `deviceSizes` and
 *    `imageSizes` defined in next.config.ts.
 *  - All `next/image` usages in components already carry correct `sizes`
 *    attributes to match layout breakpoints.
 *
 * HOW TO UPGRADE TO PRE-GENERATED ASSETS (optional)
 * --------------------------------------------------
 * If you outgrow Vercel's optimizer or need fully static CDN delivery,
 * install the following devDependencies and implement the pipeline below:
 *
 *   npm install --save-dev sharp globby
 *
 * Then implement:
 *  1. Walk /public/assets/ with globby.
 *  2. For each image use sharp to generate AVIF (quality 80), WebP (quality 85),
 *     JPEG fallback (quality 85) at widths [320,480,768,1024,1366,1600,1920].
 *  3. Output to /public/assets/optimized/<path>/<name>.<width>.<format>.
 *  4. Write /public/assets/optimized/manifest.json mapping originals → variants.
 *  5. Update components to read the manifest via lib/imageSizes.ts or a new
 *     lib/getOptimizedImage.ts helper.
 *
 * QUALITY SETTINGS (conservative, imperceptible loss)
 *  - AVIF:  quality 80
 *  - WebP:  quality 85
 *  - JPEG:  quality 85
 *  - PNG:   keep lossless (logos, illustrations); use svgo for SVGs.
 *
 * Run this script only when ASSETS_OPTIMIZE=true to avoid long CI runs:
 *   ASSETS_OPTIMIZE=true npm run optimize:images
 */

console.log(
  "[optimize-images] Using Next.js + Vercel Edge on-demand optimization.\n" +
    "No pre-generation needed. See script comments for upgrade path.\n" +
    "Set ASSETS_OPTIMIZE=true and implement sharp pipeline to switch modes.",
);

#!/usr/bin/env node
/**
 * optimize-videos.js
 *
 * CURRENT STATE: Videos are served directly from /public/assets/
 * ---------------------------------------------------------------
 * The site currently has two video assets:
 *  - /public/assets/showreel2026.mp4  (hero + book-a-call sections, ~autoplay/muted)
 *  - /public/assets/services.mp4      (if referenced)
 *  - /public/assets/case-studies/*.mp4 (case study inline videos)
 *
 * All video elements use:
 *  - `preload="auto"`   — hero autoplay (starts loading immediately)
 *  - `preload="metadata"` — case study inline videos (loads metadata only)
 *  - `preload="none"`   — below-fold book-a-call copies (deferred until sync)
 *
 * RECOMMENDATION FOR LARGE VIDEOS
 * --------------------------------
 * If the showreel or case-study videos exceed ~10 MB, consider offloading to a
 * streaming service that provides adaptive bitrate (ABR) and analytics:
 *
 *  - Mux (https://mux.com) — developer-friendly, per-minute pricing,
 *    HLS + DASH + WebM, automatic thumbnail generation.
 *  - Cloudflare Stream (https://cloudflare.com/products/cloudflare-stream) —
 *    flat pricing, global CDN, integrates with Cloudflare Pages/Workers.
 *  - Bunny Stream (https://bunny.net/stream) — affordable, pull-zone CDN.
 *
 * HOW TO UPGRADE TO PRE-TRANSCODED ASSETS (optional)
 * ---------------------------------------------------
 * Install devDependencies:
 *   npm install --save-dev fluent-ffmpeg @ffmpeg-installer/ffmpeg
 *
 * Implement pipeline:
 *  1. Walk /public/assets/originals/videos/ with globby.
 *  2. For each MP4 use fluent-ffmpeg to produce:
 *     - H.264 MP4 at 360p (600 kbps), 720p (2200 kbps), 1080p (5000 kbps).
 *     - VP9 WebM at same resolutions (similar bitrates).
 *     - Poster JPEG at 1280px wide.
 *  3. Output to /public/assets/optimized/videos/<name>/<name>-<height>.(mp4|webm).
 *  4. Write /public/assets/optimized/videos/manifest.json listing sources.
 *  5. Update video components to use <source> tags from manifest.
 *
 * QUALITY TARGETS
 *  - 1080p H.264: 4–8 Mbps  (CRF 23 or explicit bitrate)
 *  - 720p  H.264: 1.5–3 Mbps
 *  - 360p  H.264: 0.4–0.8 Mbps
 *  - Reduce bitrate by 20% and recheck if strict size limits apply.
 *
 * Run only when ASSETS_OPTIMIZE=true:
 *   ASSETS_OPTIMIZE=true npm run optimize:videos
 */

console.log(
  "[optimize-videos] Videos are served directly from /public/assets/.\n" +
    "See script comments for streaming service recommendations and upgrade path.\n" +
    "Set ASSETS_OPTIMIZE=true and implement ffmpeg pipeline to switch modes.",
);

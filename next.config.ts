import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first, WebP as fallback — Vercel Edge handles transcoding on demand
    formats: ["image/avif", "image/webp"],
    // Widths used when generating responsive srcsets for fill/layout images
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Widths for fixed-size images (next/image with explicit width prop)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 533, 684],
    // Quality levels the optimizer will produce; 85 is the sweet-spot for
    // AVIF/WebP — perceptibly lossless at a fraction of the file size.
    qualities: [85, 75],
    // Minimum cache TTL for optimized images on Vercel Edge (1 year)
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;

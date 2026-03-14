import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PreloaderProvider } from "@/components/Preloader/Preloader";
import { FirstScrollProvider } from "@/contexts/FirstScrollContext";
import { FirstInteractionProvider } from "@/contexts/FirstInteractionContext";
import "./globals.css";

/**
 * Manrope font — loaded via next/font/google
 * Weights: 400 (regular), 600 (semibold) as per Figma design
 * CSS variable: --font-manrope
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andrii Portfolio",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        {/* Preconnect + preload Vimeo for faster showreel load on homepage */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="" />
        <link
          rel="preload"
          href="https://player.vimeo.com/api/player.js"
          as="script"
        />
        <link rel="preload" href="/hero-assets/logo.svg" as="image" />
      </head>
      <body className={manrope.className}>
        <PreloaderProvider>
          <FirstScrollProvider>
            <FirstInteractionProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </FirstInteractionProvider>
          </FirstScrollProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}

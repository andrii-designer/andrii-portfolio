import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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
      <body className={manrope.className}>{children}</body>
    </html>
  );
}

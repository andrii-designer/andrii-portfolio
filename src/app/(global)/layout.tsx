import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Global layout — matches Figma hero-section container (2228:4742)
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-16 (pt), --token-space-24 (px for horizontal padding)
 * - Max width: 1440px (from Figma frame)
 *
 * Figma verification:
 * - Container horizontal padding: 24px (left and right)
 * - Top padding: 16px
 * - Gap header → content: 48px
 */
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary font-base text-accent">
      {/* Centered container with exact 24px horizontal padding matching Figma */}
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "1440px",
          paddingLeft: "var(--token-space-24)",
          paddingRight: "var(--token-space-24)",
          paddingTop: "var(--token-space-16)",
        }}
      >
        <Header />
      </div>
      {/* Main content area with same centering and padding */}
      <main
        className="mx-auto w-full"
        style={{
          maxWidth: "1440px",
          paddingLeft: "var(--token-space-24)",
          paddingRight: "var(--token-space-24)",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

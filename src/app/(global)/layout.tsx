import Header from "@/components/Header/Header";

/**
 * Global layout — matches Figma hero-section container (2228:4742)
 * 
 * Layout pattern:
 * - Uses .section-wrap for full-bleed sections (100% width)
 * - Uses .section-inner for horizontal padding (24px via --token-space-24)
 * - Individual page sections use the .section-wrap + .section-inner pattern
 * 
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-16 (pt), --token-space-24 (horizontal padding)
 *
 * Figma verification:
 * - Container horizontal padding: 24px (left and right)
 * - Top padding: 16px
 * - Gap header → content: 64px (--token-space-64)
 * 
 * Note: Footer is rendered in individual pages (e.g., page.tsx) rather than
 * in the global layout to allow per-page control over footer placement.
 */
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary font-base text-accent">
      {/* Header uses its own section-wrap + section-inner pattern internally */}
      <Header />
      
      {/* Main content area — pages use .section-wrap + .section-inner pattern */}
      {/* Footer is rendered within individual pages as the last section */}
      {/* paddingTop clears fixed header (uses --token-space-64 to match header height) */}
      <main style={{ paddingTop: "var(--token-space-64)" }}>
        {children}
      </main>
    </div>
  );
}

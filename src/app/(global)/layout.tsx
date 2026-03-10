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
    <div className="min-h-screen bg-base font-base text-accent">
      {/* Header uses its own section-wrap + section-inner pattern internally */}
      <Header />
      
      {/* Main content area — pages use .section-wrap + .section-inner pattern */}
      {/* Footer is rendered within individual pages as the last section */}
      {/* paddingTop clears fixed header: header min-height (size-64) + its top padding (space-24 for safe clearance) */}
      <main
        style={{
          paddingTop: "calc(var(--token-size-64) + var(--token-space-24))",
          // Fill the header clearance gap with primary color, then fall back
          // to base for the rest of the page. This avoids giving the header
          // its own background while ensuring the strip behind it matches
          // the hero background on the home page.
          background: `
            linear-gradient(
              to bottom,
              var(--token-color-primary) 0,
              var(--token-color-primary) calc(var(--token-size-64) + var(--token-space-24)),
              var(--token-color-base) calc(var(--token-size-64) + var(--token-space-24)),
              var(--token-color-base) 100%
            )
          `,
        }}
      >
        {children}
      </main>
    </div>
  );
}

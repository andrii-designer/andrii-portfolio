import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Global layout — matches Figma hero-section container (2228:4742)
 * Tokens used:
 * - Background: --token-color-primary (#d2d2d6)
 * - Spacing: --token-space-16 (pt), --token-space-24 (px)
 */
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary font-base text-accent">
      <div className="mx-auto max-w-[1440px] px-24 pt-16">
        <Header />
      </div>
      <main className="mx-auto max-w-[1440px]">{children}</main>
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Global layout — imports globals.css via root layout.
 * Use --token-* for layout spacing (e.g. var(--token-space-*)).
 */
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

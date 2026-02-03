import Hero from "@/components/Hero/Hero";

/**
 * Home page — Hero from Figma.
 */
export default function HomePage() {
  return (
    <div className="bg-base text-accent font-base">
      <Hero
        title="Product designer & frontend engineer"
        subtitle="Designing and building calm, thoughtful interfaces for the web."
        cta={{ text: "View projects", href: "/projects" }}
        media={{ type: "image", src: "/globe.svg" }}
      />
    </div>
  );
}

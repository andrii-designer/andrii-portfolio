import { CaseStudyHero } from "@/features/case-study/components";
import Footer from "@/components/Footer";

/**
 * Case Study detail page — /case-studies/[slug]
 *
 * Currently renders the CaseStudyHero section with placeholder data.
 * Additional sections (overview, process, gallery, results, etc.) will be
 * added in subsequent feature branches.
 *
 * Layout:
 * - Inherits (global) layout which includes Header + main wrapper
 * - CaseStudyHero as first section (full-bleed hero image)
 * - Placeholder content section
 * - Footer as last section
 */
type Props = { params: Promise<{ slug: string }> };

/**
 * Placeholder case-study data keyed by slug.
 * Replace with CMS / data layer when available.
 */
const caseStudies: Record<
  string,
  { title: string; client: string; services: string[]; heroImage: string }
> = {
  raccord: {
    title: "Raccord",
    client: "Raccord",
    services: ["Product design", "3D motion"],
    heroImage: "/assets/case-studies/placeholder-hero.png",
  },
};

/** Fallback data when slug is not found in the map */
const fallback = {
  title: "Case Study",
  client: "Client",
  services: ["Design"],
  heroImage: "/assets/case-studies/placeholder-hero.png",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const data = caseStudies[slug] ?? { ...fallback, title: slug };

  return (
    <>
      {/* Hero Section — CaseStudyHero component */}
      <CaseStudyHero
        title={data.title}
        client={data.client}
        services={data.services}
        heroImage={data.heroImage}
      />

      {/* Placeholder for upcoming case study sections */}
      <section
        className="section-wrap"
        style={{
          paddingTop: "var(--token-space-96)",
          paddingBottom: "var(--token-space-96)",
        }}
      >
        <div className="section-inner">
          <p
            style={{
              fontSize: "var(--token-size-body-lg)",
              fontWeight: "var(--token-weight-regular)",
              lineHeight: "var(--token-leading-150)",
              color: "var(--token-color-accent)",
            }}
          >
            Additional case study sections for &ldquo;{data.title}&rdquo; will
            be implemented in upcoming branches.
          </p>
        </div>
      </section>

      {/* Footer Section — last section on page */}
      <Footer />
    </>
  );
}

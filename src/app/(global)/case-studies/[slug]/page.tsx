import {
  CaseStudyHero,
  CaseStudyIntro,
  CaseStudyTextImage,
  CaseStudyTextImageGrid,
} from "@/features/case-study/components";
import RecentWorks from "@/components/RecentWorks";
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
  {
    title: string;
    client: string;
    services: string[];
    heroImage: string;
    introTitle: string;
    introText: string;
    introImage: string;
    bodyTitle?: string;
    bodyParagraph?: string;
    bodyImage?: string;
    gridImages?: string[];
  }
> = {
  raccord: {
    title: "Raccord",
    client: "Raccord",
    services: ["Product design", "3D motion"],
    heroImage: "/assets/case-studies/placeholder-hero.png",
    introTitle:
      "Unify all your real estate data for streamlined, real-time investment",
    introText:
      "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.",
    introImage: "/assets/case-studies/placeholder-intro.jpg",
    bodyTitle: "Unify all your real estate data for streamlined.",
    bodyParagraph:
      "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.",
    bodyImage: "/assets/case-studies/placeholder-body.jpg",
    gridImages: [
      "/assets/case-studies/placeholder-grid-1.svg",
      "/assets/case-studies/placeholder-grid-2.svg",
    ],
  },
};

/** Fallback data when slug is not found in the map */
const fallback = {
  title: "Case Study",
  client: "Client",
  services: ["Design"],
  heroImage: "/assets/case-studies/placeholder-hero.png",
  introTitle: "Case study intro",
  introText:
    "This is a placeholder case study intro section. Replace with project-specific copy explaining the problem, goals, and high-level solution once content is available.",
  introImage: "/assets/case-studies/placeholder-intro.jpg",
  bodyTitle: "Case study deep dive",
  bodyParagraph:
    "Use this section to go deeper into the problem, solution, or product experience. Once real content is ready, replace the placeholder copy with a focused narrative that explains how the design drives results.",
  bodyImage: "/assets/case-studies/placeholder-body.jpg",
  gridImages: [
    "/assets/case-studies/placeholder-grid-1.svg",
    "/assets/case-studies/placeholder-grid-2.svg",
  ],
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

      {/* Intro Section — directly below hero */}
      <CaseStudyIntro
        title={data.introTitle}
        text={data.introText}
        image={data.introImage}
      />

      {/* Text + Image body section — reusable component */}
      <CaseStudyTextImage
        title={data.bodyTitle ?? fallback.bodyTitle}
        paragraph={data.bodyParagraph ?? fallback.bodyParagraph}
        image={data.bodyImage ?? fallback.bodyImage}
      />

      {/* Text + 2-image grid variant — follows after text+image section */}
      <CaseStudyTextImageGrid
        title={data.bodyTitle ?? fallback.bodyTitle}
        paragraph={data.bodyParagraph ?? fallback.bodyParagraph}
        images={data.gridImages ?? fallback.gridImages}
      />

      {/* Recent Works — last content section above Footer */}
      <RecentWorks />

      {/* Footer Section — last section on page */}
      <Footer />
    </>
  );
}

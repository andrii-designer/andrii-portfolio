import {
  CaseStudyHero,
  CaseStudyIntro,
  CaseStudyTextImage,
  CaseStudyTextImageGrid,
  CaseStudyFullImage,
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
    heroVideo?: string;
    introTitle: string;
    introText: string;
    introImage: string;
    introVideo?: string;
    bodyTitle?: string;
    bodyParagraph?: string;
    bodyImage?: string;
    gridImages?: string[];
    gridHasText?: boolean;
    gridVideos?: string[];
  }
> = {
  raccord: {
    title: "Raccord",
    client: "Raccord",
    services: ["Product design", "3D motion"],
    heroImage: "/assets/case-studies/Raccord.png",
    heroVideo: "/assets/case-studies/raccord-section1.mp4",
    introTitle:
      "Unify all your real estate data for streamlined, real-time investment",
    introText:
      "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.",
    introImage: "/assets/case-studies/Raccord.png",
    introVideo: "/assets/case-studies/raccord-section2.mp4",
    bodyTitle: "Project tasks",
    bodyParagraph:
      "1. Increase dashboard engagement and personalisation\n2. Enhance data clarity\n3. Reduce time to insight\n\nThe part of the user flow I worked on:",
    bodyImage: "/assets/case-studies/raccord-section3.png",
    gridImages: [
      "/assets/case-studies/Raccord.png",
      "/assets/case-studies/Raccord.png",
    ],
    gridHasText: false,
    gridVideos: [
      "/assets/case-studies/raccord-section4-1.mp4",
      "/assets/case-studies/raccord-section4-2.mp4",
    ],
  },
  "x-pand": {
    title: "X-pand",
    client: "X-pand",
    services: ["Product design"],
    heroImage: "/assets/case-studies/X-Pand.png",
    introTitle: "Designing the X-pand product experience",
    introText:
      "A concept project exploring how X-pand can present complex product data in a simple, actionable way. The case focuses on a clear hierarchy, responsive layouts, and a flexible system that can grow with the product.",
    introImage: "/assets/case-studies/X-Pand.png",
    bodyTitle: "Scaling a product story with design systems.",
    bodyParagraph:
      "X-pand explores how consistent design systems can help teams move faster while keeping the experience cohesive. This case study shows how layout, typography, and interaction models scale across surfaces.",
    bodyImage: "/assets/case-studies/X-Pand.png",
    gridImages: [
      "/assets/case-studies/X-Pand.png",
      "/assets/case-studies/X-Pand.png",
    ],
  },
};

/** Fallback data when slug is not found in the map */
const fallback = {
  title: "Case Study",
  client: "Client",
  services: ["Design"],
  heroImage: "/assets/case-studies/placeholder-grid-1.svg",
  introTitle: "Case study intro",
  introText:
    "This is a placeholder case study intro section. Replace with project-specific copy explaining the problem, goals, and high-level solution once content is available.",
  introImage: "/assets/case-studies/placeholder-grid-2.svg",
  bodyTitle: "Case study deep dive",
  bodyParagraph:
    "Use this section to go deeper into the problem, solution, or product experience. Once real content is ready, replace the placeholder copy with a focused narrative that explains how the design drives results.",
  bodyImage: "/assets/case-studies/placeholder-grid-1.svg",
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
        heroVideo={data.heroVideo}
      />

      {/* Intro Section — directly below hero */}
      <CaseStudyIntro
        title={data.introTitle}
        text={data.introText}
        image={data.introImage}
        introVideo={data.introVideo}
      />

      {/* Text + Image body section — reusable component */}
      <CaseStudyTextImage
        title={data.bodyTitle ?? fallback.bodyTitle}
        paragraph={data.bodyParagraph ?? fallback.bodyParagraph}
        image={data.bodyImage ?? fallback.bodyImage}
      />

      {/* Text + 2-image grid variant — follows after text+image section */}
      <CaseStudyTextImageGrid
        title={data.gridHasText === false ? undefined : data.bodyTitle ?? fallback.bodyTitle}
        paragraph={
          data.gridHasText === false ? undefined : data.bodyParagraph ?? fallback.bodyParagraph
        }
        images={data.gridImages ?? fallback.gridImages}
        gridVideos={data.gridVideos}
      />

      {/* Problem/Solution section below grid — Raccord only */}
      {data.title === "Raccord" && (
        <CaseStudyTextImage
          title="Problem"
          paragraph="First‑time users land on a blank dashboard with no guidance."
          video="/assets/case-studies/raccord-section5.mp4"
          bottomTitle="Solution"
          bottomParagraph="Implemented a 4‑step onboarding wizard that lets users pick KPIs and import their first asset inline, so they arrive at a fully populated, personalized view on day one."
          duplicateTextBelow
        />
      )}

      {/* Full-width image section — Raccord only */}
      {data.title === "Raccord" && (
        <CaseStudyFullImage
          topImage="/assets/case-studies/raccord-section6.png"
          bottomImage="/assets/case-studies/raccord-section7.png"
        />
      )}

      {/* Second Problem/Solution section — Raccord only, placed after 2-image section */}
      {data.title === "Raccord" && (
        <CaseStudyTextImage
          title="Problem"
          paragraph="Customization controls are hidden and hard to discover."
          image="/assets/case-studies/raccord-section8.png"
          bottomTitle="Solution"
          bottomParagraph="Introduce a dedicated “Edit Mode” that reveals drag‑and‑drop handles and an “+ Add Widget” tile, making layout changes and new widget additions immediately obvious and accessible."
          duplicateTextBelow
        />
      )}

      {/* Single-image full-width section — Raccord only, placed after second Problem/Solution */}
      {data.title === "Raccord" && (
        <CaseStudyFullImage
          topImage="/assets/case-studies/raccord-section9.png"
        />
      )}

      {/* Third Problem/Solution section — Raccord only, placed after final full-width image */}
      {data.title === "Raccord" && (
        <CaseStudyTextImage
          title="Problem"
          paragraph="Chart settings are buried in menus with no live feedback."
          image="/assets/case-studies/raccord-section10.png"
          bottomTitle="Solution"
          bottomParagraph="When in the Edit mode there is a slide‑in configuration panel that shows a live preview of each tweak, so users can adjust chart types, axes, and filters in context and with confidence."
          duplicateTextBelow
        />
      )}

      {/* Final single-image full-width section — Raccord only */}
      {data.title === "Raccord" && (
        <CaseStudyFullImage
          topImage="/assets/case-studies/raccord-section11.png"
        />
      )}

      {/* Recent Works — last content section above Footer */}
      <RecentWorks />

      {/* Footer Section — last section on page */}
      <Footer />
    </>
  );
}

import {
  CaseStudyHero,
  CaseStudyIntro,
  CaseStudyTextImage,
  CaseStudyTextImageGrid,
  CaseStudyFullImage,
  CaseStudyProblemSolution,
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
    heroVideoPoster?: string;
    introTitle: string;
    introText: string;
    introImage: string;
    introVideo?: string;
    introVideoPoster?: string;
    bodyTitle?: string;
    bodyParagraph?: string;
    bodyImage?: string;
    gridImages?: string[];
    gridHasText?: boolean;
    gridVideos?: string[];
    gridVideoPosters?: string[];
    gridVideoAspectPadding?: string;
  }
> = {
  raccord: {
    title: "Raccord",
    client: "Raccord",
    services: ["Product design", "Branding", "3D motion", "2D motion"],
    heroImage: "/assets/case-studies/Raccord.png",
    heroVideo:
      "https://player.vimeo.com/video/1172613529?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0",
    heroVideoPoster: "/assets/images/thumbs/raccord-section1-thumb.webp",
    introTitle:
      "Unify all your real estate data for streamlined, real-time investment",
    introText:
      "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.",
    introImage: "/assets/case-studies/Raccord.png",
    introVideo:
      "https://player.vimeo.com/video/1172613563?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0",
    introVideoPoster: "/assets/images/thumbs/raccord-section2-thumb.webp",
    bodyTitle: "Project tasks",
    bodyParagraph:
      "1. Create a unique branding and visual experience including motion.\n2. Increase dashboard engagement and personalisation.\n3. Enhance data clarity.\n4. Reduce time to insight.\n\nThe part of the user flow I worked on:",
    bodyImage: "/assets/case-studies/raccord-section3.png",
    gridImages: [
      "/assets/case-studies/Raccord.png",
      "/assets/case-studies/Raccord.png",
    ],
    gridHasText: false,
    gridVideos: [
      "https://player.vimeo.com/video/1172613191?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0",
      "https://player.vimeo.com/video/1172613206?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0",
    ],
    gridVideoPosters: [
      "/assets/images/thumbs/raccord-section4-1-thumb.webp",
      "/assets/images/thumbs/raccord-section4-2-thumb.webp",
    ],
    gridVideoAspectPadding: "177.78%",
  },
  "x-pand": {
    title: "X-pand",
    client: "X-pand",
    services: ["Branding", "3D motion", "Web design", "2D motion"],
    heroImage: "/assets/case-studies/X-Pand.png",
    heroVideo:
      "https://player.vimeo.com/video/1117263493?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&controls=0",
    heroVideoPoster: "/assets/images/thumbs/x-pand1-thumb.webp",
    introTitle:
      "X-pand - a smart bracelet with a dynamic screen that expands to different sizes.",
    introText:
      "X-Pand adapts to your life - from hands-free audio and compact wearability to full-sized productivity and cinematic entertainment. For this product I created 3D motion video and a promo website.",
    introImage: "/assets/case-studies/X-Pand.png",
    introVideo:
      "https://player.vimeo.com/video/1021938591?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&controls=0",
    introVideoPoster: "/assets/images/thumbs/x-pand2-thumb.webp",
    bodyTitle: "Scaling a product story with design systems.",
    bodyParagraph:
      "The X-Pand logo combines the letter “X” with the silhouette of the bracelet, creating a mark that works both as a typographic symbol and a representation of the product itself. The name X-Pand intentionally echoes the word expand, reinforcing the main idea behind the device. It represents a wearable that grows from a compact wristband into a larger interactive display. The result is a clean and memorable identity that communicates both the product’s function and its sense of motion at a glance.",
    bodyImage: "/assets/case-studies/x-pand-section3.png",
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
        heroVideoPoster={data.heroVideoPoster}
      />

      {/* Intro Section — directly below hero */}
      <CaseStudyIntro
        title={data.introTitle}
        text={data.introText}
        image={data.introImage}
        introVideo={data.introVideo}
        introVideoPoster={data.introVideoPoster}
      />

      {/* Text + Image body section — reusable component */}
      <CaseStudyTextImage
        title={slug === "x-pand" ? "Logo" : data.bodyTitle ?? fallback.bodyTitle}
        paragraph={data.bodyParagraph ?? fallback.bodyParagraph}
        image={data.bodyImage ?? fallback.bodyImage}
        noSectionBottomPadding={data.title === "Raccord"}
        preserveLineBreaks={data.title === "Raccord"}
      />

      {/* Title + Paragraph + 2 vertically stacked full-width images — X-pand only */}
      {slug === "x-pand" && (
        <CaseStudyTextImage
          title={slug === "x-pand" ? "Website" : data.bodyTitle ?? fallback.bodyTitle}
          paragraph={
            slug === "x-pand"
              ? "I designed a motion led website for X-Pand that greets visitors with a cinematic hero showing the bracelet smoothly expanding. The site then gently guides people through the product’s core features and short real world use cases, each paired with 3D scenes. Subtle animations echo the device’s expanding behavior so the experience feels tangible, and the layout reveals information as you scroll so visitors can quickly understand what X-Pand does."
              : data.bodyParagraph ?? fallback.bodyParagraph
          }
          image="/assets/case-studies/x-pand-section4.png"
          secondImage="/assets/case-studies/x-pand-section4-2.png"
        />
      )}

      {/* Second Title + Paragraph + 2 vertically stacked full-width images — X-pand only */}
      {slug === "x-pand" && (
        <CaseStudyTextImage
          title={slug === "x-pand" ? "Brand identity" : data.bodyTitle ?? fallback.bodyTitle}
          paragraph={
            slug === "x-pand"
              ? "I established a two-type system: Ncosmic for the hero and footer headers to give the brand a futuristic signature, and DM Sans for supporting headings and body copy to ensure clear, readable text at any size. The color palette was lifted from the promo video to keep the site visually continuous with the motion work."
              : data.bodyParagraph ?? fallback.bodyParagraph
          }
          image="/assets/case-studies/x-pand-section5.png"
          secondImage="/assets/case-studies/x-pand-section5-2.png"
        />
      )}

      {/* Text + 2-image grid variant — follows after text+image section.
          Hidden on X-pand per design direction. */}
      {slug !== "x-pand" && (
        <CaseStudyTextImageGrid
          title={data.gridHasText === false ? undefined : data.bodyTitle ?? fallback.bodyTitle}
          paragraph={
            data.gridHasText === false ? undefined : data.bodyParagraph ?? fallback.bodyParagraph
          }
          images={data.gridImages ?? fallback.gridImages}
          gridVideos={data.gridVideos}
          gridVideoPosters={data.gridVideoPosters}
          gridVideoAspectPadding={data.gridVideoAspectPadding}
        />
      )}

      {/* Problem/Solution section below grid — Raccord only */}
      {data.title === "Raccord" && (
        <CaseStudyProblemSolution
          problemText="First‑time users land on a blank dashboard with no guidance."
          solutionText="Implemented a 4‑step onboarding wizard that lets users pick KPIs and import their first asset inline, so they arrive at a fully populated, personalized view on day one."
          video="https://player.vimeo.com/video/1172613608?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0"
          videoPoster="/assets/images/thumbs/raccord-section5-thumb.webp"
          videoAspectPadding="53.23%"
          noSectionBottomPadding
        />
      )}

      {/* Full-width image section — Raccord only */}
      {data.title === "Raccord" && (
        <CaseStudyFullImage
          topImage="/assets/case-studies/raccord-section6.png"
          bottomImage="/assets/case-studies/raccord-section7.png"
          innerStyle={{ paddingTop: "var(--token-space-48)" }}
        />
      )}

      {/* Second Problem/Solution section — Raccord only, placed after 2-image section */}
      {data.title === "Raccord" && (
        <CaseStudyProblemSolution
          problemText="Customization controls are hidden and hard to discover."
          solutionText="Introduce a dedicated “Edit Mode” that reveals drag‑and‑drop handles and an “+ Add Widget” tile, making layout changes and new widget additions immediately obvious and accessible."
          image="/assets/case-studies/raccord-section8.png"
          secondImage="/assets/case-studies/raccord-section9.png"
        />
      )}

      {/* Third Problem/Solution section — Raccord only, placed after final full-width image */}
      {data.title === "Raccord" && (
        <CaseStudyProblemSolution
          problemText="Chart settings are buried in menus with no live feedback."
          solutionText="When in the Edit mode there is a slide‑in configuration panel that shows a live preview of each tweak, so users can adjust chart types, axes, and filters in context and with confidence."
          image="/assets/case-studies/raccord-section10.png"
        />
      )}

      {/* Results section — Raccord only: Title + paragraph + image */}
      {data.title === "Raccord" && (
        <CaseStudyTextImage
          title="Results"
          paragraph="For Raccord, the goal was to turn a complex investment platform into a clearer and more engaging experience. I created a distinct brand identity and motion style that connected the product and its marketing. The dashboard was redesigned to improve personalization, clarify data, and help users reach insights faster, while a lightweight design system and motion assets ensured consistency for future product development."
          image="/assets/case-studies/raccord-section11.png"
        />
      )}

      {/* Final summary/video section — X-pand only: Results */}
      {slug === "x-pand" && (
        <CaseStudyTextImage
          title="Results"
          paragraph="I created a cinematic 3D promo, a focused brand identity, and a motion led website that make X-Pand’s expanding behavior instantly clear. To make the expansion believable at every size and keep the site fast, I defined a consistent motion language, pulled the color palette from the film for visual continuity, and built lightweight reusable components. The result is a cohesive, demo ready experience that shows the product and makes people want it."
          video="https://player.vimeo.com/video/1117256647?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&controls=0"
          videoPoster="/assets/images/thumbs/x-pand3-thumb.webp"
        />
      )}

      {/* Recent Works — last content section above Footer */}
      <RecentWorks />

      {/* Footer Section — last section on page */}
      <Footer />
    </>
  );
}

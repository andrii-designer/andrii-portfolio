import Image from "next/image";

export type CaseStudyIntroProps = {
  title: string;
  text?: string;
  image?: string;
};

/**
 * CaseStudyIntro — introductory section for a case study.
 *
 * Layout pattern:
 * - Uses .section-wrap for full-bleed section.
 * - Uses .section-inner for horizontal paddings (24px via --token-space-24).
 * - Full-bleed image sits outside .section-inner with zero side padding.
 *
 * Tokens:
 * - Title font size: --token-size-display-1 (desktop) with responsive scaling in globals.css.
 * - Text font size: --token-size-body-lg.
 * - Gap title → text: --token-space-128.
 * - Gap text → image: --token-space-64 (via .case-study-intro .intro-visual).
 *
 * Accessibility:
 * - Uses <h2> for section heading (Hero uses <h1>).
 * - Descriptive alt text when image prop is provided; placeholder alt otherwise.
 * - No motion / animation; respects prefers-reduced-motion via global CSS.
 */
export default function CaseStudyIntro({
  title,
  text,
  image,
}: CaseStudyIntroProps) {
  const introText =
    text ??
    "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.";

  const src = image || "/assets/case-studies/placeholder-intro.jpg";
  const alt = image
    ? `${title} intro image`
    : "Intro illustration placeholder";

  return (
    <section
      className="case-study-intro section-wrap"
      aria-label="Case study intro"
    >
      <div className="section-inner">
        <div className="intro-title" style={{ width: "100%" }}>
          <h2 className="intro-heading">{title}</h2>
        </div>

        <div
          className="intro-text"
          style={{ marginTop: "var(--token-space-256)" }}
        >
          <p className="intro-paragraph">{introText}</p>
        </div>
      </div>

      <div
        className="intro-visual"
        role="img"
        aria-hidden={image ? "false" : "true"}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </div>
    </section>
  );
}


import Image from "next/image";

/**
 * Props for the CaseStudyHero component.
 */
export type CaseStudyHeroProps = {
  /** Case study project title — rendered as <h1> */
  title: string;
  /** Client name (optional) */
  client?: string;
  /** List of services provided, e.g. ["Product design", "3D motion"] */
  services?: string[];
  /** Path to hero image — full-bleed, no side padding */
  heroImage?: string;
};

/**
 * CaseStudyHero — Hero section for individual case study pages
 *
 * Layout pattern:
 * - Uses .section-wrap for full-bleed sections (100% width)
 * - Uses .section-inner for horizontal padding (24px via --token-space-24)
 * - Full-bleed hero image sits outside .section-inner (zero side padding)
 *
 * Design tokens:
 * - Title font-size: --token-size-display-1 (150px), scales responsively
 *   via CSS rules in globals.css (.case-study-hero .hero-title)
 * - Side paddings: --token-space-24 (24px) via .section-inner
 * - Gap title → meta: --token-space-128 (128px)
 * - Meta row gap: --token-space-64 (desktop), --token-space-16 (mobile)
 *
 * Accessibility:
 * - <h1> for the case study title
 * - Descriptive alt text on hero image (falls back to title)
 * - Respects prefers-reduced-motion (no auto-animations on visual)
 */
export default function CaseStudyHero({
  title,
  client,
  services,
  heroImage,
}: CaseStudyHeroProps) {
  return (
    <section className="case-study-hero section-wrap" aria-label="Case study hero">
      <div className="section-inner">
        <header className="hero-header">
          <h1 className="hero-title">{title}</h1>
        </header>

        <div
          className="hero-meta"
          style={{ marginTop: "var(--token-space-128)" }}
        >
          {client && (
            <div className="hero-meta-item">
              <strong className="hero-meta-label">Client</strong>
              <span className="hero-meta-value">{client}</span>
            </div>
          )}
          {services && services.length > 0 && (
            <div className="hero-meta-item">
              <strong className="hero-meta-label">Services</strong>
              <span className="hero-meta-value">
                {services.join(",\u00A0\u00A0\u00A0")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Full-bleed image below: no side paddings */}
      <div className="hero-visual">
        <Image
          src={heroImage || "/assets/case-studies/placeholder-hero.png"}
          alt={`${title} hero image`}
          width={1600}
          height={900}
          priority
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </section>
  );
}

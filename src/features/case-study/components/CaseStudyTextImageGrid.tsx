import Image from "next/image";

export type CaseStudyTextImageGridProps = {
  title: string;
  paragraph?: string;
  images?: string[]; // expected length >= 2; use placeholders if missing
};

/**
 * CaseStudyTextImageGrid — text + 2-image grid variant of CaseStudyTextImage.
 *
 * Layout pattern:
 * - Reuses .section-wrap + .section-inner for full-bleed section with 24px side padding.
 * - Text row: title left, paragraph right with 80px gap on desktop.
 * - Images grid: 2 columns with 24px gap, 24px left/right padding inside grid area.
 *
 * Tokens:
 * - Section top padding: --token-space-128.
 * - Horizontal gap between title and paragraph: --token-space-80.
 * - Gap paragraph → images grid: --token-space-80.
 * - Grid gap + horizontal padding: --token-space-24.
 *
 * Responsive:
 * - ≥768px: title left, paragraph right in a single row; grid shows 2 columns.
 * - <768px: text stacks vertically, then images stack vertically (1 column grid).
 */
export default function CaseStudyTextImageGrid({
  title,
  paragraph,
  images,
}: CaseStudyTextImageGridProps) {
  const bodyText =
    paragraph ??
    "A concept project designed to show what a streamlined, modern investment experience could look like. The case focuses on clean, intuitive UI, with smart onboarding flows and flexible dashboard personalisation to match different user goals and preferences.";

  const firstImage =
    images?.[0] || "/assets/case-studies/placeholder-grid-1.svg";
  const secondImage =
    images?.[1] || "/assets/case-studies/placeholder-grid-2.svg";

  return (
    <section
      className="case-study-text-image-grid section-wrap"
      aria-label="Case study images grid"
    >
      <div
        className="section-inner"
        style={{ paddingTop: "var(--token-space-128)" }}
      >
        <div
          className="text-image-row"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--token-space-80)",
          }}
        >
          <div
            className="title-wrap"
            style={{
              maxWidth: "684px",
              width: "100%",
              textAlign: "left",
            }}
          >
            <h2 className="section-title">{title}</h2>
          </div>

          <div
            className="paragraph-wrap"
            style={{
              maxWidth: "566px",
              width: "100%",
              marginLeft: "auto",
              textAlign: "right",
            }}
          >
            <p className="section-paragraph">{bodyText}</p>
          </div>
        </div>

        {/* Images grid below the paragraph with 80px vertical gap */}
        <div
          className="images-grid"
          style={{
            marginTop: "var(--token-space-80)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--token-space-24)",
            paddingLeft: "var(--token-space-24)",
            paddingRight: "var(--token-space-24)",
          }}
        >
          <Image
            src={firstImage}
            alt="Project image 1"
            width={684}
            height={455}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
          <Image
            src={secondImage}
            alt="Project image 2"
            width={684}
            height={455}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}


import Image from "next/image";

export type CaseStudyTextImageProps = {
  title: string;
  paragraph?: string;
  image?: string;
};

/**
 * CaseStudyTextImage — reusable text + full-width image section.
 *
 * Layout pattern:
 * - Uses .section-wrap for full-bleed section.
 * - Uses .section-inner for horizontal paddings (24px via --token-space-24).
 * - Text row: title left, paragraph right with 80px gap on desktop.
 * - Full-bleed image sits outside .section-inner with zero side padding.
 *
 * Tokens:
 * - Section top padding: --token-space-128.
 * - Horizontal gap between title and paragraph: --token-space-80.
 * - Gap paragraph → image: --token-space-80.
 * - Title typography: --token-size-h2 + existing heading styles.
 * - Paragraph typography: --token-size-body-lg.
 *
 * Responsive:
 * - ≥768px: title left, paragraph right in a single row.
 * - <768px: stacked vertically with --token-space-64 gap.
 */
export default function CaseStudyTextImage({
  title,
  paragraph,
  image,
}: CaseStudyTextImageProps) {
  const bodyText =
    paragraph ??
    "Your content changes context as users move across surfaces. This section explains the strategic outcome, not just the visuals.";

  const src = image || "/assets/case-studies/placeholder-body.jpg";
  const alt = image ? `${title} image` : "Case study visual placeholder";

  return (
    <section
      className="case-study-text-image section-wrap"
      aria-label="Case study text and image"
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
      </div>

      {/* Full-bleed image below: no side padding */}
      <div
        className="text-image-visual full-bleed"
        style={{ marginTop: "var(--token-space-80)" }}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "block" }}
          priority={false}
        />
      </div>
    </section>
  );
}


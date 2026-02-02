/**
 * Single project page — skeleton only.
 * Use tokens: --token-* for colors, spacing, typography.
 */
type Props = { params: Promise<{ slug: string }> };

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params;
  return (
    <div>
      {/* Project [slug] page skeleton — slug: {slug} */}
    </div>
  );
}

## OptimizedImage — primary-color placeholder + fade-in

**Path**: `src/components/media/OptimizedImage.tsx`  
**Import**:

```ts
import OptimizedImage from "@/components/media/OptimizedImage";
```

### What it does

- Wraps Next.js `Image` with a div using the **project primary color token** as a background:
  - `background: var(--token-color-primary, #D2D2D6);`
- Shows that solid color **immediately** where the image will render (no white flash).
- Fades the image in from opacity 0 → 1 once loading is complete.
- Preserves all existing `next/image` behavior (responsive layout, `sizes`, `priority`, etc.).

The primary color token `--token-color-primary` is defined in `src/styles/variables.css`:

```css
--token-color-primary: #d2d2d6;
```

Because this token exists, **no diagnostics fallback file** was needed. If it were missing, the CSS
would still use `var(--token-color-primary, #D2D2D6)` and we would log a note under
`diagnostics/placeholder-token-detection.txt`.

### Props

```ts
type Props = ImageProps & {
  aspectRatio?: string; // optional, e.g. "16 / 9" or "684 / 455"
};
```

- All standard `next/image` props are forwarded (`src`, `alt`, `width`, `height`, `fill`, `sizes`,
  `priority`, `loading`, etc.).
- `aspectRatio` is applied to the wrapper only and never overrides `width`/`height` logic.

### Usage examples

#### Fixed size (width/height)

```tsx
<OptimizedImage
  src="/assets/example-card.png"
  alt="Dashboard preview"
  width={684}
  height={455}
  sizes="(max-width: 1023px) 100vw, 50vw"
/>
```

#### Fill mode with aspect ratio

```tsx
<div style={{ width: "100%", maxWidth: 533 }}>
  <OptimizedImage
    src="/assets/example-hero.png"
    alt="Hero visual"
    fill
    aspectRatio="16 / 9"
    sizes="100vw"
  />
</div>
```

In `fill` mode:

- Add `fill` to the component props.
- Optionally pass `aspectRatio` if you want the wrapper to reserve vertical space up front.
- The CSS class `.optimized-media.fill` ensures `next/image` can position itself absolutely inside
  the wrapper without breaking layout.


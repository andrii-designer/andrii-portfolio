## LazyVideo — primary-color placeholder + lazy-loaded sources

**Path**: `src/components/media/LazyVideo.tsx`

### What it does

- Renders a solid **primary-color** placeholder using:
  - `background: var(--token-color-primary, #D2D2D6);`
- Optionally shows a `poster` image on top of that background.
- Only attaches `<source>` tags and starts loading the video when:
  - the video enters the viewport (via `IntersectionObserver` with `rootMargin: 200px`), or
  - the user explicitly clicks the play overlay button.
- Fades the video in once it has enough data (`loadeddata`), by adding `.is-loaded` to the wrapper
  so CSS can transition `opacity` from 0 → 1.

Primary token detection:

- The primary color token `--token-color-primary` is defined in `src/styles/variables.css`.
- We use `var(--token-color-primary, #D2D2D6)` so if the token is ever missing, the UI still shows a
  neutral grey `#D2D2D6` without breaking. Because the token exists, no diagnostics file was written.

### Props

```ts
type LazyVideoProps = {
  poster?: string;
  sources: Array<{ src: string; type?: string }>;
  width?: number;
  height?: number;
  controls?: boolean;              // default true
  preload?: "none" | "metadata" | "auto"; // default "metadata"
  playsInline?: boolean;           // default true
  className?: string;
  ariaLabel?: string;              // label for the play overlay button
};
```

- All sources are attached as `<source>` children to the underlying `<video>` once loading is
  triggered.
- `width`/`height` are forwarded to the `<video>` element and do not affect layout tokens.

### Usage examples

#### With poster

```tsx
import LazyVideo from "@/components/media/LazyVideo";

<LazyVideo
  poster="/assets/showreel-poster.jpg"
  sources={[{ src: "/assets/showreel2026.mp4", type: "video/mp4" }]}
  controls
  preload="metadata"
  playsInline
  className="showreel-video h-full w-full object-cover"
  ariaLabel="Play showreel video"
/>;
```

#### Without poster (solid primary color only)

```tsx
<LazyVideo
  sources={[{ src: "/assets/case-studies/demo.mp4", type: "video/mp4" }]}
  controls
  preload="metadata"
  ariaLabel="Play case study video"
/>;
```

### Keyboard & accessibility

- The overlay play button:
  - is focusable with the keyboard,
  - uses `aria-label` (defaults to `"Play video"` if none is provided),
  - triggers attaching sources and calling `video.play()` when activated.
- Once loaded, the underlying `<video>` behaves like a regular HTML5 video with `controls`.


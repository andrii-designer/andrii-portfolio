# Andrii Portfolio

Next.js portfolio with design tokens extracted from existing style files.

## Token sources

- **Colors & typography:** `src/styles/colors and fonts.scss`  
  Defines `--token-color-*`, `--token-font-family-base`, `--token-size-*`, `--token-leading-*`, `--token-weight-*`.
- **Spacing:** `src/styles/spacing and colors.css`  
  Defines `--token-space-*` only (colors/fonts in this file are ignored).

See `extraction-report.md` for the full list of tokens and any warnings.

## Re-run token extraction

From the project root:

```bash
npm run extract-tokens
```

This reads `src/styles/colors and fonts.scss` and `src/styles/spacing and colors.css`, then overwrites `src/styles/variables.css` and prints a short report.  
Parsing rules and file path order are documented in `scripts/extract-tokens.js`.

## Dev server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

**If the dev server fails:** `npm run build` has been verified. If you see a system error such as `uv_interface_addresses` or "Unknown system error 1", it is likely an environment/sandbox restriction. Run `npm run dev` in your normal terminal outside restricted environments. If you see other errors, check that Node and npm are up to date and that no other process is using port 3000.

## Other scripts

- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Figma workflow (later)

Do not parse the full Figma file. When you have a single Figma page URL or exact page name, create a feature branch `feature/figma-<page-name-kebab>`, parse only that page, and generate the section using the existing tokens.

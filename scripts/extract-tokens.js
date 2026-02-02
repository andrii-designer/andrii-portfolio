#!/usr/bin/env node
/**
 * extract-tokens.js
 *
 * Extracts design tokens from:
 *   - colors and fonts.scss → color + typography tokens (--token-color-*, --token-font-*, --token-size-*, --token-leading-*, --token-weight-*)
 *   - spacing and colors.css → spacing tokens only (--token-space-*)
 *
 * Parsing rules:
 * 1. colors and fonts.scss:
 *    - SCSS variables: $color-*: <hex/rgba/hsl> → --token-color-*
 *    - From @mixin text-style-*: extract font-family, font-size, font-weight, line-height → typography tokens
 *    - Font family: --token-font-family-base
 *    - Sizes: --token-size-display-1, --token-size-h1..h6, --token-size-body-*, --token-size-overline, --token-size-label-*
 *    - Line heights: --token-leading-100, 110, 115, 120, 140, 150, 160, 170
 *    - Weights: --token-weight-regular (400), medium (500), semibold (600), bold (700)
 * 2. spacing and colors.css:
 *    - Only keys matching spacer---* (e.g. 'spacer---8px': 8px) → --token-space-<number>
 *    - Ignore 'accent-color', 'base', 'primary', 'font-family' (colors/fonts from colors and fonts.scss only)
 * 3. Fallbacks on parse failure: color #000000, font system-ui, spacing 8px
 *
 * File paths (support spaces; try in order):
 *   ./my portfolio website folder/colors and fonts.scss
 *   ./my portfolio website folder/spacing and colors.css
 *   ./src/styles/colors and fonts.scss
 *   ./src/styles/spacing and colors.css
 *   /colors and fonts.scss (project root)
 *   /spacing and colors.css (project root)
 *
 * Output: writes src/styles/variables.css and prints a human-readable report.
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");

const COLORS_FONTS_PATHS = [
  path.join(PROJECT_ROOT, "my portfolio website folder", "colors and fonts.scss"),
  path.join(PROJECT_ROOT, "src", "styles", "colors and fonts.scss"),
  path.join(PROJECT_ROOT, "colors and fonts.scss"),
];

const SPACING_PATHS = [
  path.join(PROJECT_ROOT, "my portfolio website folder", "spacing and colors.css"),
  path.join(PROJECT_ROOT, "src", "styles", "spacing and colors.css"),
  path.join(PROJECT_ROOT, "spacing and colors.css"),
];

const FALLBACKS = { color: "#000000", font: "system-ui", spacing: "8px" };

function findFile(candidates) {
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function extractColorsAndFonts(content) {
  const tokens = { colors: {}, fontFamily: {}, sizes: {}, leading: {}, weight: {} };
  const warnings = [];

  // SCSS color variables: $color-*-color: #hex;
  const colorRe = /\$color-([a-z-]+)(?:-color)?\s*:\s*([#\w(),.%\s]+);/g;
  let m;
  while ((m = colorRe.exec(content)) !== null) {
    const name = m[1].replace(/-color$/, "") || m[1];
    const value = m[2].trim();
    if (/^#[0-9a-fA-F]{3,8}$|^rgba?\(|^hsla?\(/.test(value) || value.startsWith("#")) {
      tokens.colors[name === "base" ? "base" : name === "primary" ? "primary" : name === "accent" ? "accent" : name] = value;
    } else {
      warnings.push(`Could not parse color "${name}": ${value}; using ${FALLBACKS.color}`);
      tokens.colors[name] = FALLBACKS.color;
    }
  }

  // Typography from mixins: font-family, font-size, line-height, font-weight
  const fontFamilyRe = /font-family:\s*([^;]+);/g;
  const families = new Set();
  while ((m = fontFamilyRe.exec(content)) !== null) {
    families.add(m[1].trim());
  }
  if (families.size) {
    tokens.fontFamily.base = Array.from(families)[0].replace(/^["']|["']$/g, "");
  } else {
    tokens.fontFamily.base = FALLBACKS.font;
  }

  const sizeRe = /font-size:\s*(\d+px);/g;
  const sizes = new Set();
  while ((m = sizeRe.exec(content)) !== null) sizes.add(m[1]);
  const sizeOrder = ["150px", "112px", "84px", "64px", "48px", "36px", "24px", "20px", "18px", "16px", "12px", "14px"];
  const sizeNames = ["display-1", "display-2", "h1", "h2", "h3", "h4", "h5", "h6", "body-lg", "body-md", "body-sm", "body-xs", "overline", "label-md", "label-sm"];
  sizeOrder.forEach((s, i) => {
    if (sizes.has(s)) tokens.sizes[sizeNames[i] || `size-${i}`] = s;
  });
  if (sizes.has("18px") && !tokens.sizes["label-lg"]) tokens.sizes["label-lg"] = "18px";

  const leadingRe = /line-height:\s*(\d+%);/g;
  const leadings = new Set();
  while ((m = leadingRe.exec(content)) !== null) leadings.add(m[1]);
  ["100%", "110%", "115%", "120%", "140%", "150%", "160%", "170%"].forEach((pct) => {
    if (leadings.has(pct)) tokens.leading[pct.replace("%", "")] = pct;
  });

  tokens.weight = { regular: "400", medium: "500", semibold: "600", bold: "700" };

  return { tokens, warnings };
}

function extractSpacing(content) {
  const tokens = {};
  const warnings = [];
  // Match 'spacer---Npx': Npx or similar
  const spacerRe = /'spacer---(\d+)px'\s*:\s*(\d+px);?/g;
  let m;
  while ((m = spacerRe.exec(content)) !== null) {
    const num = m[1];
    const value = m[2];
    tokens[num] = value;
  }
  return { tokens, warnings };
}

function generateVariablesCss(colorsFonts, spacing) {
  const lines = [
    "/**",
    " * Design tokens — generated by scripts/extract-tokens.js",
    " * Re-run: npm run extract-tokens",
    " */",
    "",
    ":root {",
    "  /* Colors (source: colors and fonts.scss) */",
  ];

  Object.entries(colorsFonts.colors).forEach(([k, v]) => {
    lines.push(`  --token-color-${k}: ${v};`);
  });
  lines.push("", "  /* Typography — font family */");
  lines.push(`  --token-font-family-base: ${colorsFonts.fontFamily.base}, system-ui, sans-serif;`);
  lines.push("", "  /* Typography — font sizes */");
  Object.entries(colorsFonts.sizes).forEach(([k, v]) => {
    lines.push(`  --token-size-${k}: ${v};`);
  });
  lines.push("", "  /* Typography — line heights */");
  Object.entries(colorsFonts.leading).forEach(([k, v]) => {
    lines.push(`  --token-leading-${k}: ${v};`);
  });
  lines.push("", "  /* Typography — font weights */");
  Object.entries(colorsFonts.weight).forEach(([k, v]) => {
    lines.push(`  --token-weight-${k}: ${v};`);
  });
  lines.push("", "  /* Spacing (source: spacing and colors.css) */");
  const spaceOrder = ["0", "4", "8", "16", "24", "32", "40", "48", "64", "80", "96", "128", "160", "192", "256"];
  spaceOrder.forEach((num) => {
    if (spacing[num] !== undefined) {
      lines.push(`  --token-space-${num}: ${spacing[num]};`);
    }
  });
  lines.push("}");
  return lines.join("\n");
}

function main() {
  const colorsPath = findFile(COLORS_FONTS_PATHS);
  const spacingPath = findFile(SPACING_PATHS);

  let colorsFontsContent = "";
  let spacingContent = "";

  if (colorsPath) {
    colorsFontsContent = fs.readFileSync(colorsPath, "utf8");
  }
  if (spacingPath) {
    spacingContent = fs.readFileSync(spacingPath, "utf8");
  }

  const cf = extractColorsAndFonts(colorsFontsContent || "$color-base-color: #000000;");
  const colorsFonts = cf.tokens;
  const spacingResult = extractSpacing(spacingContent || "'spacer---8px': 8px;");
  if (!spacingResult.tokens["8"] && Object.keys(spacingResult.tokens).length === 0) {
    spacingResult.tokens["8"] = FALLBACKS.spacing;
  }

  const variablesCss = generateVariablesCss(colorsFonts, spacingResult.tokens);
  const outDir = path.join(PROJECT_ROOT, "src", "styles");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, "variables.css"), variablesCss, "utf8");

  // Report
  const report = [
    "=== Token extraction report ===",
    `colors and fonts: ${colorsPath || "NOT FOUND"}`,
    `spacing and colors: ${spacingPath || "NOT FOUND"}`,
    "",
    "Colors: " + (Object.keys(colorsFonts.colors || {}).join(", ") || "none"),
    "Spacing: " + (Object.keys(spacingResult.tokens).join(", ") || "none"),
    "",
  ];
  (cf.warnings || []).forEach((w) => report.push("Warning: " + w));
  spacingResult.warnings.forEach((w) => report.push("Warning: " + w));
  report.push("Wrote src/styles/variables.css");

  console.log(report.join("\n"));
}

main();

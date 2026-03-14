#!/usr/bin/env node
/**
 * Generates app/favicon.ico from public/hero-assets/fav.svg
 * Run before build so Chromium/mobile browsers get .ico (they prefer it over .svg)
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "hero-assets", "fav.svg");
const outPath = join(root, "src", "app", "favicon.ico");

const svg = readFileSync(svgPath);
const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
const ico = await toIco([png16, png32]);
writeFileSync(outPath, ico);
console.log("Generated src/app/favicon.ico");

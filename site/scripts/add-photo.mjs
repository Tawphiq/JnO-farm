// Adds one of J&O's own photos: node scripts/add-photo.mjs <image> <name> [--large]
// Writes public/assets/photos/<name>-640.webp and -1280.webp (and -1920 with --large,
// for full-width images), turned upright and with all metadata removed: photos from a
// phone carry the GPS location where they were taken.
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [input, name, flag] = process.argv.slice(2);
if (!input || !/^[a-z0-9-]+$/.test(name ?? "")) {
  console.error("Usage: node scripts/add-photo.mjs <image> <name> [--large]\n<name>: lowercase letters, digits and hyphens, e.g. feed-mill");
  process.exit(1);
}
const widths = flag === "--large" ? [640, 1280, 1920] : [640, 1280];
const { width: sourceWidth } = await sharp(input).rotate().metadata();
if (sourceWidth < widths.at(-1)) console.warn(`Warning: the photo is ${sourceWidth}px wide; ${widths.at(-1)}px or wider looks sharper.`);

for (const width of widths) {
  const output = fileURLToPath(new URL(`../public/assets/photos/${name}-${width}.webp`, import.meta.url));
  await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(output);
}
console.log(`Saved ${widths.map((width) => `${name}-${width}.webp`).join(", ")} in public/assets/photos/.`);
console.log("Now point a slot in src/data/photography.js at it, for example:");
console.log(`  livestock: { file: "${name}", own: true, alt: "Describe what the photo shows"${flag === "--large" ? ", large: true" : ""} },`);

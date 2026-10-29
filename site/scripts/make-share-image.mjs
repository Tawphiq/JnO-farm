// Builds public/assets/share.jpg, the 1200×630 image shown in WhatsApp and social
// link previews, from the hero photo. Re-run after replacing the hero photo:
// node scripts/make-share-image.mjs
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { photography } from "../src/data/photography.js";

const photos = new URL("../public/assets/photos/", import.meta.url);
const hero = photography.hero;
const source = fileURLToPath(new URL(`${hero.file}-${hero.large ? 1920 : 1280}.webp`, photos));
const output = fileURLToPath(new URL("../public/assets/share.jpg", import.meta.url));

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="shade" x1="0" x2="1"><stop offset="0" stop-color="#102e22" stop-opacity=".92"/><stop offset=".7" stop-color="#102e22" stop-opacity=".35"/><stop offset="1" stop-color="#102e22" stop-opacity="0"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <g font-family="Barlow Condensed, Impact, Arial Narrow, sans-serif" font-weight="800" fill="#f3f0e5">
    <text x="72" y="250" font-size="150" letter-spacing="-3">J&amp;O</text>
    <text x="76" y="330" font-size="64">FARM PRODUCE</text>
    <text x="76" y="410" font-size="40" fill="#d4e493">FROM THE GROUND UP.</text>
  </g>
  <text x="76" y="560" font-family="Consolas, IBM Plex Mono, monospace" font-size="24" fill="#f3f0e5">ANKWENSU · EASTERN REGION · GHANA</text>
</svg>`;

await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output);
console.log("Saved public/assets/share.jpg");

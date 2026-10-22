// Writes the rendered page into dist/index.html, so the content is in the HTML
// for search engines and visible before JavaScript loads. Also adds structured
// business data and, once the site's address is known, link-preview tags,
// a canonical URL and sitemap.xml.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { business } from "../src/data/business.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const serverBuild = `${root}.ssr`;
const page = `${root}dist/index.html`;
const placeholder = '<div id="root"></div>';
const siteUrl = (process.env.SITE_URL || business.siteUrl).replace(/\/+$/, "");
const shareImage = siteUrl && `${siteUrl}/assets/share.jpg`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  legalName: business.legalName,
  description: "Integrated farm supplying livestock, fish, crops, animal feed, fertilizer and agro-consultancy across Ghana.",
  telephone: business.telephone,
  ...(business.email && { email: business.email }),
  ...(siteUrl && { url: `${siteUrl}/`, image: shareImage }),
  address: { "@type": "PostalAddress", addressLocality: business.address.locality, addressRegion: business.address.region, addressCountry: business.address.country },
  areaServed: business.address.country,
  founder: business.founders.map((founder) => ({ "@type": "Person", ...founder })),
};
const head = [`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`];
if (siteUrl) {
  head.push(
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:image" content="${shareImage}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="J&amp;O Farm Produce, Ankwensu, Ghana" />',
    '<meta name="twitter:card" content="summary_large_image" />',
  );
}

const { render } = await import(pathToFileURL(`${serverBuild}/entry-server.js`).href);
const html = readFileSync(page, "utf8");
if (!html.includes(placeholder)) throw new Error(`${placeholder} not found in ${page}`);
writeFileSync(page, html
  .replace("</head>", `  ${head.join("\n    ")}\n  </head>`)
  .replace(placeholder, `<div id="root">${render()}</div>`));

writeFileSync(`${root}dist/robots.txt`, `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`);
if (siteUrl) {
  writeFileSync(`${root}dist/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`);
}
rmSync(serverBuild, { recursive: true, force: true });
console.log(`Prerendered dist/index.html${siteUrl ? ` for ${siteUrl}` : " (set siteUrl in src/data/business.js to add link previews and a sitemap)"}`);

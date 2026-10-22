// Writes the rendered page into dist/index.html, so the content is in the HTML
// for search engines and visible before JavaScript loads.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const serverBuild = `${root}.ssr`;
const page = `${root}dist/index.html`;
const placeholder = '<div id="root"></div>';

const { render } = await import(pathToFileURL(`${serverBuild}/entry-server.js`).href);
const html = readFileSync(page, "utf8");
if (!html.includes(placeholder)) throw new Error(`${placeholder} not found in ${page}`);
writeFileSync(page, html.replace(placeholder, `<div id="root">${render()}</div>`));
rmSync(serverBuild, { recursive: true, force: true });
console.log("Prerendered dist/index.html");

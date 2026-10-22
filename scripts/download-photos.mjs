import { mkdir, writeFile } from "node:fs/promises";
import { photoSource, stockPhotos } from "../src/data/photography.js";

const directory = new URL("../public/assets/photos/", import.meta.url);
await mkdir(directory, { recursive: true });
for (const photo of stockPhotos) {
  for (const width of photo.large ? [640, 1280, 1920] : [640, 1280]) {
    const url = `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&q=82&fm=webp`;
    const response = await fetch(url);
    if (!response.ok || !response.headers.get("content-type")?.includes("image/")) throw new Error(`Photo ${photo.id}: ${response.status}`);
    await writeFile(new URL(`${photo.file}-${width}.webp`, directory), Buffer.from(await response.arrayBuffer()));
  }
  console.log(`Downloaded ${photo.file}: ${photoSource(photo)}`);
}

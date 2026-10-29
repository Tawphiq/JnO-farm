import { photography } from "../data/photography.js";

export default function Photo({ name, className = "", priority = false, sizes = "(max-width: 600px) 100vw, 50vw", decorative = false, parallax }) {
  // `parallax` is how far (in percent) the image drifts while its frame scrolls past; see usePageMotion.
  const photo = photography[name];
  const widths = photo.large ? [640, 1280, 1920] : [640, 1280];
  const assetRoot = `${import.meta.env.BASE_URL}assets/photos/`;
  return (
    <div className={`photo ${className}`} data-parallax={parallax}>
      <img src={`${assetRoot}${photo.file}-1280.webp`} srcSet={widths.map((width) => `${assetRoot}${photo.file}-${width}.webp ${width}w`).join(", ")} sizes={sizes} alt={decorative ? "" : photo.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" width="1280" height="853" style={photo.position ? { objectPosition: photo.position } : undefined} />
    </div>
  );
}

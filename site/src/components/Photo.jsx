import { photography } from "../data/photography.js";

export default function Photo({ name, className = "", priority = false, parallax = false, sizes = "(max-width: 600px) 100vw, 50vw", decorative = false }) {
  const photo = photography[name];
  const widths = photo.large ? [640, 1280, 1920] : [640, 1280];
  const assetRoot = `${import.meta.env.BASE_URL}assets/photos/`;
  return (
    <div className={`photo ${parallax ? "parallax-photo" : ""} ${className}`} data-parallax={parallax || undefined}>
      <img src={`${assetRoot}${photo.file}-1280.webp`} srcSet={widths.map((width) => `${assetRoot}${photo.file}-${width}.webp ${width}w`).join(", ")} sizes={sizes} alt={decorative ? "" : photo.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" width="1280" height="853" style={photo.position ? { objectPosition: photo.position } : undefined} />
    </div>
  );
}

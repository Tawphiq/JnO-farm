import Photo from "./Photo.jsx";

// The market scene comes last, away from the copy about the J&O team.
// From 1024px the section pins and the photos scroll sideways (usePageMotion).
const photos = [
  { name: "dusk", caption: "A fish farm at dusk" },
  { name: "tilapia", caption: "Tilapia" },
  { name: "cashew", caption: "Raw cashew nuts" },
  { name: "goats", caption: "Goats" },
  { name: "market", caption: "Maize at market" },
];

export default function Gallery() {
  return (
    <section className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-intro">
          <p className="label">Gallery</p>
          <h2 id="gallery-title">From soil to market.</h2>
        </div>
      </div>
      <ul className="gallery-track container">
        {photos.map((photo) => (
          <li key={photo.name}>
            <figure>
              <Photo name={photo.name} sizes="(max-width: 1023px) 80vw, 50vw" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

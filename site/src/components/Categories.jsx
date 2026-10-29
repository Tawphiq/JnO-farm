import { catalogue } from "../data/catalogue.js";
import Photo from "./Photo.jsx";

export default function Categories() {
  return (
    <section className="section categories" data-nav-section="shop" aria-labelledby="categories-title">
      <div className="container">
        <div className="section-intro section-intro-split">
          <div>
            <p className="label">The farm</p>
            <h2 id="categories-title">One farm. Many ways to grow.</h2>
          </div>
          <p className="section-lead">Six divisions working side by side on our integrated farm in Ankwensu. Choose where to start.</p>
        </div>
        <ul className="category-grid">
          {Object.entries(catalogue).map(([id, division], index) => (
            <li key={id}>
              <a className="category" href={`#shop-${id}`} data-division={id}>
                <Photo name={id} decorative parallax={6} sizes="(max-width: 639px) 50vw, 33vw" />
                <span className="category-text">
                  <span className="category-index">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{division.name}</strong>
                  <span>{division.blurb}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

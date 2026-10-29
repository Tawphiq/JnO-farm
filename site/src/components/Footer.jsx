import { catalogue } from "../data/catalogue.js";
import { business } from "../data/business.js";
import { photography, photoSource, stockPhotos } from "../data/photography.js";
import { whatsappUrl } from "../utils/enquiry.js";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";
import { navigation } from "./Header.jsx";

const allPhotos = Object.keys(photography).length;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p className="footer-slogan">Rooted here. Growing together.</p>
            <p>Joseph & Owura Farm Produce Ltd.<br />Ankwensu, Eastern Region, Ghana.</p>
          </div>
          <nav className="footer-links" aria-labelledby="footer-products">
            <h2 id="footer-products">Products</h2>
            <ul>{Object.entries(catalogue).map(([id, division]) => <li key={id}><a href={`#shop-${id}`}>{division.name}</a></li>)}</ul>
          </nav>
          <nav className="footer-links" aria-labelledby="footer-company">
            <h2 id="footer-company">Company</h2>
            <ul>{navigation.filter((item) => item.id !== "shop").map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ul>
          </nav>
          <div className="footer-links">
            <h2>Get in touch</h2>
            <ul>
              <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="tel:+233243503083">+233 243 503 083</a></li>
              {business.email && <li><a href={`mailto:${business.email}`}>{business.email}</a></li>}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> J&O Farm Produce Ltd.</span>
          <span className="ghana">Ghanaian owned <span className="ghana-flag" role="img" aria-label="Ghana flag"></span></span>
          {stockPhotos.length > 0 && (
            <span>{stockPhotos.length === allPhotos ? "Agricultural imagery is illustrative." : "Some imagery is illustrative stock photography."}</span>
          )}
          <a href="#home" className="back-top">Back to top <Icon name="up" /></a>
        </div>
        {stockPhotos.length > 0 && (
          <details className="photo-credits">
            <summary>Photography & credits</summary>
            <p>Stock agricultural photography from Pexels. These images illustrate our work and products; they do not depict J&O’s farm or team. Used under the <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels License</a>.</p>
            <ul>{stockPhotos.map((photo) => <li key={photo.id}><a href={photoSource(photo)} target="_blank" rel="noopener noreferrer">{photo.file.replaceAll("-", " ")} ↗</a></li>)}</ul>
          </details>
        )}
      </div>
    </footer>
  );
}

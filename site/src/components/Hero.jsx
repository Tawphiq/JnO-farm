import { whatsappUrl } from "../utils/enquiry.js";
import Icon from "./Icon.jsx";
import Photo from "./Photo.jsx";

const promises = ["Delivery across Ghana", "Retail & bulk orders", "Straight from the farmers"];

export default function Hero() {
  return (
    <>
      <section className="hero" id="home" data-nav-section="home" aria-labelledby="hero-title">
        <div className="hero-media">
          <Photo name="hero" priority sizes="100vw" />
        </div>
        <div className="hero-copy container">
          <p className="label label-light">An integrated farm in Ankwensu</p>
          <h1 id="hero-title">From the ground up.</h1>
          <p className="hero-lead">We’re Joseph & Owura. We raise livestock and fish, grow crops, mill our own feed and supply fertilizer, delivered across Ghana.</p>
          <div className="hero-actions">
            <a className="btn btn-light" href="#shop">Explore the farm shop <Icon name="arrow" /></a>
            <a className="text-link text-link-light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
      <ul className="promises" aria-label="Why order from J&O">
        {promises.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}

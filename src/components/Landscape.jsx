import Photo from "./Photo.jsx";

export default function Landscape() {
  return (
    <section className="landscape-section" aria-labelledby="landscape-title">
      <Photo name="palms" parallax sizes="100vw" />
      <div className="landscape-shade" />
      <div className="landscape-copy page-width">
        <div className="landscape-top"><p className="eyebrow">THE BIGGER PICTURE</p><span aria-hidden="true">+</span></div>
        <h2 className="landscape-title" id="landscape-title">Land.<br />Work.<br /><span>Possibility.</span></h2>
        <div className="landscape-bottom"><p>Different divisions.<br />The same ground beneath our feet.</p><a className="round-link" href="#difference" aria-label="Discover how we work">↓</a></div>
      </div>
    </section>
  );
}

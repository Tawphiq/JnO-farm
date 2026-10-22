import Photo from "./Photo.jsx";

export default function Trade({ onSelect }) {
  return (
    <section className="trade-section" id="trade" aria-labelledby="trade-title">
      <div className="trade-image"><Photo name="feed" parallax /><span className="trade-image-caption">RAW MATERIAL / MAIZE</span><span className="trade-image-word" aria-hidden="true">MORE<br />IN STORE.</span></div>
      <div className="trade-copy" data-reveal>
        <p className="eyebrow"><span className="section-number">04</span> THE SUPPLY DESK</p>
        <h2 id="trade-title">Big plans.<br /><span>Let’s talk<br />tonnage.</span></h2>
        <p>From fertilizer for your next planting season to raw cashew nuts for export, we connect farmers and businesses with the supply they need.</p>
        <dl><div><dt>27–500 <span>MT</span></dt><dd>Bulk fertilizer supply</dd></div><div><dt>Nationwide</dt><dd>Delivery across Ghana</dd></div></dl>
        <button className="button button-lime" onClick={() => onSelect("fertilizer")}>Discuss a bulk order <span aria-hidden="true">↗</span></button>
      </div>
    </section>
  );
}

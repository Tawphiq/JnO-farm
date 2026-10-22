import Photo from "./Photo.jsx";

export default function Harvest() {
  return (
    <section className="harvest-section section-space" aria-labelledby="harvest-title">
      <div className="page-width section-heading" data-reveal><div><p className="eyebrow"><span className="section-number">05</span> THE GROWING THINGS</p><h2 id="harvest-title">A field guide<br />to <span className="accent">good things.</span></h2></div><a href="#divisions" className="text-link">Explore crops & plants <span aria-hidden="true">↗</span></a></div>
      <div className="harvest-gallery page-width">
        <figure><Photo name="corn" parallax /><figcaption><span>SPECIMEN / 01</span><strong>Maize</strong><p>From field crop to feed ingredient.</p></figcaption></figure>
        <figure><Photo name="crops" parallax /><figcaption><span>SPECIMEN / 02</span><strong>Bell peppers</strong><p>Fresh colour for the everyday table.</p></figcaption></figure>
        <figure><Photo name="consultancy" parallax /><figcaption><span>FIELD NOTE / 03</span><strong>Cultivation</strong><p>Care, from planting to harvest.</p></figcaption></figure>
      </div>
      <div className="marquee" aria-hidden="true"><div className="marquee-track">ROOTED HERE. <span>↗</span> GROWING TOGETHER. <span>↗</span> ROOTED HERE. <span>↗</span></div></div>
    </section>
  );
}

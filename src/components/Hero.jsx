import Photo from "./Photo.jsx";

export default function Hero() {
  return (
    <section className="hero page-width" id="home" aria-labelledby="hero-title">
      <div className="hero-topline"><span>JOSEPH & OWURA FARM PRODUCE LTD.</span><span>ANKWENSU · EASTERN REGION · GHANA</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> A WORKING FARM. A SHARED FUTURE.</p>
          <h1 id="hero-title" aria-label="From the ground up.">
            <span className="hero-line"><span>From the</span></span>
            <span className="hero-line"><span>ground</span></span>
            <span className="hero-line hero-line-accent"><span>up<span className="hero-period">.</span></span></span>
          </h1>
          <div className="hero-description"><span className="copy-cross" aria-hidden="true">+</span><p>We’re Joseph & Owura. We grow crops, raise livestock and mill feed in Ankwensu — supplying the people who keep Ghana growing.</p></div>
          <div className="hero-actions"><a className="button" href="#divisions">Find what you need <span aria-hidden="true">↗</span></a><a className="hero-story-link" href="#story">Meet J&O <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="hero-collage">
          <Photo name="field" className="hero-image" priority parallax sizes="(max-width: 700px) 100vw, 55vw" />
          <div className="field-label"><span className="field-cross" aria-hidden="true">+</span><span>FIELD NOTES / 001<br /><strong>It starts with the soil.</strong></span></div>
          <span className="hero-image-rail">CULTIVATION / CARE / CONNECTION</span>
          <Photo name="crops" className="hero-inset" sizes="(max-width: 700px) 42vw, 22vw" />
          <div className="hero-stamp"><strong>06</strong><span>DIVISIONS.<br />ONE FARM.</span><span aria-hidden="true">↗</span></div>
          <span className="hero-image-caption">[ FROM THE FIRST SEED TO THE NEXT HARVEST ]</span>
        </div>
      </div>
      <div className="hero-footer"><span>GHANAIAN ROOTS. NATIONWIDE REACH.</span><a href="#divisions" className="scroll-cue">EXPLORE THE FARM <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}

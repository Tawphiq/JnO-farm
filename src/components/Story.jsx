import Photo from "./Photo.jsx";

export default function Story() {
  return (
    <section className="story-section section-space" id="story" aria-labelledby="story-title">
      <div className="page-width">
        <div className="story-heading" data-reveal><p className="eyebrow"><span className="section-number">02</span> THE PEOPLE BEHIND THE NAME</p><span className="story-location">ANKWENSU, GHANA</span></div>
        <div className="story-grid">
          <div className="story-art"><Photo name="consultancy" className="story-main" parallax /><Photo name="corn" className="story-inset" parallax sizes="(max-width: 600px) 40vw, 22vw" /><div className="story-monogram" aria-hidden="true">J<span>&</span>O</div><span className="image-caption">HANDS IN THE SOIL. EYES ON WHAT’S NEXT.</span></div>
          <div className="story-copy" data-reveal>
            <h2 id="story-title">It’s Joseph.<br />It’s Owura.<br /><span className="accent">It’s personal.</span></h2>
            <p className="story-intro">Two brothers. One working farm.</p>
            <p><strong>Joseph Ocloo</strong> and <strong>Owura (Edward Appiah-Dwomoh)</strong> founded J&O Farm Produce Ltd and lead the business together from Ankwensu, in Ghana’s Eastern Region.</p>
            <p>We rear our own livestock, grow our own crops, mill our own feed, and supply fertilizer. When you get in touch, you’re talking to the team that does the work.</p>
            <div className="founder-names"><span>JOSEPH OCLOO</span><span>OWURA<br /><small>EDWARD APPIAH-DWOMOH</small></span></div>
            <a className="text-link" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

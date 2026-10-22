import { useState } from "react";
import { catalogue } from "../data/catalogue.js";
import Photo from "./Photo.jsx";

const divisions = [
  { id: "livestock", title: "Livestock", text: "Pigs, cattle, sheep, goats & rabbits. Meat and breeding stock.", tag: "REARED ON THE FARM" },
  { id: "aquaculture", title: "Aquaculture", text: "Akosombo-strain tilapia & African catfish. Fingerlings to table-size.", tag: "FRESHWATER FARMING" },
  { id: "crops", title: "Crops & plants", text: "Field crops, fresh vegetables, seedlings & ornamental plants.", tag: "FROM THE SOIL" },
  { id: "feed", title: "Animal feed", text: "Our own mill. Feed for poultry, livestock and fish.", tag: "MILLED BY J&O" },
  { id: "fertilizer", title: "Fertilizer & trade", text: "Farm inputs in retail & bulk. Ghana-grown export produce.", tag: "SUPPLY & EXPORT" },
  { id: "consultancy", title: "Knowledge & training", text: "Agro-consultancy and practical support for your next farming project.", tag: "GROW YOUR KNOW-HOW" },
];

export default function Divisions({ onEnquire }) {
  const [openIds, setOpenIds] = useState([]);
  function toggle(id) {
    setOpenIds((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]));
  }
  return (
    <section className="divisions-section section-space page-width" id="divisions" aria-labelledby="divisions-title">
      <div className="directory-layout">
        <div className="directory-intro" data-reveal>
          <p className="eyebrow"><span className="section-number">01</span> THE FARM DIRECTORY</p>
          <h2 id="divisions-title">One farm.<br />Many ways<br />to <span className="accent">grow.</span></h2>
          <p>From a bag of feed to your next harvest. Find your starting point, then talk to the people behind it.</p>
          <div className="directory-key"><span className="key-mark" aria-hidden="true">↳</span><span>OPEN A DIVISION<br />FOR ITS FULL PRODUCT LIST</span></div>
          <a href="#contact" className="text-link">Need a hand choosing? <span aria-hidden="true">↗</span></a>
        </div>
        <div className="directory-list">
          {divisions.map((division, index) => {
            const details = catalogue[division.id];
            const open = openIds.includes(division.id);
            const panelId = `${division.id}-products`;
            return (
              <article className={`division-card ${open ? "open" : ""}`} key={division.id}>
                <div className="division-summary">
                  <span className="card-number" aria-hidden="true">0{index + 1}</span>
                  <div className="card-art"><Photo name={division.id} decorative sizes="(max-width: 600px) 90px, 150px" /></div>
                  <div className="card-body">
                    <span className="card-tag">{division.tag}</span>
                    <h3><button className="division-toggle" aria-expanded={open} aria-controls={panelId} onClick={() => toggle(division.id)}>{division.title}</button></h3>
                    <p>{division.text}</p>
                  </div>
                  <span className="card-open" aria-hidden="true">+</span>
                </div>
                <div className="division-products" id={panelId} hidden={!open}>
                  <p className="products-intro">{details.intro}</p>
                  <div className="product-groups">
                    {details.groups.map((group) => (
                      <div className="product-group" key={group.title}>
                        <h4>{group.title}</h4>
                        {group.text && <p>{group.text}</p>}
                        {group.items && <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                      </div>
                    ))}
                  </div>
                  <div className="products-footer">
                    <p>{details.note}</p>
                    <button className="button" onClick={() => onEnquire(details)}>Enquire about {division.title.toLowerCase()} <span aria-hidden="true">→</span></button>
                  </div>
                </div>
              </article>
            );
          })}
          <div className="division-note"><span className="status-dot" /><span>Stock changes with the season. Ask us about current availability.</span></div>
        </div>
      </div>
    </section>
  );
}

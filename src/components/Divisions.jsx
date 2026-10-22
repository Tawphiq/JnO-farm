import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Photo from "./Photo.jsx";

const divisions = [
  { id: "livestock", group: "produce", title: "Livestock", text: "Pigs, cattle, sheep, goats & rabbits. Meat and breeding stock.", tag: "REARED ON THE FARM" },
  { id: "aquaculture", group: "produce", title: "Aquaculture", text: "Akosombo-strain tilapia & African catfish. Fingerlings to table-size.", tag: "FRESHWATER FARMING" },
  { id: "crops", group: "produce", title: "Crops & plants", text: "Field crops, fresh vegetables, seedlings & ornamental plants.", tag: "FROM THE SOIL" },
  { id: "feed", group: "inputs", title: "Animal feed", text: "Our own mill. Feed for poultry, livestock and fish.", tag: "MILLED BY J&O" },
  { id: "fertilizer", group: "inputs", title: "Fertilizer & trade", text: "Farm inputs in retail & bulk. Ghana-grown export produce.", tag: "SUPPLY & EXPORT" },
  { id: "consultancy", group: "expertise", title: "Knowledge & training", text: "Agro-consultancy and practical support for your next farming project.", tag: "GROW YOUR KNOW-HOW" },
];
const filters = [{ id: "all", label: "Everything", count: 6 }, { id: "produce", label: "Produce", count: 3 }, { id: "inputs", label: "Farm inputs", count: 2 }, { id: "expertise", label: "Training", count: 1 }];

export default function Divisions({ onSelect }) {
  const [filter, setFilter] = useState("all");
  const gridRef = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".division-card:not([hidden])", { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out", clearProps: "transform,opacity" });
    }, gridRef);
    return () => media.revert();
  }, [filter]);
  return (
    <section className="divisions-section section-space page-width" id="divisions" aria-labelledby="divisions-title">
      <div className="directory-layout">
        <div className="directory-intro" data-reveal>
          <p className="eyebrow"><span className="section-number">01</span> THE FARM DIRECTORY</p>
          <h2 id="divisions-title">One farm.<br />Many ways<br />to <span className="accent">grow.</span></h2>
          <p>From a bag of feed to your next harvest. Find your starting point, then talk to the people behind it.</p>
          <div className="directory-key"><span className="key-mark" aria-hidden="true">↳</span><span>SELECT A DIVISION<br />FOR PRODUCTS & DETAILS</span></div>
          <a href="#contact" className="text-link">Need a hand choosing? <span aria-hidden="true">↗</span></a>
        </div>
        <div className="directory-list">
          <div className="filter-bar" role="group" aria-label="Filter divisions">{filters.map((item) => <button key={item.id} className={`filter ${filter === item.id ? "active" : ""}`} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>{item.label}<sup>{item.count.toString().padStart(2, "0")}</sup></button>)}</div>
          <div className="division-grid" ref={gridRef}>{divisions.map((division, index) => (
            <button key={division.id} className="division-card" onClick={() => onSelect(division.id)} hidden={filter !== "all" && filter !== division.group}>
              <span className="card-number">0{index + 1}</span>
              <div className="card-art"><Photo name={division.id} sizes="(max-width: 600px) 90px, 150px" /></div>
              <div className="card-body"><span className="card-tag">{division.tag}</span><h3>{division.title}</h3><p>{division.text}</p></div>
              <span className="card-open" aria-hidden="true">↗</span>
            </button>
          ))}</div>
          <p className="sr-only" aria-live="polite">Showing {filters.find((item) => item.id === filter).count} {filter === "expertise" ? "division" : "divisions"}</p>
          <div className="division-note"><span className="status-dot" /><span>Stock changes with the season. Ask us about current availability.</span></div>
        </div>
      </div>
    </section>
  );
}

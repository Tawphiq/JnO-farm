import Photo from "./Photo.jsx";

const principles = [
  { title: "Farmers, at the source.", text: "Our head office and integrated farm are in Ankwensu. Our work starts with the land and the animals we care for." },
  { title: "Connected, from the ground up.", text: "Our crops, livestock, fish and feed mill work alongside one another. Practical knowledge is part of everything we supply." },
  { title: "Local roots. Nationwide reach.", text: "From household orders to bulk supply, we arrange delivery across Ghana. Tell us your location and what you need." },
  { title: "Real people. A direct conversation.", text: "Speak with Joseph, Owura and the team about current stock, your next order or support for your own farm." },
];

export default function Difference() {
  return (
    <section className="difference-section section-space page-width" id="difference" aria-labelledby="difference-title">
      <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="section-number">03</span> HOW THE FARM WORKS</p><h2 id="difference-title">Connected by land.<br /><span className="accent">Built on work.</span></h2></div><p>Our crops, animals, feed and people are part of the same story. Here’s what that means when you work with J&O.</p></div>
      <div className="difference-layout">
        <div className="difference-visual"><Photo name="fertilizer" parallax /><div className="photo-label"><span aria-hidden="true">↳</span><span>THE STARTING POINT<br /><strong>Always, the soil.</strong></span></div></div>
        <div className="principles">{principles.map((item, index) => <article className="principle" key={item.title} data-reveal><span className="principle-number">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="principle-mark" aria-hidden="true">↗</span></article>)}</div>
      </div>
    </section>
  );
}

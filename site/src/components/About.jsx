import Photo from "./Photo.jsx";

const principles = [
  { title: "Farmers, at the source", text: "Our head office and integrated farm are in Ankwensu. Our work starts with the land and the animals we care for." },
  { title: "Connected, from the ground up", text: "Our crops, livestock, fish and feed mill work alongside one another. Practical knowledge is part of everything we supply." },
  { title: "Local roots, nationwide reach", text: "From household orders to bulk supply, we arrange delivery across Ghana. Tell us your location and what you need." },
  { title: "Real people, a direct conversation", text: "Speak with Joseph, Owura and the team about current stock, your next order or support for your own farm." },
];

export default function About() {
  return (
    <section className="section about" id="about" data-nav-section="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-media">
          <div className="about-photo">
            <Photo name="about" sizes="(max-width: 1023px) 100vw, 50vw" />
          </div>
          <div className="about-photo-detail">
            <Photo name="aboutDetail" sizes="(max-width: 1023px) 45vw, 22vw" />
          </div>
        </div>
        <div className="about-copy">
          <p className="label">About J&O</p>
          <h2 id="about-title">It’s Joseph. It’s Owura. It’s personal.</h2>
          <p className="about-intro">Two brothers. One working farm.</p>
          <p>Joseph Ocloo and Owura (Edward Appiah-Dwomoh) founded J&O Farm Produce Ltd and lead the business together from Ankwensu, in Ghana’s Eastern Region.</p>
          <p>We rear our own livestock, grow our own crops, mill our own feed, and supply fertilizer. When you get in touch, you’re talking to the team that does the work.</p>
          <dl className="founders">
            <div><dt>Joseph Ocloo</dt><dd>Co-founder</dd></div>
            <div><dt>Owura</dt><dd>Edward Appiah-Dwomoh · Co-founder</dd></div>
          </dl>
        </div>
      </div>
      <div className="container">
        <ol className="principles">
          {principles.map((item, index) => (
            <li key={item.title}>
              <span className="principle-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

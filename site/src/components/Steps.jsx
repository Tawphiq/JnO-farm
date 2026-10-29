import Icon from "./Icon.jsx";
import Photo from "./Photo.jsx";

const steps = [
  { title: "Pick your products", text: "Browse or search the shop and tap the products you need to add them to your list." },
  { title: "Send your enquiry", text: "Send the list on WhatsApp, or use the form to add quantities and your delivery location." },
  { title: "Confirm with our team", text: "We confirm stock, pricing and delivery with you before you order." },
];

export default function Steps() {
  return (
    <section className="section steps-section" id="order" data-nav-section="order" aria-labelledby="order-title">
      <div className="container steps-grid">
        <div className="steps-media">
          <Photo name="order" parallax={8} sizes="(max-width: 1023px) 100vw, 50vw" />
        </div>
        <div className="steps-body">
          <p className="label">How ordering works</p>
          <h2 id="order-title">Three steps to your order.</h2>
          <ol className="steps">
            {steps.map((step, index) => (
              <li className="step" key={step.title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className="btn btn-primary" href="#shop">Start in the shop <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  );
}

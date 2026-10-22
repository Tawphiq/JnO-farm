import { useState } from "react";

export default function Contact({ interest, onInterestChange, nameRef }) {
  const [enquiryUrl, setEnquiryUrl] = useState("");
  function clearValidity(event) {
    event.target.setCustomValidity("");
  }
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of [
      form.elements.namedItem("name"),
      form.elements.namedItem("message"),
    ]) {
      if (!field.value.trim()) {
        field.setCustomValidity("Please enter a little more information.");
        field.reportValidity();
        return;
      }
    }
    if (!form.reportValidity()) return;
    const name = form.elements.namedItem("name").value.trim();
    const details = form.elements.namedItem("message").value.trim();
    const message = `Hello J&O Farm Produce!\n\nMy name is ${name}.\nI’m interested in: ${interest}.\n\n${details}`;
    const url = `https://wa.me/233243503083?text=${encodeURIComponent(message)}`;
    setEnquiryUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <>
      <section
        className="contact-section section-space"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="page-width contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow"><span className="section-number">06</span> A DIRECT LINE TO J&O</p>
            <h2 id="contact-title">
              What are
              <br />
              you growing?
            </h2>
            <p>
              Looking for produce, farm inputs, breeding stock or expert
              guidance? Tell us what you have in mind.
            </p>
            <a className="contact-phone" href="tel:+233243503083">
              +233 243 503 083 <span>↗</span>
            </a>
            <span className="contact-label">CALL OUR TEAM</span>
            <a
              className="contact-whatsapp text-link"
              href="https://wa.me/233243503083"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <div className="address">
              <svg>
                <use href="#icon-pin" />
              </svg>
              <div>
                <strong>Head office & integrated farm</strong>
                <p>Ankwensu, Eastern Region, Ghana</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ankwensu%2C%20Eastern%20Region%2C%20Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find Ankwensu on the map ↗
                </a>
              </div>
            </div>
          </div>
          <form
            className="enquiry-form"
            id="enquiry-form"
            onSubmit={handleSubmit}
          >
            <div className="form-heading"><span>J&O / ENQUIRY DESK</span><span aria-hidden="true">↙</span></div>
            <h3>Let’s get to work.</h3>
            <p>Ask about availability, pricing or delivery.</p>
            <label htmlFor="name">Your name</label>
            <input
              ref={nameRef}
              onInput={clearValidity}
              id="name"
              name="name"
              placeholder="Name or business name"
              autoComplete="name"
              required
              maxLength="100"
            />
            <label htmlFor="interest">I’m interested in</label>
            <select
              value={interest}
              onChange={(event) => onInterestChange(event.target.value)}
              id="interest"
              name="interest"
              required
            >
              <option value="">Select a division</option>
              <option>Livestock rearing</option>
              <option>Fish farming</option>
              <option>Crops, vegetables & plants</option>
              <option>J&O animal feed</option>
              <option>Fertilizer, imports & exports</option>
              <option>Agro-consultancy & training</option>
              <option>General enquiry</option>
            </select>
            <label htmlFor="message">What do you need?</label>
            <textarea
              onInput={clearValidity}
              id="message"
              name="message"
              rows="3"
              placeholder="Product, quantity, delivery location, or a question…"
              required
              maxLength="2000"
            ></textarea>
            <button className="button" type="submit">
              <svg>
                <use href="#icon-chat" />
              </svg>
              Continue on WhatsApp <span>↗</span>
            </button>
            <small>
              You’ll review your message in WhatsApp before sending.
            </small>
            {enquiryUrl && (
              <p id="form-status" role="status">
                Your enquiry is ready. If WhatsApp didn’t open,{" "}
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  open your message here ↗
                </a>
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

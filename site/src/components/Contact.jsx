import { useEffect, useState } from "react";
import { business } from "../data/business.js";
import { catalogue } from "../data/catalogue.js";
import { describePicks, whatsappUrl } from "../utils/enquiry.js";
import Icon from "./Icon.jsx";
import PickList from "./PickList.jsx";

const interests = [...Object.values(catalogue).map((division) => division.interest), "General enquiry"];

export default function Contact({ interest, onInterestChange, nameRef, picks, onRemovePick, onClearPicks }) {
  const [enquiryUrl, setEnquiryUrl] = useState("");
  useEffect(() => {
    setEnquiryUrl("");
  }, [interest, picks]);
  function clearValidity(event) {
    event.target.setCustomValidity("");
  }
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of [form.elements.namedItem("name"), form.elements.namedItem("message")]) {
      if (!field.value.trim()) {
        field.setCustomValidity("Please enter a little more information.");
        field.reportValidity();
        return;
      }
    }
    if (!form.reportValidity()) return;
    const name = form.elements.namedItem("name").value.trim();
    const details = form.elements.namedItem("message").value.trim();
    const topics = [
      picks.length > 0 && `I’d like to ask about:\n\n${describePicks(picks)}`,
      interest && `I’m interested in: ${interest}.`,
    ].filter(Boolean).join("\n\n");
    const url = whatsappUrl(`Hello J&O Farm Produce!\n\nMy name is ${name}.\n\n${topics}\n\n${details}`);
    setEnquiryUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <section className="section contact" id="contact" data-nav-section="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-info">
          <p className="label">Contact</p>
          <h2 id="contact-title">What are you growing?</h2>
          <p className="section-lead">Looking for produce, farm inputs, breeding stock or expert guidance? Tell us what you have in mind.</p>
          <ul className="contact-list">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <span className="contact-kind">WhatsApp</span>
                <span className="contact-value">Chat with our team</span>
                <Icon name="arrow" />
              </a>
            </li>
            <li>
              <a href="tel:+233243503083">
                <span className="contact-kind">Telephone</span>
                <span className="contact-value">+233 243 503 083</span>
                <Icon name="arrow" />
              </a>
            </li>
            {business.email && (
              <li>
                <a href={`mailto:${business.email}`}>
                  <span className="contact-kind">Email</span>
                  <span className="contact-value">{business.email}</span>
                  <Icon name="arrow" />
                </a>
              </li>
            )}
            <li>
              <a href="https://www.google.com/maps/search/?api=1&query=Ankwensu%2C%20Eastern%20Region%2C%20Ghana" target="_blank" rel="noopener noreferrer">
                <span className="contact-kind">Head office & integrated farm</span>
                <span className="contact-value">Ankwensu, Eastern Region, Ghana</span>
                <Icon name="external" />
              </a>
            </li>
          </ul>
        </div>
        <form className="enquiry-form" id="enquiry-form" onSubmit={handleSubmit} onChange={() => setEnquiryUrl("")}>
          <h3>Send an enquiry</h3>
          <p>Ask about availability, pricing or delivery. You’ll review your message in WhatsApp before sending.</p>
          <label htmlFor="name">Your name</label>
          <input ref={nameRef} onInput={clearValidity} id="name" name="name" placeholder="Name or business name" autoComplete="name" required maxLength="100" />
          {picks.length > 0 && (
            <div className="form-list">
              <div className="form-list-head">
                <span className="form-label">Your enquiry list</span>
                <button type="button" className="text-button" onClick={onClearPicks}>Clear list</button>
              </div>
              <PickList picks={picks} onRemove={onRemovePick} />
            </div>
          )}
          <label htmlFor="interest">
            I’m interested in{picks.length > 0 && <span className="optional"> (optional)</span>}
          </label>
          <select value={interest} onChange={(event) => onInterestChange(event.target.value)} id="interest" name="interest" required={picks.length === 0}>
            <option value="">Select a division</option>
            {interests.map((item) => <option key={item}>{item}</option>)}
          </select>
          <label htmlFor="message">What do you need?</label>
          <p className="field-hint" id="message-hint">{interest === catalogue.fertilizer.interest ? "For a bulk quote, include the product or fertilizer grade, quantity, delivery location and preferred timing." : "Include quantities and your delivery location, or tell us your question."}</p>
          <textarea onInput={clearValidity} id="message" name="message" aria-describedby="message-hint" rows="4" placeholder="Quantity, delivery location, or a question…" required maxLength="2000"></textarea>
          <button className="btn btn-primary btn-block" type="submit">
            <Icon name="chat" /> Continue on WhatsApp
          </button>
          {enquiryUrl && (
            <p id="form-status" role="status">
              Your enquiry is ready. If WhatsApp didn’t open, <a href={enquiryUrl} target="_blank" rel="noopener noreferrer">open your message here</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

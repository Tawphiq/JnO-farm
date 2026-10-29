import { listEnquiryUrl, whatsappUrl } from "../utils/enquiry.js";
import Icon from "./Icon.jsx";

// Phones and tablets: the enquiry list bar and the tab bar, within thumb reach.
export default function Dock({ activeSection, picks, onReview }) {
  return (
    <div className="dock">
      {picks.length > 0 && activeSection !== "contact" && (
        <div className="list-bar" role="region" aria-label="Your enquiry list">
          <button type="button" className="list-bar-review" onClick={onReview}>
            <span className="count">{picks.length}</span>
            <span>
              {picks.length === 1 ? "product" : "products"} in your list
              <small>Review & add details</small>
            </span>
          </button>
          <a className="btn btn-light btn-small" href={listEnquiryUrl(picks)} target="_blank" rel="noopener noreferrer">
            <Icon name="chat" /> Send<span className="sr-only"> your list on WhatsApp</span>
          </a>
        </div>
      )}
      <nav className="tab-bar" aria-label="Quick links">
        <a href="#home" aria-current={!activeSection || activeSection === "home" ? "location" : undefined}>
          <Icon name="home" />Home
        </a>
        <a href="#shop" aria-current={activeSection === "shop" ? "location" : undefined}>
          <Icon name="bag" />Products
        </a>
        <a href="tel:+233243503083">
          <Icon name="phone" />Call
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <Icon name="chat" />WhatsApp
        </a>
      </nav>
    </div>
  );
}

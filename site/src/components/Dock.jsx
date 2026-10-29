import { useEffect, useRef, useState } from "react";
import { listEnquiryUrl, whatsappUrl } from "../utils/enquiry.js";
import Icon from "./Icon.jsx";

// Phones and tablets: the enquiry list bar and a floating tab bar, within thumb reach.
export default function Dock({ activeSection, picks, onReview }) {
  const current = !activeSection || activeSection === "home" ? 0 : activeSection === "shop" ? 1 : -1;
  // The highlight stays where it was while it fades out, rather than sliding back to Home.
  const lastTab = useRef(0);
  if (current >= 0) lastTab.current = current;
  // Out of sight while the hero fills the screen; it slides up once half the hero has scrolled away.
  const [overHero, setOverHero] = useState(true);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return setOverHero(false);
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), { rootMargin: "-50% 0px 0px 0px" });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="dock" data-hidden={overHero || undefined}>
      {picks.length > 0 && activeSection !== "contact" && (
        <div className="list-bar" role="region" aria-label="Your enquiry list">
          <button type="button" className="list-bar-review" onClick={onReview}>
            <span className="count" data-list-target>{picks.length}</span>
            <span>
              {picks.length === 1 ? "product" : "products"} in your list
              <small>Review & add details</small>
            </span>
          </button>
          <a className="btn btn-sun btn-small" href={listEnquiryUrl(picks)} target="_blank" rel="noopener noreferrer">
            <Icon name="chat" /> Send<span className="sr-only"> your list on WhatsApp</span>
          </a>
        </div>
      )}
      <nav className="tab-bar" aria-label="Quick links" style={{ "--tab": lastTab.current }} data-active={current >= 0 || undefined}>
        <span className="tab-highlight" aria-hidden="true"></span>
        <a href="#home" aria-current={current === 0 ? "location" : undefined}>
          <Icon name="home" />Home
        </a>
        <a href="#shop" aria-current={current === 1 ? "location" : undefined}>
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

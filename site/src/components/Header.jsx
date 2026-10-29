import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "../utils/enquiry.js";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

export const navigation = [
  { id: "shop", label: "Products" },
  { id: "order", label: "How to order" },
  { id: "bulk", label: "Bulk supply" },
  { id: "about", label: "About us" },
  { id: "contact", label: "Contact" },
];

export default function Header({ activeSection, listCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const menuRef = useRef(null);
  useEffect(() => {
    const menu = menuRef.current;
    if (menuOpen && !menu.open) menu.showModal();
    if (!menuOpen && menu.open) menu.close();
  }, [menuOpen]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    // The bar is see-through only while it sits over the hero photo.
    const hero = document.querySelector(".hero-media");
    if (!hero) return setOverHero(false);
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  const close = () => setMenuOpen(false);
  return (
    <>
      <header className={`app-bar ${overHero ? "app-bar-clear" : ""}`}>
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="app-bar-actions">
          {listCount > 0 && (
            <a className="list-link" href="#enquiry-form">
              Your list <span className="count">{listCount}</span>
            </a>
          )}
          <a className="btn btn-outline btn-small app-bar-cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
          <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuOpen}>
            <Icon name="menu" />
          </button>
        </div>
      </header>
      <dialog
        className="menu"
        ref={menuRef}
        aria-label="Menu"
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="menu-panel">
          <div className="menu-head">
            <Brand onClick={close} />
            <button className="icon-button" onClick={close} aria-label="Close menu">
              <Icon name="close" />
            </button>
          </div>
          <nav className="menu-nav" aria-label="Menu">
            {navigation.map(({ id, label }, index) => (
              <a key={id} href={`#${id}`} onClick={close} aria-current={activeSection === id ? "location" : undefined}>
                <span className="menu-index">{String(index + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ))}
          </nav>
          <div className="menu-contact">
            <a className="btn btn-primary btn-block" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Icon name="chat" /> Chat on WhatsApp
            </a>
            <a className="btn btn-outline btn-block" href="tel:+233243503083">
              <Icon name="phone" /> Call +233 243 503 083
            </a>
            <p>Ankwensu, Eastern Region, Ghana</p>
          </div>
        </div>
      </dialog>
    </>
  );
}

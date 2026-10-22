import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const dismissOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);
  return (
    <>
      <div className="announcement">
        <span>FROM ANKWENSU. FOR GHANA.</span>
        <a href="tel:+233243503083">
          Call us <span className="announcement-phone">+233 243 503 083</span>
        </a>
      </div>
      <header className="site-header" ref={headerRef}>
        <a
          className="brand"
          href="#home"
          aria-label="J&O Farm Produce home"
          onClick={() => setMenuOpen(false)}
        >
          <svg
            className="brand-symbol"
            viewBox="0 0 48 52"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24 44V22M24 31C8 32 6 20 7 13c12 0 19 6 17 18Zm0-9C22 9 30 4 41 4c0 12-5 20-17 18Z"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <path
              d="M8 45c9-6 23-6 32 0M12 50c7-4 17-4 24 0"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
          <span className="brand-type">
            J<span className="amp">&</span>O
            <span className="brand-caption">FARM PRODUCE LTD</span>
          </span>
        </a>
        <nav
          className={menuOpen ? "open" : ""}
          onClick={() => setMenuOpen(false)}
          id="primary-nav"
          aria-label="Main navigation"
        >
          <a href="#divisions"><span>01</span> The farm</a>
          <a href="#story"><span>02</span> Our roots</a>
          <a href="#difference"><span>03</span> Our approach</a>
          <a href="#trade"><span>04</span> Bulk supply</a>
          <a href="#contact"><span>05</span> Talk to us</a>
        </nav>
        <a
          className="button button-small header-cta"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Enquire <span aria-hidden="true">→</span>
        </a>
        <button
          className="menu-toggle"
          ref={toggleRef}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          <span></span>
          <span></span>
        </button>
      </header>
    </>
  );
}

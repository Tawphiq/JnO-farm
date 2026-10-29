import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "../utils/enquiry.js";
import { gsap, reducedMotion } from "../utils/motion.js";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

export const navigation = [
  { id: "shop", label: "Products" },
  { id: "order", label: "How to order" },
  { id: "bulk", label: "Bulk supply" },
  { id: "about", label: "About us" },
  { id: "contact", label: "Contact" },
];

// Opening: the panel ripples out from the menu button, then the links rise out of their rows as the
// rules draw in.
function openMenu(menu, origin) {
  const q = gsap.utils.selector(menu);
  const [closed, covered] = origin;
  return gsap.timeline({ defaults: { ease: "expo.out" } })
    .fromTo(q(".menu-panel"), { clipPath: closed }, { clipPath: covered, duration: 0.9, ease: "power4.inOut" })
    .from(q(".menu-link-text"), { yPercent: 110, duration: 0.9, stagger: 0.06 }, 0.4)
    .from(q(".menu-nav a"), { "--draw": 0, duration: 1, stagger: 0.06, ease: "power3.inOut" }, 0.4)
    .from(q(".menu-index"), { x: -14, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.5)
    .from(q(".menu-head > *"), { y: -16, autoAlpha: 0, duration: 0.7 }, 0.45)
    .from(q(".menu-contact > *"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.6);
}

// Closing: the links drop away, then the panel folds back into the button.
function closeMenu(menu, origin) {
  const q = gsap.utils.selector(menu);
  const [closed] = origin;
  return gsap.timeline()
    .to(q(".menu-link-text"), { yPercent: -110, duration: 0.3, stagger: 0.03, ease: "power2.in" })
    .to(q(".menu-index, .menu-contact > *, .menu-head > *"), { autoAlpha: 0, duration: 0.25 }, 0)
    .to(q(".menu-panel"), { clipPath: closed, duration: 0.6, ease: "power4.inOut" }, 0.12);
}

export default function Header({ activeSection, listCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  // The menu's animations, and the section to go to once the menu has closed.
  const motion = useRef(null);
  const destination = useRef(null);
  useEffect(() => {
    const menu = menuRef.current;
    if (menuOpen && !menu.open) {
      menu.showModal();
      if (reducedMotion()) return;
      const button = buttonRef.current.getBoundingClientRect();
      const frame = menu.getBoundingClientRect();
      const x = button.left + button.width / 2 - frame.left;
      const y = button.top + button.height / 2 - frame.top;
      const radius = Math.hypot(Math.max(x, frame.width - x), Math.max(y, frame.height - y));
      const origin = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`];
      const context = gsap.context(() => {}, menu);
      motion.current = { context, origin, opening: context.add(() => openMenu(menu, origin)) };
    }
    if (!menuOpen && menu.open) {
      if (!motion.current) return menu.close();
      const { context, origin, opening } = motion.current;
      opening.kill();
      context.add(() => closeMenu(menu, origin).then(() => menu.close()));
    }
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
  function handleClosed() {
    motion.current?.context.revert();
    motion.current = null;
    setMenuOpen(false);
    const hash = destination.current;
    destination.current = null;
    if (!hash) return;
    if (location.hash !== hash) location.hash = hash;
    else document.querySelector(hash)?.scrollIntoView({ behavior: reducedMotion() ? "instant" : "smooth" });
  }
  // Menu links wait for the menu to fold away, then go to their section.
  function goTo(event) {
    event.preventDefault();
    destination.current = event.currentTarget.getAttribute("href");
    close();
  }
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
          <button ref={buttonRef} className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuOpen}>
            <Icon name="menu" />
          </button>
        </div>
      </header>
      <dialog
        className="menu"
        ref={menuRef}
        aria-label="Menu"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={handleClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="menu-panel">
          <div className="menu-head">
            <Brand onClick={goTo} />
            <button className="icon-button" onClick={close} aria-label="Close menu">
              <Icon name="close" />
            </button>
          </div>
          <nav className="menu-nav" aria-label="Menu">
            {navigation.map(({ id, label }, index) => (
              <a key={id} href={`#${id}`} onClick={goTo} aria-current={activeSection === id ? "location" : undefined}>
                <span className="menu-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="menu-link-mask">
                  <span className="menu-link-text">{label}</span>
                </span>
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

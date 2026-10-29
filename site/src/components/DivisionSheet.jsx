import { useLayoutEffect, useRef } from "react";
import { divisionEnquiryUrl, listEnquiryUrl, makePick } from "../utils/enquiry.js";
import { gsap, reducedMotion, SplitText } from "../utils/motion.js";
import Icon from "./Icon.jsx";
import Photo from "./Photo.jsx";
import ProductChip from "./ProductChip.jsx";

// Clip-path circles centred on a point: closed, and just large enough to cover the screen.
function circles({ x, y }) {
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  return [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`];
}

// Opening from a button: a wash of the division's colour ripples out from it and the sheet follows.
// Opening from the previous or next sheet: it wipes in from that side. Then the title rises, the
// photo unveils and the product groups follow.
function enter(dialog, { origin, step }) {
  const q = gsap.utils.selector(dialog);
  const body = dialog.querySelector(".sheet-body");
  const title = SplitText.create(dialog.querySelector(".sheet-name"), { type: "words", wordsClass: "word", mask: "words" });
  const timeline = gsap.timeline();
  if (step) {
    timeline.fromTo(body, { clipPath: step > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" });
  } else {
    const [closed, covered] = circles(origin);
    timeline.fromTo([dialog.querySelector(".sheet-wash"), body], { clipPath: closed }, { clipPath: covered, duration: 0.8, stagger: 0.12, ease: "power3.inOut" });
  }
  timeline
    .set(body, { clearProps: "clipPath" })
    .from(title.words, { yPercent: 110, duration: 1, stagger: 0.08, ease: "expo.out" }, step ? 0.4 : 0.55)
    .from(q(".sheet-photo"), { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "expo.out" }, "<-0.1")
    .from(q(".sheet-photo img"), { scale: 1.3, duration: 1.6, ease: "expo.out" }, "<")
    .from(q(".sheet-title .label, .sheet-intro"), { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "<0.15")
    .from(q(".sheet-group"), { y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, "<0.1")
    .from(q(".sheet-foot, .sheet-list"), { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "<0.3");

  // While the sheet scrolls, the photo drifts down inside its frame.
  const photo = dialog.querySelector(".sheet-photo img");
  const setPhoto = gsap.quickSetter(photo, "yPercent");
  const onScroll = () => setPhoto(Math.min(body.scrollTop / photo.offsetHeight, 1) * 6);
  body.addEventListener("scroll", onScroll, { passive: true });
  return () => body.removeEventListener("scroll", onScroll);
}

// Closing: the sheet shrinks back into the button it came from, then the colour wash after it.
function leave(dialog, origin) {
  const [closed, covered] = circles(origin);
  return gsap.timeline()
    .fromTo(dialog.querySelector(".sheet-body"), { clipPath: covered }, { clipPath: closed, duration: 0.6, ease: "power3.inOut" })
    .fromTo(dialog.querySelector(".sheet-wash"), { clipPath: covered }, { clipPath: closed, duration: 0.6, ease: "power3.inOut" }, 0.1);
}

// One division's full product list, in a modal dialog over the page.
export default function DivisionSheet({ division, index, total, previous, next, open, motion, picks, pickedIds, onToggle, onStep, onClose, onEnquire, onReview }) {
  const dialogRef = useRef(null);
  const context = useRef(null);
  const stepping = useRef(false);
  const number = String(index + 1).padStart(2, "0");
  const titleId = `sheet-${division.id}-title`;
  const canStep = previous !== division.name;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      stepping.current = false;
      dialog.showModal();
      dialog.querySelector(".sheet-body").scrollTop = 0;
      // Keep focus on the arrow that was pressed, so it can be pressed again.
      if (motion.step) dialog.querySelector(`[data-step="${motion.step}"]`)?.focus();
      if (!reducedMotion()) context.current = gsap.context(() => enter(dialog, motion), dialog);
    } else if (!open && dialog.open) {
      const animate = context.current && !reducedMotion();
      if (motion.step) {
        // The next sheet wipes in on top while this one drifts away beneath it.
        stepping.current = true;
        if (!animate) return dialog.close();
        context.current.add(() => gsap.to(dialog.querySelector(".sheet-body"), { xPercent: -30 * motion.step, duration: 0.9, ease: "expo.inOut", onComplete: () => dialog.close() }));
        return;
      }
      // Bring this division's card into view behind the sheet, then shrink the sheet into its button.
      const button = motion.after ? null : document.getElementById(`explore-${division.id}`);
      let origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      if (button) {
        let box = button.getBoundingClientRect();
        if (box.top < 96 || box.bottom > window.innerHeight - 96) {
          button.scrollIntoView({ block: "center", behavior: "instant" });
          box = button.getBoundingClientRect();
        }
        origin = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      }
      if (!animate) return dialog.close();
      context.current.add(() => leave(dialog, origin).then(() => dialog.close()));
    }
  }, [open]);

  function handleClosed() {
    context.current?.revert();
    context.current = null;
    if (stepping.current) return;
    if (motion.after) motion.after();
    else document.getElementById(`explore-${division.id}`)?.focus({ preventScroll: true });
    // Closed by the browser rather than through onClose (a repeated Escape can do that).
    if (open) onClose();
  }
  function handleKeyDown(event) {
    if (canStep && (event.key === "ArrowRight" || event.key === "ArrowLeft")) onStep(event.key === "ArrowRight" ? 1 : -1);
  }

  return (
    <dialog
      ref={dialogRef}
      className="sheet"
      data-division={division.id}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={handleClosed}
      onKeyDown={handleKeyDown}
    >
      <div className="sheet-wash" aria-hidden="true"></div>
      <div className="sheet-body">
        <div className="sheet-bar">
          <p className="sheet-count">{number}<span> / {String(total).padStart(2, "0")}</span></p>
          <div className="sheet-nav">
            {canStep && (
              <>
                <button type="button" className="icon-button" data-step="-1" onClick={() => onStep(-1)} aria-label={`Previous: ${previous}`}>
                  <Icon name="arrow" className="icon-back" />
                </button>
                <button type="button" className="icon-button" data-step="1" onClick={() => onStep(1)} aria-label={`Next: ${next}`}>
                  <Icon name="arrow" />
                </button>
              </>
            )}
            <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
              <Icon name="close" />
            </button>
          </div>
        </div>
        <div className="sheet-hero container">
          <div className="sheet-photo">
            <Photo name={division.id} decorative sizes="(max-width: 1023px) 100vw, 520px" />
          </div>
          <div className="sheet-title">
            <p className="label">{division.tag}</p>
            <h2 className="sheet-name" id={titleId}>{division.name}</h2>
            <p className="sheet-intro">{division.intro}</p>
          </div>
        </div>
        <div className="sheet-groups container">
          {division.groups.map((group) => (
            <div className="sheet-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.text && <p>{group.text}</p>}
              {group.checklist ? (
                <ul className="checklist">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : group.items && (
                <ul className="chips">
                  {group.items.map((item) => {
                    const pick = makePick(division.id, division, group, item);
                    return (
                      <li key={item}>
                        <ProductChip pick={pick} selected={pickedIds.has(pick.id)} onToggle={onToggle} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
        <footer className="sheet-foot container">
          <p>{division.note}</p>
          <div className="sheet-actions">
            <a className="btn btn-accent" href={divisionEnquiryUrl(division)} target="_blank" rel="noopener noreferrer">
              <Icon name="chat" /> Ask on WhatsApp<span className="sr-only"> about {division.name.toLowerCase()}</span>
            </a>
            <button type="button" className="text-link" onClick={onEnquire}>Use the enquiry form</button>
          </div>
        </footer>
        <div className="sheet-list">
          <p aria-live="polite">
            <span className="count" data-list-target>{picks.length}</span> {picks.length === 1 ? "product" : "products"} in your list
          </p>
          {picks.length > 0 ? (
            <>
              <button type="button" className="text-button" onClick={onReview}>Review</button>
              <a className="btn btn-sun btn-small" href={listEnquiryUrl(picks)} target="_blank" rel="noopener noreferrer">
                <Icon name="chat" /> Send<span className="sr-only"> your list on WhatsApp</span>
              </a>
            </>
          ) : (
            <span className="sheet-list-hint">Tap a product to add it</span>
          )}
        </div>
      </div>
    </dialog>
  );
}

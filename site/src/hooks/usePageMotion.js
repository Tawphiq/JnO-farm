import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "../utils/motion.js";

const motionOK = "(prefers-reduced-motion: no-preference)";
// Entrances play each time their element scrolls into view, and run back when it scrolls away below,
// ready for the next pass.
const replay = "play none none reverse";
// The hero copy has faded out by the time this much of the hero has scrolled away.
const heroFaded = "35% top";

// Scroll-linked motion for the whole page. Everything is set up inside gsap.matchMedia, so none of it
// runs (and all of it is undone) when reduced motion is preferred. Before the script runs, only the
// hero copy is hidden (the `intro` class from index.html), and a CSS fallback reveals it regardless.
// The product sheets and the menu animate themselves (DivisionSheet.jsx, Header.jsx).
export default function usePageMotion(scope) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    // The gallery pin comes first, so triggers further down the page allow for its pin spacing.
    media.add(`${motionOK} and (min-width: 1024px)`, pinGallery, scope.current);
    media.add(motionOK, () => {
      intro();
      parallax();
      headings();
      sections();
      return refreshOnLayoutChange();
    }, scope.current);
    media.add("(prefers-reduced-motion: reduce)", () => document.documentElement.classList.remove("intro"));
    return () => media.revert();
  }, [scope]);
}

// Elements outside the hero and the dialogs, which have their own entrances.
const onPage = (selector) => gsap.utils.toArray(selector).filter((element) => !element.closest(".hero, dialog"));

function intro() {
  const title = SplitText.create(".hero h1", { type: "words", wordsClass: "word", mask: "words" });
  // Lines depend on the font, which may still be loading: autoSplit re-splits the lead when it arrives.
  let lead;
  SplitText.create(".hero-lead", {
    type: "lines", linesClass: "line", mask: "lines", autoSplit: true,
    onSplit: (split) => (lead = gsap.from(split.lines, { yPercent: 100, duration: 1.1, stagger: 0.1, delay: 0.75, ease: "expo.out" })),
  });
  gsap.timeline({ defaults: { ease: "expo.out" } })
    .from(".hero-media img", { scale: 1.3, duration: 2.6, ease: "power3.out" }, 0)
    .from(".app-bar", { yPercent: -100, autoAlpha: 0, duration: 1 }, 0.2);
  const copy = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.3 })
    .from(".hero .label", { x: -30, autoAlpha: 0, duration: 1 }, 0)
    .from(title.words, { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.05)
    .from(".hero-actions > *", { y: 28, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.65);
  // The copy rises in again each time the page scrolls back up to the hero.
  ScrollTrigger.create({
    trigger: ".hero", start: heroFaded,
    onEnter: () => {
      copy.pause(0);
      lead?.pause(0);
    },
    onLeaveBack: () => {
      copy.restart();
      lead?.restart(true);
    },
  });
  // The from() tweens above have already applied their start states.
  document.documentElement.classList.remove("intro");
}

function parallax() {
  const hero = (end = "bottom top") => ({ trigger: ".hero", start: "top top", end, scrub: true });
  gsap.to(".hero-media img", { yPercent: 16, ease: "none", scrollTrigger: hero() });
  gsap.to(".hero-copy", { yPercent: -18, ease: "none", scrollTrigger: hero() });
  // Gone before it reaches the see-through app bar.
  gsap.to(".hero-copy", { opacity: 0, ease: "none", scrollTrigger: hero(heroFaded) });
  // Photos marked with Photo's `parallax` prop drift inside their frames; the image is scaled up
  // just enough that its edges never show.
  for (const frame of onPage("[data-parallax]")) {
    const amount = Number(frame.dataset.parallax);
    gsap.fromTo(frame.querySelector("img"), { yPercent: -amount, scale: 1 + amount * 0.025 }, {
      yPercent: amount, ease: "none",
      scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
    });
  }
  gsap.fromTo(".about-photo-detail", { yPercent: 30 }, {
    yPercent: -30, ease: "none",
    scrollTrigger: { trigger: ".about-media", start: "top bottom", end: "bottom top", scrub: true },
  });
}

// Section headings rise line by line out of masks. autoSplit re-splits them when fonts load or
// the width changes, and returning the tween keeps its progress across re-splits.
function headings() {
  for (const heading of onPage("main h2, .footer-slogan")) {
    SplitText.create(heading, {
      type: "lines", linesClass: "line", mask: "lines", autoSplit: true,
      onSplit: (split) => gsap.from(split.lines, {
        yPercent: 110, duration: 1.1, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: replay },
      }),
    });
  }
}

// Fades elements in as they scroll into view, and back out as they scroll away below. Opacity rather
// than visibility, so anything not yet revealed (the enquiry form, say) can still take focus.
function reveal(selector, from, vars = {}) {
  const elements = onPage(selector);
  if (!elements.length) return;
  const to = Object.fromEntries(Object.keys(from).map((key) => [key, key === "clipPath" ? "inset(0% 0% 0% 0%)" : key === "opacity" || key === "scale" ? 1 : 0]));
  gsap.set(elements, from);
  ScrollTrigger.batch(elements, {
    start: "top 90%",
    onEnter: (batch) => gsap.to(batch, { ...to, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: true, ...vars }),
    onLeaveBack: (batch) => gsap.to(batch, { ...from, duration: 0.5, ease: "power2.in", overwrite: true }),
  });
}

function sections() {
  reveal(":is(.section-intro, .steps-body, .bulk-copy, .about-copy, .contact-info) > .label, .section-intro > div > .label", { x: -24, opacity: 0 });
  reveal(".section-lead, .about-intro, .about-copy > p:not(.label), .bulk-copy > p:not(.label), .bulk-copy .btn, .steps-body > .btn", { y: 32, opacity: 0 });
  reveal(".category", { clipPath: "inset(100% 0% 0% 0%)", y: 60 }, { duration: 1.2, ease: "expo.out" });
  reveal(".figures > div, .founders > div, .principles li, .contact-list li", { y: 40, opacity: 0 });
  reveal(".gallery-track li", { x: 80, opacity: 0 }, { duration: 1.1 });
  reveal(".enquiry-form", { y: 60, opacity: 0 }, { duration: 1.1 });
  reveal(".footer-top > *", { y: 32, opacity: 0 });

  // Shop cards: the photo unrolls, then the copy and chips follow.
  for (const card of onPage(".division")) {
    gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%", toggleActions: replay } })
      .from(card.querySelector(".division-media"), { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut" })
      .from(card.querySelectorAll(".division-head > *, .division-intro, .division-preview li, .division-actions > *"), { y: 24, opacity: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" }, 0.35);
  }

  // How ordering works: each step slides in, its number fills as it passes the middle of the
  // screen, and a line grows down to the next step.
  for (const step of onPage(".step")) {
    gsap.from(step, { x: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 88%", toggleActions: replay } });
    ScrollTrigger.create({ trigger: step, start: "top 65%", toggleClass: "is-reached" });
    gsap.fromTo(step, { "--line": 0 }, { "--line": 1, ease: "none", scrollTrigger: { trigger: step, start: "top 65%", end: "bottom 65%", scrub: true } });
  }
}

// From 1024px the gallery pins and its photos scroll sideways, each drifting inside its frame.
function pinGallery() {
  const gallery = document.querySelector(".gallery");
  const track = gallery?.querySelector(".gallery-track");
  if (!track) return;
  gallery.classList.add("is-pinned");
  const distance = () => track.offsetWidth - document.documentElement.clientWidth;
  const slide = gsap.to(track, {
    x: () => -distance(), ease: "none",
    scrollTrigger: { trigger: gallery, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, refreshPriority: 1 },
  });
  for (const item of track.children) {
    gsap.fromTo(item.querySelector("img"), { xPercent: -8, scale: 1.25 }, {
      xPercent: 8, ease: "none",
      scrollTrigger: { trigger: item, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
    });
  }
  return () => gallery.classList.remove("is-pinned");
}

// Search results, the enquiry list and late-loading fonts all move content; recalculate the
// trigger positions once things settle. A refresh briefly resets the scroll position, which
// cancels any smooth scroll under way, so small shifts that barely move the triggers are ignored.
function refreshOnLayoutChange() {
  const main = document.getElementById("main");
  let measured = main.offsetHeight;
  let timer;
  const observer = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (Math.abs(main.offsetHeight - measured) < 40) return;
      measured = main.offsetHeight;
      ScrollTrigger.refresh();
    }, 150);
  });
  observer.observe(main);
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => {
    clearTimeout(timer);
    observer.disconnect();
  };
}

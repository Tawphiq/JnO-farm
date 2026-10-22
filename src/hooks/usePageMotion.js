import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Set by index.html. Checked once at load: if the fallback already revealed the hero, skip the intro.
const introPending = typeof document !== "undefined" && document.documentElement.classList.contains("intro-pending");

export default function usePageMotion(scope) {
  useLayoutEffect(() => {
    clearTimeout(window.introFallback);
    document.documentElement.classList.remove("intro-pending");
    const media = gsap.matchMedia();
    const root = scope.current;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (introPending) gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-line > span", { yPercent: 110, duration: 1.05, stagger: 0.12 })
        .from(".hero-image", { clipPath: "inset(0 0 100% 0)", duration: 1.25, clearProps: "clipPath" }, 0.15)
        .from(".hero-inset", { y: 40, opacity: 0, duration: 0.9, clearProps: "transform,opacity" }, 0.65)
        .from(".hero-stamp, .field-label", { scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.1, clearProps: "transform,opacity" }, 0.85)
        .from(".hero-copy > .eyebrow, .hero-description, .hero-actions", { y: 22, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.35)
        .from(".hero-footer", { y: 20, opacity: 0, duration: 0.9 }, 0.6);
      gsap.to(".scroll-progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, { y: 34, opacity: 0, duration: 0.85, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 94%", once: true }, clearProps: "transform,opacity" });
      });
      gsap.utils.toArray("[data-parallax]").forEach((frame) => {
        gsap.fromTo(frame.querySelector("img"), { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.7, invalidateOnRefresh: true } });
      });
      gsap.to(".landscape-title", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".landscape-section", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".marquee-track", { xPercent: 4 }, { xPercent: -16, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1.2 } });
    }, root);
    // Filters, opening divisions, fonts and responsive layout changes can move subsequent sections.
    let frame;
    const refresh = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => ScrollTrigger.refresh()); };
    const observer = new ResizeObserver(refresh);
    observer.observe(root);
    document.fonts?.ready.then(() => { if (root.isConnected) refresh(); });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); media.revert(); };
  }, [scope]);
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A dot flies from a product chip to the enquiry list count, which then bounces.
// Within a product sheet (a modal dialog), only that sheet's count is used.
export function flyToList(from) {
  if (reducedMotion()) return;
  const scope = from.closest("dialog") ?? document;
  // Wait a frame: the list bar only appears once the first product is added.
  requestAnimationFrame(() => {
    const target = [...scope.querySelectorAll("[data-list-target]")].find((element) => element.getClientRects().length > 0 && !(scope === document && element.closest("dialog")));
    if (!target) return;
    const start = from.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "fly-dot";
    dot.style.background = getComputedStyle(from).getPropertyValue("--accent") || "";
    (scope === document ? document.body : scope).append(dot);
    gsap.set(dot, { x: start.left + start.width / 2, y: start.top + start.height / 2, xPercent: -50, yPercent: -50 });
    gsap.timeline({
      onComplete() {
        dot.remove();
        gsap.fromTo(target, { scale: 1.4 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)", clearProps: "scale" });
      },
    })
      .to(dot, { x: end.left + end.width / 2, duration: 0.7, ease: "power1.inOut" }, 0)
      .to(dot, { y: end.top + end.height / 2, duration: 0.7, ease: "back.in(1.8)" }, 0)
      .to(dot, { scale: 0.45, duration: 0.7, ease: "power2.in" }, 0);
  });
}

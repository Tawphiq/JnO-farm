import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function usePageMotion(scope) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Copy and actions stay visible, including in the prerendered page.
      gsap.from(".hero-copy > *", {
        y: 10, opacity: 0.85, duration: 0.45, stagger: 0.05,
        ease: "power2.out", clearProps: "transform,opacity",
      });
    }, scope.current);
    return () => media.revert();
  }, [scope]);
}

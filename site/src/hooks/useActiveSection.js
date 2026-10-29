import { useEffect, useState } from "react";

// Returns the last `data-<attribute>` section whose top has scrolled above `offset` pixels.
export default function useActiveSection(attribute, offset) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const key = attribute.replace(/-./g, (match) => match[1].toUpperCase());
    const sections = [...document.querySelectorAll(`[data-${attribute}]`)];
    let frame;
    const update = () => {
      let current = "";
      for (const section of sections) {
        if (section.hidden) continue;
        if (section.getBoundingClientRect().top > offset) break;
        current = section.dataset[key];
      }
      setActiveSection(current);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Search results and font changes can move the section boundaries.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.getElementById("main"));
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [attribute, offset]);

  return activeSection;
}

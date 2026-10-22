import { useRef, useState } from "react";
import { catalogue } from "./data/catalogue.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Divisions from "./components/Divisions.jsx";
import Story from "./components/Story.jsx";
import Difference from "./components/Difference.jsx";
import Trade from "./components/Trade.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Icons from "./components/Icons.jsx";
import Landscape from "./components/Landscape.jsx";
import usePageMotion from "./hooks/usePageMotion.js";

export default function App() {
  const [interest, setInterest] = useState("");
  const nameRef = useRef(null);
  const pageRef = useRef(null);
  usePageMotion(pageRef);

  function handleEnquire(division) {
    setInterest(division.interest);
    requestAnimationFrame(() => {
      document.getElementById("contact").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      nameRef.current?.focus({ preventScroll: true });
    });
  }

  return (
    <div ref={pageRef} className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <div className="values-strip">
          <div><span>GROWN HERE</span><strong>Crops & plants</strong></div>
          <div><span>RAISED HERE</span><strong>Livestock & fish</strong></div>
          <div><span>MILLED HERE</span><strong>Animal feed</strong></div>
          <div><span>DELIVERED</span><strong>Across Ghana</strong></div>
        </div>
        <Divisions onEnquire={handleEnquire} />
        <Story />
        <Landscape />
        <Difference />
        <Trade onEnquire={() => handleEnquire(catalogue.fertilizer)} />
        <Contact
          interest={interest}
          onInterestChange={setInterest}
          nameRef={nameRef}
        />
      </main>
      <Footer />
      <Icons />
    </div>
  );
}

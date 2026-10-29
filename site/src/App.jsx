import { useRef, useState } from "react";
import { catalogue } from "./data/catalogue.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Categories from "./components/Categories.jsx";
import Shop from "./components/Shop.jsx";
import Steps from "./components/Steps.jsx";
import Bulk from "./components/Bulk.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Dock from "./components/Dock.jsx";
import Icons from "./components/Icons.jsx";
import useActiveSection from "./hooks/useActiveSection.js";
import usePageMotion from "./hooks/usePageMotion.js";

export default function App() {
  const [interest, setInterest] = useState("");
  const [picks, setPicks] = useState([]);
  const nameRef = useRef(null);
  const pageRef = useRef(null);
  const activeSection = useActiveSection("nav-section", 120);
  usePageMotion(pageRef);

  function goToForm() {
    requestAnimationFrame(() => {
      document.getElementById("enquiry-form").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
      nameRef.current?.focus({ preventScroll: true });
    });
  }
  function handleEnquire(division) {
    setInterest(division.interest);
    goToForm();
  }
  function togglePick(pick) {
    setPicks((current) => current.some((item) => item.id === pick.id) ? current.filter((item) => item.id !== pick.id) : [...current, pick]);
  }
  function removePick(id) {
    setPicks((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div ref={pageRef} className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header activeSection={activeSection} listCount={picks.length} />
      <main id="main">
        <Hero />
        <Categories />
        <Shop picks={picks} onTogglePick={togglePick} onRemovePick={removePick} onReview={goToForm} onEnquire={handleEnquire} />
        <Steps />
        <Bulk onEnquire={() => handleEnquire(catalogue.fertilizer)} />
        <About />
        <Gallery />
        <Contact
          interest={interest}
          onInterestChange={setInterest}
          nameRef={nameRef}
          picks={picks}
          onRemovePick={removePick}
          onClearPicks={() => setPicks([])}
        />
      </main>
      <Footer />
      <Dock activeSection={activeSection} picks={picks} onReview={goToForm} />
      <Icons />
    </div>
  );
}

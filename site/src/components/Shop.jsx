import { useEffect, useRef, useState } from "react";
import { catalogue } from "../data/catalogue.js";
import { divisionEnquiryUrl, listEnquiryUrl, makePick, whatsappUrl } from "../utils/enquiry.js";
import useActiveSection from "../hooks/useActiveSection.js";
import Icon from "./Icon.jsx";
import Photo from "./Photo.jsx";
import PickList from "./PickList.jsx";

const divisions = Object.entries(catalogue).map(([id, division]) => ({ id, ...division }));
const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function Shop({ picks, onTogglePick, onRemovePick, onReview, onEnquire }) {
  const [query, setQuery] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const tabsRef = useRef(null);
  const currentId = useActiveSection("shop-section", 150);

  const pickedIds = new Set(picks.map((pick) => pick.id));
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const searching = words.length > 0;
  const matches = (...texts) => {
    const haystack = normalize(texts.join(" "));
    return words.every((word) => haystack.includes(word));
  };
  const results = divisions.map((division) => {
    const groups = division.groups.map((group) => {
      if (!searching) return { ...group, shown: group.items ?? [] };
      // While searching, only product chips that match are shown.
      const shown = group.items && !group.checklist ? group.items.filter((item) => matches(item, group.title, division.name, division.title, division.tag)) : [];
      return { ...group, shown, hidden: shown.length === 0 };
    });
    const count = groups.reduce((sum, group) => sum + (group.checklist ? 0 : group.shown.length), 0);
    return { ...division, groups, count, hidden: searching && count === 0 };
  });
  const total = results.reduce((sum, division) => sum + division.count, 0);
  const firstShown = results.find((division) => !division.hidden)?.id;
  const activeId = results.some((division) => division.id === currentId && !division.hidden) ? currentId : firstShown;
  useEffect(() => {
    // On phones the tabs scroll sideways; keep the current category's tab in view.
    const tabs = tabsRef.current;
    const tab = tabs.querySelector('[aria-current="location"]');
    if (!tab || tabs.scrollWidth <= tabs.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tabs.scrollTo({ left: tab.offsetLeft - 16, behavior: reduce ? "instant" : "smooth" });
  }, [activeId]);

  function toggle(pick) {
    const removing = pickedIds.has(pick.id);
    const count = picks.length + (removing ? -1 : 1);
    onTogglePick(pick);
    setAnnouncement(`${pick.item} ${removing ? "removed from" : "added to"} your enquiry list. ${count} ${count === 1 ? "product" : "products"} in the list.`);
  }

  return (
    <section className="section shop" id="shop" data-nav-section="shop" aria-labelledby="shop-title">
      <div className="container">
        <div className="section-intro section-intro-split">
          <div>
            <p className="label">The farm shop</p>
            <h2 id="shop-title">Shop the farm.</h2>
          </div>
          <p className="section-lead">Tap products to add them to your enquiry list, then send it to our team on WhatsApp. Stock changes with the season, so we’ll confirm availability and price.</p>
        </div>
        <div className="shop-layout">
          <div className="shop-side">
            <div className="search">
              <label className="sr-only" htmlFor="product-search">Search products</label>
              <Icon name="search" className="search-icon" />
              <input id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search NPK, tilapia, feed…" autoComplete="off" enterKeyHint="search" />
              {query && (
                <button type="button" className="search-clear icon-button icon-button-small" onClick={() => setQuery("")} aria-label="Clear search">
                  <Icon name="close" />
                </button>
              )}
            </div>
            <nav className="category-tabs" ref={tabsRef} aria-label="Product categories">
              {results.map((division) => (
                <a key={division.id} href={`#shop-${division.id}`} aria-current={activeId === division.id ? "location" : undefined} data-empty={division.hidden || undefined}>
                  {division.name}
                  {searching && <span className="count">{division.count}</span>}
                </a>
              ))}
            </nav>
            <div className="list-card" aria-labelledby="list-card-title">
              <h3 id="list-card-title">
                Your enquiry list
                {picks.length > 0 && <span className="count">{picks.length}</span>}
              </h3>
              {picks.length === 0 ? (
                <p>Tap products to add them here, then send the whole list to our team in one message.</p>
              ) : (
                <>
                  <PickList picks={picks} onRemove={onRemovePick} />
                  <a className="btn btn-primary btn-block" href={listEnquiryUrl(picks)} target="_blank" rel="noopener noreferrer">
                    <Icon name="chat" /> Send on WhatsApp
                  </a>
                  <button type="button" className="btn btn-outline btn-block" onClick={onReview}>Add details in the form</button>
                </>
              )}
            </div>
          </div>
          <div className="shop-main">
            <p className="search-status" aria-live="polite">
              {searching && total > 0 && `${total} ${total === 1 ? "product matches" : "products match"} “${query.trim()}”`}
            </p>
            {results.map((division, index) => (
              <article key={division.id} className="division" id={`shop-${division.id}`} data-shop-section={division.id} hidden={division.hidden} aria-labelledby={`shop-${division.id}-title`}>
                {!searching && (
                  <div className="division-media">
                    <Photo name={division.id} decorative sizes="(max-width: 1023px) 100vw, 880px" />
                  </div>
                )}
                <header className="division-head">
                  <p className="label">{String(index + 1).padStart(2, "0")} — {division.tag}</p>
                  <h3 id={`shop-${division.id}-title`}>{division.name}</h3>
                </header>
                {!searching && <p className="division-intro">{division.intro}</p>}
                <div className="product-groups">
                  {division.groups.filter((group) => !group.hidden).map((group) => (
                    <div className={`product-group ${group.checklist ? "product-group-checklist" : ""}`} key={group.title}>
                      <h4>{group.title}</h4>
                      {group.text && !searching && <p>{group.text}</p>}
                      {group.checklist ? (
                        <ul className="checklist">
                          {group.shown.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      ) : group.shown.length > 0 && (
                        <ul className="chips">
                          {group.shown.map((item) => {
                            const pick = makePick(division.id, division, group, item);
                            const selected = pickedIds.has(pick.id);
                            return (
                              <li key={item}>
                                <button type="button" className="chip" aria-pressed={selected} onClick={() => toggle(pick)}>
                                  <Icon name={selected ? "check" : "plus"} />
                                  {item}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {!searching && (
                  <footer className="division-foot">
                    <p className="division-note">{division.note}</p>
                    <div className="division-actions">
                      <a className="btn btn-outline btn-small" href={divisionEnquiryUrl(division)} target="_blank" rel="noopener noreferrer">
                        <Icon name="chat" /> Ask on WhatsApp<span className="sr-only"> about {division.name.toLowerCase()}</span>
                      </a>
                      <button type="button" className="text-link" onClick={() => onEnquire(division)}>
                        Use the enquiry form
                      </button>
                    </div>
                  </footer>
                )}
              </article>
            ))}
            {searching && total === 0 && (
              <div className="empty-state">
                <h3>No products match “{query.trim()}”</h3>
                <p>We may still be able to help. Ask our team directly.</p>
                <a className="btn btn-primary" href={whatsappUrl(`Hello J&O Farm Produce! Do you have ${query.trim()}?`)} target="_blank" rel="noopener noreferrer">
                  <Icon name="chat" /> Ask on WhatsApp
                </a>
                <button type="button" className="text-link" onClick={() => setQuery("")}>Clear search</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{announcement}</p>
    </section>
  );
}

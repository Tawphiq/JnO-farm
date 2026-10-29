import { business } from "../data/business.js";
import Icon from "./Icon.jsx";
import Photo from "./Photo.jsx";

const figures = [
  { value: "27–500 MT", label: "Bulk fertilizer supply" },
  { value: "Nationwide", label: "Delivery across Ghana" },
  { value: "Export", label: "Raw cashew nuts, maize and palm products" },
];

export default function Bulk({ onEnquire }) {
  return (
    <section className="bulk" id="bulk" data-nav-section="bulk" aria-labelledby="bulk-title">
      <Photo name="bulk" sizes="100vw" />
      <div className="container bulk-grid">
        <div className="bulk-copy">
          <p className="label label-light">Bulk supply</p>
          <h2 id="bulk-title">Big plans? Let’s talk tonnage.</h2>
          <p>From fertilizer for your next planting season to raw cashew nuts for export, we connect farmers and businesses with the supply they need.</p>
          <button type="button" className="btn btn-light" onClick={onEnquire}>
            Request a bulk quote <Icon name="arrow" />
          </button>
        </div>
        <div>
          <dl className="figures">
            {figures.map((figure) => (
              <div key={figure.label}>
                <dt>{figure.value}</dt>
                <dd>{figure.label}</dd>
              </div>
            ))}
          </dl>
          {business.credentials.length > 0 && (
            <dl className="credentials" aria-label="Company details">
              {business.credentials.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

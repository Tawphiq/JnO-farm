import { useEffect, useRef } from "react";
import Photo from "./Photo.jsx";

export default function DivisionDialog({ division, divisionKey, onClose, onEnquire }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    dialog.showModal();
    document.body.classList.add("modal-open");
    return () => {
      dialog.close();
      document.body.classList.remove("modal-open");
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      event.currentTarget.close();
    }
  }

  function keepFocusInDialog(event) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll(
      'button:not(:disabled), a[href], [tabindex="0"]',
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <dialog
      id="division-dialog"
      ref={dialogRef}
      aria-labelledby="dialog-title"
      onClose={() => {
        // StrictMode may reopen the dialog before a queued close event arrives.
        if (!dialogRef.current?.open) onClose();
      }}
      onClick={closeOnBackdrop}
      onKeyDown={keepFocusInDialog}
    >
      <div className="dialog-toolbar">
        <span>Products & services</span>
        <button
          className="dialog-close"
          aria-label="Close division details"
          onClick={() => dialogRef.current.close()}
        >
          ×
        </button>
      </div>
      <div id="dialog-content">
        <Photo name={divisionKey} className="dialog-photo" sizes="(max-width: 760px) 100vw, 760px" />
        <div className="dialog-header">
          <h2 id="dialog-title">{division.title}</h2>
          <p>{division.intro}</p>
        </div>
        <div className="dialog-products">
          {division.groups.map((group) => (
            <section className="product-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.text && <p>{group.text}</p>}
              {group.items && (
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <div className="dialog-footer">
          <p>{division.note}</p>
          <button className="button" onClick={() => onEnquire(division)}>
            Enquire about this <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}

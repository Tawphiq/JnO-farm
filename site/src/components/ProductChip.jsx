import Icon from "./Icon.jsx";

// A product that can be added to or removed from the enquiry list.
export default function ProductChip({ pick, selected, onToggle }) {
  return (
    <button type="button" className="chip" aria-pressed={selected} onClick={(event) => onToggle(pick, event.currentTarget)}>
      <Icon name={selected ? "check" : "plus"} />
      {pick.item}
    </button>
  );
}

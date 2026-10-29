import Icon from "./Icon.jsx";

export default function PickList({ picks, onRemove }) {
  return (
    <ul className="pick-list">
      {picks.map((pick) => (
        <li key={pick.id}>
          <span>
            <strong>{pick.item}</strong>
            <small>{pick.group}</small>
          </span>
          <button type="button" className="icon-button icon-button-small" onClick={() => onRemove(pick.id)} aria-label={`Remove ${pick.item}, ${pick.group}`}>
            <Icon name="close" />
          </button>
        </li>
      ))}
    </ul>
  );
}

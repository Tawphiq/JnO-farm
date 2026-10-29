// Draws a symbol from the sprite in Icons.jsx. Icons are decorative; the text next to them names the action.
export default function Icon({ name, className = "" }) {
  return (
    <svg className={`icon ${className}`} aria-hidden="true">
      <use href={`#icon-${name}`} />
    </svg>
  );
}

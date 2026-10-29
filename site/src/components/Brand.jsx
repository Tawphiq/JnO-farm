export default function Brand({ className = "", onClick }) {
  return (
    <a className={`brand ${className}`} href="#home" aria-label="J&O Farm Produce home" onClick={onClick}>
      <svg className="brand-symbol" viewBox="0 0 48 52" fill="none" aria-hidden="true">
        <path d="M24 44V22M24 31C8 32 6 20 7 13c12 0 19 6 17 18Zm0-9C22 9 30 4 41 4c0 12-5 20-17 18Z" stroke="currentColor" strokeWidth="2.2" />
        <path d="M8 45c9-6 23-6 32 0M12 50c7-4 17-4 24 0" stroke="currentColor" strokeWidth="1.7" />
      </svg>
      <span className="brand-type">
        J<span className="amp">&</span>O
        <span className="brand-caption">FARM PRODUCE LTD</span>
      </span>
    </a>
  );
}

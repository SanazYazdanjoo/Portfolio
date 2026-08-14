// Chevron — rotates open/closed; no separate open/closed icon needed.
export function Chevron({ isOpen, className = "w-4 h-4 md:w-5 md:h-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`${className} shrink-0 transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

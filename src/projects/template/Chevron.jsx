// Chevron — rotates open/closed; no separate open/closed icon needed.
// The mark itself is HandChevron: drawn, like every other line on the site,
// so a disclosure control doesn't read as a different pen than the rule it
// sits on. This wrapper only adds the rotation state.
import { HandChevron } from "../../components/HandIcons";

export function Chevron({ isOpen, className = "w-4 h-4 md:w-5 md:h-5" }) {
  return (
    <HandChevron
      className={`${className} shrink-0 transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    />
  );
}

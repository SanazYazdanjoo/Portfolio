// Is the viewport below Tailwind's `md` (768px)? Shared by the components
// that switch decorative motion off on phones (ProjectHero's parallax,
// PrototypeFab's idle loops): on a phone, continuous ornament motion reads
// as the page shaking — Sanaz reported exactly that, on the element this
// hook was extracted to calm — and costs compositor work besides. This is
// a JS gate for framer-motion animate props, which Tailwind's responsive
// classes cannot reach.

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

// The general form. Same JS-gate reason: a component that mounts or unmounts
// per breakpoint (rather than merely restyling) cannot be expressed as a
// Tailwind class, because the class only hides what is already rendered.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia?.(query).matches ?? false
  );
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return;
    const onChange = (e) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export function useIsMobile() {
  return useMediaQuery(MOBILE_QUERY);
}

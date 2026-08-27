// Is the viewport below Tailwind's `md` (768px)? Shared by the components
// that switch decorative motion off on phones (ProjectHero's parallax,
// PrototypeFab's idle loops): on a phone, continuous ornament motion reads
// as the page shaking — Sanaz reported exactly that, on the element this
// hook was extracted to calm — and costs compositor work besides. This is
// a JS gate for framer-motion animate props, which Tailwind's responsive
// classes cannot reach.

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia?.(MOBILE_QUERY).matches ?? false
  );
  useEffect(() => {
    const mq = window.matchMedia?.(MOBILE_QUERY);
    if (!mq) return;
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

// Scroll tracking against the app's custom scroll container (the closest
// `.overflow-y-auto` ancestor — see App.jsx: the app scrolls inside a div,
// not the window). Returns two motion values: `scrollProgress` (0–1, drives
// the top progress bar) and `scrollY` (exact pixels, drives the hero
// parallax).

import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

export function useScrollProgress(mainRef) {
  const scrollProgress = useMotionValue(0);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const root = mainRef.current?.closest(".overflow-y-auto");
    if (!root) return;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      scrollProgress.set(max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0);
      scrollY.set(root.scrollTop);
    };
    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mainRef, scrollProgress, scrollY]);

  return { scrollProgress, scrollY };
}

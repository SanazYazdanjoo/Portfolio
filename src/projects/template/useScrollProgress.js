// Scroll tracking against the app's custom scroll container (the closest
// `.overflow-y-auto` ancestor — see App.jsx: the app scrolls inside a div,
// not the window). Returns two motion values: `scrollProgress` (0–1, drives
// the top progress bar) and `scrollY` (exact pixels, drives the hero
// parallax).
//
// `enabled: false` attaches no listener and leaves both values at 0. Phones
// pass it: neither consumer renders there (the progress bar is desktop-only
// and the hero is static below md), so a per-scroll-event main-thread
// listener would be updating two motion values nothing reads.

import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

export function useScrollProgress(mainRef, { enabled = true } = {}) {
  const scrollProgress = useMotionValue(0);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return;
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
  }, [mainRef, scrollProgress, scrollY, enabled]);

  return { scrollProgress, scrollY };
}

// The app scrolls inside a custom container (scrollRef), not the window, so
// React Router's default hash/scroll handling doesn't reach it: hash links
// need a manual scrollIntoView, and route changes need an explicit reset to
// top or the previous page's scroll position leaks into the next one.
//
// Because that container is the only scroller, the shell around it has to
// fit the visible viewport exactly — see `.app-shell` in index.css for why
// it is a dvh-based class and not Tailwind's h-screen. `overscroll-y-contain`
// on the container is the second half of the same rule: it keeps a flick at
// either end from chaining out to the document.

import React, { useRef, useState, useEffect, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SketchTrail } from "./components/SketchTrail";
import { RouteSkeleton } from "./components/RouteSkeleton";
import { profileData as rawProfile } from "./data/profile";
import { useLocalizedProfile } from "./hooks/useLocalizedProfile";
import { useTranslation } from "./context/LanguageContext";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Nav shrinks on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setIsScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Hash anchors and route-change scroll reset
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (location.hash) {
      // Target section may mount a frame or two after navigation;
      // retry up to ~10 frames before giving up.
      let attempts = 0;
      const tryScroll = () => {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts++ < 10) {
          requestAnimationFrame(tryScroll);
        }
      };
      requestAnimationFrame(tryScroll);
    } else {
      // New route, no hash: start at the top, instantly.
      el.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  // Reduced motion is answered once, here, for every animation in the app.
  // Per-component `useReducedMotion` guards still exist and still help, but
  // they are belt-and-braces now rather than the only thing standing between
  // a motion-sensitive reader and a page full of entrances.
  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell flex flex-col bg-bg relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]
                     focus:bg-bg focus:text-text focus:px-4 focus:py-2 focus:border focus:border-primary-600
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          {t("common.skipToContent")}
        </a>
        <header className="w-full z-50 shrink-0 px-8 md:px-12 lg:px-16 pt-6 md:pt-8 bg-bg no-print">
          <Nav isScrolled={isScrolled} />
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain
                     relative z-10 px-8 md:px-12 lg:px-16"
          style={{ scrollBehavior: "smooth" }}
        >
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={<RouteSkeleton />}>
              <Outlet />
            </Suspense>
          </main>

          <div className="w-full flex flex-col justify-center shrink-0 relative z-10">
            <Footer data={profileData} />
          </div>

          <SketchTrail />
        </div>
        <Analytics/>
      </div>
    </MotionConfig>
  );
}
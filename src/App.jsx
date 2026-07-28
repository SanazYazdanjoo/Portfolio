// src/App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SCROLL MANAGER FIX — two bugs in one effect:
//
//   1. /#projects DID NOT SCROLL. The app scrolls inside a custom container
//      (scrollRef div), not the window. React Router changes the URL but
//      neither the router nor the browser scrolls a nested container to a
//      hash target on client-side navigation. The nav link silently no-oped.
//
//   2. SCROLL POSITION LEAKED BETWEEN ROUTES. Navigating from a long page
//      (e.g. /about, scrolled to the bottom) to /cv landed you mid-page,
//      because the inner container keeps its scrollTop. <ScrollRestoration />
//      can't help — it only watches window scroll.
//
// The effect below: on hash → retry-scroll to the anchor (retries because the
// target section may not be mounted on the first frame after a route change);
// on plain route change → hard reset to top ("instant" beats the container's
// CSS scroll-behavior: smooth, so there's no janky animated rewind).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SketchTrail } from "./components/SketchTrail";
import { profileData as rawProfile } from "./data/profile";
import { useLocalizedProfile } from "./hooks/useLocalizedProfile";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const profileData = useLocalizedProfile(rawProfile);
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // ── Nav shrink on scroll (unchanged) ──
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setIsScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Scroll manager: hash anchors + route-change reset ──
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (location.hash) {
      // Target section may mount a frame or two after navigation —
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
      // New route, no hash → start at the top, instantly.
      el.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="h-screen flex flex-col bg-bg relative">
      {/* No border, no fixed height — just padding */}
      <header className="w-full z-50 shrink-0 px-8 md:px-12 lg:px-16 pt-6 md:pt-8 bg-bg no-print">
        <Nav isScrolled={isScrolled} />
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 px-8 md:px-12 lg:px-16"
        style={{ scrollBehavior: "smooth" }}
      >
        <main>
          <Outlet />
        </main>

        <div className="w-full flex flex-col justify-center shrink-0 relative z-10">
          <Footer data={profileData} />
        </div>

        <SketchTrail />
      </div>
      <Analytics />
    </div>
  );
}
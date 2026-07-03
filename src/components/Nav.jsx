// src/components/Nav.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Ink & Bloom edition.
//
// What changed:
//   • Logotype inherits Fraunces (font-display) — it IS the brand mark now.
//     Demoted from <h1> to <p>: the page's real h1 lives in the Hero. One h1
//     per page is the accessibility-correct structure.
//   • Link language: active = ink + coral dot · hover = rose (the whisper).
//   • MOBILE MENU BUG FIX: the old dropdown used `absolute top-full` with no
//     positioned ancestor, so it rendered off-screen against the root div.
//     Replaced with a fixed full-screen paper overlay — large Fraunces links,
//     comfortable tap targets (your roadmap's Mobile UX Audit item).
//   • aria-expanded + translated open/close labels (nav.openMenu/closeMenu).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export const Nav = ({ isScrolled = false }) => {
  const profileData = useLocalizedProfile(rawProfile);

  return (
    <nav data-no-sketch="true" className="w-full no-print">
      {/* items-start = nav links align to TOP of the name, not baseline */}
      <div className="flex items-start justify-between w-full">

        {/* ── Name: the brand mark, flush left ── */}
        <div className="flex items-start gap-3 shrink-0">
          <LanguageToggle />
          <NavLink to="/" aria-label="Home — Sanaz Yazdanjoo">
            <p
              className="font-display text-text leading-[0.95] transition-all duration-300"
              style={{
                fontWeight: 800,
                fontSize: isScrolled ? "clamp(1.25rem, 2.5vw, 2rem)" : "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "-0.015em",
                fontVariationSettings: "'opsz' 72, 'SOFT' 30",
              }}
            >
              {isScrolled ? "Sanaz Yazdanjoo" : <>{`Sanaz`}<br />{`Yazdanjoo`}</>}
            </p>
          </NavLink>
        </div>

        {/* ── Links: top-right, small, wide gaps ── */}
        <ul className="hidden md:flex items-start gap-10 lg:gap-14 pt-1">
          {profileData.navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative text-[13px] md:text-[14px] transition-colors duration-200
                   ${isActive
                     ? "text-text font-semibold"
                     : "text-text/40 hover:text-secondary-600"
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {/* Coral dot — a pen tap under the current page */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-2
                                   w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <MobileMenu links={profileData.navLinks} />
      </div>
    </nav>
  );
};

/* ── Full-screen mobile overlay (replaces the off-screen dropdown) ── */
function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Close on route change + lock body scroll while open
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative z-[70] text-text p-3 -m-1"
        aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
        aria-expanded={open}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open
            ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            : <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>
          }
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col justify-center px-10"
          >
            {/* Paper grain carries into the overlay */}
            <div className="absolute inset-0 bg-paper-texture pointer-events-none" aria-hidden="true" />

            <ul className="relative flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 font-display font-black text-4xl leading-tight
                       transition-colors duration-200
                       ${isActive ? "text-text" : "text-text/35 hover:text-secondary-600"}`
                    }
                  >
                    {({ isActive }) => (
                      isActive
                        ? <span className="ink-highlight">{link.name}</span>
                        : link.name
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
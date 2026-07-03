// src/components/Nav.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIX (screenshot feedback): the Nav no longer renders the giant two-line name.
// The Hero owns the display-size name — one star per screen. The Nav is now a
// compact Bricolage wordmark, always one line, shrinking slightly on scroll.
//
// Everything else from the Ink & Bloom version stays:
//   • active link = ink + coral pen-tap dot · hover = rose
//   • fixed full-screen mobile overlay (the old dropdown rendered off-screen)
//   • aria-expanded + translated open/close labels
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
      <div className="flex items-center justify-between w-full pb-4 border-b border-border">

        {/* ── Wordmark: compact, one line, always ── */}
        <div className="flex items-center gap-3 shrink-0">
          <LanguageToggle />
          <NavLink to="/" aria-label="Home — Sanaz Yazdanjoo">
            <p
              className="font-display text-text whitespace-nowrap transition-all duration-300"
              style={{
                fontWeight: 700,
                fontSize: isScrolled ? "1.15rem" : "1.45rem",
                letterSpacing: "-0.01em",
                fontVariationSettings: "'opsz' 24",
              }}
            >
              Sanaz Yazdanjoo
            </p>
          </NavLink>
        </div>

        {/* ── Links: right, small, wide gaps ── */}
        <ul className="hidden md:flex items-center gap-9 lg:gap-12">
          {profileData.navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative text-[13px] md:text-[14px] transition-colors duration-200
                   ${isActive
                     ? "text-text font-semibold"
                     : "text-text/45 hover:text-secondary-600"
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
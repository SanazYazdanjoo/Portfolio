// Desktop order: links → language toggle. Mobile order: toggle → burger
// (burger stays at the screen edge for thumb reach).

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { EASE } from "../utils/motion";

// Maps each nav route to its translation key so labels follow the current
// language instead of the raw (English-only) name stored in profile data.
const NAV_LABEL_KEYS = {
  "/": "nav.home",
  "/projects": "nav.work",
  "/about": "nav.about",
  "/contact": "nav.contact",
  "/cv": "nav.cv",
  "/designsystem": "nav.designSystem",
};

export const Nav = ({ isScrolled = false }) => {
  const profileData = useLocalizedProfile(rawProfile);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  // `secondary: true` in profile.navLinks keeps a destination routed and in
  // the sitemap while taking it out of the primary nav. Two entries use it:
  // Home, because the wordmark to the left is already the home link, and
  // Design System, a reference page for one reader in a hundred that was
  // sitting at the same weight as Work and Contact. What is left is the four
  // things a visitor actually chooses between.
  const navLinks = profileData.navLinks
    .filter((link) => !link.secondary)
    .map((link) => ({
      ...link,
      name: NAV_LABEL_KEYS[link.path] ? t(NAV_LABEL_KEYS[link.path]) : link.name,
    }));

  return (
    <motion.nav
      data-no-sketch="true"
      className="w-full no-print"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: EASE }}
    >
      <div className="flex items-center justify-between w-full pb-s16 border-b rule-b">

        {/* Wordmark: left, compact, one line */}
        <NavLink to="/" aria-label={profileData.name} className="shrink-0">
          <p
            className="font-display text-text whitespace-nowrap transition-all duration-300"
            style={{
              fontWeight: 700,
              fontSize: isScrolled ? "1.15rem" : "1.45rem",
              letterSpacing: "-0.01em",
              fontVariationSettings: "'opsz' 24",
            }}
          >
            {profileData.name}
          </p>
        </NavLink>

        {/* Right cluster: links → language toggle → (mobile) burger */}
        <div className="flex items-center gap-s24 md:gap-s32 lg:gap-s48">
          <ul className="hidden md:flex items-center gap-s32 lg:gap-s48">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `group relative text-body transition-colors duration-200
                     ${isActive
                       ? "text-text font-semibold"
                       : "text-text-meta hover:text-secondary-600"
                     }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {/* Hover underline — the house hairline, left to right, 200ms */}
                      <span
                        aria-hidden="true"
                        style={{ height: "var(--rule-w)", bottom: "calc(-1 * var(--space-4))" }}
                        className="absolute left-0 w-full bg-secondary-600 rule-stroke
                                   origin-left scale-x-0 group-hover:scale-x-100
                                   transition-transform duration-200 ease-smooth"
                      />
                      {/* Coral dot — a pen tap under the current page. Shared
                          layoutId so it slides between items instead of popping. */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          aria-hidden="true"
                          className="absolute left-1/2 -translate-x-1/2 -bottom-s8
                                     w-s4 h-s4 rule-dot bg-primary"
                          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Far right on desktop; inside the burger on mobile */}
          <LanguageToggle />

          <MobileMenu links={navLinks} />
        </div>
      </div>
    </motion.nav>
  );
};

/* Full-screen mobile overlay */
function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap + Escape-to-close + focus-return, mirroring Credentials.jsx's
  // CertificateLightbox (same keydown/Tab-cycling logic). The one structural
  // difference: that lightbox only mounts while open, so its parent's
  // callback returns focus to whichever card triggered it; this menu is
  // always mounted with a single fixed trigger (the burger button), so
  // autofocus + trap + focus-return all live in one effect here instead.
  useEffect(() => {
    if (!open) return undefined;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    panelRef.current?.querySelector(focusableSelector)?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(focusableSelector);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="relative z-[70] text-text p-s12 -m-s4 focus-ring"
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
            ref={panelRef}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col justify-center px-s32"
          >
            <ul className="relative flex flex-col gap-s8">
              {links.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35, ease: EASE }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-s12 font-display font-black text-h1 leading-tight
                       transition-colors duration-200
                       ${isActive ? "text-text" : "text-dim hover:text-secondary-600"}`
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
// Desktop order: links → language toggle. Mobile order: toggle → burger
// (burger stays at the screen edge for thumb reach).

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { SiteSearch } from "./SiteSearch";
import { HandMenu, HandClose } from "./HandIcons";

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

export const Nav = () => {
  const profileData = useLocalizedProfile(rawProfile);
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
    <nav
      data-no-sketch="true"
      /* enter-fade, never enter-up: an animated transform on this element
         — even one that ends at `none` — makes it the containing block for
         the mobile menu's position:fixed overlay, which then clips to the
         header's height instead of covering the viewport. */
      className="w-full no-print grid-12 py-s20 enter-fade"
    >
      {/* One row, baseline-aligned, as the reference sets it: the wordmark
          at body size in the display face, the destinations at nav size in
          dim ink, and the active one carrying a 1.5px rule in the accent. */}
      <div className="md:col-span-12 flex items-baseline justify-between w-full gap-s32">

        <NavLink to="/" aria-label={profileData.name} className="shrink-0">
          <span className="text-wordmark font-display font-bold text-text whitespace-nowrap">
            {profileData.name}
          </span>
        </NavLink>

        <div className="flex items-baseline gap-s28">
          <ul className="hidden md:flex items-baseline gap-s28 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `group relative text-nav pb-s3 transition-colors duration-200 ${
                      isActive ? "text-text font-medium" : "text-dim hover:text-text"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {/* Drawn, not stroked. The current page carries the
                          house hairline in the accent; hover draws the same
                          line in rose, left to right. `rule-stroke` masks the
                          span's own background, so both are one mechanism. */}
                      <span
                        aria-hidden="true"
                        style={{ height: "var(--rule-w)" }}
                        className={`absolute left-0 right-0 bottom-0 rule-stroke origin-left
                                    transition-transform duration-200 ease-smooth ${
                          isActive
                            ? "bg-primary-600 scale-x-100"
                            : "bg-secondary-600 scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <SiteSearch />

          <LanguageToggle />

          <ThemeToggle />

          <MobileMenu links={navLinks} />
        </div>
      </div>
    </nav>
  );
};

/* Full-screen mobile overlay */
function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
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

    // Captured now so the cleanup returns focus to the button that was the
    // trigger when the menu opened, not whatever the ref holds at cleanup.
    const trigger = triggerRef.current;
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
      trigger?.focus();
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
        {/* Drawn, not ruled — the burger is the first mark a phone visitor
            sees, so it comes from the same pen as everything else. */}
        {open ? <HandClose className="w-[22px] h-[22px]" /> : <HandMenu className="w-[22px] h-[22px]" />}
      </button>

      {open && (
          <div
            ref={panelRef}
            /* data-corner-cta: this overlay's z-[60] only counts INSIDE the
               header's z-50 stacking context — the ASK AI pill sits at the
               shell level at z-[80] and would float over the open menu.
               Declaring the overlay a corner occupant parks the pill (and
               the prototype badge) instead; see useCornerOccupied. */
            data-corner-cta=""
            className="fixed inset-0 z-[60] bg-bg flex flex-col justify-center px-s32 enter-fade"
          >
            <ul className="relative flex flex-col gap-s8">
              {links.map((link, i) => (
                <li
                  key={link.path}
                  className="enter-up"
                  style={{ "--enter-delay": `${0.06 * i}s`, "--enter-dur": "0.35s" }}
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
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
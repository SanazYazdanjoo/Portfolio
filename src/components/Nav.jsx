import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
import { LanguageToggle } from './LanguageToggle';

export const Nav = ({ isScrolled = false }) => {
  const profileData = useLocalizedProfile(rawProfile);

  return (
    <nav data-no-sketch="true" className="w-full no-print">
      {/* items-start = nav links align to TOP of the name, not baseline */}
      <div className="flex items-start justify-between w-full">

        {/* ── Name: large, bold, flush left ── */}
        <div className="flex items-start gap-3 shrink-0">
          <LanguageToggle />
          <NavLink to="/">
            <h1
              className="font-display text-text leading-[0.95] transition-all duration-300"
              style={{
                fontWeight: 800,
                fontSize: isScrolled ? "clamp(1.25rem, 2.5vw, 2rem)" : "clamp(2.5rem, 5vw, 5rem)",
                letterSpacing: "-0.035em",
              }}
            >
              {isScrolled ? "Sanaz Yazdanjoo" : <>{`Sanaz`}<br />{`Yazdanjoo`}</>}
            </h1>
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
                  `text-[13px] md:text-[14px] transition-colors duration-200
                   ${isActive ? "text-text" : "text-text/40 hover:text-text"}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <MobileMenu links={profileData.navLinks} />
      </div>
    </nav>
  );
};

function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="text-text p-2" aria-label="Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
          }
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 bg-[var(--bg)] px-8 py-8 flex flex-col gap-5 z-50">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === "/"} onClick={() => setOpen(false)}
                className={({ isActive }) => `text-base ${isActive ? "text-text" : "text-text/40"}`}>
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// src/components/Nav.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "../data/profile";
import { CircleDoodle } from "./DoodleLibrary";

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const listVariants = {
  hidden: {},
  show:  { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit:  { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit:   { opacity: 0, x: -10, transition: { duration: 0.18, ease: "easeIn" } },
};

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  return (
    <nav data-no-sketch="true" className="w-full h-full no-print  ">
      {/* h-full fills the parent <header> height exactly */}
<div className="flex items-center justify-between h-full px-6 md:px-12 max-w-screen-2xl mx-auto w-full "> 
         {/* ── LOGO ── */}
        <NavLink to="/" onClick={() => setIsOpen(false)} className=" flex items-center group shrink-0 cursor-pointer ">
          <div className="relative flex items-center">
            <img
              src="/assets/logo-SYazdanjoo.png"
              alt="Sanaz Yazdanjoo Logo"
              className="h-12 w-auto md:h-16 object-contain transition-all duration-300 ease-out group-hover:scale-105"
            />
            <span className="text-primary text-4xl leading-none ml-1 self-end mb-2">.</span>
          </div>
        </NavLink>

        {/* ── RIGHT SIDE: links + toggle ── */}
        <div className="flex items-center gap-2 cursor-pointer ">

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                key="nav-links"
                variants={listVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex items-center gap-1 md:gap-2"
              >
                {profileData.navLinks.map((link) => (
                  <motion.li key={link.path} variants={itemVariants}>
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setHoveredPath(link.path)}
                      onMouseLeave={() => setHoveredPath(null)}
                      className={({ isActive }) =>
                        `relative px-3 py-2 text-xs md:text-sm font-bold uppercase tracking-widest
                         transition-colors duration-300 inline-block
                         ${isActive ? "text-primary" : "text-dim hover:text-text"}`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="relative z-10">{link.name}</span>
                          <CircleDoodle
                            isAnimated={!isActive && hoveredPath === link.path}
                            className={`absolute inset-0 w-full h-full pointer-events-none
                              transition-all duration-300 ease-out
                              ${isActive
                                ? "opacity-100 text-primary scale-110"
                                : hoveredPath === link.path
                                  ? "opacity-100 text-accent scale-110"
                                  : "opacity-0 scale-95"
                              }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* ── + rotates to × on open ── */}
          <motion.button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-primary p-2 shrink-0"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.88 }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <PlusIcon />
          </motion.button>

        </div>
      </div>
    </nav>
  );
};
// src/components/ScrollIndicator.jsx
// Redesigned for snap-mandatory: the flower now SNAPS between dot positions
// (discrete states) to mirror the page's own snap behaviour.
// Active section is detected via IntersectionObserver — far more reliable
// than scroll-% thresholds when snap is in play.

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { label: "Top",      sectionId: "Hero-Section"    },
  { label: "About",    sectionId: "AboutMe-Section" },
  { label: "Projects", sectionId: "projects"        },
];

// ViewBox dimensions — must match the SVG viewBox
const VB_W = 20;
const VB_H = 1000;

// Wobbly vertical path — same as before
const TRACK_PATH = `
  M 10 0
  C 13 80,   7 160,  10 240
  C 12.4 310, 8 390, 10 470
  C 11.6 540, 7.6 620, 10.4 700
  C 12 760,   8.4 840, 10 920
  C 11 955,   9.6 980, 10 1000
`;

// Evenly distribute 3 dots across the path (0%, 50%, 100%)
// Matches 3 equal min-h-screen snap sections.
const DOT_PROGRESS = [0, 0.5, 1.0];

function toPercent(pt) {
  return {
    left: `${(pt.x / VB_W) * 100}%`,
    top:  `${(pt.y / VB_H) * 100}%`,
  };
}

export function ScrollIndicator({ scrollRef }) {
  const [activeSection,  setActiveSection]  = useState(0);
  const [isScrolling,    setIsScrolling]    = useState(false);
  const [pathLength,     setPathLength]     = useState(VB_H);
  const [dotPoints,      setDotPoints]      = useState([]);
  const [rotation,       setRotation]       = useState(0);
  const [margins,        setMargins]        = useState({ top: 80, bottom: 80 });

  const pathRef      = useRef(null);
  const trackRef     = useRef(null);
  const scrollTimer  = useRef(null);
  const rotationRef  = useRef(0);
  const animFrameRef = useRef(null);

  // ── Measure header/footer heights ──────────────────────────────────────
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      setMargins({
        top:    header ? header.offsetHeight : 80,
        bottom: footer ? footer.offsetHeight : 80,
      });
    };
    const t = setTimeout(measure, 150);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

  // ── Measure path + compute dot positions ───────────────────────────────
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLength(len);
    const pts = DOT_PROGRESS.map(p => toPercent(path.getPointAtLength(p * len)));
    setDotPoints(pts);
  }, []);

  // ── IntersectionObserver — fires reliably at snap boundaries ───────────
  useEffect(() => {
    const container = scrollRef?.current;
    if (!container) return;

    const observers = [];

    SECTIONS.forEach((section, index) => {
      const el = document.getElementById(section.sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // When a section is >= 40% visible it's the active one
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        {
          root: container,
          threshold: 0.4,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [scrollRef]);

  // ── Spin while scrolling ───────────────────────────────────────────────
  useEffect(() => {
    const container = scrollRef?.current;
    if (!container) return;

    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setIsScrolling(false), 600);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer.current);
    };
  }, [scrollRef]);

  useEffect(() => {
    if (isScrolling) {
      let last = null;
      const spin = (ts) => {
        if (last !== null) {
          rotationRef.current += (ts - last) * 0.22;
          setRotation(rotationRef.current);
        }
        last = ts;
        animFrameRef.current = requestAnimationFrame(spin);
      };
      animFrameRef.current = requestAnimationFrame(spin);
    } else {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isScrolling]);

  // ── Scroll to section — let snap-center handle vertical centering ──────
  const scrollToSection = useCallback((sectionId, index) => {
    const container = scrollRef?.current;
    if (!container) return;

    if (sectionId === "Hero-Section") {
      container.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(sectionId);
    if (!el) return;

    // Scroll to the TOP of the element — snap-center does the rest
    const elTop = el.offsetTop;
    container.scrollTo({ top: elTop, behavior: "smooth" });
  }, [scrollRef]);

  // ── The flower snaps to the active dot position ────────────────────────
  const flowerPos = dotPoints[activeSection] ?? { left: "50%", top: "50%" };

  // How much of the path to draw — snaps to active dot progress
  const drawnLength = pathLength * DOT_PROGRESS[activeSection];

  return (
    <div
      className="hidden md:flex fixed left-4 top-0 bottom-0 flex-col
                 items-center pointer-events-none select-none"
      style={{ zIndex: 110 }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="relative flex-1"
        style={{ width: 20, marginTop: margins.top, marginBottom: margins.bottom }}
      >
        {/* ── SVG track ── */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
          fill="none"
        >
          {/* Ghost — full path */}
          <path
            d={TRACK_PATH}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-black"
            opacity="0.08"
          />

          {/* Reference path (used for length measurement only) */}
          <path
            ref={pathRef}
            d={TRACK_PATH}
            stroke="transparent"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Filled progress line — snaps to active dot */}
          <motion.path
            d={TRACK_PATH}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - drawnLength}
            className="text-primary"
            opacity="0.55"
            animate={{ strokeDashoffset: pathLength - drawnLength }}
            transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.8 }}
          />
        </svg>

        {/* ── Section dots — exactly on path ── */}
        {SECTIONS.map((section, i) => {
          const isActive = activeSection === i;
          const pos = dotPoints[i] ?? { left: "50%", top: `${DOT_PROGRESS[i] * 100}%` };

          return (
            <div
              key={section.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.left, top: pos.top }}
            >
              <button
                onClick={() => scrollToSection(section.sectionId, i)}
                className="pointer-events-auto flex items-center justify-center
                           cursor-pointer group w-11 h-11"
                aria-label={`Go to ${section.label}`}
                title={section.label}
              >
                {/* Dot */}
                <motion.div
                  className="rounded-full bg-primary flex-shrink-0"
                  animate={{
                    width:   isActive ? 9 : 5,
                    height:  isActive ? 9 : 5,
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  whileHover={{ scale: 1.8, opacity: 1 }}
                />

                {/* Label — slides in when active */}
                <motion.span
                  className="absolute left-8 text-[9px] font-black uppercase
                             tracking-[0.2em] text-primary whitespace-nowrap"
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  {section.label}
                </motion.span>
              </button>
            </div>
          );
        })}

        {/* ── Flower — SNAPS to active dot position ── */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2
                     pointer-events-none flex items-center justify-center w-12 h-12"
          animate={{
            left: flowerPos.left,
            top:  flowerPos.top,
          }}
          transition={{
            type:      "spring",
            stiffness: 180,
            damping:   22,
            mass:      0.7,
          }}
        >
          {/* Pulse ring — visible while scrolling */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{
              scale:   isScrolling ? [1, 1.9, 1] : 1,
              opacity: isScrolling ? [0.4, 0, 0.4] : 0,
            }}
            transition={{ duration: 0.7, repeat: isScrolling ? Infinity : 0 }}
          />

          {/* Spiral icon — spins while scrolling */}
          <motion.img
            src="/assets/spiral-arrow.svg"
            alt=""
            className="display-none w-8 h-8 object-contain relative z-10"
            animate={{   }}
            transition={{ duration: 0 }}
            draggable={false}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </motion.div>

      </div>
    </div>
  );
}
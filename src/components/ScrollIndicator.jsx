// src/components/ScrollIndicator.jsx
// Dots and flower are positioned using getPointAtLength() so they sit
// exactly ON the wobbly path, not floating beside it.

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { progress: 0.0,  label: "Top",      sectionId: "Hero-Section"    },
  { progress: 0.35, label: "About",    sectionId: "AboutMe-Section" },
  { progress: 0.68, label: "Projects", sectionId: "projects"        },
];

// ViewBox dimensions — must match the SVG viewBox
const VB_W = 20;
const VB_H = 1000;

// Wobbly vertical path in a 20-wide viewBox, center ~10
const TRACK_PATH = `
  M 10 0
  C 13 80,   7 160,  10 240
  C 12.4 310, 8 390, 10 470
  C 11.6 540, 7.6 620, 10.4 700
  C 12 760,   8.4 840, 10 920
  C 11 955,   9.6 980, 10 1000
`;

// Convert SVG viewBox point → CSS percentage within the container
// preserveAspectRatio="none" means X and Y scale independently
function toPercent(pt) {
  return {
    left: `${(pt.x / VB_W) * 100}%`,
    top:  `${(pt.y / VB_H) * 100}%`,
  };
}

export function ScrollIndicator({ flowerSrc, scrollRef }) {
  const [progress,      setProgress]      = useState(0);
  const [isScrolling,   setIsScrolling]   = useState(false);
  const [isDragging,    setIsDragging]    = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [rotation,      setRotation]      = useState(0);
  const [pathLength,    setPathLength]    = useState(VB_H);
  const [dotPoints,     setDotPoints]     = useState([]);  // exact positions per section
  const [margins,       setMargins]       = useState({ top: 80, bottom: 80 });

  const scrollTimer  = useRef(null);
  const rotationRef  = useRef(0);
  const animFrameRef = useRef(null);
  const trackRef     = useRef(null);
  const pathRef      = useRef(null);

  // ── Measure header + footer heights ──────────────────────
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

  // ── Measure path + compute dot positions ─────────────────
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    setPathLength(len);

    // For each section, find the exact point on the path
    const pts = SECTIONS.map(s => {
      const pt = path.getPointAtLength(s.progress * len);
      return toPercent(pt);
    });
    setDotPoints(pts);
  }, []);

  // ── Get flower position on path ───────────────────────────
  const getFlowerPoint = useCallback(() => {
    const path = pathRef.current;
    if (!path || pathLength === 0) return { left: "50%", top: `${progress * 100}%` };
    const pt = path.getPointAtLength(progress * pathLength);
    return toPercent(pt);
  }, [progress, pathLength]);

  const flowerPos = getFlowerPoint();

  // ── Spin while scrolling / dragging ──────────────────────
  useEffect(() => {
    if (isScrolling || isDragging) {
      let last = null;
      const spin = (ts) => {
        if (last !== null) { rotationRef.current += (ts - last) * 0.18; setRotation(rotationRef.current); }
        last = ts;
        animFrameRef.current = requestAnimationFrame(spin);
      };
      animFrameRef.current = requestAnimationFrame(spin);
    } else {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isScrolling, isDragging]);

  // ── Scroll listener ───────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = scrollRef?.current;
      if (!el) return;

      const handleScroll = () => {
        if (isDragging) return;
        const pct = Math.min(Math.max(el.scrollTop / (el.scrollHeight - el.clientHeight), 0), 1);
        setProgress(pct);
        let active = 0;
        SECTIONS.forEach((s, i) => { if (pct >= s.progress) active = i; });
        setActiveSection(active);
        setIsScrolling(true);
        clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => setIsScrolling(false), 400);
      };

      el.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => { el.removeEventListener("scroll", handleScroll); clearTimeout(scrollTimer.current); };
    }, 100);
    return () => clearTimeout(timer);
  }, [scrollRef, isDragging]);

  // ── Drag handler ──────────────────────────────────────────
  const handleDrag = (event, info) => {
    const track = trackRef.current;
    const container = scrollRef?.current;
    if (!track || !container) return;
    const rect = track.getBoundingClientRect();
    const pct  = Math.min(Math.max((info.point.y - rect.top) / rect.height, 0), 1);
    setProgress(pct);
    let active = 0;
    SECTIONS.forEach((s, i) => { if (pct >= s.progress) active = i; });
    setActiveSection(active);
    container.scrollTop = pct * (container.scrollHeight - container.clientHeight);
  };

  // ── Scroll to MIDDLE of section ──────────────────────────
  const scrollToSection = (sectionId) => {
    const container = scrollRef?.current;
    if (!container) return;
    if (sectionId === "Hero-Section") { container.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const section = document.getElementById(sectionId);
    if (!section) return;
    const sectionTop    = section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    const sectionMiddle = sectionTop + section.offsetHeight / 2 - container.clientHeight / 2;
    container.scrollTo({ top: sectionMiddle, behavior: "smooth" });
  };

  const drawnLength = pathLength * progress;

  return (
    <div
      className="hidden md:flex fixed left-4 top-0 bottom-0 flex-col
                 items-center pointer-events-none select-none"
      style={{ zIndex: 110 }}
      aria-hidden="true"
    >
      {/* Track container — 20px wide matching VB_W */}
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
          {/* Ghost — full path, faint */}
          <path
            d={TRACK_PATH}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-black"
            opacity="0.1"
          />
          {/* Shadow ink line */}
          <path
            ref={pathRef}
            d={TRACK_PATH}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - drawnLength}
            className="text-primary"
            opacity="0.25"
            style={{ transition: isDragging ? "none" : "stroke-dashoffset 0.1s ease-out" }}
          />
          {/* Main ink line */}
          <path
            d={TRACK_PATH}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - drawnLength}
            className="text-primary"
            opacity="0.6"
            style={{ transition: isDragging ? "none" : "stroke-dashoffset 0.1s ease-out" }}
          />
        </svg>

        {/* ── Section dots — positioned exactly on the path ── */}
        {SECTIONS.map((section, i) => {
          const isActive = activeSection === i;
          const pos = dotPoints[i] ?? { left: "50%", top: `${section.progress * 100}%` };
          return (
            <div
              key={section.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.left, top: pos.top }}
            >
              <button
                onClick={() => scrollToSection(section.sectionId)}
                className="pointer-events-auto flex items-center justify-center
                           cursor-pointer group w-11 h-11"
                aria-label={`Scroll to ${section.label}`}
                title={section.label}
              >
                <motion.div
                  className="rounded-full bg-primary flex-shrink-0"
                  animate={{ width: isActive ? 8 : 5, height: isActive ? 8 : 5, opacity: isActive ? 1 : 0.4 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-8 text-[9px] font-black uppercase
                             tracking-[0.2em] text-primary whitespace-nowrap"
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {section.label}
                </motion.span>
              </button>
            </div>
          );
        })}

        {/* ── Flower — positioned on path, draggable ── */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2
                     pointer-events-auto flex items-center justify-center w-12 h-12"
          animate={{ left: flowerPos.left, top: flowerPos.top }}
          transition={isDragging
            ? { duration: 0 }
            : { type: "spring", stiffness: 100, damping: 20, mass: 0.8 }
          }
          drag="y"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDrag={handleDrag}
          onDragEnd={() => setIsDragging(false)}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          whileHover={{ scale: 1.15 }}
          whileDrag={{ scale: 1.25 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{
              scale:   (isScrolling || isDragging) ? [1, 1.8, 1] : 1,
              opacity: (isScrolling || isDragging) ? [0.4, 0, 0.4] : 0,
            }}
            transition={{ duration: 0.8, repeat: (isScrolling || isDragging) ? Infinity : 0 }}
          />
          {/* Spiral arrow SVG*/}
          <motion.img
            src="/assets/spiral-arrow.svg"
            alt="Drag to scroll"
            className="w-8 h-8 object-contain relative z-10"
            style={{ }}
            draggable={false}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </motion.div>

      </div>
    </div>
  );
}
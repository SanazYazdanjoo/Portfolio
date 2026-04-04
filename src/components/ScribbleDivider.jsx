// src/components/ScribbleDivider.jsx
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.0 + i * 0.3, ease: "easeInOut", delay: i * 0.15 },
  }),
};

const dotPop = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.8 + i * 0.1 },
  }),
};

export function ScribbleDivider() {
  return (
    <div className="relative w-full h-0 overflow-visible z-10 no-print">
      <motion.svg
        viewBox="0 0 400 50"
        preserveAspectRatio="xMidYMid meet"
        className="absolute left-1/2 -translate-x-1/2 w-[min(45%,320px)] h-10 -translate-y-1/2 text-primary"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* Main ink stroke — thicker, wobbly, pressure-varying */}
        <motion.path
          d="M12 26 C 30 18, 52 32, 78 22 C 102 13, 118 30, 148 24
             C 170 19, 185 28, 210 22 C 232 16, 258 31, 290 23
             C 310 17, 338 27, 360 21 C 372 18, 382 24, 390 22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.45"
          variants={draw}
          custom={0}
        />

      

        {/* Ink splatter dots — tiny imperfections like a real pen */}
        <motion.circle cx="75" cy="19" r="1.2" fill="currentColor" opacity="0.3" variants={dotPop} custom={0} />
        <motion.circle cx="210" cy="28" r="0.8" fill="currentColor" opacity="0.25" variants={dotPop} custom={1} />
        <motion.circle cx="330" cy="18" r="1" fill="currentColor" opacity="0.2" variants={dotPop} custom={2} />
      </motion.svg>
    </div>
  );
}
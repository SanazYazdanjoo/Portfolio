// src/components/ScribbleDivider.jsx
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

export function ScribbleDivider() {
  return (
    // h-0 + overflow-visible = zero layout space, SVG floats over section boundary
    <div className="relative w-full h-0 overflow-visible z-10 no-print">
      <motion.svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="absolute left-0 w-full h-8 -translate-y-1/2 text-primary"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* Shadow line */}
        <motion.path
          d="M0 22 C 60 14, 130 30, 200 20 C 270 10, 310 28, 390 18
             C 460 9, 510 26, 580 20 C 640 14, 680 24, 740 18
             C 810 10, 870 30, 950 20 C 1010 12, 1070 26, 1200 18"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.25"
          variants={draw}
        />
        {/* Main line */}
        <motion.path
          d="M0 20 C 55 11, 120 29, 195 18 C 265 8, 315 27, 385 17
             C 455 7, 505 25, 575 19 C 638 13, 682 23, 742 17
             C 808 9, 865 28, 945 19 C 1008 11, 1065 24, 1200 16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
          variants={draw}
        />
      </motion.svg>
    </div>
  );
}
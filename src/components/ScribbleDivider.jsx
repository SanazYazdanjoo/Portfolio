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

const dotPop = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.9 + i * 0.12 },
  }),
};

export function ScribbleDivider() {
  return (
    <div className="relative w-full py-1 no-print">
      <motion.svg
        viewBox="0 0 1200 6"
        preserveAspectRatio="none"
        className="w-full h-[1px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* Full-width line with very subtle hand-drawn wobble */}
        <motion.path
          d="M0 3 C 80 2.2, 160 3.8, 240 3 C 320 2.3, 400 3.6, 480 3
             C 560 2.4, 640 3.5, 720 3 C 800 2.5, 880 3.4, 960 3
             C 1040 2.6, 1120 3.3, 1200 3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="text-text/20"
          variants={draw}
        />

        {/* Tiny ink imperfections along the line */}
        <motion.circle cx="300" cy="3" r="0.8" className="fill-text/15" variants={dotPop} custom={0} />
        <motion.circle cx="720" cy="3" r="0.6" className="fill-text/10" variants={dotPop} custom={1} />
        <motion.circle cx="1050" cy="3" r="0.7" className="fill-text/12" variants={dotPop} custom={2} />
      </motion.svg>
    </div>
  );
}
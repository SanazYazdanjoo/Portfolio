// Skills live inside The Bridge (CareerArc, variant="full") as
// chronologically-grouped chips; see src/data/career.js.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../utils/motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const itemReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0 } },
};

// Bio — one calm reading column
export function AboutBio({ data }) {
  const bioParagraphs = data.bioParagraphs || [];
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {bioParagraphs.map((para, i) => (
        <motion.p
          key={i}
          variants={reduce ? itemReduced : item}
          className={
            i === 0
              ? "text-base leading-[1.85] text-text"
              : "text-sm leading-[1.9] text-text-meta"
          }
        >
          {para}
        </motion.p>
      ))}
    </motion.div>
  );
}

// Legacy alias — safe to delete once nothing imports <AboutMe>
export function AboutMe({ data }) {
  return <AboutBio data={data} />;
}

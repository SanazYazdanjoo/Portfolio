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
        // Every paragraph reads at the same size, weight and ink. The
        // second one used to be 14px in text-meta while the first was 16px
        // in text — a difference that said "this half matters less" about
        // the half that carries the research/engineering claim.
        <motion.p
          key={i}
          variants={reduce ? itemReduced : item}
          className="text-base leading-[1.85] text-text"
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

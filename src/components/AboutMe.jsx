// The bio, as the reference sets it: the first paragraph leads at 19px, the
// rest carry the supporting weight at 17px in meta ink, both at 1.65. The
// column's width comes from the grid, never from a max-width here.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../utils/motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } };
const itemReduced = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } };

export function AboutBio({ data }) {
  const bioParagraphs = data.bioParagraphs || [];
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-s24"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {bioParagraphs.map((para, i) => (
        <motion.p
          key={i}
          variants={reduce ? itemReduced : item}
          className={i === 0 ? "text-prose-lead text-text" : "text-prose text-text-meta"}
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

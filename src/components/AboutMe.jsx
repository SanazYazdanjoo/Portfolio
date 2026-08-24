// The bio: one paragraph at the statement step (21px), the same step the
// hero's positioning line uses. Its measure comes from the columns it is
// placed in — cols 1-7, which is about 55ch at this size — never from a
// max-width here.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../utils/motion";

export function AboutBio({ data }) {
  const bioParagraphs = data.bioParagraphs || [];
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-s24"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
    >
      {bioParagraphs.map((para, i) => (
        <p key={i} className="text-statement text-text">{para}</p>
      ))}
    </motion.div>
  );
}

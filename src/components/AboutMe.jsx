// The bio: one paragraph at the statement step (21px), the same step the
// hero's positioning line uses. Its measure comes from the columns it is
// placed in — cols 1-7, which is about 55ch at this size — never from a
// max-width here.

import React from "react";
import { useInViewReveal, revealClass } from "../hooks/useReveal";

export function AboutBio({ data }) {
  const bioParagraphs = data.bioParagraphs || [];
  const [ref, inView] = useInViewReveal({ amount: 0.1 });

  return (
    <div
      ref={ref}
      className={`${revealClass(inView)} flex flex-col gap-s24`}
      style={{ "--reveal-dur": "0.4s" }}
    >
      {bioParagraphs.map((para, i) => (
        <p key={i} className="text-statement text-text">{para}</p>
      ))}
    </div>
  );
}

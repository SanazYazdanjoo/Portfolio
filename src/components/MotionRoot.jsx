// The one place Framer Motion's global config is set. Pages that still use
// framer-motion (the case studies and a few secondary pages) are wrapped in
// this by main.jsx's withMotion(), which loads it alongside the page chunk;
// the shell and the homepage no longer import framer-motion at all, so the
// provider cannot live in App.jsx any more without dragging the library
// back onto every route's critical path.
import React from "react";
import { MotionConfig } from "framer-motion";

export default function MotionRoot({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Sentinel for factual content that hasn't been supplied yet. Never a guess,
// never plausible-sounding placeholder prose — a value that renders as a
// visible marker in dev and fails the build in production. See
// scripts/check-needs-input.mjs (build-time enforcement) and
// src/components/NeedsInputMarker.jsx (dev-time rendering).
export const NEEDS_INPUT = Symbol.for("portfolio.needsInput");
export const isNeedsInput = (v) => v === NEEDS_INPUT;

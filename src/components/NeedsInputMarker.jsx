// Dev-time visualisation of the NEEDS_INPUT sentinel (see src/data/needsInput.js).
// Production builds never reach this: scripts/check-needs-input.mjs fails the
// build before `vite build` runs if any NEEDS_INPUT survives. This component
// exists only so an unfilled field is impossible to miss while iterating locally.
export function NeedsInputMarker({ path }) {
  if (!import.meta.env.DEV) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 bg-danger px-2 py-0.5 font-mono text-2xs
                 font-black uppercase tracking-wider text-white"
      role="note"
    >
      NEEDS INPUT — {path}
    </span>
  );
}

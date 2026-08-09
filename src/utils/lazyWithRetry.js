// Wraps React.lazy so a failed dynamic import — typically a stale chunk
// hash left over from a previous deploy (see vercel.json's cache headers
// and the deploy-transition race they mitigate) — gets one automatic
// reload instead of a hard crash. A sessionStorage flag survives that
// reload so a SECOND failure in the same tab session is never retried
// again; it rethrows so the failure is visible, not silently swallowed.
//
// The flag is cleared from inside the *successful* resolution path here,
// not from a top-level "app mounted" effect: App.jsx is never lazy, so it
// mounts well before any lazy route's import() has settled — clearing on
// its mount would wipe the flag before we know whether this attempt
// actually worked, reopening the infinite-reload window this guard exists
// to close. Clearing at the moment a chunk genuinely loads is the
// earliest point that's actually safe.
import { lazy } from "react";

const RELOAD_FLAG = "chunk-reload-attempted";

export function lazyWithRetry(importFn) {
  return lazy(async () => {
    try {
      const module = await importFn();
      window.sessionStorage.removeItem(RELOAD_FLAG);
      return module;
    } catch (error) {
      const alreadyRetried = window.sessionStorage.getItem(RELOAD_FLAG);
      if (alreadyRetried) {
        // Second failure this session — surface it, don't loop.
        throw error;
      }
      window.sessionStorage.setItem(RELOAD_FLAG, "true");
      window.location.reload();
      // The page is navigating away; never resolve so React doesn't try
      // to render with a rejected/undefined module in the meantime.
      return new Promise(() => {});
    }
  });
}

// Session-scoped UI state: survives navigation between project pages and a
// reload within the tab, and is gone when the tab is.
//
// sessionStorage rather than localStorage on purpose. A collapsed section
// list is a "right now, on this screen" preference, not a standing one — a
// reader who narrows the page on a laptop should not find the nav missing on
// their desktop three weeks later. localStorage in this app is reserved for
// preferences the visitor actually chose to keep (language, project view).
//
// Storage access is wrapped because it throws, not returns null, in Safari
// private mode and under some embedded webviews — and a nav toggle is not
// worth a white screen. It also keeps the hook usable in jsdom and in any
// non-browser render, where `window` may be absent entirely.
import { useState, useEffect, useCallback } from "react";

function read(key, fallback) {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the in-memory state still works for this page */
  }
}

export function useSessionState(key, initialValue) {
  // Read lazily inside the initializer, not during module evaluation, so a
  // server or test render never touches storage.
  const [value, setValue] = useState(() =>
    typeof window === "undefined" ? initialValue : read(key, initialValue)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    write(key, value);
  }, [key, value]);

  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, setValue, toggle];
}

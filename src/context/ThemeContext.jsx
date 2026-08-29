// Manual dark/light theme — the counterpart to LanguageContext.
//
// The pre-paint script in index.html has already resolved the theme (stored
// manual choice, else OS preference) and stamped <html data-theme="…"> before
// React loads; all dark-mode CSS keys off that attribute, never off
// prefers-color-scheme directly. This context's jobs are the two things the
// stamp can't do: expose a toggle, and keep following the OS live for as long
// as the visitor hasn't chosen manually. Once they toggle, the choice is
// stored and the OS stops mattering — that is the point of the control: a
// visitor who wants the site in the OPPOSITE of their system preference.
//
// STORAGE_KEY and the "light"|"dark" contract are shared with the index.html
// script — change them together.

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const THEMES = ["light", "dark"];
const STORAGE_KEY = "portfolio-theme";

function storedTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(stored) ? stored : null;
  } catch {
    return null; // storage blocked → behave as "no manual choice"
  }
}

// First render must agree with what is already painted, so read the stamp
// the index.html script left rather than re-deriving it.
function initialTheme() {
  const stamped = document.documentElement.dataset.theme;
  if (THEMES.includes(stamped)) return stamped;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(initialTheme);

  // A manual choice: restamp the document and persist it.
  const setTheme = useCallback((next) => {
    if (!THEMES.includes(next)) return;
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — the toggle still works for this page view */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // No stored choice yet → the OS preference stays live, exactly as it was
  // before the toggle existed. A stored choice wins and ends the following.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq?.addEventListener) return undefined;
    const onChange = (e) => {
      if (storedTheme()) return;
      const next = e.matches ? "dark" : "light";
      setThemeState(next);
      document.documentElement.dataset.theme = next;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}

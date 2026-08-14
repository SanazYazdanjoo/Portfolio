// Section open/active state for the template: which sections are expanded,
// which one the TOC marks active (via IntersectionObserver), expand/collapse
// all with its brief stagger window, and the numbering helpers the section
// renderers share.

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function useSectionState(activeSections) {
  const prefersReducedMotion = useReducedMotion();
  const toggleAllTimeoutRef = useRef(null);

  const [activeId, setActiveId] = useState(() => activeSections[0]?.id ?? null);

  const [openSections, setOpenSections] = useState(
    () => new Set(activeSections.map((s) => s.id))
  );

  const [staggerAll, setStaggerAll] = useState(false);

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const navigateToSection = (id) => {
    setOpenSections((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    const el = document.getElementById(id);
    el?.scrollIntoView?.({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const allOpen =
    activeSections.length > 0 && activeSections.every((s) => openSections.has(s.id));

  const toggleAllSections = () => {
    setOpenSections(allOpen ? new Set() : new Set(activeSections.map((s) => s.id)));
    if (prefersReducedMotion) return;
    setStaggerAll(true);
    window.clearTimeout(toggleAllTimeoutRef.current);
    const settle = activeSections.length * 40 + 350 + 60;
    toggleAllTimeoutRef.current = window.setTimeout(() => setStaggerAll(false), settle);
  };

  useEffect(() => () => window.clearTimeout(toggleAllTimeoutRef.current), []);

  const sectionIndex = (id) => activeSections.findIndex((s) => s.id === id);
  const sectionNumber = (id) => String(sectionIndex(id) + 1).padStart(2, "0");
  const staggerDelayFor = (id) => (staggerAll ? sectionIndex(id) * 40 : 0);

  useEffect(() => {
    if (activeSections.length === 0) return;

    const observers = [];
    activeSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(section.id); },
        { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [activeSections]);

  return {
    activeId,
    openSections,
    toggleSection,
    navigateToSection,
    allOpen,
    toggleAllSections,
    sectionNumber,
    staggerDelayFor,
  };
}

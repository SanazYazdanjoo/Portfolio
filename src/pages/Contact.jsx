// src/pages/Contact.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Ink & Bloom — the watercolor's ONE home on the site.
//
// The pattern you liked in the Unsplash login modal: a contained card where
// the image is a full-bleed PANEL beside clean content. Same idea here:
//
//   ┌─────────────┬──────────────────────────────┐
//   │             │  EMAIL                        │
//   │  watercolor │  sanaz.yazdanjoo@gmail.com    │
//   │  panel      │  LOCATION & PHONE · SOCIALS   │
//   │  (2/5)      │  ──────────────────────────   │
//   │             │  Let's collaborate in: …      │
//   └─────────────┴──────────────────────────────┘
//
// On mobile the panel becomes a top band — exactly how the modal stacks.
// Content, translation keys, and profile.js data: 100% unchanged.
// Requires: /public/assets/watercolor.jpg + .watercolor-panel in theme.css §7.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { ScribbleUnderline } from "../components/DoodleLibrary";

function ContactBlock({ label, children }) {
  return (
    <div>
      <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-600 mb-3">
        {label}
      </h3>
      {children}
    </div>
  );
}

export default function Contact() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-bg py-16 md:py-20 relative flex items-center">
      <div className="container relative z-10 mx-auto max-w-5xl px-6">

        {/* ── Heading ── */}
        <header className="mb-12 md:mb-16 relative inline-block">
          <h1
            className="font-display text-6xl md:text-8xl font-black tracking-tight text-text mb-4"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t("contact.hi")}<span className="text-primary">.</span>
          </h1>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-primary opacity-80" />
        </header>

        {/* ── The split card — panel + content, one white sheet ── */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="paper-bg grid grid-cols-1 md:grid-cols-5 overflow-hidden"
        >
          {/* Watercolor panel — full bleed, hard edge, no text on it.
              Mobile: a generous top band. Desktop: the left 2/5. */}
          <div
            className="watercolor-panel h-44 md:h-auto md:min-h-[420px] md:col-span-2"
            role="img"
            aria-label="Abstract watercolor in coral, rose and gold"
          />

          {/* Content — everything you already had, reorganized on one sheet */}
          <div className="md:col-span-3 p-8 md:p-12 flex flex-col gap-9">

            <ContactBlock label={t("contact.email")}>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="text-xl md:text-2xl font-bold text-text hover:text-primary-600
                           transition-colors break-all"
              >
                {profileData.contact.email}
              </a>
            </ContactBlock>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
              <ContactBlock label={t("contact.locationPhone")}>
                <p className="text-base text-text font-medium">{profileData.contact.location}</p>
                <p className="text-base text-text-dim">{profileData.contact.phone}</p>
              </ContactBlock>

              <ContactBlock label={t("contact.socials")}>
                <div className="flex gap-6">
                  <a
                    href={profileData.contact.linkedin} target="_blank" rel="noreferrer"
                    className="text-base font-bold text-text hover:text-secondary-600
                               transition-colors underline decoration-blush decoration-2 underline-offset-4"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={profileData.contact.github} target="_blank" rel="noreferrer"
                    className="text-base font-bold text-text hover:text-secondary-600
                               transition-colors underline decoration-blush decoration-2 underline-offset-4"
                  >
                    GitHub
                  </a>
                </div>
              </ContactBlock>
            </div>

            {/* Divider + languages */}
            <div className="border-t border-border pt-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-600 mb-4">
                {t("contact.collaborate")}
              </h3>
              <ul className="space-y-3">
                {profileData.languages.map((lang, i) => (
                  <li key={i} className="flex justify-between items-baseline border-b border-border/60 pb-2">
                    <span className="font-bold text-sm text-text">{lang.name}</span>
                    <span className="text-xs text-text-dim italic">{lang.level}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-text-dim leading-relaxed italic">
                {t("contact.location")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
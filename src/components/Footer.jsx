// src/components/Footer.jsx
// Data-driven: pulls contact info from profile.js — no hardcoded strings.
// Replace the doodles.flower src with your actual doodle asset key.

import React from "react";
import { motion } from "framer-motion";

export function Footer({ data }) {
  const { name, email, socials, doodles } = data;
  // socials expected shape: [{ label: "LinkedIn", url: "..." }, ...]
  const linkedin = socials?.find((s) => s.label === "LinkedIn");

  return (
    <footer className="relative border-t border-border/20 bg-bg overflow-hidden">

      {/* ── Bottom bar: copyright + legal + doodle ── */}
      <div className="border-t border-border/10">
        <div className="container mx-auto px-4 md:px-8 py-5
                        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <p className="text-[11px] text-text/40 font-medium">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <nav className="flex items-center gap-5">
            <a
              href="/impressum"
              className="text-[11px] uppercase tracking-widest text-text/40
                         hover:text-primary transition-colors duration-200"
            >
              Impressum
            </a>
            <a
              href="/privacy"
              className="text-[11px] uppercase tracking-widest text-text/40
                         hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </nav>

          {/* Doodle accent — bottom right */}
          {doodles?.flower && (
            <motion.img
              src={doodles.flower}
              alt=""
              aria-hidden="true"
              className="hidden md:block h-12 w-auto opacity-30
                         pointer-events-none select-none"
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </div>
      </div>

    </footer>
  );
}
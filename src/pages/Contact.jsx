// Answers a recruiter's real questions — availability, work authorisation,
// location, response time — above the fold, with the email CTA/copy button
// as the only decision that matters. Avoids duplicating what's already in
// the Footer.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { ScribbleUnderline } from "../components/DoodleLibrary";
import { StatusDot } from "../components/StatusDot";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { EASE } from "../utils/motion";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600";

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export default function Contact() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const { contact, languages } = profileData;

  useDocumentMeta({
    title: `${t("contact.headline")} — ${profileData.name}`,
    description: contact.availability,
  });

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, the raw address is still on screen.
    }
  }

  return (
    <div className="min-h-screen bg-bg py-16 md:py-20 relative flex items-center no-print">
      <div className="container relative z-10 mx-auto max-w-4xl px-6">

        {/* Kicker + heading */}
        <p className="text-2xs uppercase tracking-[0.18em] text-primary-600 font-bold mb-3">
          {t("contact.kicker")}
        </p>
        <header className="mb-6 relative inline-block">
          <h1 className="type-display mb-4">
            {t("contact.headline")}<span className="text-primary">.</span>
          </h1>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-primary opacity-80" />
        </header>

        {/* Availability */}
        <div className="flex items-start gap-3 max-w-md mb-12 md:mb-16">
          <StatusDot label={t("footer.available")} />
          <p className="text-sm text-text/80 leading-relaxed font-medium">
            {contact.availability}
          </p>
        </div>

        {/* Action-first split */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="paper-bg grid grid-cols-1 md:grid-cols-[1.9fr_1fr] gap-8 md:gap-10 p-8 md:p-12"
        >
          {/* LEFT — the decision */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${contact.email}`}
                className={`inline-flex items-center justify-center gap-2 bg-text rule-fill-r text-bg
                            px-5 py-3 rounded-[var(--radius)] font-medium transition-opacity
                            hover:opacity-90 ${focusRing}`}
              >
                <MailIcon />
                {t("contact.emailCta")}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center justify-center gap-2 border rule-frame-r
                            px-5 py-3 rounded-[var(--radius)] font-medium text-text
                            transition-colors hover:[--rule-fill-color:var(--blush-weak)] ${focusRing}`}
              >
                {copied ? t("contact.copied") : t("contact.copyEmail")}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? t("contact.copied") : ""}
              </span>
            </div>

            <p className="font-mono text-sm text-text-dim break-all">
              {contact.email}
            </p>

            <div className="border-t rule-t pt-6">
              <h3 className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-3">
                {t("contact.goodToSend")}
              </h3>
              <ul className="space-y-2">
                {contact.collaborateOn.map((item, i) => (
                  <li key={i} className="text-sm text-text/80 leading-relaxed flex gap-2">
                    <span className="text-primary-600" aria-hidden="true">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/cv"
                className={`inline-flex items-center gap-1.5 border rule-frame-r px-4 py-2
                            rounded-[var(--radius)] text-sm font-medium text-text
                            transition-colors hover:[--rule-fill-color:var(--blush-weak)] ${focusRing}`}
              >
                {t("contact.viewCv")}
              </Link>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 border rule-frame-r px-4 py-2
                            rounded-[var(--radius)] text-sm font-medium text-text
                            transition-colors hover:[--rule-fill-color:var(--blush-weak)] ${focusRing}`}
              >
                LinkedIn
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 border rule-frame-r px-4 py-2
                            rounded-[var(--radius)] text-sm font-medium text-text
                            transition-colors hover:[--rule-fill-color:var(--blush-weak)] ${focusRing}`}
              >
                GitHub
              </a>
            </div>
          </div>

          {/* RIGHT — the details */}
          <div className="border-t rule-t md:border-t-0 md:border-l md:rule-l pt-6 md:pt-0 md:pl-5 rounded-none">
            <h3 className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-4">
              {t("contact.details")}
            </h3>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-text-dim">{t("contact.basedIn")}</dt>
                <dd className="font-medium text-text">
                  {contact.location} · {contact.timezone}
                </dd>
              </div>

              <div>
                <dt className="text-text-dim">{t("contact.phone")}</dt>
                <dd>
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                    className={`font-medium text-text hover:text-primary-600 transition-colors ${focusRing}`}
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="border-t rule-t mt-6 pt-6">
              <h3 className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-4">
                {t("contact.collaborate")}
              </h3>
              <ul className="space-y-3">
                {languages.map((lang, i) => (
                  <li key={i} className="flex justify-between items-baseline border-b rule-b pb-2">
                    <span className="font-bold text-sm text-text">{lang.name}</span>
                    <span className="text-xs text-text-dim italic">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

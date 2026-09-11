// Answers a recruiter's real questions — availability, location, response
// channel — with one decision on the page: write the email. Everything else
// is a quiet link or a line of detail. No card around it: the page is
// short enough to be read as one column of ruled rows, and a box inside a
// box was the noisiest thing on it. Avoids duplicating what's already in
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
import { HandMail } from "../components/HandIcons";
import { HandArrow } from "../components/HandArrow";

// The one label role, sitewide: 12px mono caps.
const EYEBROW = "font-mono text-label uppercase text-primary-600";
// Quiet text links — the same treatment the homepage contact row uses.
const LINK =
  "inline-flex items-center gap-1.5 text-base font-medium text-text border-b rule-b pb-0.5 " +
  "hover:text-primary-600 transition-colors duration-200 focus-ring";

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
    <div className="min-h-screen bg-bg py-16 md:py-20 relative no-print">
      <div className="container relative z-10 mx-auto max-w-4xl px-6">

        {/* Kicker + heading */}
        <p className={`mb-3 ${EYEBROW}`}>{t("contact.kicker")}</p>
        <header className="mb-6 relative inline-block">
          <h1 className="type-display mb-4">
            {t("contact.headline")}<span className="text-primary">.</span>
          </h1>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-primary opacity-80" />
        </header>

        {/* Availability */}
        <div className="flex items-start gap-3 max-w-md mb-12">
          <StatusDot label={t("footer.available")} />
          <p className="text-base text-text-meta leading-relaxed">
            {contact.availability}
          </p>
        </div>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 gap-10 border-t rule-t pt-10 md:grid-cols-[1.6fr_1fr] md:gap-14"
        >
          {/* LEFT — the decision */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2 bg-text rule-fill-r text-bg
                            px-6 py-3 rounded-sm text-base font-medium transition-opacity
                            hover:opacity-90 focus-ring"
              >
                <HandMail className="w-[18px] h-[18px]" />
                {t("contact.emailCta")}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 text-base font-medium text-text
                            rule-underline pb-0.5 self-start sm:self-auto
                            hover:text-primary-600 transition-colors duration-200 focus-ring"
              >
                {copied ? t("contact.copied") : t("contact.copyEmail")}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? t("contact.copied") : ""}
              </span>
            </div>

            <p className="font-mono text-sm text-dim break-all">
              {contact.email}
            </p>

            <div className="border-t rule-t pt-6">
              <h2 className={`mb-3 ${EYEBROW}`}>{t("contact.goodToSend")}</h2>
              <ul className="space-y-2">
                {contact.collaborateOn.map((item, i) => (
                  <li key={i} className="text-base text-text-meta leading-relaxed flex gap-2">
                    <span className="text-primary-600" aria-hidden="true">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — the details */}
          <div className="flex flex-col gap-8 md:border-l md:rule-l md:pl-8">
            <div>
              <h2 className={`mb-4 ${EYEBROW}`}>{t("contact.details")}</h2>
              <dl className="space-y-4 text-base">
                <div>
                  <dt className="text-sm text-dim">{t("contact.basedIn")}</dt>
                  <dd className="font-medium text-text">
                    {contact.location} · {contact.timezone}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-dim">{t("contact.phone")}</dt>
                  <dd>
                    <a
                      href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                      className="font-medium text-text hover:text-primary-600 transition-colors focus-ring"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-dim">{t("cv.languages")}</dt>
                  <dd className="font-medium text-text">
                    {languages.map((lang) => `${lang.name} · ${lang.level}`).join(", ")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t rule-t pt-6">
              <h2 className={`mb-4 ${EYEBROW}`}>{t("contact.socials")}</h2>
              <ul className="flex flex-col items-start gap-3">
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className={LINK}>
                    LinkedIn <HandArrow direction="up-right" />
                  </a>
                </li>
                <li>
                  <a href={contact.github} target="_blank" rel="noreferrer" className={LINK}>
                    GitHub <HandArrow direction="up-right" />
                  </a>
                </li>
                <li>
                  <Link to="/cv" className={LINK}>
                    {t("contact.viewCv")} <HandArrow />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

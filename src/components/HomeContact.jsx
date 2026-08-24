// The contact section, matching the reference: availability, the address at
// its own display size, one row of three links, and the colophon. The
// colophon lives here — the reference puts it in this section, not in the
// footer, which carries only legal chrome.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { REPO_URL } from "../data/site";

const LINK =
  "text-body font-medium text-text border-b rule-b pb-s2 " +
  "hover:text-primary-600 transition-colors duration-200 focus-ring";

export function HomeContact({ data }) {
  const { contact } = data;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-s28">
      <p className="text-outcome text-text flex gap-s10">
        <span aria-hidden="true" className="text-success">&#9679;</span>
        <span>{contact.availability}</span>
      </p>

      <a
        href={`mailto:${contact.email}`}
        className="text-email font-display font-bold text-text break-words self-start
                   rule-underline pb-s8
                   hover:text-primary-600 transition-colors duration-200 focus-ring"
      >
        {contact.email}
      </a>

      <div className="flex flex-wrap gap-s24">
        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
            LinkedIn &#8599;
          </a>
        )}
        {contact.github && (
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className={LINK}>
            GitHub &#8599;
          </a>
        )}
        <Link to="/cv" className={LINK}>{t("nav.cv")} &#8599;</Link>
      </div>

      <p className="mt-s8 text-small text-text-meta">
        {t("footer.colophon")}{" "}
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 rule-underline hover:opacity-80 transition-opacity duration-200 focus-ring"
        >
          {t("footer.viewSource")} &#8599;
        </a>
      </p>
    </div>
  );
}

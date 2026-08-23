// The page's closing ask, at the same weight as Case Studies rather than as
// a footnote above the footer: the section heading sits in cols 1-4 like
// About's, and everything here fills cols 6-12 with the address set at h1 —
// one step below the name itself and the largest thing in the lower half of
// the page.
//
// Nothing here is repeated in the Footer, which carries only site chrome.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { StatusDot } from "./StatusDot";

const LINK =
  "inline-flex items-center gap-s8 text-body font-semibold text-text " +
  "hover:text-primary-600 transition-colors duration-200 focus-ring";

export function HomeContact({ data }) {
  const { contact } = data;
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-start gap-s12">
        <StatusDot label={t("footer.available")} />
        <p className="text-body text-text">{contact.availability}</p>
      </div>

      <a
        href={`mailto:${contact.email}`}
        className="block mt-s48 type-h1 text-text break-words rule-underline
                   hover:text-primary-600 transition-colors duration-200 focus-ring"
      >
        {contact.email}
      </a>

      <ul className="mt-s48 pt-s24 border-t rule-t list-none m-0 p-0
                     flex flex-wrap gap-x-s48 gap-y-s16">
        {contact.linkedin && (
          <li>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn <span aria-hidden="true" className="text-label">↗</span>
            </a>
          </li>
        )}
        {contact.github && (
          <li>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className={LINK}>
              GitHub <span aria-hidden="true" className="text-label">↗</span>
            </a>
          </li>
        )}
        <li>
          <Link to="/cv" className={LINK}>{t("nav.cv")}</Link>
        </li>
      </ul>
    </div>
  );
}

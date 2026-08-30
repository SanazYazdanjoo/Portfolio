// The contact section: availability, the address at its own display size,
// and one row of three links. The colophon lives in the footer, beside the
// copyright line.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { HandArrow } from "./HandArrow";

const LINK =
  "inline-flex items-center gap-s6 text-body font-medium text-text border-b rule-b pb-s2 " +
  "hover:text-primary-600 transition-colors duration-200 focus-ring";

export function HomeContact({ data }) {
  const { contact } = data;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-s28">
      <p className="doodle-text text-aside text-text">{contact.availability}</p>

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
            LinkedIn <HandArrow direction="up-right" />
          </a>
        )}
        {contact.github && (
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className={LINK}>
            GitHub <HandArrow direction="up-right" />
          </a>
        )}
        <Link to="/cv" className={LINK}>{t("nav.cv")} <HandArrow direction="up-right" /></Link>
      </div>
    </div>
  );
}

import React from 'react';
import { Button } from '../components/Button';
import { FlowerDoodle } from '../components/DoodleLibrary';
import { profileData as rawProfile } from '../data/profile';
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
import { useTranslation } from '../context/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Impressum() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();

  useDocumentMeta({
    title: `${t("impressum.title")} — ${profileData.name}`,
    description: t("impressum.subtitle"),
  });

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <FlowerDoodle className="absolute top-20 right-10 w-64 h-64 text-peach opacity-10 rotate-12 pointer-events-none" />

      <div className="container max-w-4xl relative z-10">

        {/* Back Navigation */}
        <div className="mb-16">
          <Button to="/" variant="ghost" className="text-sm uppercase tracking-widest font-bold text-dim">
            {t("common.backToPortfolio")}
          </Button>
        </div>

        {/* Header */}
        <header className="mb-16 relative inline-block">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-text mb-4">
            {t("impressum.title")}<span className="text-primary">.</span>
          </h1>
          <p className="text-xl text-dim mt-6 font-medium">
            {t("impressum.subtitle")}
          </p>
        </header>

        {/* Legal Content - Structured as an Editorial Document */}
        <article className="space-y-12 text-lg text-text leading-relaxed font-medium bg-panel p-8 md:p-12 border border-border shadow-sm relative">

          {/* Subtle Doodle on the document */}
          <FlowerDoodle className="absolute -bottom-6 -right-6 w-32 h-32 text-accent opacity-20 -rotate-12 pointer-events-none" />

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{t("impressum.section1.heading")}</h2>
            <p>
              {profileData.name}<br />
              {t("impressum.address.street")}<br />
              {t("impressum.address.zip")}<br />
              {t("impressum.address.country")}
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{t("impressum.contact.heading")}</h2>
            <p>
              {t("impressum.contact.phoneLabel")}: {t("impressum.contact.phonePlaceholder")}<br />
              {t("impressum.contact.emailLabel")}: {profileData.contact.email}
            </p>
          </section>

          <div className="h-px w-full bg-border/50 my-8"></div>

          <section className="space-y-6 text-dim text-base">
            <div>
              <h3 className="font-bold text-text mb-2">{t("impressum.liabilityContent.heading")}</h3>
              <p>
                {t("impressum.liabilityContent.body")}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text mb-2">{t("impressum.liabilityLinks.heading")}</h3>
              <p>
                {t("impressum.liabilityLinks.body")}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text mb-2">{t("impressum.copyright.heading")}</h3>
              <p>
                {t("impressum.copyright.body")}
              </p>
            </div>
          </section>

        </article>

      </div>
    </main>
  );
}

import React from 'react';
import { Button } from '../components/Button';
import { FlowerDoodle } from '../components/DoodleLibrary';
import { profileData as rawProfile } from '../data/profile';
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
import { useTranslation } from '../context/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Privacy() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();

  useDocumentMeta({
    title: `${t("privacy.title")} — ${profileData.name}`,
    description: t("privacy.intro"),
  });

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <FlowerDoodle className="absolute top-40 -left-20 w-80 h-80 text-peach opacity-10 -rotate-12 pointer-events-none" />

      <div className="container max-w-4xl relative z-10">

        {/* Back Navigation */}
        <div className="mb-16">
          <Button to="/" variant="ghost" className="text-sm uppercase tracking-caps font-bold text-dim">
            {t("common.backToPortfolio")}
          </Button>
        </div>

        {/* Header */}
        <header className="mb-16 relative inline-block">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-text mb-4">
            {t("privacy.title")}<span className="text-primary">.</span>
          </h1>
          <p className="text-xl text-dim mt-6 font-medium max-w-2xl">
            {t("privacy.intro")}
          </p>
        </header>

        {/* Privacy Content - Structured as an Editorial Document */}
        <article className="space-y-12 text-lg text-text leading-relaxed font-medium bg-panel p-8 md:p-12 border rule-box shadow-sm relative">

          {/* Subtle Doodle on the document */}
          <FlowerDoodle className="absolute -top-6 -right-6 w-24 h-24 text-accent opacity-30 rotate-45 pointer-events-none" />

          <section>
            <h2 className="text-xs font-bold uppercase tracking-caps text-primary-600 mb-4">{t("privacy.section1.heading")}</h2>
            <h3 className="font-bold text-text mb-2 mt-6">{t("privacy.section1.generalInfo.heading")}</h3>
            <p className="mb-4">
              {t("privacy.section1.generalInfo.body")}
            </p>
            <h3 className="font-bold text-text mb-2">{t("privacy.section1.controller.heading")}</h3>
            <p>
              {t("privacy.section1.controller.body")}<br />
              <strong>{profileData.name}</strong><br />
              {t("contact.email")}: {profileData.contact.email}
            </p>
          </section>

          <div className="rule-line w-full my-8"></div>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-caps text-primary-600 mb-4">{t("privacy.section2.heading")}</h2>
            <h3 className="font-bold text-text mb-2 mt-6">{t("privacy.section2.serverLogs.heading")}</h3>
            <p className="mb-4">
              {t("privacy.section2.serverLogs.intro")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-dim text-base mb-6">
              <li>{t("privacy.section2.serverLogs.item1")}</li>
              <li>{t("privacy.section2.serverLogs.item2")}</li>
              <li>{t("privacy.section2.serverLogs.item3")}</li>
              <li>{t("privacy.section2.serverLogs.item4")}</li>
              <li>{t("privacy.section2.serverLogs.item5")}</li>
              <li>{t("privacy.section2.serverLogs.item6")}</li>
            </ul>
            <p className="text-base text-dim">
              {t("privacy.section2.serverLogs.legal")}
            </p>

            <h3 className="font-bold text-text mb-2 mt-6">{t("privacy.section2.email.heading")}</h3>
            <p className="mb-4">
              {t("privacy.section2.email.body")}
            </p>
          </section>

          <div className="rule-line w-full my-8"></div>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-caps text-primary-600 mb-4">{t("privacy.sectionAnalytics.heading")}</h2>
            <h3 className="font-bold text-text mb-2 mt-6">{t("privacy.sectionAnalytics.cookiebot.heading")}</h3>
            <p className="mb-4 text-base text-dim">
              {t("privacy.sectionAnalytics.cookiebot.body")}
            </p>
            <h3 className="font-bold text-text mb-2 mt-6">{t("privacy.sectionAnalytics.ga.heading")}</h3>
            <p className="mb-4 text-base text-dim">
              {t("privacy.sectionAnalytics.ga.body")}
            </p>
            <h3 className="font-bold text-text mb-2 mt-6">{t("privacy.sectionAnalytics.vercel.heading")}</h3>
            <p className="mb-4 text-base text-dim">
              {t("privacy.sectionAnalytics.vercel.body")}
            </p>
            <p className="text-base text-dim">
              {t("privacy.sectionAnalytics.manageHint")}{" "}
              <button
                type="button"
                onClick={() => window.Cookiebot?.renew?.()}
                className="rule-underline font-bold text-primary-600 hover:text-primary-500 transition-colors"
              >
                {t("privacy.sectionAnalytics.manage")}
              </button>
            </p>
          </section>

          <div className="rule-line w-full my-8"></div>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-caps text-primary-600 mb-4">{t("privacy.section3.heading")}</h2>
            <p className="text-base text-dim">
              {t("privacy.section3.body")}
            </p>
          </section>

        </article>

      </div>
    </div>
  );
}

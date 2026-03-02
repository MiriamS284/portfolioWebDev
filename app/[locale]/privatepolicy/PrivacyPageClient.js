"use client";

import { useTranslations } from "next-intl";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";

export default function PrivacyPageClient() {
  const t = useTranslations("privacy");

  const sections = [
    {
      title: t("section1Title"),
      subsections: [
        { subtitle: t("section1Sub1Title"), text: t("section1Sub1Text") },
        { subtitle: t("section1Sub2Title"), text: t("section1Sub2Text") },
        { subtitle: t("section1Sub3Title"), text: t("section1Sub3Text") },
        { subtitle: t("section1Sub4Title"), text: t("section1Sub4Text") },
        { subtitle: t("section1Sub5Title"), text: t("section1Sub5Text") },
      ],
    },
    {
      title: t("section2Title"),
      subsections: [
        { subtitle: t("section2Sub1Title"), text: t("section2Sub1Text") },
        { subtitle: t("section2Sub2Title"), text: t("section2Sub2Text") },
        { subtitle: t("section2Sub3Title"), text: t("section2Sub3Text") },
        { subtitle: t("section2Sub4Title"), text: t("section2Sub4Text") },
      ],
    },
    {
      title: t("section3Title"),
      subsections: [
        { subtitle: t("section3Sub1Title"), text: t("section3Sub1Text") },
        { subtitle: t("section3Sub2Title"), text: t("section3Sub2Text") },
        { subtitle: t("section3Sub3Title"), text: t("section3Sub3Text") },
        { subtitle: t("section3Sub4Title"), text: t("section3Sub4Text") },
        { subtitle: t("section3Sub5Title"), text: t("section3Sub5Text") },
      ],
    },
    {
      title: t("section4Title"),
      subsections: [
        { subtitle: t("section4Sub1Title"), text: t("section4Sub1Text") },
        { subtitle: t("section4Sub2Title"), text: t("section4Sub2Text") },
        { subtitle: t("section4Sub3Title"), text: t("section4Sub3Text") },
      ],
    },
    {
      title: t("section5Title"),
      subsections: [
        { subtitle: t("section5Sub1Title"), text: t("section5Sub1Text") },
        { subtitle: t("section5Sub2Title"), text: t("section5Sub2Text") },
      ],
    },
    {
      title: t("section6Title"),
      subsections: [{ subtitle: "", text: t("section6Text") }],
    },
  ];

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <BackLink href="/" />

          <div
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--muted)", opacity: 0.5 }}
          >
            {t("label")}
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{
              textShadow:
                "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
            }}
          >
            {t("title")}
          </h1>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index}>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "var(--ink)" }}
                >
                  {section.title}
                </h2>

                <div className="space-y-6">
                  {section.subsections.map((sub, subIndex) => (
                    <div key={subIndex}>
                      {sub.subtitle && (
                        <h3
                          className="text-lg md:text-xl font-semibold mb-3"
                          style={{ color: "var(--ink)", opacity: 0.9 }}
                        >
                          {sub.subtitle}
                        </h3>
                      )}
                      <p
                        className="whitespace-pre-line leading-relaxed"
                        style={{ color: "var(--muted)" }}
                      >
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

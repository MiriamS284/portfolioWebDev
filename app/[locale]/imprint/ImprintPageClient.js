"use client";

import { useTranslations } from "next-intl";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";

export default function ImprintPageClient() {
  const t = useTranslations("imprint");

  const sections = [
    { title: t("section1Title"), content: t("section1Content") },
    { title: t("section2Title"), content: t("section2Content") },
    { title: t("section3Title"), content: t("section3Content") },
    { title: t("section4Title"), content: t("section4Content") },
    { title: t("section5Title"), content: t("section5Content") },
    { title: t("section6Title"), content: t("section6Content") },
    { title: t("section7Title"), content: t("section7Content") },
    { title: t("section8Title"), content: t("section8Content") },
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

          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={index}>
                <h2
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{ color: "var(--ink)" }}
                >
                  {section.title}
                </h2>
                <div
                  className="whitespace-pre-line leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {section.content}
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

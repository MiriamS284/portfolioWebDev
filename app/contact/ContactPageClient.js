"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import ContactForm from "@/app/_components/contact/ContactForm";

const texts = {
  de: {
    label: "Kontakt",
    back: "Zurück",
  },
  en: {
    label: "Contact",
    back: "Back",
  },
};

export default function ContactPageClient() {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/">{t.back}</BackLink>

          {/* Label */}
          <div
            className="text-xs uppercase tracking-[0.3em] mb-12"
            style={{ color: "var(--muted)", opacity: 0.5 }}
          >
            {t.label}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </main>

      <Footer />
    </>
  );
}

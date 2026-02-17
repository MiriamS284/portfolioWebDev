"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import ContactForm from "@/app/_components/contact/ContactForm";

const texts = {
  de: { label: "Kontakt" },
  en: { label: "Contact" },
};

export default function HomeContactSection() {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        {/* Label */}
        <div
          className="text-sm font-medium mb-8 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t.label}
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
}

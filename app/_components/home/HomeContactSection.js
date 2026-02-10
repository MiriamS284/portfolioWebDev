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
      <div className="mx-auto max-w-4xl px-6">
        {/* Label */}
        <div
          className="text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: "var(--muted)", opacity: 0.5 }}
        >
          {t.label}
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";

// Häufige Fragen im bestehenden Stil (Label mit Linie, Liste wie ProjectsColumn).
export default function FaqList() {
  const t = useTranslations("homeSections.faq");
  const items = t.raw("items");

  return (
    <section id="faq" className="mt-20 max-w-2xl">
      <h2
        className="text-sm font-medium mb-8 pb-2 border-b"
        style={{ color: "var(--muted)", borderColor: "var(--border)" }}
      >
        {t("title")}
      </h2>
      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className="text-sm font-medium" style={{ color: "var(--ink)" }}>
              {item.title}
            </h3>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

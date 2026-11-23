"use client";

import { useTranslations } from "next-intl";

// Spalte im Index-Raster: Leistungsfelder in Kurzform, gleicher Listenstil wie ProjectsColumn.
export default function ServicesColumn() {
  const t = useTranslations("homeSections.servicesShort");
  const items = t.raw("items");

  return (
    <div>
      <h2 className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        {t("title")}
      </h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.title}>
            <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
              {item.title}
            </span>
            <p
              className="text-sm mt-1 leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {item.text}
            </p>
          </div>
        ))}

        <a href="#leistungen" className="group inline-block">
          <span
            className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
            style={{ color: "var(--ink)" }}
          >
            {t("viewAll")}
          </span>
        </a>
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "../shared/Container";

export default function CallToAction() {
  const t = useTranslations("cta");

  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)",
        color: "var(--ink)",
        zIndex: 3,
        isolation: "isolate",
      }}
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl opacity-80 mb-10 leading-relaxed">
            {t("description")}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="rounded-2xl px-8 py-4 text-base font-medium transition-all"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              {t("contact")}
            </Link>
            <Link
              href="/projects"
              className="rounded-2xl px-8 py-4 text-base font-medium transition-all"
              style={{
                border: "1px solid var(--border)",
                background: "transparent",
              }}
            >
              {t("viewProjects")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

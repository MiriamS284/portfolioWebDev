"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutHero() {
  const t = useTranslations("about");

  const keywords = [
    "MERN",
    "SaaS",
    "APIs",
    t("greeting").includes("Miriam") ? "Problemlöserin" : "Problem Solver",
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-semibold mb-2">{t("greeting")}</h1>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          {t("subtitle")}
        </p>
      </header>

      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <Image
          src="/profil_3.jpg"
          alt="Miriam Sparbrod"
          fill
          className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
          style={{ objectPosition: "50% 15%" }}
          priority
        />
      </div>

      <section>
        <h2
          className="text-sm font-medium mb-4 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t("block1Title")}
        </h2>
        <div className="space-y-4">
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {t("block1P1")}
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {t("block1P2")}
          </p>
        </div>
      </section>

      <section>
        <h2
          className="text-sm font-medium mb-4 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t("block2Title")}
        </h2>
        <div className="space-y-4">
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {t("block2P1")}
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {t("block2P2")}
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

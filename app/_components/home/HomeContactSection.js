"use client";

import { useTranslations } from "next-intl";
import ContactForm from "@/app/_components/contact/ContactForm";

export default function HomeContactSection() {
  const t = useTranslations("home");

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        {/* Label */}
        <div
          className="text-sm font-medium mb-8 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t("contact")}
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
}

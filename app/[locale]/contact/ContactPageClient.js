"use client";

import { useTranslations } from "next-intl";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import ContactForm from "@/app/_components/contact/ContactForm";

export default function ContactPageClient() {
  const t = useTranslations("contact");

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
            className="text-xs uppercase tracking-[0.3em] mb-12"
            style={{ color: "var(--muted)", opacity: 0.5 }}
          >
            {t("label")}
          </div>

          <ContactForm />
        </div>
      </main>

      <Footer />
    </>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";

// Kommt man von einer Seite dieser Website, führt „Zurück“ genau dorthin zurück
// (z. B. von der Datenschutzerklärung zurück zum Kontaktformular).
// Kommt man von außen (Google, Direktaufruf), gilt href als Ziel.
export default function BackLink({ href, children }) {
  const t = useTranslations("common");
  const router = useRouter();
  const label = children || t("back");

  const handleClick = (event) => {
    try {
      const cameFromThisSite =
        document.referrer && new URL(document.referrer).origin === window.location.origin;
      if (cameFromThisSite && window.history.length > 1) {
        event.preventDefault();
        router.back();
      }
    } catch {
      // Fallback: normaler Link auf href
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-2 mb-8 text-sm opacity-70 hover:opacity-100 transition-opacity"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M10 12L6 8l4-4" />
      </svg>
      {label}
    </Link>
  );
}

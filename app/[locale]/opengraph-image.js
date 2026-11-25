import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";

// Vorschaubild für geteilte Links (LinkedIn, Messenger, Suchmaschinen).
// Gilt für alle Seiten einer Sprache, sofern eine Seite kein eigenes Bild setzt.

export const alt = "Miriam Sparbrod";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const logo = await readFile(join(process.cwd(), "public", "logo_no_text.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const subtitle = t("title").split(" – ")[1] || t("title");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "72px 88px",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={logoSrc} width={300} height={300} style={{ marginRight: 56 }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 30, color: "#475569", letterSpacing: 1 }}>
            Miriam Sparbrod
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 20,
            }}
          >
            {/* Jeder Satz des Leitsatzes in eigener Zeile */}
            {t("ogTitle")
              .split(/(?<=\.)\s+/)
              .map((line) => (
                <div key={line}>{line}</div>
              ))}
          </div>
          <div style={{ fontSize: 30, color: "#334155", marginTop: 28 }}>
            {subtitle}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#64748b",
              marginTop: 48,
              paddingTop: 20,
              borderTop: "2px solid #cbd5e1",
            }}
          >
            miriamsparbrod.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}

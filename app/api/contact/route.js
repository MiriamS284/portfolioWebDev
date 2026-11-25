import { NextResponse } from "next/server";
import { z } from "zod";

// Serverseitige Prüfung: Der Browser kann umgangen werden, deshalb wird hier erneut validiert.
const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  company: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .max(50)
    .regex(/^[+()\d\s/-]*$/)
    .optional()
    .default(""),
  projectType: z.enum(["portal", "app", "ai", "website", "hosting", "existing", "open"]),
  message: z.string().trim().min(10).max(5000),
  privacy: z.literal(true),
  website: z.string().optional().default(""), // Honeypot: echte Nutzer lassen das Feld leer
});

// Lesbare Bezeichnungen für die Art des Vorhabens in der E-Mail
const PROJECT_TYPE_LABELS = {
  portal: "Fachanwendung, CRM oder Portal",
  app: "Plattform oder mobile Anwendung",
  ai: "KI und Automatisierung",
  website: "Website mit individuellem CMS",
  hosting: "Betrieb und Hosting",
  existing: "Ablösung oder Weiterentwicklung bestehender Software",
  open: "Noch offen",
};

// Einfache Begrenzung pro IP (gilt pro Server-Instanz; für mehrere Instanzen später z. B. Redis verwenden)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

// Eingaben vor dem Einfügen ins E-Mail-HTML maskieren (verhindert HTML-Injection)
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { firstName, lastName, company, email, phone, projectType, message, website } = parsed.data;
  const projectLabel = PROJECT_TYPE_LABELS[projectType];

  // Bot hat das versteckte Feld ausgefüllt: Erfolg vortäuschen, nichts senden
  if (website) {
    return NextResponse.json({ success: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const name = `${firstName} ${lastName}`;
    const subjectCompany = company ? ` (${company})` : "";

    // Resend wirft bei Fehlern keine Ausnahme, sondern liefert { error } zurück
    const { error: sendError } = await resend.emails.send({
      from: "Miriam Sparbrod <contact@miriamsparbrod.dev>",
      to: process.env.CONTACT_TO_EMAIL || "sparbrod.webdev@gmail.com",
      replyTo: email,
      subject: `miriamsparbrod.dev — ${projectLabel} — ${name}${subjectCompany}`.replace(/[\r\n]+/g, " "),
      text: [
        `Name: ${name}`,
        company ? `Unternehmen/Organisation: ${company}` : null,
        `E-Mail: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        `Art des Vorhabens: ${projectLabel}`,
        "Einwilligung Datenschutz: ja",
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
      html: `
        <h2>Neue Anfrage</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        ${company ? `<p><strong>Unternehmen/Organisation:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Art des Vorhabens:</strong> ${escapeHtml(projectLabel)}</p>
        <p><strong>Einwilligung Datenschutz:</strong> ja</p>
        <p><strong>Nachricht:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (sendError) {
      console.error("Contact form send error:", sendError);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

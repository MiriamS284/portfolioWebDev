"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";

const content = {
  de: {
    back: "Zurück",
    label: "Rechtliches",
    title: "Datenschutzerklärung",
    sections: [
      {
        title: "1. Datenschutz auf einen Blick",
        subsections: [
          {
            subtitle: "Allgemeine Hinweise",
            text: "Die folgenden Hinweise geben einen Überblick darüber, wie Deine personenbezogenen Daten beim Besuch dieser Website verarbeitet werden. Personenbezogene Daten sind alle Daten, mit denen Du persönlich identifiziert werden kannst.",
          },
          {
            subtitle: "Wer ist verantwortlich für die Datenerfassung?",
            text: "Die Datenverarbeitung auf dieser Website erfolgt durch die Websitebetreiberin. Deren Kontaktdaten findest Du im Abschnitt 'Hinweis zur Verantwortlichen'.",
          },
          {
            subtitle: "Wie erfasse ich Deine Daten?",
            text: "Deine Daten werden zum einen dadurch erhoben, dass Du mir diese mitteilst – beispielsweise über das Kontaktformular. Andere Daten werden automatisch oder nach Deiner Einwilligung beim Besuch der Website durch meine IT-Systeme erfasst. Hierbei handelt es sich vor allem um technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).",
          },
          {
            subtitle: "Wofür nutze ich Deine Daten?",
            text: "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Deines Nutzerverhaltens verwendet werden.",
          },
          {
            subtitle: "Welche Rechte hast Du bezüglich Deiner Daten?",
            text: "Du hast jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Deiner gespeicherten personenbezogenen Daten zu erhalten. Außerdem hast Du das Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Unter bestimmten Umständen kannst Du auch die Einschränkung der Verarbeitung verlangen. Zudem steht Dir ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.",
          },
        ],
      },
      {
        title: "2. Allgemeine Hinweise und Pflichtinformationen",
        subsections: [
          {
            subtitle: "Datenschutz",
            text: "Ich nehme den Schutz Deiner persönlichen Daten sehr ernst. Ich behandle Deine personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.\n\nBitte beachte, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
          },
          {
            subtitle: "Hinweis zur Verantwortlichen",
            text: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:\n\nMiriam Sparbrod\nSparbrod Webentwicklung\nDorfstraße 75A\n04626 Vollmershain\nDeutschland\n\nE-Mail: sparbrod.webdev@gmail.com",
          },
          {
            subtitle: "Speicherdauer",
            text: "Sofern innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Deine personenbezogenen Daten bei mir, bis der Zweck für die Datenverarbeitung entfällt. Solltest Du ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung widerrufen, werden Deine Daten gelöscht, sofern keine anderen rechtlich zulässigen Gründe dagegensprechen.",
          },
          {
            subtitle: "Hosting",
            text: "Diese Website wird bei Vercel Inc. gehostet. Weitere Informationen findest Du in der Datenschutzerklärung von Vercel: https://vercel.com/legal/privacy-policy",
          },
        ],
      },
      {
        title: "3. Deine Rechte",
        subsections: [
          {
            subtitle: "Widerruf Deiner Einwilligung",
            text: "Viele Datenverarbeitungsvorgänge sind nur mit Deiner ausdrücklichen Einwilligung möglich. Du kannst eine bereits erteilte Einwilligung jederzeit widerrufen, ohne dass die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung berührt wird.",
          },
          {
            subtitle: "Beschwerderecht bei der Aufsichtsbehörde",
            text: "Im Falle von Verstößen gegen die DSGVO hast Du das Recht, Dich bei einer Aufsichtsbehörde zu beschweren – insbesondere in dem Mitgliedstaat, in dem Du Deinen gewöhnlichen Aufenthalt hast.",
          },
          {
            subtitle: "Recht auf Datenübertragbarkeit",
            text: "Du hast das Recht, Daten, die ich auf Grundlage Deiner Einwilligung oder zur Vertragserfüllung automatisiert verarbeite, in einem gängigen, maschinenlesbaren Format zu erhalten.",
          },
          {
            subtitle: "Auskunft, Löschung und Berichtigung",
            text: "Du hast jederzeit das Recht auf unentgeltliche Auskunft über Deine gespeicherten personenbezogenen Daten, deren Herkunft, Empfänger und Zweck der Verarbeitung. Ebenso hast Du das Recht, Berichtigung oder Löschung dieser Daten zu verlangen.",
          },
          {
            subtitle: "Recht auf Einschränkung der Verarbeitung",
            text: "Du kannst unter bestimmten Umständen die Einschränkung der Verarbeitung Deiner personenbezogenen Daten verlangen. Dies ist möglich, wenn Du die Richtigkeit der Daten bestreitest, die Verarbeitung unrechtmäßig ist, oder ich die Daten nicht mehr benötige, Du sie jedoch zur Geltendmachung von Rechtsansprüchen benötigst.",
          },
        ],
      },
      {
        title: "4. Datenerfassung auf dieser Website",
        subsections: [
          {
            subtitle: "Server-Log-Dateien",
            text: "Der Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Dein Browser automatisch übermittelt. Dies umfasst:\n\n• Browsertyp und Browserversion\n• Verwendetes Betriebssystem\n• Referrer URL\n• Hostname des zugreifenden Rechners\n• Uhrzeit der Serveranfrage\n• IP-Adresse\n\nEine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.",
          },
          {
            subtitle: "Kontaktformular",
            text: "Wenn Du mir per Kontaktformular Anfragen zukommen lässt, werden Deine Angaben aus dem Formular zur Bearbeitung der Anfrage gespeichert. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Eine Weitergabe der Daten erfolgt nicht ohne Deine Einwilligung.",
          },
          {
            subtitle: "Anfrage per E-Mail",
            text: "Wenn Du mich per E-Mail kontaktierst, wird Deine Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zur Bearbeitung Deines Anliegens gespeichert. Die Daten verbleiben bei mir, bis Du zur Löschung aufforderst oder der Zweck der Speicherung entfällt.",
          },
        ],
      },
      {
        title: "5. Plugins und Tools",
        subsections: [
          {
            subtitle: "SSL- bzw. TLS-Verschlüsselung",
            text: "Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung zum Schutz vertraulicher Inhalte. Eine verschlüsselte Verbindung erkennst Du daran, dass die Adresszeile des Browsers von 'http://' auf 'https://' wechselt und ein Schloss-Symbol erscheint.",
          },
          {
            subtitle: "Externe Dienste",
            text: "Diese Website kann Inhalte von externen Anbietern einbinden (z. B. YouTube, GitHub). Beim Abruf dieser Inhalte wird Deine IP-Adresse an den jeweiligen Anbieter übermittelt. Informiere Dich bitte bei den jeweiligen Anbietern über deren Datenschutzpraktiken.",
          },
        ],
      },
      {
        title: "6. Profiling",
        subsections: [
          {
            subtitle: "",
            text: "Auf dieser Website findet kein automatisiertes Profiling Deiner personenbezogenen Daten statt. Die erhobenen Daten werden ausschließlich für die in dieser Datenschutzerklärung genannten Zwecke verwendet.",
          },
        ],
      },
    ],
  },
  en: {
    back: "Back",
    label: "Legal",
    title: "Privacy Policy",
    sections: [
      {
        title: "1. Privacy at a Glance",
        subsections: [
          {
            subtitle: "General Information",
            text: "The following information provides an overview of how your personal data is processed when you visit this website. Personal data is any data with which you can be personally identified.",
          },
          {
            subtitle: "Who is responsible for data collection?",
            text: "Data processing on this website is carried out by the website operator. You can find their contact details in the section \"Notice about the responsible party\".",
          },
          {
            subtitle: "How do I collect your data?",
            text: "Your data is collected when you provide it to me – for example, via the contact form. Other data is collected automatically or with your consent by my IT systems when you visit the website. This mainly includes technical data (e.g., internet browser, operating system, or time of page access).",
          },
          {
            subtitle: "What do I use your data for?",
            text: "Part of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.",
          },
          {
            subtitle: "What rights do you have regarding your data?",
            text: "You have the right to obtain free information about the origin, recipients, and purpose of your stored personal data at any time. You also have the right to request correction or deletion of this data. Under certain circumstances, you may also request restriction of processing. You also have the right to lodge a complaint with the competent supervisory authority.",
          },
        ],
      },
      {
        title: "2. General Information and Mandatory Information",
        subsections: [
          {
            subtitle: "Data Protection",
            text: "I take the protection of your personal data very seriously. I treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.\n\nPlease note that data transmission over the Internet (e.g., when communicating by email) may have security vulnerabilities. Complete protection of data from third-party access is not possible.",
          },
          {
            subtitle: "Notice about the Responsible Party",
            text: "The responsible party for data processing on this website is:\n\nMiriam Sparbrod\nSparbrod Web Development\nDorfstraße 75A\n04626 Vollmershain\nGermany\n\nEmail: sparbrod.webdev@gmail.com",
          },
          {
            subtitle: "Storage Duration",
            text: "Unless a more specific storage period has been stated in this privacy policy, your personal data will remain with me until the purpose for data processing no longer applies. If you assert a justified deletion request or revoke consent, your data will be deleted unless there are other legally permissible reasons for retaining it.",
          },
          {
            subtitle: "Hosting",
            text: "This website is hosted by Vercel Inc. For more information, please see Vercel's privacy policy: https://vercel.com/legal/privacy-policy",
          },
        ],
      },
      {
        title: "3. Your Rights",
        subsections: [
          {
            subtitle: "Revocation of Your Consent",
            text: "Many data processing operations are only possible with your express consent. You can revoke any consent you have already given at any time without affecting the lawfulness of the processing carried out until revocation.",
          },
          {
            subtitle: "Right to Complain to the Supervisory Authority",
            text: "In the event of violations of the GDPR, you have the right to lodge a complaint with a supervisory authority – particularly in the member state of your habitual residence.",
          },
          {
            subtitle: "Right to Data Portability",
            text: "You have the right to receive data that I process automatically based on your consent or in fulfillment of a contract in a commonly used, machine-readable format.",
          },
          {
            subtitle: "Information, Deletion, and Correction",
            text: "You have the right to free information about your stored personal data, its origin, recipients, and purpose of processing at any time. You also have the right to request correction or deletion of this data.",
          },
          {
            subtitle: "Right to Restriction of Processing",
            text: "Under certain circumstances, you can request the restriction of processing of your personal data. This is possible if you contest the accuracy of the data, the processing is unlawful, or I no longer need the data, but you need it for asserting legal claims.",
          },
        ],
      },
      {
        title: "4. Data Collection on This Website",
        subsections: [
          {
            subtitle: "Server Log Files",
            text: "The provider of this website automatically collects and stores information in server log files that your browser automatically transmits. This includes:\n\n• Browser type and version\n• Operating system used\n• Referrer URL\n• Hostname of the accessing computer\n• Time of server request\n• IP address\n\nThis data is not merged with other data sources. Collection is based on Art. 6 para. 1 lit. f GDPR.",
          },
          {
            subtitle: "Contact Form",
            text: "If you send me inquiries via the contact form, your details from the form will be stored to process the inquiry. Processing is based on Art. 6 para. 1 lit. b GDPR (contract initiation) or Art. 6 para. 1 lit. f GDPR (legitimate interest). Data is not passed on without your consent.",
          },
          {
            subtitle: "Email Contact",
            text: "If you contact me by email, your inquiry including all personal data arising from it will be stored for processing your concern. The data will remain with me until you request deletion or the purpose for storage no longer applies.",
          },
        ],
      },
      {
        title: "5. Plugins and Tools",
        subsections: [
          {
            subtitle: "SSL or TLS Encryption",
            text: "This website uses SSL or TLS encryption to protect confidential content. You can recognize an encrypted connection by the browser address bar changing from \"http://\" to \"https://\" and a lock symbol appearing.",
          },
          {
            subtitle: "External Services",
            text: "This website may embed content from external providers (e.g., YouTube, GitHub). When accessing this content, your IP address is transmitted to the respective provider. Please inform yourself about the data protection practices of the respective providers.",
          },
        ],
      },
      {
        title: "6. Profiling",
        subsections: [
          {
            subtitle: "",
            text: "No automated profiling of your personal data takes place on this website. The collected data is used exclusively for the purposes stated in this privacy policy.",
          },
        ],
      },
    ],
  },
};

export default function PrivacyPageClient() {
  const { lang } = useLanguage();
  const t = content[lang] || content.de;

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/">{t.back}</BackLink>

          {/* Label */}
          <div
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--muted)", opacity: 0.5 }}
          >
            {t.label}
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{
              textShadow: "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
            }}
          >
            {t.title}
          </h1>

          {/* Sections */}
          <div className="space-y-12">
            {t.sections.map((section, index) => (
              <section key={index}>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "var(--ink)" }}
                >
                  {section.title}
                </h2>

                <div className="space-y-6">
                  {section.subsections.map((sub, subIndex) => (
                    <div key={subIndex}>
                      {sub.subtitle && (
                        <h3
                          className="text-lg md:text-xl font-semibold mb-3"
                          style={{ color: "var(--ink)", opacity: 0.9 }}
                        >
                          {sub.subtitle}
                        </h3>
                      )}
                      <p
                        className="whitespace-pre-line leading-relaxed"
                        style={{ color: "var(--muted)" }}
                      >
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

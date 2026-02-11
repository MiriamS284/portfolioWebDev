"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";

const content = {
  de: {
    back: "Zurück",
    label: "Rechtliches",
    title: "Impressum",
    sections: [
      {
        title: "Angaben gemäß § 5 DDG",
        content: `Miriam Sparbrod
Sparbrod Webentwicklung - Web Application Development
Dorfstraße 75A
04626 Vollmershain
Deutschland

E-Mail: sparbrod.webdev@gmail.com
Web: www.sparbrod-webdev.info`,
      },
      {
        title: "Rechtsform",
        content: `Einzelunternehmen
Vertreten durch: Miriam Sparbrod (Inhaberin)`,
      },
      {
        title: "Umsatzsteuer-Identifikationsnummer",
        content: `Umsatzsteuerbefreit gemäß § 19 UStG`,
      },
      {
        title: "Haftung für Inhalte",
        content: `Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.`,
      },
      {
        title: "Haftung für Links",
        content: `Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der/die jeweilige Anbieter*in oder Betreiber*in der Seiten verantwortlich.

Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.`,
      },
      {
        title: "Urheberrecht",
        content: `Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen meiner schriftlichen Zustimmung.

Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet. Solltest Du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.`,
      },
      {
        title: "Alternative Streitbeilegung",
        content: `Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr

Meine E-Mail-Adresse findest Du oben im Impressum. Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`,
      },
      {
        title: "Quellenangaben",
        content: `Icons: React Icons (https://react-icons.github.io/react-icons/)
Bildmaterial: Unsplash (https://unsplash.com) für Stock Images`,
      },
    ],
  },
  en: {
    back: "Back",
    label: "Legal",
    title: "Legal Notice",
    sections: [
      {
        title: "Information according to § 5 DDG",
        content: `Miriam Sparbrod
Sparbrod Web Development - Web Application Development
Dorfstraße 75A
04626 Vollmershain
Germany

Email: sparbrod.webdev@gmail.com
Web: www.sparbrod-webdev.info`,
      },
      {
        title: "Legal Form",
        content: `Sole Proprietorship
Represented by: Miriam Sparbrod (Owner)`,
      },
      {
        title: "VAT Identification Number",
        content: `VAT exempt according to § 19 UStG (German VAT Act)`,
      },
      {
        title: "Liability for Content",
        content: `As a service provider, I am responsible for my own content on these pages in accordance with § 7 para. 1 DDG under general laws. However, according to §§ 8 to 10 DDG, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.

Obligations to remove or block the use of information under general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific legal violation. Upon becoming aware of corresponding legal violations, I will remove this content immediately.`,
      },
      {
        title: "Liability for Links",
        content: `My offer contains links to external third-party websites, over whose content I have no influence. Therefore, I cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.

The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, a permanent content control of the linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations, I will remove such links immediately.`,
      },
      {
        title: "Copyright",
        content: `The content and works created by me on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of exploitation outside the limits of copyright require my written consent.

Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by me, the copyrights of third parties are respected. If you become aware of a copyright infringement, please inform me. Upon becoming aware of legal violations, I will remove such content immediately.`,
      },
      {
        title: "Alternative Dispute Resolution",
        content: `The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr

You can find my email address in the imprint above. I am neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.`,
      },
      {
        title: "Source Credits",
        content: `Icons: React Icons (https://react-icons.github.io/react-icons/)
Images: Unsplash (https://unsplash.com) for stock images`,
      },
    ],
  },
};

export default function ImprintPageClient() {
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
          <div className="space-y-10">
            {t.sections.map((section, index) => (
              <section key={index}>
                <h2
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{ color: "var(--ink)" }}
                >
                  {section.title}
                </h2>
                <div
                  className="whitespace-pre-line leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {section.content}
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

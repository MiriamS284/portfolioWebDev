import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import ClientLayout from "../_components/layout/ClientLayout";
import { Inter, Space_Grotesk, Source_Code_Pro } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "600"],
});

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const metadata = {
    de: {
      title: "Miriam Sparbrod – Full-Stack Entwicklerin",
      description: "Full-Stack Entwicklerin spezialisiert auf SaaS-Lösungen, Automatisierung und Full-Stack-Anwendungen für moderne Unternehmen.",
    },
    en: {
      title: "Miriam Sparbrod – Full-Stack Developer",
      description: "Full-Stack Developer specializing in SaaS solutions, automation, full-stack applications for modern businesses.",
    }
  };

  return {
    title: metadata[locale]?.title || metadata.de.title,
    description: metadata[locale]?.description || metadata.de.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'de': '/de',
        'en': '/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable} min-h-dvh antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

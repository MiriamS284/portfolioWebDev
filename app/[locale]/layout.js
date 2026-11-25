import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import ClientLayout from "../_components/layout/ClientLayout";
import localFont from "next/font/local";
import Analytics from '../_components/shared/Analytics';
import CookieBanner from '../_components/shared/CookieBanner';

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-heading",
  weight: "300 700",
  display: "swap",
});

const sourceCodePro = localFont({
  src: "../fonts/source-code-pro-latin-wght-normal.woff2",
  variable: "--font-mono",
  weight: "200 900",
  display: "swap",
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
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL('https://miriamsparbrod.dev'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      siteName: 'Miriam Sparbrod',
      title: t('ogTitle'),
      description: t('description'),
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('description'),
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
          <Analytics />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google"; // NEU!
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import LanguageProvider from "./_providers/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// NEU: Space Grotesk für Headlines
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

export const metadata = {
  title: "Miriam Sparbrod – Full-Stack Entwicklerin",
  description:
    "Sprachwissenschaftlerin & Full-Stack Entwicklerin. Ich übersetze komplexe Ideen in funktionale, schöne Anwendungen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable} min-h-dvh antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

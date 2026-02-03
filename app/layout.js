import { Inter, Space_Grotesk, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import ClientLayout from "./_components/layout/ClientLayout";

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

export const metadata = {
  title: "Miriam Sparbrod – Full-Stack Entwicklerin",
  description:
    "Full-Stack App - Entwicklerin. Ich übersetze komplexe Ideen in performante Anwendungen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable} min-h-dvh antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

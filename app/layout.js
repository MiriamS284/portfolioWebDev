// app/layout.js
import "./globals.css";
import { Inter, Source_Code_Pro } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code",
});

export const metadata = {
  title: "Miriam Sparbrod – Web Entwicklerin",
  description: "Präzise, performante & zugängliche Web-Erlebnisse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="h-full">
      {/* beide Variablen auf <body>, Tailwind nutzt sie als default */}
      <body
        className={`${inter.variable} ${sourceCodePro.variable} min-h-dvh antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

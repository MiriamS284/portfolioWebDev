"use client";

import { LanguageProvider } from "../../_context/LanguageProvider";
import { ThemeProvider } from "../../_context/ThemeProvider";
import MenuDock from "./MenuDock";

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MenuDock />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}

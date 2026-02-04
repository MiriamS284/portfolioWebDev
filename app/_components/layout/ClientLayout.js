"use client";

import { LanguageProvider } from "../../_context/LanguageProvider";
import MenuDock from "./MenuDock";

export default function ClientLayout({ children }) {
  return (
    <LanguageProvider>
      <MenuDock />
      {children}
    </LanguageProvider>
  );
}

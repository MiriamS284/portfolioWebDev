"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

// Lazy initializer - wird nur einmal beim ersten Render ausgeführt
function getInitialLang() {
  if (typeof window === "undefined") return "de";
  const stored = localStorage.getItem("preferred_language");
  return stored === "de" || stored === "en" ? stored : "de";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration-Status setzen (ohne setState im selben Tick)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sprache ändern und speichern
  const setLang = (newLang) => {
    if (newLang !== "de" && newLang !== "en") return;
    setLangState(newLang);
    localStorage.setItem("preferred_language", newLang);
  };

  // html lang-Attribut aktualisieren
  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = lang;
    }
  }, [lang, isHydrated]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, language: lang, setLanguage: setLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

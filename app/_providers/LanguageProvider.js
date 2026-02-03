"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("de");
  const [isHydrated, setIsHydrated] = useState(false);

  // Beim ersten Laden aus localStorage holen
  useEffect(() => {
    const stored = localStorage.getItem("preferred_language");
    if (stored === "de" || stored === "en") {
      setLangState(stored);
    }
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

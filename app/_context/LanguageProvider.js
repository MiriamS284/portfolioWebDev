"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useSyncExternalStore,
  useCallback,
} from "react";

const LanguageContext = createContext();

// localStorage Subscriptions für useSyncExternalStore
function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("language-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("language-change", callback);
  };
}

function getSnapshot() {
  const stored = localStorage.getItem("preferred_language");
  return stored === "de" || stored === "en" ? stored : "de";
}

function getServerSnapshot() {
  return "de"; // Server rendert immer mit "de"
}

export function LanguageProvider({ children }) {
  // useSyncExternalStore vermeidet Hydration-Mismatches
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sprache ändern und speichern
  const setLang = useCallback((newLang) => {
    if (newLang !== "de" && newLang !== "en") return;
    localStorage.setItem("preferred_language", newLang);
    // Custom Event triggern für useSyncExternalStore
    window.dispatchEvent(new Event("language-change"));
  }, []);

  // html lang-Attribut aktualisieren
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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

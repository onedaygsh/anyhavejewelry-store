"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, translations } from "./translations";
import { getAdminTranslations, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { getStoredCountry } from "@/lib/countries";

const STORAGE_KEY = "anyhave-jewelry-locale";
const DEFAULT_LOCALE: Locale = "en";
const SUPPORTED_LOCALES: Locale[] = ["en", "zh"];

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations[Locale];
  supportedLocales: Locale[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  // Country selection takes priority
  const country = getStoredCountry();
  if (country && SUPPORTED_LOCALES.includes(country.locale)) return country.locale;
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  const browserLang = navigator.language.slice(0, 2) as Locale;
  if (SUPPORTED_LOCALES.includes(browserLang)) return browserLang;
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);
  const [mergedTranslations, setMergedTranslations] = useState(translations);

  const loadTranslations = () => {
    setMergedTranslations(getAdminTranslations(translations));
  };

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
    loadTranslations();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.translations) loadTranslations();
    });
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
    }
  };

  const t = mergedTranslations[locale];

  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: DEFAULT_LOCALE, setLocale, t: mergedTranslations[DEFAULT_LOCALE], supportedLocales: SUPPORTED_LOCALES }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, supportedLocales: SUPPORTED_LOCALES }}>
      {children}
    </I18nContext.Provider>
  );
}

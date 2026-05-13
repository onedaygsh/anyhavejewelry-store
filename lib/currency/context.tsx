"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CurrencyCode } from "./types";
import { defaultCurrency, currencyList } from "./rates";
import { detectCurrencyFromLocale } from "./utils";

const STORAGE_KEY = "anyhave-currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencies: CurrencyCode[];
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(defaultCurrency);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as CurrencyCode | null) : null;
    if (stored && currencyList.includes(stored)) {
      setCurrencyState(stored);
    } else {
      // Auto-detect from browser locale on first visit
      const detected = detectCurrencyFromLocale();
      setCurrencyState(detected);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, detected);
      }
    }
    setMounted(true);
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, c);
    }
  };

  if (!mounted) {
    return (
      <CurrencyContext.Provider value={{ currency: defaultCurrency, setCurrency, currencies: currencyList }}>
        {children}
      </CurrencyContext.Provider>
    );
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies: currencyList }}>
      {children}
    </CurrencyContext.Provider>
  );
}

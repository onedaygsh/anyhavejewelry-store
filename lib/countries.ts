import { Locale } from "./i18n/translations";
import { CurrencyCode } from "./currency/types";

export interface Country {
  code: string;
  name: string;
  nameZh: string;
  flag: string;
  locale: Locale;
  currency: CurrencyCode;
}

export const countries: Country[] = [
  { code: "US", name: "United States", nameZh: "美国", flag: "🇺🇸", locale: "en", currency: "USD" },
  { code: "CN", name: "China", nameZh: "中国", flag: "🇨🇳", locale: "zh", currency: "CNY" },
  { code: "GB", name: "United Kingdom", nameZh: "英国", flag: "🇬🇧", locale: "en", currency: "GBP" },
  { code: "JP", name: "Japan", nameZh: "日本", flag: "🇯🇵", locale: "en", currency: "JPY" },
  { code: "DE", name: "Germany", nameZh: "德国", flag: "🇩🇪", locale: "en", currency: "EUR" },
  { code: "FR", name: "France", nameZh: "法国", flag: "🇫🇷", locale: "en", currency: "EUR" },
  { code: "AU", name: "Australia", nameZh: "澳大利亚", flag: "🇦🇺", locale: "en", currency: "AUD" },
  { code: "CA", name: "Canada", nameZh: "加拿大", flag: "🇨🇦", locale: "en", currency: "CAD" },
  { code: "IT", name: "Italy", nameZh: "意大利", flag: "🇮🇹", locale: "en", currency: "EUR" },
  { code: "ES", name: "Spain", nameZh: "西班牙", flag: "🇪🇸", locale: "en", currency: "EUR" },
];

export const defaultCountry = countries[0]; // US

const COUNTRY_STORAGE_KEY = "anyhave-country";

export function getStoredCountry(): Country {
  if (typeof window === "undefined") return defaultCountry;
  const stored = localStorage.getItem(COUNTRY_STORAGE_KEY);
  if (stored) {
    const found = countries.find((c) => c.code === stored);
    if (found) return found;
  }
  return defaultCountry;
}

export function setStoredCountry(code: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(COUNTRY_STORAGE_KEY, code);
  }
}

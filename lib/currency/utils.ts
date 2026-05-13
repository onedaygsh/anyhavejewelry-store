import { CurrencyCode, CurrencyConfig } from "./types";
import { currencies, defaultCurrency } from "./rates";

export function getCurrencyConfig(code: CurrencyCode): CurrencyConfig {
  return currencies[code] || currencies[defaultCurrency];
}

export function convertPrice(cnyPrice: number, currency: CurrencyCode): number {
  const config = getCurrencyConfig(currency);
  return Math.round(cnyPrice * config.rate);
}

export function formatPrice(cnyPrice: number, currency: CurrencyCode): string {
  const config = getCurrencyConfig(currency);
  const converted = convertPrice(cnyPrice, currency);
  return `${config.symbol}${converted.toLocaleString(config.locale)}`;
}

export function formatPriceRange(min: number, max: number, currency: CurrencyCode): string {
  const config = getCurrencyConfig(currency);
  const cMin = convertPrice(min, currency);
  const cMax = convertPrice(max, currency);
  return `${config.symbol}${cMin.toLocaleString(config.locale)} - ${config.symbol}${cMax.toLocaleString(config.locale)}`;
}

const localeToCurrency: Record<string, CurrencyCode> = {
  "zh": "CNY",
  "zh-CN": "CNY",
  "zh-TW": "CNY",
  "zh-HK": "CNY",
  "ja": "JPY",
  "ja-JP": "JPY",
  "en-US": "USD",
  "en-CA": "CAD",
  "en-GB": "GBP",
  "en-AU": "AUD",
  "de": "EUR",
  "de-DE": "EUR",
  "fr": "EUR",
  "fr-FR": "EUR",
  "es": "EUR",
  "es-ES": "EUR",
  "it": "EUR",
  "it-IT": "EUR",
  "nl": "EUR",
  "pt": "EUR",
  "pl": "EUR",
  "sv": "EUR",
  "da": "EUR",
  "fi": "EUR",
  "no": "EUR",
};

export function detectCurrencyFromLocale(): CurrencyCode {
  if (typeof window === "undefined") return defaultCurrency;

  const lang = navigator.language || (navigator as unknown as { languages?: string[] }).languages?.[0] || "en-US";

  // Try exact match first
  if (localeToCurrency[lang]) {
    return localeToCurrency[lang];
  }

  // Try prefix match (e.g., "en-GB" -> "en")
  const prefix = lang.split("-")[0];
  if (localeToCurrency[prefix]) {
    return localeToCurrency[prefix];
  }

  // Fallback: if language starts with "en" and not matched above, default to USD
  if (prefix === "en") return "USD";

  return defaultCurrency;
}

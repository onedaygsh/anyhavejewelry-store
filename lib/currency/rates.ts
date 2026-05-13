import { CurrencyConfig, CurrencyCode } from "./types";

// Base currency is CNY (data stored in CNY)
export const currencies: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", rate: 0.1385 },
  CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan", locale: "zh-CN", rate: 1 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE", rate: 0.127 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB", rate: 0.108 },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP", rate: 20.5 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU", rate: 0.21 },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA", rate: 0.195 },
};

export const currencyList: CurrencyCode[] = ["USD", "CNY", "EUR", "GBP", "JPY", "AUD", "CAD"];

export const defaultCurrency: CurrencyCode = "USD";

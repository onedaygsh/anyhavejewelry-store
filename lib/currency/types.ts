export type CurrencyCode = "USD" | "CNY" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  rate: number; // relative to base currency (CNY)
}

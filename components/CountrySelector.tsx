"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { countries, Country, getStoredCountry, setStoredCountry } from "@/lib/countries";
import { useI18n } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency/context";

export default function CountrySelector() {
  const { locale, setLocale } = useI18n();
  const { setCurrency } = useCurrency();
  const [selected, setSelected] = useState<Country>(getStoredCountry);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: Country) => {
    setSelected(country);
    setStoredCountry(country.code);
    setLocale(country.locale);
    setCurrency(country.currency);
    setOpen(false);
  };

  const label = locale === "zh" ? selected.nameZh : selected.name;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 text-xs tracking-wide text-charcoal/70 hover:text-charcoal hover:bg-black/5 rounded transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{selected.flag}</span>
        <span>{label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-black/10 shadow-lg z-50 max-h-72 overflow-y-auto">
          <div className="py-1">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleSelect(country)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-cream transition-colors ${
                  selected.code === country.code ? "bg-cream/50 font-medium" : ""
                }`}
              >
                <span className="text-base">{country.flag}</span>
                <span className="flex-1 text-charcoal/80">
                  {locale === "zh" ? country.nameZh : country.name}
                </span>
                <span className="text-xs text-charcoal/40">{country.currency}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

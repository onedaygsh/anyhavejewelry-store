"use client";

import { useCurrency } from "@/lib/currency/context";
import { currencies } from "@/lib/currency/rates";
import { Globe } from "lucide-react";
import { useState } from "react";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  const config = currencies[currency];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs tracking-wide text-charcoal/70 hover:text-charcoal transition-colors"
        aria-label="Switch currency"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{config.code}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white border border-black/10 shadow-lg z-50 min-w-[140px] py-1">
            {Object.values(currencies).map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-stone transition-colors ${
                  c.code === currency ? "text-charcoal font-medium" : "text-charcoal/60"
                }`}
              >
                {c.symbol} {c.code} — {c.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

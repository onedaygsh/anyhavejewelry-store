"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { products as defaultProducts } from "@/lib/data";
import { getAdminProducts, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { formatPrice } from "@/lib/currency/utils";
import { useCurrency } from "@/lib/currency/context";
import { useI18n } from "@/lib/i18n/context";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(defaultProducts);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currency } = useCurrency();
  const { t } = useI18n();

  useEffect(() => {
    const load = () => setProducts(getAdminProducts(defaultProducts));
    load();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.products) load();
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.tierLabel.toLowerCase().includes(q)
    );
  }, [query, products]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const resultsText = results.length === 1
    ? t.search.results.replace("{n}", String(results.length))
    : t.search.resultsPlural.replace("{n}", String(results.length));

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center pt-24 md:pt-32 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white shadow-2xl">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5">
          <Search className="w-5 h-5 text-charcoal/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.searchProducts}
            className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-charcoal/50" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="px-5 py-8 text-center text-sm text-charcoal/40">
              {t.search.typeToSearch}
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-charcoal/40">
              {t.search.noProductsFound.replace("{query}", query)}
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}/`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-cream transition-colors"
                >
                  <div className="w-14 h-14 bg-stone flex-shrink-0 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-charcoal/40 mt-0.5">
                      {product.material}
                    </p>
                  </div>
                  <span className="text-sm text-charcoal">
                    {formatPrice(product.price, currency)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 bg-cream border-t border-black/5 text-[10px] text-charcoal/30 tracking-wider uppercase flex items-center justify-between">
          <span>{resultsText}</span>
          <span>{t.search.pressEsc}</span>
        </div>
      </div>
    </div>
  );
}

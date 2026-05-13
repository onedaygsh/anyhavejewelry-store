"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Search } from "lucide-react";
import { products as defaultProducts } from "@/lib/data";
import { getAdminProducts, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";
import WishlistButton from "@/components/WishlistButton";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { useI18n } from "@/lib/i18n/context";

export default function ProductList() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const activeTier = searchParams.get("tier") || "";
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState(defaultProducts);
  const { addItem } = useCart();
  const { currency } = useCurrency();

  const tiers = [
    { key: "", label: t.products.all },
    { key: "moissanite", label: t.products.moissanite },
    { key: "lab", label: t.products.lab },
  ];

  const loadProducts = () => {
    const loaded = getAdminProducts(defaultProducts);
    setAllProducts(loaded);
  };

  useEffect(() => {
    loadProducts();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.products) loadProducts();
    });
  }, []);

  const nonNaturalProducts = allProducts;

  const tierProducts = activeTier
    ? nonNaturalProducts.filter((p) => p.tier === activeTier)
    : nonNaturalProducts;
  const displayed = tierProducts.filter((p) =>
    [p.name, p.material, p.tierLabel].some((field) =>
      field.toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-obsidian/40 mb-4">
            {t.products.label}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-obsidian mb-8">
            {t.products.title}
          </h1>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-6">
            <div className="flex flex-wrap gap-3">
              {tiers.map((tier) => (
                <Link
                  key={tier.key}
                  href={tier.key ? `/products/?tier=${tier.key}` : "/products/"}
                  className={cn(
                    "px-5 py-2 text-sm tracking-wide border transition-all duration-300",
                    activeTier === tier.key
                      ? "bg-obsidian text-white border-obsidian"
                      : "bg-white text-obsidian/60 border-black/10 hover:border-obsidian/30 hover:text-obsidian"
                  )}
                >
                  {tier.label}
                </Link>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.products.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2.5 bg-stone border-none text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:ring-1 focus:ring-obsidian/10"
              />
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-obsidian/40 mb-8">
            {t.products.count.replace("{n}", String(displayed.length))}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={`/product/${product.slug}/`}
                className="group block"
              >
                <div className="aspect-[4/5] bg-stone relative overflow-hidden mb-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] tracking-widest uppercase text-obsidian/70">
                      {product.tierLabel}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <WishlistButton
                      product={product}
                      className="w-8 h-8 bg-white/90 backdrop-blur rounded-full"
                      iconClassName="w-4 h-4"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                <h3 className="text-base font-medium text-obsidian mb-1 group-hover:text-warm-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-obsidian/50 mb-2">
                  {product.material}
                </p>
                <p className="text-sm font-medium tracking-wide">
                  {formatPrice(product.price, currency)}
                </p>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem(product, 1);
                }}
                className="mt-3 w-full py-3 border border-black/10 text-xs tracking-widest uppercase text-obsidian/70 hover:bg-obsidian hover:text-white hover:border-obsidian transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {t.products.addToBag}
              </button>
            </motion.div>
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="py-32 text-center text-obsidian/40">
            <p>{t.products.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
}

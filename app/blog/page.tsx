"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products as defaultProducts } from "@/lib/data";
import { getAdminProducts, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { useI18n } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { ArrowRight, Gem } from "lucide-react";

export default function BlogPage() {
  const { t, locale } = useI18n();
  const { currency } = useCurrency();
  const [allProducts, setAllProducts] = useState(defaultProducts);

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

  const featured = allProducts[0];
  const rest = allProducts.slice(1);

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
            {locale === "en" ? "Product Stories" : "产品故事"}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
            {locale === "en" ? "Jewelry Collection & Stories" : "珠宝系列与故事"}
          </h1>
          <p className="text-charcoal/60 max-w-xl mx-auto">
            {locale === "en"
              ? "Discover the inspiration, craftsmanship, and meaning behind every piece in our collection."
              : "探索我们系列中每件作品背后的灵感、工艺和意义。"}
          </p>
        </motion.div>

        {/* Featured Product Story */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <Link href={`/blog/${featured.slug}/`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 bg-white border border-black/5 overflow-hidden">
                <div className="aspect-[4/3] md:aspect-auto bg-stone overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-cream text-[10px] tracking-widest uppercase text-charcoal/60 border border-black/5">
                      {featured.tierLabel}
                    </span>
                    <span className="text-xs text-charcoal/30">
                      {featured.material}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 group-hover:text-champagne transition-colors">
                    {featured.name}
                  </h2>
                  <p className="text-charcoal/50 leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xl font-light tracking-wide text-charcoal">
                      {formatPrice(featured.price, currency)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs text-champagne underline underline-offset-4">
                    {locale === "en" ? "Read the Story" : "阅读故事"}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Product Story Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <Link href={`/blog/${product.slug}/`} className="group block">
                <div className="aspect-[4/3] bg-stone overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] tracking-widest uppercase text-charcoal/40">
                    {product.tierLabel}
                  </span>
                  <span className="text-[10px] text-charcoal/20">|</span>
                  <span className="text-[10px] text-charcoal/30">
                    {product.material}
                  </span>
                </div>
                <h3 className="text-base font-medium text-charcoal mb-2 group-hover:text-champagne transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-charcoal/50 line-clamp-2 mb-3">
                  {product.description}
                </p>
                <p className="text-sm font-medium tracking-wide text-charcoal">
                  {formatPrice(product.price, currency)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

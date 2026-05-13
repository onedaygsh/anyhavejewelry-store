"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products as defaultProducts } from "@/lib/data";
import { getAdminProducts, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/currency/utils";
import { useCurrency } from "@/lib/currency/context";
import { useI18n } from "@/lib/i18n/context";

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [products, setProducts] = useState(defaultProducts);
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const { t } = useI18n();

  useEffect(() => {
    const load = () => setProducts(getAdminProducts(defaultProducts));
    load();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.products) load();
    });
  }, []);

  const featured = products.filter((p) => p.featured);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-obsidian/40 mb-4">{t.featured.label}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-obsidian">{t.featured.title}</h2>
          </div>
          <Link
            href="/products/"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-obsidian/60 hover:text-obsidian transition-colors group"
          >
            {t.featured.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/product/${product.slug}/`} className="group block">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                <h3 className="text-base font-medium text-obsidian mb-1 group-hover:text-warm-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-obsidian/50 mb-2">{product.material}</p>
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
                className="mt-4 w-full py-3 border border-black/10 text-xs tracking-widest uppercase text-obsidian/70 hover:bg-obsidian hover:text-white hover:border-obsidian transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {t.featured.addToBag}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

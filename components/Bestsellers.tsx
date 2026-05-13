"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function Bestsellers() {
  const { currency } = useCurrency();
  const { locale } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [label, setLabel] = useState("Best Selling");
  const [title, setTitle] = useState("DIAMAURA'S BEST SELLING");

  const loadData = () => {
    const sections = getHomepageSections();
    const isZh = locale === "zh";
    setLabel(isZh ? sections.bestsellers.labelZh : sections.bestsellers.labelEn);
    setTitle(isZh ? sections.bestsellers.titleZh : sections.bestsellers.titleEn);
  };

  useEffect(() => {
    loadData();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadData();
    });
  }, [locale]);

  const featured = products.filter((p) => p.featured).slice(0, 8);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-20 md:py-28 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3">
              {label}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {title}
            </h2>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
            >
              <Link href={`/product/${product.slug}/`} className="group block">
                <div className="aspect-[4/5] bg-stone relative overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] tracking-widest uppercase text-charcoal/70">
                      {product.tierLabel}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-charcoal mb-1 group-hover:text-champagne transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-charcoal/50">
                  {formatPrice(product.price, currency)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

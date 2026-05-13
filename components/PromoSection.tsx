"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function PromoSection() {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const [promos, setPromos] = useState([
    { discount: "30% OFF", label: "Lab Diamonds", href: "/products/?tier=lab", bg: "bg-stone" },
    { discount: "20% OFF", label: "Engagement Rings", href: "/products/?tier=moissanite", bg: "bg-cream-dark" },
    { discount: "15% OFF", label: "Wedding Bands", href: "/products/", bg: "bg-stone" },
    { discount: "FREE", label: "Engraving", href: "/customize/", bg: "bg-cream-dark" },
  ]);
  const [promoCode, setPromoCode] = useState("Check Out With Code: DIAMOND30");

  const loadPromos = () => {
    const sections = getHomepageSections();
    if (sections.promos && sections.promos.length > 0) {
      setPromos(
        sections.promos.map((p) => ({
          discount: isZh ? p.discountZh : p.discountEn,
          label: isZh ? p.labelZh : p.labelEn,
          href: p.href,
          bg: p.bg,
        }))
      );
    }
    if (sections.promoCode) {
      setPromoCode(sections.promoCode);
    }
  };

  useEffect(() => {
    loadPromos();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadPromos();
    });
  }, [isZh]);

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3">
            Limited Time
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
            Special Offers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promos.map((promo, i) => (
            <motion.div
              key={promo.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={promo.href}
                className={`block ${promo.bg} p-6 md:p-8 text-center border border-black/5 hover:border-champagne/50 transition-all duration-300 group`}
              >
                <p className="text-2xl md:text-3xl font-serif text-charcoal mb-1 group-hover:text-champagne transition-colors">
                  {promo.discount}
                </p>
                <p className="text-xs tracking-widest uppercase text-charcoal/60">
                  {promo.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-charcoal/40">
            {promoCode}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

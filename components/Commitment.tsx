"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function Commitment() {
  const { t, locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [images, setImages] = useState([
    "/images/jewelry/ring-100.png",
    "/images/jewelry/ring-150.png",
    "/images/jewelry/ring-140.png",
  ]);

  const [stats, setStats] = useState<{ num: string; label: string }[]>(
    t.home.commitment.stats.map((s) => ({ num: s.num, label: s.label }))
  );

  const loadData = () => {
    const sections = getHomepageSections();
    if (sections.commitment.images && sections.commitment.images.length > 0) {
      setImages(sections.commitment.images);
    }
    if (sections.commitment.stats && sections.commitment.stats.length > 0) {
      setStats(
        sections.commitment.stats.map((s) => ({
          num: s.num,
          label: locale === "en" ? s.labelEn : s.labelZh,
        }))
      );
    }
  };

  useEffect(() => {
    loadData();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadData();
    });
  }, [locale]);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal tracking-[0.1em] mb-2">
            {t.home.commitment.title}
          </h2>
          <p className="text-sm text-charcoal/50 italic">
            {t.home.commitment.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img + i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="aspect-[4/3] bg-cream rounded-sm overflow-hidden border border-black/5"
            >
              <img
                src={img}
                alt="Craftsmanship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-black/5 p-6 bg-cream/50">
              <p className="text-2xl font-serif text-charcoal mb-1">{stat.num}</p>
              <p className="text-xs text-charcoal/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

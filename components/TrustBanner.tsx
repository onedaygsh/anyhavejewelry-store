"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Factory, Truck, Headphones } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getSiteSettings, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

const icons = [ShieldCheck, Factory, Truck, Headphones];

export default function TrustBanner() {
  const ref = useRef(null);
  const { locale } = useI18n();
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [items, setItems] = useState([
    { title: "Certified Quality", desc: "GIA-graded diamonds and pure metals" },
    { title: "Master Craftsmanship", desc: "Hand-finished by expert artisans" },
    { title: "Global Shipping", desc: "Insured delivery worldwide" },
    { title: "Design Support", desc: "1-on-1 consultation with jewelry experts" },
  ]);

  const loadItems = () => {
    const settings = getSiteSettings();
    if (settings.trustItems && settings.trustItems.length > 0) {
      setItems(
        settings.trustItems.map((item) => ({
          title: locale === "en" ? item.titleEn : item.titleZh,
          desc: locale === "en" ? item.descEn : item.descZh,
        }))
      );
    }
  };

  useEffect(() => {
    loadItems();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.siteSettings) loadItems();
    });
  }, [locale]);

  return (
    <section className="bg-stone py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4 shadow-sm">
                  <Icon className="w-5 h-5 text-obsidian/70" />
                </div>
                <h3 className="text-sm font-medium text-obsidian mb-1">{item.title}</h3>
                <p className="text-xs text-obsidian/50">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

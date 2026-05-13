"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function Features() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [features, setFeatures] = useState([
    { title: "Ethical Stones", desc: "Conflict-free moissanite and certified lab-grown diamonds." },
    { title: "Custom Design", desc: "Personalize every detail from stone to metal to engraving." },
    { title: "Master Craftsmanship", desc: "Hand-finished by artisans with decades of experience." },
    { title: "Global Delivery", desc: "Insured shipping worldwide with elegant gift packaging." },
  ]);

  const loadFeatures = () => {
    const sections = getHomepageSections();
    if (sections.features && sections.features.length > 0) {
      setFeatures(
        sections.features.map((f) => ({
          title: locale === "en" ? f.titleEn : f.titleZh,
          desc: locale === "en" ? f.descEn : f.descZh,
        }))
      );
    }
  };

  useEffect(() => {
    loadFeatures();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadFeatures();
    });
  }, [locale]);

  const icons = [
    (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <rect x="8" y="12" width="48" height="40" rx="2" />
        <line x1="8" y1="24" x2="56" y2="24" />
        <line x1="8" y1="40" x2="56" y2="40" />
        <line x1="24" y1="24" x2="24" y2="40" />
        <line x1="40" y1="24" x2="40" y2="40" />
      </svg>
    ),
    (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <path d="M32 8L8 20v24l24 12 24-12V20L32 8z" />
        <path d="M32 32V16" />
        <path d="M32 32l16-8" />
        <path d="M32 32l-16-8" />
      </svg>
    ),
    (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <rect x="12" y="8" width="40" height="48" rx="2" />
        <circle cx="32" cy="28" r="8" />
        <path d="M24 44h16" />
      </svg>
    ),
    (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <rect x="8" y="16" width="48" height="32" rx="2" />
        <path d="M20 16v-4a12 12 0 0124 0v4" />
        <circle cx="32" cy="32" r="4" />
        <path d="M32 36v4" />
      </svg>
    ),
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-black/5 p-8 text-center hover:shadow-lg hover:border-champagne/20 transition-all duration-300 bg-cream/50"
            >
              <div className="inline-flex items-center justify-center mb-5 text-charcoal/80">
                {icons[i]}
              </div>
              <h3 className="text-base font-medium text-charcoal mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/50 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

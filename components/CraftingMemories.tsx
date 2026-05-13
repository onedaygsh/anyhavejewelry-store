"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function CraftingMemories() {
  const { t, locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [steps, setSteps] = useState([
    { num: "(1)", title: "DESIGN", desc: "Share your vision with our designers. We create detailed sketches and 3D previews tailored to your preferences and budget.", image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&h=600&fit=crop" },
    { num: "(2)", title: "CRAFT", desc: "Master artisans handcraft your piece using traditional techniques and modern precision. Every stone is carefully set by hand.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop" },
    { num: "(3)", title: "ENJOY", desc: "Your jewelry arrives in premium packaging, ready to become part of your most cherished moments. A symbol that lasts forever.", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop" },
  ]);

  const loadSteps = () => {
    const sections = getHomepageSections();
    if (sections.craftingMemories?.steps) {
      setSteps(
        sections.craftingMemories.steps.map((step, i) => ({
          num: `(${i + 1})`,
          title: locale === "en" ? step.titleEn : step.titleZh,
          desc: locale === "en" ? step.descEn : step.descZh,
          image: step.image,
        }))
      );
    }
  };

  useEffect(() => {
    loadSteps();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadSteps();
    });
  }, [locale]);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4"
        >
          {t.home.craftingMemories.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm text-charcoal/50 text-center mb-16 max-w-md mx-auto"
        >
          {t.home.craftingMemories.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="aspect-[4/3] bg-white rounded-sm overflow-hidden mb-6 border border-black/5">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm font-medium text-charcoal tracking-wide mb-2">
                {step.num} {step.title}
              </h3>
              <p className="text-sm text-charcoal/50 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

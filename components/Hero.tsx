"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getPageContent, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { useI18n } from "@/lib/i18n/context";

export default function Hero() {
  const { t, locale } = useI18n();
  const [hero, setHero] = useState<{
    title: string; subtitle: string; cta: string; image: string; cta2: string;
  }>({
    title: locale === "en" ? "Jewelry That Tells\nYour Story" : "讲述您的\n珠宝故事",
    subtitle: locale === "en"
      ? "Custom engraved necklaces, rings & bracelets. Handcrafted with care, shipped worldwide. Ethically sourced moissanite & lab-grown diamonds."
      : "定制刻字项链、戒指和手镯。精心手工制作，全球配送。道德采购的莫桑石和培育钻石。",
    cta: locale === "en" ? "START CUSTOMIZING" : "开始定制",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=1200&fit=crop",
    cta2: locale === "en" ? "SHOP COLLECTION" : "浏览系列",
  });

  const loadHero = () => {
    const defaultTitle = locale === "en" ? "Jewelry That Tells\nYour Story" : "讲述您的\n珠宝故事";
    const defaultSubtitle = locale === "en"
      ? "Custom engraved necklaces, rings & bracelets. Handcrafted with care, shipped worldwide. Ethically sourced moissanite & lab-grown diamonds."
      : "定制刻字项链、戒指和手镯。精心手工制作，全球配送。道德采购的莫桑石和培育钻石。";
    const content = getPageContent({
      heroTitle: defaultTitle,
      heroSubtitle: defaultSubtitle,
      heroCta: locale === "en" ? "START CUSTOMIZING" : "开始定制",
      heroImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=1200&fit=crop",
      heroCta2En: "SHOP COLLECTION",
      heroCta2Zh: "浏览系列",
      collections: [],
      inspirePosts: [],
    });
    setHero({
      title: content.heroTitle || defaultTitle,
      subtitle: content.heroSubtitle || defaultSubtitle,
      cta: content.heroCta || (locale === "en" ? "START CUSTOMIZING" : "开始定制"),
      image: content.heroImage || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=1200&fit=crop",
      cta2: locale === "en" ? (content.heroCta2En || "SHOP COLLECTION") : (content.heroCta2Zh || "浏览系列"),
    });
  };

  useEffect(() => {
    loadHero();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.pageContent) loadHero();
    });
  }, [locale]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt={t.hero.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.3em] uppercase text-white/70 mb-6"
        >
          {locale === "en" ? "Handcrafted Custom Jewelry" : "手工定制珠宝"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight mb-6 whitespace-pre-line"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/80 text-lg md:text-xl mb-10 tracking-wide max-w-lg mx-auto"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/design-your-own/"
            className="inline-block px-10 py-4 bg-white text-charcoal text-sm tracking-[0.2em] font-medium hover:bg-cream transition-all duration-300"
          >
            {hero.cta}
          </Link>
          <Link
            href="/products/"
            className="inline-block px-10 py-4 border border-white/60 text-white text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-charcoal transition-all duration-300"
          >
            {hero.cta2}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}

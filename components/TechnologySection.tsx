"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Wand2, Eye, Sparkles, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

const iconMap: Record<string, React.ReactNode> = {
  "AI-Powered Design": <Wand2 className="w-5 h-5" />,
  "AI 驱动设计": <Wand2 className="w-5 h-5" />,
  "True-to-Life Preview": <Eye className="w-5 h-5" />,
  "逼真预览": <Eye className="w-5 h-5" />,
  "Precision Crafting": <Sparkles className="w-5 h-5" />,
  "精密工艺": <Sparkles className="w-5 h-5" />,
};

export default function TechnologySection() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [data, setData] = useState({
    label: "Try Our Tech",
    title: "Design the Future\nof Jewelry",
    desc: "Anyhave merges cutting-edge technology with timeless craftsmanship. Our digital tools let you co-create your piece, while our master artisans bring it to life with decades of expertise.",
    badge: "TECHNOLOGY MEETS ART",
    btn: "EXPLORE CUSTOMIZATION",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=1000&fit=crop",
    features: [
      { title: "AI-Powered Design", desc: "Our intelligent system helps you visualize combinations in real time. Mix stones, metals, and settings with instant feedback." },
      { title: "True-to-Life Preview", desc: "See exactly how your ring will look before it is crafted. Accurate proportions, realistic sparkle, and true colors." },
      { title: "Precision Crafting", desc: "Every design is translated into a master craftsman's blueprint. Technology guides the hand, tradition guides the heart." },
    ],
  });

  const loadData = () => {
    const sections = getHomepageSections();
    const tech = sections.technologySection;
    setData({
      label: locale === "en" ? tech.labelEn : tech.labelZh,
      title: locale === "en" ? tech.titleEn : tech.titleZh,
      desc: locale === "en" ? tech.descEn : tech.descZh,
      badge: locale === "en" ? tech.badgeEn : tech.badgeZh,
      btn: locale === "en" ? tech.btnEn : tech.btnZh,
      image: tech.image,
      features: tech.features.map((f) => ({
        title: locale === "en" ? f.titleEn : f.titleZh,
        desc: locale === "en" ? f.descEn : f.descZh,
      })),
    });
  };

  useEffect(() => {
    loadData();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadData();
    });
  }, [locale]);

  return (
    <section className="bg-charcoal py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] bg-white/5 overflow-hidden rounded-sm"
          >
            <img
              src={data.image}
              alt="Technology Driven Jewelry"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur px-4 py-3 border border-white/10 inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne" />
                <span className="text-xs tracking-widest uppercase text-white/70">
                  {data.badge}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              {data.label}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight whitespace-pre-line">
              {data.title}
            </h2>
            <p className="text-white/60 max-w-md leading-relaxed mb-10">
              {data.desc}
            </p>

            <div className="space-y-6 mb-10">
              {data.features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-champagne">
                    {iconMap[item.title] || <Sparkles className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/customize/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-charcoal text-sm tracking-widest font-medium hover:bg-cream transition-colors"
            >
              {data.btn}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

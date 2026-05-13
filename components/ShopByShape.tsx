"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function ShopByShape() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [shapes, setShapes] = useState([
    { name: "Round", nameZh: "圆形", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop" },
    { name: "Oval", nameZh: "椭圆形", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop" },
    { name: "Radiant", nameZh: "雷迪恩", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop" },
    { name: "Pear", nameZh: "梨形", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" },
    { name: "Emerald", nameZh: "祖母绿", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop" },
    { name: "Cushion", nameZh: "枕形", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop" },
  ]);

  const loadShapes = () => {
    const sections = getHomepageSections();
    if (sections.shopByShape && sections.shopByShape.length > 0) {
      setShapes(sections.shopByShape.map((s) => ({ name: s.nameEn, nameZh: s.nameZh, image: s.image })));
    }
  };

  useEffect(() => {
    loadShapes();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadShapes();
    });
  }, []);

  const title = locale === "en" ? "SHOP BY SHAPE" : "按形状选购";
  const subtitle =
    locale === "en"
      ? "Find the perfect diamond cut for your style"
      : "找到适合您风格的完美钻石切工";

  return (
    <section className="bg-white py-16 md:py-20 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3">
            {subtitle}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal tracking-wide">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 md:gap-8">
          {shapes.map((shape, i) => (
            <motion.div
              key={shape.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center group"
            >
              <Link href={`/products/`} className="block">
                <div className="aspect-square bg-stone rounded-full overflow-hidden mb-3 border border-black/5 group-hover:border-champagne/40 transition-all duration-300 relative">
                  <img
                    src={shape.image}
                    alt={shape.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-white/0 transition-colors duration-300" />
                </div>
                <p className="text-xs tracking-widest uppercase text-charcoal/70 group-hover:text-charcoal transition-colors">
                  {locale === "en" ? shape.name : shape.nameZh}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { getPageContent } from "@/lib/admin-data";
import { useI18n } from "@/lib/i18n/context";

const images = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
];

export default function CollectionShowcase() {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const baseCollections = t.home.collectionShowcase.collections.map((c, i) => ({
    ...c,
    image: images[i],
    href: "/customize/",
  }));

  const [collections, setCollections] = useState<{ title: string; desc: string; image: string; href: string }[]>(baseCollections);

  useEffect(() => {
    const content = getPageContent({
      heroTitle: "",
      heroSubtitle: "",
      heroCta: "",
      heroImage: "",
      heroCta2En: "",
      heroCta2Zh: "",
      collections: baseCollections,
      inspirePosts: [],
    });
    if (content.collections && content.collections.length > 0) {
      setCollections(content.collections);
    }
  }, [t]);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-16 tracking-[0.1em]"
        >
          {t.home.collectionShowcase.title}
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {collections.map((item, i) => (
            <motion.div
              key={item.title + i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group"
            >
              <div className="aspect-square bg-cream rounded-sm overflow-hidden mb-6 border border-black/5 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-lg font-medium text-charcoal mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/50 mb-4 max-w-sm">
                {item.desc}
              </p>
              <Link
                href={item.href}
                className="inline-block px-6 py-2.5 border border-champagne text-charcoal text-xs tracking-[0.15em] font-medium hover:bg-champagne hover:text-white transition-all duration-300"
              >
                {t.home.collectionShowcase.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const UGC_ITEMS = [
  { img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop", user: "@sarah.j", caption: "My engagement ring is absolutely stunning!" },
  { img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=500&fit=crop", user: "@emily.r", caption: "Custom name necklace for my mom's birthday" },
  { img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop", user: "@jessica.m", caption: "The craftsmanship is incredible" },
  { img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop", user: "@amanda.k", caption: "Moissanite brilliance rivals any diamond" },
  { img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", user: "@linda.w", caption: "Perfect anniversary gift!" },
  { img: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&h=500&fit=crop", user: "@rachel.t", caption: "Stacking rings from AnyHave" },
];

export default function UgcGallery() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEn = locale === "en";

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
            {isEn ? "Real Customers, Real Stories" : "真实客户，真实故事"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {isEn ? "Share Your #AnyHaveMoment" : "分享您的 #AnyHaveMoment"}
          </h2>
          <p className="text-charcoal/50 max-w-xl mx-auto">
            {isEn
              ? "Tag us on Instagram @anyhavejewelry for a chance to be featured and receive exclusive rewards."
              : "在 Instagram 上标记 @anyhavejewelry，有机会被展示并获得专属奖励。"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {UGC_ITEMS.map((item, i) => (
            <motion.div
              key={item.user}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative overflow-hidden cursor-pointer ${
                i === 1 || i === 3 || i === 5 ? "row-span-1" : ""
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={item.img}
                  alt={item.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                    <Instagram className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs text-white/80 italic">&quot;{item.caption}&quot;</p>
                    <p className="text-[10px] text-white/60 mt-1">{item.user}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

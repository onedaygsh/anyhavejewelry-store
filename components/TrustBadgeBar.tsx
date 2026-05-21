"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Award, Clock, CreditCard } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function TrustBadgeBar() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  const badges = [
    {
      icon: ShieldCheck,
      label: isEn ? "Conflict Free" : "无冲突矿产",
      sub: isEn ? "Ethically Sourced" : "道德采购",
    },
    {
      icon: Award,
      label: isEn ? "IGI Certified" : "IGI 认证",
      sub: isEn ? "Lab-Grown Diamonds" : "培育钻石",
    },
    {
      icon: Truck,
      label: isEn ? "Free Shipping" : "免费配送",
      sub: isEn ? "Orders over $75" : "满 $75 免邮",
    },
    {
      icon: RotateCcw,
      label: isEn ? "60-Day Returns" : "60 天退换",
      sub: isEn ? "Hassle Free" : "无忧退换",
    },
    {
      icon: Clock,
      label: isEn ? "5-7 Day Craft" : "5-7 天制作",
      sub: isEn ? "Handmade to Order" : "手工定制",
    },
    {
      icon: CreditCard,
      label: isEn ? "Secure Checkout" : "安全支付",
      sub: isEn ? "SSL Encrypted" : "SSL 加密",
    },
  ];

  return (
    <section className="bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <badge.icon className="w-4 h-4 text-champagne" />
              <div className="hidden sm:block">
                <p className="text-[11px] font-medium text-charcoal tracking-wide">{badge.label}</p>
                <p className="text-[10px] text-charcoal/40">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

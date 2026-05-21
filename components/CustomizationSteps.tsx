"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Pen, Eye, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import Link from "next/link";

export default function CustomizationSteps() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEn = locale === "en";

  const steps = [
    {
      num: "01",
      icon: Pen,
      title: isEn ? "Choose & Personalize" : "选择并个性化",
      desc: isEn
        ? "Pick your design and add engraving, birthstones, or custom metal. Every detail is yours to decide."
        : "挑选设计并添加刻字、生辰石或定制金属。每个细节由您决定。",
    },
    {
      num: "02",
      icon: Eye,
      title: isEn ? "Preview Your Design" : "预览您的设计",
      desc: isEn
        ? "See a real-time preview of your custom piece before we craft it. Adjust until it is perfect."
        : "在制作前实时预览您的定制作品。调整到完美为止。",
    },
    {
      num: "03",
      icon: Truck,
      title: isEn ? "We Handcraft & Ship" : "手工制作并发货",
      desc: isEn
        ? "Our artisans handcraft your jewelry in 5-7 business days. Insured global shipping with tracking."
        : "工匠在 5-7 个工作日内手工制作您的珠宝。全球包邮，可追踪。",
    },
  ];

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
            {isEn ? "How It Works" : "定制流程"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {isEn ? "Create Your Story in 3 Steps" : "三步打造您的故事"}
          </h2>
          <p className="text-charcoal/50 max-w-xl mx-auto">
            {isEn
              ? "From idea to heirloom. Every piece is handcrafted in our studio with care and precision."
              : "从灵感到传家宝。每件作品都在我们的工坊中精心手工制作。"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector lines on desktop */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[1px] bg-black/10" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border border-black/5 shadow-sm mb-6 relative z-10">
                <step.icon className="w-8 h-8 text-champagne" />
              </div>
              <span className="text-[10px] text-charcoal/30 font-mono tracking-widest block mb-2">
                STEP {step.num}
              </span>
              <h3 className="text-base font-medium text-charcoal mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-charcoal/50 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/customize/"
            className="inline-block px-10 py-4 bg-charcoal text-white text-sm tracking-[0.2em] font-medium hover:bg-graphite transition-colors"
          >
            {isEn ? "START CUSTOMIZING" : "开始定制"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

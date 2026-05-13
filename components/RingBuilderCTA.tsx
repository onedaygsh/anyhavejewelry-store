"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function RingBuilderCTA() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [data, setData] = useState({
    title: "Ring",
    desc: "Choose a unique ring setting and then select the perfect central stone — or vice versa! It is really up to you!",
    btn1: "START WITH A SETTING",
    btn2: "START WITH A DIAMOND",
    quiz: "Take Our Quiz",
    quizDesc: "Can not decide? ",
    quizDesc2: " find what you are looking for in 2 minutes",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
  });

  const loadData = () => {
    const sections = getHomepageSections();
    const cta = sections.ringBuilderCTA;
    setData({
      title: locale === "en" ? cta.titleEn : cta.titleZh,
      desc: locale === "en" ? cta.descEn : cta.descZh,
      btn1: locale === "en" ? cta.btn1En : cta.btn1Zh,
      btn2: locale === "en" ? cta.btn2En : cta.btn2Zh,
      quiz: locale === "en" ? cta.quizEn : cta.quizZh,
      quizDesc: locale === "en" ? cta.quizDescEn : cta.quizDescZh,
      quizDesc2: locale === "en" ? cta.quizDesc2En : cta.quizDesc2Zh,
      image: cta.image,
    });
  };

  useEffect(() => {
    loadData();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadData();
    });
  }, [locale]);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
              {data.title}
            </h2>
            <p className="text-charcoal/60 text-lg leading-relaxed mb-8 max-w-md">
              {data.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/design-your-own/"
                className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-white text-sm tracking-[0.15em] font-medium hover:bg-graphite transition-colors"
              >
                {data.btn1}
              </Link>
              <Link
                href="/products/"
                className="inline-flex items-center justify-center px-8 py-4 border border-charcoal text-charcoal text-sm tracking-[0.15em] font-medium hover:bg-charcoal hover:text-white transition-colors"
              >
                {data.btn2}
              </Link>
            </div>

            <p className="text-sm text-charcoal/50">
              {data.quizDesc}
              <Link href="/contact/" className="text-charcoal underline underline-offset-4 hover:text-champagne transition-colors">
                {data.quiz}
              </Link>
              {data.quizDesc2}
            </p>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative aspect-square bg-charcoal overflow-hidden rounded-sm"
          >
            <img
              src={data.image}
              alt="Diamond"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

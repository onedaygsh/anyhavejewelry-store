"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  Shield,
  Eye,
  Scale,
  Leaf,
  Award,
  Hammer,
  PackageCheck,
  Truck,
  Factory,
  Gem,
  TrendingUp,
} from "lucide-react";
import { getAboutContent, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh";

  const [content, setContent] = useState(getAboutContent());

  const loadContent = () => {
    setContent(getAboutContent());
  };

  useEffect(() => {
    loadContent();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.aboutContent) loadContent();
    });
  }, [locale]);

  const storyDesc = isZh ? content.storyDescZh : content.storyDescEn;
  const howItStarted = [
    isZh ? content.howItStartedP1Zh : content.howItStartedP1En,
    isZh ? content.howItStartedP2Zh : content.howItStartedP2En,
    isZh ? content.howItStartedP3Zh : content.howItStartedP3En,
  ];
  const sustainability = [
    isZh ? content.sustainabilityP1Zh : content.sustainabilityP1En,
    isZh ? content.sustainabilityP2Zh : content.sustainabilityP2En,
    isZh ? content.sustainabilityP3Zh : content.sustainabilityP3En,
  ];
  const ctaTitle = isZh ? content.ctaTitleZh : content.ctaTitleEn;
  const ctaDesc = isZh ? content.ctaDescZh : content.ctaDescEn;
  const ctaDesign = isZh ? content.ctaDesignZh : content.ctaDesignEn;
  const ctaExplore = isZh ? content.ctaExploreZh : content.ctaExploreEn;

  const collections = content.collections.map((c) => ({
    title: isZh ? c.titleZh : c.titleEn,
    subtitle: isZh ? c.subtitleZh : c.subtitleEn,
    desc: isZh ? c.descZh : c.descEn,
    image: c.image,
  }));

  const processSteps = content.processSteps.map((s) => ({
    title: isZh ? s.titleZh : s.titleEn,
    desc: isZh ? s.descZh : s.descEn,
  }));

  const values = content.values.map((v) => ({
    title: isZh ? v.titleZh : v.titleEn,
    desc: isZh ? v.descZh : v.descEn,
  }));

  const stats = content.stats.map((s) => ({
    num: s.num,
    label: isZh ? s.labelZh : s.labelEn,
  }));

  const valuesIcons = [Eye, Scale, Hammer, Leaf];
  const processIcons = [Eye, Hammer, Factory, Shield, PackageCheck, Truck];

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero / Mission */}
        <AnimatedSection className="text-center mb-24 md:mb-32">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-6">
            {t.about.storyLabel}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mb-8 leading-tight whitespace-pre-line">
            {t.about.title}
          </h1>
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed text-lg">
            {storyDesc}
          </p>
        </AnimatedSection>

        {/* Origin Story */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
              {t.about.howItStartedLabel}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              {t.about.howItStartedTitle}
            </h2>
            <div className="space-y-5 text-charcoal/60 leading-relaxed">
              {howItStarted.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="aspect-[4/5] bg-stone overflow-hidden">
            <img
              src={content.originImage}
              alt={t.about.altFactory}
              className="w-full h-full object-cover"
            />
          </AnimatedSection>
        </div>

        {/* Stats Banner */}
        <AnimatedSection className="bg-white border border-black/5 p-10 md:p-16 mb-24 md:mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-serif text-charcoal mb-1">{stat.num}</p>
                <p className="text-xs text-charcoal/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Main Categories */}
        <AnimatedSection className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
              {t.about.productsLabel}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t.about.productsTitle}
            </h2>
            <p className="text-charcoal/50 max-w-xl mx-auto">
              {t.about.productsDesc}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((collection, i) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white border border-black/5 overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-champagne mb-2">
                    {collection.subtitle}
                  </p>
                  <h3 className="font-serif text-xl text-charcoal mb-3">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-charcoal/50 leading-relaxed">
                    {collection.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Craftsmanship Process */}
        <AnimatedSection className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
              {t.about.craftsmanshipLabel}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t.about.craftsmanshipTitle}
            </h2>
            <p className="text-charcoal/50 max-w-xl mx-auto">
              {t.about.craftsmanshipDesc}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => {
              const StepIcon = processIcons[i];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-8 border border-black/5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center">
                      <StepIcon className="w-4 h-4 text-charcoal/70" />
                    </div>
                    <span className="text-xs text-charcoal/30 font-mono">0{i + 1}</span>
                  </div>
                  <h3 className="text-base font-medium text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-charcoal/50 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Sustainability */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          <AnimatedSection className="aspect-[4/3] bg-stone overflow-hidden">
            <img
              src={content.sustainabilityImage}
              alt={t.about.altSustainability}
              className="w-full h-full object-cover"
            />
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
              {t.about.sustainabilityLabel}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              {t.about.sustainabilityTitle}
            </h2>
            <div className="space-y-5 text-charcoal/60 leading-relaxed">
              {sustainability.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Values Grid */}
        <AnimatedSection className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
              {t.about.valuesLabel}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {t.about.valuesTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const ValueIcon = valuesIcons[i];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-8 border border-black/5 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-dark mb-4">
                    <ValueIcon className="w-5 h-5 text-charcoal/70" />
                  </div>
                  <h3 className="text-base font-medium text-charcoal mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-charcoal/50 leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection className="bg-white p-10 md:p-16 border border-black/5 text-center mb-24 md:mb-32">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-6">
            {t.about.certificationsLabel}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
            {t.about.certificationsTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, label: "IGI Certified" },
              { icon: Shield, label: "Conflict Free" },
              { icon: Gem, label: "GIA Graded" },
              { icon: TrendingUp, label: "Ethically Sourced" },
            ].map((cert) => (
              <div key={cert.label} className="border border-black/5 p-6 bg-cream/50">
                <cert.icon className="w-6 h-6 text-charcoal/70 mx-auto mb-2" />
                <p className="text-xs text-charcoal/60">{cert.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Closing CTA */}
        <AnimatedSection className="bg-white p-10 md:p-16 border border-black/5 text-center">
          <Award className="w-8 h-8 text-champagne mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            {ctaTitle}
          </h2>
          <p className="text-charcoal/60 max-w-lg mx-auto mb-8">
            {ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/customize/"
              className="inline-block px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
            >
              {ctaDesign}
            </a>
            <a
              href="/products/"
              className="inline-block px-8 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors"
            >
              {ctaExplore}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TreePine, Layers, FlaskConical } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface TierItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  palette: string;
  textColor: string;
  bgColor: string;
  accent: string;
  features: readonly string[];
}

export default function TierShowcase() {
  const { t } = useI18n();

  const tiers = [
    {
      id: "natural",
      icon: TreePine,
      title: t.tiers.natural.title,
      subtitle: t.tiers.natural.subtitle,
      tagline: t.tiers.natural.tagline,
      description: t.tiers.natural.desc,
      palette: "from-stone to-white",
      textColor: "text-obsidian",
      bgColor: "bg-stone",
      accent: "bg-warm-gold",
      features: t.tiers.natural.features,
    },
    {
      id: "moissanite",
      icon: Layers,
      title: t.tiers.moissanite.title,
      subtitle: t.tiers.moissanite.subtitle,
      tagline: t.tiers.moissanite.tagline,
      description: t.tiers.moissanite.desc,
      palette: "from-white to-stone",
      textColor: "text-obsidian",
      bgColor: "bg-white",
      accent: "bg-cool-silver",
      features: t.tiers.moissanite.features,
    },
    {
      id: "lab",
      icon: FlaskConical,
      title: t.tiers.lab.title,
      subtitle: t.tiers.lab.subtitle,
      tagline: t.tiers.lab.tagline,
      description: t.tiers.lab.desc,
      palette: "from-graphite to-obsidian",
      textColor: "text-white",
      bgColor: "bg-graphite",
      accent: "bg-white",
      features: t.tiers.lab.features,
    },
  ];

  return (
    <section id="tiers" className="relative">
      <div className="bg-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-obsidian/40 mb-4">{t.tiers.sectionLabel}</p>
        <h2 className="font-serif text-4xl md:text-5xl text-obsidian">{t.tiers.sectionTitle}</h2>
        <div className="w-12 h-[1px] bg-warm-gold mx-auto mt-6" />
      </div>

      {tiers.map((tier, i) => (
        <TierCard key={tier.id} tier={tier} index={i} />
      ))}
    </section>
  );
}

function TierCard({ tier, index }: { tier: TierItem; index: number }) {
  const ref = useRef(null);
  const { t } = useI18n();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = tier.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`${tier.bgColor} ${tier.textColor} relative overflow-hidden group`}
    >
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 ${tier.accent} rounded-full flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${tier.id === "natural" ? "text-white" : tier.id === "moissanite" ? "text-white" : "text-obsidian"}`} />
            </div>
            <span className="text-xs tracking-[0.25em] uppercase opacity-60">{tier.subtitle}</span>
          </div>

          <h3 className="font-serif text-4xl md:text-5xl mb-4">{tier.title}</h3>
          <p className="text-lg opacity-70 mb-6 font-light tracking-wide">{tier.tagline}</p>
          <p className="text-base leading-relaxed opacity-60 mb-8 max-w-md">{tier.description}</p>

          <div className="flex flex-wrap gap-3">
            {tier.features.map((f) => (
              <span
                key={f}
                className={`px-4 py-2 text-xs tracking-wider border ${
                  tier.id === "moissanite" ? "border-obsidian/10" : "border-white/10"
                } rounded-full`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Placeholder */}
        <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
          <div
            className={`aspect-square w-full max-w-md mx-auto relative overflow-hidden ${
              tier.id === "natural"
                ? "bg-gradient-to-br from-obsidian to-graphite"
                : tier.id === "moissanite"
                ? "bg-gradient-to-br from-silver-mirror to-white border border-black/5"
                : "bg-gradient-to-br from-obsidian to-graphite"
            }`}
          >
            {/* Abstract material patterns */}
            <div className="absolute inset-0 flex items-center justify-center">
              {tier.id === "moissanite" ? (
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/40 via-purple-200/40 to-amber-200/40 blur-2xl animate-pulse" />
                  <div className="absolute inset-4 border border-black/10 rotate-45" />
                  <div className="absolute inset-8 border border-black/10 -rotate-12" />
                  <div className="absolute inset-12 bg-gradient-to-br from-white via-silver-mirror to-cool-silver opacity-80" />
                </div>
              ) : tier.id === "natural" ? (
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-warm-gold/10 blur-3xl" />
                  <div className="absolute inset-8 bg-gradient-to-br from-emerald-900/40 via-obsidian to-amber-900/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-warm-gold/20 blur-xl" />
                </div>
              ) : (
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-blue-200/10 blur-3xl" />
                  <div className="absolute inset-10 bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="absolute inset-0 border border-white/10 rounded-full" />
                </div>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className={`text-xs tracking-widest uppercase ${tier.id === "moissanite" ? "text-obsidian/40" : "text-white/40"}`}>
                {t.tiers.aiPlaceholder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

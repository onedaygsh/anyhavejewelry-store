"use client";

import { ShieldCheck, Leaf, Recycle, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function ComplianceBadge() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  const items = [
    {
      icon: ShieldCheck,
      label: isEn ? "EU REACH Compliant" : "符合欧盟 REACH",
      desc: isEn ? "Nickel-free, lead-free, cadmium-free" : "无镍、无铅、无镉",
    },
    {
      icon: Leaf,
      label: isEn ? "California Prop 65 Safe" : "加州 Prop 65 安全",
      desc: isEn ? "No harmful chemicals detected" : "未检出有害化学物质",
    },
    {
      icon: Recycle,
      label: isEn ? "Sustainable Packaging" : "可持续包装",
      desc: isEn ? "Recyclable materials, minimal waste" : "可回收材料，最小化浪费",
    },
    {
      icon: Award,
      label: isEn ? "IGI / GRA Certified" : "IGI / GRA 认证",
      desc: isEn ? "Every gemstone authenticated" : "每颗宝石均有认证",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-6 p-4 bg-cream/50 border border-black/5">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-2">
          <item.icon className="w-4 h-4 text-champagne flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-medium text-charcoal">{item.label}</p>
            <p className="text-[10px] text-charcoal/40">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

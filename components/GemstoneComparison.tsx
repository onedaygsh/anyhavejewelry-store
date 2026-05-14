"use client";

import { useState, useEffect } from "react";
import { Check, X, Shield } from "lucide-react";
import {
  getComparisonData,
  subscribeToAdminData,
  ComparisonData,
  ADMIN_KEYS,
} from "@/lib/admin-data";
import { useI18n } from "@/lib/i18n/context";

export default function GemstoneComparison() {
  const { locale } = useI18n();
  const [data, setData] = useState<ComparisonData | null>(null);

  useEffect(() => {
    setData(getComparisonData());
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.comparison) {
        setData(getComparisonData());
      }
    });
  }, []);

  if (!data) return null;

  const isZh = locale === "zh";

  const renderCell = (value: string) => {
    const lower = value.trim().toLowerCase();
    if (lower === "yes" || lower === "是" || lower === "true") {
      return <Check className="w-4 h-4 text-green-600 mx-auto" />;
    }
    if (lower === "no" || lower === "否" || lower === "false") {
      return <X className="w-4 h-4 text-red-400 mx-auto" />;
    }
    return <span className="text-sm text-charcoal/70">{value}</span>;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
            {isZh ? data.labelZh : data.labelEn}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {isZh ? data.titleZh : data.titleEn}
          </h2>
          <p className="text-charcoal/50 max-w-2xl mx-auto">
            {isZh ? data.subtitleZh : data.subtitleEn}
          </p>
        </div>

        {/* Certification Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {data.badges.map((badge) => (
            <div
              key={badge.name}
              className="flex items-center gap-3 bg-cream/60 border border-champagne/20 rounded-lg px-5 py-3"
            >
              <Shield className="w-5 h-5 text-champagne" />
              <div>
                <p className="text-sm font-medium text-charcoal">{badge.name}</p>
                <p className="text-xs text-charcoal/50 max-w-[220px]">
                  {isZh ? badge.descriptionZh : badge.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-black/5">
            <thead>
              <tr className="bg-cream/50">
                <th className="px-4 py-3 text-left text-xs text-charcoal/50 font-medium">
                  {isZh ? "属性" : "Property"}
                </th>
                <th className="px-4 py-3 text-center text-xs text-charcoal font-medium bg-champagne/10">
                  {isZh ? "莫桑石" : "Moissanite"}
                </th>
                <th className="px-4 py-3 text-center text-xs text-charcoal font-medium">
                  {isZh ? "培育钻石" : "Lab-Grown Diamond"}
                </th>
                <th className="px-4 py-3 text-center text-xs text-charcoal font-medium">
                  {isZh ? "天然钻石" : "Natural Diamond"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {data.rows.map((row, i) => (
                <tr key={i} className="hover:bg-cream/20 transition-colors">
                  <td className="px-4 py-3 text-charcoal/70 font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-center bg-champagne/5">
                    {renderCell(row.moissanite)}
                  </td>
                  <td className="px-4 py-3 text-center">{renderCell(row.lab)}</td>
                  <td className="px-4 py-3 text-center">{renderCell(row.natural)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-charcoal/40">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-600" /> {isZh ? "是 / 优秀" : "Yes / Superior"}
          </span>
          <span className="flex items-center gap-1">
            <X className="w-3 h-3 text-red-400" /> {isZh ? "否 / 较差" : "No / Inferior"}
          </span>
          <span>{isZh ? data.footerTextZh : data.footerTextEn}</span>
        </div>
      </div>
    </section>
  );
}

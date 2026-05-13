"use client";

import { Check, X, Minus } from "lucide-react";

export default function GemstoneComparison() {
  const rows = [
    { label: "Brilliance (Refractive Index)", moissanite: "2.65 (Highest)", lab: "2.42", natural: "2.42" },
    { label: "Fire (Dispersion)", moissanite: "0.104 (2.4x diamond)", lab: "0.044", natural: "0.044" },
    { label: "Hardness (Mohs Scale)", moissanite: "9.25", lab: "10", natural: "10" },
    { label: "Price per Carat", moissanite: "~¥2,980", lab: "~¥5,280", natural: "~¥15,000+" },
    { label: "Conflict Free", moissanite: true, lab: true, natural: false },
    { label: "Environmentally Friendly", moissanite: true, lab: true, natural: false },
    { label: "Certification", moissanite: "IGI / GRA", lab: "IGI / GIA", natural: "GIA / IGI" },
    { label: "Color Range", moissanite: "D-E (Colorless)", lab: "D-F (Colorless)", natural: "D-Z (Varies)" },
    { label: "Availability", moissanite: "Unlimited", lab: "Unlimited", natural: "Limited / Rare" },
    { label: "Resale Value", moissanite: "Moderate", lab: "Growing", natural: "High (traditionally)" },
  ];

  const renderCell = (value: string | boolean) => {
    if (value === true) return <Check className="w-4 h-4 text-green-600 mx-auto" />;
    if (value === false) return <X className="w-4 h-4 text-red-400 mx-auto" />;
    return <span className="text-sm text-charcoal/70">{value}</span>;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">Expert Comparison</p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            Moissanite vs. Lab-Grown vs. Natural Diamond
          </h2>
          <p className="text-charcoal/50 max-w-2xl mx-auto">
            An objective, data-driven comparison to help you make an informed decision. All metrics verified by independent gemological institutes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-black/5">
            <thead>
              <tr className="bg-cream/50">
                <th className="px-4 py-3 text-left text-xs text-charcoal/50 font-medium">Property</th>
                <th className="px-4 py-3 text-center text-xs text-charcoal font-medium bg-champagne/10">Moissanite</th>
                <th className="px-4 py-3 text-center text-xs text-charcoal font-medium">Lab-Grown Diamond</th>
                <th className="px-4 py-3 text-center text-xs text-charcoal font-medium">Natural Diamond</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-cream/20 transition-colors">
                  <td className="px-4 py-3 text-charcoal/70 font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-center bg-champagne/5">{renderCell(row.moissanite)}</td>
                  <td className="px-4 py-3 text-center">{renderCell(row.lab)}</td>
                  <td className="px-4 py-3 text-center">{renderCell(row.natural)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-charcoal/40">
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Yes / Superior</span>
          <span className="flex items-center gap-1"><X className="w-3 h-3 text-red-400" /> No / Inferior</span>
          <span>Data source: IGI, GIA, GRA certification standards (2025)</span>
        </div>
      </div>
    </section>
  );
}

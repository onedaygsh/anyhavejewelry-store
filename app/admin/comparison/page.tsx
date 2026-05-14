"use client";

import { useState, useEffect } from "react";
import {
  ComparisonData,
  defaultComparisonData,
  getComparisonData,
  saveComparisonData,
} from "@/lib/admin-data";
import { X, Plus, Save } from "lucide-react";

export default function AdminComparisonPage() {
  const [data, setData] = useState<ComparisonData>(defaultComparisonData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(getComparisonData());
  }, []);

  const handleSave = () => {
    saveComparisonData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = <K extends keyof ComparisonData>(
    field: K,
    value: ComparisonData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateRow = (
    index: number,
    field: keyof ComparisonData["rows"][0],
    value: string
  ) => {
    setData((prev) => {
      const rows = [...prev.rows];
      rows[index] = { ...rows[index], [field]: value };
      return { ...prev, rows };
    });
  };

  const addRow = () => {
    setData((prev) => ({
      ...prev,
      rows: [
        ...prev.rows,
        { label: "New Property", moissanite: "", lab: "", natural: "" },
      ],
    }));
  };

  const removeRow = (index: number) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== index),
    }));
  };

  const updateBadge = (
    index: number,
    field: keyof ComparisonData["badges"][0],
    value: string
  ) => {
    setData((prev) => {
      const badges = [...prev.badges];
      badges[index] = { ...badges[index], [field]: value };
      return { ...prev, badges };
    });
  };

  const addBadge = () => {
    setData((prev) => ({
      ...prev,
      badges: [
        ...prev.badges,
        { name: "New Badge", descriptionEn: "", descriptionZh: "" },
      ],
    }));
  };

  const removeBadge = (index: number) => {
    setData((prev) => ({
      ...prev,
      badges: prev.badges.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">
          Gemstone Comparison
        </h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Header Texts */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Header Texts</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Label (EN)
              </label>
              <input
                value={data.labelEn}
                onChange={(e) => updateField("labelEn", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Label (ZH)
              </label>
              <input
                value={data.labelZh}
                onChange={(e) => updateField("labelZh", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Title (EN)
              </label>
              <input
                value={data.titleEn}
                onChange={(e) => updateField("titleEn", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Title (ZH)
              </label>
              <input
                value={data.titleZh}
                onChange={(e) => updateField("titleZh", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Subtitle (EN)
              </label>
              <textarea
                rows={2}
                value={data.subtitleEn}
                onChange={(e) => updateField("subtitleEn", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Subtitle (ZH)
              </label>
              <textarea
                rows={2}
                value={data.subtitleZh}
                onChange={(e) => updateField("subtitleZh", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certification Badges */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="font-medium text-charcoal">Certification Badges</h2>
          <button
            onClick={addBadge}
            className="flex items-center gap-1 text-xs text-champagne hover:underline"
          >
            <Plus className="w-3 h-3" />
            Add Badge
          </button>
        </div>
        <div className="divide-y divide-black/5">
          {data.badges.map((badge, i) => (
            <div key={i} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-charcoal">
                  Badge {i + 1}
                </h3>
                <button
                  onClick={() => removeBadge(i)}
                  className="p-1 text-charcoal/30 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-1">
                  Name
                </label>
                <input
                  value={badge.name}
                  onChange={(e) => updateBadge(i, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Description (EN)
                  </label>
                  <textarea
                    rows={2}
                    value={badge.descriptionEn}
                    onChange={(e) =>
                      updateBadge(i, "descriptionEn", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Description (ZH)
                  </label>
                  <textarea
                    rows={2}
                    value={badge.descriptionZh}
                    onChange={(e) =>
                      updateBadge(i, "descriptionZh", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Rows */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="font-medium text-charcoal">Comparison Rows</h2>
          <button
            onClick={addRow}
            className="flex items-center gap-1 text-xs text-champagne hover:underline"
          >
            <Plus className="w-3 h-3" />
            Add Row
          </button>
        </div>
        <div className="divide-y divide-black/5">
          {data.rows.map((row, i) => (
            <div key={i} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-charcoal">
                  Row {i + 1}
                </h3>
                <button
                  onClick={() => removeRow(i)}
                  className="p-1 text-charcoal/30 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-1">
                  Property Label
                </label>
                <input
                  value={row.label}
                  onChange={(e) => updateRow(i, "label", e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Moissanite
                  </label>
                  <input
                    value={row.moissanite}
                    onChange={(e) =>
                      updateRow(i, "moissanite", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Lab-Grown
                  </label>
                  <input
                    value={row.lab}
                    onChange={(e) => updateRow(i, "lab", e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Natural
                  </label>
                  <input
                    value={row.natural}
                    onChange={(e) => updateRow(i, "natural", e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Texts */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Footer Texts</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Footer Text (EN)
              </label>
              <input
                value={data.footerTextEn}
                onChange={(e) => updateField("footerTextEn", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">
                Footer Text (ZH)
              </label>
              <input
                value={data.footerTextZh}
                onChange={(e) => updateField("footerTextZh", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  getCustomizeContent,
  saveCustomizeContent,
  defaultCustomizeContent,
  type CustomizeContent,
  type RingStyleItem,
  type StoneItem,
  type MetalItem,
  type PaymentMethodItem,
} from "@/lib/admin-data";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";
import { Plus, Trash2, Check, RotateCcw } from "lucide-react";

export default function CustomizeAdminPage() {
  const [content, setContent] = useState<CustomizeContent>(defaultCustomizeContent);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("images");

  useEffect(() => {
    setContent(getCustomizeContent());
  }, []);

  const handleSave = () => {
    saveCustomizeContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = <K extends keyof CustomizeContent>(key: K, value: CustomizeContent[K]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { key: "images", label: "Images" },
    { key: "ringStyles", label: "Ring Styles" },
    { key: "stones", label: "Stones" },
    { key: "metals", label: "Metals" },
    { key: "prices", label: "Base Prices" },
    { key: "payment", label: "Payment Methods" },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Customize Config</h1>
          <p className="text-sm text-charcoal/50 mt-1">Manage ring configurator data and customize page content</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setContent(defaultCustomizeContent)}
            className="flex items-center gap-2 px-4 py-2 border border-black/10 text-sm text-charcoal/70 hover:border-charcoal/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-black/5 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm transition-colors ${
              activeTab === tab.key
                ? "text-charcoal border-b-2 border-champagne"
                : "text-charcoal/40 hover:text-charcoal/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Images Tab */}
      {activeTab === "images" && (
        <div className="space-y-8">
          <div className="bg-white p-6 border border-black/5">
            <h2 className="text-sm font-medium tracking-wide mb-6">Customize Page Images</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ImagePreviewInput
                label="Hero Image"
                value={content.heroImage}
                onChange={(v) => updateField("heroImage", v)}
              />
              <ImagePreviewInput
                label="Configurator CTA Image"
                value={content.configuratorImage}
                onChange={(v) => updateField("configuratorImage", v)}
              />
              <ImagePreviewInput
                label="Virtual Preview Image"
                value={content.virtualPreviewImage}
                onChange={(v) => updateField("virtualPreviewImage", v)}
              />
            </div>
          </div>

          <div className="bg-white p-6 border border-black/5">
            <h2 className="text-sm font-medium tracking-wide mb-6">Badge Text</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-charcoal/60 mb-2">Hero Badge (EN)</label>
                <input
                  value={content.heroBadgeEn}
                  onChange={(e) => updateField("heroBadgeEn", e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-2">Hero Badge (ZH)</label>
                <input
                  value={content.heroBadgeZh}
                  onChange={(e) => updateField("heroBadgeZh", e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-2">Live Preview Badge (EN)</label>
                <input
                  value={content.livePreviewBadgeEn}
                  onChange={(e) => updateField("livePreviewBadgeEn", e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-2">Live Preview Badge (ZH)</label>
                <input
                  value={content.livePreviewBadgeZh}
                  onChange={(e) => updateField("livePreviewBadgeZh", e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ring Styles Tab */}
      {activeTab === "ringStyles" && (
        <div className="bg-white p-6 border border-black/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-wide">Ring Styles</h2>
            <button
              onClick={() =>
                updateField("ringStyles", [
                  ...content.ringStyles,
                  { id: `style-${Date.now()}`, labelEn: "New Style", labelZh: "新款式", image: "", price: 0 },
                ])
              }
              className="flex items-center gap-2 px-3 py-1.5 text-xs border border-black/10 hover:border-charcoal/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Style
            </button>
          </div>
          <div className="space-y-4">
            {content.ringStyles.map((style, i) => (
              <div key={style.id} className="grid grid-cols-12 gap-4 items-start p-4 bg-cream border border-black/5">
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">ID</label>
                  <input
                    value={style.id}
                    onChange={(e) => {
                      const updated = [...content.ringStyles];
                      updated[i] = { ...style, id: e.target.value };
                      updateField("ringStyles", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">Label (EN)</label>
                  <input
                    value={style.labelEn}
                    onChange={(e) => {
                      const updated = [...content.ringStyles];
                      updated[i] = { ...style, labelEn: e.target.value };
                      updateField("ringStyles", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">Label (ZH)</label>
                  <input
                    value={style.labelZh}
                    onChange={(e) => {
                      const updated = [...content.ringStyles];
                      updated[i] = { ...style, labelZh: e.target.value };
                      updateField("ringStyles", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-charcoal/60 mb-1">Price</label>
                  <input
                    type="number"
                    value={style.price}
                    onChange={(e) => {
                      const updated = [...content.ringStyles];
                      updated[i] = { ...style, price: Number(e.target.value) };
                      updateField("ringStyles", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-1 flex justify-end pt-6">
                  <button
                    onClick={() => {
                      const updated = content.ringStyles.filter((_, idx) => idx !== i);
                      updateField("ringStyles", updated);
                    }}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="col-span-12">
                  <ImagePreviewInput
                    label="Image"
                    value={style.image}
                    onChange={(v) => {
                      const updated = [...content.ringStyles];
                      updated[i] = { ...style, image: v };
                      updateField("ringStyles", updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stones Tab */}
      {activeTab === "stones" && (
        <div className="bg-white p-6 border border-black/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-wide">Stones</h2>
            <button
              onClick={() =>
                updateField("stones", [
                  ...content.stones,
                  { id: `stone-${Date.now()}`, nameEn: "New Stone", nameZh: "新宝石", price: 0, color: "#e8e0d0", type: "moissanite" },
                ])
              }
              className="flex items-center gap-2 px-3 py-1.5 text-xs border border-black/10 hover:border-charcoal/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Stone
            </button>
          </div>
          <div className="space-y-4">
            {content.stones.map((stone, i) => (
              <div key={stone.id} className="grid grid-cols-12 gap-4 items-start p-4 bg-cream border border-black/5">
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">ID</label>
                  <input
                    value={stone.id}
                    onChange={(e) => {
                      const updated = [...content.stones];
                      updated[i] = { ...stone, id: e.target.value };
                      updateField("stones", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">Name (EN)</label>
                  <input
                    value={stone.nameEn}
                    onChange={(e) => {
                      const updated = [...content.stones];
                      updated[i] = { ...stone, nameEn: e.target.value };
                      updateField("stones", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-charcoal/60 mb-1">Name (ZH)</label>
                  <input
                    value={stone.nameZh}
                    onChange={(e) => {
                      const updated = [...content.stones];
                      updated[i] = { ...stone, nameZh: e.target.value };
                      updateField("stones", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-charcoal/60 mb-1">Price</label>
                  <input
                    type="number"
                    value={stone.price}
                    onChange={(e) => {
                      const updated = [...content.stones];
                      updated[i] = { ...stone, price: Number(e.target.value) };
                      updateField("stones", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs text-charcoal/60 mb-1">Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={stone.color}
                      onChange={(e) => {
                        const updated = [...content.stones];
                        updated[i] = { ...stone, color: e.target.value };
                        updateField("stones", updated);
                      }}
                      className="w-8 h-8 border border-black/10 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex justify-end pt-6">
                  <button
                    onClick={() => {
                      const updated = content.stones.filter((_, idx) => idx !== i);
                      updateField("stones", updated);
                    }}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metals Tab */}
      {activeTab === "metals" && (
        <div className="bg-white p-6 border border-black/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-wide">Metals</h2>
            <button
              onClick={() =>
                updateField("metals", [
                  ...content.metals,
                  { id: `metal-${Date.now()}`, nameEn: "New Metal", nameZh: "新金属", price: 0, color: "#e0e0e0" },
                ])
              }
              className="flex items-center gap-2 px-3 py-1.5 text-xs border border-black/10 hover:border-charcoal/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Metal
            </button>
          </div>
          <div className="space-y-4">
            {content.metals.map((metal, i) => (
              <div key={metal.id} className="grid grid-cols-12 gap-4 items-start p-4 bg-cream border border-black/5">
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">ID</label>
                  <input
                    value={metal.id}
                    onChange={(e) => {
                      const updated = [...content.metals];
                      updated[i] = { ...metal, id: e.target.value };
                      updateField("metals", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">Name (EN)</label>
                  <input
                    value={metal.nameEn}
                    onChange={(e) => {
                      const updated = [...content.metals];
                      updated[i] = { ...metal, nameEn: e.target.value };
                      updateField("metals", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-charcoal/60 mb-1">Name (ZH)</label>
                  <input
                    value={metal.nameZh}
                    onChange={(e) => {
                      const updated = [...content.metals];
                      updated[i] = { ...metal, nameZh: e.target.value };
                      updateField("metals", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-charcoal/60 mb-1">Price</label>
                  <input
                    type="number"
                    value={metal.price}
                    onChange={(e) => {
                      const updated = [...content.metals];
                      updated[i] = { ...metal, price: Number(e.target.value) };
                      updateField("metals", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs text-charcoal/60 mb-1">Color</label>
                  <input
                    type="color"
                    value={metal.color}
                    onChange={(e) => {
                      const updated = [...content.metals];
                      updated[i] = { ...metal, color: e.target.value };
                      updateField("metals", updated);
                    }}
                    className="w-8 h-8 border border-black/10 cursor-pointer"
                  />
                </div>
                <div className="col-span-1 flex justify-end pt-6">
                  <button
                    onClick={() => {
                      const updated = content.metals.filter((_, idx) => idx !== i);
                      updateField("metals", updated);
                    }}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Base Prices Tab */}
      {activeTab === "prices" && (
        <div className="bg-white p-6 border border-black/5">
          <h2 className="text-sm font-medium tracking-wide mb-6">Design-Your-Own Base Prices</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(content.basePrices).map(([key, value]) => (
              <div key={key} className="p-4 bg-cream border border-black/5">
                <label className="block text-xs text-charcoal/60 mb-2 capitalize">{key}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => {
                    updateField("basePrices", {
                      ...content.basePrices,
                      [key]: Number(e.target.value),
                    });
                  }}
                  className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                const newKey = prompt("Enter new style ID:");
                if (newKey) {
                  updateField("basePrices", {
                    ...content.basePrices,
                    [newKey]: 0,
                  });
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs border border-black/10 hover:border-charcoal/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Base Price
            </button>
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === "payment" && (
        <div className="bg-white p-6 border border-black/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-wide">Payment Methods</h2>
            <button
              onClick={() =>
                updateField("paymentMethods", [
                  ...content.paymentMethods,
                  { id: `pm-${Date.now()}`, label: "New Method", icon: "M" },
                ])
              }
              className="flex items-center gap-2 px-3 py-1.5 text-xs border border-black/10 hover:border-charcoal/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Method
            </button>
          </div>
          <div className="space-y-4">
            {content.paymentMethods.map((pm, i) => (
              <div key={pm.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-cream border border-black/5">
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">ID</label>
                  <input
                    value={pm.id}
                    onChange={(e) => {
                      const updated = [...content.paymentMethods];
                      updated[i] = { ...pm, id: e.target.value };
                      updateField("paymentMethods", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-xs text-charcoal/60 mb-1">Label</label>
                  <input
                    value={pm.label}
                    onChange={(e) => {
                      const updated = [...content.paymentMethods];
                      updated[i] = { ...pm, label: e.target.value };
                      updateField("paymentMethods", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-charcoal/60 mb-1">Icon</label>
                  <input
                    value={pm.icon}
                    onChange={(e) => {
                      const updated = [...content.paymentMethods];
                      updated[i] = { ...pm, icon: e.target.value };
                      updateField("paymentMethods", updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => {
                      const updated = content.paymentMethods.filter((_, idx) => idx !== i);
                      updateField("paymentMethods", updated);
                    }}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

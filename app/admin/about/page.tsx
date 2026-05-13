"use client";

import { useState, useEffect } from "react";
import {
  AboutContent,
  defaultAboutContent,
  getAboutContent,
  saveAboutContent,
} from "@/lib/admin-data";
import { Save } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent>(defaultAboutContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(getAboutContent());
  }, []);

  const handleSave = () => {
    saveAboutContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setField = (field: keyof AboutContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const updateStat = (index: number, field: keyof AboutContent["stats"][0], value: string) => {
    setContent((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

  const updateCollection = (index: number, field: keyof AboutContent["collections"][0], value: string) => {
    setContent((prev) => {
      const collections = [...prev.collections];
      collections[index] = { ...collections[index], [field]: value };
      return { ...prev, collections };
    });
  };

  const updateProcessStep = (index: number, field: keyof AboutContent["processSteps"][0], value: string) => {
    setContent((prev) => {
      const processSteps = [...prev.processSteps];
      processSteps[index] = { ...processSteps[index], [field]: value };
      return { ...prev, processSteps };
    });
  };

  const updateValue = (index: number, field: keyof AboutContent["values"][0], value: string) => {
    setContent((prev) => {
      const values = [...prev.values];
      values[index] = { ...values[index], [field]: value };
      return { ...prev, values };
    });
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">About Page</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Story */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Brand Story</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Description (EN)</label>
            <textarea rows={3} value={content.storyDescEn} onChange={(e) => setField("storyDescEn", e.target.value)} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">Description (ZH)</label>
            <textarea rows={3} value={content.storyDescZh} onChange={(e) => setField("storyDescZh", e.target.value)} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Origin Story</h2>
        </div>
        <div className="p-6 space-y-4">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Paragraph {n}</h3>
              <div className="grid grid-cols-2 gap-4">
                <textarea rows={3} value={content[`howItStartedP${n}En` as keyof AboutContent] as string} onChange={(e) => setField(`howItStartedP${n}En` as keyof AboutContent, e.target.value)} placeholder={`Paragraph ${n} (EN)`} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
                <textarea rows={3} value={content[`howItStartedP${n}Zh` as keyof AboutContent] as string} onChange={(e) => setField(`howItStartedP${n}Zh` as keyof AboutContent, e.target.value)} placeholder={`Paragraph ${n} (ZH)`} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
              </div>
            </div>
          ))}
          <ImagePreviewInput
            label="Origin Image URL"
            value={content.originImage}
            onChange={(value) => setField("originImage", value)}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Stats</h2>
        </div>
        <div className="divide-y divide-black/5">
          {content.stats.map((stat, i) => (
            <div key={i} className="p-6 flex items-center gap-4">
              <span className="text-xs text-charcoal/30 font-mono w-6">{i + 1}</span>
              <input value={stat.num} onChange={(e) => updateStat(i, "num", e.target.value)} placeholder="Number" className="w-24 px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
              <input value={stat.labelEn} onChange={(e) => updateStat(i, "labelEn", e.target.value)} placeholder="Label (EN)" className="flex-1 px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
              <input value={stat.labelZh} onChange={(e) => updateStat(i, "labelZh", e.target.value)} placeholder="Label (ZH)" className="flex-1 px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Product Collections</h2>
        </div>
        <div className="divide-y divide-black/5">
          {content.collections.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Collection {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input value={item.titleEn} onChange={(e) => updateCollection(i, "titleEn", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
                <input value={item.titleZh} onChange={(e) => updateCollection(i, "titleZh", e.target.value)} placeholder="Title (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input value={item.subtitleEn} onChange={(e) => updateCollection(i, "subtitleEn", e.target.value)} placeholder="Subtitle (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
                <input value={item.subtitleZh} onChange={(e) => updateCollection(i, "subtitleZh", e.target.value)} placeholder="Subtitle (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea rows={2} value={item.descEn} onChange={(e) => updateCollection(i, "descEn", e.target.value)} placeholder="Description (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
                <textarea rows={2} value={item.descZh} onChange={(e) => updateCollection(i, "descZh", e.target.value)} placeholder="Description (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
              </div>
              <ImagePreviewInput
                label="Image URL"
                value={item.image}
                onChange={(value) => updateCollection(i, "image", value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Process Steps</h2>
        </div>
        <div className="divide-y divide-black/5">
          {content.processSteps.map((step, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Step {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input value={step.titleEn} onChange={(e) => updateProcessStep(i, "titleEn", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
                <input value={step.titleZh} onChange={(e) => updateProcessStep(i, "titleZh", e.target.value)} placeholder="Title (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea rows={2} value={step.descEn} onChange={(e) => updateProcessStep(i, "descEn", e.target.value)} placeholder="Description (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
                <textarea rows={2} value={step.descZh} onChange={(e) => updateProcessStep(i, "descZh", e.target.value)} placeholder="Description (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Sustainability</h2>
        </div>
        <div className="p-6 space-y-4">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Paragraph {n}</h3>
              <div className="grid grid-cols-2 gap-4">
                <textarea rows={3} value={content[`sustainabilityP${n}En` as keyof AboutContent] as string} onChange={(e) => setField(`sustainabilityP${n}En` as keyof AboutContent, e.target.value)} placeholder={`Paragraph ${n} (EN)`} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
                <textarea rows={3} value={content[`sustainabilityP${n}Zh` as keyof AboutContent] as string} onChange={(e) => setField(`sustainabilityP${n}Zh` as keyof AboutContent, e.target.value)} placeholder={`Paragraph ${n} (ZH)`} className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
              </div>
            </div>
          ))}
          <ImagePreviewInput
            label="Image URL"
            value={content.sustainabilityImage}
            onChange={(value) => setField("sustainabilityImage", value)}
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Values</h2>
        </div>
        <div className="divide-y divide-black/5">
          {content.values.map((v, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Value {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input value={v.titleEn} onChange={(e) => updateValue(i, "titleEn", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
                <input value={v.titleZh} onChange={(e) => updateValue(i, "titleZh", e.target.value)} placeholder="Title (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea rows={2} value={v.descEn} onChange={(e) => updateValue(i, "descEn", e.target.value)} placeholder="Description (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
                <textarea rows={2} value={v.descZh} onChange={(e) => updateValue(i, "descZh", e.target.value)} placeholder="Description (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Closing CTA</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input value={content.ctaTitleEn} onChange={(e) => setField("ctaTitleEn", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
            <input value={content.ctaTitleZh} onChange={(e) => setField("ctaTitleZh", e.target.value)} placeholder="Title (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <textarea rows={2} value={content.ctaDescEn} onChange={(e) => setField("ctaDescEn", e.target.value)} placeholder="Description (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
            <textarea rows={2} value={content.ctaDescZh} onChange={(e) => setField("ctaDescZh", e.target.value)} placeholder="Description (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input value={content.ctaDesignEn} onChange={(e) => setField("ctaDesignEn", e.target.value)} placeholder="Design Button (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
            <input value={content.ctaDesignZh} onChange={(e) => setField("ctaDesignZh", e.target.value)} placeholder="Design Button (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input value={content.ctaExploreEn} onChange={(e) => setField("ctaExploreEn", e.target.value)} placeholder="Explore Button (EN)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
            <input value={content.ctaExploreZh} onChange={(e) => setField("ctaExploreZh", e.target.value)} placeholder="Explore Button (ZH)" className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne" />
          </div>
        </div>
      </section>
    </div>
  );
}

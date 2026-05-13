"use client";

import { useState, useEffect } from "react";
import {
  HomepageSections,
  defaultHomepageSections,
  getHomepageSections,
  saveHomepageSections,
} from "@/lib/admin-data";
import { X, Plus, Save } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

export default function AdminHomepagePage() {
  const [sections, setSections] = useState<HomepageSections>(defaultHomepageSections);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSections(getHomepageSections());
  }, []);

  const handleSave = () => {
    saveHomepageSections(sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateFeature = (index: number, field: keyof HomepageSections["features"][0], value: string) => {
    setSections((prev) => {
      const features = [...prev.features];
      features[index] = { ...features[index], [field]: value };
      return { ...prev, features };
    });
  };

  const updateShape = (index: number, field: keyof HomepageSections["shopByShape"][0], value: string) => {
    setSections((prev) => {
      const shopByShape = [...prev.shopByShape];
      shopByShape[index] = { ...shopByShape[index], [field]: value };
      return { ...prev, shopByShape };
    });
  };

  const updatePromo = (index: number, field: keyof HomepageSections["promos"][0], value: string) => {
    setSections((prev) => {
      const promos = [...prev.promos];
      promos[index] = { ...promos[index], [field]: value };
      return { ...prev, promos };
    });
  };

  const updateRingBuilder = (field: keyof HomepageSections["ringBuilderCTA"], value: string) => {
    setSections((prev) => ({ ...prev, ringBuilderCTA: { ...prev.ringBuilderCTA, [field]: value } }));
  };

  const updateCraftingStep = (index: number, field: keyof HomepageSections["craftingMemories"]["steps"][0], value: string) => {
    setSections((prev) => {
      const steps = [...prev.craftingMemories.steps];
      steps[index] = { ...steps[index], [field]: value };
      return { ...prev, craftingMemories: { steps } };
    });
  };

  const updateTech = (field: keyof HomepageSections["technologySection"], value: string) => {
    setSections((prev) => ({ ...prev, technologySection: { ...prev.technologySection, [field]: value } }));
  };

  const updateTechFeature = (index: number, field: keyof HomepageSections["technologySection"]["features"][0], value: string) => {
    setSections((prev) => {
      const features = [...prev.technologySection.features];
      features[index] = { ...features[index], [field]: value };
      return { ...prev, technologySection: { ...prev.technologySection, features } };
    });
  };

  const updateTestimonial = (index: number, field: keyof HomepageSections["testimonials"][0], value: string) => {
    setSections((prev) => {
      const testimonials = [...prev.testimonials];
      testimonials[index] = { ...testimonials[index], [field]: value };
      return { ...prev, testimonials };
    });
  };

  const updateCommitmentImage = (index: number, value: string) => {
    setSections((prev) => {
      const images = [...prev.commitment.images];
      images[index] = value;
      return { ...prev, commitment: { ...prev.commitment, images } };
    });
  };

  const updateCommitmentStat = (index: number, field: keyof HomepageSections["commitment"]["stats"][0], value: string) => {
    setSections((prev) => {
      const stats = [...prev.commitment.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, commitment: { ...prev.commitment, stats } };
    });
  };

  const updateBestsellers = (field: keyof HomepageSections["bestsellers"], value: string) => {
    setSections((prev) => ({ ...prev, bestsellers: { ...prev.bestsellers, [field]: value } }));
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Homepage Sections</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Features */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Features</h2>
        </div>
        <div className="divide-y divide-black/5">
          {sections.features.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Feature {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={item.titleEn}
                  onChange={(e) => updateFeature(i, "titleEn", e.target.value)}
                  placeholder="Title (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={item.titleZh}
                  onChange={(e) => updateFeature(i, "titleZh", e.target.value)}
                  placeholder="Title (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={item.descEn}
                  onChange={(e) => updateFeature(i, "descEn", e.target.value)}
                  placeholder="Description (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={item.descZh}
                  onChange={(e) => updateFeature(i, "descZh", e.target.value)}
                  placeholder="Description (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop By Shape */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Shop By Shape</h2>
        </div>
        <div className="divide-y divide-black/5">
          {sections.shopByShape.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Shape {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={item.nameEn}
                  onChange={(e) => updateShape(i, "nameEn", e.target.value)}
                  placeholder="Name (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={item.nameZh}
                  onChange={(e) => updateShape(i, "nameZh", e.target.value)}
                  placeholder="Name (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <ImagePreviewInput
                label="Image URL"
                value={item.image}
                onChange={(value) => updateShape(i, "image", value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Promos */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Promo Cards</h2>
        </div>
        <div className="divide-y divide-black/5">
          {sections.promos.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Promo {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={item.discountEn}
                  onChange={(e) => updatePromo(i, "discountEn", e.target.value)}
                  placeholder="Discount (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={item.discountZh}
                  onChange={(e) => updatePromo(i, "discountZh", e.target.value)}
                  placeholder="Discount (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={item.labelEn}
                  onChange={(e) => updatePromo(i, "labelEn", e.target.value)}
                  placeholder="Label (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={item.labelZh}
                  onChange={(e) => updatePromo(i, "labelZh", e.target.value)}
                  placeholder="Label (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={item.href}
                  onChange={(e) => updatePromo(i, "href", e.target.value)}
                  placeholder="Link"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={item.bg}
                  onChange={(e) => updatePromo(i, "bg", e.target.value)}
                  placeholder="Background class (e.g. bg-stone)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-black/5">
          <label className="block text-xs text-charcoal/60 mb-1">Promo Code Text</label>
          <input
            value={sections.promoCode}
            onChange={(e) => setSections((prev) => ({ ...prev, promoCode: e.target.value }))}
            className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
          />
        </div>
      </section>

      {/* Ring Builder CTA */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Ring Builder CTA</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.ringBuilderCTA.titleEn}
              onChange={(e) => updateRingBuilder("titleEn", e.target.value)}
              placeholder="Title (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.ringBuilderCTA.titleZh}
              onChange={(e) => updateRingBuilder("titleZh", e.target.value)}
              placeholder="Title (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <textarea
              rows={2}
              value={sections.ringBuilderCTA.descEn}
              onChange={(e) => updateRingBuilder("descEn", e.target.value)}
              placeholder="Description (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
            <textarea
              rows={2}
              value={sections.ringBuilderCTA.descZh}
              onChange={(e) => updateRingBuilder("descZh", e.target.value)}
              placeholder="Description (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.ringBuilderCTA.btn1En}
              onChange={(e) => updateRingBuilder("btn1En", e.target.value)}
              placeholder="Button 1 (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.ringBuilderCTA.btn1Zh}
              onChange={(e) => updateRingBuilder("btn1Zh", e.target.value)}
              placeholder="Button 1 (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.ringBuilderCTA.btn2En}
              onChange={(e) => updateRingBuilder("btn2En", e.target.value)}
              placeholder="Button 2 (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.ringBuilderCTA.btn2Zh}
              onChange={(e) => updateRingBuilder("btn2Zh", e.target.value)}
              placeholder="Button 2 (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.ringBuilderCTA.quizEn}
              onChange={(e) => updateRingBuilder("quizEn", e.target.value)}
              placeholder="Quiz CTA (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.ringBuilderCTA.quizZh}
              onChange={(e) => updateRingBuilder("quizZh", e.target.value)}
              placeholder="Quiz CTA (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.ringBuilderCTA.quizDescEn}
              onChange={(e) => updateRingBuilder("quizDescEn", e.target.value)}
              placeholder="Quiz Desc Prefix (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.ringBuilderCTA.quizDescZh}
              onChange={(e) => updateRingBuilder("quizDescZh", e.target.value)}
              placeholder="Quiz Desc Prefix (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.ringBuilderCTA.quizDesc2En}
              onChange={(e) => updateRingBuilder("quizDesc2En", e.target.value)}
              placeholder="Quiz Desc Suffix (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.ringBuilderCTA.quizDesc2Zh}
              onChange={(e) => updateRingBuilder("quizDesc2Zh", e.target.value)}
              placeholder="Quiz Desc Suffix (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <ImagePreviewInput
            label="Image URL"
            value={sections.ringBuilderCTA.image}
            onChange={(value) => updateRingBuilder("image", value)}
          />
        </div>
      </section>

      {/* Crafting Memories */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Crafting Memories</h2>
        </div>
        <div className="divide-y divide-black/5">
          {sections.craftingMemories.steps.map((step, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Step {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={step.titleEn}
                  onChange={(e) => updateCraftingStep(i, "titleEn", e.target.value)}
                  placeholder="Title (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={step.titleZh}
                  onChange={(e) => updateCraftingStep(i, "titleZh", e.target.value)}
                  placeholder="Title (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea
                  rows={2}
                  value={step.descEn}
                  onChange={(e) => updateCraftingStep(i, "descEn", e.target.value)}
                  placeholder="Description (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                />
                <textarea
                  rows={2}
                  value={step.descZh}
                  onChange={(e) => updateCraftingStep(i, "descZh", e.target.value)}
                  placeholder="Description (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                />
              </div>
              <ImagePreviewInput
                label="Image URL"
                value={step.image}
                onChange={(value) => updateCraftingStep(i, "image", value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Technology Section</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.technologySection.labelEn}
              onChange={(e) => updateTech("labelEn", e.target.value)}
              placeholder="Label (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.technologySection.labelZh}
              onChange={(e) => updateTech("labelZh", e.target.value)}
              placeholder="Label (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <textarea
              rows={2}
              value={sections.technologySection.titleEn}
              onChange={(e) => updateTech("titleEn", e.target.value)}
              placeholder="Title (EN, use \n for line break)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
            <textarea
              rows={2}
              value={sections.technologySection.titleZh}
              onChange={(e) => updateTech("titleZh", e.target.value)}
              placeholder="Title (ZH, use \n for line break)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <textarea
              rows={3}
              value={sections.technologySection.descEn}
              onChange={(e) => updateTech("descEn", e.target.value)}
              placeholder="Description (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
            <textarea
              rows={3}
              value={sections.technologySection.descZh}
              onChange={(e) => updateTech("descZh", e.target.value)}
              placeholder="Description (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.technologySection.badgeEn}
              onChange={(e) => updateTech("badgeEn", e.target.value)}
              placeholder="Badge (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.technologySection.badgeZh}
              onChange={(e) => updateTech("badgeZh", e.target.value)}
              placeholder="Badge (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.technologySection.btnEn}
              onChange={(e) => updateTech("btnEn", e.target.value)}
              placeholder="Button (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.technologySection.btnZh}
              onChange={(e) => updateTech("btnZh", e.target.value)}
              placeholder="Button (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <ImagePreviewInput
            label="Image URL"
            value={sections.technologySection.image}
            onChange={(value) => updateTech("image", value)}
          />
          <div className="divide-y divide-black/5 border border-black/5">
            {sections.technologySection.features.map((f, i) => (
              <div key={i} className="p-4 space-y-3">
                <h4 className="text-xs font-medium text-charcoal">Tech Feature {i + 1}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={f.titleEn}
                    onChange={(e) => updateTechFeature(i, "titleEn", e.target.value)}
                    placeholder="Title (EN)"
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                  <input
                    value={f.titleZh}
                    onChange={(e) => updateTechFeature(i, "titleZh", e.target.value)}
                    placeholder="Title (ZH)"
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <textarea
                    rows={2}
                    value={f.descEn}
                    onChange={(e) => updateTechFeature(i, "descEn", e.target.value)}
                    placeholder="Description (EN)"
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                  />
                  <textarea
                    rows={2}
                    value={f.descZh}
                    onChange={(e) => updateTechFeature(i, "descZh", e.target.value)}
                    placeholder="Description (ZH)"
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Testimonials</h2>
        </div>
        <div className="divide-y divide-black/5">
          {sections.testimonials.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <h3 className="text-sm font-medium text-charcoal">Review {i + 1}</h3>
              <input
                value={item.name}
                onChange={(e) => updateTestimonial(i, "name", e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={item.locationEn}
                  onChange={(e) => updateTestimonial(i, "locationEn", e.target.value)}
                  placeholder="Location (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
                <input
                  value={item.locationZh}
                  onChange={(e) => updateTestimonial(i, "locationZh", e.target.value)}
                  placeholder="Location (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea
                  rows={3}
                  value={item.textEn}
                  onChange={(e) => updateTestimonial(i, "textEn", e.target.value)}
                  placeholder="Review Text (EN)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                />
                <textarea
                  rows={3}
                  value={item.textZh}
                  onChange={(e) => updateTestimonial(i, "textZh", e.target.value)}
                  placeholder="Review Text (ZH)"
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Commitment</h2>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-medium text-charcoal">Images</h3>
          <div className="space-y-3">
            {sections.commitment.images.map((img, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-xs text-charcoal/30 font-mono w-6 pt-2">{i + 1}</span>
                <ImagePreviewInput
                  className="flex-1"
                  value={img}
                  onChange={(value) => updateCommitmentImage(i, value)}
                  placeholder={`Image ${i + 1} URL`}
                />
              </div>
            ))}
          </div>
          <div className="border-t border-black/5 pt-4">
            <h3 className="text-sm font-medium text-charcoal mb-3">Stats</h3>
            <div className="divide-y divide-black/5">
              {sections.commitment.stats.map((stat, i) => (
                <div key={i} className="py-3 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-charcoal/30 font-mono w-6">{i + 1}</span>
                    <input
                      value={stat.num}
                      onChange={(e) => updateCommitmentStat(i, "num", e.target.value)}
                      placeholder="Number/Label"
                      className="w-24 px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                    />
                    <input
                      value={stat.labelEn}
                      onChange={(e) => updateCommitmentStat(i, "labelEn", e.target.value)}
                      placeholder="Label (EN)"
                      className="flex-1 px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                    />
                    <input
                      value={stat.labelZh}
                      onChange={(e) => updateCommitmentStat(i, "labelZh", e.target.value)}
                      placeholder="Label (ZH)"
                      className="flex-1 px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Bestsellers</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.bestsellers.labelEn}
              onChange={(e) => updateBestsellers("labelEn", e.target.value)}
              placeholder="Label (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.bestsellers.labelZh}
              onChange={(e) => updateBestsellers("labelZh", e.target.value)}
              placeholder="Label (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={sections.bestsellers.titleEn}
              onChange={(e) => updateBestsellers("titleEn", e.target.value)}
              placeholder="Title (EN)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
            <input
              value={sections.bestsellers.titleZh}
              onChange={(e) => updateBestsellers("titleZh", e.target.value)}
              placeholder="Title (ZH)"
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  AdminCollection,
  defaultAdminCollections,
  getAdminCollections,
  saveAdminCollections,
} from "@/lib/admin-data";
import { Save, Plus, X, GripVertical } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<AdminCollection[]>(defaultAdminCollections);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setCollections(getAdminCollections());
  }, []);

  const handleSave = () => {
    saveAdminCollections(collections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateCollection = (index: number, field: keyof AdminCollection, value: string | string[] | number) => {
    setCollections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addCollection = () => {
    const newCollection: AdminCollection = {
      slug: `collection-${Date.now()}`,
      title: "New Collection",
      subtitle: "Subtitle",
      description: "Description",
      image: "/images/jewelry/ring-120.png",
      productCount: 0,
      tag: "New",
      productSlugs: [],
    };
    setCollections((prev) => [...prev, newCollection]);
    setActiveTab(collections.length);
  };

  const removeCollection = (index: number) => {
    setCollections((prev) => prev.filter((_, i) => i !== index));
    if (activeTab >= index && activeTab > 0) setActiveTab(activeTab - 1);
  };

  const addProductSlug = (index: number, slug: string) => {
    if (!slug.trim()) return;
    setCollections((prev) => {
      const updated = [...prev];
      const slugs = [...updated[index].productSlugs, slug.trim()];
      updated[index] = { ...updated[index], productSlugs: slugs, productCount: slugs.length };
      return updated;
    });
  };

  const removeProductSlug = (index: number, slugIndex: number) => {
    setCollections((prev) => {
      const updated = [...prev];
      const slugs = updated[index].productSlugs.filter((_, i) => i !== slugIndex);
      updated[index] = { ...updated[index], productSlugs: slugs, productCount: slugs.length };
      return updated;
    });
  };

  const active = collections[activeTab];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Collections</h1>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded">Saved</span>
          )}
          <button
            onClick={addCollection}
            className="flex items-center gap-2 px-4 py-2 bg-obsidian text-white text-sm hover:bg-charcoal transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Collection
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-champagne text-white text-sm hover:bg-champagne/80 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-1">
            {collections.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => setActiveTab(i)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-colors ${
                  i === activeTab
                    ? "bg-champagne/10 text-champagne border-l-2 border-champagne"
                    : "text-charcoal/60 hover:bg-black/5"
                }`}
              >
                <GripVertical className="w-3 h-3 text-charcoal/20" />
                <span className="truncate">{c.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          {active ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-charcoal">{active.title}</h2>
                <button
                  onClick={() => removeCollection(activeTab)}
                  className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/50 mb-1">Slug (URL)</label>
                  <input
                    value={active.slug}
                    onChange={(e) => updateCollection(activeTab, "slug", e.target.value)}
                    className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/50 mb-1">Tag</label>
                  <input
                    value={active.tag}
                    onChange={(e) => updateCollection(activeTab, "tag", e.target.value)}
                    className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-charcoal/50 mb-1">Title</label>
                <input
                  value={active.title}
                  onChange={(e) => updateCollection(activeTab, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="block text-xs text-charcoal/50 mb-1">Subtitle</label>
                <input
                  value={active.subtitle}
                  onChange={(e) => updateCollection(activeTab, "subtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="block text-xs text-charcoal/50 mb-1">Description</label>
                <textarea
                  value={active.description}
                  onChange={(e) => updateCollection(activeTab, "description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne resize-none"
                />
              </div>

              <ImagePreviewInput
                value={active.image}
                onChange={(v) => updateCollection(activeTab, "image", v)}
                label="Cover Image"
              />

              <div>
                <label className="block text-xs text-charcoal/50 mb-2">Product Slugs</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {active.productSlugs.map((slug, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-black/5 text-xs text-charcoal"
                    >
                      {slug}
                      <button
                        onClick={() => removeProductSlug(activeTab, i)}
                        className="text-charcoal/40 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem("slug") as HTMLInputElement;
                    addProductSlug(activeTab, input.value);
                    input.value = "";
                  }}
                  className="flex gap-2"
                >
                  <input
                    name="slug"
                    placeholder="Enter product slug"
                    className="flex-1 px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-obsidian text-white text-sm hover:bg-charcoal"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <p className="text-charcoal/40">No collections. Click "Add Collection" to create one.</p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  AdminCatalogPage as AdminCatalogPageType,
  defaultAdminCatalog,
  getAdminCatalog,
  saveAdminCatalog,
} from "@/lib/admin-data";
import { Save, Plus, X, GripVertical, ChevronLeft, ChevronRight } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

export default function AdminCatalogPage() {
  const [pages, setPages] = useState<AdminCatalogPageType[]>(defaultAdminCatalog);
  const [saved, setSaved] = useState(false);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    setPages(getAdminCatalog());
  }, []);

  const handleSave = () => {
    saveAdminCatalog(pages);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePage = (index: number, field: keyof AdminCatalogPageType, value: string | string[] | { name: string; slug: string; price: string }[] | undefined) => {
    setPages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addPage = () => {
    const newPage: AdminCatalogPageType = {
      id: pages.length + 1,
      leftImage: "/images/jewelry/ring-120.png",
      leftTitle: "New Page Left",
      leftSubtitle: "Subtitle",
      leftProducts: [],
      rightImage: "/images/jewelry/ring-150.png",
      rightTitle: "New Page Right",
      rightSubtitle: "Subtitle",
      rightProducts: [],
    };
    setPages((prev) => [...prev, newPage]);
    setActivePage(pages.length);
  };

  const removePage = (index: number) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
    if (activePage >= index && activePage > 0) setActivePage(activePage - 1);
  };

  const addProduct = (pageIndex: number, side: "left" | "right") => {
    setPages((prev) => {
      const updated = [...prev];
      const field = side === "left" ? "leftProducts" : "rightProducts";
      const products = [...(updated[pageIndex][field] || []), { name: "Product Name", slug: "product-slug", price: "$0" }];
      updated[pageIndex] = { ...updated[pageIndex], [field]: products };
      return updated;
    });
  };

  const updateProduct = (pageIndex: number, side: "left" | "right", prodIndex: number, field: "name" | "slug" | "price", value: string) => {
    setPages((prev) => {
      const updated = [...prev];
      const prodField = side === "left" ? "leftProducts" : "rightProducts";
      const products = [...(updated[pageIndex][prodField] || [])];
      products[prodIndex] = { ...products[prodIndex], [field]: value };
      updated[pageIndex] = { ...updated[pageIndex], [prodField]: products };
      return updated;
    });
  };

  const removeProduct = (pageIndex: number, side: "left" | "right", prodIndex: number) => {
    setPages((prev) => {
      const updated = [...prev];
      const field = side === "left" ? "leftProducts" : "rightProducts";
      updated[pageIndex] = {
        ...updated[pageIndex],
        [field]: (updated[pageIndex][field] || []).filter((_: unknown, i: number) => i !== prodIndex),
      };
      return updated;
    });
  };

  const active: AdminCatalogPageType | undefined = pages[activePage];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Catalog</h1>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded">Saved</span>
          )}
          <button
            onClick={addPage}
            className="flex items-center gap-2 px-4 py-2 bg-obsidian text-white text-sm hover:bg-charcoal transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Page
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
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePage(i)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-colors ${
                  i === activePage
                    ? "bg-champagne/10 text-champagne border-l-2 border-champagne"
                    : "text-charcoal/60 hover:bg-black/5"
                }`}
              >
                <GripVertical className="w-3 h-3 text-charcoal/20" />
                <span className="truncate">Page {p.id}: {p.leftTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          {active ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-charcoal">Page {active.id}</h2>
                <button
                  onClick={() => removePage(activePage)}
                  className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Delete Page
                </button>
              </div>

              {/* Left Page */}
              <div className="border border-black/10 p-6 space-y-4">
                <h3 className="text-sm font-medium text-charcoal flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Left Page
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-charcoal/50 mb-1">Title</label>
                    <input
                      value={active.leftTitle}
                      onChange={(e) => updatePage(activePage, "leftTitle", e.target.value)}
                      className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/50 mb-1">Subtitle</label>
                    <input
                      value={active.leftSubtitle}
                      onChange={(e) => updatePage(activePage, "leftSubtitle", e.target.value)}
                      className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>

                <ImagePreviewInput
                  value={active.leftImage}
                  onChange={(v) => updatePage(activePage, "leftImage", v)}
                  label="Left Image"
                />

                <div>
                  <label className="block text-xs text-charcoal/50 mb-2">Products</label>
                  <div className="space-y-2">
                    {(active.leftProducts || []).map((prod: { name: string; slug: string; price: string }, i: number) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          value={prod.name}
                          onChange={(e) => updateProduct(activePage, "left", i, "name", e.target.value)}
                          placeholder="Name"
                          className="flex-1 px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                        />
                        <input
                          value={prod.slug}
                          onChange={(e) => updateProduct(activePage, "left", i, "slug", e.target.value)}
                          placeholder="Slug"
                          className="flex-1 px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                        />
                        <input
                          value={prod.price}
                          onChange={(e) => updateProduct(activePage, "left", i, "price", e.target.value)}
                          placeholder="Price"
                          className="w-24 px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                        />
                        <button
                          onClick={() => removeProduct(activePage, "left", i)}
                          className="text-red-400 hover:text-red-600 p-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => addProduct(activePage, "left")}
                    className="mt-2 flex items-center gap-1 text-xs text-champagne hover:underline"
                  >
                    <Plus className="w-3 h-3" />
                    Add Product
                  </button>
                </div>
              </div>

              {/* Right Page */}
              <div className="border border-black/10 p-6 space-y-4">
                <h3 className="text-sm font-medium text-charcoal flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  Right Page
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-charcoal/50 mb-1">Title</label>
                    <input
                      value={active.rightTitle}
                      onChange={(e) => updatePage(activePage, "rightTitle", e.target.value)}
                      className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/50 mb-1">Subtitle</label>
                    <input
                      value={active.rightSubtitle}
                      onChange={(e) => updatePage(activePage, "rightSubtitle", e.target.value)}
                      className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>

                <ImagePreviewInput
                  value={active.rightImage}
                  onChange={(v) => updatePage(activePage, "rightImage", v)}
                  label="Right Image"
                />

                <div>
                  <label className="block text-xs text-charcoal/50 mb-2">Products</label>
                  <div className="space-y-2">
                    {(active.rightProducts || []).map((prod: { name: string; slug: string; price: string }, i: number) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          value={prod.name}
                          onChange={(e) => updateProduct(activePage, "right", i, "name", e.target.value)}
                          placeholder="Name"
                          className="flex-1 px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                        />
                        <input
                          value={prod.slug}
                          onChange={(e) => updateProduct(activePage, "right", i, "slug", e.target.value)}
                          placeholder="Slug"
                          className="flex-1 px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                        />
                        <input
                          value={prod.price}
                          onChange={(e) => updateProduct(activePage, "right", i, "price", e.target.value)}
                          placeholder="Price"
                          className="w-24 px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                        />
                        <button
                          onClick={() => removeProduct(activePage, "right", i)}
                          className="text-red-400 hover:text-red-600 p-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => addProduct(activePage, "right")}
                    className="mt-2 flex items-center gap-1 text-xs text-champagne hover:underline"
                  >
                    <Plus className="w-3 h-3" />
                    Add Product
                  </button>
                </div>

                {/* Promo */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                  <div>
                    <label className="block text-xs text-charcoal/50 mb-1">Promo Text (optional)</label>
                    <input
                      value={active.promoText || ""}
                      onChange={(e) => updatePage(activePage, "promoText", e.target.value || "")}
                      placeholder="e.g. BESTSELLER"
                      className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/50 mb-1">Promo Color Class</label>
                    <input
                      value={active.promoColor || ""}
                      onChange={(e) => updatePage(activePage, "promoColor", e.target.value || "")}
                      placeholder="e.g. bg-amber-700"
                      className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-charcoal/40">No pages. Click "Add Page" to create one.</p>
          )}
        </div>
      </div>
    </div>
  );
}

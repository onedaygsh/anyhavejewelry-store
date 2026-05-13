"use client";

import { useState, useEffect } from "react";
import { PageContent, getPageContent, savePageContent } from "@/lib/admin-data";
import { X, Plus, Save } from "lucide-react";
import ImagePreviewInput from "@/components/admin/ImagePreviewInput";

const defaultContent: PageContent = {
  heroTitle: "DESIGN YOUR\nFOREVER.",
  heroSubtitle: "Your Story, Crafted for Life.",
  heroCta: "START YOUR CUSTOM DESIGN",
  heroImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=1200&fit=crop",
  heroCta2En: "SHOP COLLECTION",
  heroCta2Zh: "浏览系列",
  collections: [
    {
      title: "Moissanite Rings",
      desc: "From timeless solitaires to intricate vintage designs, find the ring that captures your unique love story.",
      image: "/images/jewelry/ring-120.png",
      href: "/products/?tier=moissanite",
    },
    {
      title: "Lab-Grown Diamond Rings",
      desc: "Elegant rings in platinum and gold, designed to symbolize eternal commitment with ethically sourced brilliance.",
      image: "/images/jewelry/ring-150.png",
      href: "/products/?tier=lab",
    },
    {
      title: "Engagement Collection",
      desc: "Discover our full range of engagement rings featuring moissanite and lab-grown diamonds in every cut and style.",
      image: "/images/jewelry/ring-100.png",
      href: "/products/",
    },
    {
      title: "Statement Rings",
      desc: "Bold, breathtaking designs for those who demand the extraordinary. Larger stones and unique cuts that command attention.",
      image: "/images/jewelry/ring-140.png",
      href: "/products/",
    },
  ],
  inspirePosts: [
    {
      title: "Moissanite vs. Diamond: A Complete Guide",
      desc: "Discover why more couples are choosing moissanite for its exceptional brilliance, durability, and ethical advantages.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop",
      href: "/blog/moissanite-vs-diamond-complete-guide",
    },
    {
      title: "How to Choose the Perfect Engagement Ring",
      desc: "From stone selection to metal choice, learn everything you need to know to find a ring they will love forever.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop",
      href: "/blog/how-to-choose-engagement-ring",
    },
    {
      title: "The Truth About Lab-Grown Diamonds",
      desc: "Are they real diamonds? How are they made? We answer the most common questions about this revolutionary choice.",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=600&fit=crop",
      href: "/blog/truth-about-lab-grown-diamonds",
    },
  ],
};

export default function AdminPagesPage() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = getPageContent(defaultContent);
    setContent(loaded);
  }, []);

  const handleSave = () => {
    savePageContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateHero = (field: keyof PageContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const updateCollection = (
    index: number,
    field: keyof PageContent["collections"][0],
    value: string
  ) => {
    setContent((prev) => {
      const collections = [...prev.collections];
      collections[index] = { ...collections[index], [field]: value };
      return { ...prev, collections };
    });
  };

  const addCollection = () => {
    setContent((prev) => ({
      ...prev,
      collections: [
        ...prev.collections,
        { title: "", desc: "", image: "", href: "" },
      ],
    }));
  };

  const removeCollection = (index: number) => {
    setContent((prev) => ({
      ...prev,
      collections: prev.collections.filter((_, i) => i !== index),
    }));
  };

  const updateInspire = (
    index: number,
    field: keyof PageContent["inspirePosts"][0],
    value: string
  ) => {
    setContent((prev) => {
      const inspirePosts = [...prev.inspirePosts];
      inspirePosts[index] = { ...inspirePosts[index], [field]: value };
      return { ...prev, inspirePosts };
    });
  };

  const addInspire = () => {
    setContent((prev) => ({
      ...prev,
      inspirePosts: [
        ...prev.inspirePosts,
        { title: "", desc: "", image: "", href: "" },
      ],
    }));
  };

  const removeInspire = (index: number) => {
    setContent((prev) => ({
      ...prev,
      inspirePosts: prev.inspirePosts.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Homepage Editor</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-sm hover:bg-graphite transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-medium text-charcoal">Hero Section</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">
              Title (use \n for line break)
            </label>
            <textarea
              rows={2}
              value={content.heroTitle}
              onChange={(e) => updateHero("heroTitle", e.target.value)}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">
              Subtitle
            </label>
            <input
              value={content.heroSubtitle}
              onChange={(e) => updateHero("heroSubtitle", e.target.value)}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1">
              CTA Button Text
            </label>
            <input
              value={content.heroCta}
              onChange={(e) => updateHero("heroCta", e.target.value)}
              className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
            />
          </div>
          <ImagePreviewInput
            label="Hero Background Image"
            value={content.heroImage}
            onChange={(value) => updateHero("heroImage", value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Secondary CTA (EN)</label>
              <input
                value={content.heroCta2En}
                onChange={(e) => updateHero("heroCta2En", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 mb-1">Secondary CTA (ZH)</label>
              <input
                value={content.heroCta2Zh}
                onChange={(e) => updateHero("heroCta2Zh", e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="font-medium text-charcoal">Collection Showcase</h2>
          <button
            onClick={addCollection}
            className="flex items-center gap-1 text-xs text-champagne hover:underline"
          >
            <Plus className="w-3 h-3" />
            Add Item
          </button>
        </div>
        <div className="divide-y divide-black/5">
          {content.collections.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-charcoal">
                  Item {i + 1}
                </h3>
                <button
                  onClick={() => removeCollection(i)}
                  className="p-1 text-charcoal/30 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Title
                  </label>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateCollection(i, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Link
                  </label>
                  <input
                    value={item.href}
                    onChange={(e) =>
                      updateCollection(i, "href", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-1">
                  Description
                </label>
                <input
                  value={item.desc}
                  onChange={(e) =>
                    updateCollection(i, "desc", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <ImagePreviewInput
                label="Image Path"
                value={item.image}
                onChange={(value) => updateCollection(i, "image", value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Inspire Section */}
      <section className="bg-white border border-black/5 mb-6">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="font-medium text-charcoal">Inspire Your Moments</h2>
          <button
            onClick={addInspire}
            className="flex items-center gap-1 text-xs text-champagne hover:underline"
          >
            <Plus className="w-3 h-3" />
            Add Post
          </button>
        </div>
        <div className="divide-y divide-black/5">
          {content.inspirePosts.map((item, i) => (
            <div key={i} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-charcoal">
                  Post {i + 1}
                </h3>
                <button
                  onClick={() => removeInspire(i)}
                  className="p-1 text-charcoal/30 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Title
                  </label>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateInspire(i, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">
                    Link
                  </label>
                  <input
                    value={item.href}
                    onChange={(e) =>
                      updateInspire(i, "href", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-1">
                  Description
                </label>
                <input
                  value={item.desc}
                  onChange={(e) =>
                    updateInspire(i, "desc", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-cream border border-black/5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
              <ImagePreviewInput
                label="Image Path"
                value={item.image}
                onChange={(value) => updateInspire(i, "image", value)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

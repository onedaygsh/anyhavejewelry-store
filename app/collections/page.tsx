"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminCollection, getAdminCollections } from "@/lib/admin-data";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<AdminCollection[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCollections(getAdminCollections());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white min-h-screen pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="h-4 w-32 bg-obsidian/10 mx-auto mb-4 rounded" />
            <div className="h-10 w-64 bg-obsidian/10 mx-auto mb-4 rounded" />
            <div className="h-4 w-96 bg-obsidian/10 mx-auto rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-obsidian/5 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-obsidian/40 mb-4">
            Curated Selections
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-obsidian mb-4">
            Our Collections
          </h1>
          <p className="text-obsidian/60 max-w-lg mx-auto">
            Themed jewelry selections for every milestone, celebration, and everyday moment.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}/`}
              className="group block relative overflow-hidden"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] tracking-widest uppercase text-obsidian">
                    {collection.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">
                    {collection.subtitle}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-champagne-light transition-colors">
                    {collection.title}
                  </h2>
                  <p className="text-sm text-white/70 mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">
                      {collection.productCount} pieces
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/80 group-hover:text-champagne-light transition-colors">
                      Explore
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="mt-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-obsidian/40 mb-4">
            Full Experience
          </p>
          <h2 className="font-serif text-3xl text-obsidian mb-4">
            Browse Our Digital Catalog
          </h2>
          <p className="text-obsidian/60 mb-8 max-w-md mx-auto">
            Flip through our complete product catalog — immersive visuals, detailed specs, and direct links to every piece.
          </p>
          <Link
            href="/catalog/"
            className="inline-flex items-center gap-2 px-10 py-4 bg-obsidian text-white text-sm tracking-[0.2em] font-medium hover:bg-charcoal transition-colors"
          >
            Open Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

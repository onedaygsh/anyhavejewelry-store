"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { products } from "@/lib/data";
import { AdminCollection, getAdminCollections } from "@/lib/admin-data";

export default function CollectionDetailClient({ slug }: { slug: string }) {
  const [collection, setCollection] = useState<AdminCollection | null>(null);

  useEffect(() => {
    const all = getAdminCollections();
    setCollection(all.find((c) => c.slug === slug) || null);
  }, [slug]);

  if (!collection) {
    return (
      <div className="bg-white min-h-screen pt-28 pb-20 text-center">
        <p className="text-obsidian/40">Collection not found.</p>
      </div>
    );
  }

  const collectionProducts = products.filter((p) =>
    collection.productSlugs.includes(p.slug)
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-3">
              {collection.subtitle}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-4">
              {collection.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Description + Back */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-start justify-between mb-12">
          <div className="max-w-2xl">
            <p className="text-obsidian/70 leading-relaxed">
              {collection.description}
            </p>
          </div>
          <Link
            href="/collections/"
            className="hidden md:flex items-center gap-2 text-sm text-obsidian/50 hover:text-obsidian transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Collections
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {collectionProducts.map((product, i) => (
            <div key={product.id} className={i === 0 ? "md:col-span-2" : ""}>
              <Link href={`/product/${product.slug}/`} className="group block">
                <div
                  className={`relative overflow-hidden bg-stone ${
                    i === 0 ? "aspect-[21/9]" : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-8 py-3 bg-white/90 backdrop-blur text-sm tracking-widest uppercase text-obsidian">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-obsidian group-hover:text-warm-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-obsidian/50 mt-1">{product.material}</p>
                  </div>
                  <p className="text-lg font-medium">${product.price.toLocaleString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {collectionProducts.length === 0 && (
          <div className="py-32 text-center text-obsidian/40">
            <p>Products coming soon to this collection.</p>
            <Link href="/products/" className="inline-block mt-4 text-champagne hover:underline">
              Browse all products
            </Link>
          </div>
        )}

        <div className="md:hidden mt-12 pt-8 border-t border-black/5">
          <Link href="/collections/" className="flex items-center gap-2 text-sm text-obsidian/50">
            <ArrowLeft className="w-4 h-4" />
            All Collections
          </Link>
        </div>
      </div>
    </div>
  );
}

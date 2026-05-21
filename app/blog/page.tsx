"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight, Clock, Tag, BookOpen, Search } from "lucide-react";

const categories = ["All", "Education", "Buying Guide", "Care Guide", "Inspiration"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat = activeCategory === "All" || post.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const featured = blogPosts[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
            Jewelry Knowledge & Buying Guides
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
            Anyhave Jewelry Academy
          </h1>
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            Expert jewelry guides and educational content to help you make informed
            decisions when shopping for moissanite and lab-grown diamonds.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-black/5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-champagne transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-widest uppercase transition-all border ${
                activeCategory === cat
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-black/10 text-charcoal/60 hover:border-charcoal/30 hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Article */}
        {featured && activeCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-charcoal/40" />
              <h2 className="font-serif text-2xl text-charcoal">Featured Guide</h2>
            </div>
            <Link href={`/blog/${featured.slug}/`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 bg-white border border-black/5 overflow-hidden">
                <div className="aspect-[4/3] md:aspect-auto bg-stone overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-cream text-[10px] tracking-widest uppercase text-charcoal/60 border border-black/5">
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-charcoal/30">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 group-hover:text-champagne transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-charcoal/50 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs text-champagne underline underline-offset-4">
                    Read Full Guide
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Article Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-5 h-5 text-charcoal/40" />
            <h2 className="font-serif text-2xl text-charcoal">
              {searchQuery ? `Search Results (${filtered.length})` : "All Guides"}
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-charcoal/40">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === "All" && !searchQuery ? rest : filtered).map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                >
                  <Link href={`/blog/${post.slug}/`} className="group block bg-white border border-black/5 hover:shadow-lg transition-shadow">
                    <div className="aspect-[16/10] bg-stone overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Tag className="w-3 h-3 text-champagne" />
                        <span className="text-[10px] tracking-widest uppercase text-charcoal/40">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-charcoal/20">|</span>
                        <span className="flex items-center gap-1 text-[10px] text-charcoal/30">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-medium text-charcoal mb-2 group-hover:text-champagne transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-charcoal/50 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
  ChevronRight,
} from "lucide-react";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-data";

export default function BlogArticleClient({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug, 3);

  const handleShare = async () => {
    const url = `https://anyhavejewelry.com/blog/${slug}/`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academy
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white border border-black/5 text-[10px] tracking-widest uppercase text-charcoal/60">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-charcoal/30">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-charcoal/30">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
            {post.title}
          </h1>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="aspect-[16/9] bg-stone overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <article
            className="prose prose-stone max-w-none text-charcoal/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between py-6 border-t border-b border-black/5 mb-16"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-charcoal/30" />
            <span className="text-sm text-charcoal/50">{post.category}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </motion.div>

        {/* Related Articles */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              Related Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}/`}
                  className="group block bg-white border border-black/5 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[16/10] bg-stone overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] tracking-widest uppercase text-charcoal/40">
                      {r.category}
                    </span>
                    <h3 className="text-sm font-medium text-charcoal mt-1 group-hover:text-champagne transition-colors leading-snug">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

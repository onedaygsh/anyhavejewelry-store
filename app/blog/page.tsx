"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products as defaultProducts } from "@/lib/data";
import { getAdminProducts, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { useI18n } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { ArrowRight, Clock, Tag, BookOpen } from "lucide-react";

export default function BlogPage() {
  const { locale } = useI18n();
  const { currency } = useCurrency();
  const [allProducts, setAllProducts] = useState(defaultProducts);

  const loadProducts = () => {
    const loaded = getAdminProducts(defaultProducts);
    setAllProducts(loaded);
  };

  useEffect(() => {
    loadProducts();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.products) loadProducts();
    });
  }, []);

  const featured = allProducts[0];
  const rest = allProducts.slice(1);
  const isZh = locale === "zh";

  const guides = [
    {
      title: isZh ? "莫桑石 vs 钻石：完整对比指南" : "Moissanite vs Diamond: The Complete Comparison",
      desc: isZh
        ? "深入了解莫桑石与钻石在亮度、硬度、价格和道德层面的差异，帮助您做出明智选择。"
        : "Discover the differences in brilliance, hardness, price, and ethics between moissanite and diamonds.",
      slug: "moissanite-vs-diamond-guide",
      readTime: isZh ? "12 分钟" : "12 min read",
      category: isZh ? "宝石科普" : "Gemstone Guide",
    },
    {
      title: isZh ? "如何挑选完美的订婚戒指" : "How to Choose the Perfect Engagement Ring",
      desc: isZh
        ? "从4C标准到戒指款式，从预算规划到尺寸测量，全面解析订婚戒指选购要点。"
        : "From the 4Cs to ring styles, budget planning to sizing — everything you need to know.",
      slug: "engagement-ring-buying-guide",
      readTime: isZh ? "15 分钟" : "15 min read",
      category: isZh ? "购买指南" : "Buying Guide",
    },
    {
      title: isZh ? "培育钻石的真相：您需要知道的一切" : "The Truth About Lab-Grown Diamonds",
      desc: isZh
        ? "它们是真正的钻石吗？如何制造的？与天然钻石有什么区别？一文解答所有疑问。"
        : "Are they real diamonds? How are they made? We answer the most common questions.",
      slug: "lab-grown-diamond-guide",
      readTime: isZh ? "10 分钟" : "10 min read",
      category: isZh ? "宝石科普" : "Gemstone Guide",
    },
  ];

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
            {isZh ? "珠宝知识与购买指南" : "Jewelry Knowledge & Buying Guides"}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
            {isZh ? "Anyhave 珠宝学院" : "Anyhave Jewelry Academy"}
          </h1>
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            {isZh
              ? "专业的珠宝科普文章与购买指南，助您在选购莫桑石和培育钻石时做出明智决策。"
              : "Expert jewelry guides and educational content to help you make informed decisions when shopping for moissanite and lab-grown diamonds."}
          </p>
        </motion.div>

        {/* Educational Guides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-5 h-5 text-charcoal/40" />
            <h2 className="font-serif text-2xl text-charcoal">
              {isZh ? "热门科普文章" : "Featured Guides"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <div
                key={guide.slug}
                className="group block bg-white border border-black/5 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-champagne" />
                  <span className="text-[10px] tracking-widest uppercase text-charcoal/40">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-base font-medium text-charcoal mb-2 group-hover:text-champagne transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-sm text-charcoal/50 line-clamp-2 mb-4">
                  {guide.desc}
                </p>
                <div className="flex items-center gap-1 text-xs text-charcoal/30">
                  <Clock className="w-3 h-3" />
                  {guide.readTime}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-black/5 mb-16" />

        {/* Product Guides Header */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-5 h-5 text-charcoal/40" />
          <h2 className="font-serif text-2xl text-charcoal">
            {isZh ? "产品深度指南" : "Product Deep Dives"}
          </h2>
        </div>

        {/* Featured Product Story */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <Link href={`/blog/${featured.slug}/`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 bg-white border border-black/5 overflow-hidden">
                <div className="aspect-[4/3] md:aspect-auto bg-stone overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-cream text-[10px] tracking-widest uppercase text-charcoal/60 border border-black/5">
                      {featured.tierLabel}
                    </span>
                    <span className="text-xs text-charcoal/30">
                      {featured.material}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 group-hover:text-champagne transition-colors">
                    {isZh ? `${featured.name}完全指南` : `The Complete Guide to ${featured.name}`}
                  </h2>
                  <p className="text-charcoal/50 leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xl font-light tracking-wide text-charcoal">
                      {formatPrice(featured.price, currency)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs text-champagne underline underline-offset-4">
                    {isZh ? "阅读完整指南" : "Read the Full Guide"}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Product Story Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <Link href={`/blog/${product.slug}/`} className="group block">
                <div className="aspect-[4/3] bg-stone overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] tracking-widest uppercase text-charcoal/40">
                    {product.tierLabel}
                  </span>
                  <span className="text-[10px] text-charcoal/20">|</span>
                  <span className="text-[10px] text-charcoal/30">
                    {isZh ? "购买指南" : "Buying Guide"}
                  </span>
                </div>
                <h3 className="text-base font-medium text-charcoal mb-2 group-hover:text-champagne transition-colors">
                  {isZh ? `${product.name}完全指南` : `Guide to ${product.name}`}
                </h3>
                <p className="text-sm text-charcoal/50 line-clamp-2 mb-3">
                  {product.description}
                </p>
                <p className="text-sm font-medium tracking-wide text-charcoal">
                  {formatPrice(product.price, currency)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

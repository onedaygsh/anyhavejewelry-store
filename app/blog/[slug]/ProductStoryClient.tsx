"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Gem, Sparkles, Ruler, Award, ShoppingBag, Heart } from "lucide-react";
import { products, getProductBySlug } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";

export default function ProductStoryClient({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const { currency } = useCurrency();
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const related = products
    .filter((p) => p.tier === product.tier && p.id !== product.id)
    .slice(0, 3);

  const has4C = product.carat || product.cut || product.clarity || product.color;

  const storyTitle = locale === "en" ? `The Story of ${product.name}` : `${product.name} 的故事`;
  const craftLabel = locale === "en" ? "Craftsmanship" : "工艺";
  const detailsLabel = locale === "en" ? "Product Details" : "产品详情";
  const specsLabel = locale === "en" ? "Specifications" : "规格参数";
  const relatedLabel = locale === "en" ? "More Stories" : "更多故事";
  const ctaLabel = locale === "en" ? "View Product" : "查看产品";

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === "en" ? "Back to Collection" : "返回系列"}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white text-[10px] tracking-widest uppercase text-charcoal/60 border border-black/5">
              {product.tierLabel}
            </span>
            <span className="text-xs text-charcoal/30">{product.material}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">
            {storyTitle}
          </h1>
          <p className="text-2xl font-light tracking-wide text-charcoal">
            {formatPrice(product.price, currency)}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="aspect-[16/9] bg-stone rounded-sm overflow-hidden mb-12"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-12 mb-16"
        >
          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
              {craftLabel}
            </p>
            <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
              {product.description}
            </p>
            <p className="text-charcoal/60 leading-relaxed">
              {locale === "en"
                ? `Every ${product.name} is meticulously handcrafted by our master artisans. From the initial sketch to the final polish, each step reflects our commitment to excellence. The ${product.metalOptions?.[0] || "precious metal"} setting is carefully shaped to maximize light exposure, allowing the stone to achieve its full brilliance.`
                : `每一枚${product.name}都由我们的大师工匠精心手工打造。从初始草图到最终抛光，每一步都体现了我们对卓越的承诺。${product.metalOptions?.[0] || "贵金属"}镶嵌经过精心塑形，以最大化光线 exposure，让宝石达到最璀璨的亮度。`}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
              {detailsLabel}
            </p>
            {has4C && (
              <div className="space-y-4 mb-6">
                {product.carat && (
                  <div className="flex items-center gap-3">
                    <Gem className="w-4 h-4 text-charcoal/40" />
                    <div>
                      <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Carat" : "克拉"}</p>
                      <p className="text-sm font-medium text-charcoal">{product.carat}</p>
                    </div>
                  </div>
                )}
                {product.cut && (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-charcoal/40" />
                    <div>
                      <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Cut" : "切工"}</p>
                      <p className="text-sm font-medium text-charcoal">{product.cut}</p>
                    </div>
                  </div>
                )}
                {product.clarity && (
                  <div className="flex items-center gap-3">
                    <Ruler className="w-4 h-4 text-charcoal/40" />
                    <div>
                      <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Clarity" : "净度"}</p>
                      <p className="text-sm font-medium text-charcoal">{product.clarity}</p>
                    </div>
                  </div>
                )}
                {product.color && (
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-charcoal/40" />
                    <div>
                      <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Color" : "颜色"}</p>
                      <p className="text-sm font-medium text-charcoal">{product.color}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {product.certification && (
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-black/5">
                <Award className="w-3 h-3 text-champagne" />
                <span className="text-xs text-charcoal/60">{product.certification} {locale === "en" ? "Certified" : "认证"}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Secondary Image */}
        {product.imageSecondary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <div className="aspect-[4/5] bg-stone overflow-hidden">
              <img
                src={product.imageSecondary}
                alt={`${product.name} detail`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 bg-white border border-black/5">
              <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
                {specsLabel}
              </p>
              <ul className="space-y-3">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm text-charcoal/60">
                    <Sparkles className="w-3 h-3 text-champagne" />
                    {spec}
                  </li>
                ))}
              </ul>
              {product.metalOptions && product.metalOptions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-black/5">
                  <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mb-2">
                    {locale === "en" ? "Available Metals" : "可选金属"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.metalOptions.map((m) => (
                      <span key={m} className="px-3 py-1 text-xs border border-black/10 text-charcoal/60">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <Link
            href={`/product/${product.slug}/`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {ctaLabel}
          </Link>
          <Link
            href="/design-your-own/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors"
          >
            <Heart className="w-4 h-4" />
            {locale === "en" ? "Customize This Style" : "定制此款式"}
          </Link>
        </motion.div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="border-t border-black/5 pt-12">
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              {relatedLabel}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}/`}
                  className="group block"
                >
                  <div className="aspect-[4/3] bg-stone overflow-hidden mb-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{p.tierLabel}</p>
                  <h3 className="text-sm font-medium text-charcoal group-hover:text-champagne transition-colors">
                    {p.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

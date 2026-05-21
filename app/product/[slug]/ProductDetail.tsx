"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product, products as defaultProducts } from "@/lib/data";
import { getAdminProducts, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { useI18n } from "@/lib/i18n/context";
import {
  ArrowLeft,
  Check,
  Shield,
  Truck,
  RotateCcw,
  ShoppingBag,
  Star,
  Gem,
  Ruler,
  Award,
  Sparkles,
  Clock,
} from "lucide-react";
import WishlistButton from "@/components/WishlistButton";
import GiftOptions from "@/components/GiftOptions";
import ShippingEstimator from "@/components/ShippingEstimator";
import ComplianceBadge from "@/components/ComplianceBadge";
import { getReviewsByProductId, getAverageRating } from "@/lib/reviews";

export default function ProductDetail({ product: initialProduct }: { product: Product }) {
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const { t, locale } = useI18n();
  const [metal, setMetal] = useState("");
  const [product, setProduct] = useState(initialProduct);
  const [allProducts, setAllProducts] = useState(defaultProducts);
  const [activeImage, setActiveImage] = useState(0);
  const [giftOptions, setGiftOptions] = useState({
    giftWrap: false,
    giftMessage: false,
    giftReceipt: false,
    message: "",
  });

  const loadProducts = () => {
    const loaded = getAdminProducts(defaultProducts);
    setAllProducts(loaded);
    const found = loaded.find((p) => p.id === initialProduct.id || p.slug === initialProduct.slug);
    if (found) {
      setProduct(found);
      setMetal(found.metalOptions?.[0] || "");
    }
  };

  useEffect(() => {
    loadProducts();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.products) loadProducts();
    });
  }, [initialProduct]);

  const related = allProducts
    .filter((p) => p.tier === product.tier && p.id !== product.id)
    .slice(0, 3);

  const productReviews = getReviewsByProductId(product.id);
  const avgRating = getAverageRating(product.id);

  const dateLocale = locale === "zh" ? "zh-CN" : "en-US";

  const images = [
    product.image,
    product.imageSecondary,
    ...(product.gallery || []),
  ].filter(Boolean) as string[];
  if (images.length === 0) images.push(product.image);

  const metalPriceAdjust: Record<string, number> = {
    "Sterling Silver": 0,
    "14K White Gold": 0,
    "14K Yellow Gold": 0,
    "14K Rose Gold": 0,
    "18K White Gold": 800,
    "18K Yellow Gold": 800,
    "Platinum": 1500,
  };

  const finalPrice = product.price + (metalPriceAdjust[metal] || 0);

  const has4C = product.carat || product.cut || product.clarity || product.color;

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products/"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.productDetail.back}
          </Link>
        </div>

        {/* Product Main */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[4/5] bg-stone relative overflow-hidden">
                <img
                  src={images[activeImage] || product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-[10px] tracking-widest uppercase text-charcoal/70">
                    {product.tierLabel}
                  </span>
                </div>
                {product.certification && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-charcoal/90 backdrop-blur text-[10px] tracking-widest uppercase text-white flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {product.certification}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 bg-stone relative overflow-hidden border-2 transition-all ${
                        activeImage === i ? "border-charcoal" : "border-transparent hover:border-charcoal/30"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-3">
              {product.tierLabel}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            {avgRating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(avgRating)
                          ? "fill-warm-gold text-warm-gold"
                          : "fill-transparent text-charcoal/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-charcoal/60">
                  {avgRating} ({productReviews.length} {locale === "en" ? "reviews" : "评价"})
                </span>
              </div>
            )}

            <p className="text-2xl font-light tracking-wide text-charcoal mb-6">
              {formatPrice(finalPrice, currency)}
            </p>

            <p className="text-charcoal/60 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* 4C Info */}
            {has4C && (
              <div className="grid grid-cols-4 gap-3 mb-8 p-4 bg-cream border border-black/5">
                {product.carat && (
                  <div className="text-center">
                    <Gem className="w-4 h-4 text-charcoal/40 mx-auto mb-1" />
                    <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Carat" : "克拉"}</p>
                    <p className="text-sm font-medium text-charcoal">{product.carat}</p>
                  </div>
                )}
                {product.cut && (
                  <div className="text-center">
                    <Sparkles className="w-4 h-4 text-charcoal/40 mx-auto mb-1" />
                    <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Cut" : "切工"}</p>
                    <p className="text-sm font-medium text-charcoal">{product.cut}</p>
                  </div>
                )}
                {product.clarity && (
                  <div className="text-center">
                    <Ruler className="w-4 h-4 text-charcoal/40 mx-auto mb-1" />
                    <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Clarity" : "净度"}</p>
                    <p className="text-sm font-medium text-charcoal">{product.clarity}</p>
                  </div>
                )}
                {product.color && (
                  <div className="text-center">
                    <Award className="w-4 h-4 text-charcoal/40 mx-auto mb-1" />
                    <p className="text-[10px] tracking-wider uppercase text-charcoal/40">{locale === "en" ? "Color" : "颜色"}</p>
                    <p className="text-sm font-medium text-charcoal">{product.color}</p>
                  </div>
                )}
              </div>
            )}

            {/* Specs */}
            <div className="border-t border-black/5 pt-6 mb-6">
              <h3 className="text-sm font-medium tracking-wide mb-4">
                {t.productDetail.specs}
              </h3>
              <ul className="space-y-2">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-3 text-sm text-charcoal/60"
                  >
                    <Check className="w-4 h-4 text-champagne" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metal Selector */}
            {product.metalOptions && product.metalOptions.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium tracking-wide mb-3">
                  {locale === "en" ? "Metal" : "金属"}
                  {metal && (
                    <span className="text-charcoal/40 font-normal ml-2">
                      — {metal}
                    </span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.metalOptions.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetal(m)}
                      className={`px-4 py-2.5 text-sm border transition-all ${
                        metal === m
                          ? "border-charcoal bg-charcoal text-white"
                          : "border-black/10 text-charcoal/70 hover:border-charcoal/30"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Ship Date */}
            <div className="flex items-center gap-2 mb-5 p-3 bg-cream border border-black/5">
              <Clock className="w-4 h-4 text-champagne flex-shrink-0" />
              <p className="text-sm text-charcoal/70">
                {locale === "en"
                  ? "Ships within 5-7 business days from our studio"
                  : "5-7 个工作日内从我们的工作室发货"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={() => addItem(product, 1, metal || undefined)}
                className="w-full px-8 py-4 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {t.productDetail.addToBag}
              </button>
              <div className="flex gap-3">
                <Link
                  href="/design-your-own/"
                  className="flex-1 px-8 py-4 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors text-center"
                >
                  {locale === "en" ? "CUSTOMIZE THIS STYLE" : "定制此款式"}
                </Link>
                <WishlistButton
                  product={product}
                  className="px-4 py-4 border border-black/10 hover:border-champagne/50 hover:bg-cream transition-colors"
                  iconClassName="w-5 h-5"
                />
              </div>
            </div>

            {/* Gift Options */}
            <GiftOptions onToggle={setGiftOptions} />

            {/* Shipping Estimator */}
            <ShippingEstimator freeShippingThreshold={75} />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 text-center py-5 border-t border-black/5">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-5 h-5 text-charcoal/40" />
                <span className="text-[10px] tracking-wider text-charcoal/50 uppercase">
                  {t.productDetail.authentic}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-5 h-5 text-charcoal/40" />
                <span className="text-[10px] tracking-wider text-charcoal/50 uppercase">
                  {t.productDetail.freeShipping}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RotateCcw className="w-5 h-5 text-charcoal/40" />
                <span className="text-[10px] tracking-wider text-charcoal/50 uppercase">
                  {t.productDetail.returns}
                </span>
              </div>
            </div>

            {/* Compliance */}
            <ComplianceBadge />
          </motion.div>
        </div>

        {/* Detail Content */}
        {product.detailContent && (
          <div className="border-t border-black/5 pt-16 mb-24">
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              {locale === "en" ? "Product Details" : "产品详情"}
            </h2>
            <div
              className="prose prose-stone max-w-none text-charcoal/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.detailContent }}
            />
          </div>
        )}

        {/* Reviews */}
        {productReviews.length > 0 && (
          <div className="border-t border-black/5 pt-16 mb-24">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-serif text-2xl text-charcoal">
                {t.productDetail.reviews}
              </h2>
              <span className="text-sm text-charcoal/50">
                ({productReviews.length})
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-cream p-6 border border-black/5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "fill-warm-gold text-warm-gold"
                              : "fill-transparent text-charcoal/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-charcoal/40">
                      {new Date(review.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                    {review.content}
                  </p>
                  <p className="text-xs text-charcoal/40 font-medium">
                    {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="border-t border-black/5 pt-16">
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              {t.productDetail.related}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}/`}
                  className="group block"
                >
                  <div className="aspect-[4/5] bg-stone relative overflow-hidden mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <h3 className="text-sm font-medium text-charcoal group-hover:text-champagne transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-charcoal/50 mt-1">
                    {formatPrice(p.price, currency)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

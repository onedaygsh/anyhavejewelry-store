"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, X } from "lucide-react";
import { useWishlist } from "@/components/WishlistProvider";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { useI18n } from "@/lib/i18n/context";

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const { t } = useI18n();

  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <Link
            href="/products/"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.wishlist.continueShopping}
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
            {t.wishlist.title}
          </h1>
          <p className="text-sm text-charcoal/50 mt-2">
            {t.wishlist.itemCount.replace("{n}", String(items.length))}
          </p>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center"
          >
            <Heart className="w-16 h-16 text-charcoal/15 mx-auto mb-6" />
            <h2 className="text-xl font-medium text-charcoal mb-2">
              {t.wishlist.emptyTitle}
            </h2>
            <p className="text-sm text-charcoal/50 mb-8">
              {t.wishlist.emptyDesc}
            </p>
            <Link
              href="/products/"
              className="inline-block px-8 py-4 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
            >
              {t.wishlist.exploreCollection}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/product/${product.slug}/`}
                  className="group block"
                >
                  <div className="aspect-[4/5] bg-stone relative overflow-hidden mb-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] tracking-widest uppercase text-charcoal/70">
                        {product.tierLabel}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        remove(product.id);
                      }}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                      aria-label={t.wishlist.remove}
                    >
                      <X className="w-4 h-4 text-charcoal/60" />
                    </button>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>

                  <h3 className="text-base font-medium text-charcoal mb-1 group-hover:text-champagne transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-charcoal/50 mb-2">
                    {product.material}
                  </p>
                  <p className="text-sm font-medium tracking-wide mb-3">
                    {formatPrice(product.price, currency)}
                  </p>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product, 1);
                  }}
                  className="w-full py-3 border border-black/10 text-xs tracking-widest uppercase text-charcoal/70 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {t.wishlist.addToBag}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

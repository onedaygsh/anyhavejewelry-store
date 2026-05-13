"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { ArrowLeft, Minus, Plus, X, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

export default function CartPage() {
  const { items, removeItem, setQuantity, total, count } = useCart();
  const { currency } = useCurrency();
  const { t } = useI18n();

  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/products/"
            className="inline-flex items-center gap-2 text-sm text-obsidian/50 hover:text-obsidian transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.cart.continue}
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-obsidian">
            {t.cart.title}
          </h1>
          <p className="text-sm text-obsidian/50 mt-2">
            {t.cart.itemsCount.replace("{n}", String(count))}
          </p>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center"
          >
            <ShoppingBag className="w-16 h-16 text-obsidian/15 mx-auto mb-6" />
            <h2 className="text-xl font-medium text-obsidian mb-2">
              {t.cart.empty}
            </h2>
            <p className="text-sm text-obsidian/50 mb-8">
              {t.cart.emptyDesc}
            </p>
            <Link
              href="/products/"
              className="inline-block px-8 py-4 bg-obsidian text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
            >
              {t.cart.explore}
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Items */}
            <div className="md:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size || "no-size"}`}
                  className="flex gap-5 pb-6 border-b border-black/5"
                >
                  <div className="w-24 h-28 bg-stone flex-shrink-0 relative overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}/`}
                          className="text-base font-medium text-obsidian hover:text-warm-gold transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-obsidian/50 mt-1">
                          {item.product.material}{item.size ? ` · Size ${item.size}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-1 text-obsidian/30 hover:text-obsidian/70 transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-black/10">
                        <button
                          onClick={() =>
                            setQuantity(item.product.id, item.quantity - 1, item.size)
                          }
                          className="px-3 py-2 hover:bg-black/5 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 py-2 text-sm min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(item.product.id, item.quantity + 1, item.size)
                          }
                          className="px-3 py-2 hover:bg-black/5 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="md:col-span-1">
              <div className="bg-stone p-6 sticky top-28">
                <h2 className="font-medium text-obsidian mb-6">{t.cart.summary}</h2>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-obsidian/60">
                    <span>{t.cart.subtotal}</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>
                  <div className="flex justify-between text-obsidian/60">
                    <span>{t.cart.shipping}</span>
                    <span>{t.cart.free}</span>
                  </div>
                  <div className="border-t border-black/5 pt-3 flex justify-between font-medium text-base">
                    <span>{t.cart.total}</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout/"
                  className="block w-full py-4 bg-obsidian text-white text-center text-sm tracking-widest font-medium hover:bg-graphite transition-colors mb-4"
                >
                  {t.cart.checkout}
                </Link>

                <div className="space-y-2 text-xs text-obsidian/40 text-center">
                  <p>{t.cart.shippingInfo}</p>
                  <p>{t.cart.payment}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

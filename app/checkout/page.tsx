"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/lib/currency/context";
import { formatPrice } from "@/lib/currency/utils";
import { addOrder, type Order, getCustomizeContent, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";
import { ArrowLeft, Check, CreditCard, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const { currency } = useCurrency();
  const { t } = useI18n();
  const [payment, setPayment] = useState("alipay");
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "alipay", label: "Alipay", icon: "A" },
    { id: "wechat", label: "WeChat Pay", icon: "W" },
    { id: "card", label: "Credit Card", icon: "C" },
  ]);

  const loadPaymentMethods = () => {
    const config = getCustomizeContent();
    if (config.paymentMethods && config.paymentMethods.length > 0) {
      setPaymentMethods(config.paymentMethods);
      // Reset payment if current selection no longer exists
      const exists = config.paymentMethods.some((m) => m.id === payment);
      if (!exists && config.paymentMethods[0]) {
        setPayment(config.paymentMethods[0].id);
      }
    }
  };

  useEffect(() => {
    loadPaymentMethods();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.customizeContent) loadPaymentMethods();
    });
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
    note: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "ORD-" + Date.now().toString(36).toUpperCase();
    const order: Order = {
      id,
      customerName: `${form.firstName} ${form.lastName}`.trim(),
      customerEmail: form.email,
      customerPhone: form.phone,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      country: form.country,
      paymentMethod: paymentMethods.find((m) => m.id === payment)?.label || payment,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
      })),
      total,
      status: "pending",
      note: form.note,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    setOrderId(id);
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="bg-cream min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-champagne" />
          </div>
          <h1 className="font-serif text-3xl text-charcoal mb-4">
            {t.checkout.orderReceived}
          </h1>
          <p className="text-charcoal/60 mb-2">
            {t.checkout.thankYou}
          </p>
          <p className="text-sm text-charcoal/40 mb-8 font-mono">
            {t.checkout.orderId}: {orderId}
          </p>
          <Link
            href="/products/"
            className="inline-block px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
          >
            {t.checkout.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="font-serif text-3xl text-charcoal mb-4">
            {t.checkout.emptyBag}
          </h1>
          <p className="text-charcoal/60 mb-8">
            {t.checkout.addItemsDesc}
          </p>
          <Link
            href="/products/"
            className="inline-block px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
          >
            {t.checkout.exploreCollection}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/cart/"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.checkout.backToCart}
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
            {t.checkout.title}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping */}
            <div className="bg-white p-8 border border-black/5">
              <h2 className="font-medium text-charcoal mb-6 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                {t.checkout.shippingAddress}
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">
                      {t.checkout.firstName} *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">
                      {t.checkout.lastName} *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">
                    {t.checkout.email} *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">
                    {t.checkout.phone} *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">
                    {t.checkout.address} *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                    placeholder={t.checkout.addressPlaceholder}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">
                      {t.checkout.city} *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">
                      {t.checkout.postalCode} *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => handleChange("postalCode", e.target.value)}
                      className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">
                    {t.checkout.country} *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">
                    {t.checkout.orderNote}
                  </label>
                  <textarea
                    rows={2}
                    value={form.note}
                    onChange={(e) => handleChange("note", e.target.value)}
                    className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors resize-none"
                    placeholder={t.checkout.specialRequests}
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-8 border border-black/5">
              <h2 className="font-medium text-charcoal mb-6 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {t.checkout.paymentMethod}
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayment(m.id)}
                    className={`w-full flex items-center gap-4 p-4 border transition-all ${
                      payment === m.id
                        ? "border-champagne bg-cream/50"
                        : "border-black/5 hover:border-champagne/30"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-xs font-medium text-charcoal/70">
                      {m.icon}
                    </div>
                    <span className="text-sm text-charcoal">{m.label}</span>
                    {payment === m.id && (
                      <Check className="w-4 h-4 text-champagne ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
            >
              {t.checkout.placeOrder}
            </button>
          </form>

          {/* Right: Summary */}
          <div>
            <div className="bg-white p-8 border border-black/5 sticky top-28">
              <h2 className="font-medium text-charcoal mb-6">
                {t.checkout.orderSummary} ({count} {count === 1 ? 'item' : 'items'})
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size || "no-size"}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-stone flex-shrink-0 relative overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-charcoal/40 mt-0.5">
                        {t.productDetail.quantity}: {item.quantity}{item.size ? ` · ${t.productDetail.finishColor}: ${item.size}` : ""}
                      </p>
                    </div>
                    <span className="text-sm text-charcoal">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/5 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-charcoal/60">
                  <span>{t.cart.subtotal}</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>{t.cart.shipping}</span>
                  <span>{t.cart.free}</span>
                </div>
                <div className="border-t border-black/5 pt-2 flex justify-between font-medium text-base">
                  <span>{t.cart.total}</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

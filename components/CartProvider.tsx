"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product } from "@/lib/data";
import { CartItem, getCart, saveCart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } from "@/lib/cart";
import { formatPrice } from "@/lib/currency/utils";
import { useCurrency } from "@/lib/currency/context";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  setQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(getCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1, size?: string) => {
    setItems((prev) => addToCart(prev, product, quantity, size));
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size?: string) => {
    setItems((prev) => removeFromCart(prev, productId, size));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number, size?: string) => {
    setItems((prev) => updateQuantity(prev, productId, quantity, size));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = getCartTotal(items);
  const count = getCartCount(items);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clearCart, total, count, isOpen, setIsOpen }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { items, removeItem, setQuantity, total, count, isOpen, setIsOpen } = useCart();
  const { currency } = useCurrency();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
            <h2 className="font-serif text-xl tracking-wide">Shopping Bag</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-obsidian/40">
                <svg className="w-12 h-12 mb-4 opacity-40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                <p className="text-sm">Your shopping bag is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size || "no-size"}`} className="flex gap-4">
                    <div className="w-20 h-24 bg-stone flex-shrink-0 relative overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-obsidian truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-obsidian/50 mt-1">{item.product.material}{item.size ? ` · Size ${item.size}` : ""}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-black/10">
                          <button
                            onClick={() => setQuantity(item.product.id, item.quantity - 1, item.size)}
                            className="px-3 py-1 text-sm hover:bg-black/5 transition-colors"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-sm min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.product.id, item.quantity + 1, item.size)}
                            className="px-3 py-1 text-sm hover:bg-black/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="self-start p-1 text-obsidian/30 hover:text-obsidian/70 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-black/5 px-6 py-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-obsidian/60">Subtotal ({count} items)</span>
                <span className="font-medium text-lg">{formatPrice(total, currency)}</span>
              </div>
              <p className="text-xs text-obsidian/40">Shipping and tax calculated at checkout</p>
              <a
                href="/cart/"
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 bg-obsidian text-white text-center text-sm tracking-widest font-medium hover:bg-graphite transition-colors"
              >
                Checkout
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

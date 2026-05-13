import { Product } from "./data";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

const CART_KEY = "anyhave-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(items: CartItem[], product: Product, quantity = 1, size?: string): CartItem[] {
  const existing = items.find((i) => i.product.id === product.id && i.size === size);
  if (existing) {
    return items.map((i) =>
      i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + quantity } : i
    );
  }
  return [...items, { product, quantity, size }];
}

export function removeFromCart(items: CartItem[], productId: string, size?: string): CartItem[] {
  return items.filter((i) => !(i.product.id === productId && i.size === size));
}

export function updateQuantity(items: CartItem[], productId: string, quantity: number, size?: string): CartItem[] {
  if (quantity <= 0) return removeFromCart(items, productId, size);
  return items.map((i) => (i.product.id === productId && i.size === size ? { ...i, quantity } : i));
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

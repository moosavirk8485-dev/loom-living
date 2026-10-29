"use client";

import { useSyncExternalStore } from "react";
import { getProduct, type Product } from "./products";

export type CartItem = {
  id: string;
  slug: string;
  color: string;
  size: string;
  quantity: number;
};

type State = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
};

// Cart and wishlist live in localStorage; there is no backend.
const STORAGE_KEY = "loom-and-living";
const serverState: State = { cart: [], wishlist: [], cartOpen: false };
const listeners = new Set<() => void>();
let state: State | null = null;

function load(): State {
  if (state) return state;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    state = {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      cartOpen: false,
    };
  } catch {
    state = { ...serverState };
  }
  return state;
}

function setState(update: (s: State) => Partial<State>) {
  const current = load();
  state = { ...current, ...update(current) };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: state.cart, wishlist: state.wishlist }));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useStore() {
  return useSyncExternalStore(subscribe, load, () => serverState);
}

export const actions = {
  addToCart(item: Omit<CartItem, "id">) {
    const id = `${item.slug}|${item.color}|${item.size}`;
    setState((s) => {
      const existing = s.cart.find((i) => i.id === id);
      const cart = existing
        ? s.cart.map((i) => (i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i))
        : [...s.cart, { ...item, id }];
      return { cart, cartOpen: true };
    });
  },
  setQuantity(id: string, quantity: number) {
    setState((s) => ({
      cart:
        quantity <= 0
          ? s.cart.filter((i) => i.id !== id)
          : s.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },
  removeFromCart(id: string) {
    setState((s) => ({ cart: s.cart.filter((i) => i.id !== id) }));
  },
  clearCart() {
    setState(() => ({ cart: [] }));
  },
  toggleWishlist(slug: string) {
    setState((s) => ({
      wishlist: s.wishlist.includes(slug) ? s.wishlist.filter((w) => w !== slug) : [...s.wishlist, slug],
    }));
  },
  openCart() {
    setState(() => ({ cartOpen: true }));
  },
  closeCart() {
    setState(() => ({ cartOpen: false }));
  },
};

export type CartLine = CartItem & { product: Product };

export function getCartLines(cart: CartItem[]): CartLine[] {
  return cart.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ ...item, product }] : [];
  });
}

export function getCartTotals(lines: CartLine[]) {
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((n, l) => n + l.quantity * l.product.price, 0);
  return { count, subtotal };
}

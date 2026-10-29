"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { actions, getCartLines, getCartTotals, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { QuantityPicker } from "./quantity-picker";
import { ShippingProgress } from "./order-summary";

export function CartDrawer() {
  const { cart, cartOpen } = useStore();
  const lines = getCartLines(cart);
  const { count, subtotal } = getCartTotals(lines);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && actions.closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="animate-fade-in absolute inset-0 bg-sage-900/40" onClick={actions.closeCart} />
      <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-linen shadow-2xl">
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <h2 className="font-serif text-2xl">Your bag ({count})</h2>
          <button aria-label="Close cart" onClick={actions.closeCart} className="rounded-full p-1 hover:bg-sage-100">
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="rounded-full bg-blush-100 p-5">
              <ShoppingBag className="size-8 text-blush-500" strokeWidth={1.25} />
            </div>
            <p className="font-serif text-xl">Your bag is empty</p>
            <Link
              href="/shop"
              onClick={actions.closeCart}
              className="rounded-full bg-sage-700 px-7 py-3 text-sm font-medium text-linen transition hover:bg-sage-800"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-sand bg-sage-50 px-6 py-4">
              <ShippingProgress subtotal={subtotal} />
            </div>
            <ul className="flex-1 divide-y divide-sand overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${line.slug}`}
                    onClick={actions.closeCart}
                    className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-cream"
                  >
                    <Image src={line.product.images[0]} alt={line.product.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/products/${line.slug}`}
                        onClick={actions.closeCart}
                        className="font-serif text-base leading-snug hover:underline"
                      >
                        {line.product.name}
                      </Link>
                      <span className="text-sm font-medium">{formatPrice(line.product.price * line.quantity)}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink/60">
                      {line.color}
                      {line.size !== "One Size" && ` / ${line.size}`}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityPicker size="sm" value={line.quantity} onChange={(q) => actions.setQuantity(line.id, q)} />
                      <button
                        onClick={() => actions.removeFromCart(line.id)}
                        className="text-xs text-ink/60 underline underline-offset-2 hover:text-blush-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-sand px-6 py-5">
              <div className="flex justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/60">Shipping calculated at checkout.</p>
              <Link
                href="/checkout"
                onClick={actions.closeCart}
                className="block rounded-full bg-sage-700 py-3.5 text-center text-sm font-medium text-linen transition hover:bg-sage-800"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={actions.closeCart}
                className="block rounded-full border border-sage-700 py-3.5 text-center text-sm font-medium text-sage-800 transition hover:bg-sage-100"
              >
                View bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { QuantityPicker } from "@/components/quantity-picker";
import { OrderTotals, ShippingProgress } from "@/components/order-summary";
import { actions, getCartLines, getCartTotals, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export function CartView() {
  const { cart } = useStore();
  const lines = getCartLines(cart);
  const { count, subtotal } = getCartTotals(lines);

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
        <div className="rounded-full bg-blush-100 p-6">
          <ShoppingBag className="size-10 text-blush-500" strokeWidth={1.25} />
        </div>
        <h1 className="mt-6 font-serif text-5xl text-sage-900">Your bag is empty</h1>
        <p className="mt-3 text-ink/70">Find something soft and lovely for your home.</p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-5xl text-sage-900">Your bag</h1>
      <p className="mt-2 text-ink/60">
        {count} {count === 1 ? "item" : "items"}
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-sand border-y border-sand">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-5 py-6">
              <Link
                href={`/products/${line.slug}`}
                className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-cream sm:w-32"
              >
                <Image src={line.product.images[0]} alt={line.product.name} fill sizes="128px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/products/${line.slug}`} className="font-serif text-xl hover:underline">
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-ink/60">
                      {line.color}
                      {line.size !== "One Size" && ` / ${line.size}`}
                    </p>
                    <p className="mt-1 text-sm text-ink/60">{formatPrice(line.product.price)} each</p>
                  </div>
                  <button
                    aria-label={`Remove ${line.product.name}`}
                    onClick={() => actions.removeFromCart(line.id)}
                    className="self-start rounded-full p-1 text-ink/40 hover:bg-blush-100 hover:text-blush-600"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <QuantityPicker size="sm" value={line.quantity} onChange={(q) => actions.setQuantity(line.id, q)} />
                  <span className="font-medium">{formatPrice(line.product.price * line.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-3xl bg-cream p-6 lg:sticky lg:top-32">
          <h2 className="font-serif text-3xl">Order summary</h2>
          <div className="mt-6">
            <ShippingProgress subtotal={subtotal} />
          </div>
          <OrderTotals subtotal={subtotal} />
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-sage-700 py-4 text-center text-sm font-medium text-linen transition hover:bg-sage-800"
          >
            Proceed to checkout
          </Link>
          <Link href="/shop" className="mt-4 block text-center text-sm text-sage-700 underline underline-offset-4">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

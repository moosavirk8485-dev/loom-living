"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { useStore } from "@/lib/store";
import { getProduct, type Product } from "@/lib/products";

export function WishlistView() {
  const { wishlist } = useStore();
  const saved = wishlist.map(getProduct).filter((p): p is Product => !!p);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-5xl text-sage-900">Wishlist</h1>
      {saved.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <div className="rounded-full bg-blush-100 p-6">
            <Heart className="size-10 text-blush-500" strokeWidth={1.25} />
          </div>
          <p className="mt-6 font-serif text-3xl">Nothing saved yet</p>
          <p className="mt-2 text-ink/70">Tap the heart on any piece to save it for later.</p>
          <Link
            href="/shop"
            className="mt-8 rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
          >
            Explore the shop
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-2 text-ink/60">
            {saved.length} saved {saved.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="mt-10">
            <ProductGrid products={saved} />
          </div>
        </>
      )}
    </div>
  );
}

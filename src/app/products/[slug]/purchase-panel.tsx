"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { QuantityPicker } from "@/components/quantity-picker";
import { WishlistButton } from "@/components/wishlist-button";
import { actions } from "@/lib/store";
import type { Product } from "@/lib/products";

export function PurchasePanel({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const hasSizes = product.sizes.length > 1;

  function addToCart() {
    actions.addToCart({ slug: product.slug, color, size, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="text-sm">
          <span className="font-medium">Colour:</span> <span className="text-ink/70">{color}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              aria-label={c.name}
              aria-pressed={color === c.name}
              onClick={() => setColor(c.name)}
              className={`size-9 rounded-full ring-1 ring-ink/15 transition ${
                color === c.name ? "outline-2 outline-offset-2 outline-sage-600" : "hover:scale-110"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {hasSizes && (
        <div>
          <p className="text-sm">
            <span className="font-medium">Size:</span> <span className="text-ink/70">{size}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-11 min-w-20 rounded-full border px-4 text-sm transition ${
                  size === s
                    ? "border-sage-700 bg-sage-700 text-linen"
                    : "border-sand bg-white/60 hover:border-sage-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <QuantityPicker value={quantity} onChange={setQuantity} />
        <button
          onClick={addToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sage-700 text-sm font-medium text-linen transition hover:bg-sage-800"
        >
          {added ? (
            <>
              <Check className="size-4" /> Added to bag
            </>
          ) : (
            "Add to bag"
          )}
        </button>
        <WishlistButton slug={product.slug} variant="outline" />
      </div>
    </div>
  );
}

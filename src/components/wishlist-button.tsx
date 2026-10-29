"use client";

import { Heart } from "lucide-react";
import { actions, useStore } from "@/lib/store";

const variants = {
  floating: "rounded-full bg-linen/90 p-2 shadow-sm hover:scale-110",
  outline: "size-12 rounded-full border border-sand bg-white/60 hover:border-blush-400",
};

export function WishlistButton({
  slug,
  variant = "floating",
  className = "",
}: {
  slug: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const { wishlist } = useStore();
  const saved = wishlist.includes(slug);
  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={() => actions.toggleWishlist(slug)}
      className={`flex shrink-0 items-center justify-center transition ${variants[variant]} ${className}`}
    >
      <Heart className={`size-4 ${saved ? "fill-blush-400 text-blush-500" : "text-ink/70"}`} />
    </button>
  );
}

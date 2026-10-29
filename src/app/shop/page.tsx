import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop All" };

export default function ShopPage() {
  return (
    <ShopView
      title="Shop All"
      blurb="Soft furnishings and finishing touches for every room, in sage, blush and natural linen."
      products={products}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopView } from "@/components/shop-view";
import { categories, getCategory, products } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  return category ? { title: category.name, description: category.blurb } : {};
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  return (
    <ShopView
      title={category.name}
      blurb={category.blurb}
      products={products.filter((p) => p.category === category.slug)}
      active={category.slug}
    />
  );
}

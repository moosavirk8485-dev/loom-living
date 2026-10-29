"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductGrid } from "./product-card";
import { categories, type CategorySlug, type Product } from "@/lib/products";

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "popular", label: "Most popular" },
  { id: "rating", label: "Top rated" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

function sortProducts(list: Product[], sort: string) {
  const sorted = [...list];
  if (sort === "popular") sorted.sort((a, b) => b.reviews - a.reviews);
  if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  return sorted;
}

export function ShopView({
  title,
  blurb,
  products,
  active,
}: {
  title: string;
  blurb: string;
  products: Product[];
  active?: CategorySlug;
}) {
  const [sort, setSort] = useState("featured");
  const [saleOnly, setSaleOnly] = useState(false);
  const results = sortProducts(
    saleOnly ? products.filter((p) => p.compareAt !== undefined) : products,
    sort,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-sage-100 px-6 py-12 text-center sm:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-sage-600">Loom &amp; Living</p>
        <h1 className="mt-3 font-serif text-5xl text-sage-900 sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">{blurb}</p>
      </div>

      <div className="-mx-4 mt-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
          <CategoryPill href="/shop" active={!active}>
            All
          </CategoryPill>
          {categories.map((cat) => (
            <CategoryPill key={cat.slug} href={`/shop/${cat.slug}`} active={active === cat.slug}>
              {cat.name}
            </CategoryPill>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-sand py-4">
        <div className="flex items-center gap-5">
          <p className="text-sm text-ink/60">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={saleOnly}
              onChange={(e) => setSaleOnly(e.target.checked)}
              className="size-4 accent-sage-600"
            />
            On sale
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-ink/60">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-sand bg-white/60 px-4 py-2 text-sm outline-none focus:border-sage-500"
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10">
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl">Nothing on sale here right now</p>
            <button onClick={() => setSaleOnly(false)} className="mt-4 text-sm text-sage-700 underline">
              Show all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryPill({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm transition ${
        active
          ? "border-sage-700 bg-sage-700 text-linen"
          : "border-sand bg-white/50 text-ink/80 hover:border-sage-400 hover:bg-sage-50"
      }`}
    >
      {children}
    </Link>
  );
}

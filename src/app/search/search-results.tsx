"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { getCategory, products } from "@/lib/products";

export function SearchResults() {
  const query = useSearchParams().get("q")?.trim() ?? "";
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = products.filter((p) => {
    const haystack = `${p.name} ${getCategory(p.category)?.name} ${p.description} ${p.colors
      .map((c) => c.name)
      .join(" ")}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-sage-600">Search</p>
      <h1 className="mt-2 font-serif text-4xl text-sage-900 sm:text-5xl">
        {query ? <>Results for “{query}”</> : "Search our collection"}
      </h1>
      <p className="mt-2 text-ink/60">
        {results.length} {results.length === 1 ? "product" : "products"}
      </p>
      <div className="mt-10">
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl">No matches found</p>
            <p className="mt-2 text-ink/60">Try “linen”, “tray” or “blush”.</p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-sage-700 px-7 py-3 text-sm font-medium text-linen hover:bg-sage-800"
            >
              Browse everything
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

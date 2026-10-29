import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./search-results";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="h-12 w-72 animate-pulse rounded-full bg-sand" />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}

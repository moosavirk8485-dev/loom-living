"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { categories } from "@/lib/products";
import { actions, getCartLines, getCartTotals, useStore } from "@/lib/store";
import { Logo } from "./logo";

const nav = categories.map((cat) => ({ href: `/shop/${cat.slug}`, label: cat.name }));

export function Header() {
  const { cart, wishlist } = useStore();
  const { count } = getCartTotals(getCartLines(cart));
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-linen/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button aria-label="Open menu" onClick={() => setMenuOpen(true)} className="-ml-2 p-2 lg:hidden">
          <Menu className="size-5" />
        </button>

        <Logo />

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2 transition hover:bg-sage-100"
          >
            <Search className="size-5" />
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden rounded-full p-2 transition hover:bg-sage-100 sm:block"
          >
            <Heart className="size-5" />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <button
            aria-label="Open cart"
            onClick={actions.openCart}
            className="relative rounded-full p-2 transition hover:bg-sage-100"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && <Badge>{count}</Badge>}
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-sand/60 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-9 px-8 py-3">
          <Link href="/shop" className="text-sm font-medium transition hover:text-sage-600">
            Shop All
          </Link>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink/80 transition hover:text-sage-600">
              {item.label}
            </Link>
          ))}
          <Link href="/about" className="text-sm text-ink/80 transition hover:text-sage-600">
            Our Story
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div className="animate-fade-in border-t border-sand bg-linen">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
            <Search className="size-5 text-sage-500" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cushion covers, trays, tissue boxes…"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-ink/40"
            />
            <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="p-1">
              <X className="size-5" />
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="animate-fade-in absolute inset-0 bg-sage-900/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-linen p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Logo onClick={() => setMenuOpen(false)} />
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col">
              {[{ href: "/shop", label: "Shop All" }, ...nav, { href: "/about", label: "Our Story" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-sand/70 py-3.5 font-serif text-xl"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex items-center gap-2 text-sm"
              >
                <Heart className="size-4" /> Wishlist ({wishlist.length})
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-blush-400 text-[10px] font-semibold text-white">
      {children}
    </span>
  );
}

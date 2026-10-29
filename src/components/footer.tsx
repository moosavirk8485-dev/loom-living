import Link from "next/link";
import { categories } from "@/lib/products";
import { Newsletter } from "./newsletter";

const columns = [
  {
    title: "Shop",
    links: categories.map((cat) => ({ href: `/shop/${cat.slug}`, label: cat.name })),
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/contact#faq", label: "Shipping & delivery" },
      { href: "/contact#faq", label: "Returns & exchanges" },
      { href: "/contact#faq", label: "Care guide" },
    ],
  },
  {
    title: "Loom & Living",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/about#craft", label: "Our makers" },
      { href: "/wishlist", label: "Wishlist" },
      { href: "/cart", label: "Your bag" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-sage-800 text-sage-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-serif text-3xl text-linen">
              Loom <span className="italic text-blush-300">&amp;</span> Living
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sage-200">
              Soft furnishings and little luxuries for a calmer, cosier home. Thoughtfully made in natural
              fabrics and gentle colours.
            </p>
            <p className="mt-8 text-sm font-medium text-linen">Join our circle</p>
            <p className="mb-4 mt-1 text-sm text-sage-200">New collections, styling notes and 10% off your first order.</p>
            <Newsletter />
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-linen">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-sage-200">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-blush-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-sage-600 pt-8 text-xs text-sage-300 sm:flex-row sm:justify-between">
          <p>© 2026 Loom &amp; Living. All rights reserved.</p>
          <p>Made with care for slow, beautiful living.</p>
        </div>
      </div>
    </footer>
  );
}

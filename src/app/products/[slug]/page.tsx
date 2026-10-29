import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { FREE_SHIPPING_THRESHOLD, formatPrice, getCategory, getProduct, getRelated, products } from "@/lib/products";
import { Gallery } from "./gallery";
import { PurchasePanel } from "./purchase-panel";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = getRelated(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 text-xs text-ink/60">
        <Link href="/" className="hover:text-sage-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/${category.slug}`} className="hover:text-sage-700">{category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Gallery key={product.slug} images={product.images} name={product.name} />

        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs uppercase tracking-[0.2em] text-sage-600">{category.name}</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-sage-900 sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className={`text-2xl ${product.compareAt ? "text-blush-600" : ""}`}>{formatPrice(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-ink/40 line-through">{formatPrice(product.compareAt)}</span>
                <span className="rounded-full bg-blush-100 px-2.5 py-0.5 text-xs font-semibold text-blush-600">
                  Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                </span>
              </>
            )}
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${i < Math.round(product.rating) ? "fill-blush-400 text-blush-400" : "text-sand"}`}
                />
              ))}
            </div>
            <span className="text-ink/60">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-ink/75">{product.description}</p>

          <PurchasePanel key={product.slug} product={product} />

          <div className="mt-10 divide-y divide-sand border-y border-sand">
            <Accordion title="Details & care" open>
              <ul className="list-disc space-y-1 pl-5">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Shipping & returns">
              <p>
                Free standard shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}. Orders are lovingly
                packed and dispatched within 1–2 business days. Returns are free within 30 days of delivery.
              </p>
            </Accordion>
            <Accordion title="Gift wrapping">
              <p>
                Add complimentary gift wrapping at checkout. Each piece arrives in tissue paper, tied with a blush
                ribbon and a handwritten note.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-4xl text-sage-900">You may also love</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}

function Accordion({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
        {title}
        <span className="text-lg leading-none text-sage-600 transition group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-ink/70">{children}</div>
    </details>
  );
}

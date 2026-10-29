import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatPrice, getCategory, type Product } from "@/lib/products";
import { WishlistButton } from "./wishlist-button";

const IMAGE_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

export function ProductCard({ product }: { product: Product }) {
  const [primary, secondary] = product.images;
  const onSale = product.compareAt !== undefined;
  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
          <Image
            src={primary}
            alt={product.name}
            fill
            sizes={IMAGE_SIZES}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          {secondary && (
            <Image
              src={secondary}
              alt=""
              fill
              sizes={IMAGE_SIZES}
              className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
            />
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {onSale && (
              <span className="rounded-full bg-blush-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                Sale
              </span>
            )}
            {product.tags.includes("new") && (
              <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sage-800">
                New
              </span>
            )}
          </div>
        </div>
        <div className="mt-3 space-y-1 px-0.5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage-600">
            {getCategory(product.category)?.name}
          </p>
          <h3 className="font-serif text-lg leading-snug">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className={onSale ? "font-medium text-blush-600" : "font-medium"}>{formatPrice(product.price)}</span>
            {onSale && <span className="text-ink/40 line-through">{formatPrice(product.compareAt!)}</span>}
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="size-3 rounded-full ring-1 ring-ink/15"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <span className="flex items-center gap-1 text-xs text-ink/60">
              <Star className="size-3 fill-blush-300 text-blush-300" /> {product.rating}
            </span>
          </div>
        </div>
      </Link>
      <WishlistButton
        slug={product.slug}
        className="absolute right-3 top-3 sm:opacity-0 sm:group-hover:opacity-100 aria-pressed:opacity-100"
      />
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

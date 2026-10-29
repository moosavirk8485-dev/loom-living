import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Leaf, RotateCcw, Truck } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { Newsletter } from "@/components/newsletter";
import { categories, photos, products } from "@/lib/products";

const perks = [
  { icon: Truck, title: "Free shipping", text: "On orders over $75" },
  { icon: RotateCcw, title: "Easy returns", text: "30 days, no fuss" },
  { icon: Leaf, title: "Natural fabrics", text: "Linen, cotton & jute" },
  { icon: Gift, title: "Gift wrapping", text: "Beautifully boxed" },
];

const testimonials = [
  {
    quote: "The sage linen covers completely changed our living room. They feel so soft and the colour is perfect.",
    name: "Amelia R.",
  },
  {
    quote: "My vanity mat and tissue box look like they came from a boutique hotel. Packaging was lovely too.",
    name: "Sara K.",
  },
  {
    quote: "Beautiful quality for the price. The acacia tray is now the centrepiece of my coffee table.",
    name: "Hannah M.",
  },
];

export default function Home() {
  const bestsellers = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
  const newArrivals = products.filter((p) => p.tags.includes("new")).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-sage-100">
          <div className="grid items-center lg:grid-cols-2">
            <div className="relative z-10 px-6 py-14 sm:px-12 lg:py-24">
              <p className="inline-flex items-center gap-2 rounded-full bg-linen/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sage-700">
                <span className="size-1.5 rounded-full bg-blush-400" /> The Autumn Linen Edit
              </p>
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-sage-900 sm:text-6xl lg:text-7xl">
                Soft textures for a <em className="text-blush-500">calmer</em> home.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
                Cushion covers, pillow covers, mats, tissue boxes and trays in sage, blush and warm linen tones,
                made to make every corner feel lived-in and lovely.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
                >
                  Shop the collection <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/shop/cushion-covers"
                  className="rounded-full border border-sage-700 px-8 py-4 text-sm font-medium text-sage-800 transition hover:bg-linen"
                >
                  Cushion covers
                </Link>
              </div>
            </div>
            <div className="relative h-80 sm:h-[28rem] lg:h-full lg:min-h-[600px]">
              <Image
                src={photos.heroBedroom}
                alt="A calm bedroom with sage walls, layered linen bedding and cushions"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 hidden rounded-2xl bg-linen/90 p-4 shadow-lg backdrop-blur sm:block">
                <p className="text-[11px] uppercase tracking-[0.18em] text-sage-600">Bestseller</p>
                <p className="font-serif text-lg">Sage Washed Linen Cover</p>
                <p className="text-sm text-ink/70">from $34</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {perks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="rounded-full bg-blush-100 p-2.5">
              <Icon className="size-5 text-blush-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-ink/60">{text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Explore" title="Shop by category" href="/shop" linkLabel="Shop all" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream sm:aspect-[4/3]"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-900/70 via-sage-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-linen sm:p-6">
                <h3 className="font-serif text-2xl sm:text-3xl">{cat.name}</h3>
                <p className="mt-1 hidden text-sm text-linen/85 sm:block">{cat.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-blush-200">
                  Shop now <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Loved by many" title="Bestsellers" href="/shop" linkLabel="View all" />
        <div className="mt-10">
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      {/* Story banner */}
      <section className="my-14 bg-blush-100/70">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={photos.heroLiving}
              alt="A sage-green living room with a round mirror, plants and woven textures"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-blush-600">Woven with intention</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-sage-900 sm:text-5xl">
              Made slowly, for homes that feel like a deep breath.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/75">
              Every Loom &amp; Living piece starts with natural fibres and a soft, muted palette. We work with small
              workshops who weave, quilt and embroider by hand, so the things you live with every day are made
              with real care.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
            >
              Read our story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Just in" title="New arrivals" href="/shop" linkLabel="View all" />
        <div className="mt-10">
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-sage-600">Kind words</p>
          <h2 className="mt-3 font-serif text-4xl text-sage-900">From our customers</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-sand bg-white/50 p-8">
              <div className="text-blush-400" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="mt-4 font-serif text-xl leading-relaxed text-ink/90">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-ink/60">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center rounded-3xl bg-sage-100 px-6 py-16 text-center">
          <h2 className="font-serif text-4xl text-sage-900">Take 10% off your first order</h2>
          <p className="mt-3 max-w-md text-ink/70">
            Join our circle for new collections, styling ideas and members-only offers.
          </p>
          <div className="mt-8 flex w-full justify-center">
            <Newsletter tone="light" />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-sage-600">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-4xl text-sage-900 sm:text-5xl">{title}</h2>
      </div>
      <Link
        href={href}
        className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-sage-700 underline-offset-4 hover:underline"
      >
        {linkLabel} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

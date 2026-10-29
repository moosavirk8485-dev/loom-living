import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hand, Leaf, Sparkles } from "lucide-react";
import { photos } from "@/lib/products";

export const metadata: Metadata = { title: "Our Story" };

const values = [
  {
    icon: Leaf,
    title: "Natural materials",
    text: "Linen, cotton, jute, rattan and solid wood. Fibres that breathe, soften and age beautifully.",
  },
  {
    icon: Hand,
    title: "Made by hand",
    text: "We partner with small family workshops for weaving, quilting, tufting and embroidery.",
  },
  {
    icon: Sparkles,
    title: "A gentle palette",
    text: "Sage, blush, oat and ivory: colours chosen to sit together quietly in any room.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-12 pt-16 text-center sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-sage-600">Our Story</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-sage-900 sm:text-6xl">
          Home should feel like a <em className="text-blush-500">soft place</em> to land.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75">
          Loom &amp; Living began with a simple idea: that the small things you touch every day, the cushion you
          lean into or the tray that holds your morning coffee, can make a home feel calmer and more like you.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src={photos.heroLiving}
            alt="A sage-toned living room styled with natural textures"
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section id="craft" className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3 lg:px-8">
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl bg-white/50 p-8 ring-1 ring-sand">
            <div className="inline-flex rounded-full bg-sage-100 p-3">
              <Icon className="size-6 text-sage-700" strokeWidth={1.5} />
            </div>
            <h2 className="mt-5 font-serif text-2xl text-sage-900">{title}</h2>
            <p className="mt-2 leading-relaxed text-ink/70">{text}</p>
          </div>
        ))}
      </section>

      <section className="bg-blush-100/70">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-serif text-4xl text-sage-900 sm:text-5xl">Fewer things, chosen with love.</h2>
            <p className="mt-6 leading-relaxed text-ink/75">
              We design in small batches so nothing goes to waste, and every collection is built to mix and match
              with the last. Swap your cushion covers with the seasons, layer a mat beneath a tray, and let your
              home evolve slowly.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
            >
              Shop the collection
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={photos.linenStack}
              alt="A stack of folded linen in blush and ivory tones"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

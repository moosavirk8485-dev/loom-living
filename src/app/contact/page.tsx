import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact" };

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 1–2 business days and usually arrive within 3–5 business days. Shipping is free on orders over $75.",
  },
  {
    q: "What is your returns policy?",
    a: "You can return unused items in their original packaging within 30 days of delivery for a full refund.",
  },
  {
    q: "How do I care for linen cushion covers?",
    a: "Machine wash cold on a gentle cycle and line dry. Linen softens beautifully with every wash, so a little crumple is part of its charm.",
  },
  {
    q: "Are cushion inserts included?",
    a: "Our covers are sold without inserts so you can reuse what you already have. Each listing shows the exact size to pair it with.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-sage-600">Say hello</p>
        <h1 className="mt-3 font-serif text-5xl text-sage-900 sm:text-6xl">We&apos;d love to hear from you</h1>
        <p className="mt-4 text-ink/70">Questions about an order, styling advice or wholesale? Drop us a note.</p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "hello@loomandliving.com" },
            { icon: Phone, label: "Phone", value: "+1 (555) 014-2290" },
            { icon: MapPin, label: "Studio", value: "Open Monday to Friday, 9am – 5pm" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-white/50 p-5 ring-1 ring-sand">
              <div className="rounded-full bg-blush-100 p-3">
                <Icon className="size-5 text-blush-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-ink/50">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>

      <section id="faq" className="mx-auto mt-24 max-w-3xl scroll-mt-32">
        <h2 className="text-center font-serif text-4xl text-sage-900">Frequently asked</h2>
        <div className="mt-8 divide-y divide-sand border-y border-sand">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {f.q}
                <span className="text-xl leading-none text-sage-600 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

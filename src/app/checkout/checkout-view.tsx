"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Gift, Lock } from "lucide-react";
import { OrderTotals } from "@/components/order-summary";
import { actions, getCartLines, getCartTotals, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export function CheckoutView() {
  const { cart } = useStore();
  const lines = getCartLines(cart);
  const { subtotal } = getCartTotals(lines);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  if (orderNumber) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
        <div className="rounded-full bg-sage-100 p-5">
          <CheckCircle2 className="size-12 text-sage-600" strokeWidth={1.25} />
        </div>
        <h1 className="mt-6 font-serif text-5xl text-sage-900">Thank you!</h1>
        <p className="mt-3 text-ink/70">
          Order <span className="font-medium text-ink">#{orderNumber}</span> is confirmed. We&apos;re wrapping it up
          with care and will email you tracking details soon.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
        <h1 className="font-serif text-5xl text-sage-900">Nothing to check out</h1>
        <p className="mt-3 text-ink/70">Your bag is empty. Add a few pieces first.</p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setOrderNumber(String(Math.floor(100000 + Math.random() * 900000)));
    actions.clearCart();
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-5xl text-sage-900">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-10">
          <Fieldset title="Contact">
            <Field label="Email" name="email" type="email" autoComplete="email" className="sm:col-span-2" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" className="sm:col-span-2" />
          </Fieldset>

          <Fieldset title="Delivery address">
            <Field label="First name" name="firstName" autoComplete="given-name" />
            <Field label="Last name" name="lastName" autoComplete="family-name" />
            <Field label="Address" name="address" autoComplete="address-line1" className="sm:col-span-2" />
            <Field
              label="Apartment, suite, etc. (optional)"
              name="address2"
              required={false}
              className="sm:col-span-2"
            />
            <Field label="City" name="city" autoComplete="address-level2" />
            <Field label="Postal code" name="postal" autoComplete="postal-code" />
          </Fieldset>

          <Fieldset title="Finishing touches">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-sand bg-white/50 p-4 text-sm sm:col-span-2 has-[:checked]:border-blush-400 has-[:checked]:bg-blush-50">
              <input type="checkbox" name="gift" className="mt-0.5 size-4 accent-blush-500" />
              <span>
                <span className="flex items-center gap-2 font-medium">
                  <Gift className="size-4 text-blush-500" /> Add complimentary gift wrapping
                </span>
                <span className="mt-1 block text-ink/60">Tissue paper, blush ribbon and a handwritten note.</span>
              </span>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium">Order note (optional)</span>
              <textarea
                name="note"
                rows={3}
                className="w-full rounded-2xl border border-sand bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-sage-500"
              />
            </label>
          </Fieldset>

          <Fieldset title="Payment">
            <p className="flex items-center gap-2 text-xs text-ink/60 sm:col-span-2">
              <Lock className="size-3.5" /> This is a demo store. No real payment will be taken.
            </p>
            <Field label="Card number" name="card" inputMode="numeric" placeholder="1234 5678 9012 3456" autoComplete="cc-number" className="sm:col-span-2" />
            <Field label="Expiry (MM/YY)" name="expiry" placeholder="MM/YY" autoComplete="cc-exp" />
            <Field label="CVC" name="cvc" inputMode="numeric" placeholder="123" autoComplete="cc-csc" />
          </Fieldset>
        </div>

        <aside className="h-fit rounded-3xl bg-cream p-6 lg:sticky lg:top-32">
          <h2 className="font-serif text-3xl">Order summary</h2>
          <ul className="mt-6 space-y-4">
            {lines.map((line) => (
              <li key={line.id} className="flex items-center gap-4">
                <div className="relative aspect-square w-16 shrink-0 rounded-xl bg-sand">
                  <Image
                    src={line.product.images[0]}
                    alt={line.product.name}
                    fill
                    sizes="64px"
                    className="rounded-xl object-cover"
                  />
                  <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-sage-700 text-[11px] text-linen">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{line.product.name}</p>
                  <p className="text-ink/60">
                    {line.color}
                    {line.size !== "One Size" && ` / ${line.size}`}
                  </p>
                </div>
                <span className="text-sm">{formatPrice(line.product.price * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <OrderTotals subtotal={subtotal} />
          <button className="mt-6 w-full rounded-full bg-sage-700 py-4 text-sm font-medium text-linen transition hover:bg-sage-800">
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-4 font-serif text-3xl text-sage-900">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  className = "",
  required = true,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        required={required}
        {...props}
        className="w-full rounded-full border border-sand bg-white/70 px-5 py-3 text-sm outline-none transition placeholder:text-ink/35 focus:border-sage-500"
      />
    </label>
  );
}

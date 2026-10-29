"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-sand bg-white/70 px-4 py-3 text-sm outline-none transition placeholder:text-ink/35 focus:border-sage-500";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-sage-100 p-10 text-center">
        <CheckCircle2 className="size-12 text-sage-600" strokeWidth={1.25} />
        <p className="mt-4 font-serif text-3xl text-sage-900">Message sent</p>
        <p className="mt-2 text-ink/70">Thank you! We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-4 rounded-3xl bg-cream p-6 sm:grid-cols-2 sm:p-8"
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Name</span>
        <input required name="name" autoComplete="name" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Email</span>
        <input required type="email" name="email" autoComplete="email" className={inputClass} />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium">Subject</span>
        <select name="subject" className={inputClass}>
          <option>Order enquiry</option>
          <option>Product question</option>
          <option>Styling advice</option>
          <option>Wholesale</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium">Message</span>
        <textarea required name="message" rows={5} className={inputClass} />
      </label>
      <button className="rounded-full bg-sage-700 py-3.5 text-sm font-medium text-linen transition hover:bg-sage-800 sm:col-span-2">
        Send message
      </button>
    </form>
  );
}

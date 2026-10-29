"use client";

import { useState } from "react";

export function Newsletter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [submitted, setSubmitted] = useState(false);
  const dark = tone === "dark";

  if (submitted) {
    return (
      <p className={`text-sm ${dark ? "text-blush-200" : "text-sage-700"}`}>
        Welcome to the circle! Your 10% code is on its way.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="email"
        required
        placeholder="Your email address"
        aria-label="Email address"
        className={`min-w-0 flex-1 rounded-full border px-5 py-3 text-sm outline-none transition ${
          dark
            ? "border-sage-500 bg-sage-900/30 text-linen placeholder:text-sage-300 focus:border-blush-200"
            : "border-sand bg-white/70 placeholder:text-ink/40 focus:border-sage-500"
        }`}
      />
      <button
        className={`rounded-full px-6 text-sm font-medium transition ${
          dark ? "bg-blush-200 text-sage-900 hover:bg-blush-100" : "bg-sage-700 text-linen hover:bg-sage-800"
        }`}
      >
        Subscribe
      </button>
    </form>
  );
}

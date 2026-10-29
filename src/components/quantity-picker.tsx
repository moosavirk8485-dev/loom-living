"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "size-8" : "size-12";
  return (
    <div className="inline-flex items-center rounded-full border border-sand bg-white/60">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`${box} flex items-center justify-center rounded-full transition hover:bg-sage-100 disabled:opacity-30`}
      >
        <Minus className="size-3.5" />
      </button>
      <span className={`${size === "sm" ? "w-6 text-sm" : "w-8"} text-center`}>{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={`${box} flex items-center justify-center rounded-full transition hover:bg-sage-100 disabled:opacity-30`}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

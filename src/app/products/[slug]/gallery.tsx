"use client";

import Image from "next/image";
import { useState } from "react";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {images.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {images.map((src, i) => (
            <button
              key={src}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-cream transition sm:w-20 ${
                i === active ? "ring-2 ring-sage-600 ring-offset-2 ring-offset-linen" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl bg-cream">
        <Image
          key={images[active]}
          src={images[active]}
          alt={name}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="animate-fade-in object-cover"
        />
      </div>
    </div>
  );
}

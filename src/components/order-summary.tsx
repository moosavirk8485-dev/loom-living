import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, formatPrice } from "@/lib/products";

export function getOrderTotals(subtotal: number) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  return { shipping, total: subtotal + shipping };
}

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  return (
    <div>
      <p className="text-sm">
        {remaining > 0 ? (
          <>
            You&apos;re <strong className="font-semibold">{formatPrice(remaining)}</strong> away from free shipping.
          </>
        ) : (
          <>You&apos;ve unlocked <strong className="font-semibold">free shipping</strong>.</>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
        <div className="h-full rounded-full bg-sage-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function OrderTotals({ subtotal }: { subtotal: number }) {
  const { shipping, total } = getOrderTotals(subtotal);
  return (
    <dl className="mt-6 space-y-3 border-t border-sand pt-6 text-sm">
      <div className="flex justify-between">
        <dt className="text-ink/70">Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-ink/70">Shipping</dt>
        <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      <div className="flex justify-between border-t border-sand pt-3 text-base font-semibold">
        <dt>Total</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}

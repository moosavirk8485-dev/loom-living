import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-blush-500">404</p>
      <h1 className="mt-4 font-serif text-5xl text-sage-900">Page not found</h1>
      <p className="mt-4 text-ink/70">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/shop"
        className="mt-8 rounded-full bg-sage-700 px-8 py-4 text-sm font-medium text-linen transition hover:bg-sage-800"
      >
        Back to the shop
      </Link>
    </div>
  );
}

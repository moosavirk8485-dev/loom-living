import Link from "next/link";

export function Logo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={`group inline-flex items-baseline gap-1 font-serif ${className}`}>
      <span className="text-2xl font-semibold tracking-tight text-sage-800">Loom</span>
      <span className="text-2xl italic text-blush-500">&amp;</span>
      <span className="text-2xl font-semibold tracking-tight text-sage-800">Living</span>
    </Link>
  );
}

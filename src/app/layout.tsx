import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Loom & Living | Soft furnishings for a calmer home",
    template: "%s | Loom & Living",
  },
  description:
    "Cushion covers, pillow covers, dressing mats, side table mats, tissue boxes and trays in soft sage, blush and linen tones.",
  // Shared by link only: keep the site out of search engine results.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <div className="bg-sage-700 px-4 py-2 text-center text-xs tracking-wide text-sage-50">
          Free shipping on orders over $75 · Easy 30-day returns
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

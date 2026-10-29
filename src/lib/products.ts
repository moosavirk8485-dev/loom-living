export type CategorySlug =
  | "cushion-covers"
  | "pillow-covers"
  | "dressing-mats"
  | "side-table-mats"
  | "tissue-boxes"
  | "trays";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
};

export type Swatch = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAt?: number;
  description: string;
  details: string[];
  images: string[];
  colors: Swatch[];
  sizes: string[];
  rating: number;
  reviews: number;
  tags: ("new" | "bestseller")[];
};

export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photos = {
  heroBedroom: img("1615874959474-d609969a20ed", 2000),
  heroLiving: img("1616046229478-9901c5536a45", 1600),
  linenStack: img("1596433904500-97b901c5d274"),
  sofaCushions: img("1583847268964-b28dc8f51f92"),
};

export const categories: Category[] = [
  {
    slug: "cushion-covers",
    name: "Cushion Covers",
    blurb: "Linen, velvet & hand-woven textures for every sofa",
    image: img("1590251024078-8a6d9f90b02d"),
  },
  {
    slug: "pillow-covers",
    name: "Pillow Covers",
    blurb: "Breathable cotton & washed linen for restful nights",
    image: img("1617325247661-675ab4b64ae2"),
  },
  {
    slug: "dressing-mats",
    name: "Dressing Mats",
    blurb: "Quilted & embroidered mats for your vanity",
    image: img("1754788358645-d6e6cca12e25"),
  },
  {
    slug: "side-table-mats",
    name: "Side Table Mats",
    blurb: "Woven & scalloped mats to dress any surface",
    image: img("1553709225-9eb59ce4d215"),
  },
  {
    slug: "tissue-boxes",
    name: "Tissue Boxes",
    blurb: "Fabric-wrapped covers that hide the everyday",
    image: img("1609840112990-4265448268d1"),
  },
  {
    slug: "trays",
    name: "Trays",
    blurb: "Wood, rattan & lacquer trays to gather and style",
    image: img("1654124803541-bf14f80edadb"),
  },
];

const c = {
  sage: { name: "Sage", hex: "#9caf94" },
  moss: { name: "Moss", hex: "#5e7357" },
  blush: { name: "Blush", hex: "#ecc6bf" },
  rose: { name: "Dusty Rose", hex: "#c99a92" },
  ivory: { name: "Ivory", hex: "#f6f0e4" },
  oat: { name: "Oat", hex: "#ddd0bb" },
  natural: { name: "Natural Wood", hex: "#b88a5a" },
  walnut: { name: "Walnut", hex: "#7a5236" },
  terracotta: { name: "Terracotta", hex: "#b4644c" },
};

const CUSHION_SIZES = ['16" × 16"', '18" × 18"', '20" × 20"'];
const PILLOW_SIZES = ["Standard", "Queen", "King"];
const ONE_SIZE = ["One Size"];

export const products: Product[] = [
  // Cushion covers
  {
    slug: "sage-linen-cushion-cover",
    name: "Sage Washed Linen Cushion Cover",
    category: "cushion-covers",
    price: 34,
    description:
      "Stonewashed European linen in a calm sage green. Softly rumpled, wonderfully breathable and finished with a hidden zip for an easy, relaxed look.",
    details: ["100% stonewashed linen", "Concealed zip closure", "Insert sold separately", "Machine wash cold, gentle"],
    images: [img("1590251024078-8a6d9f90b02d"), img("1583847268964-b28dc8f51f92")],
    colors: [c.sage, c.blush, c.ivory],
    sizes: CUSHION_SIZES,
    rating: 4.9,
    reviews: 214,
    tags: ["bestseller"],
  },
  {
    slug: "blush-velvet-cushion-cover",
    name: "Blush Velvet Cushion Cover",
    category: "cushion-covers",
    price: 38,
    description:
      "Plush cotton velvet in the softest blush pink, with a gentle sheen that catches the light. A little luxury for armchairs and sofas.",
    details: ["100% cotton velvet front", "Linen-blend reverse", "Concealed zip closure", "Dry clean recommended"],
    images: [img("1567016432779-094069958ea5")],
    colors: [c.blush, c.sage, c.oat],
    sizes: CUSHION_SIZES,
    rating: 4.8,
    reviews: 156,
    tags: ["new"],
  },
  {
    slug: "ivory-boucle-cushion-cover",
    name: "Ivory Bouclé Cushion Cover",
    category: "cushion-covers",
    price: 42,
    compareAt: 52,
    description:
      "A cloud-soft looped bouclé in warm ivory. Tactile and cosy, it brings a quiet texture to neutral spaces.",
    details: ["Cotton-blend bouclé", "Envelope back", "Insert sold separately", "Spot clean"],
    images: [img("1629949009765-40fc74c9ec21"), img("1493663284031-b7e3aefcae8e")],
    colors: [c.ivory, c.oat],
    sizes: CUSHION_SIZES,
    rating: 4.7,
    reviews: 98,
    tags: [],
  },
  {
    slug: "tufted-texture-cushion-cover",
    name: "Hand-Tufted Texture Cushion Cover",
    category: "cushion-covers",
    price: 46,
    description:
      "Hand-tufted cotton in a raised geometric pattern, finished with soft tassels. Each piece is made by artisans, so no two are exactly alike.",
    details: ["100% cotton", "Hand-tufted front", "Tassel corners", "Hand wash cold"],
    images: [img("1579656381226-5fc0f0100c3b")],
    colors: [c.ivory, c.sage],
    sizes: ['18" × 18"', '20" × 20"'],
    rating: 4.8,
    reviews: 73,
    tags: ["new"],
  },

  // Pillow covers
  {
    slug: "cloud-cotton-pillow-cover-set",
    name: "Cloud Cotton Pillow Cover Set",
    category: "pillow-covers",
    price: 48,
    description:
      "A pair of 400-thread-count cotton sateen pillow covers with a buttery-smooth finish. Cool to the touch and kind to hair and skin.",
    details: ["Set of 2", "400TC cotton sateen", "Envelope closure", "Machine wash warm"],
    images: [img("1617325247661-675ab4b64ae2"), img("1584100936595-c0654b55a2e2")],
    colors: [c.ivory, c.sage, c.blush],
    sizes: PILLOW_SIZES,
    rating: 4.9,
    reviews: 302,
    tags: ["bestseller"],
  },
  {
    slug: "washed-linen-pillow-covers",
    name: "Washed Linen Pillow Covers",
    category: "pillow-covers",
    price: 56,
    description:
      "Breathable, temperature-regulating linen that gets softer with every wash. Relaxed, lived-in and perfect year round.",
    details: ["Set of 2", "100% French flax linen", "Envelope closure", "Machine wash cold"],
    images: [img("1505693416388-ac5ce068fe85")],
    colors: [c.oat, c.sage, c.rose],
    sizes: PILLOW_SIZES,
    rating: 4.8,
    reviews: 187,
    tags: [],
  },
  {
    slug: "scalloped-edge-pillow-covers",
    name: "Scalloped Edge Pillow Covers",
    category: "pillow-covers",
    price: 52,
    compareAt: 64,
    description:
      "Crisp percale with a delicate embroidered scallop edge in contrast thread. A charming, feminine finish for the bedroom.",
    details: ["Set of 2", "Cotton percale", "Embroidered scallop trim", "Machine wash cold"],
    images: [img("1522771739844-6a9f6d5f14af")],
    colors: [c.ivory, c.blush],
    sizes: PILLOW_SIZES,
    rating: 4.6,
    reviews: 64,
    tags: ["new"],
  },

  // Dressing mats
  {
    slug: "quilted-vanity-mat",
    name: "Quilted Cotton Vanity Mat",
    category: "dressing-mats",
    price: 29,
    description:
      "A softly padded, channel-quilted mat that protects your dressing table and gives perfumes and skincare a beautiful place to rest.",
    details: ['Measures 16" × 24"', "Quilted cotton with padded core", "Non-slip underside", "Machine wash cold"],
    images: [img("1754788358645-d6e6cca12e25")],
    colors: [c.blush, c.sage, c.ivory],
    sizes: ONE_SIZE,
    rating: 4.8,
    reviews: 121,
    tags: ["bestseller"],
  },
  {
    slug: "embroidered-dressing-table-runner",
    name: "Embroidered Dressing Table Runner",
    category: "dressing-mats",
    price: 36,
    description:
      "A slim linen runner edged with hand-embroidered vines in sage thread. Lays beautifully across vanities and chests of drawers.",
    details: ['Measures 13" × 48"', "Linen with cotton embroidery", "Hemstitched edges", "Hand wash cold"],
    images: [img("1596433904500-97b901c5d274")],
    colors: [c.ivory, c.blush],
    sizes: ONE_SIZE,
    rating: 4.7,
    reviews: 58,
    tags: ["new"],
  },
  {
    slug: "faux-leather-vanity-mat",
    name: "Wipe-Clean Faux Leather Vanity Mat",
    category: "dressing-mats",
    price: 32,
    description:
      "A sleek, water-resistant mat in soft-touch vegan leather. Spills and makeup wipe away in seconds, keeping your vanity spotless.",
    details: ['Measures 14" × 22"', "Vegan faux leather", "Stitched border", "Wipe clean"],
    images: [img("1560782703-19627c95f393")],
    colors: [c.blush, c.oat, c.moss],
    sizes: ONE_SIZE,
    rating: 4.5,
    reviews: 44,
    tags: [],
  },

  // Side table mats
  {
    slug: "woven-jute-side-table-mat",
    name: "Woven Jute Side Table Mat",
    category: "side-table-mats",
    price: 18,
    description:
      "A hand-woven jute and cotton mat with fine fringed edges. Adds warm, natural texture beneath lamps, plants and coffee cups.",
    details: ['Measures 14" × 19"', "Jute & cotton blend", "Heat resistant", "Spot clean"],
    images: [img("1553709225-9eb59ce4d215")],
    colors: [c.natural, c.oat],
    sizes: ONE_SIZE,
    rating: 4.7,
    reviews: 132,
    tags: ["bestseller"],
  },
  {
    slug: "scalloped-linen-table-mat",
    name: "Scalloped Linen Table Mat",
    category: "side-table-mats",
    price: 22,
    description:
      "Round linen mat with a scalloped edge, perfect for bedside and accent tables. Pretty on its own or layered under a tray.",
    details: ['Measures 14" diameter', "100% linen", "Embroidered scallop edge", "Machine wash cold"],
    images: [img("1526057565006-20beab8dd2ed")],
    colors: [c.sage, c.blush, c.ivory],
    sizes: ONE_SIZE,
    rating: 4.8,
    reviews: 67,
    tags: ["new"],
  },
  {
    slug: "cotton-placemat-set",
    name: "Cotton Mat Set of Four",
    category: "side-table-mats",
    price: 38,
    compareAt: 46,
    description:
      "Four reversible cotton mats with a soft sage stripe on one side and solid ivory on the other. Made for side tables, dining and everything between.",
    details: ["Set of 4", 'Measures 13" × 18" each', "Reversible cotton", "Machine wash warm"],
    images: [img("1515746010190-bc1bc8b74147")],
    colors: [c.sage, c.rose],
    sizes: ONE_SIZE,
    rating: 4.6,
    reviews: 49,
    tags: [],
  },

  // Tissue boxes
  {
    slug: "linen-wrapped-tissue-box",
    name: "Linen-Wrapped Tissue Box Cover",
    category: "tissue-boxes",
    price: 26,
    description:
      "A sturdy box cover wrapped in soft linen, with a magnetic base that makes refills effortless. Fits standard tissue boxes.",
    details: ['Measures 10" × 5.5" × 3.5"', "Linen over rigid board", "Magnetic base panel", "Wipe clean"],
    images: [img("1609840112990-4265448268d1")],
    colors: [c.sage, c.blush, c.ivory],
    sizes: ONE_SIZE,
    rating: 4.7,
    reviews: 88,
    tags: ["bestseller"],
  },
  {
    slug: "quilted-cube-tissue-box",
    name: "Quilted Cube Tissue Box",
    category: "tissue-boxes",
    price: 24,
    description:
      "A softly quilted cube cover for upright tissue boxes. Charming on bathroom shelves, bedside tables and dressing tables.",
    details: ['Measures 5" × 5" × 5.5"', "Quilted cotton", "Open-base design", "Machine wash cold"],
    images: [img("1606498679463-30a0eb8824e1")],
    colors: [c.blush, c.sage],
    sizes: ONE_SIZE,
    rating: 4.5,
    reviews: 37,
    tags: ["new"],
  },
  {
    slug: "rattan-tissue-box",
    name: "Hand-Woven Rattan Tissue Box",
    category: "tissue-boxes",
    price: 32,
    description:
      "Hand-woven natural rattan with a slide-off lid. Brings an airy, organic texture to the living room or bedroom.",
    details: ['Measures 10" × 5.5" × 4"', "Natural rattan", "Removable base", "Dust with a dry cloth"],
    images: [img("1556020685-ae41abfc9365")],
    colors: [c.natural],
    sizes: ONE_SIZE,
    rating: 4.8,
    reviews: 52,
    tags: [],
  },

  // Trays
  {
    slug: "round-acacia-serving-tray",
    name: "Round Acacia Serving Tray",
    category: "trays",
    price: 44,
    description:
      "Carved from a single piece of acacia wood with a gentle raised lip. Use it for morning coffee, ottoman styling or serving guests.",
    details: ['Measures 15" diameter', "Solid acacia wood", "Food safe finish", "Hand wash, oil occasionally"],
    images: [img("1654124803541-bf14f80edadb")],
    colors: [c.natural, c.walnut],
    sizes: ONE_SIZE,
    rating: 4.9,
    reviews: 176,
    tags: ["bestseller"],
  },
  {
    slug: "oval-wooden-tray",
    name: "Oval Wooden Tray",
    category: "trays",
    price: 36,
    description:
      "A smooth oval tray in warm wood, ideal for a bedside coffee ritual or corralling candles and small treasures.",
    details: ['Measures 14" × 8"', "Solid wood", "Food safe finish", "Hand wash"],
    images: [img("1727329169171-afe32325bd67")],
    colors: [c.natural],
    sizes: ONE_SIZE,
    rating: 4.7,
    reviews: 63,
    tags: ["new"],
  },
  {
    slug: "lacquered-catchall-tray",
    name: "Lacquered Catch-All Tray",
    category: "trays",
    price: 39,
    compareAt: 48,
    description:
      "A glossy lacquered tray in rich earthy tones with handles at each end. Keeps keys, jewellery and remotes in order with style.",
    details: ['Measures 16" × 11"', "Lacquered MDF", "Cut-out handles", "Wipe clean"],
    images: [img("1642409644738-96acd36aca54")],
    colors: [c.terracotta, c.sage, c.blush],
    sizes: ONE_SIZE,
    rating: 4.6,
    reviews: 41,
    tags: [],
  },
];

export function getCategory(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 4) {
  const sameCategory = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = products.filter((p) => p.category !== product.category);
  return [...sameCategory, ...others].slice(0, count);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export const FREE_SHIPPING_THRESHOLD = 75;
export const SHIPPING_FEE = 8;

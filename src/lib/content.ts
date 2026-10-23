import type { Shot } from "@/components/media/PlaceholderArt";

export const SITE = {
  name: "Marrow",
  wordmark: "MARROW",
  tagline: "Clothes for a bigger tomorrow",
  founded: "EST. 2018",
  location: "MANILA, PH",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://marrow-silk.vercel.app").replace(/\/$/, ""),
  description:
    "Marrow is a Manila streetwear label making functional outerwear, heavyweight jersey and wide-leg bottoms in limited seasonal runs.",
} as const;

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

export const CATEGORIES = [
  {
    name: "Outerwear",
    slug: "outerwear",
    href: "/shop?category=outerwear",
    shot: "cat-outerwear",
    src: "/images/categories/outerwear.jpg",
  },
  {
    name: "Bottoms",
    slug: "bottoms",
    href: "/shop?category=bottoms",
    shot: "cat-bottoms",
    src: "/images/categories/bottoms.jpg",
  },
  {
    name: "Tops",
    slug: "tops",
    href: "/shop?category=tops",
    shot: "cat-tops",
    src: "/images/categories/tops.jpg",
  },
  {
    name: "Footwear",
    slug: "footwear",
    href: "/shop?category=footwear",
    shot: "cat-footwear",
    src: "/images/categories/footwear.jpg",
  },
  {
    name: "Accessories",
    slug: "accessories",
    href: "/shop?category=accessories",
    shot: "cat-accessories",
    src: "/images/categories/accessories.jpg",
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category["slug"];

export type Product = {
  name: string;
  price: string;
  currency: "USD";
  amount: number;
  /** also the product URL: /shop/<shot> */
  shot: "hooded-jacket" | "crewneck" | "cargo-pants" | "cap";
  material: string;
  src: string;
  category: CategorySlug;
  /** one sentence under the name on the product page */
  description: string;
  /** construction facts, already stated by the range */
  detail: readonly string[];
  sizes: readonly string[];
  /** compare-at price, struck through beside the price — omit when not on sale */
  compareAt?: string;
  /** extra frames for the card's swatch bar; the product photo is always the first */
  variants?: { src: string }[];
};

export const FEATURED_PRODUCTS: Product[] = [
  {
    name: "Utility Hooded Jacket",
    price: "$160",
    currency: "USD",
    amount: 160,
    shot: "hooded-jacket",
    category: "outerwear",
    material: "3-layer matte ripstop, taped seams",
    description:
      "A hooded shell in matte ripstop, taped at every seam, cut in Manila in a limited run.",
    detail: [
      "3-layer matte ripstop shell",
      "Taped seams throughout",
      "Cut and finished in Manila",
      "Limited seasonal run",
    ],
    sizes: ["S", "M", "L", "XL"],
    src: "/images/products/utility-hooded-jacket.jpg",
  },
  {
    name: "Essential Crewneck",
    price: "$68",
    currency: "USD",
    amount: 68,
    shot: "crewneck",
    category: "tops",
    material: "480 gsm brushed loopback cotton",
    description:
      "A heavyweight loopback crewneck, brushed inside, cut in Manila in a limited run.",
    detail: [
      "480 gsm brushed loopback cotton",
      "Cut and finished in Manila",
      "Limited seasonal run",
    ],
    sizes: ["S", "M", "L", "XL"],
    src: "/images/products/essential-crewneck-black.png",
  },
  {
    name: "Wide Leg Cargo Pants",
    price: "$98",
    currency: "USD",
    amount: 98,
    shot: "cargo-pants",
    category: "bottoms",
    material: "Dry-touch cotton twill, 6 pockets",
    description:
      "Wide-leg cargos in dry-touch cotton twill with six pockets, cut in Manila in a limited run.",
    detail: [
      "Dry-touch cotton twill",
      "Six pockets",
      "Cut and finished in Manila",
      "Limited seasonal run",
    ],
    sizes: ["S", "M", "L", "XL"],
    src: "/images/products/wide-leg-cargo-pants.jpg",
  },
  {
    name: "Logo Cap",
    price: "$32",
    currency: "USD",
    amount: 32,
    shot: "cap",
    category: "accessories",
    material: "Washed cotton twill, embroidered mark",
    description:
      "A washed cotton twill cap carrying the embroidered Marrow mark.",
    detail: ["Washed cotton twill", "Embroidered mark", "Limited seasonal run"],
    sizes: ["One size"],
    src: "/images/products/logo-cap.jpg",
  },
];

export const PRODUCTS = FEATURED_PRODUCTS;

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.shot === slug);
}

export function productsIn(category: CategorySlug): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function categoryBySlug(slug: string | undefined): Category | undefined {
  if (!slug) return undefined;
  return CATEGORIES.find((category) => category.slug === slug);
}

export const CATALOGUE = {
  eyebrow: "Shop",
  title: "The Range",
  deck: "Four pieces, cut in Manila in limited seasonal runs. Matte ripstop, loopback cotton, dry-touch twill.",
} as const;

export const COLLECTIONS = [
  {
    handle: "winter",
    name: "Winter Drop",
    season: `Fall/Winter ${new Date().getFullYear()}`,
    eyebrow: "Collection",
    deck: "The cold-weather run: a taped shell, a brushed crewneck, wide-leg cargos and the cap. Made in Manila, in limited numbers.",
    shots: ["hooded-jacket", "crewneck", "cargo-pants", "cap"] as const,
  },
] as const;

export type Collection = (typeof COLLECTIONS)[number];

export function collectionByHandle(handle: string): Collection | undefined {
  return COLLECTIONS.find((collection) => collection.handle === handle);
}

export type NoteImage = {
  src: string;
  shot: Shot;
  alt: string;
  caption: string;
  /** keeps the subject in frame when the band crops to 4:5 on mobile */
  position?: string;
};

export type JournalNote = {
  slug: string;
  number: string;
  title: string;
  standfirst: string;
  body: readonly string[];
  /** the frame the note opens on */
  image: NoteImage;
  /** a second frame set into the body, never on the same subject twice */
  second?: NoteImage;

};

/** Studio notes. Every claim here is one the range already makes. */
export const JOURNAL_NOTES: JournalNote[] = [
  {
    slug: "ripstop",
    number: "01",
    title: "Why Ripstop",
    standfirst:
      "The grid in the cloth is not a print. It is the reason a tear stops where it starts.",
    body: [
      "Ripstop is woven with a heavier thread at intervals, so the surface carries a visible grid. When the cloth tears, the tear meets a thicker thread and stops there instead of running the length of the panel.",
      "The Utility Hooded Jacket uses a three-layer matte ripstop with the seams taped. The matte finish keeps the shell from reading as technical outerwear under street light; the taped seams are what keep the weather on the outside of it.",
      "It is a practical choice before it is an aesthetic one. The grid is simply what that choice looks like.",
    ],
    image: {
      src: "/images/journal/ripstop-editorial.png",
      shot: "story",
      alt: "Generated editorial study of black ripstop fabric with its woven reinforcement grid visible",
      caption: "Ripstop fabric study — generated editorial image.",
      position: "object-center",
    },
  },
  {
    slug: "cut-in-manila",
    number: "02",
    title: "Cut in Manila",
    standfirst:
      "Every piece in the range is cut and finished in the same city the label was founded in.",
    body: [
      "Marrow was founded in Manila in 2018. The pattern room, the cutting table and the finishing are all local, which is why runs stay small: the same hands that cut the first jacket cut the last one in the run.",
      "Working at that scale means a run closes when the cloth does, not when a forecast says it should. It also means a piece can be corrected between runs instead of carried forward.",
      "The label on the inside says Manila because that is where the work happens.",
    ],
    image: {
      src: "/images/journal/cutting-editorial.png",
      shot: "story",
      alt: "Generated editorial image of hands cutting black cloth along a paper pattern",
      caption: "At the cutting table — generated editorial image.",
      position: "object-center",
    },
  },
  {
    slug: "limited-runs",
    number: "03",
    title: "On Limited Runs",
    standfirst:
      "The range is seasonal and finite. Nothing is restocked mid-season.",
    body: [
      "Each season is cut once. When a size is gone it stays gone until the next run, which is the point of a limited run rather than a marketing line.",
      "It keeps the cloth honest: a shell is made in the quantity the mill can supply, not in the quantity a campaign asks for.",
      "If you want to know when the next one opens, the newsletter is the only place it is announced.",
    ],
    image: {
      src: "/images/journal/limited-runs-editorial.png",
      shot: "story",
      alt: "Generated editorial still life of folded black crewnecks in a small studio",
      caption: "A small production run — generated editorial image.",
      position: "object-center",
    },
  },
];

export function journalNoteBySlug(slug: string): JournalNote | undefined {
  return JOURNAL_NOTES.find((note) => note.slug === slug);
}

/** The one policy the site already states, in one place. */
export const POLICIES = {
  returns: "Free returns within 30 days.",
  origin: "Cut and finished in Manila.",
  runs: "Limited seasonal runs.",
} as const;

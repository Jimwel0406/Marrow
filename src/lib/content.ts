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
    href: "/shop/outerwear",
    shot: "cat-outerwear",
    src: "/images/categories/outerwear.jpg",
  },
  {
    name: "Bottoms",
    href: "/shop/bottoms",
    shot: "cat-bottoms",
    src: "/images/categories/bottoms.jpg",
  },
  {
    name: "Tops",
    href: "/shop/tops",
    shot: "cat-tops",
    src: "/images/categories/tops.jpg",
  },
  {
    name: "Footwear",
    href: "/shop/footwear",
    shot: "cat-footwear",
    src: "/images/categories/footwear.jpg",
  },
  {
    name: "Accessories",
    href: "/shop/accessories",
    shot: "cat-accessories",
    src: "/images/categories/accessories.jpg",
  },
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  name: string;
  price: string;
  currency: "USD";
  amount: number;
  piece: string;
  shot: "hooded-jacket" | "crewneck" | "cargo-pants" | "cap";
  material: string;
  src: string;
};

export const FEATURED_PRODUCTS: Product[] = [
  {
    name: "Utility Hooded Jacket",
    price: "$128",
    currency: "USD",
    amount: 128,
    piece: "MAR-OW-01",
    shot: "hooded-jacket",
    material: "3-layer matte ripstop, taped seams",
    src: "/images/products/utility-hooded-jacket.jpg",
  },
  {
    name: "Essential Crewneck",
    price: "$68",
    currency: "USD",
    amount: 68,
    piece: "MAR-TO-07",
    shot: "crewneck",
    material: "480 gsm brushed loopback cotton",
    src: "/images/products/essential-crewneck.jpg",
  },
  {
    name: "Wide Leg Cargo Pants",
    price: "$98",
    currency: "USD",
    amount: 98,
    piece: "MAR-BT-04",
    shot: "cargo-pants",
    material: "Dry-touch cotton twill, 6 pockets",
    src: "/images/products/wide-leg-cargo-pants.jpg",
  },
  {
    name: "Logo Cap",
    price: "$32",
    currency: "USD",
    amount: 32,
    piece: "MAR-AC-02",
    shot: "cap",
    material: "Washed cotton twill, embroidered mark",
    src: "/images/products/logo-cap.jpg",
  },
];

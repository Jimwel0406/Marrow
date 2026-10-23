"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/content";

export type CartLine = {
  slug: string;
  name: string;
  amount: number;
  price: string;
  src: string;
  shot: Product["shot"];
  size: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (product: Product, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "marrow-bag";

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        !!line &&
        typeof line === "object" &&
        typeof (line as CartLine).slug === "string" &&
        typeof (line as CartLine).size === "string" &&
        typeof (line as CartLine).qty === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* Read after the first paint: the server renders an empty bag, so the
       stored lines must arrive as a deferred update rather than a mismatch. */
    const timer = window.setTimeout(() => {
      setLines(readStorage());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* private mode — the bag simply does not persist */
    }
  }, [lines, ready]);

  const add = useCallback((product: Product, size: string) => {
    setLines((current) => {
      const existing = current.find(
        (line) => line.slug === product.shot && line.size === size,
      );
      if (existing) {
        return current.map((line) =>
          line === existing ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [
        ...current,
        {
          slug: product.shot,
          name: product.name,
          amount: product.amount,
          price: product.price,
          src: product.src,
          shot: product.shot,
          size,
          qty: 1,
        },
      ];
    });
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((line) => !(line.slug === slug && line.size === size))
        : current.map((line) =>
            line.slug === slug && line.size === size ? { ...line, qty } : line,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setLines((current) =>
      current.filter((line) => !(line.slug === slug && line.size === size)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.qty, 0);
    const subtotal = lines.reduce(
      (total, line) => total + line.amount * line.qty,
      0,
    );
    return { lines, count, subtotal, ready, add, setQty, remove, clear };
  }, [lines, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/content";

export function ProductBuy({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [added, setAdded] = useState(false);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 4000);
    return () => window.clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    if (!size) {
      setPrompt(true);
      return;
    }
    add(product, size);
    setPrompt(false);
    setAdded(true);
  }

  return (
    <div className="mt-8">
      <p className="eyebrow text-muted">Size</p>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Size">
        {product.sizes.map((entry) => {
          const selected = size === entry;
          return (
            <button
              key={entry}
              type="button"
              onClick={() => {
                setSize(entry);
                setPrompt(false);
              }}
              aria-pressed={selected}
              className={`min-h-[44px] min-w-[56px] border px-4 text-[16px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
                selected
                  ? "border-ink bg-ink text-ivory"
                  : "border-ink/25 text-charcoal hover:border-ink"
              }`}
            >
              {entry}
            </button>
          );
        })}
      </div>

      {/* Price sits directly above the action, after the choice — the last
          thing read before the button is what it costs */}
      <div className="mt-7 flex items-baseline gap-3">
        <span className="text-[20px] font-semibold text-ink tabular-nums">
          {product.price}
        </span>
        {product.compareAt && (
          <span className="text-[20px] text-muted-2 tabular-nums line-through">
            {product.compareAt}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="btn btn-ink mt-4 w-full"
      >
        {added ? "Added to bag" : "Add to bag"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className="mt-3 min-h-[1.25rem] text-[16px] text-muted"
      >
        {prompt && <span className="text-[#6e2a10]">Choose a size first.</span>}
        {added && (
          <span>
            In your bag.{" "}
            <Link href="/cart" className="underline underline-offset-4">
              View bag
            </Link>
          </span>
        )}
      </p>
    </div>
  );
}

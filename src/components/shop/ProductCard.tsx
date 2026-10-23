"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import type { Product } from "@/lib/content";

/**
 * Product card — one plate, one label stack.
 *
 * The 3:4 plate carries only the controls: swatches top-left, wishlist
 * top-right. Under it, one hard-left stack: name, then price, then fabric.
 * The name is no longer set on the photograph — the studio frames are light,
 * and the scrim was doing work the photography did not need. Price stays in
 * the same stack as the name, current first; compare-at only where a sale is
 * real. The name reserves two lines so the price rows stay level across the
 * grid.
 */
export function ProductCard({ product }: { product: Product }) {
  const variants =
    product.variants && product.variants.length > 0
      ? [{ src: product.src }, ...product.variants]
      : [{ src: product.src }];

  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState(false);
  const frame = variants[Math.min(active, variants.length - 1)];

  return (
    <div className="group relative flex h-full flex-col">
      <Link
        href={`/shop/${product.shot}`}
        className="block focus-visible:outline-offset-4"
      >
        <Photo
          shot={product.shot}
          src={frame.src}
          sizes="(min-width: 992px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
          alt={`${product.name} — ${product.material}`}
          className="photo-zoom aspect-[3/4] w-full"
        />

        <span className="display mt-4 block min-h-[2.4em] text-[16px] leading-[1.2] text-ink">
          {product.name}
        </span>

        <span className="mt-2 flex items-baseline gap-2">
          <span className="text-[16px] font-semibold leading-none text-ink tabular-nums">
            {product.price}
          </span>
          {product.compareAt && (
            <span className="text-[16px] leading-none text-muted tabular-nums line-through">
              {product.compareAt}
            </span>
          )}
        </span>

        <span className="mt-1.5 block text-[16px] leading-[1.6] text-muted">
          {product.material}
        </span>
      </Link>

      {/* Swatch bar — the same frame in every colourway */}
      {variants.length > 1 && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-ivory p-1">
          {variants.map((variant, index) => (
            <button
              key={variant.src}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-label={`${product.name}, view ${index + 1} of ${variants.length}`}
              className={`block h-[44px] w-[42px] overflow-hidden border transition-colors duration-200 ease-[var(--ease-editorial)] ${
                active === index ? "border-ink" : "border-transparent"
              }`}
            >
              <Photo
                shot={product.shot}
                src={variant.src}
                alt=""
                sizes="42px"
                grain={false}
                className="h-full w-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => setSaved((value) => !value)}
        aria-pressed={saved}
        aria-label={
          saved
            ? `Remove ${product.name} from the wishlist`
            : `Save ${product.name} to the wishlist`
        }
        className="absolute top-3 right-3 z-10 grid h-8 w-8 place-items-center text-charcoal/80 drop-shadow-[0_1px_2px_rgba(244,241,236,0.9)] transition-colors duration-200 hover:text-ink"
      >
        <Heart
          className="h-5 w-5"
          strokeWidth={1.5}
          fill={saved ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
}

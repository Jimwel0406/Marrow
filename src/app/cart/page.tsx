"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Photo } from "@/components/media/Photo";
import { useCart } from "@/components/cart/CartProvider";
import { POLICIES } from "@/lib/content";

export default function CartPage() {
  const { lines, count, subtotal, ready, setQty, remove } = useCart();

  return (
    <>
      <PageHeader
        eyebrow="Bag"
        title="Your Bag"
        deck={
          count > 0
            ? `${count} ${count === 1 ? "piece" : "pieces"} held for you. The run is finite, so the bag does not reserve stock.`
            : undefined
        }
      />

      <section aria-label="Bag contents" className="bg-ivory pb-20 lg:pb-28">
        <div className="shell">
          {!ready ? (
            <div className="min-h-[12rem]" />
          ) : lines.length === 0 ? (
            <div className="max-w-[34rem] border-t border-ink/12 pt-8">
              <p className="text-body text-muted">
                Nothing in the bag yet.
              </p>
              <Link
                href="/shop"
                className="rule-link mt-6 text-charcoal hover:text-ink"
              >
                Shop the range
              </Link>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Lines */}
              <ul className="lg:col-span-8">
                {lines.map((line) => (
                  <li
                    key={`${line.slug}-${line.size}`}
                    className="flex gap-5 border-t border-ink/12 py-6 first:border-t-0 first:pt-0 sm:gap-7"
                  >
                    <Link
                      href={`/shop/${line.slug}`}
                      className="block w-[88px] shrink-0 sm:w-[112px]"
                    >
                      <Photo
                        shot={line.shot}
                        src={line.src}
                        sizes="112px"
                        alt={line.name}
                        className="aspect-[3/4] w-full"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <Link
                          href={`/shop/${line.slug}`}
                          className="display block text-[16px] leading-[1.2] text-ink"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1.5 text-[16px] text-muted">
                          Size {line.size}
                        </p>
                        {/* The line total belongs with the item, not at the far
                            edge of the row where it reads as a table column */}
                        <p className="mt-2 text-[16px] font-semibold text-ink tabular-nums">
                          ${(line.amount * line.qty).toFixed(0)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-ink/20">
                          <button
                            type="button"
                            onClick={() =>
                              setQty(line.slug, line.size, line.qty - 1)
                            }
                            aria-label={`Decrease quantity of ${line.name}, size ${line.size}`}
                            className="grid h-10 w-10 place-items-center text-charcoal transition-colors duration-300 hover:text-ink"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                          <span className="w-8 text-center text-[16px] font-semibold text-ink tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQty(line.slug, line.size, line.qty + 1)
                            }
                            aria-label={`Increase quantity of ${line.name}, size ${line.size}`}
                            className="grid h-10 w-10 place-items-center text-charcoal transition-colors duration-300 hover:text-ink"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(line.slug, line.size)}
                          aria-label={`Remove ${line.name}, size ${line.size}`}
                          className="grid h-10 w-10 place-items-center text-muted transition-colors duration-300 hover:text-ink"
                        >
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Summary */}
              <div className="lg:col-span-4">
                <div className="border-t border-ink/12 pt-6 lg:sticky lg:top-[calc(88px+2rem)]">
                  <h2 className="display text-display-sm text-ink">Summary</h2>

                  <dl className="mt-6 space-y-3 text-[16px]">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Subtotal</dt>
                      <dd className="font-semibold text-ink tabular-nums">
                        ${subtotal.toFixed(0)}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Shipping</dt>
                      <dd className="text-muted-2">Calculated at checkout</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-t border-ink/12 pt-3">
                      <dt className="text-ink">Total</dt>
                      <dd className="font-semibold text-ink tabular-nums">
                        ${subtotal.toFixed(0)}
                      </dd>
                    </div>
                  </dl>

                  <Link href="/checkout" className="btn btn-ink mt-7 w-full">
                    Checkout
                  </Link>

                  <p className="mt-4 text-[16px] leading-[1.6] text-muted-2">
                    {POLICIES.returns} {POLICIES.origin}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

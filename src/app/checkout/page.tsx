"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { useCart, type CartLine } from "@/components/cart/CartProvider";

const FIELD =
  "mt-2 w-full border border-ink/25 bg-transparent px-4 py-3 text-[16px] text-ink transition-colors duration-300 placeholder:text-muted-2 focus:border-ink";
const LABEL = "text-[16px] font-semibold uppercase tracking-[0.16em] text-muted";
const GROUP = "display text-[16px] font-semibold uppercase tracking-[0.18em] text-ink";

type Placed = { lines: CartLine[]; total: number; email: string };

export default function CheckoutPage() {
  const { lines, subtotal, ready, clear } = useCart();
  const [placed, setPlaced] = useState<Placed | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();

    const email = value("email");
    const card = value("card").replace(/\s+/g, "");
    const expiry = value("expiry");
    const cvc = value("cvc");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter an email address we can send the confirmation to.");
      return;
    }
    if (!value("firstName") || !value("address") || !value("city") || !value("postal")) {
      setError("Fill in the delivery address, including city and postal code.");
      return;
    }
    if (!/^\d{13,19}$/.test(card)) {
      setError("Enter a card number (13–19 digits).");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(expiry)) {
      setError("Use MM/YY for the expiry.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvc)) {
      setError("Enter the 3 or 4 digit security code.");
      return;
    }

    setError("");
    setPlaced({ lines, total: subtotal, email });
    clear();
  }

  if (placed) {
    return (
      <>
        <PageHeader
          eyebrow="Checkout"
          title="Order Confirmed"
          deck={`Held under ${placed.email}. Nothing was charged — this checkout is a demo.`}
        />

        <section aria-label="Order summary" className="bg-ivory pb-20 lg:pb-28">
          <div className="shell max-w-[46rem]">
            <ul className="divide-y divide-ink/12 border-y border-ink/12">
              {placed.lines.map((line) => (
                <li
                  key={`${line.slug}-${line.size}`}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <div>
                    <p className="display text-[16px] text-ink">{line.name}</p>
                    <p className="mt-1 text-[16px] text-muted">
                      Size {line.size} · Qty {line.qty}
                    </p>
                  </div>
                  <span className="text-[16px] font-semibold text-ink tabular-nums">
                    ${(line.amount * line.qty).toFixed(0)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline justify-between gap-6 py-4">
              <span className="text-[16px] text-ink">Total</span>
              <span className="text-[16px] font-semibold text-ink tabular-nums">
                ${placed.total.toFixed(0)}
              </span>
            </div>

            <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.6] text-muted-2">
              No payment was taken and no order was sent anywhere. The bag has
              been emptied.
            </p>

            <Link href="/shop" className="rule-link mt-8 text-charcoal hover:text-ink">
              Back to the range
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Checkout"
        deck="Delivery details and a card. No payment is taken in this demo, and nothing is sent."
      />

      <section aria-label="Checkout form" className="bg-ivory pb-20 lg:pb-28">
        <div className="shell">
          {!ready ? (
            <div className="min-h-[12rem]" />
          ) : lines.length === 0 ? (
            <div className="max-w-[34rem] border-t border-ink/12 pt-8">
              <p className="text-body text-muted">
                The bag is empty, so there is nothing to check out.
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
              <form onSubmit={handleSubmit} noValidate className="max-w-[38rem] lg:col-span-7">
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.16em] text-muted uppercase transition-colors duration-300 hover:text-ink"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Back to bag
                </Link>

                {/* Contact */}
                <fieldset className="mt-8 border-t border-ink/12 pt-6">
                  <legend className={GROUP}>Contact</legend>
                  <label htmlFor="email" className={`mt-5 block ${LABEL}`}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    className={FIELD}
                  />
                </fieldset>

                {/* Delivery */}
                <fieldset className="mt-10 border-t border-ink/12 pt-6">
                  <legend className={GROUP}>Delivery</legend>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={LABEL}>
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        required
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={LABEL}>
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <label htmlFor="address" className={`mt-4 block ${LABEL}`}>
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    required
                    className={FIELD}
                  />

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <label htmlFor="city" className={LABEL}>
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        required
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="postal" className={LABEL}>
                        Postal code
                      </label>
                      <input
                        id="postal"
                        name="postal"
                        autoComplete="postal-code"
                        required
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className={LABEL}>
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className={`${FIELD} appearance-none`}
                      >
                        <option>Philippines</option>
                        <option>Singapore</option>
                        <option>Japan</option>
                        <option>Australia</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Germany</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Payment */}
                <fieldset className="mt-10 border-t border-ink/12 pt-6">
                  <legend className={GROUP}>Payment</legend>

                  <label htmlFor="card" className={`mt-5 block ${LABEL}`}>
                    Card number
                  </label>
                  <input
                    id="card"
                    name="card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    required
                    className={FIELD}
                  />

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="expiry" className={LABEL}>
                        Expiry
                      </label>
                      <input
                        id="expiry"
                        name="expiry"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        required
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className={LABEL}>
                        Security code
                      </label>
                      <input
                        id="cvc"
                        name="cvc"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="CVC"
                        required
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-[16px] leading-[1.6] text-muted-2">
                    Demo checkout: no card is charged, no card data leaves this
                    page, and no order is created.
                  </p>
                </fieldset>

                <p
                  role="status"
                  aria-live="polite"
                  className="mt-6 min-h-[1.25rem] text-[16px] text-[#6e2a10]"
                >
                  {error}
                </p>

                <button type="submit" className="btn btn-ink mt-2 w-full sm:w-auto">
                  Place order
                </button>
              </form>

              {/* Order summary — above the fields on phones, beside them on
                  desktop, so what you are buying is read before what you type */}
              <aside className="order-first lg:order-none lg:col-span-5">
                <div className="border-t border-ink/12 pt-6 lg:sticky lg:top-[calc(88px+2rem)]">
                  <h2 className="display text-display-sm text-ink">In the bag</h2>

                  <ul className="mt-6 divide-y divide-ink/12 border-b border-ink/12">
                    {lines.map((line) => (
                      <li
                        key={`${line.slug}-${line.size}`}
                        className="flex items-baseline justify-between gap-5 py-3"
                      >
                        <div>
                          <p className="text-[16px] text-ink">{line.name}</p>
                          <p className="mt-0.5 text-[16px] text-muted">
                            Size {line.size} · Qty {line.qty}
                          </p>
                        </div>
                        <span className="text-[16px] font-semibold text-ink tabular-nums">
                          ${(line.amount * line.qty).toFixed(0)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-4 space-y-3 text-[16px]">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Subtotal</dt>
                      <dd className="font-semibold text-ink tabular-nums">
                        ${subtotal.toFixed(0)}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Shipping</dt>
                      <dd className="text-muted-2">Not calculated</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-t border-ink/12 pt-3">
                      <dt className="text-ink">Total</dt>
                      <dd className="font-semibold text-ink tabular-nums">
                        ${subtotal.toFixed(0)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

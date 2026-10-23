"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { PRODUCTS, categoryBySlug } from "@/lib/content";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!term) return PRODUCTS;
    return PRODUCTS.filter((product) => {
      const category = categoryBySlug(product.category)?.name ?? "";
      return `${product.name} ${product.material} ${category}`
        .toLowerCase()
        .includes(term);
    });
  }, [term]);

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Find a Piece"
        deck="Search the range by name, cloth or category."
      />

      <section aria-label="Search results" className="bg-ivory pb-20 lg:pb-28">
        <div className="shell">
          <label htmlFor="search" className="sr-only">
            Search the range
          </label>
          <input
            id="search"
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ripstop, crewneck, outerwear…"
            className="w-full max-w-[36rem] border-0 border-b border-ink/30 bg-transparent pb-3 text-[clamp(1.1rem,2vw,1.5rem)] text-ink placeholder:text-muted-2 focus:border-ink focus:outline-none"
          />

          <p className="mt-5 text-[16px] text-muted">
            {results.length} {results.length === 1 ? "result" : "results"}
            {term ? ` for “${query.trim()}”` : ""}
          </p>

          <div className="mt-8">
            {results.length > 0 ? (
              <ProductGrid products={results} />
            ) : (
              <div className="max-w-[34rem] border-t border-ink/12 pt-6">
                <p className="text-body text-muted">
                  Nothing matches that. The range is four pieces: ripstop
                  outerwear, a loopback crewneck, wide-leg cargos and a cap.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POLICIES, type Product } from "@/lib/content";

/**
 * The specification spread under a product: a numbered label column on the
 * left, the facts set as a ruled table on the right. The description stays up
 * in the buy block, so this is the long-form half of the page — material,
 * construction, sizes, run — and never repeats the line above the fold.
 */
export function ProductStory({ product }: { product: Product }) {
  const rows: { term: string; value: readonly string[] }[] = [
    { term: "Material", value: [product.material] },
    { term: "Construction", value: product.detail },
    { term: "Sizes", value: [product.sizes.join(" · ")] },
    { term: "The run", value: [POLICIES.runs, POLICIES.origin] },
    { term: "Returns", value: [POLICIES.returns] },
  ];

  return (
    <section aria-labelledby="specification-heading" className="bg-ivory pb-16 lg:pb-24">
      <div className="shell">
        <div className="grid gap-10 border-t border-ink/12 pt-9 lg:grid-cols-12 lg:gap-14 lg:pt-12">
          <div className="lg:col-span-4">
            <h2
              id="specification-heading"
              className="display text-display-sm text-ink"
            >
              Specification
            </h2>

            <p className="mt-5 max-w-[22rem] text-body text-muted">
              Every figure below is a fact about the run, not a marketing line.
            </p>

            <Link
              href="/journal"
              className="rule-link mt-7 text-charcoal hover:text-ink"
            >
              How it is made
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="border-t border-ink/12">
              {rows.map((row) => (
                <div
                  key={row.term}
                  className="grid gap-2 border-b border-ink/12 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="text-[16px] font-semibold tracking-[0.18em] text-muted-2 uppercase">
                    {row.term}
                  </dt>

                  <dd className="space-y-1 text-[16px] leading-[1.55] text-charcoal">
                    {row.value.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

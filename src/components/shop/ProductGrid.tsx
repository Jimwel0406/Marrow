import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/content";

export function ProductGrid({
  products,
  reveal = "stagger-sm",
  layout = "catalogue",
}: {
  products: Product[];
  reveal?: string;
  /** "catalogue": 4-up flush grid. "pair": two columns, the second dropped
   *  one step at desktop so the grid reads as a lookbook, not a shelf. */
  layout?: "catalogue" | "pair";
}) {
  const grid =
    layout === "pair"
      ? "grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:gap-x-8 lg:gap-y-16 min-[480px]:[&>li:nth-child(even)]:mt-0 lg:[&>li:nth-child(even)]:mt-28"
      : "grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 min-[768px]:grid-cols-3 min-[992px]:grid-cols-4";
  return (
    <ul className={grid} data-reveal={reveal}>
      {products.map((product) => (
        <li key={product.name} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

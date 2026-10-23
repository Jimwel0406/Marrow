import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section
      aria-labelledby="notfound-heading"
      className="bg-ivory pt-[calc(64px+4rem)] pb-24 lg:pt-[calc(88px+6rem)] lg:pb-32"
    >
      <div className="shell">
        <p className="eyebrow text-muted">404</p>

        <h1
          id="notfound-heading"
          className="page-title page-title-utility mt-5 max-w-[18ch] text-ink"
        >
          Nothing on this rail.
        </h1>

        <p className="mt-6 max-w-[34rem] text-body text-muted">
          The page you asked for is not part of the current run. The range,
          the collections and the studio notes are all still open.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-4">
          <Link href="/shop" className="rule-link text-charcoal hover:text-ink">
            Shop the range
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
          <Link href="/collections" className="rule-link text-charcoal hover:text-ink">
            Collections
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
          <Link href="/journal" className="rule-link text-charcoal hover:text-ink">
            Journal
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}

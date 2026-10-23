"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Photo } from "@/components/media/Photo";

const FIELD =
  "mt-3 block w-full rounded-none border-0 border-b border-ink/35 bg-transparent px-0 pt-2 pb-5 text-[16px] text-ink transition-colors duration-300 placeholder:text-muted-2 focus:border-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-ink";
const LABEL = "text-[16px] font-semibold uppercase tracking-[0.08em] text-muted";

export default function AccountPage() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <section
      aria-labelledby="account-heading"
      className="grid bg-ivory pt-16 text-ink lg:min-h-[calc(100dvh-100px)] lg:grid-cols-2 lg:pt-[88px]"
    >
      <Photo
        src="/images/account/editorial-portrait.png"
        shot="story"
        alt="Generated editorial portrait of a model in black technical outerwear beside a brushed metal wall"
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority
        quality={90}
        grain={false}
        className="h-64 sm:h-80 lg:h-auto lg:min-h-[42rem]"
        imgClassName="object-[50%_15%]"
      />
      <div className="flex items-center px-5 py-12 sm:px-12 lg:px-[5vw] lg:py-16">
        <div className="mx-auto w-full max-w-[26.25rem]" data-reveal="rise">
          <div>
            <p className="eyebrow text-muted">Account</p>
            <h1
              id="account-heading"
              className="page-title page-title-utility mt-5"
            >
              Sign <em>in.</em>
            </h1>
            <p id="account-description" className="mt-6 text-body text-muted">
              Accounts open with the next drop.<br />
              Until then, checkout works as a guest.
            </p>
          </div>

          <form onSubmit={handleSubmit} aria-describedby="account-description" className="mt-8">
            <label htmlFor="account-email" className={LABEL}>Email</label>
            <input
              id="account-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Your email address"
              className={FIELD}
            />

            <label htmlFor="password" className={`mt-7 block ${LABEL}`}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className={FIELD}
            />

            <button type="submit" className="btn btn-ink group mt-7 w-full gap-5">
              Sign in
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>

            <p role="status" aria-live="polite" className={notice ? "mt-4 text-[16px] leading-[1.6] text-muted" : "sr-only"}>
              {notice && "Accounts are not live yet, so no sign-in was attempted. Checkout works as a guest."}
            </p>
          </form>

          <nav aria-label="Account links" className="mt-5">
            <ul className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[16px] text-muted">
              {[
                { href: "/cart", label: "The bag" },
                { href: "/#newsletter", label: "Newsletter" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="inline-flex min-h-11 items-center gap-1 underline-offset-4 transition-colors hover:text-ink hover:underline">
                    {label} <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}


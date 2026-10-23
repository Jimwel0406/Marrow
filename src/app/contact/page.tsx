"use client";

import { useState, type FormEvent } from "react";
import { Photo } from "@/components/media/Photo";

const FIELD =
  "mt-3 block w-full rounded-none border-0 border-b border-ink/35 bg-transparent px-0 pt-2 pb-5 text-[16px] text-ink transition-colors duration-300 placeholder:text-muted-2 focus:border-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-ink";
const LABEL = "text-[16px] font-semibold uppercase tracking-[0.08em] text-muted";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-ivory pt-16 text-ink lg:pt-[88px]"
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <Photo
          src="/images/contact/studio-portrait.png"
          shot="story"
          alt="Generated editorial portrait of a woman in charcoal outerwear beside a studio window"
          sizes="(min-width: 1024px) 45vw, 100vw"
          quality={90}
          priority
          grain={false}
          className="h-72 sm:h-96 lg:h-auto lg:min-h-[48rem]"
          imgClassName="object-[50%_25%]"
        />
        <div className="min-w-0 px-5 py-12 sm:px-12 lg:px-[5vw] lg:py-14">
        <div className="mx-auto max-w-[34rem]" data-reveal="rise">
          <p className="eyebrow text-muted">Contact</p>
          <h1
            id="contact-heading"
            className="page-title page-title-utility mt-5"
          >
            Get in <em>touch.</em>
          </h1>
          <p className="mt-5 max-w-[27rem] text-body text-muted">
            The studio reads everything. Direct message on Instagram is the fastest route.
          </p>
          <ul aria-label="Social links" className="mt-4 flex flex-wrap gap-x-6">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="me noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1 text-[16px] underline-offset-4 hover:underline"
                >
                  {label}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[16px] leading-[1.75] text-muted">
            Questions about an order?{" "}
            <a href="/shipping" className="inline-flex min-h-11 items-center gap-2 text-ink underline-offset-4 hover:underline">
              Shipping &amp; returns <span aria-hidden="true">↗</span>
            </a>
          </p>

        <form onSubmit={handleSubmit} aria-label="Contact the studio" className="mt-7 min-w-0">
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={LABEL}>Name</label>
              <input id="name" name="name" autoComplete="name" placeholder="Your name" required className={FIELD} />
            </div>
            <div>
              <label htmlFor="contact-email" className={LABEL}>Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Your email address" required className={FIELD} />
            </div>
          </div>
          <label htmlFor="message" className={`mt-8 block ${LABEL}`}>Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="What would you like to know?"
            required
            className={`${FIELD} min-h-[10rem] resize-y`}
          />
          <button type="submit" className="btn btn-ink group mt-7 w-full gap-5 sm:w-auto">
            Send message
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </button>
          <p role="status" aria-live="polite" className="mt-3 min-h-5 max-w-[34rem] text-[16px] leading-[1.6] text-muted">
            {sent && "Nothing was sent — this form has no inbox behind it yet. Message the studio on Instagram and it will be answered there."}
          </p>
        </form>
        </div>
        </div>
      </div>
    </section>
  );
}

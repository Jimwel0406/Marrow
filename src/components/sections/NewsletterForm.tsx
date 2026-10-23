"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./Newsletter.module.css";

type Status = "idle" | "error" | "success";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative mt-8 min-h-[7.5rem] text-left">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      {/* Stack on small screens so the larger field and action stay readable. */}
      <div
        className={`${styles.field} flex flex-col items-stretch gap-3 border-b sm:flex-row sm:items-center py-3 transition-colors duration-300 focus-within:border-ink sm:gap-6 ${
          status === "error" ? "border-[#6e2a10]" : "border-ink"
        }`}
      >
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Your email address"
          value={email}
          aria-invalid={status === "error"}
          aria-describedby="newsletter-status"
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          className="min-w-0 flex-1 bg-transparent py-3 text-[18px] leading-normal text-ink placeholder:text-muted lg:text-[22px]"
        />

        <button
          type="submit"
          aria-label="Subscribe to the Marrow newsletter"
          className={`${styles.button} inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-ink px-4 py-4 text-[16px] leading-none font-semibold tracking-[0.12em] text-ivory uppercase hover:bg-charcoal sm:px-6 lg:text-[18px]`}
        >
          Sign Up
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>

      <p
        id="newsletter-status"
        role="status"
        aria-live="polite"
        className="mt-3 text-[16px] leading-relaxed text-ink/80"
      >
        {status === "error" && (
          <span className="text-[#3a1206]">
            Enter a valid email address, for example name@example.com.
          </span>
        )}
        {status === "success" && (
          <span>
            You&rsquo;re on the list. We&rsquo;ll email you before the next drop
            goes live.
          </span>
        )}
      </p>
    </form>
  );
}

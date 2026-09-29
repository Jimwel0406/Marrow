"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

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
    <form onSubmit={handleSubmit} noValidate className="mt-9 max-w-[26rem]">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <div
        className={`flex items-stretch border border-ink transition-colors duration-300 ${
          status === "error" ? "border-[#6e2a10]" : ""
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
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-micro text-ink placeholder:text-ink/60 focus:outline-none"
        />

        <button
          type="submit"
          aria-label="Subscribe to the Marrow newsletter"
          className="flex w-14 shrink-0 items-center justify-center text-ink transition-colors duration-300 hover:bg-ink hover:text-dusk"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      <p
        id="newsletter-status"
        role="status"
        aria-live="polite"
        className="mt-3 min-h-[1.25rem] text-[13px] font-medium text-ink/80"
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

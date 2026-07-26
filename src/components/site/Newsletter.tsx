"use client";
import { useState, type FormEvent } from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSent(true);
  }

  return (
    <Section tone="cream" size="sm">
      <div className="rounded-2xl bg-forest-deep text-cream p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center overflow-hidden relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full opacity-[0.09]"
          style={{
            background:
              "conic-gradient(from 0deg, var(--saffron), transparent 12%, var(--crimson) 24%, transparent 36%, var(--cream) 48%, transparent 60%)",
          }}
        />
        <div className="lg:col-span-6 relative">
          <div className="eyebrow text-saffron flex items-center gap-3">
            <span className="hairline bg-saffron" />
            <span>Season letter</span>
          </div>
          <h2 className="mt-5 font-serif text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05]">
            Tour dates, new work
            <br />
            <span className="italic text-saffron">and stories from backstage.</span>
          </h2>
          <p className="mt-5 text-cream/70 max-w-md">
            Four letters a year. No noise. Unsubscribe in one click.
          </p>
        </div>
        <form onSubmit={onSubmit} className="lg:col-span-6 relative">
          {sent ? (
            <p className="font-serif text-xl text-saffron">
              Thank you — we&rsquo;ll be in touch before the next season.
            </p>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="eyebrow text-cream/60">
                    Your email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="mt-3 w-full bg-transparent border-b border-cream/25 focus:border-saffron outline-none py-3 text-cream placeholder:text-cream/40 transition-colors"
                  />
                </div>
                <Button type="submit" variant="saffron" size="pill">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-xs text-cream/45">
                By subscribing you agree to receive occasional emails from
                Yakshamitraru Germany e.V.
              </p>
            </>
          )}
        </form>
      </div>
    </Section>
  );
}
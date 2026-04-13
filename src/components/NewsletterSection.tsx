"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: email, email, message: "Newsletter sign-up", subject: "Newsletter" }),
    });
    setDone(true);
  }

  return (
    <section className="bg-[#43523d] py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#facc15] mb-3">Stay Connected</p>
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Island Updates Newsletter
        </h2>
        <p className="text-white/60 text-sm mb-8">
          New islands, volunteer openings, festivals, and akiya listings — delivered monthly. No spam.
        </p>
        {done ? (
          <p className="text-[#facc15] font-bold text-lg">✓ You&apos;re on the list!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full px-5 py-3 text-sm text-[#43523d] focus:outline-none"
              placeholder="your@email.com"
            />
            <button
              type="submit"
              className="bg-[#facc15] text-[#43523d] font-bold px-7 py-3 rounded-full hover:bg-yellow-300 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";

const STORIES: {
  name: string;
  location: string;
  avatar: string;
  date: string;
  story: string;
  island: string;
  type: string;
}[] = [];

export default function CommunityPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", island: "", story: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Submission failed. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />
      <TabNav />

      {/* Header */}
      <div className="bg-[#43523d] text-white px-5 py-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#facc15] mb-2">Community</p>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Community Voices
        </h1>
        <p className="text-white/70 text-sm max-w-lg">
          Real stories from people who came to Japan's islands and were changed by them.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Stories */}
        <div id="stories" className="space-y-4">
          {STORIES.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-[#43523d]/10 shadow-sm text-center">
              <p className="text-3xl mb-3">🌿</p>
              <p className="text-sm font-bold text-[#43523d] mb-1">Be the first to share your story</p>
              <p className="text-xs text-[#43523d]/60">Stories from volunteers, residents, and researchers will appear here.</p>
            </div>
          ) : (
            STORIES.map((story) => (
              <div key={story.name} className="bg-white rounded-2xl p-5 border border-[#43523d]/10 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-[#43523d] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {story.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#43523d]">{story.name}</p>
                    <p className="text-xs text-[#a97a5e] truncate">{story.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs bg-[#43523d]/10 text-[#43523d] px-2 py-0.5 rounded-full font-medium">
                      {story.type}
                    </span>
                  </div>
                </div>
                <blockquote className="text-sm text-[#43523d]/75 leading-relaxed italic mb-3">
                  &ldquo;{story.story}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between text-xs text-[#43523d]/40">
                  <span>📍 {story.island}</span>
                  <span>{story.date}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Share your story form */}
        <div className="bg-white rounded-2xl p-6 border border-[#43523d]/10 shadow-sm">
          <h2
            className="text-lg font-bold text-[#43523d] mb-1"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            Share Your Story
          </h2>
          <p className="text-sm text-[#43523d]/60 mb-5">
            Have you volunteered, lived, or worked on a Japanese island? We want to hear from you.
          </p>

          {submitted ? (
            <div className="text-center py-6">
              <span className="text-4xl">🙏</span>
              <p className="text-sm font-bold text-[#43523d] mt-3 mb-1">Thank you!</p>
              <p className="text-xs text-[#43523d]/60">Your story has been received. We&apos;ll be in touch soon.</p>
              <p className="text-xs text-[#43523d]/40 mt-1">Check your inbox — we sent you a confirmation email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">{error}</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#43523d] mb-1 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full text-sm border border-[#43523d]/20 rounded-xl px-3 py-2.5 bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d] transition-colors"
                    placeholder="Tanaka Yuki"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#43523d] mb-1 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-sm border border-[#43523d]/20 rounded-xl px-3 py-2.5 bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d] transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#43523d] mb-1 block">Which island?</label>
                <input
                  type="text"
                  value={form.island}
                  onChange={(e) => setForm({ ...form, island: e.target.value })}
                  className="w-full text-sm border border-[#43523d]/20 rounded-xl px-3 py-2.5 bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d] transition-colors"
                  placeholder="Naoshima, Teshima, Amami..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#43523d] mb-1 block">Your Story</label>
                <textarea
                  required
                  rows={5}
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  className="w-full text-sm border border-[#43523d]/20 rounded-xl px-3 py-2.5 bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d] transition-colors resize-none"
                  placeholder="What brought you to the island? What changed for you?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#43523d] text-white text-sm font-bold py-3 rounded-xl hover:bg-[#3a4735] transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Share My Story"}
              </button>
            </form>
          )}
        </div>

        {/* Contact */}
        <div className="bg-[#43523d]/5 rounded-2xl p-5 border border-[#43523d]/10">
          <h3 className="text-sm font-bold text-[#43523d] mb-2">Get in touch directly</h3>
          <p className="text-xs text-[#43523d]/65 mb-3">
            For project enquiries, partnership proposals, or media requests:
          </p>
          <p className="text-sm font-semibold text-[#43523d]">hello@abandonedjapan.network</p>
          <p className="text-xs text-[#43523d]/50 mt-1">We read every email. We reply to all of them.</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

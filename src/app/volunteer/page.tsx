"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const programs = [
  {
    name: "WWOOF Japan",
    tagline: "Work on organic farms & restore traditional homes",
    category: "Farming & Restoration",
    icon: "🌾",
    color: "#43523d",
    description: "WWOOF Japan connects international volunteers with agricultural hosts across Japan's islands and rural regions. The programme is built on a no-money exchange: hosts provide meals and accommodation, WWOOFers contribute 5–6 hours of daily work. Perfect for those wanting authentic rural immersion.",
    activities: [
      "Organic vegetable and rice farming",
      "Traditional homestead restoration",
      "Fishing and beekeeping",
      "Eco-village projects",
      "Food processing and brewing",
      "Animal care"
    ],
    cost: "¥5,500 annual membership",
    duration: "Flexible — from 1 week to several months",
    islands: ["Seto Inland Sea", "Oki Islands", "Amami Archipelago", "Izu Islands"],
    url: "https://www.wwoofjapan.com",
    badge: "Most Popular"
  },
  {
    name: "Setouchi Triennale — Koebi-tai",
    tagline: "Volunteer at the world's most celebrated island art festival",
    category: "Art Festival",
    icon: "🦐",
    color: "#c67d60",
    description: "The Setouchi Triennale is held every 3 years across 17 islands of the Seto Inland Sea and attracts approximately 1 million visitors from Japan and abroad. Koebi-tai (supporter crabs) volunteer in visitor reception, artwork maintenance, ferry coordination, and island events. The festival runs in three seasons: Spring (Apr 18–May 25), Summer (Aug 1–31), and Autumn (Oct 3–Nov 9) in 2025.",
    activities: [
      "Visitor reception and guidance",
      "Artwork installation assistance",
      "Island event coordination",
      "Ferry and transport logistics",
      "Cultural interpretation",
      "Island cleanup and maintenance"
    ],
    cost: "Free — apply via setouchi-artfest.jp",
    duration: "Min. 3 days per season",
    islands: ["Naoshima", "Teshima", "Shodoshima", "Ogijima", "Megijima", "Oshima", "Inujima"],
    url: "https://setouchi-artfest.jp",
    badge: "Featured"
  },
  {
    name: "GoEco — Sado Island Conservation",
    tagline: "Protect the Crested Ibis & restore a Buddhist temple",
    category: "Wildlife Conservation",
    icon: "🦅",
    color: "#a97a5e",
    description: "GoEco's flagship Japan programme combines wildlife conservation with cultural heritage restoration on Sado Island (Niigata Prefecture), Japan's 6th largest island. Rated among GoEco's Best 10 Volunteer Programmes for 2026. Includes a 3-day Tokyo orientation before travelling independently to Sado.",
    activities: [
      "Crested Ibis nest monitoring (only ~500 survive globally)",
      "17th-century terraced rice field maintenance at Ogura",
      "Chokokuji Temple restoration (founded 807 AD)",
      "Bamboo workshop delivery for local schoolchildren",
      "Forest herb collection and tea blending",
      "Abandoned house community projects"
    ],
    cost: "Programme fee applies — see GoEco website",
    duration: "1 week minimum, 2–4 weeks recommended",
    islands: ["Sado Island"],
    url: "https://www.goeco.org/area/volunteer-in-asia/japan/wildlife-conservation-and-cultural-immersion/",
    badge: "GoEco Best 10 — 2026"
  },
  {
    name: "Ogasawara Marine Centre",
    tagline: "Sea turtles & humpback whales on a UNESCO island 1,000km from Tokyo",
    category: "Marine Conservation",
    icon: "🐢",
    color: "#43523d",
    description: "The Ogasawara Marine Centre (NPO ELNA — Everlasting Nature) conducts year-round research and conservation on Chichijima in the remote Ogasawara (Bonin) Islands — a UNESCO World Heritage Site accessible only by a 24-hour ferry from Tokyo. Volunteers monitor green sea turtle nesting, humpback whale migration, and support community education programmes.",
    activities: [
      "Green sea turtle nesting beach monitoring",
      "Humpback whale behavioural research",
      "Artificial breeding and head-starting programmes",
      "Sea turtle tracking studies",
      "Community education at local schools",
      "Marine conservation outreach"
    ],
    cost: "Free — contact info@bonin-ocean.net",
    duration: "Year-round, flexible commitment",
    islands: ["Chichijima (Ogasawara)", "Hahajima"],
    url: "https://bonin-ocean.net",
    badge: "UNESCO World Heritage"
  },
  {
    name: "Workaway Japan",
    tagline: "Creative projects, community work & cultural exchange",
    category: "Work Exchange",
    icon: "🎨",
    color: "#a97a5e",
    description: "Workaway connects volunteers with hosts across Japan for work exchanges covering teaching, art, environmental projects, and community development. Hosts in Hagi (Yamaguchi), rural Kyushu, and island communities regularly seek international volunteers with skills in carpentry, English teaching, creative arts, and permaculture. Room and board provided in exchange for 5 hours of daily work.",
    activities: [
      "Creative art projects in historic port towns",
      "English conversation and teaching",
      "Permaculture and garden design",
      "Guesthouse and eco-lodge support",
      "Community development projects",
      "Cultural documentation and archiving"
    ],
    cost: "€49 annual membership (covers all hosts globally)",
    duration: "Flexible — typically 2 weeks to 3 months",
    islands: ["Various — filter by 'island' on Workaway.info"],
    url: "https://www.workaway.info",
    badge: null
  }
];

export default function VolunteerPage() {
  const [form, setForm] = useState({ name: "", email: "", island: "", skills: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState({ email: "", done: false });

  async function handleVolunteer(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Volunteer Sign-Up" }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newsletter.email, email: newsletter.email, message: "Newsletter sign-up", subject: "Newsletter" }),
    });
    setNewsletter((n) => ({ ...n, done: true }));
  }

  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#f4f1ea]">
        {/* Header */}
        <div className="bg-[#43523d] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-yellow-400 text-sm tracking-widest mb-2 font-medium">VOLUNTEER PROGRAMMES</p>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Give Back to Japan&apos;s Islands
            </h1>
            <p className="text-white/70 max-w-2xl text-lg">
              Five verified programmes connecting international volunteers with island communities, conservation projects, and cultural restoration across Japan.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { value: "5", label: "Partner Organisations" },
              { value: "17+", label: "Islands Covered" },
              { value: "¥0", label: "Most Programmes" },
              { value: "Year-round", label: "Opportunities" }
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-5 text-center shadow-sm">
                <div className="text-2xl font-bold text-[#c67d60] font-serif">{s.value}</div>
                <div className="text-sm text-[#a97a5e] font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Programme cards */}
          <div className="space-y-8">
            {programs.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ backgroundColor: `${p.color}20` }}
                    >
                      {p.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold font-serif text-[#43523d]">{p.name}</h2>
                        {p.badge && (
                          <span
                            className="text-xs font-bold px-2 py-1 rounded text-white"
                            style={{ backgroundColor: p.color }}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#c67d60] font-medium mb-4">{p.tagline}</p>
                      <p className="text-gray-700 leading-relaxed mb-6">{p.description}</p>

                      {/* Activities */}
                      <div className="mb-6">
                        <h3 className="text-sm font-bold text-[#43523d] uppercase tracking-wider mb-3">Activities</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {p.activities.map((a) => (
                            <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-[#c67d60] mt-0.5 flex-shrink-0">▸</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Meta */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#f4f1ea] rounded-xl p-4">
                          <div className="text-xs font-bold text-[#a97a5e] uppercase tracking-wider mb-1">Cost</div>
                          <div className="text-sm font-medium text-[#43523d]">{p.cost}</div>
                        </div>
                        <div className="bg-[#f4f1ea] rounded-xl p-4">
                          <div className="text-xs font-bold text-[#a97a5e] uppercase tracking-wider mb-1">Duration</div>
                          <div className="text-sm font-medium text-[#43523d]">{p.duration}</div>
                        </div>
                        <div className="bg-[#f4f1ea] rounded-xl p-4">
                          <div className="text-xs font-bold text-[#a97a5e] uppercase tracking-wider mb-1">Islands</div>
                          <div className="text-sm font-medium text-[#43523d]">{p.islands.slice(0, 2).join(", ")}{p.islands.length > 2 ? ` +${p.islands.length - 2} more` : ""}</div>
                        </div>
                      </div>

                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: p.color }}
                      >
                        Visit {p.name} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer sign-up form */}
          <div className="mt-16 bg-white rounded-2xl shadow-md p-8 md:p-10">
            <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-2">Sign Up to Volunteer</h2>
            <p className="text-[#a97a5e] mb-8">Tell us about yourself and which island or programme interests you. We&apos;ll connect you directly.</p>
            {submitted ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">🙏</p>
                <p className="font-bold text-[#43523d] text-lg mb-1">Thank you!</p>
                <p className="text-[#43523d]/60 text-sm">We&apos;ll be in touch within a few days with next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleVolunteer} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#43523d] uppercase tracking-wider mb-1.5">Your Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#43523d]/20 rounded-xl px-4 py-3 text-sm bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d]"
                      placeholder="Tanaka Yuki" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#43523d] uppercase tracking-wider mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-[#43523d]/20 rounded-xl px-4 py-3 text-sm bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d]"
                      placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#43523d] uppercase tracking-wider mb-1.5">Which island or programme?</label>
                  <input value={form.island} onChange={e => setForm({ ...form, island: e.target.value })}
                    className="w-full border border-[#43523d]/20 rounded-xl px-4 py-3 text-sm bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d]"
                    placeholder="Naoshima, Teshima, Setouchi Triennale, Ogasawara..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#43523d] uppercase tracking-wider mb-1.5">Skills & background</label>
                  <input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })}
                    className="w-full border border-[#43523d]/20 rounded-xl px-4 py-3 text-sm bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d]"
                    placeholder="Carpentry, farming, photography, Japanese..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#43523d] uppercase tracking-wider mb-1.5">Tell us more</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-[#43523d]/20 rounded-xl px-4 py-3 text-sm bg-[#f4f1ea] text-[#43523d] focus:outline-none focus:border-[#43523d] resize-none"
                    placeholder="When are you available? What draws you to these islands?" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-[#43523d] text-white font-bold py-4 rounded-xl hover:bg-[#3a4735] transition-colors disabled:opacity-50">
                  {loading ? "Sending..." : "Express Interest →"}
                </button>
              </form>
            )}
          </div>

          {/* Newsletter */}
          <div className="mt-8 bg-[#facc15] rounded-2xl p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#43523d]/60 mb-2">Stay Connected</p>
            <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-2">Island Updates Newsletter</h2>
            <p className="text-[#43523d]/70 text-sm mb-6 max-w-md mx-auto">New islands, volunteer openings, festivals, and akiya listings — delivered monthly. No spam.</p>
            {newsletter.done ? (
              <p className="font-bold text-[#43523d]">✓ You&apos;re on the list!</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input required type="email" value={newsletter.email}
                  onChange={e => setNewsletter(n => ({ ...n, email: e.target.value }))}
                  className="flex-1 border-2 border-[#43523d]/30 rounded-full px-5 py-3 text-sm bg-white text-[#43523d] focus:outline-none focus:border-[#43523d]"
                  placeholder="your@email.com" />
                <button type="submit" className="bg-[#43523d] text-white font-bold px-7 py-3 rounded-full hover:bg-[#3a4735] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

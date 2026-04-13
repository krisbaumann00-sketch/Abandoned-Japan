"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const INTEREST_OPTIONS = [
  "Enquire about a property",
  "Join a volunteer programme",
  "Register for an event",
  "Report an abandoned property",
  "Partner organisation enquiry",
  "General question"
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: INTEREST_OPTIONS[0],
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Submission failed.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#f4f1ea]">
        <div className="bg-[#43523d] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-yellow-400 text-sm tracking-widest mb-2 font-medium">GET IN TOUCH</p>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Contact Us</h1>
            <p className="text-white/70 max-w-xl text-lg">
              Property enquiries, volunteer programme questions, or anything else — we respond within 48 hours.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <div className="bg-white rounded-2xl p-12 shadow-md text-center">
                  <div className="text-6xl mb-6">✅</div>
                  <h2 className="text-3xl font-bold font-serif text-[#43523d] mb-4">Message Received!</h2>
                  <p className="text-[#a97a5e] mb-8">
                    Thank you for reaching out. We&apos;ll be in touch within 48 hours.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/properties" className="bg-[#43523d] text-white px-6 py-3 rounded-full font-bold hover:bg-[#c67d60] transition-colors">
                      Browse Properties
                    </Link>
                    <Link href="/events" className="border-2 border-[#43523d] text-[#43523d] px-6 py-3 rounded-full font-bold hover:bg-[#43523d] hover:text-white transition-colors">
                      View Events
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md">
                  <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-8">Send a Message</h2>

                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-[#43523d] mb-2 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-xl focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                          placeholder="Tanaka Hiroshi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#43523d] mb-2 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-xl focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-[#43523d] mb-2 uppercase tracking-wider">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-xl focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                          placeholder="+81 90-xxxx-xxxx"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#43523d] mb-2 uppercase tracking-wider">
                          I&apos;m Interested In *
                        </label>
                        <select
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-xl focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                        >
                          {INTEREST_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#43523d] mb-2 uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        minLength={10}
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-xl focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d] resize-none"
                        placeholder="Tell us about your interest — which property, event, or programme you're asking about..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-[#43523d] text-white py-4 rounded-full font-bold text-lg hover:bg-[#c67d60] transition-colors disabled:opacity-50"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </button>

                    <p className="text-xs text-center text-[#a97a5e]">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" className="underline hover:text-[#43523d]">Privacy Policy</Link>.
                      We will never share your details.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#43523d] text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold font-serif mb-4">Quick Links</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Browse all properties", href: "/properties" },
                    { label: "Upcoming events", href: "/events" },
                    { label: "Volunteer programmes", href: "/volunteer" },
                    { label: "Report abandoned property", href: "/report-house" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-2 text-white/80 hover:text-yellow-400 transition-colors"
                    >
                      <span>→</span> {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold font-serif text-[#43523d] mb-4">External Resources</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { name: "OldHousesJapan.com", url: "https://www.oldhousesjapan.com" },
                    { name: "AkiyaBanks.com", url: "https://www.akiyabanks.com" },
                    { name: "WWOOF Japan", url: "https://www.wwoofjapan.com" },
                    { name: "Setouchi Triennale", url: "https://setouchi-artfest.jp" },
                    { name: "GoEco Japan", url: "https://www.goeco.org/area/volunteer-in-asia/japan/wildlife-conservation-and-cultural-immersion/" },
                    { name: "Ogasawara Marine Centre", url: "https://bonin-ocean.net" },
                  ].map((r) => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#43523d] hover:text-[#c67d60] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c67d60]"></span>
                      {r.name} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

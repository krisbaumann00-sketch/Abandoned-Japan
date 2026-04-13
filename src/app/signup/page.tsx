"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Account created! You can now sign in.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-[#f4f1ea]">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="border-2 border-[#43523d] px-3 py-2 rounded inline-block mb-4">
              <div className="text-lg font-bold tracking-widest font-serif text-[#43523d]">ABANDONED JAPAN</div>
            </div>
            <h1 className="text-3xl font-bold font-serif text-[#43523d]">Join the Network</h1>
            <p className="text-[#a97a5e] mt-2">Create your free conservation account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {success} <Link href="/login" className="font-bold underline">Sign in now</Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#43523d] mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-lg focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                placeholder="Tanaka Hiroshi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#43523d] mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-lg focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#43523d] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-lg focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                placeholder="Minimum 8 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#facc15] text-[#43523d] py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Free Account"}
            </button>
          </form>

          <p className="text-center text-sm text-[#a97a5e] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#43523d] font-bold hover:text-[#c67d60] transition-colors">Sign in</Link>
          </p>
          <p className="text-center text-xs text-gray-400 mt-4">
            By creating an account you agree to our{" "}
            <Link href="/privacy-policy" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

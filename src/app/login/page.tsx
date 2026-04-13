"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        window.location.href = "/dashboard";
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
            <h1 className="text-3xl font-bold font-serif text-[#43523d]">Welcome Back</h1>
            <p className="text-[#a97a5e] mt-2">Sign in to your conservation account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#43523d] mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-lg focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#43523d] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[#a97a5e]/30 rounded-lg focus:outline-none focus:border-[#43523d] bg-[#f4f1ea] text-[#43523d]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#43523d] text-white py-3 rounded-full font-bold text-lg hover:bg-[#c67d60] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-[#a97a5e] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#43523d] font-bold hover:text-[#c67d60] transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

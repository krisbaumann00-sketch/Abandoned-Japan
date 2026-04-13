"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#43523d] text-[#f4f1ea]">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Torii gate icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="1" y="4" width="26" height="3.5" rx="1.75" fill="#facc15" />
            <rect x="4" y="7.5" width="20" height="2.5" rx="1.25" fill="#facc15" />
            <rect x="6" y="10" width="3" height="15" rx="1.5" fill="#f4f1ea" />
            <rect x="19" y="10" width="3" height="15" rx="1.5" fill="#f4f1ea" />
          </svg>
          <span
            className="text-base font-semibold tracking-wide leading-none"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            Abandoned Japan
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/islands" className="hover:text-[#facc15] transition-colors">Islands</Link>
          <Link href="/akiya" className="hover:text-[#facc15] transition-colors">Akiya</Link>
          <Link href="/events" className="hover:text-[#facc15] transition-colors">Festivals</Link>
          <Link href="/volunteer" className="hover:text-[#facc15] transition-colors">Volunteer</Link>
          <Link href="/community" className="hover:text-[#facc15] transition-colors">Community</Link>
          <Link href="/about" className="hover:text-[#facc15] transition-colors">About</Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-1.5 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-4 text-sm font-medium">
          <Link href="/islands" onClick={() => setMobileOpen(false)} className="hover:text-[#facc15] transition-colors">Islands</Link>
          <Link href="/akiya" onClick={() => setMobileOpen(false)} className="hover:text-[#facc15] transition-colors">Akiya</Link>
          <Link href="/events" onClick={() => setMobileOpen(false)} className="hover:text-[#facc15] transition-colors">Festivals</Link>
          <Link href="/volunteer" onClick={() => setMobileOpen(false)} className="hover:text-[#facc15] transition-colors">Volunteer</Link>
          <Link href="/community" onClick={() => setMobileOpen(false)} className="hover:text-[#facc15] transition-colors">Community</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="hover:text-[#facc15] transition-colors">About</Link>
        </div>
      )}
    </nav>
  );
}

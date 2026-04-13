"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#explore", label: "Explore" },
  { href: "#islands", label: "Islands" },
  { href: "#akiya", label: "Akiya" },
  { href: "#volunteer", label: "Volunteer" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-secondary/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <ToriiIcon
            className={`w-8 h-8 transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-cream"
            } group-hover:text-accent`}
          />
          <div
            className={`transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-cream"
            }`}
          >
            <span className="font-serif font-semibold text-base leading-tight block">
              Abandoned Japan
            </span>
            <span
              className={`text-[10px] font-sans tracking-[0.2em] uppercase leading-none block transition-colors ${
                scrolled ? "text-secondary" : "text-cream/70"
              }`}
            >
              Seto Inland Sea
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-sans font-medium tracking-wide transition-all duration-200 hover:text-accent relative group ${
                scrolled ? "text-primary/80" : "text-cream/90"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#volunteer"
            className={`text-sm font-sans px-5 py-2 rounded-sm border transition-all duration-300 font-medium ${
              scrolled
                ? "border-primary text-primary hover:bg-primary hover:text-cream"
                : "border-cream/60 text-cream hover:bg-cream/10"
            }`}
          >
            Get Involved
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 transition-colors ${
            scrolled ? "text-primary" : "text-cream"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-md border-t border-secondary/10">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary/80 font-sans font-medium tracking-wide hover:text-accent transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function ToriiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top crossbeam with upswept ends */}
      <path
        d="M2 10 Q6 7.5 16 8 Q26 7.5 30 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Second crossbeam */}
      <line
        x1="6"
        y1="13.5"
        x2="26"
        y2="13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left pillar */}
      <line
        x1="9"
        y1="9"
        x2="9"
        y2="28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Right pillar */}
      <line
        x1="23"
        y1="9"
        x2="23"
        y2="28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

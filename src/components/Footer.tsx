export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/60 relative overflow-hidden">
      {/* Decorative kanji strip */}
      <div className="border-b border-cream/5 py-3 overflow-hidden">
        <p className="font-serif text-cream/5 text-6xl whitespace-nowrap select-none leading-none tracking-[0.1em] animate-none">
          廃墟 · 島 · 空き家 · 保存 · 記録 · 再生 · 海 · 静寂 · 美 · 廃墟 · 島 · 空き家
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <ToriiMini className="w-7 h-7 text-secondary" />
              <div>
                <p className="font-serif text-cream text-base font-semibold">
                  Abandoned Japan
                </p>
                <p className="text-[10px] font-sans tracking-[0.2em] text-cream/30 uppercase">
                  Seto Inland Sea Archive
                </p>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-cream/50 max-w-sm mb-6">
              Documenting, preserving, and gently reviving the abandoned
              islands, traditional villages, and akiya of rural Japan — with
              reverence and a quiet hope for renewal.
            </p>
            <p className="font-serif italic text-secondary/70 text-sm">
              物の哀れ — The pathos of things
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-cream/30 mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {[
                { label: "Islands", href: "#islands" },
                { label: "Akiya Listings", href: "#akiya" },
                { label: "Interactive Map", href: "#map" },
                { label: "Takaikamishima", href: "#takaikamishima" },
                { label: "Volunteer", href: "#volunteer" },
                { label: "Resources", href: "#explore" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/50 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-cream/30 mb-5">
              Key Partners
            </p>
            <ul className="space-y-3">
              {[
                { label: "Setouchi Triennale", url: "https://setouchi-artfest.jp/en/" },
                { label: "Benesse Art Site", url: "https://benesse-artsite.jp/en/" },
                { label: "NICE Japan", url: "https://www.nice1.gr.jp/" },
                { label: "Akiya & Inaka", url: "https://akiyainaka.com/" },
                { label: "Haikyo.org", url: "https://www.haikyo.org/" },
                { label: "Japan Rural Network", url: "https://www.rural-net.org/" },
              ].map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-cream/50 hover:text-cream transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 10 10"
                      fill="none"
                      className="w-2.5 h-2.5 opacity-0 group-hover:opacity-50 transition-opacity"
                    >
                      <path
                        d="M1 9L9 1M4 1h5v5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/5 pt-8 flex flex-col md:flex-row justify-between gap-3 text-xs font-sans text-cream/25">
          <p>© {year} Abandoned Japan Archive Project. Documentation with respect.</p>
          <p>
            Backend:{" "}
            <code className="font-mono text-cream/20">http://127.0.0.1:8000</code>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ToriiMini({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 10 Q6 7.5 16 8 Q26 7.5 30 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="6" y1="13.5" x2="26" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="9" x2="9" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="9" x2="23" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a2317] text-[#f4f1ea] pt-12 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="26" height="3.5" rx="1.75" fill="#facc15" />
                <rect x="4" y="7.5" width="20" height="2.5" rx="1.25" fill="#facc15" />
                <rect x="6" y="10" width="3" height="15" rx="1.5" fill="#f4f1ea" />
                <rect x="19" y="10" width="3" height="15" rx="1.5" fill="#f4f1ea" />
              </svg>
              <span
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
              >
                Abandoned Japan
              </span>
            </div>
            <p className="text-sm text-white/60 mb-1">Not just listings. Lifelines.</p>
            <p
              className="text-sm text-white/40 mb-4"
              style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
            >
              離島を生き返らせる。
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/40 hover:text-[#facc15] transition-colors text-sm">X</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-[#facc15] transition-colors text-sm">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/40 hover:text-[#facc15] transition-colors text-sm">Facebook</a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[#facc15] text-xs font-semibold uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/islands" className="hover:text-[#facc15] transition-colors">Remote Islands</Link></li>
              <li><Link href="/akiya" className="hover:text-[#facc15] transition-colors">Akiya Homes</Link></li>
              <li><Link href="/species" className="hover:text-[#facc15] transition-colors">Endemic Species</Link></li>
              <li><Link href="/projects" className="hover:text-[#facc15] transition-colors">Revival Projects</Link></li>
              <li><Link href="/community" className="hover:text-[#facc15] transition-colors">Community Stories</Link></li>
            </ul>
          </div>

          {/* Partners & Legal */}
          <div>
            <h4 className="text-[#facc15] text-xs font-semibold uppercase tracking-widest mb-4">Partners</h4>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li><span className="opacity-80">Setouchi Triennale</span></li>
              <li><span className="opacity-80">Benesse Art Site Naoshima</span></li>
              <li><span className="opacity-80">Japan Akiya Bank</span></li>
              <li><Link href="/about" className="hover:text-[#facc15] transition-colors">About Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#facc15] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <p>© 2025 Abandoned Japan. All rights reserved.</p>
          <p>Inspired by the Setouchi partner network · Japan</p>
        </div>
      </div>
    </footer>
  );
}

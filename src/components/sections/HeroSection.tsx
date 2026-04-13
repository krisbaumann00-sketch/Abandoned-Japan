import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] bg-cover bg-center flex items-end justify-start text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.8) 100%), url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&q=80')",
      }}
    >
      <div className="relative z-10 px-5 pb-10 max-w-lg">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#facc15] bg-black/30 px-3 py-1 rounded-full">
            🇯🇵 Remote Island Conservation
          </span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-2"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          ABANDONED
          <br />
          JAPAN
        </h1>
        <p className="text-sm text-white/80 mb-1 font-medium tracking-wide">
          Revive the Remote Islands
        </p>
        <p
          className="text-xs text-white/50 mb-6"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          離島再生
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/islands"
            className="bg-[#facc15] text-[#43523d] px-6 py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all shadow-lg"
          >
            Explore Islands
          </Link>
          <Link
            href="/akiya"
            className="border border-white/60 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
          >
            Browse Akiya
          </Link>
        </div>
      </div>
    </section>
  );
}

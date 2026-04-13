export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1800&q=85')",
        }}
      />
      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-ink/20" />

      {/* Watermark kanji — 廃墟 (haikyo / ruins) */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-serif text-cream/[0.03] select-none pointer-events-none leading-none"
        aria-hidden
      >
        廃
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <div
          className="animate-fade-up delay-100"
          style={{ opacity: 0 }}
        >
          <span className="inline-block text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/80 mb-6">
            Seto Inland Sea · Japan
          </span>
        </div>

        <h1
          className="animate-fade-up delay-200 font-serif text-cream leading-[1.1] mb-6"
          style={{ opacity: 0, fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          Where Silence
          <br />
          <em className="italic text-secondary">Tells the Story</em>
        </h1>

        <p
          className="animate-fade-up delay-300 max-w-2xl mx-auto font-sans text-cream/75 leading-relaxed mb-10"
          style={{ opacity: 0, fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
        >
          Documenting the abandoned islands, ghost villages, and akiya of rural
          Japan — with reverence, curiosity, and a quiet hope for renewal.
        </p>

        <div
          className="animate-fade-up delay-500 flex flex-col sm:flex-row gap-4 justify-center"
          style={{ opacity: 0 }}
        >
          <a
            href="#islands"
            className="inline-flex items-center gap-2 bg-cream text-primary font-sans font-semibold px-8 py-3.5 text-sm tracking-wide hover:bg-cream/90 transition-all duration-300 group"
          >
            Explore the Islands
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 border border-cream/40 text-cream font-sans font-medium px-8 py-3.5 text-sm tracking-wide hover:border-cream/80 hover:bg-cream/10 transition-all duration-300"
          >
            Our Mission
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in delay-700 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-cream/40 text-xs font-sans tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-cream/40 to-transparent animate-pulse" />
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-ink/60 backdrop-blur-sm border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Inhabited Islands", value: "421", note: "of 6,800+ total" },
            { label: "Akiya Properties", value: "9M+", note: "nationwide" },
            { label: "Seto Sea Islands", value: "700+", note: "documented" },
            { label: "Active Revivals", value: "47", note: "ongoing projects" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-2xl font-bold text-cream/90">
                {stat.value}
              </p>
              <p className="text-cream/50 text-xs font-sans tracking-wide">
                {stat.label}
              </p>
              <p className="text-cream/30 text-[10px] font-sans">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MissionSection() {
  return (
    <section id="about" className="py-28 lg:py-36 bg-cream relative overflow-hidden">
      {/* Decorative kanji background */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 text-[30rem] font-serif text-secondary/[0.04] select-none pointer-events-none leading-none"
        aria-hidden
      >
        静
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Label + Mission text */}
          <div>
            <span className="section-label block mb-6">Our Mission</span>

            <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight mb-10">
              Turning Abandonment
              <br />
              <em className="italic text-secondary">into Awareness</em>
            </h2>

            <div className="divider-botanical">
              <span className="text-secondary text-lg">✦</span>
            </div>

            <p className="font-sans text-ink/75 leading-[1.9] text-lg mb-8">
              Our mission is to document, preserve, and gently revive the
              abandoned islands, traditional villages, and akiya of rural
              Japan — particularly in the Seto Inland Sea. We believe that
              forgotten places still hold profound cultural, ecological, and
              human value.
            </p>
            <p className="font-sans text-ink/75 leading-[1.9] text-lg">
              Through respectful storytelling, interactive mapping, and
              direct connections to local conservation efforts, we aim to
              turn abandonment into awareness, and awareness into action.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#explore"
                className="inline-flex items-center gap-2 bg-primary text-cream font-sans font-semibold px-7 py-3.5 text-sm tracking-wide hover:bg-primary/90 transition-colors group"
              >
                Start Exploring
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#volunteer"
                className="inline-flex items-center gap-2 border border-primary/30 text-primary font-sans font-medium px-7 py-3.5 text-sm tracking-wide hover:border-primary hover:bg-primary/5 transition-all"
              >
                Volunteer With Us
              </a>
            </div>
          </div>

          {/* Right: Beliefs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {beliefs.map((belief) => (
              <div
                key={belief.title}
                className="bg-primary/5 border border-primary/10 p-7 hover:bg-primary/10 transition-colors duration-300"
              >
                <div className="text-3xl mb-4 leading-none">{belief.icon}</div>
                <h3 className="font-serif text-lg text-primary mb-2">
                  {belief.title}
                </h3>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  {belief.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <div className="divider-botanical mb-10">
            <span className="section-label">Wabi-Sabi</span>
          </div>
          <blockquote className="font-serif text-2xl lg:text-3xl italic text-primary/70 leading-relaxed">
            "In impermanence and incompleteness lies the most profound beauty.
            These islands do not ask to be saved — only to be seen."
          </blockquote>
          <p className="mt-6 font-sans text-sm text-secondary tracking-wide">
            — Abandoned Japan Archive Project
          </p>
        </div>
      </div>
    </section>
  );
}

const beliefs = [
  {
    icon: "⛩",
    title: "Cultural Preservation",
    description:
      "Every crumbling farmhouse, every moss-covered shrine, holds irreplaceable layers of Japanese heritage that deserve documentation before they disappear.",
  },
  {
    icon: "🌿",
    title: "Ecological Value",
    description:
      "Abandoned islands often become unexpected sanctuaries for native species, offering glimpses of Japan's pre-industrial natural landscape.",
  },
  {
    icon: "🗺",
    title: "Interactive Storytelling",
    description:
      "We use maps, photography, and firsthand accounts to create living records of places that official tourism has overlooked.",
  },
  {
    icon: "🤝",
    title: "Community Revival",
    description:
      "We connect interested individuals with local governments and NPOs working to breathe new life into communities that refuse to be forgotten.",
  },
];

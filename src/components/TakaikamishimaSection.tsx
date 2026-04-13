import Image from "next/image";

export default function TakaikamishimaSection() {
  return (
    <section
      id="takaikamishima"
      className="py-28 lg:py-36 bg-mist relative overflow-hidden"
      style={{ background: "#e8e3d8" }}
    >
      {/* Decorative kanji */}
      <div
        className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-[28rem] font-serif text-primary/[0.04] select-none pointer-events-none leading-none"
        aria-hidden
      >
        島
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label block mb-4">Featured Island</span>
          <h2 className="font-serif text-5xl lg:text-6xl text-primary leading-tight mb-4">
            Takaikamishima
          </h2>
          <p className="font-serif text-2xl italic text-secondary mb-6">
            高井神島 — The Island with a Manga School
          </p>
          <div className="divider-botanical">
            <span className="text-secondary">✦</span>
          </div>
        </div>

        {/* Main feature layout */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Large hero image */}
          <div className="lg:col-span-3 relative h-72 lg:h-96 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&q=85"
              alt="Takaikamishima Island aerial view"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-cream">
              <p className="font-sans text-sm font-semibold tracking-wide">
                Hiroshima Prefecture · Seto Inland Sea
              </p>
              <p className="font-sans text-xs text-cream/70 mt-1">
                34.112°N, 132.921°E
              </p>
            </div>
          </div>

          {/* Stats + info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-primary text-cream p-7">
              <h3 className="font-serif text-xl mb-5 text-gold/80">
                Island Profile
              </h3>
              {[
                { label: "Population", value: "~12 residents" },
                { label: "Area", value: "0.62 km²" },
                { label: "Prefecture", value: "Hiroshima" },
                { label: "Access", value: "Ferry from Mihara" },
                { label: "Status", value: "Reviving" },
                { label: "Notable", value: "Manga School (廃校)" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2.5 border-b border-cream/10 last:border-0"
                >
                  <span className="text-cream/50 text-sm font-sans">
                    {item.label}
                  </span>
                  <span className="text-cream text-sm font-sans font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://www.nice1.gr.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 bg-accent text-cream p-5 hover:bg-accent/90 transition-colors group"
            >
              <div>
                <p className="font-sans font-semibold text-sm tracking-wide mb-0.5">
                  Volunteer on Takaikamishima
                </p>
                <p className="font-sans text-xs text-cream/70">
                  via NICE Japan Volunteer Network
                </p>
              </div>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-2xl text-primary mb-6">
              About the Island
            </h3>
            <div className="space-y-4 font-sans text-ink/70 leading-[1.9]">
              <p>
                Takaikamishima (高井神島) is one of the smallest and least-known
                islands in Hiroshima Prefecture's section of the Seto Inland Sea.
                Its fishing community, once vibrant with generations of families
                who harvested the surrounding waters, has dwindled to just over a
                dozen permanent residents — mostly elderly.
              </p>
              <p>
                The island's wooden fishing boats lie weathering in the harbour.
                Its lanes are quiet. But Takaikamishima resists the fate of simply
                vanishing — its former elementary school has become something
                unexpected: a centre for manga arts and youth cultural exchange.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-primary mb-6">
              The Manga School
            </h3>
            <div className="space-y-4 font-sans text-ink/70 leading-[1.9]">
              <p>
                When the island's elementary school closed due to depopulation,
                local conservationists and artists transformed it into a Manga
                School — a creative space bridging Japan's literary comic art
                tradition with rural revitalisation. Students and volunteers
                visit to create, archive, and engage with the island's story
                through illustration.
              </p>
              <p>
                This model — repurposing abandoned schools as cultural
                incubators — is increasingly being adopted across rural Japan
                as communities seek sustainable paths forward that honour their
                heritage rather than erasing it.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Manga Arts", "Former School", "Youth Exchange", "Cultural Revival", "Hiroshima Prefecture", "Seto Sea"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-sans px-3 py-1.5 border border-primary/20 text-primary/70"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Photo strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
              alt: "Abandoned school building",
            },
            {
              src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
              alt: "Seto Inland Sea view",
            },
            {
              src: "https://images.unsplash.com/photo-1490750967868-88df5691cc53?w=600&q=80",
              alt: "Island harbour",
            },
          ].map((img) => (
            <div key={img.src} className="relative h-40 lg:h-56 overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

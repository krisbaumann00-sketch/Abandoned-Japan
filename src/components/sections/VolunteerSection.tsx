import Link from "next/link";

const opportunities = [
  {
    icon: "🌾",
    title: "WWOOF Japan",
    tagline: "Farms, homesteads & beekeeping",
    desc: "Exchange labour for room and board on organic farms and traditional homesteads across Japan's islands. Annual membership ¥5,500 — no wages, pure cultural exchange.",
    tags: ["Farming", "Restoration", "Year-round"],
    url: "https://www.wwoofjapan.com",
    badge: "Most Popular"
  },
  {
    icon: "🦐",
    title: "Koebi-tai",
    tagline: "Setouchi Triennale Volunteers",
    desc: "Volunteer as a 'supporter crab' at the world-renowned Setouchi art festival spanning 17 Seto Inland Sea islands. Spring, Summer, and Autumn seasons available.",
    tags: ["Art Festival", "Islands", "Free"],
    url: "https://setouchi-artfest.jp",
    badge: "2025 Open"
  },
  {
    icon: "🦅",
    title: "GoEco — Sado Island",
    tagline: "Crested Ibis & temple restoration",
    desc: "Protect one of the world's rarest birds (only ~500 alive), maintain 17th-century rice terraces, and restore Chokokuji Temple. Rated GoEco Best 10 for 2026.",
    tags: ["Conservation", "Heritage", "Min. 1 week"],
    url: "https://www.goeco.org/area/volunteer-in-asia/japan/wildlife-conservation-and-cultural-immersion/",
    badge: null
  },
  {
    icon: "🐢",
    title: "Ogasawara Marine Centre",
    tagline: "Sea turtles & whales — UNESCO island",
    desc: "Monitor green sea turtle nesting and humpback whale migration on Chichijima in the remote Ogasawara Islands — a UNESCO World Heritage site 1,000km south of Tokyo.",
    tags: ["Marine", "UNESCO", "Year-round"],
    url: "https://bonin-ocean.net",
    badge: null
  }
];

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="py-20 px-4 bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#c67d60] text-sm font-medium tracking-widest uppercase mb-2">Verified Partner Programmes</p>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Volunteer Opportunities</h2>
          <p className="text-[#a97a5e] max-w-2xl mx-auto">
            Five organisations connecting international volunteers with island conservation, art, farming, and heritage work across Japan.
          </p>
        </div>

        <div className="grid-2">
          {opportunities.map((op) => (
            <a
              key={op.title}
              href={op.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-xl shadow-md card-hover block group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl flex-shrink-0">{op.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[#43523d] font-serif group-hover:text-[#c67d60] transition-colors">
                      {op.title}
                    </h3>
                    {op.badge && (
                      <span className="text-xs bg-[#facc15] text-[#43523d] font-bold px-2 py-0.5 rounded">
                        {op.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[#a97a5e] text-sm font-medium">{op.tagline}</p>
                </div>
              </div>
              <p className="text-[#43523d]/80 leading-relaxed mb-4 text-sm">{op.desc}</p>
              <div className="flex flex-wrap gap-2">
                {op.tags.map((tag) => (
                  <span key={tag} className="bg-[#f4f1ea] text-[#43523d] text-xs px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#c67d60] font-bold mt-4 group-hover:underline">
                Visit website ↗
              </p>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/volunteer"
            className="inline-block border-2 border-[#43523d] text-[#43523d] px-8 py-3 rounded-full font-bold hover:bg-[#43523d] hover:text-white transition-colors"
          >
            View All 5 Programmes →
          </Link>
        </div>
      </div>
    </section>
  );
}

const exploreCategories = [
  {
    title: "Island Tourism & Culture",
    icon: "🏝",
    links: [
      {
        label: "Setouchi Triennale",
        description:
          "International art festival connecting 12 islands of the Seto Inland Sea through contemporary art and cultural exchange.",
        url: "https://setouchi-artfest.jp/en/",
        org: "Setouchi Triennale Executive Committee",
      },
      {
        label: "Benesse Art Site Naoshima",
        description:
          "Naoshima, Teshima & Inujima's world-renowned art islands — the gold standard for abandoned island revival.",
        url: "https://benesse-artsite.jp/en/",
        org: "Benesse Holdings",
      },
      {
        label: "Onomichi Tourism",
        description:
          "Gateway port to many of the Seto Inland Sea's abandoned and reviving islands, including cycling along the Shimanami Kaidō.",
        url: "https://www.ononavi.jp/en/",
        org: "Onomichi City Tourism Association",
      },
      {
        label: "Gunkanjima Tours",
        description:
          "Official tours of Battleship Island (Hashima), the UNESCO World Heritage abandoned coal mining island.",
        url: "https://www.gunkanjima-tour.jp/en/",
        org: "Gunkanjima Concierge",
      },
    ],
  },
  {
    title: "Akiya & Rural Housing",
    icon: "🏡",
    links: [
      {
        label: "Akiya & Inaka",
        description:
          "English-language platform specialising in sourcing and facilitating purchases of akiya and rural properties across Japan.",
        url: "https://akiyainaka.com/",
        org: "Akiya & Inaka Co.",
      },
      {
        label: "HOMES.co.jp",
        description:
          "Japan's comprehensive property portal with akiya listings, rural homes, and island properties searchable by region.",
        url: "https://www.homes.co.jp/",
        org: "LIFULL HOME'S",
      },
      {
        label: "Renovation Machiya",
        description:
          "Specialists in the renovation and sale of traditional kominka and machiya townhouses in rural Japan.",
        url: "https://www.renovationmachiya.com/",
        org: "Renovation Machiya KK",
      },
      {
        label: "NPO Nippon — Vacant Houses",
        description:
          "Non-profit connecting vacant rural properties with people seeking alternative lifestyles outside major cities.",
        url: "https://nponippon.org/",
        org: "NPO Nippon",
      },
    ],
  },
  {
    title: "Conservation & Research",
    icon: "🌿",
    links: [
      {
        label: "Japan Rural Network",
        description:
          "National network of local governments and NPOs working to revitalise Japan's rural communities and reverse depopulation.",
        url: "https://www.rural-net.org/",
        org: "Japan Rural Network",
      },
      {
        label: "Hiroshima Prefecture Tourism",
        description:
          "Official tourism and island information for Hiroshima Prefecture including the Seto Inland Sea island network.",
        url: "https://visithiroshima.net/",
        org: "Hiroshima Prefectural Government",
      },
      {
        label: "Haikyo — Urban Exploration Japan",
        description:
          "Dedicated community documenting Japan's abandoned industrial, institutional, and residential sites with respect and care.",
        url: "https://www.haikyo.org/",
        org: "Haikyo.org",
      },
      {
        label: "JTB Seto Inland Sea Guide",
        description:
          "Comprehensive travel and cultural guide to islands, ferries, and coastal communities of the Seto Inland Sea.",
        url: "https://www.jtbusa.com/destination/japan/chubu-and-kansai/seto-inland-sea",
        org: "JTB USA",
      },
    ],
  },
  {
    title: "Volunteer & Community",
    icon: "🤝",
    links: [
      {
        label: "NICE Japan Volunteer",
        description:
          "Japan's leading international volunteer NPO, running workcamps on rural islands and depopulated communities since 1990.",
        url: "https://www.nice1.gr.jp/",
        org: "NICE Japan",
      },
      {
        label: "Workaway — Japan",
        description:
          "Global platform connecting travellers with rural Japanese hosts seeking help with farming, renovation, and community projects.",
        url: "https://www.workaway.info/en/country/japan",
        org: "Workaway International",
      },
      {
        label: "WWOOF Japan",
        description:
          "Organic farming volunteer opportunities on rural Japanese farms and island communities.",
        url: "https://wwoofjapan.com/main/index.php?lan=en",
        org: "WWOOF Japan",
      },
      {
        label: "Shimanami Kaidō Foundation",
        description:
          "Foundation promoting cycling and community tourism along the 70km bridge route connecting Honshū to Shikoku via 6 islands.",
        url: "https://shimanami-cycle.or.jp/rental/en/",
        org: "Onomichi City / Imabari City",
      },
    ],
  },
];

export default function ExploreSection() {
  return (
    <section id="explore" className="py-28 lg:py-36 bg-primary text-cream relative overflow-hidden">
      {/* Decorative */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #c67d60, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-gold/70 block mb-4">
            Resources
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-cream leading-tight mb-4">
            Explore &amp; Connect
          </h2>
          <p className="max-w-xl mx-auto font-sans text-cream/55 leading-relaxed">
            Every link below connects to a real organisation, platform, or
            institution actively involved in Japan's island and rural
            conservation landscape.
          </p>
        </div>

        {/* Categories */}
        <div className="grid lg:grid-cols-2 gap-12">
          {exploreCategories.map((category) => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl leading-none">{category.icon}</span>
                <h3 className="font-serif text-xl text-cream/90">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-cream/10" />
              </div>

              <div className="space-y-4">
                {category.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-cream/10 hover:border-accent/50 hover:bg-cream/5 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-sans font-semibold text-sm text-cream group-hover:text-accent transition-colors">
                            {link.label}
                          </p>
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            className="w-3 h-3 text-cream/30 group-hover:text-accent/70 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          >
                            <path
                              d="M2 10L10 2M5 2h5v5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="font-sans text-xs text-cream/50 leading-relaxed line-clamp-2">
                          {link.description}
                        </p>
                        <p className="font-sans text-[10px] text-cream/25 mt-1.5 tracking-wide">
                          {link.org}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

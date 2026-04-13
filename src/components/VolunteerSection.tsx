const volunteerOrgs = [
  {
    name: "NICE Japan",
    nameJapanese: "ナイス",
    role: "International Workcamps",
    description:
      "Japan's largest international volunteer NPO. Runs seasonal workcamps on depopulated islands and rural communities — restoration, farming, ecology, and community building. No experience required.",
    url: "https://www.nice1.gr.jp/",
    tags: ["Workcamps", "Island Restoration", "No Experience Needed", "All Ages"],
    commitment: "1–3 weeks",
    language: "Japanese / English",
    featured: true,
  },
  {
    name: "WWOOF Japan",
    nameJapanese: "ウーフ",
    role: "Organic Farm Stays",
    description:
      "Work on organic farms across rural Japan, including island communities in the Seto Inland Sea. Exchange labour for food and accommodation. Outstanding way to integrate with local life.",
    url: "https://wwoofjapan.com/main/index.php?lan=en",
    tags: ["Farming", "Long-term Stay", "Rural Integration"],
    commitment: "Flexible (days to months)",
    language: "Japanese preferred",
    featured: false,
  },
  {
    name: "Workaway Japan",
    nameJapanese: "ワークアウェイ",
    role: "Rural & Island Projects",
    description:
      "Browse hundreds of host opportunities across rural Japan, from akiya renovation on island communities to eco-lodge construction and cultural preservation projects.",
    url: "https://www.workaway.info/en/country/japan",
    tags: ["Renovation", "Flexible", "Self-directed", "Global Platform"],
    commitment: "Flexible",
    language: "English-friendly",
    featured: false,
  },
  {
    name: "Osakikamijima Town",
    nameJapanese: "大崎上島町",
    role: "Local Island Revitalisation",
    description:
      "Hiroshima's Osakikamijima actively recruits volunteers and new residents for island farming, fishing, and community revitalisation through official municipal programmes.",
    url: "https://www.town.osakikamijima.hiroshima.jp/",
    tags: ["Official Programme", "Hiroshima", "Long-term Move"],
    commitment: "3 months–permanent",
    language: "Japanese",
    featured: false,
  },
];

export default function VolunteerSection() {
  return (
    <section
      id="volunteer"
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "#e8e3d8" }}
    >
      {/* Decorative kanji */}
      <div
        className="absolute left-0 bottom-0 -translate-x-1/3 text-[28rem] font-serif text-secondary/[0.06] select-none pointer-events-none leading-none"
        aria-hidden
      >
        手
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label block mb-4">Get Involved</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight mb-4">
            Your Hands
            <br />
            <em className="italic text-secondary">Can Revive a Place</em>
          </h2>
          <p className="max-w-2xl mx-auto font-sans text-ink/60 leading-relaxed">
            Below are the real organisations actively running volunteer
            programmes in Japan's rural and island communities. Every link
            opens directly to their official application or information page.
          </p>
        </div>

        {/* Featured org */}
        {volunteerOrgs
          .filter((o) => o.featured)
          .map((org) => (
            <div
              key={org.name}
              className="bg-primary text-cream p-8 lg:p-12 mb-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-[14rem] font-serif text-cream/[0.03] select-none pointer-events-none leading-none">
                ✦
              </div>
              <div className="grid lg:grid-cols-2 gap-8 items-center relative">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-gold/70">
                      Recommended Partner
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl lg:text-4xl text-cream mb-1">
                    {org.name}
                  </h3>
                  <p className="font-serif italic text-secondary text-lg mb-6">
                    {org.nameJapanese} — {org.role}
                  </p>
                  <p className="font-sans text-cream/70 leading-relaxed mb-6">
                    {org.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {org.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-sans px-3 py-1.5 border border-cream/20 text-cream/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm font-sans text-cream/50 mb-8">
                    <span>⏱ {org.commitment}</span>
                    <span>🌐 {org.language}</span>
                  </div>
                  <a
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-cream text-primary font-sans font-bold px-8 py-4 text-sm tracking-wide hover:bg-cream/90 transition-colors group"
                  >
                    Apply to Volunteer at NICE Japan
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                <div className="hidden lg:block text-right">
                  <div className="inline-block border border-cream/10 p-6">
                    <p className="font-sans text-xs text-cream/40 tracking-[0.2em] uppercase mb-4">
                      Why NICE Japan?
                    </p>
                    {[
                      "Founded 1990 — over 30 years of rural volunteer programmes",
                      "Operates directly on Seto Inland Sea islands",
                      "No Japanese required for many camps",
                      "Internationally recognised and non-profit",
                      "Covers food & accommodation for volunteers",
                    ].map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 text-sm text-cream/60 mb-3 last:mb-0"
                      >
                        <span className="text-gold/70 mt-0.5">✓</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Other orgs */}
        <div className="grid md:grid-cols-3 gap-5">
          {volunteerOrgs
            .filter((o) => !o.featured)
            .map((org) => (
              <div
                key={org.name}
                className="bg-cream border border-primary/12 p-6 flex flex-col"
              >
                <div className="flex-1">
                  <span className="text-xs font-sans font-semibold text-secondary tracking-wider uppercase">
                    {org.role}
                  </span>
                  <h3 className="font-serif text-xl text-primary mt-1 mb-1">
                    {org.name}
                  </h3>
                  <p className="font-serif italic text-secondary/70 text-sm mb-4">
                    {org.nameJapanese}
                  </p>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed mb-4">
                    {org.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {org.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-sans px-2 py-1 bg-primary/5 text-primary/60 border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-sans text-ink/40 space-y-0.5 mb-5">
                    <p>⏱ {org.commitment}</p>
                    <p>🌐 {org.language}</p>
                  </div>
                </div>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 border border-primary/25 text-primary font-sans font-semibold text-sm px-5 py-3 hover:bg-primary hover:text-cream hover:border-primary transition-all duration-200 group"
                >
                  Visit {org.name}
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  >
                    <path
                      d="M2 10L10 2M5 2h5v5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Edinburgh, UK",
    avatar: "S",
    quote:
      "I spent three weeks on Teshima helping restore an abandoned farm. I came for a holiday and stayed to help replant terraces that hadn't seen rice in 20 years. I'll be back every year.",
    island: "Teshima, Kagawa",
    year: "2024",
  },
  {
    name: "Kenji T.",
    location: "Tokyo, Japan",
    avatar: "K",
    quote:
      "As a Japanese person I felt shame that these islands were dying. Abandoned Japan gave me a way to act. I now co-manage a kominka on Naoshima with two families from Europe.",
    island: "Naoshima, Kagawa",
    year: "2023",
  },
];

export default function CommunityVoicesSection() {
  return (
    <section className="px-4 py-8 max-w-5xl mx-auto">
      <h2
        className="text-lg font-bold text-[#43523d] mb-1"
        style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
      >
        Community Voices
      </h2>
      <p className="text-sm text-[#43523d]/60 mb-6">Stories from the people rebuilding Japan's islands</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-2xl p-5 border border-[#43523d]/10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#43523d] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#43523d]">{t.name}</p>
                <p className="text-xs text-[#a97a5e]">{t.location}</p>
              </div>
            </div>
            <blockquote className="text-sm text-[#43523d]/75 leading-relaxed italic mb-3">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-between text-xs text-[#43523d]/40">
              <span>📍 {t.island}</span>
              <span>{t.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

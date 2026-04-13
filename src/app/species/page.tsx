import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";

const SPECIES = [
  {
    name: "Amami Rabbit",
    name_jp: "アマミノクロウサギ",
    island: "Amami Oshima",
    status: "Critically Endangered",
    statusColor: "bg-red-100 text-red-700",
    description:
      "A living fossil — one of the most primitive living rabbits on Earth. Only 5,000 remain, exclusively on Amami Oshima. Nocturnal, with dark fur and short ears, it has changed little in millions of years.",
    emoji: "🐇",
  },
  {
    name: "Lidth's Jay",
    name_jp: "ルリカケス",
    island: "Amami Oshima",
    status: "Vulnerable",
    statusColor: "bg-orange-100 text-orange-700",
    description:
      "A stunning blue-and-chestnut crow found only on Amami Oshima. The island's unofficial symbol, depicted in traditional Oshima tsumugi silk patterns for centuries.",
    emoji: "🐦",
  },
  {
    name: "Iriomote Cat",
    name_jp: "イリオモテヤマネコ",
    island: "Iriomote",
    status: "Critically Endangered",
    statusColor: "bg-red-100 text-red-700",
    description:
      "Fewer than 100 survive on Iriomote Island. Discovered by science only in 1967, this small wild cat is considered a living fossil of early felid evolution.",
    emoji: "🐱",
  },
  {
    name: "Japanese River Otter",
    name_jp: "ニホンカワウソ",
    island: "Seto Inland Sea",
    status: "Extinct (Japan)",
    statusColor: "bg-gray-100 text-gray-600",
    description:
      "Declared extinct in Japan in 2012. Once widespread across Shikoku rivers and island coasts. Conservation of island wetlands may one day allow reintroduction from mainland Asia.",
    emoji: "🦦",
  },
  {
    name: "Okinawa Rail",
    name_jp: "ヤンバルクイナ",
    island: "Okinawa",
    status: "Endangered",
    statusColor: "bg-orange-100 text-orange-700",
    description:
      "A flightless bird found only in the Yanbaru forests of northern Okinawa. Road kills and mongoose (introduced to control snakes) are its main threats.",
    emoji: "🐦‍⬛",
  },
  {
    name: "Dugong",
    name_jp: "ジュゴン",
    island: "Okinawa / Amami",
    status: "Vulnerable",
    statusColor: "bg-orange-100 text-orange-700",
    description:
      "Japan's last dugong population — fewer than 3 individuals — survives in Okinawan waters. Critically dependent on intact seagrass beds around remote islands.",
    emoji: "🐬",
  },
  {
    name: "Amami Tip-nosed Frog",
    name_jp: "アマミイシカワガエル",
    island: "Amami Oshima",
    status: "Endangered",
    statusColor: "bg-orange-100 text-orange-700",
    description:
      "One of Japan's most beautiful frogs — brilliant emerald green with gold spots. Lives only in clean mountain streams of Amami Oshima's ancient forests.",
    emoji: "🐸",
  },
  {
    name: "Loggerhead Sea Turtle",
    name_jp: "アカウミガメ",
    island: "Yakushima / Tanegashima",
    status: "Vulnerable",
    statusColor: "bg-orange-100 text-orange-700",
    description:
      "Japan's remote southern beaches are major nesting grounds for the Pacific loggerhead. Volunteer beach patrols during summer nesting season are critical to egg survival.",
    emoji: "🐢",
  },
];

export default function SpeciesPage() {
  const criticalCount = SPECIES.filter((s) => s.status.includes("Critically")).length;
  const endangeredCount = SPECIES.filter((s) => s.status === "Endangered").length;

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />
      <TabNav />

      {/* Header */}
      <div className="bg-[#43523d] text-white px-5 py-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#facc15] mb-2">
          Biodiversity
        </p>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Endemic Species
        </h1>
        <p className="text-white/70 text-sm max-w-lg">
          Japan's remote islands evolved in isolation for millions of years, producing creatures found
          nowhere else on Earth. Depopulation threatens the stewardship of their habitats.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-[#43523d]/10 px-5 py-3 flex gap-6 text-sm overflow-x-auto scroll-hidden">
        <div className="flex-shrink-0">
          <span className="font-bold text-red-600">{criticalCount}</span>
          <span className="text-[#43523d]/50 ml-1">critically endangered</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-orange-600">{endangeredCount}</span>
          <span className="text-[#43523d]/50 ml-1">endangered</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">{SPECIES.length}</span>
          <span className="text-[#43523d]/50 ml-1">featured species</span>
        </div>
      </div>

      {/* Species grid */}
      <div className="px-4 py-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SPECIES.map((species) => (
            <div
              key={species.name}
              className="bg-white rounded-2xl p-5 border border-[#43523d]/10 shadow-sm card-hover"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{species.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-bold text-[#43523d] leading-tight"
                    style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                  >
                    {species.name}
                  </h3>
                  <p className="text-xs text-[#a97a5e]">{species.name_jp}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${species.statusColor}`}>
                  {species.status}
                </span>
              </div>
              <p className="text-sm text-[#43523d]/65 leading-relaxed mb-3">{species.description}</p>
              <p className="text-xs text-[#a97a5e] font-medium">📍 {species.island}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-8 max-w-3xl mx-auto">
        <div className="bg-[#43523d] text-white rounded-2xl p-6 text-center">
          <p
            className="text-lg font-bold mb-2"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            Stewardship starts with presence
          </p>
          <p className="text-sm text-white/70 mb-4">
            When humans leave an island, invasive species follow. Your presence — as a resident, volunteer, or
            seasonal visitor — matters for the wildlife that cannot leave.
          </p>
          <a
            href="/projects"
            className="inline-block bg-[#facc15] text-[#43523d] text-sm font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors"
          >
            Join a Conservation Project
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";
import { getIslands } from "@/lib/islands-api";
import { FALLBACK_ISLANDS } from "@/lib/fallback-data";
import type { Island } from "@/lib/islands-api";

export const revalidate = 300;

const PRIORITY_BADGE: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border border-red-200",
  high: "bg-orange-100 text-orange-700 border border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  low: "bg-green-100 text-green-700 border border-green-200",
};

const STATUS_BADGE: Record<string, string> = {
  depopulating: "bg-purple-100 text-purple-700",
  abandoned: "bg-gray-100 text-gray-600",
  reviving: "bg-green-100 text-green-700",
  inhabited: "bg-blue-100 text-blue-700",
};

function IslandCard({ island }: { island: Island }) {
  return (
    <Link
      href={`/islands/${island.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#43523d]/10 hover:shadow-md transition-shadow block card-hover"
    >
      <div className="relative w-full h-44">
        <Image
          src={island.image_url || "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600"}
          alt={island.name}
          fill
          className="object-cover"
          unoptimized
        />
        {island.featured && (
          <div className="absolute top-2 left-2 bg-[#facc15] text-[#43523d] text-xs font-bold px-2 py-0.5 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3
              className="text-base font-bold text-[#43523d]"
              style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
            >
              {island.name}
            </h3>
            <p className="text-xs text-[#a97a5e]">{island.name_jp} · {island.prefecture}</p>
          </div>
        </div>
        <p className="text-xs text-[#43523d]/65 leading-relaxed mb-3 line-clamp-2">{island.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${PRIORITY_BADGE[island.conservation_priority] || ""}`}>
            {island.conservation_priority} priority
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_BADGE[island.status] || ""}`}>
            {island.status}
          </span>
        </div>
        {island.akiya_count > 0 && (
          <p className="text-xs text-[#43523d]/50 mt-2">🏚 {island.akiya_count} akiya homes available</p>
        )}
      </div>
    </Link>
  );
}

export default async function IslandsPage() {
  let islands = FALLBACK_ISLANDS;

  try {
    const response = await getIslands({ items_per_page: 50 });
    if (response.data.length > 0) islands = response.data;
  } catch {
    // use fallback
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />
      <TabNav />

      {/* Header */}
      <div className="bg-[#43523d] text-white px-5 py-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#facc15] mb-2">
          Japan's Remote Islands
        </p>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Islands Seeking New Life
        </h1>
        <p className="text-white/70 text-sm max-w-lg">
          Over 400 of Japan's inhabited islands have lost more than half their population since 1970.
          Explore, connect, and help revive them.
        </p>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-[#43523d]/10 px-5 py-3 flex gap-6 text-sm overflow-x-auto scroll-hidden">
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">{islands.length}</span>
          <span className="text-[#43523d]/50 ml-1">islands listed</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-red-600">{islands.filter(i => i.conservation_priority === "critical").length}</span>
          <span className="text-[#43523d]/50 ml-1">critical priority</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">{islands.reduce((s, i) => s + i.akiya_count, 0)}</span>
          <span className="text-[#43523d]/50 ml-1">akiya homes</span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 py-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {islands.map((island) => (
            <IslandCard key={island.id} island={island} />
          ))}
        </div>

        {islands.length === 0 && (
          <div className="text-center py-16 text-[#43523d]/40">
            <p className="text-4xl mb-3">🏝</p>
            <p className="text-sm">No islands found</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

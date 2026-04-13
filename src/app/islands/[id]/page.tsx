import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";
import { getIsland } from "@/lib/islands-api";
import { FALLBACK_ISLANDS } from "@/lib/fallback-data";

export const revalidate = 300;

const PRIORITY_COLORS: Record<string, string> = {
  critical: "bg-red-600",
  high: "bg-orange-600",
  medium: "bg-yellow-600",
  low: "bg-green-600",
};

const STATUS_COLORS: Record<string, string> = {
  depopulating: "bg-purple-600",
  abandoned: "bg-gray-600",
  reviving: "bg-green-600",
  inhabited: "bg-blue-600",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function IslandDetailPage({ params }: PageProps) {
  const { id } = await params;
  const islandId = parseInt(id, 10);

  if (isNaN(islandId)) notFound();

  let island = FALLBACK_ISLANDS.find((i) => i.id === islandId) ?? null;

  try {
    island = await getIsland(islandId);
  } catch {
    if (!island) notFound();
  }

  if (!island) notFound();

  const tags = island.tags ? island.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />
      <TabNav />

      {/* Hero image */}
      <div className="relative w-full h-64 md:h-96">
        <Image
          src={island.image_url || "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200"}
          alt={island.name}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 text-white">
          <h1
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            {island.name}
          </h1>
          <p
            className="text-white/70 text-sm"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            {island.name_jp} · {island.prefecture} Prefecture
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`${PRIORITY_COLORS[island.conservation_priority]} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}>
            {island.conservation_priority} priority
          </span>
          <span className={`${STATUS_COLORS[island.status]} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}>
            {island.status}
          </span>
          {island.volunteer_needed && (
            <span className="bg-[#43523d] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Volunteers needed
            </span>
          )}
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Population", value: island.population === 0 ? "Uninhabited" : island.population.toLocaleString() },
            { label: "Area", value: `${island.area_km2} km²` },
            { label: "Akiya Homes", value: island.akiya_count > 0 ? island.akiya_count.toString() : "None listed" },
            { label: "Volunteers", value: island.volunteer_count > 0 ? `${island.volunteer_count} active` : "Needed" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-[#43523d]/10 shadow-sm">
              <p className="text-xs text-[#43523d]/50 mb-1">{stat.label}</p>
              <p className="text-sm font-bold text-[#43523d]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <h2
            className="text-xl font-bold text-[#43523d] mb-3"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            About this Island
          </h2>
          <p className="text-sm text-[#43523d]/75 leading-relaxed whitespace-pre-line">
            {island.long_description || island.description}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-[#43523d] mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-[#43523d]/10 text-[#43523d] text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Visit & Access */}
        {(island.peak_season || island.access_info) && (
          <div className="bg-white rounded-2xl p-5 border border-[#43523d]/10 shadow-sm" id="revival">
            <h2
              className="text-lg font-bold text-[#43523d] mb-4"
              style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
            >
              Planning Your Visit
            </h2>
            {island.peak_season && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-[#a97a5e] uppercase tracking-widest mb-1">Best Season</p>
                <p className="text-sm text-[#43523d]/75">{island.peak_season}</p>
              </div>
            )}
            {island.access_info && (
              <div>
                <p className="text-xs font-semibold text-[#a97a5e] uppercase tracking-widest mb-1">Getting There</p>
                <p className="text-sm text-[#43523d]/75">{island.access_info}</p>
              </div>
            )}
          </div>
        )}

        {/* How you can help */}
        <div className="bg-[#43523d] text-white rounded-2xl p-6">
          <h2
            className="text-lg font-bold mb-2"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            How You Can Help
          </h2>
          <p className="text-sm text-white/70 mb-5">
            {island.conservation_priority === "critical"
              ? "This island needs urgent help. Every volunteer, every visitor, every advocate matters."
              : "Your involvement — even a single visit — sustains local economies and signals that these islands matter."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/projects"
              className="flex-1 bg-[#facc15] text-[#43523d] text-sm font-bold py-3 rounded-xl text-center hover:bg-yellow-300 transition-colors"
            >
              Volunteer on this Island
            </Link>
            <Link
              href="/akiya"
              className="flex-1 border border-white/30 text-white text-sm font-semibold py-3 rounded-xl text-center hover:bg-white/10 transition-colors"
            >
              Browse Akiya Homes
            </Link>
          </div>
        </div>

        <div className="pb-8">
          <Link href="/islands" className="text-sm text-[#a97a5e] hover:underline">← Back to all islands</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

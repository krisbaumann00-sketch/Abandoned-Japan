import Image from "next/image";
import Link from "next/link";
import type { Island } from "@/lib/islands-api";

interface Props {
  island: Island;
}

export default function FeaturedListingSection({ island }: Props) {
  const priorityColors: Record<string, string> = {
    critical: "bg-red-600",
    high: "bg-orange-600",
    medium: "bg-yellow-600",
    low: "bg-green-600",
  };

  return (
    <section className="px-4 py-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-lg font-bold text-[#43523d]"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Featured Island
        </h2>
        <Link href="/islands" className="text-xs text-[#a97a5e] hover:underline font-medium">
          See all →
        </Link>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#43523d]/10">
        {/* Image */}
        <div className="relative w-full h-52 md:h-64">
          <Image
            src={island.image_url || "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800"}
            alt={island.name}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Volunteer badge */}
          {island.volunteer_needed && (
            <div className="absolute top-3 left-3 bg-[#43523d] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {island.volunteer_count} volunteers active
            </div>
          )}
          {/* Priority badge */}
          <div
            className={`absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize ${priorityColors[island.conservation_priority] || "bg-gray-600"}`}
          >
            {island.conservation_priority} priority
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3
                className="text-xl font-bold text-[#43523d]"
                style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
              >
                {island.name}
              </h3>
              <p
                className="text-sm text-[#a97a5e]"
                style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
              >
                {island.name_jp}
              </p>
            </div>
            <div className="text-right text-xs text-[#43523d]/60">
              <div>{island.prefecture} Prefecture</div>
              {island.population > 0 && <div>{island.population.toLocaleString()} residents</div>}
              {island.population === 0 && <div className="text-red-600 font-semibold">Uninhabited</div>}
            </div>
          </div>

          <p className="text-sm text-[#43523d]/70 mb-4 leading-relaxed">{island.description}</p>

          {/* Stats row */}
          <div className="flex gap-4 mb-4 text-xs text-[#43523d]/60">
            {island.akiya_count > 0 && (
              <span>🏚 {island.akiya_count} akiya</span>
            )}
            <span>📐 {island.area_km2} km²</span>
            {island.tags && (
              <span className="truncate">🏷 {island.tags.split(",")[0]}</span>
            )}
          </div>

          {/* Warning if critically depopulating */}
          {island.conservation_priority === "critical" && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg mb-4 flex items-start gap-2">
              <span>⚠️</span>
              <span>This island needs immediate attention — fewer residents each year.</span>
            </div>
          )}

          <div className="flex gap-3">
            <Link
              href={`/islands/${island.id}`}
              className="flex-1 bg-[#43523d] text-white text-sm font-semibold py-3 rounded-xl text-center hover:bg-[#3a4735] transition-colors"
            >
              Claim This Home
            </Link>
            <Link
              href={`/islands/${island.id}#revival`}
              className="flex-1 border border-[#43523d] text-[#43523d] text-sm font-semibold py-3 rounded-xl text-center hover:bg-[#43523d]/5 transition-colors"
            >
              See Revival Plan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

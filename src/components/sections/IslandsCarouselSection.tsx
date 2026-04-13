import Image from "next/image";
import Link from "next/link";
import type { Island } from "@/lib/islands-api";

interface Props {
  islands: Island[];
}

const STATUS_LABELS: Record<string, string> = {
  depopulating: "Depopulating",
  abandoned: "Abandoned",
  reviving: "Reviving",
  inhabited: "Inhabited",
};

const STATUS_COLORS: Record<string, string> = {
  depopulating: "text-purple-600",
  abandoned: "text-gray-500",
  reviving: "text-green-600",
  inhabited: "text-blue-600",
};

export default function IslandsCarouselSection({ islands }: Props) {
  return (
    <section className="py-6">
      <div className="px-4 flex items-center justify-between mb-4">
        <h2
          className="text-lg font-bold text-[#43523d]"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Remote Islands Seeking New Life
        </h2>
        <Link href="/islands" className="text-xs text-[#a97a5e] hover:underline font-medium">
          View all →
        </Link>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="flex gap-3 overflow-x-auto scroll-hidden px-4 pb-2">
        {islands.map((island) => (
          <Link
            key={island.id}
            href={`/islands/${island.id}`}
            className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-sm border border-[#43523d]/10 hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-28">
              <Image
                src={island.image_url || "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400"}
                alt={island.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-2.5">
              <p className="text-xs font-bold text-[#43523d] leading-tight mb-0.5 truncate">{island.name}</p>
              <p
                className="text-xs text-[#a97a5e] leading-tight mb-1 truncate"
                style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
              >
                {island.name_jp}
              </p>
              <p className={`text-xs font-medium ${STATUS_COLORS[island.status] || "text-gray-500"}`}>
                {STATUS_LABELS[island.status] || island.status}
              </p>
              <p className="text-xs text-[#43523d]/50 mt-0.5">{island.prefecture}</p>
            </div>
          </Link>
        ))}

        {/* View more card */}
        <Link
          href="/islands"
          className="flex-shrink-0 w-40 bg-[#43523d]/5 rounded-xl border border-[#43523d]/20 flex flex-col items-center justify-center p-4 hover:bg-[#43523d]/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#43523d]/10 flex items-center justify-center mb-2">
            <span className="text-[#43523d] text-lg">→</span>
          </div>
          <p className="text-xs font-semibold text-[#43523d] text-center">View All Islands</p>
        </Link>
      </div>
    </section>
  );
}

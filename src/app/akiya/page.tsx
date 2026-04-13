import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";
import { getIslands } from "@/lib/islands-api";
import { FALLBACK_ISLANDS } from "@/lib/fallback-data";
import type { Island } from "@/lib/islands-api";

export const revalidate = 300;

function AkiyaCard({ island }: { island: Island }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#43523d]/10 card-hover">
      <div className="relative w-full h-40">
        <Image
          src={island.image_url || "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600"}
          alt={`Akiya homes on ${island.name}`}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-2 right-2 bg-[#43523d] text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {island.akiya_count} homes
        </div>
      </div>
      <div className="p-4">
        <h3
          className="text-base font-bold text-[#43523d] mb-0.5"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          {island.name}
        </h3>
        <p className="text-xs text-[#a97a5e] mb-2">{island.name_jp} · {island.prefecture}</p>
        <p className="text-xs text-[#43523d]/65 leading-relaxed mb-3 line-clamp-2">{island.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#43523d]/50">
            {island.population > 0 ? `${island.population.toLocaleString()} residents` : "Uninhabited"}
          </span>
          <Link
            href={`/islands/${island.id}`}
            className="text-xs font-semibold text-[#43523d] bg-[#facc15] px-3 py-1.5 rounded-full hover:bg-yellow-300 transition-colors"
          >
            View Island →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function AkiyaPage() {
  let islands = FALLBACK_ISLANDS;

  try {
    const response = await getIslands({ items_per_page: 50 });
    if (response.data.length > 0) islands = response.data;
  } catch {
    // use fallback
  }

  const withAkiya = islands.filter((i) => i.akiya_count > 0).sort((a, b) => b.akiya_count - a.akiya_count);
  const totalAkiya = withAkiya.reduce((sum, i) => sum + i.akiya_count, 0);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />
      <TabNav />

      {/* Header */}
      <div className="bg-[#43523d] text-white px-5 py-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#facc15] mb-2">Akiya Bank</p>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Abandoned Homes
        </h1>
        <p className="text-white/70 text-sm max-w-lg">
          Japan has over 8 million empty homes — <em>akiya</em> (空き家). On remote islands, many are
          available for ¥0 to families who commit to living and reviving the community.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-[#43523d]/10 px-5 py-3 flex gap-6 text-sm overflow-x-auto scroll-hidden">
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">{totalAkiya.toLocaleString()}</span>
          <span className="text-[#43523d]/50 ml-1">akiya listed</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">{withAkiya.length}</span>
          <span className="text-[#43523d]/50 ml-1">islands with homes</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-green-600">Many free</span>
          <span className="text-[#43523d]/50 ml-1">with residency</span>
        </div>
      </div>

      {/* What is Akiya */}
      <div className="px-5 py-6 max-w-3xl mx-auto">
        <div className="bg-[#facc15]/20 border border-[#facc15] rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-bold text-[#43523d] mb-2">What is an Akiya? 空き家</h2>
          <p className="text-sm text-[#43523d]/75 leading-relaxed">
            Akiya literally means &ldquo;empty house.&rdquo; Japan&apos;s rural depopulation crisis has left millions
            of traditional homes — many over 100 years old — completely abandoned. Island municipalities
            often offer these homes free or near-free to families willing to restore them and live there
            permanently, injecting life back into dying communities.
          </p>
        </div>

        {/* Island cards with akiya */}
        <h2
          className="text-lg font-bold text-[#43523d] mb-4"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Islands with Available Homes
        </h2>

        {withAkiya.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {withAkiya.map((island) => (
              <AkiyaCard key={island.id} island={island} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#43523d]/40">
            <p className="text-4xl mb-3">🏚</p>
            <p className="text-sm">No akiya listings found. Check back soon.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

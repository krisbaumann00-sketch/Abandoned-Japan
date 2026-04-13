import { prisma } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const PREFECTURES = [
  "All", "Hokkaido", "Niigata", "Shimane", "Kyoto",
  "Nagasaki", "Ehime", "Kyushu", "Shikoku", "Honshu"
];

const TYPES = ["All", "house", "commercial", "studio"];

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { prefecture?: string; type?: string; min?: string; max?: string };
}) {
  const params = await searchParams;
  const prefecture = params.prefecture && params.prefecture !== "All" ? params.prefecture : undefined;
  const type = params.type && params.type !== "All" ? params.type : undefined;
  const min = params.min ? parseInt(params.min) : undefined;
  const max = params.max ? parseInt(params.max) : undefined;

  const properties = await prisma.property.findMany({
    where: {
      available: true,
      ...(prefecture && { prefecture }),
      ...(type && { type }),
      ...(min !== undefined || max !== undefined
        ? { price: { ...(min !== undefined && { gte: min }), ...(max !== undefined && { lte: max }) } }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#f4f1ea]">
        {/* Header */}
        <div className="bg-[#43523d] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-yellow-400 text-sm tracking-widest mb-2 font-medium">AKIYA BANK LISTINGS</p>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Abandoned Houses in Japan
            </h1>
            <p className="text-white/70 max-w-2xl text-lg">
              {properties.length} properties sourced from{" "}
              <a href="https://www.oldhousesjapan.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">
                OldHousesJapan.com
              </a>{" "}
              and Japanese municipal akiya banks. Prices in JPY.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Filters */}
          <form method="GET" className="bg-white rounded-xl shadow-sm p-6 mb-10 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-[#43523d] mb-1 uppercase tracking-wider">Prefecture</label>
              <select
                name="prefecture"
                defaultValue={params.prefecture || "All"}
                className="border-2 border-[#a97a5e]/30 rounded-lg px-3 py-2 text-[#43523d] bg-[#f4f1ea] text-sm focus:outline-none focus:border-[#43523d]"
              >
                {PREFECTURES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#43523d] mb-1 uppercase tracking-wider">Type</label>
              <select
                name="type"
                defaultValue={params.type || "All"}
                className="border-2 border-[#a97a5e]/30 rounded-lg px-3 py-2 text-[#43523d] bg-[#f4f1ea] text-sm focus:outline-none focus:border-[#43523d] capitalize"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t} className="capitalize">{t === "All" ? "All types" : t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#43523d] mb-1 uppercase tracking-wider">Min Price (¥)</label>
              <input
                type="number"
                name="min"
                defaultValue={params.min}
                placeholder="0"
                className="border-2 border-[#a97a5e]/30 rounded-lg px-3 py-2 text-[#43523d] bg-[#f4f1ea] text-sm w-28 focus:outline-none focus:border-[#43523d]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#43523d] mb-1 uppercase tracking-wider">Max Price (¥)</label>
              <input
                type="number"
                name="max"
                defaultValue={params.max}
                placeholder="10,000,000"
                className="border-2 border-[#a97a5e]/30 rounded-lg px-3 py-2 text-[#43523d] bg-[#f4f1ea] text-sm w-32 focus:outline-none focus:border-[#43523d]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#43523d] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#c67d60] transition-colors"
            >
              Filter
            </button>
            <Link href="/properties" className="text-[#a97a5e] text-sm hover:text-[#43523d] transition-colors self-center">
              Clear
            </Link>
          </form>

          {/* Results count */}
          <p className="text-sm text-[#a97a5e] mb-6 font-medium">
            Showing {properties.length} propert{properties.length === 1 ? "y" : "ies"}
          </p>

          {/* Grid */}
          {properties.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-2xl text-[#a97a5e] font-serif mb-4">No properties found</p>
              <Link href="/properties" className="text-[#43523d] font-bold hover:text-[#c67d60]">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <Link key={p.id} href={`/properties/${p.id}`} className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-52">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {p.featured && (
                        <div className="absolute top-3 left-3 bg-[#facc15] text-[#43523d] text-xs font-bold px-2 py-1 rounded">
                          FEATURED
                        </div>
                      )}
                      {p.needs && (
                        <div className="absolute top-3 right-3 bg-[#c67d60]/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          {p.needs}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#43523d] font-serif mb-1 leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-[#c67d60] font-bold text-xl mb-2">
                        ¥{p.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 text-xs mb-3">
                        <span className="bg-[#f4f1ea] text-[#43523d] px-2 py-0.5 rounded">{p.prefecture}</span>
                        {p.bedrooms != null && p.bedrooms > 0 && (
                          <span className="bg-[#f4f1ea] text-[#43523d] px-2 py-0.5 rounded">{p.bedrooms} bed</span>
                        )}
                        {p.area && (
                          <span className="bg-[#f4f1ea] text-[#43523d] px-2 py-0.5 rounded">{p.area} sqm</span>
                        )}
                        {p.builtYear && (
                          <span className="bg-[#f4f1ea] text-[#43523d] px-2 py-0.5 rounded">Built {p.builtYear}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{p.listedAgo || "Recently listed"}</span>
                        <span className="text-[#43523d] text-sm font-bold group-hover:text-[#c67d60] transition-colors">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Source attribution */}
          <div className="mt-16 bg-white rounded-xl p-6 text-sm text-[#a97a5e] text-center">
            <p className="mb-1">Listings sourced from real Japanese akiya banks and property registries.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <a href="https://www.oldhousesjapan.com" target="_blank" rel="noopener noreferrer" className="text-[#43523d] font-bold hover:text-[#c67d60]">OldHousesJapan.com ↗</a>
              <a href="https://www.akiyabanks.com" target="_blank" rel="noopener noreferrer" className="text-[#43523d] font-bold hover:text-[#c67d60]">AkiyaBanks.com ↗</a>
              <a href="https://akiya-japan.com" target="_blank" rel="noopener noreferrer" className="text-[#43523d] font-bold hover:text-[#c67d60]">Akiya-Japan.com ↗</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

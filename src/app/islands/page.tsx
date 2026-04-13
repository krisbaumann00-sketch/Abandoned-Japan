// src/app/islands/page.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

interface PageProps {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    prefecture?: string;
    q?: string;
    page?: string;
  }>;
}

const PER_PAGE = 24;

const STATUS_BADGE: Record<string, string> = {
  depopulating: "bg-amber-100 text-amber-800",
  reviving:     "bg-green-100 text-green-800",
  abandoned:    "bg-gray-200 text-gray-700",
  inhabited:    "bg-blue-100 text-blue-800",
};

const PRIORITY_DOT: Record<string, string> = {
  critical: "bg-red-500",
  high:     "bg-orange-400",
  medium:   "bg-yellow-400",
  low:      "bg-green-400",
};

export default async function IslandsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page   = Math.max(1, parseInt(params.page || "1"));
  const skip   = (page - 1) * PER_PAGE;

  // Build Prisma where clause from search params
  const where: Record<string, unknown> = {};
  if (params.status && params.status !== "all")     where.status = params.status;
  if (params.priority && params.priority !== "all") where.conservationPriority = params.priority;
  if (params.prefecture && params.prefecture !== "all") where.prefecture = params.prefecture;
  if (params.q) {
    where.OR = [
      { name:        { contains: params.q, mode: "insensitive" } },
      { nameJp:      { contains: params.q, mode: "insensitive" } },
      { description: { contains: params.q, mode: "insensitive" } },
      { tags:        { contains: params.q, mode: "insensitive" } },
      { prefecture:  { contains: params.q, mode: "insensitive" } },
    ];
  }

  const [islands, total, allPrefectures] = await Promise.all([
    prisma.island.findMany({
      where, skip, take: PER_PAGE,
      orderBy: [{ featured: "desc" }, { conservationPriority: "asc" }, { name: "asc" }],
    }),
    prisma.island.count({ where }),
    prisma.island.findMany({
      select: { prefecture: true },
      distinct: ["prefecture"],
      orderBy: { prefecture: "asc" },
    }),
  ]);

  const totalPages   = Math.ceil(total / PER_PAGE);
  const prefectures  = allPrefectures.map((p) => p.prefecture).filter(Boolean) as string[];

  // Build query string helper
  function buildUrl(overrides: Record<string, string | undefined>) {
    const next = { ...params, ...overrides };
    const qs = Object.entries(next)
      .filter(([, v]) => v && v !== "all" && v !== "1")
      .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
      .join("&");
    return `/islands${qs ? `?${qs}` : ""}`;
  }

  const activeFilters =
    (params.status && params.status !== "all") ||
    (params.priority && params.priority !== "all") ||
    (params.prefecture && params.prefecture !== "all") ||
    !!params.q;

  return (
    <>
      <Navbar />
      <TabNav />
      <main className="min-h-screen bg-[#f8f5f0]">

        {/* ── HEADER ── */}
        <section className="bg-[#0d1a0d] text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#8fbc5a] text-xs font-bold uppercase tracking-widest mb-2">
              14,125 Total · 260 Populated
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Remote Japanese Islands</h1>
            <p className="text-[#c8d8a8] max-w-2xl leading-relaxed">
              Every populated island in Japan — from Okinawa&apos;s coral atolls to Hokkaido&apos;s
              flower islands. Many are depopulating. All are remarkable.
            </p>
            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-6 text-sm">
              {[
                { label: "Critical (< 500 people)", color: "bg-red-500" },
                { label: "Depopulating",            color: "bg-amber-400" },
                { label: "Reviving",                color: "bg-green-400" },
              ].map(({ label, color }) => (
                <span key={label} className="flex items-center gap-2 text-[#c8d8a8]">
                  <span className={`w-3 h-3 rounded-full ${color} inline-block`} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <section className="bg-white border-b border-[#e0ddd8] px-4 py-4 sticky top-[105px] z-30">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">

            {/* Search */}
            <form method="GET" action="/islands" className="flex gap-2 flex-1 min-w-[200px] max-w-xs">
              <input
                type="text"
                name="q"
                defaultValue={params.q || ""}
                placeholder="Search islands…"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#8fbc5a]"
              />
              <button type="submit" className="px-3 py-2 bg-[#8fbc5a] text-[#0d1a0d] rounded-lg text-sm font-semibold hover:bg-[#a0cc6a]">
                Go
              </button>
            </form>

            {/* Status filter */}
            <div className="flex gap-1 flex-wrap">
              {["all", "depopulating", "reviving", "abandoned", "inhabited"].map((s) => (
                <Link
                  key={s}
                  href={buildUrl({ status: s, page: "1" })}
                  className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors capitalize ${
                    (params.status || "all") === s
                      ? "bg-[#1a2e1a] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s === "all" ? "All" : s}
                </Link>
              ))}
            </div>

            {/* Priority filter */}
            <select
              onChange={(e) => { window.location.href = buildUrl({ priority: e.target.value, page: "1" }); }}
              defaultValue={params.priority || "all"}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="critical">⚠ Critical (&lt;500 people)</option>
              <option value="high">High (&lt;2,000)</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Prefecture filter */}
            <select
              onChange={(e) => { window.location.href = buildUrl({ prefecture: e.target.value, page: "1" }); }}
              defaultValue={params.prefecture || "all"}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none bg-white"
            >
              <option value="all">All Prefectures</option>
              {prefectures.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Clear filters */}
            {activeFilters && (
              <Link href="/islands" className="text-xs text-red-500 hover:underline ml-auto">
                Clear filters
              </Link>
            )}

            <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
              {total.toLocaleString()} islands
            </span>
          </div>
        </section>

        {/* ── ISLAND GRID ── */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          {islands.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🏝️</div>
              <p className="text-gray-500 text-lg">No islands found.</p>
              <Link href="/islands" className="text-[#4a8a2a] hover:underline mt-2 inline-block text-sm">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {islands.map((island) => (
                <Link
                  key={island.id}
                  href={`/islands/${island.id}`}
                  className="group bg-white rounded-xl shadow-sm border border-[#e0ddd8] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Image */}
                  <div className="relative h-40 bg-[#1a2e1a]">
                    {island.imageUrl ? (
                      <Image
                        src={island.imageUrl}
                        alt={island.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl">🏝️</div>
                    )}
                    {/* Priority dot */}
                    <div className={`absolute top-2 left-2 w-2.5 h-2.5 rounded-full ${PRIORITY_DOT[island.conservationPriority || ""] || "bg-gray-300"}`} />
                    {/* Prefecture badge */}
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                      {island.prefecture}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <h3 className="font-bold text-[#1a2e1a] text-sm leading-snug">{island.name}</h3>
                      {island.nameJp && (
                        <span className="text-gray-400 text-xs flex-shrink-0">{island.nameJp}</span>
                      )}
                    </div>

                    {/* Status badge */}
                    {island.status && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_BADGE[island.status] || "bg-gray-100 text-gray-600"}`}>
                        {island.status}
                      </span>
                    )}

                    <p className="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-2">
                      {island.description}
                    </p>

                    {/* Stats row */}
                    <div className="flex gap-3 mt-3 text-xs text-gray-400">
                      {island.population != null && (
                        <span>👥 {island.population.toLocaleString()}</span>
                      )}
                      {island.areaKm2 != null && (
                        <span>📐 {island.areaKm2}km²</span>
                      )}
                      {island.akiyaCount > 0 && (
                        <span className="text-[#8fbc5a] font-medium">🏠 {island.akiyaCount}</span>
                      )}
                    </div>

                    {island.volunteerNeeded && (
                      <div className="mt-2 text-xs text-[#4a8a2a] font-medium">
                        🙋 Volunteers needed
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── PAGINATION ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {/* Prev */}
              {page > 1 ? (
                <Link
                  href={buildUrl({ page: String(page - 1) })}
                  className="px-4 py-2 text-sm border border-[#e0ddd8] rounded-lg hover:bg-[#f0ede8] transition-colors"
                >
                  ← Prev
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm text-gray-300 border border-gray-100 rounded-lg">← Prev</span>
              )}

              {/* Page numbers */}
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let p: number;
                if (totalPages <= 7) {
                  p = i + 1;
                } else if (page <= 4) {
                  p = i + 1;
                } else if (page >= totalPages - 3) {
                  p = totalPages - 6 + i;
                } else {
                  p = page - 3 + i;
                }
                return (
                  <Link
                    key={p}
                    href={buildUrl({ page: String(p) })}
                    className={`w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-colors ${
                      p === page
                        ? "bg-[#1a2e1a] text-white font-semibold"
                        : "border border-[#e0ddd8] hover:bg-[#f0ede8]"
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}

              {/* Next */}
              {page < totalPages ? (
                <Link
                  href={buildUrl({ page: String(page + 1) })}
                  className="px-4 py-2 text-sm border border-[#e0ddd8] rounded-lg hover:bg-[#f0ede8] transition-colors"
                >
                  Next →
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm text-gray-300 border border-gray-100 rounded-lg">Next →</span>
              )}
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-4">
            Showing {skip + 1}–{Math.min(skip + PER_PAGE, total)} of {total.toLocaleString()} islands
            {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}

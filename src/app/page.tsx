import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";

export const revalidate = 300;

export default async function HomePage() {
  const [islands, events, properties] = await Promise.all([
    prisma.island.findMany({ orderBy: [{ featured: "desc" }], take: 3 }),
    prisma.event.findMany({ orderBy: [{ featured: "desc" }, { date: "asc" }], take: 3 }),
    prisma.property.findMany({ where: { available: true, featured: true }, take: 3 }),
  ]);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600"
          alt="Abandoned Japan"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#facc15] mb-4">
            Japan's Forgotten Islands
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            Abandoned Japan
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            Over 400 of Japan's inhabited islands are silently disappearing.
            Explore, restore, and help revive the communities, architecture,
            and nature of Japan's forgotten island heritage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/islands"
              className="bg-[#facc15] text-[#43523d] px-8 py-4 rounded-full font-bold text-sm hover:bg-yellow-300 transition-colors"
            >
              Explore Islands →
            </Link>
            <Link
              href="/akiya"
              className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Browse Akiya Homes
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-[#43523d] text-white py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "400+", label: "Inhabited Islands" },
            { value: "8M+", label: "Abandoned Homes" },
            { value: "50%", label: "Population Lost Since 1970" },
            { value: "¥0", label: "Cost of Many Akiya" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-[#facc15]">{stat.value}</p>
              <p className="text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED ISLANDS ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#a97a5e] mb-2">
              Featured Islands
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#43523d]"
              style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
            >
              Islands Seeking New Life
            </h2>
          </div>
          <Link href="/islands" className="text-sm font-semibold text-[#43523d] hover:underline hidden md:block">
            View all islands →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {islands.map((island) => (
            <Link
              key={island.id}
              href={`/islands/${island.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#43523d]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52">
                <Image
                  src={island.imageUrl || "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600"}
                  alt={island.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-bold text-lg leading-tight">{island.name}</p>
                  <p className="text-xs text-white/70">{island.nameJp} · {island.prefecture}</p>
                </div>
                {island.conservationPriority === "critical" && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Critical
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-[#43523d]/70 leading-relaxed line-clamp-2 mb-3">{island.description}</p>
                <div className="flex items-center justify-between text-xs text-[#43523d]/50">
                  <span>{island.population === 0 ? "Uninhabited" : `${island.population?.toLocaleString()} residents`}</span>
                  {island.akiyaCount > 0 && <span>🏚 {island.akiyaCount} akiya</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/islands" className="text-sm font-semibold text-[#43523d] underline">
            View all islands →
          </Link>
        </div>
      </section>

      {/* ── AKIYA BANNER ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1400"
          alt="Akiya homes"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-[#43523d]/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#facc15] mb-4">Akiya Bank</p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            Own a Home in Japan for ¥0
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Japan has over 8 million abandoned homes — <em>akiya</em>. On remote islands,
            many are offered free to families who commit to living there and reviving the community.
          </p>
          <Link
            href="/akiya"
            className="bg-[#facc15] text-[#43523d] px-10 py-4 rounded-full font-bold hover:bg-yellow-300 transition-colors"
          >
            Browse Available Homes →
          </Link>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#a97a5e] mb-2">
              Get Involved
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#43523d]"
              style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
            >
              Upcoming Events
            </h2>
          </div>
          <Link href="/events" className="text-sm font-semibold text-[#43523d] hover:underline hidden md:block">
            View all events →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#43523d]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-40">
                <Image
                  src={event.imageUrl || "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-3 left-3 bg-[#43523d] text-white text-xs font-bold px-2 py-1 rounded">
                  {event.category}
                </div>
                {event.price === 0 && (
                  <div className="absolute top-3 right-3 bg-[#facc15] text-[#43523d] text-xs font-bold px-2 py-1 rounded">
                    FREE
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#43523d] mb-1 line-clamp-2"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                  {event.title}
                </h3>
                <p className="text-xs text-[#a97a5e] mb-2">
                  {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  {" · "}{event.island}
                </p>
                <p className="text-xs text-[#43523d]/60 line-clamp-2">{event.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────────────────────── */}
      {properties.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#a97a5e] mb-2">
                  Properties
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#43523d]"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                >
                  Featured Listings
                </h2>
              </div>
              <Link href="/properties" className="text-sm font-semibold text-[#43523d] hover:underline hidden md:block">
                View all properties →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group rounded-2xl overflow-hidden shadow-sm border border-[#43523d]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={property.imageUrl || "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600"}
                      alt={property.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 bg-white text-[#43523d] text-xs font-bold px-2 py-1 rounded capitalize">
                      {property.type}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#43523d] text-white text-xs font-bold px-2 py-1 rounded">
                      {property.price === 0 ? "FREE" : `¥${property.price?.toLocaleString()}万`}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-[#43523d] mb-1 line-clamp-1"
                      style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                      {property.title}
                    </h3>
                    <p className="text-xs text-[#a97a5e] mb-2">{property.location}</p>
                    <p className="text-xs text-[#43523d]/60 line-clamp-2">{property.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MISSION ──────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#a97a5e] mb-4">Our Mission</p>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#43523d] mb-8"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Preserving Japan's Island Heritage
        </h2>
        <p className="text-lg text-[#43523d]/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          We connect international volunteers, remote workers, artists, and families
          with Japan's disappearing island communities — creating pathways to restore
          homes, revive traditions, and sustain ecosystems before they are lost forever.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/about" className="bg-[#43523d] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#354530] transition-colors">
            Our Story
          </Link>
          <Link href="/volunteer" className="border-2 border-[#43523d] text-[#43523d] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#43523d]/5 transition-colors">
            Volunteer
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

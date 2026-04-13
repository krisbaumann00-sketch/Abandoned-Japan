import Image from "next/image";
import { getIslands, getStatusLabel, getStatusColor } from "@/lib/islands-api";
import type { Island } from "@/lib/islands-api";

export default async function IslandsCarouselSection() {
  const islands = await getIslands();

  return (
    <section id="islands" className="py-28 lg:py-36 bg-primary relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, rgba(244,241,234,0.3) 0%, transparent 60%), radial-gradient(circle at 75% 50%, rgba(169,122,94,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-label text-gold/70 block mb-4">
              Seto Inland Sea Islands
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-cream leading-tight">
              The Forgotten
              <br />
              <em className="italic text-secondary">Archipelago</em>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-cream/60 leading-relaxed text-sm md:text-base">
            700+ islands dot the Seto Inland Sea. Most are uninhabited. Many
            are slowly returning to nature. A few are finding new purpose.
          </p>
        </div>

        {/* Islands grid */}
        {islands.length === 0 ? (
          <div className="text-center py-20 text-cream/40 font-sans">
            <p className="text-lg">No islands found.</p>
            <p className="text-sm mt-2">
              Ensure the backend is running at http://127.0.0.1:8000
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {islands.map((island) => (
              <IslandCard key={island.id} island={island} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://setouchi-artfest.jp/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-cream/20 text-cream/70 font-sans font-medium px-8 py-3.5 text-sm tracking-wide hover:border-cream/60 hover:text-cream hover:bg-cream/5 transition-all duration-300 group"
          >
            Discover Setouchi Triennale Islands
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function IslandCard({ island }: { island: Island }) {
  const statusColor = getStatusColor(island.status);
  const statusLabel = getStatusLabel(island.status);

  return (
    <article className="island-card bg-cream/5 border border-cream/10 overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {island.image_url ? (
          <Image
            src={island.image_url}
            alt={island.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-primary/30 flex items-center justify-center">
            <span className="text-4xl opacity-30">🏝</span>
          </div>
        )}
        {/* Wash overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-sm ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-xl text-cream font-semibold leading-tight">
            {island.name}
          </h3>
          {island.name_japanese && (
            <p className="font-sans text-cream/60 text-sm mt-0.5">
              {island.name_japanese}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {island.description && (
          <p className="font-sans text-cream/65 text-sm leading-relaxed line-clamp-3 mb-5">
            {island.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-cream/40 text-xs font-sans mb-5">
          {island.prefecture && (
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-secondary/60 inline-block" />
              {island.prefecture}
            </span>
          )}
          {island.population !== undefined && (
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-secondary/60 inline-block" />
              Pop. {island.population.toLocaleString()}
            </span>
          )}
          {island.area && (
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-secondary/60 inline-block" />
              {island.area} km²
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {island.tourism_url && (
            <a
              href={island.tourism_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-sans font-medium py-2 border border-cream/20 text-cream/60 hover:border-cream/50 hover:text-cream transition-all"
            >
              Visit Site ↗
            </a>
          )}
          {island.volunteer_url && (
            <a
              href={island.volunteer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-sans font-medium py-2 bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-all"
            >
              Volunteer ↗
            </a>
          )}
          {!island.tourism_url && !island.volunteer_url && (
            <a
              href="#map"
              className="text-xs font-sans text-secondary hover:text-accent transition-colors"
            >
              View on map →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

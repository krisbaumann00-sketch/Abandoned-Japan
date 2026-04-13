import Image from "next/image";
import { getAkiyaListings, formatPrice } from "@/lib/akiya-api";
import type { AkiyaListing } from "@/lib/akiya-api";

export default async function AkiyaSection() {
  const listings = await getAkiyaListings();

  return (
    <section id="akiya" className="py-28 lg:py-36 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <span className="section-label block mb-4">Akiya Listings</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight">
              Empty Houses
              <br />
              <em className="italic text-secondary">Awaiting New Life</em>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="font-sans text-ink/60 leading-relaxed text-sm mb-4">
              Japan has over 9 million vacant homes (空き家). Many are in
              stunning rural and island settings, available for near-zero cost
              to those willing to restore and inhabit them.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://akiyainaka.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-semibold text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent/10 transition-colors"
              >
                Akiya & Inaka ↗
              </a>
              <a
                href="https://www.homes.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-semibold text-secondary border border-secondary/30 px-3 py-1.5 hover:bg-secondary/10 transition-colors"
              >
                HOMES.co.jp ↗
              </a>
              <a
                href="https://www.renovationmachiya.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-semibold text-primary/70 border border-primary/20 px-3 py-1.5 hover:bg-primary/5 transition-colors"
              >
                Machiya ↗
              </a>
            </div>
          </div>
        </div>

        {/* Source badge */}
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-sans text-ink/50">
            Listings sourced from local partner databases — updated every 30
            minutes
          </span>
        </div>

        {/* Listings grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <AkiyaCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center font-sans text-xs text-ink/40">
          Listings are for informational purposes. Always verify through official
          municipal akiya banks. Some properties require renovation commitments.
        </p>
      </div>
    </section>
  );
}

function AkiyaCard({ listing }: { listing: AkiyaListing }) {
  const price = formatPrice(listing);
  const isFree = listing.price === 0 || price === "Free transfer";

  return (
    <article className="island-card bg-white border border-primary/8 overflow-hidden group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {listing.image_url ? (
          <Image
            src={listing.image_url}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
            <span className="text-4xl opacity-30">🏡</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />

        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-sm font-sans font-bold px-3 py-1.5 ${
              isFree
                ? "bg-accent text-cream"
                : "bg-cream/95 text-primary"
            }`}
          >
            {price}
          </span>
        </div>

        {/* Status */}
        {listing.status === "under_review" && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-sans font-semibold px-2 py-1 bg-amber-500 text-white">
              Under Review
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg text-primary leading-snug mb-1">
          {listing.title}
        </h3>
        <p className="font-sans text-xs text-secondary font-medium mb-3">
          📍 {listing.location}
        </p>

        {listing.description && (
          <p className="font-sans text-sm text-ink/60 leading-relaxed line-clamp-2 mb-4">
            {listing.description}
          </p>
        )}

        {/* Specs */}
        <div className="flex flex-wrap gap-3 text-xs font-sans text-ink/50 mb-4">
          {listing.area_sqm && <span>📐 {listing.area_sqm}m²</span>}
          {listing.bedrooms !== undefined && listing.bedrooms > 0 && (
            <span>🛏 {listing.bedrooms} bed</span>
          )}
          {listing.year_built && <span>🏗 Built {listing.year_built}</span>}
        </div>

        {/* Features */}
        {listing.features && listing.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {listing.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="text-[10px] font-sans px-2 py-1 bg-primary/5 text-primary/70 border border-primary/10"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-primary/8">
          {listing.source_url && (
            <a
              href={listing.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-sans font-semibold py-2.5 border border-primary/20 text-primary hover:bg-primary hover:text-cream transition-all duration-200"
            >
              View Listing ↗
            </a>
          )}
          {listing.contact_url && (
            <a
              href={listing.contact_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-sans font-semibold py-2.5 bg-accent text-cream hover:bg-accent/90 transition-colors"
            >
              Enquire ↗
            </a>
          )}
        </div>

        {listing.source_name && (
          <p className="mt-2 text-[10px] font-sans text-ink/30 text-right">
            via {listing.source_name}
          </p>
        )}
      </div>
    </article>
  );
}

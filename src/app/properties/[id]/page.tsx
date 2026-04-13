import { prisma } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) notFound();

  const related = await prisma.property.findMany({
    where: { prefecture: property.prefecture, id: { not: property.id }, available: true },
    take: 3,
    orderBy: { featured: "desc" },
  });

  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#f4f1ea]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#a97a5e]/20 px-4 py-3">
          <div className="max-w-7xl mx-auto text-sm text-[#a97a5e]">
            <Link href="/" className="hover:text-[#43523d]">Home</Link>
            {" › "}
            <Link href="/properties" className="hover:text-[#43523d]">Properties</Link>
            {" › "}
            <span className="text-[#43523d] font-medium">{property.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Hero image */}
              <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-[#facc15] text-[#43523d] text-sm font-bold px-3 py-1.5 rounded">
                    FEATURED LISTING
                  </div>
                )}
              </div>

              {/* Title & price */}
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#43523d] mb-2">
                {property.title}
              </h1>
              <p className="text-3xl font-bold text-[#c67d60] mb-2">
                ¥{property.price.toLocaleString()}
              </p>
              <p className="text-[#a97a5e] mb-6 text-sm">
                📍 {property.location}
              </p>

              {/* Key details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Type", value: property.type },
                  { label: "Bedrooms", value: property.bedrooms != null ? `${property.bedrooms} rooms` : "—" },
                  { label: "Floor Area", value: property.area ? `${property.area} sqm` : "—" },
                  { label: "Built", value: property.builtYear || "Unknown" },
                ].map((d) => (
                  <div key={d.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-xs text-[#a97a5e] font-medium uppercase tracking-wider mb-1">{d.label}</div>
                    <div className="font-bold text-[#43523d] capitalize">{d.value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-4">About This Property</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Condition */}
              {property.needs && (
                <div className="bg-[#c67d60]/10 border-l-4 border-[#c67d60] rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-[#43523d] mb-1 font-serif">Renovation Required</h3>
                  <p className="text-[#43523d]/80">{property.needs}</p>
                </div>
              )}

              {/* Map placeholder */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-4">Location</h2>
                <div className="h-64 bg-gradient-to-b from-[#a8d5e8] to-[#7ab8d0] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📍</div>
                    <p className="font-bold text-[#43523d]">{property.prefecture}</p>
                    <p className="text-sm text-[#43523d]/70">{property.location}</p>
                    <p className="text-xs text-[#43523d]/50 mt-1">
                      {property.lat.toFixed(4)}°N, {property.lng.toFixed(4)}°E
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact card */}
              <div className="bg-[#43523d] text-white rounded-2xl p-6 shadow-xl mb-6 sticky top-24">
                <h3 className="text-xl font-bold font-serif mb-1">Enquire About This Property</h3>
                <p className="text-white/60 text-sm mb-6">
                  We connect you directly with the local akiya bank or municipal office handling this listing.
                </p>
                <div className="space-y-3">
                  <Link
                    href={`/contact?property=${encodeURIComponent(property.title)}`}
                    className="block w-full bg-[#facc15] text-[#43523d] text-center py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors"
                  >
                    Send Enquiry
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full border-2 border-white/40 text-white text-center py-3 rounded-full font-bold hover:bg-white/10 transition-colors text-sm"
                  >
                    Save to My List
                  </Link>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 text-xs text-white/50 space-y-1">
                  <p>Listed: {property.listedAgo || "Recently"}</p>
                  <p>Prefecture: {property.prefecture}</p>
                  <p>Island/Region: {property.island}</p>
                </div>
              </div>

              {/* Source links */}
              <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
                <h4 className="font-bold text-[#43523d] mb-3 text-sm uppercase tracking-wider">Find More Listings</h4>
                <div className="space-y-2 text-sm">
                  <a href="https://www.oldhousesjapan.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#43523d] hover:text-[#c67d60] transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#43523d]"></span>
                    OldHousesJapan.com ↗
                  </a>
                  <a href="https://www.akiyabanks.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#43523d] hover:text-[#c67d60] transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#a97a5e]"></span>
                    AkiyaBanks.com ↗
                  </a>
                  <a href="https://akiya-japan.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#43523d] hover:text-[#c67d60] transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#c67d60]"></span>
                    Akiya-Japan.com ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related properties */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-6">
                More in {property.prefecture}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.id} href={`/properties/${r.id}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-40">
                        <Image src={r.imageUrl} alt={r.title} fill className="object-cover" unoptimized />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[#43523d] font-serif text-sm line-clamp-2 mb-1">{r.title}</h3>
                        <p className="text-[#c67d60] font-bold">¥{r.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

import { prisma } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = ["All", "Art Festival", "Restoration", "Conservation", "Marine Conservation", "Farming & Restoration"];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const params = await searchParams;
  const category = params.category && params.category !== "All" ? params.category : undefined;

  const events = await prisma.event.findMany({
    where: { ...(category && { category }) },
    orderBy: [{ featured: "desc" }, { date: "asc" }],
  });

  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#f4f1ea]">
        {/* Header */}
        <div className="bg-[#43523d] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-yellow-400 text-sm tracking-widest mb-2 font-medium">CONSERVATION EVENTS & WORKCAMPS</p>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Events Across Japan&apos;s Islands
            </h1>
            <p className="text-white/70 max-w-2xl text-lg">
              Art festivals, restoration workcamps, marine conservation, and farming exchanges — all open to international volunteers.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const isActive = (cat === "All" && !category) || cat === category;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/events" : `/events?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#43523d] text-white"
                      : "bg-white text-[#43523d] hover:bg-[#43523d] hover:text-white border border-[#a97a5e]/30"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Events grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <Link key={e.id} href={`/events/${e.id}`} className="group">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-52 flex-shrink-0">
                    <Image
                      src={e.imageUrl || "https://picsum.photos/seed/event/400/300"}
                      alt={e.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 bg-[#43523d] text-white text-xs font-bold px-2 py-1 rounded">
                      {e.category.toUpperCase()}
                    </div>
                    {e.price === 0 && (
                      <div className="absolute top-3 right-3 bg-[#facc15] text-[#43523d] text-xs font-bold px-2 py-1 rounded">
                        FREE
                      </div>
                    )}
                    {e.featured && (
                      <div className="absolute bottom-3 left-3 bg-[#c67d60] text-white text-xs px-2 py-1 rounded">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[#43523d] font-serif text-base leading-snug mb-2 line-clamp-2">
                      {e.title}
                    </h3>
                    <p className="text-[#c67d60] font-medium text-sm mb-1">
                      {new Date(e.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-[#a97a5e] text-sm mb-3">📍 {e.location}</p>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">{e.description}</p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-[#f4f1ea]">
                      <span className="text-sm text-[#43523d] font-medium">
                        👥 {e.volunteerCount || 0} volunteers
                      </span>
                      {e.price != null && e.price > 0 ? (
                        <span className="text-sm font-bold text-[#c67d60]">¥{e.price.toLocaleString()}</span>
                      ) : (
                        <span className="text-sm font-bold text-green-600">Free</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-24">
              <p className="text-2xl text-[#a97a5e] font-serif mb-4">No events in this category</p>
              <Link href="/events" className="text-[#43523d] font-bold hover:text-[#c67d60]">View all events</Link>
            </div>
          )}

          {/* Partner organisations */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-6">Partner Organisations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Setouchi Triennale",
                  desc: "Contemporary art festival held every 3 years on 17 Seto Inland Sea islands. ~1 million visitors from Japan and abroad.",
                  url: "https://setouchi-artfest.jp",
                  tag: "Art Festival"
                },
                {
                  name: "Ogasawara Marine Centre",
                  desc: "NPO ELNA operates year-round sea turtle and humpback whale conservation on UNESCO World Heritage Chichijima.",
                  url: "https://bonin-ocean.net",
                  tag: "Marine Conservation"
                },
                {
                  name: "GoEco Japan",
                  desc: "Award-winning volunteer programmes on Sado Island. Crested Ibis conservation, temple restoration, and rice field preservation.",
                  url: "https://www.goeco.org/area/volunteer-in-asia/japan/wildlife-conservation-and-cultural-immersion/",
                  tag: "Conservation"
                }
              ].map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#f4f1ea] rounded-xl p-5 hover:bg-[#43523d] hover:text-white transition-colors group"
                >
                  <div className="text-xs font-bold text-[#c67d60] group-hover:text-yellow-400 mb-2 uppercase tracking-wider">
                    {org.tag}
                  </div>
                  <h3 className="font-bold font-serif text-[#43523d] group-hover:text-white mb-2">{org.name}</h3>
                  <p className="text-sm text-[#43523d]/70 group-hover:text-white/70">{org.desc}</p>
                  <p className="text-xs mt-3 text-[#43523d] group-hover:text-yellow-400 font-bold">Visit website ↗</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

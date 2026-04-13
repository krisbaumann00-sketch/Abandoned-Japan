import { prisma } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  const related = await prisma.event.findMany({
    where: { id: { not: event.id } },
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
            <Link href="/events" className="hover:text-[#43523d]">Events</Link>
            {" › "}
            <span className="text-[#43523d] font-medium line-clamp-1">{event.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={event.imageUrl || "https://picsum.photos/seed/event/800/600"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                <div className="absolute top-4 left-4 bg-[#43523d] text-white text-sm font-bold px-3 py-1.5 rounded">
                  {event.category.toUpperCase()}
                </div>
                {event.price === 0 && (
                  <div className="absolute top-4 right-4 bg-[#facc15] text-[#43523d] text-sm font-bold px-3 py-1.5 rounded">
                    FREE EVENT
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#43523d] mb-4">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-8 text-sm">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <span>📅</span>
                  <span className="font-medium text-[#43523d]">
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <span>📍</span>
                  <span className="font-medium text-[#43523d]">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <span>👥</span>
                  <span className="font-medium text-[#43523d]">{event.volunteerCount || 0} volunteers needed</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>

              {/* Island info */}
              <div className="bg-[#43523d]/5 border-l-4 border-[#43523d] rounded-xl p-6 mb-8">
                <h3 className="font-bold text-[#43523d] mb-1 font-serif">Island: {event.island}</h3>
                <p className="text-[#43523d]/70 text-sm">
                  This event takes place on {event.island}, part of Japan&apos;s network of inhabited island communities supported by our conservation network.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#43523d] text-white rounded-2xl p-6 shadow-xl mb-6 sticky top-24">
                <h3 className="text-xl font-bold font-serif mb-1">Join This Event</h3>
                <p className="text-white/60 text-sm mb-6">
                  Register your interest and we&apos;ll connect you with the organising team.
                </p>

                <div className="mb-4 p-4 bg-white/10 rounded-xl">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Date</span>
                    <span className="font-medium">
                      {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Cost</span>
                    <span className="font-medium text-yellow-400">
                      {event.price === 0 ? "Free" : `¥${event.price?.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Volunteers</span>
                    <span className="font-medium">{event.volunteerCount || 0} signed up</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/contact?event=${encodeURIComponent(event.title)}`}
                    className="block w-full bg-[#facc15] text-[#43523d] text-center py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors"
                  >
                    Register Interest
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full border-2 border-white/40 text-white text-center py-3 rounded-full font-bold hover:bg-white/10 transition-colors text-sm"
                  >
                    Create Account First
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related events */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-serif text-[#43523d] mb-6">Other Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.id} href={`/events/${r.id}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-40">
                        <Image src={r.imageUrl || "https://picsum.photos/seed/event/400/300"} alt={r.title} fill className="object-cover" unoptimized />
                        <div className="absolute top-2 left-2 bg-[#43523d] text-white text-xs px-2 py-0.5 rounded">
                          {r.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[#43523d] font-serif text-sm line-clamp-2 mb-1">{r.title}</h3>
                        <p className="text-[#c67d60] text-xs">
                          {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
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

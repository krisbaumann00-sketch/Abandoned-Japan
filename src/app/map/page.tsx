// src/app/map/page.tsx
// Interactive events & islands map for abandonedjapan.org
// Uses Leaflet.js (free, no API key) with OpenStreetMap tiles

import { prisma } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";
import InteractiveMap from "@/components/InteractiveMap";

export const revalidate = 3600;

async function getData() {
  const [islands, events] = await Promise.all([
    prisma.island.findMany({
      where: {
        latitude: { not: null },
        longitude: { not: null },
      },
      select: {
        id: true,
        name: true,
        nameJp: true,
        prefecture: true,
        description: true,
        population: true,
        latitude: true,
        longitude: true,
        imageUrl: true,
        akiyaCount: true,
        conservationPriority: true,
        status: true,
      },
    }),
    prisma.event.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: "asc" },
      take: 100,
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        island: true,
        category: true,
        imageUrl: true,
        price: true,
      },
    }),
  ]);
  return { islands, events };
}

export default async function MapPage() {
  const { islands, events } = await getData();

  // Serialize for client component (dates → strings)
  const serializedEvents = events.map((e) => ({
    ...e,
    date: e.date.toISOString(),
  }));

  return (
    <>
      <Navbar />
      <TabNav />
      <main className="flex flex-col" style={{ minHeight: "calc(100vh - 112px)" }}>
        {/* Header */}
        <div className="bg-[#0d1a0d] text-white px-4 py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Japan Island Map
              </h1>
              <p className="text-[#c8d8a8] text-sm mt-1">
                {islands.length} islands · {events.length} upcoming events
              </p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#8fbc5a] inline-block" />
                Islands
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block" />
                Events
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                Urgent
              </span>
            </div>
          </div>
        </div>

        {/* Map fills remaining height */}
        <div className="flex-1" style={{ minHeight: "600px" }}>
          <InteractiveMap islands={islands} events={serializedEvents} />
        </div>
      </main>
      <Footer />
    </>
  );
}

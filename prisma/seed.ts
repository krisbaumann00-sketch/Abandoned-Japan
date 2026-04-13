import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── ISLANDS ──────────────────────────────────────────────────────────────
  const islands = [
    {
      name: "Amami Oshima", nameJp: "奄美大島", prefecture: "Kagoshima",
      description: "UNESCO World Natural Heritage site with endemic species and subtropical forests.",
      longDescription: "Amami Oshima is the largest island in the Amami archipelago and was designated a UNESCO World Natural Heritage Site in 2021. Home to the critically endangered Amami rabbit, the island represents one of Japan's most biodiverse regions. Hundreds of traditional kominka homes sit abandoned as the population ages.",
      population: 55000, areaKm2: 712.4, latitude: 28.3, longitude: 129.5,
      conservationPriority: "critical", status: "depopulating",
      imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
      akiyaCount: 340, volunteerNeeded: true, volunteerCount: 12, featured: true,
      tags: "UNESCO,endemic species,kominka,silk weaving",
      peakSeason: "March-May, October-November",
      accessInfo: "Ferry from Kagoshima (11h) or flight from Kagoshima/Osaka",
    },
    {
      name: "Naoshima", nameJp: "直島", prefecture: "Kagawa",
      description: "The art island of the Seto Inland Sea, revived through contemporary art.",
      longDescription: "Once a declining industrial island, Naoshima was transformed by Benesse Corporation and architect Tadao Ando into a living museum. The Chichu Art Museum and Art House Project have turned former residents' homes into immersive artworks.",
      population: 3000, areaKm2: 8.1, latitude: 34.46, longitude: 133.99,
      conservationPriority: "medium", status: "reviving",
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      akiyaCount: 45, volunteerNeeded: false, volunteerCount: 0, featured: true,
      tags: "art island,Tadao Ando,Benesse,Seto Inland Sea",
      peakSeason: "April-June, September-November",
      accessInfo: "Ferry from Uno Port, Okayama (20 min)",
    },
    {
      name: "Teshima", nameJp: "豊島", prefecture: "Kagawa",
      description: "Organic farming revival and world-class art on a once-polluted island.",
      longDescription: "Teshima was used as an illegal industrial waste dump in the 1970s-1990s. Through decades of cleanup, it has emerged as a symbol of resilience with the Teshima Art Museum and organic farms.",
      population: 800, areaKm2: 14.5, latitude: 34.49, longitude: 134.18,
      conservationPriority: "high", status: "reviving",
      imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800",
      akiyaCount: 120, volunteerNeeded: true, volunteerCount: 8, featured: false,
      tags: "art island,organic farming,Seto Inland Sea",
      peakSeason: "April-June, September-November",
      accessInfo: "Ferry from Uno Port (35 min)",
    },
    {
      name: "Inujima", nameJp: "犬島", prefecture: "Okayama",
      description: "A tiny island with 50 residents and a copper refinery turned art gallery.",
      longDescription: "Inujima has only 50 elderly residents. A copper smelting refinery left distinctive brick ruins now incorporated into the Inujima Seirensho Art Museum. Without intervention, the island faces complete abandonment.",
      population: 50, areaKm2: 0.54, latitude: 34.55, longitude: 134.18,
      conservationPriority: "critical", status: "depopulating",
      imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
      akiyaCount: 28, volunteerNeeded: true, volunteerCount: 3, featured: false,
      tags: "Art House Project,micro-island,urgent",
      peakSeason: "March-November",
      accessInfo: "Ferry from Hoden Port, Okayama (10 min)",
    },
    {
      name: "Hashima", nameJp: "端島", prefecture: "Nagasaki",
      description: "Gunkanjima — Battleship Island — the world's most haunting abandoned cityscape.",
      longDescription: "Once Japan's most densely populated place, Hashima was abandoned in 84 days when Mitsubishi's coal mines closed in 1974. The crumbling concrete apartments and cinema stand frozen in time as a UNESCO World Heritage Site.",
      population: 0, areaKm2: 0.063, latitude: 32.63, longitude: 129.74,
      conservationPriority: "high", status: "abandoned",
      imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
      akiyaCount: 0, volunteerNeeded: false, volunteerCount: 0, featured: true,
      tags: "Gunkanjima,UNESCO,coal mining,dark tourism",
      peakSeason: "Year-round",
      accessInfo: "Boat tour from Nagasaki Port (45 min)",
    },
    {
      name: "Aoshima", nameJp: "青島", prefecture: "Ehime",
      description: "The Cat Island — 13 human residents, 160 cats, and zero cars.",
      longDescription: "Aoshima went viral in 2015 when a resident's plea for cat food donations revealed: 160 cats and only 13 elderly residents. Once a fishing community of 900, the island now has no shops, no medical facilities, no vending machines.",
      population: 13, areaKm2: 0.49, latitude: 33.7, longitude: 132.55,
      conservationPriority: "critical", status: "depopulating",
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      akiyaCount: 22, volunteerNeeded: true, volunteerCount: 2, featured: false,
      tags: "cat island,micro-island,urgent,fishing heritage",
      peakSeason: "Spring and autumn",
      accessInfo: "Ferry from Nagahama Port, Ehime (30 min) — one ferry per day",
    },
  ];

  for (const island of islands) {
    await prisma.island.upsert({
      where: { name: island.name },
      update: island,
      create: island,
    });
  }
  console.log(`✓ ${islands.length} islands seeded`);

  // ── EVENTS ───────────────────────────────────────────────────────────────
  const events = [
    {
      title: "Naoshima Art & Restoration Weekend",
      description: "Join volunteers and artists for a weekend of community restoration work on traditional machiya townhouses, followed by a private tour of the Art House Project.",
      date: new Date("2025-05-10"), location: "Naoshima, Kagawa", island: "Naoshima",
      price: 0, category: "Restoration", featured: true,
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      volunteerCount: 24,
    },
    {
      title: "Amami Oshima Silk Weaving Workshop",
      description: "Learn traditional Oshima Tsumugi silk weaving from local artisans. Help preserve a 1,300-year-old craft listed as UNESCO intangible cultural heritage.",
      date: new Date("2025-06-14"), location: "Amami Oshima, Kagoshima", island: "Amami Oshima",
      price: 4500, category: "Art Festival", featured: true,
      imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
      volunteerCount: 12,
    },
    {
      title: "Teshima Organic Harvest Festival",
      description: "Help harvest organic vegetables at Teshima's revived farms and participate in the island's annual community feast. Accommodation available in restored kominka.",
      date: new Date("2025-09-20"), location: "Teshima, Kagawa", island: "Teshima",
      price: 2000, category: "Farming & Restoration", featured: false,
      imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800",
      volunteerCount: 18,
    },
    {
      title: "Aoshima Cat Island Conservation Day",
      description: "Help with feral cat welfare, island cleanup, and document the island's condition for our conservation report. A rare chance to visit Japan's most famous cat island.",
      date: new Date("2025-07-05"), location: "Aoshima, Ehime", island: "Aoshima",
      price: 0, category: "Conservation", featured: true,
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      volunteerCount: 8,
    },
    {
      title: "Hashima Photography Expedition",
      description: "A guided photography tour of Gunkanjima with a professional photographer. Proceeds fund preservation lobbying for the crumbling UNESCO site.",
      date: new Date("2025-08-16"), location: "Hashima, Nagasaki", island: "Hashima",
      price: 12000, category: "Art Festival", featured: false,
      imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
      volunteerCount: 0,
    },
    {
      title: "Inujima Marine Cleanup & Art Tour",
      description: "Join a beach and ocean cleanup around Inujima followed by a private after-hours tour of the Seirensho Art Museum. Lunch provided by local residents.",
      date: new Date("2025-10-11"), location: "Inujima, Okayama", island: "Inujima",
      price: 0, category: "Marine Conservation", featured: false,
      imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
      volunteerCount: 15,
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { title: event.title },
      update: event,
      create: event,
    });
  }
  console.log(`✓ ${events.length} events seeded`);

  // ── PROPERTIES ───────────────────────────────────────────────────────────
  const properties = [
    {
      title: "Traditional Kominka — Amami Oshima",
      description: "A 1930s timber-frame farmhouse with original engawa veranda and clay tile roof. Set on 280m² of land with a mature garden. Ideal for a family seeking island life.",
      price: 3200, type: "house", location: "Amami Oshima, Kagoshima",
      prefecture: "Kagoshima", island: "Amami Oshima",
      lat: 28.31, lng: 129.51, bedrooms: 4, area: 120,
      imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
      featured: true, available: true, builtYear: "1934",
      needs: "Roof repair, interior refresh", listedAgo: "3 days ago",
    },
    {
      title: "Fisherman's House — Aoshima",
      description: "One of 22 available homes on Japan's famous cat island. Simple wooden structure near the pier. The municipality offers this free to families who commit to 5-year residency.",
      price: 0, type: "house", location: "Aoshima, Ehime",
      prefecture: "Ehime", island: "Aoshima",
      lat: 33.71, lng: 132.56, bedrooms: 2, area: 65,
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      featured: true, available: true, builtYear: "1958",
      needs: "Full restoration", listedAgo: "1 week ago",
    },
    {
      title: "Machiya Townhouse — Naoshima",
      description: "A beautifully preserved machiya townhouse in Honmura village, steps from the Art House Project. Partially renovated with new electrical wiring and plumbing.",
      price: 8500, type: "house", location: "Naoshima, Kagawa",
      prefecture: "Kagawa", island: "Naoshima",
      lat: 34.46, lng: 134.0, bedrooms: 3, area: 95,
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      featured: true, available: true, builtYear: "1948",
      needs: "Kitchen modernisation", listedAgo: "2 days ago",
    },
    {
      title: "Farmhouse with Rice Fields — Teshima",
      description: "A rare opportunity to acquire a farmhouse with adjacent organic rice paddies on Teshima. The island cooperative will assist with farming training.",
      price: 4800, type: "house", location: "Teshima, Kagawa",
      prefecture: "Kagawa", island: "Teshima",
      lat: 34.5, lng: 134.19, bedrooms: 3, area: 140,
      imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800",
      featured: false, available: true, builtYear: "1961",
      needs: "Structural assessment needed", listedAgo: "5 days ago",
    },
    {
      title: "Stone Warehouse Studio — Inujima",
      description: "A converted stone warehouse near the Seirensho Art Museum. Perfect for an artist studio or small gallery space. The island's art committee actively supports new residents.",
      price: 2400, type: "studio", location: "Inujima, Okayama",
      prefecture: "Okayama", island: "Inujima",
      lat: 34.56, lng: 134.19, bedrooms: 1, area: 55,
      imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
      featured: false, available: true, builtYear: "1920",
      needs: "Window replacement, insulation", listedAgo: "2 weeks ago",
    },
  ];

  for (const property of properties) {
    const existing = await prisma.property.findFirst({ where: { title: property.title } });
    if (!existing) await prisma.property.create({ data: property });
  }
  console.log(`✓ ${properties.length} properties seeded`);

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

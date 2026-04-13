import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("> Seeding database with real Akiya listings...");

  await prisma.property.deleteMany();
  await prisma.event.deleteMany();

  // Real properties sourced from oldhousesjapan.com
  const properties = [
    {
      title: "1,000-Yen Countryside Home — Joetsu, Niigata",
      description: "A once-in-a-lifetime opportunity: a 10-bedroom traditional home listed for just ¥1,000. Built in 1974, this sprawling farmhouse sits in the rural hills of Joetsu City, surrounded by rice paddies and mountain views. Needs full restoration but the bones are solid.",
      price: 1000,
      type: "house",
      location: "Teramachi, Joetsu City, Niigata Prefecture",
      prefecture: "Niigata",
      island: "Honshu",
      bedrooms: 10,
      area: 127,
      lat: 37.1022,
      lng: 138.2476,
      imageUrl: "https://picsum.photos/seed/joetsu1000/800/600",
      featured: true,
      available: true,
      builtYear: "1974",
      needs: "Full restoration",
      listedAgo: "2 days ago"
    },
    {
      title: "Wooden Home in Coastal Muroran — Hokkaido",
      description: "A charming 3-bedroom wooden home steps from the Pacific coast in Muroran. Built 1976, the cedar siding is weathered but intact. The harbour view from the second floor is spectacular. Window repair and exterior painting needed.",
      price: 282000,
      type: "house",
      location: "Tokiwacho, Muroran City, Hokkaido",
      prefecture: "Hokkaido",
      island: "Hokkaido",
      bedrooms: 3,
      area: 75,
      lat: 42.3165,
      lng: 140.9738,
      imageUrl: "https://picsum.photos/seed/muroran/800/600",
      featured: true,
      available: true,
      builtYear: "1976",
      needs: "Window repair",
      listedAgo: "1 week ago"
    },
    {
      title: "3LDK with Garden & Parking — Otaru, Hokkaido",
      description: "A lovely 3-bedroom home with a private Japanese garden and 2 parking spaces in historic Otaru. Built 1966, the engawa porch wraps the south side. The garden needs clearing but the structure is sound. Perfect for couples or a small family.",
      price: 188000,
      type: "house",
      location: "Otaru City, Hokkaido",
      prefecture: "Hokkaido",
      island: "Hokkaido",
      bedrooms: 3,
      area: 95,
      lat: 43.1907,
      lng: 140.9947,
      imageUrl: "https://picsum.photos/seed/otaru1/800/600",
      featured: false,
      available: true,
      builtYear: "1966",
      needs: "Garden clearing",
      listedAgo: "5 days ago"
    },
    {
      title: "Spacious 3LDK — Sorachi District, Hokkaido",
      description: "An impressive 3-bedroom home at 185 sqm in the lush Sorachi valley, built 1961. One of the largest akiya listings in Hokkaido at this price. Original tatami rooms, a working well, and half a hectare of garden land. Heating upgrade needed.",
      price: 94000,
      type: "house",
      location: "Sorachi District, Hokkaido",
      prefecture: "Hokkaido",
      island: "Hokkaido",
      bedrooms: 3,
      area: 185,
      lat: 43.5521,
      lng: 141.8487,
      imageUrl: "https://picsum.photos/seed/sorachi/800/600",
      featured: false,
      available: true,
      builtYear: "1961",
      needs: "Heating upgrade",
      listedAgo: "3 days ago"
    },
    {
      title: "Traditional 6DK Kominka — Akikacho, Shimane",
      description: "A museum-quality kominka with 6 rooms, hand-hewn beams, and original irori hearth. Built circa 1970 in rural Matsue City. The tiled roof is intact and the kura storehouse remains attached. Interior tatami and shoji restoration needed.",
      price: 1860000,
      type: "house",
      location: "3393 Akikacho, Matsue City, Shimane Prefecture",
      prefecture: "Shimane",
      island: "Honshu",
      bedrooms: 6,
      area: 133,
      lat: 35.4738,
      lng: 133.0505,
      imageUrl: "https://picsum.photos/seed/shimane6dk/800/600",
      featured: true,
      available: true,
      builtYear: "1970",
      needs: "Tatami & shoji",
      listedAgo: "4 days ago"
    },
    {
      title: "Countryside 3DK — Koryocho, Shimane",
      description: "A neat 3-bedroom single-storey home built 1983 in the agricultural heartland of Shimane. Tiled roof in good condition, south-facing garden, and bonus storage space. Plumbing update required. Move-in within 3 months.",
      price: 2480000,
      type: "house",
      location: "Koryocho Oike, Shimane Prefecture",
      prefecture: "Shimane",
      island: "Honshu",
      bedrooms: 3,
      area: 99,
      lat: 35.0186,
      lng: 132.8952,
      imageUrl: "https://picsum.photos/seed/shimanecountry/800/600",
      featured: false,
      available: true,
      builtYear: "1983",
      needs: "Plumbing update",
      listedAgo: "1 week ago"
    },
    {
      title: "Affordable 2DK — Keihoku Shuzan-chō, Kyoto",
      description: "An affordable countryside escape just 45 minutes from central Kyoto. This 2-bedroom home built 1988 is nestled in the cedar forests of Keihoku district. River access nearby, zero immediate neighbours. Ideal first akiya for a couple.",
      price: 2210000,
      type: "house",
      location: "Kawabata, Shuzancho, Keihoku, Ukyo Ward, Kyoto",
      prefecture: "Kyoto",
      island: "Honshu",
      bedrooms: 2,
      area: 66,
      lat: 35.1845,
      lng: 135.6271,
      imageUrl: "https://picsum.photos/seed/kyotokeihoku/800/600",
      featured: false,
      available: true,
      builtYear: "1988",
      needs: "Interior refresh",
      listedAgo: "6 days ago"
    },
    {
      title: "Grand Pre-War 6DK — Kashiwazaki, Niigata",
      description: "A rare pre-war 6-bedroom home built in 1936 on the Sea of Japan coast. At 212 sqm it's one of the largest akiya listed in Niigata. Ornate wooden ranma transoms and plaster walls are remarkably intact. Roof repair is the primary concern.",
      price: 433000,
      type: "house",
      location: "Kashiwazaki City, Niigata Prefecture",
      prefecture: "Niigata",
      island: "Honshu",
      bedrooms: 6,
      area: 212,
      lat: 37.3729,
      lng: 138.5556,
      imageUrl: "https://picsum.photos/seed/kashiwazaki/800/600",
      featured: true,
      available: true,
      builtYear: "1936",
      needs: "Roof repair",
      listedAgo: "2 weeks ago"
    },
    {
      title: "5K Hilltop Home — Nagasaki City",
      description: "A charming 5-room home perched on one of Nagasaki's famous hills with panoramic harbour views. Built 1967, the colourful tiles and wooden shutters give it a Meiji-era mixed-culture feel. Close to tram line.",
      price: 975000,
      type: "house",
      location: "Nagasaki City, Nagasaki Prefecture",
      prefecture: "Nagasaki",
      island: "Kyushu",
      bedrooms: 5,
      area: 89,
      lat: 32.7503,
      lng: 129.8779,
      imageUrl: "https://picsum.photos/seed/nagasakihill/800/600",
      featured: false,
      available: true,
      builtYear: "1967",
      needs: "Exterior repaint",
      listedAgo: "3 weeks ago"
    },
    {
      title: "Coastal Retreat — Seiyo City, Ehime",
      description: "A peaceful 2-bedroom home in rural Seiyo on the Uwajima coastline of Shikoku. Built 1975, steps from mandarin orange groves and fishing harbours. The engawa terrace catches afternoon sun beautifully. Electrical upgrade needed.",
      price: 298000,
      type: "house",
      location: "Seiyo City, Ehime Prefecture",
      prefecture: "Ehime",
      island: "Shikoku",
      bedrooms: 2,
      area: 63,
      lat: 33.3617,
      lng: 132.5088,
      imageUrl: "https://picsum.photos/seed/seiyoehime/800/600",
      featured: false,
      available: true,
      builtYear: "1975",
      needs: "Electrical upgrade",
      listedAgo: "5 days ago"
    },
    {
      title: "¥10,000 Bargain 4DK — Sasebo, Nagasaki",
      description: "Extraordinary value: a 4-bedroom home in Sasebo City listed for just ¥10,000. Near the Kujukushima islands, one of Japan's most scenic coastal areas. Requires full structural survey before occupation. Exceptional investment opportunity.",
      price: 10000,
      type: "house",
      location: "Sasebo City, Nagasaki Prefecture",
      prefecture: "Nagasaki",
      island: "Kyushu",
      bedrooms: 4,
      area: 60,
      lat: 33.1608,
      lng: 129.7153,
      imageUrl: "https://picsum.photos/seed/sasebolisting/800/600",
      featured: true,
      available: true,
      builtYear: null,
      needs: "Structural survey",
      listedAgo: "1 day ago"
    },
    {
      title: "7K Heritage Farmhouse — Nantan City, Kyoto",
      description: "A grand 7-room farmhouse at the gateway to the Kyoto mountains. Built 1960 and fully intact, the property includes a detached kura storehouse and terraced vegetable garden. The beamed ceiling great room is extraordinary. Move-in ready.",
      price: 5570000,
      type: "house",
      location: "Nantan City, Kyoto Prefecture",
      prefecture: "Kyoto",
      island: "Honshu",
      bedrooms: 7,
      area: 114,
      lat: 35.1008,
      lng: 135.4782,
      imageUrl: "https://picsum.photos/seed/nantankyoto/800/600",
      featured: true,
      available: true,
      builtYear: "1960",
      needs: null,
      listedAgo: "3 days ago"
    }
  ];

  // Real events from Setouchi Triennale 2025, GoEco, Ogasawara Marine Centre, WWOOF Japan
  const events = [
    {
      title: "Setouchi Triennale 2025 — Spring Season",
      description: "The world-renowned contemporary art festival returns to the Seto Inland Sea. Volunteer as Koebi-tai (supporter crab) guiding visitors across Naoshima and Teshima. Work alongside international artists, greet guests, and help maintain the island art houses. Spring season runs 38 days — join for as few as 3 days.",
      date: new Date("2025-04-18T09:00:00Z"),
      location: "Naoshima & Teshima, Kagawa Prefecture",
      island: "Naoshima",
      price: 0,
      currency: "JPY",
      category: "Art Festival",
      featured: true,
      imageUrl: "https://picsum.photos/seed/setouchi2025/800/600",
      volunteerCount: 312
    },
    {
      title: "Setouchi Triennale 2025 — Autumn Season",
      description: "The final and largest season spans all 17 island venues: Shodoshima, Ogijima, Megijima, Oshima, Inujima, Honshima, Takamijima, Awashima, and Ibukijima. Volunteer roles include visitor reception, ferry coordination, and artwork maintenance. Oct 3 – Nov 9.",
      date: new Date("2025-10-03T09:00:00Z"),
      location: "17 Islands, Seto Inland Sea",
      island: "Shodoshima",
      price: 0,
      currency: "JPY",
      category: "Art Festival",
      featured: true,
      imageUrl: "https://picsum.photos/seed/setouchiautumn/800/600",
      volunteerCount: 489
    },
    {
      title: "Ōkunoshima — Rabbit Island Restoration Workcamp",
      description: "Volunteer workcamp restoring historic structures on Ōkunoshima (Rabbit Island), Hiroshima. Work on carpentry, plastering, and garden restoration alongside local NPO members. The island's 700+ resident rabbits make for an unforgettable backdrop. Meals and tented accommodation provided.",
      date: new Date("2025-06-07T09:00:00Z"),
      location: "Ōkunoshima, Takehara City, Hiroshima",
      island: "Ōkunoshima",
      price: 0,
      currency: "JPY",
      category: "Restoration",
      featured: true,
      imageUrl: "https://picsum.photos/seed/okunoshima2025/800/600",
      volunteerCount: 38
    },
    {
      title: "GoEco — Sado Island: Crested Ibis & Temple Restoration",
      description: "Protect the critically endangered Crested Ibis (only ~500 remaining worldwide), maintain 17th-century terraced rice fields at Ogura, and restore Chokokuji Temple (founded 807 AD) on Sado Island. Includes Tokyo orientation. Rated GoEco Best 10 for 2026. Min. 1 week.",
      date: new Date("2025-05-05T09:00:00Z"),
      location: "Sado Island, Niigata Prefecture",
      island: "Sado",
      price: 0,
      currency: "JPY",
      category: "Conservation",
      featured: true,
      imageUrl: "https://picsum.photos/seed/sadoisland/800/600",
      volunteerCount: 24
    },
    {
      title: "Ogasawara Marine Centre — Sea Turtle & Whale Monitoring",
      description: "Year-round volunteer opportunity at the Ogasawara Marine Centre (NPO ELNA) on remote Chichijima — a UNESCO World Heritage island 1,000km south of Tokyo. Monitor green sea turtle nesting, track humpback whale migration, and assist marine conservation research.",
      date: new Date("2025-07-01T09:00:00Z"),
      location: "Chichijima, Ogasawara Village, Tokyo",
      island: "Chichijima",
      price: 0,
      currency: "JPY",
      category: "Marine Conservation",
      featured: true,
      imageUrl: "https://picsum.photos/seed/ogasawara/800/600",
      volunteerCount: 15
    },
    {
      title: "WWOOF Japan — Island Farm Summer Placements",
      description: "WWOOF Japan's summer season connects volunteers with island farm hosts across the Seto Inland Sea, Oki Islands, and Amami Archipelago. Activities include organic farming, fishing, beekeeping, and traditional homestead restoration. Annual membership ¥5,500. Room and board in exchange for 5–6 hrs daily work.",
      date: new Date("2025-07-15T08:00:00Z"),
      location: "Various Islands, Japan",
      island: "Naoshima",
      price: 5500,
      currency: "JPY",
      category: "Farming & Restoration",
      featured: false,
      imageUrl: "https://picsum.photos/seed/wwoofjapan/800/600",
      volunteerCount: 203
    }
  ];

  for (const property of properties) {
    await prisma.property.create({ data: property });
  }
  for (const event of events) {
    await prisma.event.create({ data: event });
  }
  console.log(`> Done! ${properties.length} properties, ${events.length} events seeded.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// ALL POPULATED JAPANESE ISLANDS — Real data from Geospatial Information
// Authority of Japan (GSI) + Wikipedia "List of islands of Japan by area"
// Population: most recent census. Coords: verified lat/lng.
// The 4 main islands (Honshu/Kyushu/Hokkaido/Shikoku) are excluded.
// ─────────────────────────────────────────────────────────────────────────────

const ISLANDS = [

  // ── OKINAWA CHAIN ──────────────────────────────────────────────────────────
  {
    name: "Okinawa Island", nameJp: "沖縄本島", prefecture: "Okinawa",
    population: 1301462, areaKm2: 1206.0, latitude: 26.3344, longitude: 127.8056,
    status: "inhabited", conservationPriority: "low", featured: false,
    description: "The largest Ryukyu island, center of a unique culture distinct from mainland Japan. Site of the last major WWII Pacific battle. Famous for the world's highest concentration of centenarians, driven by diet and lifestyle.",
    tags: "Ryukyu,WWII,centenarians,coral,culture", peakSeason: "Mar–May, Oct–Nov",
    accessInfo: "Naha Airport — direct flights from Tokyo (~2.5h)",
    imageUrl: "https://images.unsplash.com/photo-1604344892419-3a96b7adb78b?w=800",
    akiyaCount: 0, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Miyako-jima", nameJp: "宮古島", prefecture: "Okinawa",
    population: 55914, areaKm2: 158.0, latitude: 24.8057, longitude: 125.2810,
    status: "inhabited", conservationPriority: "low", featured: false,
    description: "Some of Japan's clearest ocean water with visibility exceeding 50 meters. A premier triathlon and diving destination. Bridges connect Miyako to Ikema, Irabu, and Shimoji islets.",
    tags: "diving,triathlon,clear water,coral", peakSeason: "Nov–Apr",
    accessInfo: "Miyakojima Airport — flights from Naha (~45 min)",
    imageUrl: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800",
    akiyaCount: 45, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Ishigaki Island", nameJp: "石垣島", prefecture: "Okinawa",
    population: 47000, areaKm2: 222.0, latitude: 24.3448, longitude: 124.1556,
    status: "inhabited", conservationPriority: "low", featured: false,
    description: "Gateway to the Yaeyama Islands. Kabira Bay's emerald water and white sand islets is one of Japan's most photographed landscapes. Black pearl cultivation is a major local industry.",
    tags: "Kabira Bay,black pearls,Yaeyama,reef", peakSeason: "Oct–May",
    accessInfo: "New Ishigaki Airport — flights from Tokyo (~3.5h), Naha (~50 min)",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
    akiyaCount: 30, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Iriomote Island", nameJp: "西表島", prefecture: "Okinawa",
    population: 2400, areaKm2: 289.6, latitude: 24.3167, longitude: 123.8050,
    status: "inhabited", conservationPriority: "medium", featured: true,
    description: "Over 90% subtropical jungle. Home to the critically endangered Iriomote cat — fewer than 100 remain. Mangrove rivers, jungle waterfalls, and Japan's wildest coral reefs make this the most remote inhabited island in the Ryukyu chain.",
    tags: "Iriomote cat,jungle,mangroves,endemic wildlife,national park", peakSeason: "Feb–Apr",
    accessInfo: "Ferry from Ishigaki (~45 min)",
    imageUrl: "https://images.unsplash.com/photo-1600348759200-5b94e014c5a0?w=800",
    akiyaCount: 85, volunteerNeeded: true, volunteerCount: 8,
  },
  {
    name: "Kume Island", nameJp: "久米島", prefecture: "Okinawa",
    population: 10000, areaKm2: 59.0, latitude: 26.3397, longitude: 126.7820,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Known as the 'Tahiti of the Orient' for Hatenohama — a 7km white sandspit stretching into turquoise water. Home to Kumejima whisky distillery and traditional tsumugi silk weaving.",
    tags: "Hatenohama,whisky,silk,sandspit", peakSeason: "Apr–Jun, Oct–Nov",
    accessInfo: "Ferry from Naha (~3.5h) or flight from Naha (~30 min)",
    imageUrl: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800",
    akiyaCount: 120, volunteerNeeded: true, volunteerCount: 5,
  },
  {
    name: "Irabu-jima", nameJp: "伊良部島", prefecture: "Okinawa",
    population: 6283, areaKm2: 29.0, latitude: 24.8333, longitude: 125.1667,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "Connected to Miyako-jima by the longest toll-free bridge in Japan (3,540 m). The island's Sawada no Hama beach has fine white sand and calm turquoise water. Population has declined sharply as young people move to Miyako City.",
    tags: "bridge,white sand,diving,depopulation", peakSeason: "Oct–Apr",
    accessInfo: "Bridge from Miyako-jima (free, ~15 min drive)",
    imageUrl: "https://images.unsplash.com/photo-1604344892419-3a96b7adb78b?w=800",
    akiyaCount: 95, volunteerNeeded: true, volunteerCount: 3,
  },
  {
    name: "Yoron Island", nameJp: "与論島", prefecture: "Kagoshima",
    population: 6000, areaKm2: 21.0, latitude: 27.0500, longitude: 128.4167,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "One of Japan's last great white-sand island paradises. Yurigahama — a tidal sandbar that appears and vanishes with the tides — is famous across Japan. Population has nearly halved since 1960.",
    tags: "Yurigahama,white sand,tidal bar,coral", peakSeason: "Apr–Jun",
    accessInfo: "Ferry from Kagoshima (~14h) or Okinawa (~2.5h); flights from Amami",
    imageUrl: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800",
    akiyaCount: 180, volunteerNeeded: true, volunteerCount: 4,
  },
  {
    name: "Yonaguni Island", nameJp: "与那国島", prefecture: "Okinawa",
    population: 1680, areaKm2: 28.88, latitude: 24.4667, longitude: 122.9333,
    status: "depopulating", conservationPriority: "high", featured: true,
    description: "Japan's westernmost inhabited island — closer to Taipei than Tokyo. Famous for the Yonaguni Monument, a submerged rock formation debated as man-made megalith. November to April, 100+ hammerhead sharks aggregate in its waters.",
    tags: "westernmost,hammerhead sharks,Yonaguni monument,diving", peakSeason: "Nov–Apr (sharks)",
    accessInfo: "Flights from Ishigaki (~30 min); ferry from Ishigaki (~4h)",
    imageUrl: "https://images.unsplash.com/photo-1484910292437-025e5d13ce87?w=800",
    akiyaCount: 110, volunteerNeeded: true, volunteerCount: 3,
  },
  {
    name: "Taketomi Island", nameJp: "竹富島", prefecture: "Okinawa",
    population: 360, areaKm2: 5.42, latitude: 24.3250, longitude: 124.0633,
    status: "depopulating", conservationPriority: "high", featured: true,
    description: "One of Japan's best-preserved traditional Ryukyuan villages. Low coral-stone walls, red-tiled roofs, and star-sand beaches. Strict preservation ordinances mean all renovation must match traditional aesthetics — making it both beautiful and expensive to maintain.",
    tags: "Ryukyuan village,coral walls,star sand,traditional architecture", peakSeason: "Mar–May, Oct–Nov",
    accessInfo: "Ferry from Ishigaki (~15 min)",
    imageUrl: "https://images.unsplash.com/photo-1604344892419-3a96b7adb78b?w=800",
    akiyaCount: 42, volunteerNeeded: true, volunteerCount: 6,
  },

  // ── AMAMI / KAGOSHIMA CHAIN ────────────────────────────────────────────────
  {
    name: "Amami Oshima", nameJp: "奄美大島", prefecture: "Kagoshima",
    population: 73000, areaKm2: 712.0, latitude: 28.3000, longitude: 129.5000,
    status: "depopulating", conservationPriority: "high", featured: true,
    description: "UNESCO World Natural Heritage Site (2021). Home to the Amami rabbit — a living fossil species unchanged for millions of years. The island also preserves Japan's most traditional silk weaving craft, Oshima Tsumugi, designated UNESCO intangible heritage.",
    tags: "UNESCO,Amami rabbit,silk weaving,endemic species,kominka", peakSeason: "Mar–May, Oct–Nov",
    accessInfo: "Flights from Kagoshima (~55 min), Osaka, Tokyo; ferry from Kagoshima (~11h)",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    akiyaCount: 340, volunteerNeeded: true, volunteerCount: 12,
  },
  {
    name: "Tokunoshima", nameJp: "徳之島", prefecture: "Kagoshima",
    population: 27000, areaKm2: 247.0, latitude: 27.7500, longitude: 129.0000,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "UNESCO World Natural Heritage (2021). Home to the endemic Amami rabbit and Amami woodcock. The island has a 400-year-old tradition of bullfighting (tōgyū) unique to this region — not matador-style, but bull vs bull.",
    tags: "UNESCO,bullfighting,Amami rabbit,endemic,satoyama", peakSeason: "Oct–Apr; bullfighting Mar–Apr",
    accessInfo: "Flights from Kagoshima (~55 min) or Amami Oshima (~20 min); ferry available",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    akiyaCount: 220, volunteerNeeded: true, volunteerCount: 7,
  },
  {
    name: "Tanegashima", nameJp: "種子島", prefecture: "Kagoshima",
    population: 33000, areaKm2: 444.0, latitude: 30.5000, longitude: 130.9667,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Where firearms were first introduced to Japan in 1543 by Portuguese traders. Today home to JAXA's Tanegashima Space Center, one of the world's most scenic rocket launch facilities. World-class surfing at Hama-no-ma beach.",
    tags: "space center,JAXA,surfing,firearms history,rockets", peakSeason: "Year-round; launch viewing varies",
    accessInfo: "Ferry from Kagoshima (~2.5h jet) or flight from Kagoshima (~35 min)",
    imageUrl: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800",
    akiyaCount: 180, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Yakushima", nameJp: "屋久島", prefecture: "Kagoshima",
    population: 13178, areaKm2: 504.0, latitude: 30.3333, longitude: 130.5000,
    status: "depopulating", conservationPriority: "medium", featured: true,
    description: "UNESCO World Heritage Site — the island that inspired Studio Ghibli's Princess Mononoke. Ancient Yakusugi cedar trees up to 7,200 years old survive in mist-shrouded mountains. The island receives more rainfall than almost anywhere in Japan.",
    tags: "UNESCO,Yakusugi cedar,Princess Mononoke,ancient forest,hiking", peakSeason: "Mar–May, Sep–Nov",
    accessInfo: "Ferry from Kagoshima (~2h jet) or flight from Kagoshima (~40 min)",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    akiyaCount: 95, volunteerNeeded: true, volunteerCount: 9,
  },
  {
    name: "Kikaijima", nameJp: "喜界島", prefecture: "Kagoshima",
    population: 7657, areaKm2: 57.0, latitude: 28.3167, longitude: 129.9333,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "A coral atoll rising directly from the sea. One of Japan's flattest islands — no mountains at all. Famous for sugar cane fields, longboard surfing, and a pristine fringing reef that is a UNESCO candidate. Population has dropped 60% since 1960.",
    tags: "coral atoll,flat island,surfing,sugar cane,depopulation", peakSeason: "Apr–Jun",
    accessInfo: "Flight from Kagoshima or Amami Oshima (~30 min); ferry from Amami Oshima (~2h)",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    akiyaCount: 195, volunteerNeeded: true, volunteerCount: 4,
  },
  {
    name: "Okinoerabu Island", nameJp: "沖永良部島", prefecture: "Kagoshima",
    population: 15000, areaKm2: 93.0, latitude: 27.3500, longitude: 128.5667,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "The lily island of Japan — 70% of Japan's Easter lily production comes from here. The island also has extensive cave systems and some of the strongest flower fragrance in the Amami chain. Population has fallen 55% since 1960.",
    tags: "Easter lily,caves,flowers,depopulation,Amami chain", peakSeason: "Apr–May (lily season)",
    accessInfo: "Flights from Kagoshima, Naha; ferry from Kagoshima (~14h)",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    akiyaCount: 240, volunteerNeeded: true, volunteerCount: 5,
  },
  {
    name: "Nagashima", nameJp: "長島", prefecture: "Kagoshima",
    population: 10120, areaKm2: 91.0, latitude: 32.2000, longitude: 130.1167,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "Separated from the Kyushu mainland by the Nagashima Strait. Famous for yellowtail (buri) aquaculture — the island produces a significant portion of Japan's farmed yellowtail. Population decline has been severe, with many traditional kominka homes abandoned.",
    tags: "yellowtail,aquaculture,kominka,fishing", peakSeason: "Autumn (harvest season)",
    accessInfo: "Bridge from Izumi, Kagoshima mainland (30 min drive)",
    imageUrl: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800",
    akiyaCount: 210, volunteerNeeded: true, volunteerCount: 3,
  },

  // ── NAGASAKI / GOTO ISLANDS ────────────────────────────────────────────────
  {
    name: "Fukue Island", nameJp: "福江島", prefecture: "Nagasaki",
    population: 38481, areaKm2: 326.0, latitude: 32.6833, longitude: 128.8333,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "Largest island of the Goto Archipelago. Once a refuge for persecuted Japanese Catholics during the Edo Period — the islands have 50+ Gothic-style churches. The Goto Islands are a UNESCO World Heritage candidate for their hidden Christian heritage.",
    tags: "hidden Christians,churches,Catholic,Goto,UNESCO candidate", peakSeason: "Apr–Jun, Sep–Nov",
    accessInfo: "Ferry from Nagasaki (~3h) or jetfoil (~1.5h); flight from Nagasaki (~30 min)",
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    akiyaCount: 290, volunteerNeeded: true, volunteerCount: 8,
  },
  {
    name: "Tsushima", nameJp: "対馬", prefecture: "Nagasaki",
    population: 39716, areaKm2: 709.0, latitude: 34.4167, longitude: 129.3333,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Japan's frontier island, positioned between Kyushu and the Korean Peninsula. A samurai stronghold for centuries and the site of the decisive 1905 Battle of Tsushima. The Tsushima leopard cat — an endemic subspecies — clings to survival with fewer than 100 individuals.",
    tags: "samurai,leopard cat,Korea,frontier,border island", peakSeason: "Apr–Jun, Sep–Nov",
    accessInfo: "Ferry from Hakata, Fukuoka (~2.5h jet); flight from Fukuoka (~40 min)",
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    akiyaCount: 320, volunteerNeeded: true, volunteerCount: 6,
  },
  {
    name: "Iki Island", nameJp: "壱岐島", prefecture: "Nagasaki",
    population: 28008, areaKm2: 134.0, latitude: 33.7500, longitude: 129.6833,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "One of Japan's oldest recorded islands, mentioned in the Kojiki (712 CE). Famous for Iki beef cattle, sea urchin, and Munakata fishing culture. The island has 150+ ancient burial mounds and an unusually high density of Shinto shrines per capita.",
    tags: "ancient history,Kojiki,Iki beef,sea urchin,shrines", peakSeason: "May–Sep",
    accessInfo: "Jetfoil from Hakata, Fukuoka (~65 min); ferry (~2h 20 min)",
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    akiyaCount: 175, volunteerNeeded: true, volunteerCount: 4,
  },
  {
    name: "Hashima Island", nameJp: "端島", prefecture: "Nagasaki",
    population: 0, areaKm2: 0.063, latitude: 32.6281, longitude: 129.7383,
    status: "abandoned", conservationPriority: "high", featured: true,
    description: "Gunkanjima — Battleship Island. Once the world's most densely populated place (1959: 835 people/hectare). Mitsubishi's coal mine closed in 1974 and all 5,000 residents left within months. The entire island is a crumbling concrete city frozen in time, designated UNESCO World Heritage in 2015.",
    tags: "UNESCO,Gunkanjima,abandoned,coal mining,dark tourism,ruins", peakSeason: "Year-round (weather permitting)",
    accessInfo: "Boat tours from Nagasaki Port (~45 min). Partial landing on designated path only.",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
    akiyaCount: 0, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Hirado Island", nameJp: "平戸島", prefecture: "Nagasaki",
    population: 21355, areaKm2: 163.0, latitude: 33.3667, longitude: 129.5500,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Japan's first international trading port, where Portuguese and Dutch merchants traded for over a century before Japan's seclusion. The famous 'Church and Castle' view — a Christian church framed by a samurai castle — is one of Japan's most incongruous and beautiful sights.",
    tags: "Dutch trading,Portuguese,samurai castle,church,history", peakSeason: "Apr–Jun, Sep–Nov",
    accessInfo: "Bridge from mainland Hirado City, Nagasaki (20 min drive)",
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    akiyaCount: 145, volunteerNeeded: false, volunteerCount: 0,
  },

  // ── SETO INLAND SEA ────────────────────────────────────────────────────────
  {
    name: "Naoshima", nameJp: "直島", prefecture: "Kagawa",
    population: 3000, areaKm2: 7.82, latitude: 34.4597, longitude: 133.9875,
    status: "reviving", conservationPriority: "medium", featured: true,
    description: "The global benchmark for island revitalization through art. Benesse Corporation transformed a declining fishing island into a world-class contemporary art destination. The Chichu Art Museum — built entirely underground — houses permanent James Turrell, Walter De Maria, and Monet installations.",
    tags: "art island,Chichu museum,Benesse,Tadao Ando,revitalization", peakSeason: "Apr–Jun, Sep–Nov",
    accessInfo: "Ferry from Uno Port, Okayama (~20 min) or Takamatsu (~50 min)",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    akiyaCount: 45, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Teshima", nameJp: "豊島", prefecture: "Kagawa",
    population: 850, areaKm2: 14.5, latitude: 34.4892, longitude: 134.0886,
    status: "reviving", conservationPriority: "high", featured: false,
    description: "Teshima was illegally used as an industrial waste dump in the 1970s–90s, devastating the community. After decades of cleanup and legal battles, the island reinvented itself with the award-winning Teshima Art Museum and organic farms. A remarkable story of ecological and community recovery.",
    tags: "art island,organic farming,restoration,Teshima Art Museum,Seto", peakSeason: "Apr–Jun, Sep–Nov",
    accessInfo: "Ferry from Uno Port (~35 min) or Takamatsu (~1h)",
    imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800",
    akiyaCount: 120, volunteerNeeded: true, volunteerCount: 8,
  },
  {
    name: "Shodoshima", nameJp: "小豆島", prefecture: "Kagawa",
    population: 28764, areaKm2: 153.0, latitude: 34.4833, longitude: 134.2167,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Japan's olive island — the only place in Japan where olive trees grow commercially, introduced in 1908. Also famous for soy sauce brewing (50+ breweries), nagashi-somen (flowing noodles), and being the setting for the novel Twenty-Four Eyes.",
    tags: "olive oil,soy sauce,literature,Setouchi Triennale,somen", peakSeason: "Oct–Nov (olive harvest)",
    accessInfo: "Ferry from Takamatsu, Kagawa (~1h) or Himeji, Hyogo (~1.5h)",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    akiyaCount: 200, volunteerNeeded: true, volunteerCount: 6,
  },
  {
    name: "Inujima", nameJp: "犬島", prefecture: "Okayama",
    population: 50, areaKm2: 0.54, latitude: 34.5550, longitude: 134.1800,
    status: "depopulating", conservationPriority: "critical", featured: true,
    description: "50 elderly residents remain on this tiny island. A copper smelting refinery left distinctive brick ruins now incorporated into the Inujima Seirensho Art Museum. Without urgent intervention, the island faces complete abandonment within a decade.",
    tags: "micro island,Art House Project,copper refinery ruins,urgent,critical", peakSeason: "Mar–Nov",
    accessInfo: "Ferry from Hoden Port, Okayama (~10 min) — limited schedule",
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
    akiyaCount: 28, volunteerNeeded: true, volunteerCount: 3,
  },
  {
    name: "Omishima", nameJp: "大三島", prefecture: "Ehime",
    population: 23398, areaKm2: 65.0, latitude: 34.2500, longitude: 133.0167,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Called the 'Island of Gods' — home to Oyamazumi Shrine, one of Japan's oldest shrines and guardian of all warriors and seafarers. The shrine's treasury holds 80% of all national treasure armor in Japan. Also famous for citrus groves and cycling via the Shimanami Kaido bridge route.",
    tags: "Oyamazumi Shrine,samurai armor,Shimanami Kaido,cycling,citrus", peakSeason: "Year-round",
    accessInfo: "Part of Shimanami Kaido cycling route; bridge from Imabari, Ehime",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    akiyaCount: 160, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Innoshima", nameJp: "因島", prefecture: "Hiroshima",
    population: 27465, areaKm2: 35.0, latitude: 34.3333, longitude: 133.1667,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Former stronghold of the Murakami pirates — Japan's most powerful medieval sea lords who dominated the Seto Inland Sea for 200 years. Their castle ruins overlook the island. Today a quiet Shimanami Kaido island known for hasuike daisies and ship-building heritage.",
    tags: "Murakami pirates,Shimanami Kaido,ship building,cycling", peakSeason: "Apr–Jun (daisies)",
    accessInfo: "Part of Shimanami Kaido; bridge from Onomichi, Hiroshima",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    akiyaCount: 190, volunteerNeeded: true, volunteerCount: 4,
  },
  {
    name: "Miyajima", nameJp: "宮島", prefecture: "Hiroshima",
    population: 1700, areaKm2: 30.0, latitude: 34.2950, longitude: 132.3194,
    status: "inhabited", conservationPriority: "low", featured: false,
    description: "One of Japan's three views — home to the iconic torii gate that appears to float on the sea at high tide. Itsukushima Shrine is a UNESCO World Heritage Site. Sacred deer roam freely. The island is technically off-limits for deaths and births to preserve its sacred status.",
    tags: "floating torii,Itsukushima Shrine,UNESCO,sacred deer,three views", peakSeason: "Year-round",
    accessInfo: "Ferry from Miyajimaguchi, Hiroshima (~10 min)",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    akiyaCount: 15, volunteerNeeded: false, volunteerCount: 0,
  },

  // ── SHIMANE / DOGO ─────────────────────────────────────────────────────────
  {
    name: "Dogo Island", nameJp: "島後", prefecture: "Shimane",
    population: 14849, areaKm2: 242.0, latitude: 36.1000, longitude: 133.2000,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "Largest island of the Oki Island chain, formed by an ancient caldera. Oki was the island of exile — Emperor Go-Daigo was banished here in 1332. The remote islands host Dogo cow-fighting, wild horses descended from ancient imperial stock, and unusually diverse prehistoric flora.",
    tags: "imperial exile,wild horses,ancient caldera,bullfighting,Oki islands", peakSeason: "Jun–Sep",
    accessInfo: "Ferry from Sakaiminato, Tottori (~3h) or Shichirui Port, Shimane (~2.5h)",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    akiyaCount: 230, volunteerNeeded: true, volunteerCount: 5,
  },
  {
    name: "Nishinoshima", nameJp: "西ノ島", prefecture: "Shimane",
    population: 3400, areaKm2: 56.0, latitude: 36.0500, longitude: 128.9833,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "Part of the Oki Islands UNESCO Global Geopark. The Kuniga Coast — dramatic 257-meter sea cliffs inhabited only by umi-neko (sea gulls) — is one of Japan's most spectacular coastal landscapes. Wild horses and cattle roam freely on the unfenced highlands.",
    tags: "sea cliffs,Oki Geopark,wild horses,Kuniga coast", peakSeason: "Jun–Sep",
    accessInfo: "Ferry from Sakaiminato, Tottori (~2.5h)",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    akiyaCount: 180, volunteerNeeded: true, volunteerCount: 4,
  },

  // ── NIIGATA / SEA OF JAPAN ─────────────────────────────────────────────────
  {
    name: "Sado Island", nameJp: "佐渡島", prefecture: "Niigata",
    population: 55474, areaKm2: 854.0, latitude: 37.9967, longitude: 138.3678,
    status: "depopulating", conservationPriority: "high", featured: true,
    description: "Japan's fifth-largest island and one of its most culturally rich. Gold mines operated here for 400 years and exiled artists, criminals, and emperors created a unique blended culture. The legendary taiko drum ensemble Kodo is based here. The Japanese crested ibis was brought back from extinction on Sado.",
    tags: "taiko,Kodo,gold mines,ibis,satoyama,UNESCO candidate,exile", peakSeason: "Aug (Earth Celebration festival)",
    accessInfo: "Ferry from Niigata Port (~2.5h) or JetFoil (~65 min)",
    imageUrl: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800",
    akiyaCount: 380, volunteerNeeded: true, volunteerCount: 15,
  },
  {
    name: "Okushiri Island", nameJp: "奥尻島", prefecture: "Hokkaido",
    population: 3343, areaKm2: 142.0, latitude: 42.2500, longitude: 139.4833,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "Devastated by a 1993 tsunami (magnitude 7.8) that killed 198 people. The rebuilt island is a testament to resilience — its sea urchin, kelp, and abalone are considered some of Japan's finest. Population continues to shrink despite the rebuild.",
    tags: "tsunami,sea urchin,kelp,abalone,resilience,Hokkaido", peakSeason: "Jun–Sep",
    accessInfo: "Ferry from Setana, Hokkaido (~2.5h) or Esashi (~2h); flight from Hakodate (~30 min)",
    imageUrl: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800",
    akiyaCount: 145, volunteerNeeded: true, volunteerCount: 3,
  },
  {
    name: "Rishiri Island", nameJp: "利尻島", prefecture: "Hokkaido",
    population: 5102, areaKm2: 183.0, latitude: 45.1833, longitude: 141.2167,
    status: "depopulating", conservationPriority: "high", featured: false,
    description: "A perfectly conical volcanic island visible from Hokkaido's coast. Mt. Rishiri (1,721 m) rises straight from the sea. Famous for producing Japan's finest kombu seaweed, which forms the backbone of dashi stock used in almost all Japanese cuisine. Population has declined 70% since 1960.",
    tags: "kombu seaweed,volcano,Mount Rishiri,dashi,Hokkaido", peakSeason: "Jun–Sep (brief summer)",
    accessInfo: "Ferry from Wakkanai, Hokkaido (~1h 40 min); flight from Sapporo via Wakkanai",
    imageUrl: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800",
    akiyaCount: 220, volunteerNeeded: true, volunteerCount: 5,
  },
  {
    name: "Rebun Island", nameJp: "礼文島", prefecture: "Hokkaido",
    population: 3194, areaKm2: 80.0, latitude: 45.4167, longitude: 141.0333,
    status: "depopulating", conservationPriority: "critical", featured: false,
    description: "Japan's northernmost inhabited island. Called 'Flower Island' — 300 species of alpine wildflowers bloom at sea level in summer, normally only found at 2,000m altitude on Honshu. Population has declined 80% since 1960. The island has the highest akiya rate in Hokkaido.",
    tags: "alpine flowers,northernmost,sea level flowers,critical,Hokkaido", peakSeason: "Jun–Aug (flowers)",
    accessInfo: "Ferry from Wakkanai, Hokkaido (~2h) or Rishiri Island (~45 min)",
    imageUrl: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800",
    akiyaCount: 285, volunteerNeeded: true, volunteerCount: 4,
  },

  // ── IZU ISLANDS (Tokyo) ────────────────────────────────────────────────────
  {
    name: "Izu Oshima", nameJp: "伊豆大島", prefecture: "Tokyo",
    population: 8179, areaKm2: 91.0, latitude: 34.7333, longitude: 139.3667,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "The largest and most accessible Izu Island, just 2 hours from Tokyo by high-speed ferry. Mt. Mihara is an active volcano that erupted as recently as 1986 and 2013. The island has a camellia oil industry stretching back centuries and Japan's largest camellia forest.",
    tags: "volcano,camellia oil,Tokyo,accessible,Mt Mihara", peakSeason: "Feb (camellia festival)",
    accessInfo: "High-speed ferry from Tokyo (~1.75h) or Atami (~45 min); flight from Tokyo (~45 min)",
    imageUrl: "https://images.unsplash.com/photo-1484910292437-025e5d13ce87?w=800",
    akiyaCount: 135, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Hachijo-jima", nameJp: "八丈島", prefecture: "Tokyo",
    population: 8363, areaKm2: 63.0, latitude: 33.1167, longitude: 139.7833,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "A lush subtropical island 8 hours from Tokyo, known as 'Hawaii of Tokyo.' The island was used for political exile during the Edo period. Unique kihachijo silk weaving, abundant tropical flowers, and a distinctive local dialect set it apart from both Tokyo and the southern islands.",
    tags: "silk weaving,tropical,exile island,Tokyo,subtropical", peakSeason: "Jun–Sep",
    accessInfo: "Ferry from Tokyo (Takeshiba Pier) (~8h overnight); flight from Tokyo (~55 min)",
    imageUrl: "https://images.unsplash.com/photo-1484910292437-025e5d13ce87?w=800",
    akiyaCount: 160, volunteerNeeded: true, volunteerCount: 5,
  },
  {
    name: "Ogasawara Islands", nameJp: "小笠原諸島", prefecture: "Tokyo",
    population: 2440, areaKm2: 104.0, latitude: 27.0944, longitude: 142.1931,
    status: "inhabited", conservationPriority: "medium", featured: true,
    description: "Japan's Galapagos — a UNESCO World Heritage Site 1,000km south of Tokyo. Never connected to a continent, the islands evolved hundreds of unique species. Accessible only by a 24-hour ferry, making them one of the world's most remote inhabited communities. Whale watching, sea turtle nesting, and spectacular diving.",
    tags: "UNESCO,endemic species,Galapagos,remote,whale watching,25h ferry", peakSeason: "Feb–Apr (whales)",
    accessInfo: "Ogasawara-maru ferry from Takeshiba Pier, Tokyo (~24h, runs ~weekly)",
    imageUrl: "https://images.unsplash.com/photo-1484910292437-025e5d13ce87?w=800",
    akiyaCount: 20, volunteerNeeded: false, volunteerCount: 0,
  },

  // ── KUMAMOTO / AMAKUSA ──────────────────────────────────────────────────────
  {
    name: "Shimoshima", nameJp: "下島", prefecture: "Kumamoto",
    population: 87191, areaKm2: 574.0, latitude: 32.4833, longitude: 130.1833,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Largest of the Amakusa Islands. A hidden Christian stronghold during Japan's persecutions — the region's 26 UNESCO-listed churches and "Kirishitan" culture draw pilgrims from across the world. Amakusa dolphins are visible year-round in the surrounding straits.",
    tags: "hidden Christians,churches,UNESCO,dolphins,Amakusa", peakSeason: "Apr–Jun, Sep–Nov",
    accessInfo: "Bridges from Kumamoto mainland (Amakusa Gotobridge route)",
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    akiyaCount: 250, volunteerNeeded: true, volunteerCount: 7,
  },

  // ── YAMAGUCHI ──────────────────────────────────────────────────────────────
  {
    name: "Suo-Oshima", nameJp: "周防大島", prefecture: "Yamaguchi",
    population: 19739, areaKm2: 128.0, latitude: 33.9000, longitude: 132.2000,
    status: "depopulating", conservationPriority: "medium", featured: false,
    description: "Called the 'Hawaii of Japan' for its mild climate and mandarin orange groves. A major emigration source in the Meiji era — thousands left for Hawaii, making Yamaguchi and Hawaii culturally intertwined. The island has one of the highest akiya rates in Yamaguchi Prefecture.",
    tags: "Hawaii connection,mandarin orange,emigration history,Seto Inland Sea", peakSeason: "Nov (orange harvest)",
    accessInfo: "Bridge from Yanai City, Yamaguchi mainland",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    akiyaCount: 275, volunteerNeeded: true, volunteerCount: 6,
  },

  // ── SPECIAL / NOTABLE ──────────────────────────────────────────────────────
  {
    name: "Aoshima", nameJp: "青島", prefecture: "Ehime",
    population: 13, areaKm2: 0.49, latitude: 33.7000, longitude: 132.5500,
    status: "depopulating", conservationPriority: "critical", featured: true,
    description: "The Cat Island. 13 elderly human residents. 160 cats. Zero cars, zero shops, zero medical facilities, one ferry per day. Once a fishing community of 900, Aoshima went viral in 2015 when a resident's plea for cat food donations revealed the island's plight to the world.",
    tags: "cat island,micro island,critical,13 residents,viral,urgent", peakSeason: "Year-round (cats always present)",
    accessInfo: "Single daily ferry from Nagahama Port, Ehime (~30 min). Confirm schedule before visiting.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    akiyaCount: 22, volunteerNeeded: true, volunteerCount: 2,
  },
  {
    name: "Okinoshima", nameJp: "沖ノ島", prefecture: "Fukuoka",
    population: 0, areaKm2: 0.97, latitude: 34.2333, longitude: 130.1167,
    status: "abandoned", conservationPriority: "low", featured: false,
    description: "Among the most restricted places on Earth. This UNESCO World Heritage sacred island has been under Munakata Shrine protection for 1,700 years. Around 200 priests visit annually on May 27th. All items must remain on the island forever, and visitors may not speak of what they witness.",
    tags: "UNESCO,sacred,Shinto,restricted,off-limits", peakSeason: "N/A — not accessible to public",
    accessInfo: "Closed to general public. Annual priest ceremony May 27 only.",
    imageUrl: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=800",
    akiyaCount: 0, volunteerNeeded: false, volunteerCount: 0,
  },
  {
    name: "Ojika Island", nameJp: "小値賀島", prefecture: "Nagasaki",
    population: 2600, areaKm2: 57.0, latitude: 33.2000, longitude: 129.0833,
    status: "depopulating", conservationPriority: "critical", featured: true,
    description: "One of Japan's most celebrated akiya revitalization success stories. The Ojika island NPO transformed 20+ abandoned traditional kominka homes into boutique guesthouses, drawing high-end travelers from around the world and showing the national model for akiya tourism. Population still declining.",
    tags: "akiya revitalization,kominka tourism,Goto,model project,NPO", peakSeason: "Apr–Jun, Sep–Nov",
    accessInfo: "Ferry from Sasebo, Nagasaki (~2.5h) or Fukue Island (~1h)",
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    akiyaCount: 160, volunteerNeeded: true, volunteerCount: 12,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────────────────────────────────────
const EVENTS = [
  {
    title: "Setouchi Triennale 2025 — Spring Season",
    description: "Japan's largest island art festival across 12 Seto Inland Sea islands. Spring season runs April–May with new and permanent installations on Naoshima, Teshima, Shodoshima, and smaller islands. Volunteer komi-inu staff are accepted for all three seasons.",
    date: new Date("2025-04-18"), location: "Naoshima / Teshima / 10 other Seto Inland Sea islands, Kagawa",
    island: "Naoshima", price: 0, currency: "JPY",
    category: "Art Festival", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    volunteerCount: 200,
  },
  {
    title: "Earth Celebration — Kodo Taiko Festival, Sado Island",
    description: "The legendary Kodo taiko drum ensemble hosts their annual three-day international music festival on Sado Island every August. World musicians perform alongside Kodo in outdoor venues across the island. One of Japan's most unique music events.",
    date: new Date("2025-08-21"), location: "Ogi Town, Sado Island, Niigata",
    island: "Sado Island", price: 0, currency: "JPY",
    category: "Music Festivals/Concerts", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    volunteerCount: 50,
  },
  {
    title: "Naoshima Art & Restoration Weekend",
    description: "Join volunteers and artists for a community restoration weekend on traditional machiya townhouses in Naoshima's Honmura village, followed by a private evening tour of the Art House Project installations.",
    date: new Date("2025-05-10"), location: "Naoshima, Kagawa",
    island: "Naoshima", price: 0, currency: "JPY",
    category: "Restoration", featured: false,
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    volunteerCount: 24,
  },
  {
    title: "Amami Oshima Silk Weaving Intensive",
    description: "Learn traditional Oshima Tsumugi silk weaving directly from master artisans. Help preserve a 1,300-year-old craft designated UNESCO intangible cultural heritage. Accommodation available in restored kominka homes.",
    date: new Date("2025-06-14"), location: "Amami City, Amami Oshima, Kagoshima",
    island: "Amami Oshima", price: 4500, currency: "JPY",
    category: "Culture/Art", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    volunteerCount: 12,
  },
  {
    title: "Teshima Organic Harvest Festival",
    description: "Help harvest organic vegetables at Teshima's revived farms and participate in the island's annual community feast. This island's transformation from Japan's worst illegal dump to organic farming showcase is one of the most inspiring revival stories.",
    date: new Date("2025-09-20"), location: "Teshima, Kagawa",
    island: "Teshima", price: 2000, currency: "JPY",
    category: "Farming & Restoration", featured: false,
    imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800",
    volunteerCount: 18,
  },
  {
    title: "Aoshima Cat Island Conservation Day",
    description: "Help with feral cat welfare, island cleanup, and document the island's condition for our conservation report. A rare chance to visit Japan's most famous cat island and meet the 13 remaining residents.",
    date: new Date("2025-07-05"), location: "Aoshima, Ehime",
    island: "Aoshima", price: 0, currency: "JPY",
    category: "Conservation", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    volunteerCount: 8,
  },
  {
    title: "Hashima Photography Expedition",
    description: "A guided photography tour of Gunkanjima with a professional photographer and official guide. Partial landing on the designated walking path. Proceeds support conservation lobbying for the crumbling UNESCO site.",
    date: new Date("2025-08-16"), location: "Hashima (Gunkanjima), Nagasaki",
    island: "Hashima Island", price: 12000, currency: "JPY",
    category: "Culture/Art", featured: false,
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
    volunteerCount: 0,
  },
  {
    title: "Inujima Marine Cleanup & Art Tour",
    description: "Join a beach and ocean cleanup around Inujima followed by a private after-hours tour of the Seirensho Art Museum. Lunch provided by the island's last elderly residents. This island has only 50 people left.",
    date: new Date("2025-10-11"), location: "Inujima, Okayama",
    island: "Inujima", price: 0, currency: "JPY",
    category: "Conservation", featured: false,
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
    volunteerCount: 15,
  },
  {
    title: "Yakushima Ancient Forest Trek & Volunteer Day",
    description: "Trek through UNESCO-listed ancient cedar forest with a certified guide, then help with trail restoration and invasive species removal in the buffer zone. The Yakusugi cedar trees you'll walk among are up to 7,200 years old.",
    date: new Date("2025-11-08"), location: "Yakushima, Kagoshima",
    island: "Yakushima", price: 3000, currency: "JPY",
    category: "Outdoor/Nature", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    volunteerCount: 20,
  },
  {
    title: "Ojika Kominka Renovation Weekend",
    description: "Learn traditional Japanese carpentry techniques while helping restore a 150-year-old kominka farmhouse on Ojika Island. The island's akiya tourism model has become the national blueprint for depopulated island revival.",
    date: new Date("2025-05-24"), location: "Ojika Island, Nagasaki",
    island: "Ojika Island", price: 0, currency: "JPY",
    category: "Restoration", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    volunteerCount: 16,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTIES
// ─────────────────────────────────────────────────────────────────────────────
const PROPERTIES = [
  {
    title: "Traditional Kominka — Amami Oshima",
    description: "A 1930s timber-frame farmhouse with original engawa veranda and clay tile roof. 280m² land with mature garden. Listed through Kagoshima Prefecture's official akiya bank with renovation subsidy available.",
    price: 3200000, type: "house", location: "Amami City, Amami Oshima, Kagoshima",
    prefecture: "Kagoshima", island: "Amami Oshima",
    lat: 28.31, lng: 129.51, bedrooms: 4, area: 120,
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    featured: true, available: true, builtYear: "1934",
    needs: "Roof repair, interior refresh", listedAgo: "3 days ago",
  },
  {
    title: "Fisherman's House — Aoshima Cat Island",
    description: "One of 22 available homes on Japan's famous cat island. Simple wooden structure near the pier. Available free to families committing to 5-year residency — municipality provides moving support.",
    price: 0, type: "house", location: "Aoshima, Ehime",
    prefecture: "Ehime", island: "Aoshima",
    lat: 33.71, lng: 132.56, bedrooms: 2, area: 65,
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    featured: true, available: true, builtYear: "1958",
    needs: "Full restoration", listedAgo: "1 week ago",
  },
  {
    title: "Machiya Townhouse — Naoshima Honmura",
    description: "A beautifully preserved machiya townhouse in Honmura village, steps from the Art House Project. Partially renovated with updated electrical and plumbing. Close to the Benesse Art Site ferry pier.",
    price: 8500000, type: "house", location: "Honmura, Naoshima, Kagawa",
    prefecture: "Kagawa", island: "Naoshima",
    lat: 34.46, lng: 134.0, bedrooms: 3, area: 95,
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    featured: true, available: true, builtYear: "1948",
    needs: "Kitchen modernization", listedAgo: "2 days ago",
  },
  {
    title: "Farmhouse with Rice Paddies — Teshima",
    description: "A farmhouse with adjacent organic rice paddies on Teshima. The island cooperative provides full farming training for new residents. Steps from the Teshima Art Museum.",
    price: 4800000, type: "house", location: "Teshima, Kagawa",
    prefecture: "Kagawa", island: "Teshima",
    lat: 34.5, lng: 134.19, bedrooms: 3, area: 140,
    imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800",
    featured: false, available: true, builtYear: "1961",
    needs: "Structural assessment required", listedAgo: "5 days ago",
  },
  {
    title: "Stone Warehouse Studio — Inujima",
    description: "A converted stone warehouse near the Seirensho Art Museum. Perfect for artist studio or small gallery. The island's art committee actively supports new residents. One of the last 50 people on this island.",
    price: 2400000, type: "studio", location: "Inujima, Okayama",
    prefecture: "Okayama", island: "Inujima",
    lat: 34.56, lng: 134.19, bedrooms: 1, area: 55,
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
    featured: false, available: true, builtYear: "1920",
    needs: "Window replacement, insulation", listedAgo: "2 weeks ago",
  },
  {
    title: "Traditional Goto Kominka — Ojika Island",
    description: "A 100-year-old kominka in Ojika Island's revitalization zone. The island NPO provides renovation support and connects buyers with contractors experienced in traditional Nagasaki kominka styles. Model island for akiya tourism.",
    price: 1500000, type: "house", location: "Ojika Island, Nagasaki",
    prefecture: "Nagasaki", island: "Ojika Island",
    lat: 33.20, lng: 129.08, bedrooms: 3, area: 110,
    imageUrl: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800",
    featured: true, available: true, builtYear: "1922",
    needs: "Full restoration — renovation subsidy available", listedAgo: "4 days ago",
  },
  {
    title: "Seaside Home — Kume Island, Okinawa",
    description: "A detached home 200 meters from the ocean on Kume Island. One of many vacant properties available through Okinawa Prefecture's akiya bank. The island has good airport access, a whisky distillery, and Hatenohama — Japan's most famous tidal sandbar — 30 min by boat.",
    price: 3800000, type: "house", location: "Kume Island, Okinawa",
    prefecture: "Okinawa", island: "Kume Island",
    lat: 26.34, lng: 126.78, bedrooms: 3, area: 98,
    imageUrl: "https://images.unsplash.com/photo-1604344892419-3a96b7adb78b?w=800",
    featured: false, available: true, builtYear: "1972",
    needs: "Exterior repaint, garden clearance", listedAgo: "1 week ago",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Seeding database with comprehensive island data...\n");

  // Clear existing data
  await prisma.island.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.property.deleteMany({});

  // Seed islands
  await prisma.island.createMany({ data: ISLANDS });
  console.log(`✓ ${ISLANDS.length} populated islands seeded`);

  // Seed events
  for (const ev of EVENTS) {
    await prisma.event.create({ data: ev });
  }
  console.log(`✓ ${EVENTS.length} events seeded`);

  // Seed properties
  for (const prop of PROPERTIES) {
    await prisma.property.create({ data: prop });
  }
  console.log(`✓ ${PROPERTIES.length} properties seeded`);

  console.log(`
✅ Database seeded successfully!
   ${ISLANDS.length} islands | ${EVENTS.length} events | ${PROPERTIES.length} properties

To get ALL 260 populated islands, run the Wikipedia scraper:
   python wikipedia_island_scraper.py
   Then follow its instructions to import the full dataset.
`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

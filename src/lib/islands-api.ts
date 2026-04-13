const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface Island {
  id: string | number;
  name: string;
  name_japanese?: string;
  description?: string;
  image_url?: string;
  location?: string;
  prefecture?: string;
  population?: number;
  area?: number;
  lat?: number;
  lng?: number;
  status?: "active" | "abandoned" | "partially_abandoned" | "reviving";
  volunteer_url?: string;
  tourism_url?: string;
  akiya_count?: number;
  name_jp?: string;
}

export interface IslandDetail extends Island {
  history?: string;
  ecology?: string;
  revival_efforts?: string;
  tags?: string[];
}

// Fallback data for when the API is unavailable
const FALLBACK_ISLANDS: Island[] = [
  {
    id: 1,
    name: "Takaikamishima Island",
    name_japanese: "高井神島",
    description:
      "A small island in Hiroshima Prefecture's Seto Inland Sea, once home to a fishing community and now famous for its abandoned Manga School — a remarkable symbol of rural cultural preservation.",
    image_url:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
    prefecture: "Hiroshima",
    location: "Seto Inland Sea",
    population: 12,
    area: 0.62,
    lat: 34.112,
    lng: 132.921,
    status: "reviving",
    volunteer_url: "https://www.nice1.gr.jp/",
  },
  {
    id: 2,
    name: "Gunkanjima",
    name_japanese: "軍艦島",
    description:
      "Hashima Island — once the world's most densely populated place per unit area — is now a haunting UNESCO World Heritage Site, its concrete apartment blocks slowly surrendering to salt air and time.",
    image_url:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    prefecture: "Nagasaki",
    location: "East China Sea",
    population: 0,
    area: 0.063,
    lat: 32.628,
    lng: 129.738,
    status: "abandoned",
    tourism_url: "https://www.gunkanjima-tour.jp/en/",
  },
  {
    id: 3,
    name: "Aoshima Island",
    name_japanese: "青島",
    description:
      "Known as 'Cat Island', Aoshima hosts roughly 120 feral cats and only a handful of elderly residents. Its gentle decline mirrors hundreds of remote Japanese islands quietly fading into the sea.",
    image_url:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    prefecture: "Ehime",
    location: "Seto Inland Sea",
    population: 6,
    area: 0.49,
    lat: 33.864,
    lng: 132.985,
    status: "partially_abandoned",
  },
  {
    id: 4,
    name: "Naoshima Island",
    name_japanese: "直島",
    description:
      "A celebrated example of what abandoned Japanese islands can become. Naoshima transformed from a near-empty fishing village into an internationally recognized contemporary art destination through the Benesse Art Site project.",
    image_url:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    prefecture: "Kagawa",
    location: "Seto Inland Sea",
    population: 3140,
    area: 7.82,
    lat: 34.459,
    lng: 133.997,
    status: "reviving",
    tourism_url: "https://benesse-artsite.jp/en/",
  },
  {
    id: 5,
    name: "Teshima Island",
    name_japanese: "豊島",
    description:
      "Once blighted by illegal industrial waste dumping, Teshima has undergone a remarkable environmental and cultural revival — its terraced rice paddies restored, and the Teshima Art Museum now drawing visitors from across the world.",
    image_url:
      "https://images.unsplash.com/photo-1490750967868-88df5691cc53?w=800&q=80",
    prefecture: "Kagawa",
    location: "Seto Inland Sea",
    population: 820,
    area: 14.54,
    lat: 34.493,
    lng: 134.178,
    status: "reviving",
    tourism_url: "https://benesse-artsite.jp/en/teshima/",
  },
  {
    id: 6,
    name: "Inujima Island",
    name_japanese: "犬島",
    description:
      "A tiny island with a copper refinery ruin at its heart. Inujima's industrial ghost has been repurposed into an art space, threading together environmental history, architecture, and Japan's industrial heritage.",
    image_url:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    prefecture: "Okayama",
    location: "Seto Inland Sea",
    population: 47,
    area: 0.54,
    lat: 34.672,
    lng: 134.185,
    status: "reviving",
    tourism_url: "https://benesse-artsite.jp/en/inujima/",
  },
];

export async function getIslands(): Promise<Island[]> {
  try {
    const res = await fetch(`${API_BASE}/islands/islands/`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.warn(`Islands API returned ${res.status}, using fallback data`);
      return FALLBACK_ISLANDS;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : FALLBACK_ISLANDS;
  } catch (error) {
    console.warn("Islands API unavailable, using fallback data:", error);
    return FALLBACK_ISLANDS;
  }
}

export async function getIslandById(
  id: string | number
): Promise<IslandDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/islands/islands/${id}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export function getStatusLabel(status?: string): string {
  const map: Record<string, string> = {
    active: "Inhabited",
    abandoned: "Abandoned",
    partially_abandoned: "Declining",
    reviving: "Reviving",
  };
  return map[status ?? ""] ?? "Unknown";
}

export function getStatusColor(status?: string): string {
  const map: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-800",
    abandoned: "bg-stone-200 text-stone-600",
    partially_abandoned: "bg-amber-100 text-amber-800",
    reviving: "bg-primary/10 text-primary",
  };
  return map[status ?? ""] ?? "bg-gray-100 text-gray-600";
}

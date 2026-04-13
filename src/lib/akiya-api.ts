const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface AkiyaListing {
  id: string | number;
  title: string;
  location: string;
  prefecture: string;
  price?: number;
  price_label?: string;
  area_sqm?: number;
  bedrooms?: number;
  year_built?: number;
  image_url?: string;
  description?: string;
  features?: string[];
  source_url?: string;
  source_name?: string;
  contact_url?: string;
  listing_date?: string;
  status?: "available" | "under_review" | "taken";
}

const FALLBACK_AKIYA: AkiyaListing[] = [
  {
    id: 1,
    title: "Farmhouse near Onomichi Port",
    location: "Onomichi, Hiroshima Prefecture",
    prefecture: "Hiroshima",
    price: 3500000,
    price_label: "¥3,500,000",
    area_sqm: 110,
    bedrooms: 4,
    year_built: 1962,
    image_url:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
    description:
      "Traditional wooden farmhouse with south-facing garden, 10 minutes from Onomichi port. Some renovation required. Ideal for remote workers or small-scale farming.",
    features: ["Sea view", "Garden", "Storehouse", "Wood structure"],
    source_url: "https://akiyainaka.com/",
    source_name: "Akiya & Inaka",
    status: "available",
  },
  {
    id: 2,
    title: "Fisherman's House on Innoshima",
    location: "Innoshima, Onomichi, Hiroshima",
    prefecture: "Hiroshima",
    price: 0,
    price_label: "Free transfer",
    area_sqm: 78,
    bedrooms: 3,
    year_built: 1958,
    image_url:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    description:
      "Charming two-storey fisherman's cottage with direct sea access. Free transfer available to buyers willing to renovate and use as primary residence.",
    features: ["Seafront", "Free transfer", "Historic character"],
    source_url: "https://www.homes.co.jp/",
    source_name: "HOMES.co.jp",
    status: "available",
  },
  {
    id: 3,
    title: "Kominka Townhouse in Tomonoura",
    location: "Tomonoura, Fukuyama, Hiroshima",
    prefecture: "Hiroshima",
    price: 6800000,
    price_label: "¥6,800,000",
    area_sqm: 145,
    bedrooms: 5,
    year_built: 1940,
    image_url:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    description:
      "Beautifully preserved kominka in the historic port town of Tomonoura — one of the oldest harbours in Japan, said to have inspired scenes in Miyazaki's 'Ponyo'.",
    features: [
      "Kominka style",
      "Historic port town",
      "Partially renovated",
      "Machiya",
    ],
    source_url: "https://akiyainaka.com/",
    source_name: "Akiya & Inaka",
    status: "available",
  },
  {
    id: 4,
    title: "Island Retreat on Ohshima",
    location: "Ōshima, Yamaguchi Prefecture",
    prefecture: "Yamaguchi",
    price: 1200000,
    price_label: "¥1,200,000",
    area_sqm: 92,
    bedrooms: 3,
    year_built: 1971,
    image_url:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    description:
      "Quiet single-storey house on Ōshima island, accessible by bridge from Yanai. Mandarin orange orchards nearby. Strong community revitalization programme underway.",
    features: ["Island setting", "Bridge access", "Orchard views", "Quiet"],
    source_url: "https://www.at-home.co.jp/",
    source_name: "At Home",
    status: "available",
  },
  {
    id: 5,
    title: "Abandoned School Renovation Opportunity",
    location: "Mihara, Hiroshima Prefecture",
    prefecture: "Hiroshima",
    price: 500000,
    price_label: "¥500,000",
    area_sqm: 420,
    bedrooms: 0,
    year_built: 1953,
    image_url:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    description:
      "Former elementary school with large grounds, gym, and multiple classrooms. Exceptional opportunity for community spaces, artist residencies, or eco-tourism ventures.",
    features: ["Former school", "Large site", "Gymnasium", "Community zoning"],
    source_url: "https://nponippon.org/",
    source_name: "NPO Nippon",
    status: "under_review",
  },
  {
    id: 6,
    title: "Farmhouse with Rice Fields, Imabari",
    location: "Imabari, Ehime Prefecture",
    prefecture: "Ehime",
    price: 4200000,
    price_label: "¥4,200,000",
    area_sqm: 160,
    bedrooms: 5,
    year_built: 1965,
    image_url:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    description:
      "Spacious wooden farmhouse with 2,000㎡ of rice paddies included. Located near the Shimanami Kaidō cycling route. Local community groups actively welcoming new residents.",
    features: [
      "Rice paddies included",
      "Shimanami Kaidō",
      "Cycling route",
      "Active community",
    ],
    source_url: "https://akiyainaka.com/",
    source_name: "Akiya & Inaka",
    status: "available",
  },
];

export async function getAkiyaListings(): Promise<AkiyaListing[]> {
  try {
    const res = await fetch(`${API_BASE}/akiya/listings/`, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      return FALLBACK_AKIYA;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : FALLBACK_AKIYA;
  } catch {
    return FALLBACK_AKIYA;
  }
}

export function formatPrice(listing: AkiyaListing): string {
  if (listing.price_label) return listing.price_label;
  if (!listing.price || listing.price === 0) return "Free transfer";
  return `¥${listing.price.toLocaleString("ja-JP")}`;
}

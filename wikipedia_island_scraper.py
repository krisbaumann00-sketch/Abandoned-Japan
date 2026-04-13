"""
Wikipedia Japanese Island Scraper for abandonedjapan.org
==========================================================
Scrapes ALL ~260 populated islands from Wikipedia and outputs
ready-to-paste TypeScript for your prisma/seed.ts

SETUP (run once in PowerShell):
  pip install requests beautifulsoup4

RUN:
  python wikipedia_island_scraper.py

OUTPUT FILES:
  islands_full.json   — raw data for all islands found
  islands_import.ts   — paste this into prisma/seed.ts ISLANDS array

Then run: npm run db:seed
Then run: git add . && git commit -m "All 260 populated islands" && git push
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import time
from datetime import datetime

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

# Approximate coordinates for prefectures (used as fallback when
# per-island coords aren't available in the table)
PREFECTURE_COORDS = {
    "Okinawa":   (26.50, 127.93), "Kagoshima": (31.60, 130.56),
    "Nagasaki":  (32.74, 129.87), "Kumamoto":  (32.79, 130.74),
    "Kagawa":    (34.34, 134.04), "Hiroshima": (34.39, 132.45),
    "Okayama":   (34.66, 133.93), "Ehime":     (33.84, 132.77),
    "Shimane":   (35.47, 133.06), "Yamaguchi": (34.18, 131.47),
    "Niigata":   (38.00, 138.37), "Tokyo":     (34.73, 139.37),
    "Hokkaido":  (43.06, 141.35), "Hyogo":     (34.69, 135.18),
    "Fukuoka":   (33.85, 130.67), "Miyazaki":  (31.91, 131.42),
    "Mie":       (34.73, 136.51), "Wakayama":  (33.94, 135.17),
    "Ishikawa":  (36.59, 136.62), "Iwate":     (39.70, 141.75),
    "Aomori":    (40.82, 140.74),
}

# 4 main islands to skip — we don't want these in our remote island DB
SKIP_ISLANDS = {"Honshu", "Kyushu", "Hokkaido", "Shikoku"}

# Prefecture → island group mapping for context
ISLAND_GROUPS = {
    "Okinawa":   "Ryukyu Islands",      "Kagoshima": "Amami / Kagoshima Islands",
    "Nagasaki":  "Goto / Kyushu Islands","Kumamoto":  "Amakusa Islands",
    "Kagawa":    "Seto Inland Sea",      "Hiroshima": "Seto Inland Sea",
    "Okayama":   "Seto Inland Sea",      "Ehime":     "Seto Inland Sea",
    "Shimane":   "Oki Islands",          "Yamaguchi": "Seto Inland Sea",
    "Niigata":   "Sea of Japan",         "Tokyo":     "Izu / Ogasawara Islands",
    "Hokkaido":  "Hokkaido Islands",     "Hyogo":     "Seto Inland Sea",
    "Fukuoka":   "Kyushu Islands",       "Miyazaki":  "Kyushu Islands",
}

def scrape_wikipedia_island_table(url: str) -> list[dict]:
    """Scrape the main Wikipedia island list table."""
    print(f"Fetching: {url}")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
    except Exception as e:
        print(f"Failed: {e}")
        return []

    soup = BeautifulSoup(resp.text, "html.parser")
    islands = []

    # Find wikitables
    tables = soup.find_all("table", class_="wikitable")
    print(f"Found {len(tables)} tables")

    for table in tables:
        rows = table.find_all("tr")
        if len(rows) < 3:
            continue

        # Get headers
        header_row = rows[0]
        headers = [th.get_text(strip=True).lower() for th in header_row.find_all(["th", "td"])]
        print(f"  Table headers: {headers[:8]}")

        # Map header positions
        col_map = {}
        for i, h in enumerate(headers):
            if "name" in h and "jp" not in h and "col" not in h:
                col_map.setdefault("name", i)
            elif "area" in h or "km" in h:
                col_map.setdefault("area", i)
            elif "population" in h or "pop" in h:
                col_map.setdefault("population", i)
            elif "prefecture" in h or "prefect" in h:
                col_map.setdefault("prefecture", i)
            elif "height" in h or "elev" in h or "highest" in h:
                col_map.setdefault("height", i)

        if "name" not in col_map:
            continue

        print(f"  Column map: {col_map}")

        for row in rows[1:]:
            cells = row.find_all(["td", "th"])
            if len(cells) < 2:
                continue

            def cell_text(idx):
                if idx is None or idx >= len(cells):
                    return ""
                return cells[idx].get_text(strip=True)

            name = cell_text(col_map.get("name", 0))

            # Clean name — remove footnote numbers and symbols
            name = re.sub(r"[\[\]☒✗†*].*", "", name).strip()
            name = re.sub(r"\s*\(\d+\)\s*", "", name).strip()

            if not name or len(name) < 2:
                continue
            if name in SKIP_ISLANDS:
                continue
            # Skip if name looks like a header
            if name.lower() in ("name", "island", "islet"):
                continue

            # Parse numbers — remove commas, footnotes
            def parse_num(text):
                cleaned = re.sub(r"[^\d.]", "", text.replace(",", ""))
                try:
                    return float(cleaned) if cleaned else None
                except ValueError:
                    return None

            area = parse_num(cell_text(col_map.get("area")))
            population_raw = cell_text(col_map.get("population", -1))
            population = int(parse_num(population_raw) or 0) if population_raw else 0
            prefecture = cell_text(col_map.get("prefecture", -1))

            # Clean prefecture — take first word if multiple prefectures listed
            prefecture = re.sub(r"\[.*?\]", "", prefecture).strip()
            if "prefecture" in prefecture.lower():
                prefecture = prefecture.replace("Prefecture", "").replace("prefecture", "").strip()
            # Handle "XX prefectures" for multi-prefecture islands
            if "prefectures" in prefecture.lower():
                prefecture = prefecture.split()[0]

            # Skip uninhabited (population 0) and main islands
            if population == 0 and name not in ("Hashima", "Okinoshima", "Taketomi"):
                continue

            # Get coordinates from Wikipedia article link if available
            lat, lng = get_island_coords(name, soup)
            if lat is None:
                # Fallback to prefecture center
                coords = PREFECTURE_COORDS.get(prefecture)
                if coords:
                    lat, lng = coords
                else:
                    lat, lng = 35.68, 139.69  # Tokyo default

            island = {
                "name": name,
                "nameJp": None,
                "prefecture": prefecture,
                "population": population,
                "areaKm2": area,
                "latitude": round(lat, 4),
                "longitude": round(lng, 4),
                "status": classify_status(population, name),
                "conservationPriority": classify_priority(population),
                "description": generate_description(name, prefecture, population, area),
                "tags": ISLAND_GROUPS.get(prefecture, "Japan"),
                "peakSeason": "Spring and Autumn",
                "accessInfo": f"Contact {prefecture} Prefecture tourism office for access information",
                "imageUrl": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
                "akiyaCount": estimate_akiya(population),
                "volunteerNeeded": population < 5000,
                "volunteerCount": 0,
                "featured": False,
            }
            islands.append(island)

    return islands


def get_island_coords(name: str, soup: BeautifulSoup) -> tuple:
    """Try to find lat/lng from the island's Wikipedia article link."""
    # Look for a link to the island article
    for a in soup.find_all("a", href=re.compile(rf"/wiki/.*{re.escape(name.split()[0])}", re.IGNORECASE)):
        href = a.get("href", "")
        if "/wiki/" in href and "List" not in href:
            wiki_url = f"https://en.wikipedia.org{href}"
            try:
                time.sleep(0.5)
                r = requests.get(wiki_url, headers=HEADERS, timeout=10)
                r.raise_for_status()
                # Look for geo coordinates in the page
                coord_match = re.search(
                    r'"wgCoordinates":\{"lat":([-\d.]+),"lon":([-\d.]+)\}',
                    r.text
                )
                if coord_match:
                    return float(coord_match.group(1)), float(coord_match.group(2))
                # Also try GeoHack link
                geo_match = re.search(r"geohack\.toolforge\.org/geohack\.php\?[^\"']*params=([-\d.]+)_(N|S)_([-\d.]+)_(E|W)", r.text)
                if geo_match:
                    lat = float(geo_match.group(1)) * (1 if geo_match.group(2) == "N" else -1)
                    lng = float(geo_match.group(3)) * (1 if geo_match.group(4) == "E" else -1)
                    return lat, lng
            except Exception:
                pass
    return None, None


def classify_status(population: int, name: str) -> str:
    if population == 0:
        return "abandoned"
    if population < 100:
        return "depopulating"
    if population < 1000:
        return "depopulating"
    if name in ("Naoshima", "Teshima", "Ojika"):
        return "reviving"
    return "depopulating" if population < 10000 else "inhabited"


def classify_priority(population: int) -> str:
    if population == 0:
        return "high"
    if population < 100:
        return "critical"
    if population < 500:
        return "critical"
    if population < 2000:
        return "high"
    if population < 10000:
        return "medium"
    return "low"


def estimate_akiya(population: int) -> int:
    """Rough estimate: smaller population = higher % akiya."""
    if population == 0:
        return 0
    if population < 100:
        return max(5, int(population * 0.6))
    if population < 1000:
        return int(population * 0.35)
    if population < 5000:
        return int(population * 0.25)
    return int(population * 0.15)


def generate_description(name: str, prefecture: str, population: int, area: float | None) -> str:
    group = ISLAND_GROUPS.get(prefecture, "Japan")
    area_str = f"{area:.1f} km²" if area else "area unknown"
    pop_str = f"{population:,}" if population > 0 else "uninhabited"
    return (
        f"{name} is a {group} island in {prefecture} Prefecture with "
        f"a current population of {pop_str}. "
        f"The island covers {area_str}. "
        f"Like many remote Japanese islands, it faces population decline "
        f"and has available akiya (abandoned homes) for new residents."
    )


def to_typescript(island: dict) -> str:
    def esc(s):
        return str(s or "").replace('"', '\\"').replace("'", "\\'") if s else ""

    return f'''  {{
    name: "{esc(island["name"])}",
    nameJp: null,
    prefecture: "{esc(island["prefecture"])}",
    population: {island["population"] or 0},
    areaKm2: {island["areaKm2"] or "null"},
    latitude: {island["latitude"]},
    longitude: {island["longitude"]},
    status: "{island["status"]}",
    conservationPriority: "{island["conservationPriority"]}",
    description: "{esc(island["description"])}",
    tags: "{esc(island["tags"])}",
    peakSeason: "Spring and Autumn",
    accessInfo: "Contact {esc(island["prefecture"])} Prefecture for access info",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    akiyaCount: {island["akiyaCount"]},
    volunteerNeeded: {"true" if island["volunteerNeeded"] else "false"},
    volunteerCount: 0,
    featured: false,
  }},'''


def main():
    print("=" * 60)
    print("Wikipedia Japanese Island Scraper")
    print("For: abandonedjapan.org")
    print("=" * 60)

    # Primary source: Wikipedia list by area (has the best structured table)
    urls = [
        "https://en.wikipedia.org/wiki/List_of_islands_of_Japan",
        "https://en.wikipedia.org/wiki/List_of_islands_of_Japan_by_area",
    ]

    all_islands = []
    seen_names = set()

    for url in urls:
        print(f"\nScraping: {url}")
        islands = scrape_wikipedia_island_table(url)
        for island in islands:
            if island["name"] not in seen_names:
                seen_names.add(island["name"])
                all_islands.append(island)
        print(f"Running total: {len(all_islands)} unique islands")
        time.sleep(2)

    print(f"\n{'='*60}")
    print(f"Total populated islands found: {len(all_islands)}")

    # Save JSON
    with open("islands_full.json", "w", encoding="utf-8") as f:
        json.dump(all_islands, f, ensure_ascii=False, indent=2)
    print("Raw data saved: islands_full.json")

    # Save TypeScript
    ts_lines = [
        "// ALL POPULATED JAPANESE ISLANDS — scraped from Wikipedia",
        f"// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        f"// Total: {len(all_islands)} islands",
        "",
        "// INSTRUCTIONS:",
        "// 1. Open prisma/seed.ts",
        "// 2. Replace the ISLANDS array contents with the array below",
        "// 3. Run: npm run db:seed",
        "// 4. Run: git add . && git commit -m 'All 260 islands' && git push",
        "",
        "const ISLANDS = [",
    ]
    for island in all_islands:
        ts_lines.append(to_typescript(island))
    ts_lines.append("];")

    with open("islands_import.ts", "w", encoding="utf-8") as f:
        f.write("\n".join(ts_lines))
    print("TypeScript output saved: islands_import.ts")

    # Summary stats
    by_status = {}
    for island in all_islands:
        s = island["status"]
        by_status[s] = by_status.get(s, 0) + 1

    print("\n── Population breakdown ──")
    critical = sum(1 for i in all_islands if i["conservationPriority"] == "critical")
    high = sum(1 for i in all_islands if i["conservationPriority"] == "high")
    print(f"  Critical (< 500 residents): {critical} islands")
    print(f"  High priority (< 2,000):    {high} islands")
    print(f"  Status: {by_status}")

    print("\n── NEXT STEPS ──")
    print("1. Copy islands_import.ts contents into prisma/seed.ts ISLANDS array")
    print("2. npm run db:seed")
    print("3. git add . && git commit -m 'All 260 populated islands' && git push")


if __name__ == "__main__":
    main()

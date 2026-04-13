"""
iwafu.com Event Scraper for abandonedjapan.org
================================================
Scrapes Japanese festivals and events from iwafu.com and outputs
ready-to-paste TypeScript for your prisma/seed.ts file.

SETUP (run once):
  pip install requests beautifulsoup4

RUN:
  python iwafu_scraper.py

OUTPUT:
  scraped_events.ts  — paste the contents into your prisma/seed.ts EVENTS array
  scraped_events.json — full raw data for reference

The scraper targets events in:
  - Okinawa (islands)
  - Kyushu (Nagasaki, Kagoshima islands)
  - Shikoku
  - Chugoku (Hiroshima/Seto Inland Sea islands)
  - Kansai (Seto Inland Sea, Awaji)

Filters to categories relevant to Abandoned Japan:
  - Festivals/Celebrations
  - Outdoor/Nature
  - Art Festivals/Exhibitions
  - Culture/Art
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import time
from datetime import datetime

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

# iwafu area codes for island-relevant regions
# 7=Chugoku, 8=Shikoku, 9=Kyushu, 10=Okinawa, 5=Kansai (Seto Inland Sea)
AREAS = [5, 7, 8, 9, 10]

# Categories we want (relevant to Abandoned Japan)
RELEVANT_CATEGORIES = {
    "Festivals/Celebrations",
    "Outdoor/Nature",
    "Art Festivals/Exhibitions",
    "Culture/Art",
    "Traditional Performing Arts",
    "Traditional Crafts",
    "Music Festivals/Concerts",
}

# Prefecture → island mapping for context
PREFECTURE_ISLANDS = {
    "Okinawa": "Okinawa Islands",
    "Kagoshima": "Amami / Kagoshima Islands",
    "Nagasaki": "Goto / Nagasaki Islands",
    "Ehime": "Seto Inland Sea",
    "Kagawa": "Seto Inland Sea",
    "Hiroshima": "Seto Inland Sea",
    "Okayama": "Seto Inland Sea",
    "Tokushima": "Shikoku",
    "Kochi": "Shikoku",
    "Fukuoka": "Kyushu",
    "Niigata": "Sado Island",
}


def get_event_ids_from_listing(area: int, page: int = 1) -> list[str]:
    """Get event IDs from the listing page for a given area."""
    url = f"https://www.iwafu.com/en/events?area={area}&page={page}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
    except Exception as e:
        print(f"  Failed to fetch listing area={area} page={page}: {e}")
        return []

    soup = BeautifulSoup(resp.text, "html.parser")
    ids = []

    # Event links follow the pattern /en/events/[number]
    for a in soup.find_all("a", href=re.compile(r"/en/events/\d+")):
        href = a["href"]
        match = re.search(r"/en/events/(\d+)", href)
        if match:
            event_id = match.group(1)
            if event_id not in ids:
                ids.append(event_id)

    return ids


def extract_coords_from_static_map(soup: BeautifulSoup) -> tuple[float, float] | tuple[None, None]:
    """
    iwafu embeds a Google Static Maps image with center=lat,lng in the URL.
    Example: maps.googleapis.com/maps/api/staticmap?center=35.691,139.692&...
    """
    for img in soup.find_all("img"):
        src = img.get("src", "")
        if "maps.googleapis.com/maps/api/staticmap" in src:
            match = re.search(r"center=([-\d.]+),([-\d.]+)", src)
            if match:
                lat = float(match.group(1))
                lng = float(match.group(2))
                return lat, lng
    # Also check <a> tags that wrap the map
    for a in soup.find_all("a", href=re.compile(r"google.com/maps")):
        img = a.find("img")
        if img:
            src = img.get("src", "")
            match = re.search(r"center=([-\d.]+),([-\d.]+)", src)
            if match:
                return float(match.group(1)), float(match.group(2))
    return None, None


def extract_dates(soup: BeautifulSoup) -> tuple[str | None, str | None]:
    """Extract start and end dates from the event page."""
    # Look for date patterns like "April 1 (Wed) to April 7 (Tue), 2026"
    text = soup.get_text()

    # Pattern: "From [Month] [Day] ... to [Month] [Day], [Year]"
    date_pattern = re.search(
        r"From\s+(\w+\s+\d+)[^t]*to\s+(\w+\s+\d+)[^,]*,\s+(\d{4})",
        text, re.IGNORECASE
    )
    if date_pattern:
        start_str = f"{date_pattern.group(1)}, {date_pattern.group(3)}"
        end_str = f"{date_pattern.group(2)}, {date_pattern.group(3)}"
        try:
            start = datetime.strptime(start_str, "%B %d, %Y")
            end = datetime.strptime(end_str, "%B %d, %Y")
            return start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")
        except ValueError:
            pass

    # Fallback: look for date pattern in meta or structured data
    meta_date = soup.find("meta", {"property": "event:start_time"})
    if meta_date:
        return meta_date.get("content", "")[:10], None

    return None, None


def extract_price(soup: BeautifulSoup) -> int:
    """Extract price in JPY. Returns 0 if free."""
    text = soup.get_text()
    price_match = re.search(r"(\d[\d,]+)\s*JPY", text)
    if price_match:
        price_str = price_match.group(1).replace(",", "")
        try:
            return int(price_str)
        except ValueError:
            pass
    if any(word in text.lower() for word in ["free", "no charge", "admission free", "¥0"]):
        return 0
    return 0


def scrape_event(event_id: str) -> dict | None:
    """Scrape a single event detail page."""
    url = f"https://www.iwafu.com/en/events/{event_id}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
    except Exception as e:
        print(f"  Failed to fetch event {event_id}: {e}")
        return None

    soup = BeautifulSoup(resp.text, "html.parser")

    # Skip ended events
    if "this event has ended" in soup.get_text().lower():
        return None

    # Title
    h2 = soup.find("h2")
    title = h2.get_text(strip=True) if h2 else None
    if not title:
        return None

    # Description — first meaningful paragraph after the title
    description = ""
    for p in soup.find_all("p"):
        text = p.get_text(strip=True)
        if len(text) > 80 and "iwafu" not in text.lower():
            description = text
            break
    if not description:
        description = title

    # Dates
    start_date, end_date = extract_dates(soup)
    if not start_date:
        return None  # Skip events with no parseable date

    # Coordinates from embedded Google Static Maps
    lat, lng = extract_coords_from_static_map(soup)

    # Location/address
    location = ""
    for a in soup.find_all("a", href=re.compile(r"google.com/maps")):
        loc_text = a.get_text(strip=True)
        if loc_text and len(loc_text) > 5:
            location = loc_text
            break

    # Prefecture from tags
    prefecture = ""
    for a in soup.find_all("a", href=re.compile(r"prefecture=\d+")):
        pref_text = a.get_text(strip=True).lstrip("#")
        if pref_text and len(pref_text) < 30:
            prefecture = pref_text
            break

    # Category tags
    categories = []
    for a in soup.find_all("a", href=re.compile(r"keyword=")):
        cat = a.get_text(strip=True).lstrip("#")
        if cat:
            categories.append(cat)

    # Check if any relevant category matches
    has_relevant = any(cat in RELEVANT_CATEGORIES for cat in categories)
    if not has_relevant:
        return None

    # Primary image URL
    image_url = None
    for img in soup.find_all("img"):
        src = img.get("src", "")
        if "images.iwafu.com" in src and "staticmap" not in src and "logo" not in src:
            image_url = src
            break

    # Price
    price = extract_price(soup)

    # Nearby station
    station = ""
    station_match = re.search(r"Nearby Station：(.+?)(?:\n|Transportation)", soup.get_text())
    if station_match:
        station = station_match.group(1).strip()

    # Determine island context
    island = PREFECTURE_ISLANDS.get(prefecture, prefecture or "Japan")

    # Primary category for our schema
    primary_category = next(
        (cat for cat in categories if cat in RELEVANT_CATEGORIES),
        categories[0] if categories else "Festival"
    )

    return {
        "id": event_id,
        "title": title,
        "description": description[:500],  # Truncate to 500 chars
        "start_date": start_date,
        "end_date": end_date,
        "location": location or f"{prefecture}, Japan",
        "prefecture": prefecture,
        "island": island,
        "lat": lat,
        "lng": lng,
        "price": price,
        "category": primary_category,
        "categories": categories,
        "imageUrl": image_url,
        "station": station,
        "source_url": url,
    }


def to_typescript(event: dict) -> str:
    """Convert event dict to a TypeScript object for seed.ts."""
    # Escape quotes in strings
    def esc(s):
        if not s:
            return ""
        return str(s).replace('"', '\\"').replace("'", "\\'")

    date_str = event["start_date"]
    desc = esc(event["description"])
    title = esc(event["title"])
    location = esc(event["location"])
    island = esc(event["island"])
    image = event.get("imageUrl") or ""
    category = esc(event["category"])
    price = event.get("price") or 0

    return f'''  {{
    title: "{title}",
    description: "{desc}",
    date: new Date("{date_str}"),
    location: "{location}",
    island: "{island}",
    price: {price},
    currency: "JPY",
    category: "{category}",
    featured: false,
    imageUrl: "{image}",
    volunteerCount: 0,
    // Source: https://www.iwafu.com/en/events/{event["id"]}
  }},'''


def main():
    print("=" * 60)
    print("iwafu.com Scraper for abandonedjapan.org")
    print("=" * 60)

    all_event_ids = []

    # Collect event IDs from island-relevant areas
    for area in AREAS:
        area_name = {5: "Kansai", 7: "Chugoku", 8: "Shikoku", 9: "Kyushu", 10: "Okinawa"}.get(area, str(area))
        print(f"\nScanning {area_name} events (area={area})...")

        for page in range(1, 4):  # Scrape up to 3 pages per area
            ids = get_event_ids_from_listing(area, page)
            if not ids:
                break
            new_ids = [id for id in ids if id not in all_event_ids]
            all_event_ids.extend(new_ids)
            print(f"  Page {page}: found {len(ids)} events ({len(new_ids)} new)")
            time.sleep(1.5)  # Polite delay

    print(f"\nTotal unique event IDs found: {len(all_event_ids)}")
    print("Fetching event details (this takes a minute)...\n")

    scraped = []
    skipped = 0

    for i, event_id in enumerate(all_event_ids):
        print(f"  [{i+1}/{len(all_event_ids)}] Event {event_id}...", end=" ")
        event = scrape_event(event_id)
        if event:
            scraped.append(event)
            print(f"✓  {event['title'][:50]}")
        else:
            skipped += 1
            print("skipped (ended or no relevant category)")
        time.sleep(1.0)  # Polite delay between requests

    print(f"\n{'='*60}")
    print(f"Scraped: {len(scraped)} events")
    print(f"Skipped: {skipped} events")

    # Save raw JSON
    with open("scraped_events.json", "w", encoding="utf-8") as f:
        json.dump(scraped, f, ensure_ascii=False, indent=2)
    print("\nRaw data saved to: scraped_events.json")

    # Save TypeScript output
    ts_lines = [
        "// ── IWAFU SCRAPED EVENTS ──────────────────────────────────────────",
        "// Paste this array into the 'events' variable in prisma/seed.ts",
        "// replacing the existing events array.",
        "// Generated: " + datetime.now().strftime("%Y-%m-%d %H:%M"),
        "",
        "const events = [",
    ]
    for event in scraped:
        ts_lines.append(to_typescript(event))
    ts_lines.append("];")

    with open("scraped_events.ts", "w", encoding="utf-8") as f:
        f.write("\n".join(ts_lines))
    print("TypeScript output saved to: scraped_events.ts")

    # Also print map coordinates summary
    print("\n── Map Pin Coordinates ──────────────────────")
    coords_found = [(e["title"], e["lat"], e["lng"]) for e in scraped if e["lat"] and e["lng"]]
    print(f"{len(coords_found)}/{len(scraped)} events have coordinates")
    for title, lat, lng in coords_found[:10]:
        print(f"  {title[:40]:40s}  {lat:.4f}, {lng:.4f}")

    print("\n── NEXT STEPS ───────────────────────────────")
    print("1. Open scraped_events.ts")
    print("2. Copy the entire 'events' array contents")
    print("3. Open your project: prisma/seed.ts")
    print("4. Replace the existing events array with the scraped one")
    print("5. Run: npm run db:seed")
    print("6. Run: git add . && git commit -m 'Add iwafu events' && git push")
    print("Done! Your live site will show real scraped events.")


if __name__ == "__main__":
    main()

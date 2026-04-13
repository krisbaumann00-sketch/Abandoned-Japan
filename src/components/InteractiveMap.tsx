"use client";
// src/components/InteractiveMap.tsx
// Leaflet.js interactive map - FREE, no API key needed
// Install: npm install leaflet react-leaflet @types/leaflet

import { useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────
interface IslandPin {
  id: number;
  name: string;
  nameJp: string | null;
  prefecture: string | null;
  description: string | null;
  population: number | null;
  latitude: number | null;
  longitude: number | null;
  imageUrl: string | null;
  akiyaCount: number;
  conservationPriority: string | null;
  status: string | null;
}

interface EventPin {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  island: string;
  category: string;
  imageUrl: string | null;
  price: number | null;
}

interface Props {
  islands: IslandPin[];
  events: EventPin[];
}

// ── Popup HTML helpers ───────────────────────────────────────
function islandPopupHtml(island: IslandPin): string {
  const urgentBadge =
    island.conservationPriority === "critical"
      ? `<span style="background:#ef4444;color:white;font-size:10px;padding:1px 6px;border-radius:10px;font-weight:600">Urgent</span>`
      : "";
  const img = island.imageUrl
    ? `<img src="${island.imageUrl}" alt="${island.name}" style="width:100%;height:100px;object-fit:cover;border-radius:6px 6px 0 0;display:block">`
    : "";
  const pop = island.population != null
    ? `<span style="color:#6b7280">👥 ${island.population.toLocaleString()}</span>`
    : "";
  const akiya =
    island.akiyaCount > 0
      ? `<span style="color:#4a8a2a;font-weight:500">🏠 ${island.akiyaCount} akiya</span>`
      : "";

  return `
<div style="width:220px;font-family:system-ui,sans-serif;font-size:13px;line-height:1.4">
  ${img}
  <div style="padding:10px">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
      <strong style="font-size:14px;color:#111">${island.name}</strong>
      ${urgentBadge}
    </div>
    ${island.nameJp ? `<div style="color:#9ca3af;font-size:12px;margin-bottom:4px">${island.nameJp} · ${island.prefecture}</div>` : ""}
    <p style="color:#4b5563;margin:0 0 8px;font-size:12px;line-height:1.5">${(island.description || "").substring(0, 120)}${island.description && island.description.length > 120 ? "…" : ""}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;font-size:11px;margin-bottom:8px">
      ${pop}${akiya}
    </div>
    <a href="/islands/${island.id}" style="display:block;text-align:center;background:#8fbc5a;color:#0d1a0d;padding:5px;border-radius:6px;font-weight:600;font-size:12px;text-decoration:none">
      View Island →
    </a>
  </div>
</div>`;
}

function eventPopupHtml(event: EventPin): string {
  const dateStr = new Date(event.date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
  const priceStr = event.price === 0 || event.price === null ? "Free" : `¥${event.price.toLocaleString()}`;
  const img = event.imageUrl
    ? `<img src="${event.imageUrl}" alt="${event.title}" style="width:100%;height:90px;object-fit:cover;border-radius:6px 6px 0 0;display:block">`
    : "";

  return `
<div style="width:220px;font-family:system-ui,sans-serif;font-size:13px;line-height:1.4">
  ${img}
  <div style="padding:10px">
    <div style="background:#fef3c7;color:#92400e;font-size:10px;padding:1px 6px;border-radius:10px;font-weight:600;display:inline-block;margin-bottom:5px">${event.category}</div>
    <strong style="display:block;font-size:13px;color:#111;margin-bottom:4px;line-height:1.3">${event.title}</strong>
    <p style="color:#4b5563;margin:0 0 6px;font-size:12px;line-height:1.5">${event.description.substring(0, 100)}…</p>
    <div style="font-size:11px;color:#6b7280;margin-bottom:8px">
      <div>📅 ${dateStr}</div>
      <div>📍 ${event.location}</div>
      <div style="color:#059669;font-weight:500">${priceStr}</div>
    </div>
    <a href="/events/${event.id}" style="display:block;text-align:center;background:#f59e0b;color:#0d1a0d;padding:5px;border-radius:6px;font-weight:600;font-size:12px;text-decoration:none">
      View Event →
    </a>
  </div>
</div>`;
}

// ── Main component ───────────────────────────────────────────
export default function InteractiveMap({ islands, events }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<"all" | "islands" | "events">("all");

  useEffect(() => {
    // Dynamically load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Dynamically load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    if (mapInstanceRef.current) return; // Already initialized

    const L = (window as unknown as { L: typeof import("leaflet") }).L;

    // Initialize map centered on Japan
    const map = L.map(mapRef.current, {
      center: [35.5, 136.0],
      zoom: 5,
      zoomControl: true,
    });

    // OpenStreetMap tiles — completely free, no API key
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Custom island marker (green)
    const islandIcon = L.divIcon({
      html: `<div style="background:#8fbc5a;width:14px;height:14px;border-radius:50%;border:2px solid #0d1a0d;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      className: "",
    });

    // Custom urgent island marker (red)
    const urgentIcon = L.divIcon({
      html: `<div style="background:#ef4444;width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.5)"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      className: "",
    });

    // Custom event marker (amber)
    const eventIcon = L.divIcon({
      html: `<div style="background:#f59e0b;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      className: "",
    });

    // Add island markers
    if (filter === "all" || filter === "islands") {
      islands.forEach((island) => {
        if (!island.latitude || !island.longitude) return;
        const icon = island.conservationPriority === "critical" ? urgentIcon : islandIcon;
        L.marker([island.latitude, island.longitude], { icon })
          .bindPopup(islandPopupHtml(island), { maxWidth: 240 })
          .addTo(map);
      });
    }

    // Add event markers
    // For events without stored coords, we skip (they need lat/lng from scraper)
    // Events seeded by scraper will have coords embedded as a comment — future enhancement
    // For now, we show islands that match event locations
    if (filter === "all" || filter === "events") {
      events.forEach((event) => {
        // Find matching island by name for positioning
        const matchIsland = islands.find(
          (isl) => isl.name === event.island || event.island.includes(isl.prefecture || "")
        );
        if (matchIsland?.latitude && matchIsland?.longitude) {
          // Offset slightly so event marker doesn't overlap island marker
          const offsetLat = matchIsland.latitude + (Math.random() - 0.5) * 0.15;
          const offsetLng = matchIsland.longitude + (Math.random() - 0.5) * 0.15;
          L.marker([offsetLat, offsetLng], { icon: eventIcon })
            .bindPopup(eventPopupHtml(event), { maxWidth: 240 })
            .addTo(map);
        }
      });
    }

    mapInstanceRef.current = map;
  }, [loaded, islands, events, filter]);

  // Re-initialize on filter change
  useEffect(() => {
    if (!loaded) return;
    if (mapInstanceRef.current) {
      (mapInstanceRef.current as { remove: () => void }).remove();
      mapInstanceRef.current = null;
    }
    // Trigger re-initialization
    setLoaded(false);
    setTimeout(() => setLoaded(true), 50);
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-full h-full" style={{ minHeight: "600px" }}>
      {/* Filter controls */}
      <div className="absolute top-3 right-3 z-[1000] flex gap-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-[#e0ddd8]">
        {(["all", "islands", "events"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              filter === f
                ? "bg-[#8fbc5a] text-[#0d1a0d]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f === "all" ? "Show All" : f === "islands" ? "🏝 Islands" : "🎌 Events"}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-[#e0ddd8] text-xs space-y-1.5">
        <div className="font-semibold text-[#1a2e1a] mb-1">Legend</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#8fbc5a] border border-[#0d1a0d] inline-block flex-shrink-0" />
          <span className="text-gray-600">Island</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white inline-block flex-shrink-0" />
          <span className="text-gray-600">Urgent / Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-400 border border-white inline-block flex-shrink-0" />
          <span className="text-gray-600">Event</span>
        </div>
        <div className="text-gray-400 text-xs mt-1 border-t pt-1">Click any pin for details</div>
      </div>

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f8f5f0] z-10">
          <div className="text-center">
            <div className="text-3xl mb-3">🗾</div>
            <p className="text-gray-500 text-sm">Loading map…</p>
          </div>
        </div>
      )}

      {/* Map container */}
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: "600px" }} />
    </div>
  );
}

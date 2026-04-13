"use client";

import { useState } from "react";

const MAP_PINS = [
  {
    id: "takaikamishima",
    name: "Takaikamishima Island",
    lat: 34.112,
    lng: 132.921,
    note: "Manga School · Reviving",
    featured: true,
  },
  {
    id: "naoshima",
    name: "Naoshima",
    lat: 34.459,
    lng: 133.997,
    note: "Benesse Art Site",
    featured: false,
  },
  {
    id: "teshima",
    name: "Teshima",
    lat: 34.493,
    lng: 134.178,
    note: "Art Museum · Revived",
    featured: false,
  },
  {
    id: "inujima",
    name: "Inujima",
    lat: 34.672,
    lng: 134.185,
    note: "Copper Refinery Ruins",
    featured: false,
  },
  {
    id: "gunkanjima",
    name: "Gunkanjima",
    lat: 32.628,
    lng: 129.738,
    note: "UNESCO World Heritage",
    featured: false,
  },
];

type ViewMode = "map" | "streetview";

export default function MapSection() {
  const [activePin, setActivePin] = useState(MAP_PINS[0]);
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapSrc = apiKey
    ? viewMode === "map"
      ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(activePin.name + ", Japan")}&zoom=12&maptype=satellite`
      : `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${activePin.lat},${activePin.lng}&heading=0&pitch=5&fov=90`
    : `https://maps.google.com/maps?q=${activePin.lat},${activePin.lng}&z=12&output=embed`;

  return (
    <section id="map" className="py-28 lg:py-36 bg-cream relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label block mb-4">Interactive Map</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight mb-4">
            Navigate the
            <br />
            <em className="italic text-secondary">Seto Inland Sea</em>
          </h2>
          <p className="max-w-xl mx-auto font-sans text-ink/60 leading-relaxed">
            Explore island locations, switch to satellite view, and use Street
            View to walk the harbours and lanes of these fading communities.
          </p>
          {!apiKey && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-sans px-4 py-2 rounded-sm">
              <span>⚠</span>
              <span>
                Add <code className="font-mono bg-amber-100 px-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to .env for full functionality
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Island list */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            <p className="section-label mb-3">Island Pins</p>
            {MAP_PINS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActivePin(pin)}
                className={`text-left p-4 border transition-all duration-200 group ${
                  activePin.id === pin.id
                    ? "bg-primary text-cream border-primary"
                    : "bg-cream border-primary/15 hover:border-primary/40 hover:bg-primary/5 text-ink"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      pin.featured
                        ? "bg-gold"
                        : activePin.id === pin.id
                        ? "bg-cream/60"
                        : "bg-secondary/50"
                    }`}
                  />
                  <div>
                    <p
                      className={`font-sans font-semibold text-sm ${
                        activePin.id === pin.id ? "text-cream" : "text-primary"
                      }`}
                    >
                      {pin.name}
                      {pin.featured && (
                        <span className="ml-2 text-[10px] font-semibold tracking-wider bg-gold/20 text-gold px-1.5 py-0.5 rounded-sm">
                          FEATURED
                        </span>
                      )}
                    </p>
                    <p
                      className={`text-xs font-sans mt-0.5 ${
                        activePin.id === pin.id
                          ? "text-cream/60"
                          : "text-ink/50"
                      }`}
                    >
                      {pin.note}
                    </p>
                    <p
                      className={`text-xs font-mono mt-1 ${
                        activePin.id === pin.id
                          ? "text-cream/40"
                          : "text-ink/30"
                      }`}
                    >
                      {pin.lat.toFixed(3)}°N {pin.lng.toFixed(3)}°E
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            {/* View mode toggle */}
            <div className="flex gap-1 mb-4">
              {(["map", "streetview"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`text-xs font-sans font-semibold tracking-wider uppercase px-5 py-2 transition-all ${
                    viewMode === mode
                      ? "bg-primary text-cream"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {mode === "map" ? "🛰 Satellite Map" : "📸 Street View"}
                </button>
              ))}
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(activePin.name + ", Japan")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs font-sans font-medium text-secondary hover:text-accent transition-colors flex items-center gap-1"
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Map iframe */}
            <div className="map-container relative h-[440px] border border-primary/10">
              <iframe
                src={mapSrc}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${activePin.name}`}
              />
            </div>

            {/* Location info strip */}
            <div className="mt-3 p-4 bg-primary/5 border border-primary/10 flex items-center justify-between">
              <div>
                <p className="font-sans font-semibold text-sm text-primary">
                  {activePin.name}
                </p>
                <p className="font-sans text-xs text-ink/50 mt-0.5">
                  {activePin.note}
                </p>
              </div>
              <p className="font-mono text-xs text-ink/30">
                {activePin.lat}°N, {activePin.lng}°E
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

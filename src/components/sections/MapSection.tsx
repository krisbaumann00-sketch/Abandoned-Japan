"use client";
import { useState } from "react";

const islands = [
  { name: "Naoshima", x: 52, y: 45, properties: 12, color: "#43523d" },
  { name: "Teshima", x: 48, y: 40, properties: 8, color: "#c67d60" },
  { name: "Shodoshima", x: 55, y: 42, properties: 15, color: "#a97a5e" },
  { name: "Ōkunoshima", x: 44, y: 48, properties: 5, color: "#43523d" },
  { name: "Hashima", x: 41, y: 50, properties: 3, color: "#c67d60" },
  { name: "Nakanoshima", x: 50, y: 38, properties: 7, color: "#43523d" },
];

export default function MapSection() {
  const [tooltip, setTooltip] = useState<{ island: (typeof islands)[0]; x: number; y: number } | null>(null);

  return (
    <section id="islands" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Island Explorer</h2>
          <p className="text-[#a97a5e] max-w-2xl mx-auto">
            Click on any island marker to explore properties and events. Japan has 14,000+ islands — we cover 50+.
          </p>
        </div>

        <div className="relative h-[500px] md:h-[600px] bg-gradient-to-b from-[#a8d5e8] to-[#7ab8d0] rounded-2xl overflow-hidden border-2 border-[#a97a5e] shadow-xl">
          {/* Water texture */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)"
            }}
          />

          {/* Landmass silhouette (simplified Shikoku/Honshu) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="50" cy="25" rx="35" ry="12" fill="#a8c49a" opacity="0.6" />
            <ellipse cx="55" cy="70" rx="20" ry="8" fill="#a8c49a" opacity="0.5" />
          </svg>

          {/* Island markers */}
          {islands.map((island) => (
            <button
              key={island.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${island.x}%`, top: `${island.y}%` }}
              onMouseEnter={() => {
                setTooltip({ island, x: island.x, y: island.y });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-lg animate-pulse group-hover:scale-150 transition-transform duration-200"
                style={{ backgroundColor: island.color }}
              />
            </button>
          ))}

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute z-20 bg-white text-[#43523d] px-4 py-3 rounded-lg shadow-xl text-sm font-medium pointer-events-none"
              style={{ left: `${tooltip.x + 3}%`, top: `${tooltip.y - 8}%` }}
            >
              <div className="font-bold font-serif text-base">{tooltip.island.name}</div>
              <div className="text-[#c67d60]">{tooltip.island.properties} properties</div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-xs text-[#43523d]">
            <div className="font-bold mb-2">Legend</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-[#43523d]"></div>
              <span>Restoration sites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#c67d60]"></div>
              <span>Available properties</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg px-3 py-2 text-xs text-[#43523d] font-medium">
            🗾 Seto Inland Sea Region
          </div>
        </div>

        <div className="mt-8 grid-3">
          {islands.map((island) => (
            <div key={island.name} className="bg-[#f4f1ea] p-4 rounded-lg flex items-center gap-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: island.color }} />
              <div>
                <div className="font-bold text-[#43523d] font-serif">{island.name}</div>
                <div className="text-sm text-[#a97a5e]">{island.properties} properties</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

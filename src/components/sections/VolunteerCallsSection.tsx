import Link from "next/link";

const VOLUNTEER_CALLS = [
  {
    title: "Naoshima Art House Restoration",
    description: "Help restore a 100-year-old kominka into an art space. Carpentry and painting skills welcome.",
    island: "Naoshima, Kagawa",
    spots: 8,
    href: "/islands/2",
  },
  {
    title: "Teshima Organic Farm Revival",
    description: "Plant, harvest, and restore terraced rice paddies abandoned for 20 years.",
    island: "Teshima, Kagawa",
    spots: 12,
    href: "/islands/3",
  },
  {
    title: "Amami Oshima Wildlife Survey",
    description: "Join biologists documenting the critically endangered Amami rabbit population.",
    island: "Amami Oshima, Kagoshima",
    spots: 5,
    href: "/islands/1",
  },
];

// Simple Japan SVG map with island markers
function JapanMap() {
  // Islands approximate positions in 300x380 viewBox
  // Based on actual lat/lng mapped to SVG space
  const islands = [
    { name: "Amami\nOshima", x: 78, y: 308, priority: "critical" },
    { name: "Naoshima", x: 162, y: 198, priority: "medium" },
    { name: "Teshima", x: 165, y: 193, priority: "high" },
    { name: "Inujima", x: 170, y: 196, priority: "critical" },
    { name: "Hashima", x: 105, y: 222, priority: "high" },
    { name: "Aoshima", x: 148, y: 212, priority: "critical" },
  ];

  const priorityColors: Record<string, string> = {
    critical: "#dc2626",
    high: "#ea580c",
    medium: "#ca8a04",
    low: "#16a34a",
  };

  return (
    <div className="relative">
      <svg
        viewBox="0 0 300 380"
        className="w-full max-w-xs mx-auto opacity-90"
        aria-label="Map of Japan showing island locations"
      >
        {/* Japan mainland silhouette — simplified path */}
        <path
          d="M 185 20 L 195 35 L 205 50 L 200 70 L 210 90 L 215 115 L 208 140 L 215 160 L 225 175 L 220 190 L 215 205 L 225 215 L 230 230 L 225 245 L 215 255 L 205 260 L 195 265 L 185 270 L 180 255 L 175 245 L 170 235 L 165 225 L 160 215 L 155 205 L 160 190 L 155 175 L 150 160 L 155 145 L 145 130 L 150 115 L 145 100 L 140 85 L 145 70 L 150 55 L 155 40 L 165 28 Z"
          fill="#43523d"
          fillOpacity="0.15"
          stroke="#43523d"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Hokkaido */}
        <path
          d="M 190 18 L 215 15 L 240 22 L 248 38 L 240 50 L 225 55 L 210 48 L 200 35 Z"
          fill="#43523d"
          fillOpacity="0.15"
          stroke="#43523d"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Shikoku */}
        <path
          d="M 148 208 L 168 204 L 178 210 L 175 220 L 162 225 L 150 220 Z"
          fill="#43523d"
          fillOpacity="0.15"
          stroke="#43523d"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Kyushu */}
        <path
          d="M 108 215 L 128 210 L 142 218 L 145 235 L 138 250 L 125 258 L 112 252 L 105 238 L 108 225 Z"
          fill="#43523d"
          fillOpacity="0.15"
          stroke="#43523d"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Ryukyu chain (small dots toward Okinawa) */}
        <circle cx="95" cy="270" r="3" fill="#43523d" fillOpacity="0.2" />
        <circle cx="88" cy="284" r="2.5" fill="#43523d" fillOpacity="0.2" />
        <circle cx="82" cy="296" r="2" fill="#43523d" fillOpacity="0.2" />

        {/* Island markers */}
        {islands.map((island) => (
          <g key={island.name}>
            {/* Pulse ring */}
            <circle
              cx={island.x}
              cy={island.y}
              r="9"
              fill={priorityColors[island.priority]}
              fillOpacity="0.2"
            />
            {/* Dot */}
            <circle
              cx={island.x}
              cy={island.y}
              r="5"
              fill={priorityColors[island.priority]}
              stroke="white"
              strokeWidth="1.5"
            />
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(10, 340)">
          <circle cx="6" cy="6" r="5" fill="#dc2626" />
          <text x="15" y="10" fontSize="9" fill="#43523d" opacity="0.7">Critical</text>
          <circle cx="65" cy="6" r="5" fill="#ea580c" />
          <text x="74" y="10" fontSize="9" fill="#43523d" opacity="0.7">High</text>
          <circle cx="110" cy="6" r="5" fill="#ca8a04" />
          <text x="119" y="10" fontSize="9" fill="#43523d" opacity="0.7">Medium</text>
        </g>
      </svg>
    </div>
  );
}

export default function VolunteerCallsSection() {
  return (
    <section className="px-4 py-8 max-w-5xl mx-auto">
      <h2
        className="text-lg font-bold text-[#43523d] mb-1"
        style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
      >
        Join the Revival
      </h2>
      <p className="text-sm text-[#43523d]/60 mb-6">Current volunteer calls across Japan's islands</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Volunteer list */}
        <ul className="space-y-4">
          {VOLUNTEER_CALLS.map((call) => (
            <li key={call.title} className="bg-white rounded-xl p-4 border border-[#43523d]/10 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-[#43523d] leading-tight">{call.title}</h3>
                <span className="ml-2 flex-shrink-0 bg-[#43523d] text-white text-xs px-2 py-0.5 rounded-full">
                  {call.spots} spots
                </span>
              </div>
              <p className="text-xs text-[#43523d]/60 mb-2 leading-relaxed">{call.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a97a5e] font-medium">📍 {call.island}</span>
                <Link href={call.href} className="text-xs font-semibold text-[#43523d] hover:underline">
                  Apply →
                </Link>
              </div>
            </li>
          ))}

          <li>
            <Link
              href="/projects"
              className="block text-center text-sm font-semibold text-[#a97a5e] hover:text-[#43523d] transition-colors py-2"
            >
              View all volunteer opportunities →
            </Link>
          </li>
        </ul>

        {/* Japan map */}
        <div className="bg-[#43523d]/5 rounded-2xl p-4 border border-[#43523d]/10">
          <p className="text-xs font-semibold text-[#43523d]/50 uppercase tracking-widest text-center mb-3">
            Active Islands
          </p>
          <JapanMap />
        </div>
      </div>
    </section>
  );
}

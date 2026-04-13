const features = [
  {
    icon: "🏡",
    title: "Affordable Living",
    desc: "Discover properties from ¥100,000 on Japan's remote islands. Many are free to akiya bank registrants."
  },
  {
    icon: "🏯",
    title: "Cultural Heritage",
    desc: "Preserve and restore Japan's architectural heritage — from machiya townhouses to kominka farmhouses."
  },
  {
    icon: "🌿",
    title: "Local Community",
    desc: "Connect with island communities, local artisans, and fellow conservationists from around the world."
  },
  {
    icon: "🗾",
    title: "Nature & Solitude",
    desc: "Live in harmony with Japan's untouched nature — fishable coastlines, ancient cedar forests, clear night skies."
  }
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#43523d] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Why Join Us?</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Island life in Japan offers something the mainland cannot — silence, community, and the chance to build something lasting.
          </p>
        </div>
        <div className="grid-2">
          {features.map((f) => (
            <div key={f.title} className="bg-[#f4f1ea] p-8 rounded-lg card-hover cursor-default">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-[#43523d] font-serif">{f.title}</h3>
              <p className="text-[#43523d]/80 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

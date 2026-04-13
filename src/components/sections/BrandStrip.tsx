export default function BrandStrip() {
  const stats = [
    { value: "50+", label: "Islands" },
    { value: "5,000+", label: "Vacant Homes" },
    { value: "17", label: "Seto Sea Islands" },
    { value: "20+", label: "Annual Events" },
  ];

  return (
    <section className="bg-[#f4f1ea] py-10 px-4 border-y-2 border-[#a97a5e]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="border-2 border-[#43523d] px-4 py-3 rounded text-center">
          <div className="text-xl font-bold tracking-widest font-serif text-[#43523d]">ABANDONED JAPAN</div>
          <div className="text-xs tracking-wider text-[#a97a5e] mt-1">Remote Island Conservation Network</div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-[#c67d60] font-serif">{s.value}</div>
              <div className="text-sm text-[#43523d] font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

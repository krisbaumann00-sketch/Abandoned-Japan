import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";

const PROJECTS = [
  {
    id: 1,
    title: "Naoshima Kominka Restoration",
    island: "Naoshima, Kagawa",
    category: "Architecture",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    spots: 8,
    duration: "2–4 weeks",
    description:
      "Restore a 100-year-old kominka farmhouse alongside local craftspeople using traditional Japanese carpentry techniques. No experience required — all training provided on-site.",
    skills: ["Carpentry", "Painting", "Gardening"],
    emoji: "🏯",
  },
  {
    id: 2,
    title: "Teshima Organic Farm Revival",
    island: "Teshima, Kagawa",
    category: "Agriculture",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    spots: 12,
    duration: "1–8 weeks",
    description:
      "Replant terraced rice paddies and citrus groves abandoned for 20+ years. Work with the Teshima Farmers Collective to revive organic food production and document traditional techniques.",
    skills: ["Farming", "Physical labor", "Ecology"],
    emoji: "🌾",
  },
  {
    id: 3,
    title: "Amami Wildlife Survey",
    island: "Amami Oshima, Kagoshima",
    category: "Conservation",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    spots: 5,
    duration: "2–3 weeks",
    description:
      "Join biologists from Kagoshima University in surveying populations of the Amami rabbit and Lidth's jay. Involves night surveys, camera traps, and data entry.",
    skills: ["Patience", "Data entry", "Night hiking"],
    emoji: "🐇",
  },
  {
    id: 4,
    title: "Inujima Art House Documentation",
    island: "Inujima, Okayama",
    category: "Culture",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    spots: 3,
    duration: "1–2 weeks",
    description:
      "Photograph, interview, and archive the stories of Inujima's remaining residents before they are lost forever. Digital humanities skills welcome.",
    skills: ["Photography", "Oral history", "Japanese language (helpful)"],
    emoji: "📷",
  },
  {
    id: 5,
    title: "Shodoshima Olive Harvest",
    island: "Shodoshima, Kagawa",
    category: "Agriculture",
    status: "Seasonal (October)",
    statusColor: "bg-yellow-100 text-yellow-700",
    spots: 20,
    duration: "1–3 weeks",
    description:
      "Help harvest Shodoshima's famous olives during the October season. Work with multi-generational farming families and participate in the island's harvest festival.",
    skills: ["Physical stamina", "Outdoor work"],
    emoji: "🫒",
  },
  {
    id: 6,
    title: "Sea Turtle Nesting Patrol",
    island: "Yakushima, Kagoshima",
    category: "Conservation",
    status: "Seasonal (June–August)",
    statusColor: "bg-yellow-100 text-yellow-700",
    spots: 10,
    duration: "2–4 weeks",
    description:
      "Night beach patrols to protect loggerhead sea turtle nests from predators and human disturbance. Work with the WWF Japan volunteer program on Yakushima's UNESCO beaches.",
    skills: ["Night shifts", "Environmental awareness"],
    emoji: "🐢",
  },
];

export default function ProjectsPage() {
  const activeProjects = PROJECTS.filter((p) => p.status === "Active").length;
  const totalSpots = PROJECTS.reduce((s, p) => s + p.spots, 0);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />
      <TabNav />

      {/* Header */}
      <div className="bg-[#43523d] text-white px-5 py-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#facc15] mb-2">
          Revival Projects
        </p>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Conservation Projects
        </h1>
        <p className="text-white/70 text-sm max-w-lg">
          Volunteer opportunities across Japan's most vulnerable island communities. Real work,
          real impact, real connections.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-[#43523d]/10 px-5 py-3 flex gap-6 text-sm overflow-x-auto scroll-hidden">
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">{activeProjects}</span>
          <span className="text-[#43523d]/50 ml-1">active projects</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">{totalSpots}</span>
          <span className="text-[#43523d]/50 ml-1">volunteer spots</span>
        </div>
        <div className="flex-shrink-0">
          <span className="font-bold text-[#43523d]">6</span>
          <span className="text-[#43523d]/50 ml-1">islands</span>
        </div>
      </div>

      {/* Projects */}
      <div className="px-4 py-6 max-w-3xl mx-auto space-y-4">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl p-5 border border-[#43523d]/10 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{project.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <h3
                    className="text-base font-bold text-[#43523d]"
                    style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                  >
                    {project.title}
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-[#a97a5e]">{project.island} · {project.category}</p>
              </div>
            </div>

            <p className="text-sm text-[#43523d]/70 leading-relaxed mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.map((skill) => (
                <span key={skill} className="bg-[#43523d]/8 text-[#43523d] text-xs px-2.5 py-1 rounded-full border border-[#43523d]/15">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-xs text-[#43523d]/50">
                <span>👥 {project.spots} spots</span>
                <span>📅 {project.duration}</span>
              </div>
              <Link
                href={`/community`}
                className="text-xs font-bold bg-[#facc15] text-[#43523d] px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors"
              >
                Apply
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 py-6 max-w-3xl mx-auto pb-10">
        <div className="bg-[#43523d]/5 border border-[#43523d]/15 rounded-2xl p-5 text-center">
          <p className="text-sm font-semibold text-[#43523d] mb-1">Don't see the right project?</p>
          <p className="text-xs text-[#43523d]/60 mb-3">
            Tell us your skills and which island calls to you. We'll connect you directly with local coordinators.
          </p>
          <Link
            href="/community"
            className="inline-block text-sm font-bold text-[#43523d] border border-[#43523d] px-5 py-2 rounded-full hover:bg-[#43523d] hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

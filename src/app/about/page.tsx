import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import TabNav from "@/components/layout/TabNav";
import Footer from "@/components/layout/Footer";

const TEAM = [
  {
    name: "Kris Page",
    role: "Founder & App Developer",
    location: "Remote",
    bio: "Building the Abandoned Japan platform — connecting people with Japan's remote islands through technology, art and volunteer work. Responsible for all app development and API integration.",
    avatar: "K",
  },
];

const VALUES = [
  {
    title: "Wabi-sabi, not tourism",
    description:
      "We are not a travel company. I am just a volunteer that is extremely passionate about these islands. The quiet beauty of these islands — mossy stone walls, unpainted wood, weathered tile — deserves reverence, not renovation into something new.",
    emoji: "🪨",
  },
  {
    title: "Residents first",
    description:
      "Every project starts by listening to the people who stayed. Their knowledge, rhythms, and priorities shape our work. We do not arrive with plans. We are a resource to get connected with local events and organizations",
    emoji: "👵",
  },
  {
    title: "Long-term presence",
    description:
      "We believe deeply that a month spent truly living on an island does more good than a year of donations. We facilitate commitment, not charity.",
    emoji: "🗓",
  },
  {
    title: "Evidence over aesthetics",
    description:
      "We track population data, akiya counts, and species surveys, cultural and buisness analytics. Beauty motivates us — data guides us.",
    emoji: "📊",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <Navbar />
      <TabNav />

      {/* Hero */}
      <div className="relative h-56 md:h-72 bg-cover bg-center" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200')"
      }}>
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <p className="text-[#facc15] text-xs font-semibold tracking-widest uppercase mb-2">Our Story</p>
            <h1
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
            >
              About Abandoned Japan
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8 space-y-12">
        {/* Mission */}
        <div>
          <h2
            className="text-xl font-bold text-[#43523d] mb-3"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            Our Mission
          </h2>
          <p className="text-sm text-[#43523d]/75 leading-relaxed mb-4">
            Japan has 6,852 islands. 421 of them are inhabited. Hundreds more were inhabited within living memory.
            "Preserving the quiet beauty of forgotten islands, villages, and homes — before silence becomes absence.
            "Abandoned Japan exists to rediscover, document, and gently revive the abandoned islands, traditional villages,
             and akiya of rural Japan — turning forgotten places into living stories of heritage, conservation, and renewal.
          </p>
          <p className="text-sm text-[#43523d]/75 leading-relaxed mb-4">
            Abandoned Japan is a network connecting people who want to do something about it: volunteers willing
            to work, families seeking a different life and researchers who need local partners.
          </p>
          <p className="text-sm text-[#43523d]/75 leading-relaxed">
            We are not about preservation as a museum. We are about islands as living places — messy, seasonal,
            hard, and profound. Supporting programs that even take abandoned akiya's and turn them into real life art pieces within themselves!
          </p>
        </div>

        {/* Values */}
        <div>
          <h2
            className="text-xl font-bold text-[#43523d] mb-4"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            What We Believe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-5 border border-[#43523d]/10 shadow-sm">
                <span className="text-2xl mb-2 block">{value.emoji}</span>
                <h3 className="text-sm font-bold text-[#43523d] mb-2">{value.title}</h3>
                <p className="text-xs text-[#43523d]/65 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2
            className="text-xl font-bold text-[#43523d] mb-4"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            The Team
          </h2>
          <div className="space-y-4">
            {TEAM.map((person) => (
              <div key={person.name} className="flex gap-4 bg-white rounded-2xl p-5 border border-[#43523d]/10 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#43523d] text-white text-base font-bold flex items-center justify-center flex-shrink-0">
                  {person.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#43523d]">{person.name}</p>
                  <p className="text-xs text-[#a97a5e] mb-1">{person.role} · {person.location}</p>
                  <p className="text-xs text-[#43523d]/65 leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#43523d] text-white rounded-2xl p-6 text-center">
          <p
            className="text-lg font-bold mb-2"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
          >
            Join the network
          </p>
          <p className="text-sm text-white/70 mb-4">Whether you have a week or a lifetime, there is a place for you.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/projects" className="bg-[#facc15] text-[#43523d] text-sm font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors">
              Find a Project
            </Link>
            <Link href="/community" className="border border-white/30 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

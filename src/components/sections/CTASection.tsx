import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#43523d] text-white px-6 py-12 text-center">
      <h2
        className="text-2xl md:text-3xl font-bold mb-2"
        style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
      >
        Small islands. Big comebacks.
      </h2>
      <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
        Every island has a story. Every abandoned home has a future. Find yours.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/akiya"
          className="bg-[#facc15] text-[#43523d] px-6 py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all w-full sm:w-auto text-center"
        >
          Browse All Homes
        </Link>
        <Link
          href="/islands"
          className="bg-[#facc15] text-[#43523d] px-6 py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all w-full sm:w-auto text-center"
        >
          Find Your Island
        </Link>
        <Link
          href="/community"
          className="bg-[#facc15] text-[#43523d] px-6 py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all w-full sm:w-auto text-center"
        >
          Share Your Story
        </Link>
      </div>
    </section>
  );
}

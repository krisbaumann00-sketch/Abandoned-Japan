import type { Event } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  events: Event[];
}

export default function EventsSection({ events }: Props) {
  return (
    <section id="events" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Conservation Events</h2>
          <p className="text-[#a97a5e] max-w-2xl mx-auto">
            Hands-on workcamps, art projects, and community cleanups across Japan&apos;s islands.
          </p>
        </div>
        <div className="grid-3">
          {events.map((e) => (
            <div key={e.id} className="bg-[#f4f1ea] rounded-lg shadow-md overflow-hidden card-hover">
              <div className="relative h-48 w-full">
                <Image
                  src={e.imageUrl || "https://picsum.photos/seed/event/400/300"}
                  alt={e.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-3 left-3 bg-[#43523d] text-white text-xs font-bold px-2 py-1 rounded">
                  {e.category.toUpperCase()}
                </div>
                {e.price === 0 && (
                  <div className="absolute top-3 right-3 bg-[#facc15] text-[#43523d] text-xs font-bold px-2 py-1 rounded">
                    FREE
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-[#43523d] font-serif leading-snug">{e.title}</h3>
                <p className="text-[#c67d60] font-medium mb-1">
                  {new Date(e.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-[#a97a5e] mb-3">{e.location}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{e.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#43523d] font-medium">
                    👥 {e.volunteerCount || 0} volunteers
                  </span>
                  <Link
                    href={`/events/${e.id}`}
                    className="bg-[#facc15] text-[#43523d] px-4 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition-colors"
                  >
                    Join Event
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

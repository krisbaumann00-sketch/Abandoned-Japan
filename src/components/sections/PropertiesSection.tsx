import type { Property } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  properties: Property[];
}

export default function PropertiesSection({ properties }: Props) {
  return (
    <section id="homes" className="py-20 px-4 bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Featured Abandoned Houses</h2>
          <p className="text-[#a97a5e] max-w-2xl mx-auto">
            Each property tells a story. Help write the next chapter.
          </p>
        </div>
        <div className="grid-3">
          {properties.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="relative h-52 w-full">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {p.featured && (
                  <div className="absolute top-3 left-3 bg-[#facc15] text-[#43523d] text-xs font-bold px-2 py-1 rounded">
                    FEATURED
                  </div>
                )}
                {p.needs && (
                  <div className="absolute top-3 right-3 bg-[#c67d60] text-white text-xs px-2 py-1 rounded">
                    {p.needs}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-1 text-[#43523d] font-serif leading-snug">{p.title}</h3>
                <p className="text-[#c67d60] font-bold text-xl mb-2">
                  ¥{p.price.toLocaleString()}/mo
                </p>
                <p className="text-sm text-[#a97a5e] mb-3 leading-relaxed line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                  {p.builtYear && <span className="bg-[#f4f1ea] px-2 py-1 rounded">Built {p.builtYear}</span>}
                  <span className="bg-[#f4f1ea] px-2 py-1 rounded">{p.prefecture}</span>
                  <span className="bg-[#f4f1ea] px-2 py-1 rounded capitalize">{p.type}</span>
                  {p.bedrooms != null && p.bedrooms > 0 && (
                    <span className="bg-[#f4f1ea] px-2 py-1 rounded">{p.bedrooms} bed</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Listed {p.listedAgo || "recently"}</span>
                  <Link
                    href={`/properties/${p.id}`}
                    className="bg-[#43523d] text-white text-sm px-4 py-2 rounded-full hover:bg-[#c67d60] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link
            href="/report-house"
            className="bg-[#c67d60] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#a97a5e] transition-colors shadow-lg"
          >
            Report an Abandoned House
          </Link>
        </div>
      </div>
    </section>
  );
}

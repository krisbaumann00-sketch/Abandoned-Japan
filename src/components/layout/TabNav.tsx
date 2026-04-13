"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Homes", href: "/akiya" },
  { label: "Islands", href: "/islands" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Festivals", href: "/events" },
  { label: "Stories", href: "/community" },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <div className="bg-[#facc15] overflow-x-auto scroll-hidden">
      <div className="flex items-center gap-1 px-3 py-2 min-w-max">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={
                isActive
                  ? "px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-[#43523d] whitespace-nowrap transition-all"
                  : "px-4 py-1.5 rounded-full text-sm font-semibold text-[#43523d] whitespace-nowrap hover:bg-white/40 transition-all"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

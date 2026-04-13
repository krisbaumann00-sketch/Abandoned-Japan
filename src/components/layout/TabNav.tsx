"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Home",       href: "/" },
  { label: "Islands",    href: "/islands" },
  { label: "Map",        href: "/map" },
  { label: "Akiya",      href: "/akiya" },
  { label: "Properties", href: "/properties" },
  { label: "Events",     href: "/events" },
  { label: "Volunteer",  href: "/volunteer" },
  { label: "Community",  href: "/community" },
  { label: "About",      href: "/about" },
  { label: "Contact",    href: "/contact" },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1a2e1a] border-b border-[#2d4a2d] sticky top-0 z-40 overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max px-4">
        {TABS.map(({ label, href }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                active
                  ? "text-[#8fbc5a] border-[#8fbc5a]"
                  : "text-[#c8d8a8] border-transparent hover:text-white hover:border-white/30"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/services", label: "Services & Pricing" },
  { href: "/admin/content", label: "Site Content" },
  { href: "/admin/users", label: "Staff Users" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function AdminNavDesktop() {
  const pathname = usePathname();
  return (
    <nav className="mt-8 flex flex-col gap-1">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              active ? "bg-brown/10 text-brown" : "text-black/60 hover:bg-black/[0.04] hover:text-black"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminNavMobile() {
  const pathname = usePathname();
  return (
    <nav className="mb-6 flex gap-2 overflow-x-auto text-sm md:hidden">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
              active ? "bg-brown/10 text-brown" : "text-black/60 hover:bg-black/[0.04]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { serviceLinks } from "@/lib/services";

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/#services"
        onClick={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        aria-expanded={open}
        className="relative py-1 transition-colors duration-300 hover:text-brown after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brown after:transition-all after:duration-300 hover:after:w-full"
      >
        Services
      </Link>

      <div
        className={`absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-black/5 bg-white/95 p-2 shadow-[0px_12px_40px_0px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-200 ease-out ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {serviceLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-2.5 font-serif-italic text-sm text-black transition-colors duration-200 hover:bg-beige hover:text-brown"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

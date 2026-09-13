"use client";

import { useEffect, useRef, useState } from "react";
import { serviceLinks } from "@/lib/services";

const homeIcon = (
  <>
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const serviceIcon = (
  <>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8.5 7.5 20 18M20 6 8.5 16.5" strokeLinecap="round" />
  </>
);

const bookingIcon = (
  <>
    <rect x="4" y="5.5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3.5v3M16 3.5v3" strokeLinecap="round" />
  </>
);

export default function MobileNav() {
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
    <nav className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-full border border-white/50 bg-white/50 py-3 shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)] backdrop-blur-xl backdrop-saturate-150 md:hidden">
      <a href="#home" className="flex flex-col items-center gap-1 px-4 text-xs text-black transition-colors duration-300 hover:text-brown">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {homeIcon}
        </svg>
        Home
      </a>

      <div ref={ref} className="relative">
        <div
          className={`absolute bottom-full left-1/2 mb-3 w-52 -translate-x-1/2 rounded-2xl border border-white/50 bg-white/70 p-2 shadow-[0px_8px_30px_0px_rgba(0,0,0,0.15)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-200 ease-out ${
            open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
          }`}
        >
          {serviceLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 font-serif-italic text-sm text-black transition-colors duration-200 hover:bg-white/70 hover:text-brown"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex flex-col items-center gap-1 px-4 text-xs text-black/60 transition-colors duration-300 hover:text-brown"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {serviceIcon}
          </svg>
          Service
        </button>
      </div>

      <a
        href="https://wa.me/971529866033"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 px-4 text-xs text-black/60 transition-colors duration-300 hover:text-brown"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {bookingIcon}
        </svg>
        Booking
      </a>
    </nav>
  );
}

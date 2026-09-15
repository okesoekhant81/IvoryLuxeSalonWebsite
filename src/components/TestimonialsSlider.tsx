"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/db-types";

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#744e39" aria-hidden>
      <path d="M12 2.5l2.9 6.4 6.9.6-5.3 4.6 1.7 6.8L12 17.6l-6.2 3.3 1.7-6.8-5.3-4.6 6.9-.6L12 2.5z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [restartKey, setRestartKey] = useState(0);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const count = testimonials.length;

  const goTo = useCallback(
    (i: number) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
      setRestartKey((k) => k + 1);
    },
    [count],
  );

  // Only start autoplay once the slider is actually on screen — it sits below
  // the fold, so without this it could silently advance several slides before
  // the visitor ever scrolls down to see it.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (count <= 1 || !inView) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(timer);
  }, [count, inView, restartKey]);

  if (count === 0) return null;

  return (
    <div ref={containerRef} className="mt-8 md:mt-0">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t) => (
            <div key={t.id} className="w-full shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-beige text-xs font-medium text-brown">
                  {t.avatarUrl ? (
                    <Image src={t.avatarUrl} alt={t.name} fill sizes="40px" className="object-cover" />
                  ) : (
                    initials(t.name)
                  )}
                </div>
                <div>
                  <p className="font-serif text-sm text-black">{t.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-serif mt-5 min-h-[7.5em] whitespace-pre-line text-sm leading-relaxed text-black/80 md:text-base">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center gap-5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
            className="flex size-9 items-center justify-center rounded-full border border-black/10 text-black/60 transition-colors hover:border-brown hover:text-brown"
          >
            <Arrow direction="left" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-brown" : "w-1.5 bg-black/15 hover:bg-black/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
            className="flex size-9 items-center justify-center rounded-full border border-black/10 text-black/60 transition-colors hover:border-brown hover:text-brown"
          >
            <Arrow direction="right" />
          </button>
        </div>
      )}
    </div>
  );
}

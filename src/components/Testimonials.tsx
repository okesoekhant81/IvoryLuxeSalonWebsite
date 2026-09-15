import Image from "next/image";
import beforeImg from "../../public/images/before-slider.png";
import afterImg from "../../public/images/after-slider.png";
import Heading from "./Heading";
import { TextLink } from "./Button";
import TestimonialsSlider from "./TestimonialsSlider";
import { GOOGLE_MAPS_LINK } from "@/lib/contact";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@/lib/db-types";

export default async function Testimonials() {
  const { data: testimonials } = await supabase
    .from("Testimonial")
    .select("*")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<Testimonial[]>();

  return (
    <section id="testimonials" className="mt-20 scroll-mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-beige">
            <Image
              src={beforeImg}
              alt="Before hair transformation at Ivory Luxe Salon"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover object-top"
            />
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-wide text-white">
              Before
            </span>
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-beige">
            <Image
              src={afterImg}
              alt="After hair transformation at Ivory Luxe Salon"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover object-top"
            />
            <span className="absolute left-3 top-3 rounded-full bg-brown/80 px-3 py-1 text-xs uppercase tracking-wide text-white">
              After
            </span>
          </div>
        </div>

        <div className="mt-14 md:mt-20 md:grid md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <Heading eyebrow="Beautiful Experiences," emphasis="Shared" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted md:text-base">
              Discover why our clients trust Ivory Luxe Salon for their beauty moments.
            </p>
            <TextLink href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 text-sm">
              See all reviews on Google
            </TextLink>
          </div>

          <TestimonialsSlider testimonials={testimonials ?? []} />
        </div>
      </div>
    </section>
  );
}

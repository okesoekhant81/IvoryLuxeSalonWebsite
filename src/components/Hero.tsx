import Image from "next/image";
import heroBg from "../../public/images/hero-bg.jpg";
import { PrimaryCta } from "./Button";
import Heading from "./Heading";
import { getSiteContent } from "@/lib/get-site-content";

export default async function Hero() {
  const content = await getSiteContent();

  return (
    <section id="home" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-8 md:grid-cols-2 md:gap-16 md:px-10 md:pt-16">
        <div className="relative order-1 h-[420px] w-full animate-[fade-in_0.8s_ease-out] overflow-hidden rounded-2xl md:order-2 md:h-[560px]">
          <Image
            src={heroBg}
            alt="Stylist finishing a client's hair at Ivory Luxe Salon"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-2 animate-[fade-in-up_0.8s_ease-out] md:order-1">
          <p className="font-serif text-sm tracking-[0.15em] text-muted uppercase">{content["hero.eyebrow"]}</p>
          <Heading
            as="h1"
            size="hero"
            eyebrow={content["hero.title_small"]}
            emphasis={content["hero.title_big"]}
            className="mt-3"
          />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
            {content["hero.description"]}
          </p>
          <div className="mt-6 whitespace-pre-line text-xs leading-relaxed text-black/80 md:text-sm">
            <p>{content["contact.address"]}</p>
            <p>{content["contact.hours"]}</p>
          </div>
          <PrimaryCta href="#booking" className="mt-8">
            Book Your Appointment
          </PrimaryCta>
        </div>
      </div>
    </section>
  );
}

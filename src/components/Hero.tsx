import Image from "next/image";
import heroBg from "../../public/images/hero-bg.jpg";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-8 md:grid-cols-2 md:gap-16 md:px-10 md:pt-16">
        <div className="relative order-1 h-[420px] w-full overflow-hidden rounded-2xl md:order-2 md:h-[560px]">
          <Image
            src={heroBg}
            alt="Stylist finishing a client's hair at Ivory Luxe Salon"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-2 md:order-1">
          <p className="font-serif text-sm tracking-[0.15em] text-muted uppercase">
            Welcome to Ivory Luxe Salon
          </p>
          <h1 className="mt-3 font-serif-italic text-4xl leading-tight text-black md:text-6xl">
            Your Beauty <span className="block">Elevated</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Step into a space where beauty feels personal. From polished everyday looks to
            special-occasion transformations, Ivory Luxe Salon delivers refined beauty services
            designed around you.
          </p>
          <div className="mt-6 text-xs leading-relaxed text-black/80 md:text-sm">
            <p>M-33, Al Dana Centre, Al Maktoum Road, Al Rigga, Dubai</p>
            <p>11:00AM to 11:00PM (Every Day)</p>
          </div>
          <a
            href="#booking"
            className="mt-8 inline-block font-serif-italic text-lg text-brown underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  );
}

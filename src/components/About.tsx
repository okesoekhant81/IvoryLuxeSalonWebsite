import Image from "next/image";
import luxuryBanner from "../../public/images/luxury-banner.jpg";

export default function About() {
  return (
    <section className="mt-20 md:mt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <div className="relative h-[320px] w-full overflow-hidden rounded-2xl md:h-[440px]">
          <Image
            src={luxuryBanner}
            alt="Luxury interior of Ivory Luxe Salon"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-serif-italic text-3xl leading-tight text-black md:text-5xl">
            Luxury Beauty, <span className="block">Made Personal</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
            At Ivory Luxe Salon, we believe true luxury is more than how you look, it is how you
            feel.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Our experienced beauty professionals combine thoughtful consultation, skilled
            techniques and quality products to create results that reflect your personal style.
            Every appointment is designed to leave you feeling confident, refreshed and
            beautifully yourself.
          </p>
          <a
            href="#experience"
            className="mt-6 inline-block font-serif-italic text-sm text-brown underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
          >
            Discover the Ivory Experience
          </a>
        </div>
      </div>
    </section>
  );
}

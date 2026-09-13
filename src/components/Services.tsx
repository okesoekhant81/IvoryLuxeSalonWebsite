import Image from "next/image";
import hairService from "../../public/images/hair-service.jpg";
import nailsService from "../../public/images/nails-service.jpg";
import lashesService from "../../public/images/lashes-service.jpg";

export default function Services() {
  return (
    <section id="services" className="mt-20 scroll-mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          id="hair"
          className="group relative block h-[380px] w-full scroll-mt-24 overflow-hidden rounded-2xl md:h-[460px]"
        >
          <Image
            src={hairService}
            alt="Hair cut and treatments at Ivory Luxe Salon"
            fill
            sizes="100vw"
            className="object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <h3 className="font-serif-italic absolute bottom-8 left-6 max-w-xs text-4xl leading-tight text-white md:bottom-10 md:left-10 md:text-5xl">
            Hair Cut And Treatments
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div
            id="nails"
            className="group relative block h-[280px] w-full scroll-mt-24 overflow-hidden rounded-2xl md:h-[340px]"
          >
            <Image
              src={nailsService}
              alt="Nails extension service at Ivory Luxe Salon"
              fill
              sizes="(min-width: 768px) 50vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <h3 className="font-serif-italic absolute bottom-6 left-4 text-2xl leading-tight text-white md:bottom-8 md:left-6 md:text-4xl">
              Nails
              <span className="block">Extension</span>
            </h3>
          </div>

          <div
            id="lashes"
            className="group relative block h-[280px] w-full scroll-mt-24 overflow-hidden rounded-2xl md:h-[340px]"
          >
            <Image
              src={lashesService}
              alt="Lashes extension service at Ivory Luxe Salon"
              fill
              sizes="(min-width: 768px) 50vw, 50vw"
              className="object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <h3 className="font-serif-italic absolute bottom-6 left-4 text-2xl leading-tight text-white md:bottom-8 md:left-6 md:text-4xl">
              Lashes
              <span className="block">Extension</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

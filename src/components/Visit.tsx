import Image from "next/image";
import visitTeam from "../../public/images/visit-team.jpg";

const mapQuery = encodeURIComponent(
  "M-33, Al Dana Centre, Al Maktoum Road, Al Rigga, Dubai"
);

export default function Visit() {
  return (
    <section id="visit" className="mt-20 scroll-mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="relative h-[260px] w-full overflow-hidden rounded-2xl md:h-[360px]">
          <Image
            src={visitTeam}
            alt="The Ivory Luxe Salon team"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 md:mt-14 md:grid md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-serif-italic text-3xl leading-tight text-black md:text-5xl">
              Visit <span className="block">Ivory Luxe Salon</span>
            </h2>

            <dl className="mt-8 space-y-5 text-sm leading-relaxed text-muted md:text-base">
              <div>
                <dt className="font-serif-italic text-black">Address</dt>
                <dd>M-33, Al Dana Centre, Al Maktoum Road, Al Rigga, Dubai.</dd>
              </div>
              <div>
                <dt className="font-serif-italic text-black">Opening Hours</dt>
                <dd>11:00AM to 11:00PM (Mon - Sun)</dd>
              </div>
              <div>
                <dt className="font-serif-italic text-black">Contact</dt>
                <dd>
                  Phone:{" "}
                  <a href="tel:+97145667874" className="underline underline-offset-2 hover:text-brown">
                    04 566 7874
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-serif-italic text-black">WhatsApp</dt>
                <dd>
                  Phone:{" "}
                  <a
                    href="https://wa.me/971529866033"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-brown"
                  >
                    +971 52 986 6033
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-serif-italic text-black">Email</dt>
                <dd>
                  <a
                    href="mailto:booking@theivoryluxe.com"
                    className="underline underline-offset-2 hover:text-brown"
                  >
                    booking@theivoryluxe.com
                  </a>
                </dd>
              </div>
            </dl>

            <a
              id="booking"
              href="https://wa.me/971529866033"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block scroll-mt-24 rounded-full bg-brown px-8 py-3 font-serif-italic text-sm text-white transition-opacity hover:opacity-90"
            >
              Book Your Appointment
            </a>
          </div>

          <div className="mt-10 h-[300px] overflow-hidden rounded-2xl bg-beige md:mt-0 md:h-full md:min-h-[420px]">
            <iframe
              title="Ivory Luxe Salon location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

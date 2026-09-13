import Image from "next/image";
import visitTeam from "../../public/images/visit-team.png";
import { PrimaryCta } from "./Button";
import Heading from "./Heading";
import { GOOGLE_MAPS_CID, GOOGLE_MAPS_LINK, WHATSAPP_LINK } from "@/lib/contact";

export default function Visit() {
  return (
    <section id="visit" className="mt-20 scroll-mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="group relative mx-auto aspect-[1600/1025] w-full max-w-2xl">
          <Image
            src={visitTeam}
            alt="The Ivory Luxe Salon team"
            fill
            sizes="(min-width: 768px) 42rem, 100vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="mt-10 md:mt-14 md:grid md:grid-cols-2 md:gap-16">
          <div>
            <Heading eyebrow="Visit" emphasis="Ivory Luxe Salon" />

            <dl className="mt-8 space-y-5 text-sm leading-relaxed text-muted md:text-base">
              <div>
                <dt className="font-serif-italic text-black">Address</dt>
                <dd>
                  M-33, Al Dana Centre, Al Maktoum Road, Al Rigga, Dubai.{" "}
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors duration-300 hover:text-brown"
                  >
                    Get directions
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-serif-italic text-black">Opening Hours</dt>
                <dd>11:00AM to 11:00PM (Mon - Sun)</dd>
              </div>
              <div>
                <dt className="font-serif-italic text-black">Contact</dt>
                <dd>
                  Phone:{" "}
                  <a href="tel:+97145667874" className="underline underline-offset-2 transition-colors duration-300 hover:text-brown">
                    04 566 7874
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-serif-italic text-black">WhatsApp</dt>
                <dd>
                  Phone:{" "}
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors duration-300 hover:text-brown"
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
                    className="underline underline-offset-2 transition-colors duration-300 hover:text-brown"
                  >
                    booking@theivoryluxe.com
                  </a>
                </dd>
              </div>
            </dl>

            <PrimaryCta
              id="booking"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 scroll-mt-24"
            >
              Book Your Appointment
            </PrimaryCta>
          </div>

          <div className="mt-10 h-[300px] overflow-hidden rounded-2xl bg-beige md:mt-0 md:h-full md:min-h-[420px]">
            <iframe
              title="Ivory Luxe Salon location"
              src={`https://www.google.com/maps?cid=${GOOGLE_MAPS_CID}&output=embed`}
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

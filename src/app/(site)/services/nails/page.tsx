import type { Metadata } from "next";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceCategoryList from "@/components/ServiceCategoryList";
import { PrimaryCta } from "@/components/Button";
import { getServiceMenu } from "@/lib/get-service-menu";
import { getSiteContent } from "@/lib/get-site-content";
import nailsService from "../../../../../public/images/nails-service.jpg";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nail Services | Ivory Luxe Salon",
  description:
    "Explore Ivory Luxe Salon's full nail menu — extensions, nail art, classic manicures and pedicures, plus spa and waxing add-ons in Al Rigga, Dubai.",
};

export default async function NailsServicesPage() {
  const [nailsMenu, content] = await Promise.all([getServiceMenu("nails"), getSiteContent()]);
  const whatsappLink = `https://wa.me/${content["contact.whatsapp"].replace(/[^0-9]/g, "")}`;

  return (
    <>
      <ServicePageHero
        image={nailsService}
        alt="Nail extension service at Ivory Luxe Salon"
        eyebrow="Our"
        title="Nail Services"
      />
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          From custom extensions and nail art to classic manicures and relaxing spa add-ons, our
          nail team delivers durable, gorgeous results. Prices are inclusive of all services.
        </p>
        <div className="mt-12">
          <ServiceCategoryList categories={nailsMenu} />
        </div>
        <div className="mt-16 text-center">
          <PrimaryCta href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Book This Service
          </PrimaryCta>
        </div>
      </section>
    </>
  );
}

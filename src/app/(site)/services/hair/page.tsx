import type { Metadata } from "next";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceCategoryList from "@/components/ServiceCategoryList";
import { PrimaryCta } from "@/components/Button";
import { getServiceMenu } from "@/lib/get-service-menu";
import { getSiteContent } from "@/lib/get-site-content";
import hairService from "../../../../../public/images/hair-service.jpg";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hair Services | Ivory Luxe Salon",
  description:
    "Explore Ivory Luxe Salon's full hair menu — cuts, color, Framesi Morphosis therapy, smoothing, extensions, braids and gentlemen's grooming in Al Rigga, Dubai.",
};

export default async function HairServicesPage() {
  const [hairMenu, content] = await Promise.all([getServiceMenu("hair"), getSiteContent()]);
  const whatsappLink = `https://wa.me/${content["contact.whatsapp"].replace(/[^0-9]/g, "")}`;

  return (
    <>
      <ServicePageHero
        image={hairService}
        alt="Hair styling at Ivory Luxe Salon"
        eyebrow="Our"
        title="Hair Services"
      />
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          From everyday blowouts to Italian-powered scalp therapy and full colour transformations,
          our stylists tailor every hair service to you. Prices are inclusive of all services.
        </p>
        <div className="mt-12">
          <ServiceCategoryList categories={hairMenu} />
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

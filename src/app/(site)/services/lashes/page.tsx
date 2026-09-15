import type { Metadata } from "next";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceCategoryList from "@/components/ServiceCategoryList";
import { PrimaryCta } from "@/components/Button";
import { getServiceMenu } from "@/lib/get-service-menu";
import { getSiteContent } from "@/lib/get-site-content";
import lashesService from "../../../../../public/images/lashes-service.jpg";

// CMS edits invalidate this page immediately via revalidatePath() on save;
// this is just a safety net for anything that misses that.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Lash Services | Ivory Luxe Salon",
  description:
    "Explore Ivory Luxe Salon's Russian volume lash menu — infills, lifting, natural classic, medium and mega volume in Al Rigga, Dubai.",
};

export default async function LashesServicesPage() {
  const [lashesMenu, content] = await Promise.all([getServiceMenu("lashes"), getSiteContent()]);
  const whatsappLink = `https://wa.me/${content["contact.whatsapp"].replace(/[^0-9]/g, "")}`;

  return (
    <>
      <ServicePageHero
        image={lashesService}
        alt="Lash extension service at Ivory Luxe Salon"
        eyebrow="Our"
        title="Lash Services"
      />
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          Ultra-light Russian volume techniques customised for lightweight, dramatic, or
          natural-looking eyes. Prices are inclusive of all services.
        </p>
        <div className="mt-12">
          <ServiceCategoryList categories={lashesMenu} />
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

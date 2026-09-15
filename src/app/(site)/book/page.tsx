import type { Metadata } from "next";
import Heading from "@/components/Heading";
import BookingForm from "./BookingForm";
import { createBooking } from "@/lib/actions/bookings";
import { getAllServicesForBooking } from "@/lib/get-all-services";
import { getSiteContent } from "@/lib/get-site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Your Appointment | Ivory Luxe Salon",
  description: "Request an appointment at Ivory Luxe Salon and our team will confirm your booking shortly.",
};

export default async function BookPage() {
  const [serviceGroups, content] = await Promise.all([getAllServicesForBooking(), getSiteContent()]);

  return (
    <section className="mt-16 md:mt-24">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <Heading eyebrow="Request an" emphasis="Appointment" />
        <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
          Fill in your details below and our team will reach out on {content["contact.whatsapp"]} to confirm your
          appointment time.
        </p>

        <BookingForm serviceGroups={serviceGroups} action={createBooking} />
      </div>
    </section>
  );
}

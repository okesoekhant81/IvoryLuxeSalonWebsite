import type { Metadata } from "next";
import Heading from "@/components/Heading";
import { createBooking } from "@/lib/actions/bookings";
import { getAllServicesForBooking } from "@/lib/get-all-services";
import { getSiteContent } from "@/lib/get-site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Your Appointment | Ivory Luxe Salon",
  description: "Request an appointment at Ivory Luxe Salon and our team will confirm your booking shortly.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { submitted } = await searchParams;
  const [serviceGroups, content] = await Promise.all([getAllServicesForBooking(), getSiteContent()]);

  return (
    <section className="mt-16 md:mt-24">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <Heading eyebrow="Request an" emphasis="Appointment" />
        <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
          Fill in your details below and our team will reach out on {content["contact.whatsapp"]} to confirm your
          appointment time.
        </p>

        {submitted && (
          <div className="mt-8 rounded-2xl border border-brown/20 bg-brown/5 p-5 text-sm text-black">
            <p className="font-serif-italic text-lg text-brown">Thank you!</p>
            <p className="mt-1 text-black/80">
              Your booking request has been received. Our team will contact you shortly to confirm.
            </p>
          </div>
        )}

        <form action={createBooking} className="mt-8 space-y-5 pb-20 md:pb-24">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm text-black">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-black">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-black">
              Email <span className="text-muted">(optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm text-black">
              Service
            </label>
            <select
              id="service"
              name="service"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-brown"
              defaultValue=""
            >
              <option value="">Select a service (optional)</option>
              {serviceGroups.map((group) => (
                <optgroup key={group.page} label={group.label}>
                  {group.items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="preferredDate" className="block text-sm text-black">
                Preferred date
              </label>
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
              />
            </div>
            <div>
              <label htmlFor="preferredTime" className="block text-sm text-black">
                Preferred time
              </label>
              <input
                id="preferredTime"
                name="preferredTime"
                type="time"
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-black">
              Message <span className="text-muted">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Anything else we should know?"
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-brown px-8 py-3 font-serif-italic text-sm text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
          >
            Request Appointment
          </button>
        </form>
      </div>
    </section>
  );
}

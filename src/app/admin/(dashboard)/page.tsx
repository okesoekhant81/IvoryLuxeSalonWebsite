import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [testimonialCount, categoryCount, itemCount, userCount] = await Promise.all([
    prisma.testimonial.count(),
    prisma.serviceCategory.count(),
    prisma.serviceItem.count(),
    prisma.user.count(),
  ]);

  const cards = [
    { label: "Testimonials", value: testimonialCount, href: "/admin/testimonials" },
    { label: "Service Categories", value: categoryCount, href: "/admin/services" },
    { label: "Service Items", value: itemCount, href: "/admin/services" },
    { label: "Staff Users", value: userCount, href: "/admin/users" },
  ];

  return (
    <div>
      <h1 className="font-serif-italic text-2xl text-black md:text-3xl">Overview</h1>
      <p className="mt-1 text-sm text-muted">Manage what appears on theivoryluxe.ae.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-black/5 bg-white p-5 transition-colors hover:border-brown"
          >
            <p className="font-serif-italic text-3xl text-brown">{card.value}</p>
            <p className="mt-1 text-sm text-black/70">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

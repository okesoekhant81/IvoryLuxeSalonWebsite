import Link from "next/link";
import { supabase } from "@/lib/supabase";

async function count(table: string) {
  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminOverviewPage() {
  const [testimonialCount, categoryCount, itemCount, userCount] = await Promise.all([
    count("Testimonial"),
    count("ServiceCategory"),
    count("ServiceItem"),
    count("User"),
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
            className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-colors hover:border-brown"
          >
            <p className="font-serif-italic text-3xl text-brown">{card.value}</p>
            <p className="mt-1 text-sm text-black/70">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

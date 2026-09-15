import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { deleteTestimonial } from "@/lib/actions/testimonials";
import DeleteButton from "@/components/admin/DeleteButton";
import type { Testimonial } from "@/lib/db-types";

export default async function TestimonialsAdminPage() {
  const { data: testimonials } = await supabase
    .from("Testimonial")
    .select("*")
    .order("order", { ascending: true })
    .returns<Testimonial[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-italic text-2xl text-black md:text-3xl">Testimonials</h1>
          <p className="mt-1 text-sm text-muted">Shown on the homepage Reviews section.</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-brown px-5 py-2 font-serif-italic text-sm text-white transition-all hover:bg-black"
        >
          Add New
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {(testimonials ?? []).map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-4"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-black/10 bg-beige">
                {t.avatarUrl && <Image src={t.avatarUrl} alt="" fill sizes="48px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-black">
                  {t.name} <span className="text-muted">· {t.rating}★</span>
                  {!t.published && (
                    <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs text-muted">Hidden</span>
                  )}
                </p>
                <p className="line-clamp-1 text-sm text-muted">{t.body}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="text-sm text-brown underline underline-offset-2 hover:opacity-70"
              >
                Edit
              </Link>
              <DeleteButton action={deleteTestimonial.bind(null, t.id)} />
            </div>
          </div>
        ))}
        {(testimonials ?? []).length === 0 && (
          <p className="text-sm text-muted">No testimonials yet — add the first one.</p>
        )}
      </div>
    </div>
  );
}

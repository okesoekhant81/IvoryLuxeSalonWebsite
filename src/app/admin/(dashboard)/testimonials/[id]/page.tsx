import Link from "next/link";
import { notFound } from "next/navigation";
import TestimonialForm from "../TestimonialForm";
import { updateTestimonial } from "@/lib/actions/testimonials";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@/lib/db-types";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: testimonial } = await supabase
    .from("Testimonial")
    .select("*")
    .eq("id", id)
    .maybeSingle<Testimonial>();

  if (!testimonial) notFound();

  const updateWithId = updateTestimonial.bind(null, id);

  return (
    <div>
      <Link href="/admin/testimonials" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Testimonials
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">Edit Testimonial</h1>
      <TestimonialForm action={updateWithId} testimonial={testimonial} />
    </div>
  );
}

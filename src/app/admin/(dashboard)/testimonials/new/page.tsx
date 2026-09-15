import Link from "next/link";
import TestimonialForm from "../TestimonialForm";
import { createTestimonial } from "@/lib/actions/testimonials";

export default function NewTestimonialPage() {
  return (
    <div>
      <Link href="/admin/testimonials" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Testimonials
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">Add Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}

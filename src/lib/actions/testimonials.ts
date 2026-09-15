"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";

function fields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    rating: Number(formData.get("rating") ?? 5),
    body: String(formData.get("body") ?? "").trim(),
    avatarUrl: (String(formData.get("avatarUrl") ?? "").trim() || null) as string | null,
    published: formData.get("published") === "on",
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const { error } = await supabase.from("Testimonial").insert({
    id: crypto.randomUUID(),
    ...fields(formData),
    updatedAt: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const { error } = await supabase
    .from("Testimonial")
    .update({ ...fields(formData), updatedAt: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  "use server";
  await requireAdmin();
  const { error } = await supabase.from("Testimonial").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

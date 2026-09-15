"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";
import type { BookingStatus } from "@/lib/db-types";

export async function createBooking(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  if (!name || !phone) throw new Error("Name and phone are required");

  const { error } = await supabase.from("Booking").insert({
    id: crypto.randomUUID(),
    name,
    phone,
    email: (String(formData.get("email") ?? "").trim() || null) as string | null,
    service: (String(formData.get("service") ?? "").trim() || null) as string | null,
    preferredDate: (String(formData.get("preferredDate") ?? "").trim() || null) as string | null,
    preferredTime: (String(formData.get("preferredTime") ?? "").trim() || null) as string | null,
    message: (String(formData.get("message") ?? "").trim() || null) as string | null,
    status: "pending",
    updatedAt: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/bookings");
  redirect("/book?submitted=1");
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  "use server";
  await requireAdmin();
  const { error } = await supabase
    .from("Booking")
    .update({ status, updatedAt: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

export async function deleteBooking(id: string) {
  "use server";
  await requireAdmin();
  const { error } = await supabase.from("Booking").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

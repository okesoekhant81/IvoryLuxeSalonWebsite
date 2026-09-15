"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";
import { clientIp } from "@/lib/client-ip";
import { checkSubmissionLimit, recordSubmission } from "@/lib/rate-limit";
import type { BookingStatus } from "@/lib/db-types";

export type BookingActionState = { success: true } | { success: false; error: string } | null;

const MIN_FILL_TIME_MS = 600;

export async function createBooking(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  // Honeypot: a real visitor never sees or reaches this field. Anything that filled it is a bot.
  if (String(formData.get("website") ?? "").trim()) {
    return { success: true };
  }

  // A human takes several real actions (mount, click through steps) before submitting —
  // physically can't happen in under ~600ms. Anything faster skipped the UI.
  const startedAt = Number(formData.get("formStartedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { success: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  if (!name || !phone) return { success: false, error: "Name and phone are required." };

  const ip = await clientIp();
  const { limited, retryAfterSeconds } = await checkSubmissionLimit("booking", ip);
  if (limited) {
    const minutes = Math.ceil(retryAfterSeconds / 60);
    return { success: false, error: `Too many requests. Please try again in ${minutes} minute(s).` };
  }

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
  if (error) return { success: false, error: "Something went wrong. Please try again." };

  await recordSubmission("booking", ip);
  revalidatePath("/admin/bookings");
  return { success: true };
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

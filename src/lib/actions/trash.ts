"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";

const TRASHABLE_TABLES = ["Testimonial", "ServiceCategory", "ServiceItem", "Booking"] as const;

export async function emptyTrash() {
  "use server";
  await requireAdmin();

  for (const table of TRASHABLE_TABLES) {
    const { error } = await supabase.from(table).delete().not("deletedAt", "is", null);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/trash");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/services");
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

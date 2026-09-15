"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { SITE_CONTENT_FIELDS } from "@/lib/site-content-fields";
import { requireAdmin } from "@/lib/require-admin";

export async function updateSiteContent(formData: FormData) {
  await requireAdmin();
  const rows = SITE_CONTENT_FIELDS.map((field) => ({
    key: field.key,
    value: String(formData.get(field.key) ?? "").trim(),
  }));

  const { error } = await supabase.from("SiteContent").upsert(rows, { onConflict: "key" });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/content");
  revalidatePath("/");
}

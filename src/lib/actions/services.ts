"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";

function revalidateServices(page?: string) {
  revalidatePath("/admin/services");
  revalidatePath("/#services");
  if (page) revalidatePath(`/services/${page}`);
  else {
    revalidatePath("/services/hair");
    revalidatePath("/services/nails");
    revalidatePath("/services/lashes");
  }
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const page = String(formData.get("page"));
  const { error } = await supabase.from("ServiceCategory").insert({
    id: crypto.randomUUID(),
    page,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    order: Number(formData.get("order") ?? 0),
    updatedAt: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  revalidateServices(page);
  redirect("/admin/services");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAdmin();
  const page = String(formData.get("page"));
  const { error } = await supabase
    .from("ServiceCategory")
    .update({
      page,
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      order: Number(formData.get("order") ?? 0),
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateServices(page);
  redirect("/admin/services");
}

export async function deleteCategory(id: string) {
  "use server";
  await requireAdmin();
  const { error } = await supabase.from("ServiceCategory").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateServices();
}

export async function createItem(formData: FormData) {
  await requireAdmin();
  const categoryId = String(formData.get("categoryId"));
  const { error } = await supabase.from("ServiceItem").insert({
    id: crypto.randomUUID(),
    categoryId,
    name: String(formData.get("name") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    order: Number(formData.get("order") ?? 0),
  });
  if (error) throw new Error(error.message);

  revalidateServices();
  redirect("/admin/services");
}

export async function updateItem(id: string, formData: FormData) {
  await requireAdmin();
  const { error } = await supabase
    .from("ServiceItem")
    .update({
      categoryId: String(formData.get("categoryId")),
      name: String(formData.get("name") ?? "").trim(),
      price: String(formData.get("price") ?? "").trim(),
      order: Number(formData.get("order") ?? 0),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateServices();
  redirect("/admin/services");
}

export async function deleteItem(id: string) {
  "use server";
  await requireAdmin();
  const { error } = await supabase.from("ServiceItem").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateServices();
}

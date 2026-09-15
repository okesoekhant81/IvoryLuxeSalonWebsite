"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";

export async function createUser(formData: FormData) {
  await requireAdmin();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "staff");

  if (password.length < 8) throw new Error("Password must be at least 8 characters");

  const hashed = await bcrypt.hash(password, 10);
  const { error } = await supabase
    .from("User")
    .insert({ id: crypto.randomUUID(), username, password: hashed, name, role });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUser(id: string, formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "staff");
  const password = String(formData.get("password") ?? "");

  const update: Record<string, string> = { name, role };
  if (password) {
    if (password.length < 8) throw new Error("Password must be at least 8 characters");
    update.password = await bcrypt.hash(password, 10);
  }

  const { error } = await supabase.from("User").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  "use server";
  await requireAdmin();
  const { error } = await supabase.from("User").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/users");
}

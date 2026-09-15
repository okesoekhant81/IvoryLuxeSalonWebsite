import { supabase } from "@/lib/supabase";
import type { ServiceCategory as DbCategory, ServiceItem as DbItem } from "@/lib/db-types";

export type MenuCategory = {
  title: string;
  description: string;
  items: { name: string; price: string }[];
};

export async function getServiceMenu(page: string): Promise<MenuCategory[]> {
  const { data: categories } = await supabase
    .from("ServiceCategory")
    .select("*")
    .eq("page", page)
    .order("order", { ascending: true })
    .returns<DbCategory[]>();

  if (!categories || categories.length === 0) return [];

  const { data: items } = await supabase
    .from("ServiceItem")
    .select("*")
    .in(
      "categoryId",
      categories.map((c) => c.id)
    )
    .order("order", { ascending: true })
    .returns<DbItem[]>();

  return categories.map((c) => ({
    title: c.title,
    description: c.description,
    items: (items ?? []).filter((i) => i.categoryId === c.id).map((i) => ({ name: i.name, price: i.price })),
  }));
}

import { supabase } from "@/lib/supabase";
import { SERVICE_PAGES } from "@/lib/service-pages";
import type { ServiceCategory as DbCategory, ServiceItem as DbItem } from "@/lib/db-types";

export type ServiceCategoryGroup = {
  title: string;
  items: string[];
};

export type ServiceGroup = {
  page: string;
  label: string;
  categories: ServiceCategoryGroup[];
};

export async function getAllServicesForBooking(): Promise<ServiceGroup[]> {
  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("ServiceCategory").select("*").order("order", { ascending: true }).returns<DbCategory[]>(),
    supabase.from("ServiceItem").select("*").order("order", { ascending: true }).returns<DbItem[]>(),
  ]);

  return SERVICE_PAGES.map((p) => {
    const pageCategories = (categories ?? []).filter((c) => c.page === p.value);
    const categoryGroups = pageCategories
      .map((c) => ({
        title: c.title,
        items: (items ?? []).filter((i) => i.categoryId === c.id).map((i) => i.name),
      }))
      .filter((group) => group.items.length > 0);
    return { page: p.value, label: p.label, categories: categoryGroups };
  }).filter((group) => group.categories.length > 0);
}

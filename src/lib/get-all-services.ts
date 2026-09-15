import { supabase } from "@/lib/supabase";
import { SERVICE_PAGES } from "@/lib/service-pages";
import type { ServiceCategory as DbCategory, ServiceItem as DbItem } from "@/lib/db-types";

export type ServiceGroup = {
  page: string;
  label: string;
  items: string[];
};

export async function getAllServicesForBooking(): Promise<ServiceGroup[]> {
  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("ServiceCategory").select("*").order("order", { ascending: true }).returns<DbCategory[]>(),
    supabase.from("ServiceItem").select("*").order("order", { ascending: true }).returns<DbItem[]>(),
  ]);

  return SERVICE_PAGES.map((p) => {
    const categoryIds = (categories ?? []).filter((c) => c.page === p.value).map((c) => c.id);
    const pageItems = (items ?? []).filter((i) => categoryIds.includes(i.categoryId)).map((i) => i.name);
    return { page: p.value, label: p.label, items: pageItems };
  }).filter((group) => group.items.length > 0);
}

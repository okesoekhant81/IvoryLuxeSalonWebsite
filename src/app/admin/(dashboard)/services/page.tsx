import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { deleteCategory, deleteItem } from "@/lib/actions/services";
import DeleteButton from "@/components/admin/DeleteButton";
import { SERVICE_PAGES } from "@/lib/service-pages";
import type { ServiceCategory, ServiceItem } from "@/lib/db-types";

export default async function ServicesAdminPage() {
  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase
      .from("ServiceCategory")
      .select("*")
      .order("page", { ascending: true })
      .order("order", { ascending: true })
      .returns<ServiceCategory[]>(),
    supabase.from("ServiceItem").select("*").order("order", { ascending: true }).returns<ServiceItem[]>(),
  ]);

  return (
    <div>
      <h1 className="font-serif-italic text-2xl text-black md:text-3xl">Services &amp; Pricing</h1>
      <p className="mt-1 text-sm text-muted">Feeds /services/hair, /services/nails and /services/lashes.</p>

      {SERVICE_PAGES.map((p) => {
        const pageCategories = (categories ?? []).filter((c) => c.page === p.value);
        return (
          <div key={p.value} className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-italic text-xl text-black">{p.label}</h2>
              <Link
                href={`/admin/services/category/new?page=${p.value}`}
                className="rounded-full border border-brown px-4 py-1.5 text-sm text-brown transition-colors hover:bg-brown hover:text-white"
              >
                Add Category
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {pageCategories.map((category) => {
                const categoryItems = (items ?? []).filter((i) => i.categoryId === category.id);
                return (
                  <div key={category.id} className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-serif-italic text-lg text-black">{category.title}</p>
                        <p className="mt-1 text-sm text-muted">{category.description}</p>
                      </div>
                      <div className="flex shrink-0 gap-3">
                        <Link
                          href={`/admin/services/category/${category.id}`}
                          className="text-sm text-brown underline underline-offset-2 hover:opacity-70"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteCategory.bind(null, category.id)}
                          confirmMessage="Delete this category and all its services?"
                        />
                      </div>
                    </div>

                    <div className="mt-4 divide-y divide-black/[0.06] border-t border-black/[0.06]">
                      {categoryItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4 py-2">
                          <span className="text-sm text-black">{item.name}</span>
                          <div className="flex shrink-0 items-center gap-3">
                            <span className="text-sm text-brown">{item.price}</span>
                            <Link
                              href={`/admin/services/item/${item.id}`}
                              className="text-xs text-black/60 underline underline-offset-2 hover:text-brown"
                            >
                              Edit
                            </Link>
                            <DeleteButton action={deleteItem.bind(null, item.id)} confirmMessage="Delete this service?" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/admin/services/item/new?categoryId=${category.id}`}
                      className="mt-3 inline-block text-sm text-brown underline underline-offset-2 hover:opacity-70"
                    >
                      + Add Service
                    </Link>
                  </div>
                );
              })}
              {pageCategories.length === 0 && (
                <p className="text-sm text-muted">No categories yet for {p.label}.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

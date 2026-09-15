import Link from "next/link";
import { notFound } from "next/navigation";
import ItemForm from "../../ItemForm";
import { updateItem } from "@/lib/actions/services";
import { supabase } from "@/lib/supabase";
import type { ServiceCategory, ServiceItem } from "@/lib/db-types";

export default async function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [{ data: item }, { data: categories }] = await Promise.all([
    supabase.from("ServiceItem").select("*").eq("id", id).maybeSingle<ServiceItem>(),
    supabase
      .from("ServiceCategory")
      .select("*")
      .order("page", { ascending: true })
      .order("order", { ascending: true })
      .returns<ServiceCategory[]>(),
  ]);

  if (!item) notFound();

  const updateWithId = updateItem.bind(null, id);

  return (
    <div>
      <Link href="/admin/services" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Services
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">Edit Service Item</h1>
      <ItemForm action={updateWithId} item={item} categories={categories ?? []} />
    </div>
  );
}

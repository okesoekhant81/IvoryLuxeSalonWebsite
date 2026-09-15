import Link from "next/link";
import ItemForm from "../../ItemForm";
import { createItem } from "@/lib/actions/services";
import { supabase } from "@/lib/supabase";
import type { ServiceCategory } from "@/lib/db-types";

export default async function NewItemPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { categoryId } = await searchParams;
  const { data: categories } = await supabase
    .from("ServiceCategory")
    .select("*")
    .order("page", { ascending: true })
    .order("order", { ascending: true })
    .returns<ServiceCategory[]>();

  return (
    <div>
      <Link href="/admin/services" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Services
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">Add Service Item</h1>
      <ItemForm action={createItem} categories={categories ?? []} defaultCategoryId={categoryId} />
    </div>
  );
}

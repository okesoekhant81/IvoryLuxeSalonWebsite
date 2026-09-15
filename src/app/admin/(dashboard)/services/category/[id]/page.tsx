import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryForm from "../../CategoryForm";
import { updateCategory } from "@/lib/actions/services";
import { supabase } from "@/lib/supabase";
import type { ServiceCategory } from "@/lib/db-types";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: category } = await supabase
    .from("ServiceCategory")
    .select("*")
    .eq("id", id)
    .maybeSingle<ServiceCategory>();

  if (!category) notFound();

  const updateWithId = updateCategory.bind(null, id);

  return (
    <div>
      <Link href="/admin/services" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Services
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">Edit Category</h1>
      <CategoryForm action={updateWithId} category={category} />
    </div>
  );
}

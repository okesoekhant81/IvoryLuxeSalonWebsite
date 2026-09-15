import Link from "next/link";
import CategoryForm from "../../CategoryForm";
import { createCategory } from "@/lib/actions/services";

export default async function NewCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return (
    <div>
      <Link href="/admin/services" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Services
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">Add Category</h1>
      <CategoryForm action={createCategory} defaultPage={page} />
    </div>
  );
}

import { SERVICE_PAGES } from "@/lib/service-pages";
import type { ServiceCategory } from "@/lib/db-types";

export default function CategoryForm({
  action,
  category,
  defaultPage,
}: {
  action: (formData: FormData) => Promise<void>;
  category?: ServiceCategory;
  defaultPage?: string;
}) {
  return (
    <form action={action} className="mt-6 max-w-xl space-y-5">
      <div>
        <label htmlFor="page" className="block text-sm text-black">
          Service page
        </label>
        <select
          id="page"
          name="page"
          required
          defaultValue={category?.page ?? defaultPage}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-brown"
        >
          {SERVICE_PAGES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm text-black">
          Category title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={category?.title}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm text-black">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={category?.description}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <div>
        <label htmlFor="order" className="block text-sm text-black">
          Display order (lower shows first)
        </label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={category?.order ?? 0}
          className="mt-1 w-24 rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-brown px-6 py-2.5 font-serif-italic text-sm text-white transition-all duration-300 hover:bg-black"
      >
        {category ? "Save Changes" : "Add Category"}
      </button>
    </form>
  );
}

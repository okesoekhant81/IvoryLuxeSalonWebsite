import type { ServiceCategory, ServiceItem } from "@/lib/db-types";

export default function ItemForm({
  action,
  item,
  categories,
  defaultCategoryId,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: ServiceItem;
  categories: ServiceCategory[];
  defaultCategoryId?: string;
}) {
  return (
    <form action={action} className="mt-6 max-w-xl space-y-5">
      <div>
        <label htmlFor="categoryId" className="block text-sm text-black">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          defaultValue={item?.categoryId ?? defaultCategoryId}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-brown"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.page} — {c.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm text-black">
          Service name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={item?.name}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm text-black">
          Price (e.g. &quot;from AED 150&quot; or &quot;AED 60&quot;)
        </label>
        <input
          id="price"
          name="price"
          type="text"
          required
          defaultValue={item?.price}
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
          defaultValue={item?.order ?? 0}
          className="mt-1 w-24 rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-brown px-6 py-2.5 font-serif-italic text-sm text-white transition-all duration-300 hover:bg-black"
      >
        {item ? "Save Changes" : "Add Service"}
      </button>
    </form>
  );
}

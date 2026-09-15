import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Testimonial } from "@/lib/db-types";

export default function TestimonialForm({
  action,
  testimonial,
}: {
  action: (formData: FormData) => Promise<void>;
  testimonial?: Testimonial;
}) {
  return (
    <form action={action} className="mt-6 max-w-xl space-y-5">
      <ImageUploadField name="avatarUrl" label="Avatar" defaultValue={testimonial?.avatarUrl} />

      <div>
        <label htmlFor="name" className="block text-sm text-black">
          Reviewer name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={testimonial?.name}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm text-black">
          Rating (1-5)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min={1}
          max={5}
          required
          defaultValue={testimonial?.rating ?? 5}
          className="mt-1 w-24 rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm text-black">
          Review text
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={6}
          defaultValue={testimonial?.body}
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
          defaultValue={testimonial?.order ?? 0}
          className="mt-1 w-24 rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-black">
        <input
          type="checkbox"
          name="published"
          defaultChecked={testimonial?.published ?? true}
          className="size-4 accent-brown"
        />
        Published (visible on the site)
      </label>

      <button
        type="submit"
        className="rounded-full bg-brown px-6 py-2.5 font-serif-italic text-sm text-white transition-all duration-300 hover:bg-black"
      >
        {testimonial ? "Save Changes" : "Add Testimonial"}
      </button>
    </form>
  );
}

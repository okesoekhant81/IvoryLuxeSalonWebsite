import { getSiteContent } from "@/lib/get-site-content";
import { updateSiteContent } from "@/lib/actions/content";
import { SITE_CONTENT_FIELDS } from "@/lib/site-content-fields";

export default async function ContentAdminPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="font-serif-italic text-2xl text-black md:text-3xl">Site Content</h1>
      <p className="mt-1 text-sm text-muted">Hero text and contact details shown across the site.</p>

      <form action={updateSiteContent} className="mt-8 max-w-xl space-y-5">
        {SITE_CONTENT_FIELDS.map((field) => (
          <div key={field.key}>
            <label htmlFor={field.key} className="block text-sm text-black">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.key}
                name={field.key}
                rows={3}
                defaultValue={content[field.key]}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
              />
            ) : (
              <input
                id={field.key}
                name={field.key}
                type="text"
                defaultValue={content[field.key]}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="rounded-full bg-brown px-6 py-2.5 font-serif-italic text-sm text-white transition-all duration-300 hover:bg-black"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

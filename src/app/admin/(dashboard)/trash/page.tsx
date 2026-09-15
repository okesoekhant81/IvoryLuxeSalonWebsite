import { supabase } from "@/lib/supabase";
import DeleteButton from "@/components/admin/DeleteButton";
import FormActionButton from "@/components/admin/FormActionButton";
import { restoreTestimonial, permanentlyDeleteTestimonial } from "@/lib/actions/testimonials";
import {
  restoreCategory,
  permanentlyDeleteCategory,
  restoreItem,
  permanentlyDeleteItem,
} from "@/lib/actions/services";
import { restoreBooking, permanentlyDeleteBooking } from "@/lib/actions/bookings";
import { emptyTrash } from "@/lib/actions/trash";
import type { Testimonial, ServiceCategory, ServiceItem, Booking } from "@/lib/db-types";

function RestoreButton({ action }: { action: () => Promise<void> }) {
  return <FormActionButton action={action} label="Restore" pendingLabel="Restoring…" />;
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm">
      {children}
    </div>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  if (count === 0) return null;
  return (
    <div className="mt-8">
      <h2 className="font-serif-italic text-lg text-black">
        {title} <span className="text-sm text-muted">({count})</span>
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

export default async function TrashPage() {
  const [{ data: testimonials }, { data: categories }, { data: items }, { data: bookings }] = await Promise.all([
    supabase
      .from("Testimonial")
      .select("*")
      .not("deletedAt", "is", null)
      .order("deletedAt", { ascending: false })
      .returns<Testimonial[]>(),
    supabase
      .from("ServiceCategory")
      .select("*")
      .not("deletedAt", "is", null)
      .order("deletedAt", { ascending: false })
      .returns<ServiceCategory[]>(),
    supabase
      .from("ServiceItem")
      .select("*")
      .not("deletedAt", "is", null)
      .order("deletedAt", { ascending: false })
      .returns<ServiceItem[]>(),
    supabase
      .from("Booking")
      .select("*")
      .not("deletedAt", "is", null)
      .order("deletedAt", { ascending: false })
      .returns<Booking[]>(),
  ]);

  const testimonialCount = testimonials?.length ?? 0;
  const categoryCount = categories?.length ?? 0;
  const itemCount = items?.length ?? 0;
  const bookingCount = bookings?.length ?? 0;
  const totalCount = testimonialCount + categoryCount + itemCount + bookingCount;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-italic text-2xl text-black md:text-3xl">Trash</h1>
          <p className="mt-1 text-sm text-muted">Deleted items. Restore them, or empty the trash permanently.</p>
        </div>
        {totalCount > 0 && (
          <DeleteButton
            action={emptyTrash}
            label="Empty Trash"
            confirmMessage={`Permanently delete all ${totalCount} item(s) in trash? This can't be undone.`}
            triggerClassName="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          />
        )}
      </div>

      {totalCount === 0 && <p className="mt-8 text-sm text-muted">Trash is empty.</p>}

      <Section title="Testimonials" count={testimonialCount}>
        {(testimonials ?? []).map((t) => (
          <Row key={t.id}>
            <div>
              <p className="text-sm font-medium text-black">{t.name}</p>
              <p className="line-clamp-1 text-sm text-muted">{t.body}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <RestoreButton action={restoreTestimonial.bind(null, t.id)} />
              <DeleteButton
                action={permanentlyDeleteTestimonial.bind(null, t.id)}
                label="Delete Permanently"
                confirmMessage="Permanently delete this testimonial? This can't be undone."
              />
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Service Categories" count={categoryCount}>
        {(categories ?? []).map((c) => (
          <Row key={c.id}>
            <div>
              <p className="text-sm font-medium text-black">{c.title}</p>
              <p className="text-sm text-muted">{c.page}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <RestoreButton action={restoreCategory.bind(null, c.id)} />
              <DeleteButton
                action={permanentlyDeleteCategory.bind(null, c.id)}
                label="Delete Permanently"
                confirmMessage="Permanently delete this category and its services? This can't be undone."
              />
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Service Items" count={itemCount}>
        {(items ?? []).map((i) => (
          <Row key={i.id}>
            <div>
              <p className="text-sm font-medium text-black">{i.name}</p>
              <p className="text-sm text-muted">{i.price}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <RestoreButton action={restoreItem.bind(null, i.id)} />
              <DeleteButton
                action={permanentlyDeleteItem.bind(null, i.id)}
                label="Delete Permanently"
                confirmMessage="Permanently delete this service? This can't be undone."
              />
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Bookings" count={bookingCount}>
        {(bookings ?? []).map((b) => (
          <Row key={b.id}>
            <div>
              <p className="text-sm font-medium text-black">{b.name}</p>
              <p className="text-sm text-muted">{b.phone}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <RestoreButton action={restoreBooking.bind(null, b.id)} />
              <DeleteButton
                action={permanentlyDeleteBooking.bind(null, b.id)}
                label="Delete Permanently"
                confirmMessage="Permanently delete this booking? This can't be undone."
              />
            </div>
          </Row>
        ))}
      </Section>
    </div>
  );
}

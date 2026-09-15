import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { updateBookingStatus, deleteBooking } from "@/lib/actions/bookings";
import DeleteButton from "@/components/admin/DeleteButton";
import FormActionButton from "@/components/admin/FormActionButton";
import type { Booking, BookingStatus } from "@/lib/db-types";

const STATUS_TABS: { value: BookingStatus | "all"; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "all", label: "All" },
];

const STATUS_BADGE: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-green-50 text-green-700",
  completed: "bg-black/[0.06] text-black/70",
  cancelled: "bg-red-50 text-red-700",
};


export default async function BookingsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeTab = (status ?? "pending") as BookingStatus | "all";

  let query = supabase.from("Booking").select("*").is("deletedAt", null).order("createdAt", { ascending: false });
  if (activeTab !== "all") query = query.eq("status", activeTab);
  const { data: bookings } = await query.returns<Booking[]>();

  return (
    <div>
      <h1 className="font-serif-italic text-2xl text-black md:text-3xl">Bookings</h1>
      <p className="mt-1 text-sm text-muted">Appointment requests submitted from the website.</p>

      <div className="mt-6 flex gap-2 overflow-x-auto">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/admin/bookings?status=${tab.value}`}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeTab === tab.value ? "bg-brown text-white" : "bg-black/[0.04] text-black/60 hover:bg-black/[0.08]"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {(bookings ?? []).map((b) => (
          <div key={b.id} className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-black">
                  {b.name}{" "}
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${STATUS_BADGE[b.status]}`}>
                    {b.status}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  <a href={`tel:${b.phone}`} className="underline underline-offset-2 hover:text-brown">
                    {b.phone}
                  </a>
                  {b.email && (
                    <>
                      {" · "}
                      <a href={`mailto:${b.email}`} className="underline underline-offset-2 hover:text-brown">
                        {b.email}
                      </a>
                    </>
                  )}
                </p>
              </div>
              <p className="text-xs text-muted">{new Date(b.createdAt).toLocaleString()}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/80">
              {b.service && (
                <p>
                  <span className="text-muted">Service:</span> {b.service}
                </p>
              )}
              {(b.preferredDate || b.preferredTime) && (
                <p>
                  <span className="text-muted">Preferred:</span> {b.preferredDate}
                  {b.preferredTime ? ` at ${b.preferredTime}` : ""}
                </p>
              )}
            </div>

            {b.message && <p className="mt-2 text-sm text-black/70">&ldquo;{b.message}&rdquo;</p>}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {b.status === "pending" && (
                <>
                  <FormActionButton action={updateBookingStatus.bind(null, b.id, "confirmed")} label="Confirm" pendingLabel="Confirming…" />
                  <FormActionButton action={updateBookingStatus.bind(null, b.id, "cancelled")} label="Cancel" pendingLabel="Cancelling…" tone="danger" />
                </>
              )}
              {b.status === "confirmed" && (
                <>
                  <FormActionButton action={updateBookingStatus.bind(null, b.id, "completed")} label="Mark Completed" pendingLabel="Updating…" />
                  <FormActionButton action={updateBookingStatus.bind(null, b.id, "cancelled")} label="Cancel" pendingLabel="Cancelling…" tone="danger" />
                </>
              )}
              {b.status === "cancelled" && (
                <FormActionButton action={updateBookingStatus.bind(null, b.id, "pending")} label="Reopen" pendingLabel="Reopening…" />
              )}
              <DeleteButton action={deleteBooking.bind(null, b.id)} confirmMessage="Delete this booking request?" />
            </div>
          </div>
        ))}
        {(bookings ?? []).length === 0 && <p className="text-sm text-muted">No bookings here.</p>}
      </div>
    </div>
  );
}

import Link from "next/link";
import { auth } from "@/auth";
import { supabase } from "@/lib/supabase";
import { deleteUser } from "@/lib/actions/users";
import DeleteButton from "@/components/admin/DeleteButton";
import type { User } from "@/lib/db-types";

export default async function UsersAdminPage() {
  const session = await auth();
  const { data: users } = await supabase
    .from("User")
    .select("*")
    .order("createdAt", { ascending: true })
    .returns<User[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-italic text-2xl text-black md:text-3xl">Staff Users</h1>
          <p className="mt-1 text-sm text-muted">Who can sign in to this dashboard.</p>
        </div>
        <Link
          href="/admin/users/new"
          className="rounded-full bg-brown px-5 py-2 font-serif-italic text-sm text-white transition-all hover:bg-black"
        >
          Add New
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {(users ?? []).map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-4"
          >
            <div>
              <p className="text-sm font-medium text-black">
                {u.name} <span className="text-muted">· @{u.username}</span>
              </p>
              <p className="text-xs text-muted">{u.role}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/admin/users/${u.id}`}
                className="text-sm text-brown underline underline-offset-2 hover:opacity-70"
              >
                Edit
              </Link>
              {u.username !== session?.user?.username && (
                <DeleteButton action={deleteUser.bind(null, u.id)} confirmMessage={`Remove ${u.name}'s access?`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

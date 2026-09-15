import Link from "next/link";
import { notFound } from "next/navigation";
import UserForm from "../UserForm";
import { updateUser } from "@/lib/actions/users";
import { supabase } from "@/lib/supabase";
import type { User } from "@/lib/db-types";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: user } = await supabase.from("User").select("*").eq("id", id).maybeSingle<User>();

  if (!user) notFound();

  const updateWithId = updateUser.bind(null, id);

  return (
    <div>
      <Link href="/admin/users" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Staff Users
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">
        Edit {user.name} <span className="text-muted">({user.username})</span>
      </h1>
      <UserForm action={updateWithId} user={user} />
    </div>
  );
}

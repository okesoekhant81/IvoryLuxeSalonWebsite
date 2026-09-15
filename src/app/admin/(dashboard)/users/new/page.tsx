import Link from "next/link";
import UserForm from "../UserForm";
import { createUser } from "@/lib/actions/users";

export default function NewUserPage() {
  return (
    <div>
      <Link href="/admin/users" className="text-sm text-brown underline underline-offset-2 hover:opacity-70">
        ← Back to Staff Users
      </Link>
      <h1 className="mt-3 font-serif-italic text-2xl text-black md:text-3xl">Add Staff User</h1>
      <UserForm action={createUser} />
    </div>
  );
}

import SubmitButton from "@/components/admin/SubmitButton";
import type { User } from "@/lib/db-types";

export default function UserForm({
  action,
  user,
}: {
  action: (formData: FormData) => Promise<void>;
  user?: User;
}) {
  return (
    <form action={action} className="mt-6 max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-black">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={user?.name}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      {!user && (
        <div>
          <label htmlFor="username" className="block text-sm text-black">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
          />
        </div>
      )}

      <div>
        <label htmlFor="role" className="block text-sm text-black">
          Role
        </label>
        <select
          id="role"
          name="role"
          defaultValue={user?.role ?? "staff"}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-brown"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-black">
          {user ? "New password (leave blank to keep current)" : "Password"}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required={!user}
          minLength={8}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown"
        />
      </div>

      <SubmitButton pendingLabel={user ? "Saving…" : "Adding…"}>
        {user ? "Save Changes" : "Add Staff User"}
      </SubmitButton>
    </form>
  );
}

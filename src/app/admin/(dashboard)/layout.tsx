import Link from "next/link";
import { auth, signOut } from "@/auth";
import { AdminNavDesktop, AdminNavMobile } from "@/components/admin/AdminNav";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <aside className="hidden w-64 shrink-0 border-r border-black/[0.06] bg-white px-6 py-8 md:block">
        <Link href="/admin" className="font-serif-italic text-lg text-black">
          Ivory Luxe Salon
        </Link>
        <p className="mt-1 text-xs uppercase tracking-wide text-muted">Admin</p>

        <AdminNavDesktop />

        <div className="mt-10 border-t border-black/[0.06] pt-6">
          <p className="text-sm text-black">{session?.user?.name}</p>
          <p className="text-xs text-muted">{session?.user?.role}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button type="submit" className="mt-3 text-sm text-brown underline underline-offset-2 hover:opacity-70">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminNavMobile />
        {children}
      </div>
    </div>
  );
}

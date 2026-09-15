import Link from "next/link";
import { auth, signOut } from "@/auth";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/services", label: "Services & Pricing" },
  { href: "/admin/content", label: "Site Content" },
  { href: "/admin/users", label: "Staff Users" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-beige">
      <aside className="hidden w-64 shrink-0 border-r border-black/5 bg-white px-6 py-8 md:block">
        <Link href="/admin" className="font-serif-italic text-lg text-black">
          Ivory Luxe Salon
        </Link>
        <p className="mt-1 text-xs uppercase tracking-wide text-muted">Admin</p>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-black/70 transition-colors hover:bg-beige hover:text-brown"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-black/5 pt-6">
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
        <nav className="mb-6 flex gap-4 overflow-x-auto text-sm text-black/70 md:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-brown">
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}

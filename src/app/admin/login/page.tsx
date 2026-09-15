import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

async function loginAction(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=1");
    }
    throw error;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0px_12px_40px_0px_rgba(0,0,0,0.06)]">
        <p className="font-serif-italic text-2xl text-black">Ivory Luxe Salon</p>
        <p className="mt-1 text-sm text-muted">Admin sign in</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid username or password.
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-black">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoFocus
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none transition-colors focus:border-brown"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-black">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none transition-colors focus:border-brown"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brown px-6 py-2.5 font-serif-italic text-sm text-white transition-all duration-300 hover:bg-black"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

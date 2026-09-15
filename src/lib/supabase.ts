import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key. Bypasses RLS — never import
// this file from a Client Component or expose it to the browser.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

import "server-only";
import { supabase } from "@/lib/supabase";

const WINDOW_MS = 30 * 60 * 1000;
const MAX_SUBMISSIONS = 5;

export async function checkSubmissionLimit(bucket: string, ip: string) {
  const cutoff = new Date(Date.now() - WINDOW_MS).toISOString();
  await supabase.from("RateLimitEntry").delete().eq("bucket", bucket).eq("ip", ip).lt("createdAt", cutoff);

  const { count } = await supabase
    .from("RateLimitEntry")
    .select("*", { count: "exact", head: true })
    .eq("bucket", bucket)
    .eq("ip", ip);

  if ((count ?? 0) >= MAX_SUBMISSIONS) {
    const { data: oldest } = await supabase
      .from("RateLimitEntry")
      .select("createdAt")
      .eq("bucket", bucket)
      .eq("ip", ip)
      .order("createdAt", { ascending: true })
      .limit(1)
      .maybeSingle<{ createdAt: string }>();
    const retryAfterSeconds = oldest
      ? Math.max(1, Math.ceil((new Date(oldest.createdAt).getTime() + WINDOW_MS - Date.now()) / 1000))
      : 60;
    return { limited: true as const, retryAfterSeconds };
  }
  return { limited: false as const };
}

export async function recordSubmission(bucket: string, ip: string) {
  await supabase.from("RateLimitEntry").insert({ id: crypto.randomUUID(), bucket, ip });
}

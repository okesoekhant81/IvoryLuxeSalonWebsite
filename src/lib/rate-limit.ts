import "server-only";
import { supabase } from "@/lib/supabase";

const WINDOW_MS = 30 * 60 * 1000;
const MAX_SUBMISSIONS = 5;

type RpcResult = { limited: boolean; retry_after_seconds: number };

// Delegates to the check_and_record_submission() Postgres function (see
// prisma/migrations, applied manually), which does the count-check and the
// insert inside one advisory-locked call. Doing this as a plain SELECT count
// then INSERT here in application code would leave a race window where two
// concurrent requests from the same IP both see a count under the limit and
// both get admitted, over-running the limit.
export async function checkAndRecordSubmission(bucket: string, ip: string) {
  const { data, error } = await supabase
    .rpc("check_and_record_submission", {
      p_bucket: bucket,
      p_ip: ip,
      p_window_ms: WINDOW_MS,
      p_max: MAX_SUBMISSIONS,
    })
    .single<RpcResult>();

  if (error || !data) {
    // Fail open: a broken rate limiter shouldn't block legitimate bookings.
    return { limited: false as const };
  }
  if (data.limited) {
    return { limited: true as const, retryAfterSeconds: data.retry_after_seconds };
  }
  return { limited: false as const };
}
